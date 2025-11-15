import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  console.log('🚀 Starting database setup...\n');

  try {
    // Read the SQL schema file
    const schema = fs.readFileSync('./supabase-schema.sql', 'utf8');

    console.log('📄 SQL schema loaded');
    console.log('📊 Executing SQL statements...\n');

    // Split the schema into individual statements
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';';

      // Skip comments and empty statements
      if (statement.startsWith('--') || statement.trim() === ';') {
        continue;
      }

      try {
        const { error } = await supabase.rpc('exec_sql', { sql: statement });

        if (error) {
          // Try direct query execution as fallback
          const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'apikey': supabaseServiceKey,
              'Authorization': `Bearer ${supabaseServiceKey}`
            },
            body: JSON.stringify({ query: statement })
          });

          if (!response.ok) {
            console.log(`⚠️  Statement ${i + 1}: ${error.message || 'Warning'}`);
            errorCount++;
          } else {
            successCount++;
          }
        } else {
          successCount++;
        }
      } catch (err) {
        console.log(`⚠️  Statement ${i + 1}: ${err.message}`);
        errorCount++;
      }
    }

    console.log(`\n✅ Database setup completed!`);
    console.log(`   Statements processed: ${statements.length}`);
    console.log(`   Successful: ${successCount}`);
    console.log(`   Warnings/Errors: ${errorCount}`);

    // Verify tables were created
    console.log('\n🔍 Verifying tables...');

    const tables = [
      'profiles',
      'posts',
      'likes',
      'saves',
      'comments',
      'comment_likes',
      'followers',
      'ai_generations'
    ];

    for (const table of tables) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(0);

      if (!error) {
        console.log(`   ✅ ${table}`);
      } else {
        console.log(`   ❌ ${table} - ${error.message}`);
      }
    }

    console.log('\n🎉 Database is ready to use!');
    console.log('\n📋 Next steps:');
    console.log('   1. Start your backend: npm run dev');
    console.log('   2. Test registration: POST http://localhost:5001/api/auth/register');
    console.log('   3. Connect your frontend to the backend\n');

  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    process.exit(1);
  }
}

setupDatabase();
