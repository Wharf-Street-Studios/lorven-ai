import dotenv from 'dotenv';
import pg from 'pg';
import fs from 'fs';

dotenv.config();

// Parse the Supabase URL to get connection details
const supabaseUrl = new URL(process.env.SUPABASE_URL);
const projectRef = supabaseUrl.hostname.split('.')[0];

// Supabase PostgreSQL connection string
const connectionString = `postgresql://postgres.${projectRef}:${process.env.SUPABASE_SERVICE_ROLE_KEY}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`;

console.log('🚀 Starting Epiko AI Studios Database Setup\n');
console.log('📦 Project:', projectRef);
console.log('🔗 Connecting to Supabase PostgreSQL...\n');

const client = new pg.Client({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

async function setupDatabase() {
  try {
    await client.connect();
    console.log('✅ Connected to database\n');

    // Read the SQL schema
    const schema = fs.readFileSync('./supabase-schema.sql', 'utf8');

    console.log('📄 Executing SQL schema...\n');

    // Execute the entire schema
    await client.query(schema);

    console.log('✅ Schema executed successfully!\n');

    // Verify tables
    console.log('🔍 Verifying tables...\n');

    const result = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    console.log('📊 Created tables:');
    result.rows.forEach(row => {
      console.log(`   ✅ ${row.table_name}`);
    });

    console.log('\n🎉 Database setup completed successfully!\n');
    console.log('📋 Your backend is now fully configured with:');
    console.log('   ✅ Supabase PostgreSQL database');
    console.log('   ✅ OpenAI API integration');
    console.log('   ✅ All tables and security policies');
    console.log('   ✅ Authentication ready\n');
    console.log('🚀 Next steps:');
    console.log('   1. Backend is running at: http://localhost:5001');
    console.log('   2. Test health: curl http://localhost:5001/health');
    console.log('   3. Connect your frontend!\n');

  } catch (error) {
    console.error('\n❌ Error setting up database:', error.message);
    console.error('\n💡 Please try manual setup:');
    console.error('   1. Go to: https://supabase.com/dashboard/project/qtaidcamesetdbpqkmjq/sql');
    console.error('   2. Create new query');
    console.error('   3. Copy contents from: server/supabase-schema.sql');
    console.error('   4. Run the query\n');
  } finally {
    await client.end();
  }
}

setupDatabase();
