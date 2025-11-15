import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupTestUser() {
  console.log('🔧 Setting up test user for AI features testing...\n');

  // Use a real test email service (Mailinator) or your own valid email
  // Mailinator emails are publicly accessible at https://www.mailinator.com/
  const testEmail = 'aitest@mailinator.com';
  const testPassword = 'TestPass123!';
  const testUsername = 'aitest_user';

  try {
    // First, try to delete any existing test user
    console.log('Checking for existing test user...');
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingUser = existingUsers?.users?.find(u => u.email === testEmail);

    if (existingUser) {
      console.log('Found existing test user, deleting...');
      await supabaseAdmin.auth.admin.deleteUser(existingUser.id);
      console.log('✅ Deleted existing test user\n');
    }

    // Create new user using admin API (bypasses email confirmation)
    console.log('Creating new test user...');
    const { data: authData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: testEmail,
      password: testPassword,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        full_name: 'AI Test User',
        username: testUsername,
        provider: 'email'
      }
    });

    if (createError) {
      console.error('❌ Error creating user:', createError.message);
      return;
    }

    console.log('✅ User created successfully!');
    console.log(`   User ID: ${authData.user.id}`);
    console.log(`   Email: ${authData.user.email}\n`);

    // Check if profile was auto-created
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      console.log('⚠️  Profile not found, creating manually...');

      // Create profile manually
      const { error: insertError } = await supabaseAdmin
        .from('profiles')
        .insert([{
          id: authData.user.id,
          full_name: 'AI Test User',
          username: testUsername,
          email: testEmail,
          auth_provider: 'email',
          credits: 100,
          is_active: true
        }]);

      if (insertError) {
        console.error('❌ Error creating profile:', insertError.message);
        return;
      }

      console.log('✅ Profile created successfully!\n');
    } else {
      console.log('✅ Profile auto-created!');
      console.log(`   Username: ${profile.username}`);
      console.log(`   Credits: ${profile.credits}\n`);
    }

    // Now login to get a token
    console.log('Logging in to get auth token...');
    const { data: signInData, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
      email: testEmail,
      password: testPassword
    });

    if (signInError) {
      console.error('❌ Login error:', signInError.message);
      return;
    }

    console.log('✅ Login successful!');
    console.log(`   Token: ${signInData.session.access_token.substring(0, 30)}...\n`);

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('✅ Test user is ready!\n');
    console.log('📝 Credentials:');
    console.log(`   Email: ${testEmail}`);
    console.log(`   Password: ${testPassword}`);
    console.log(`   Username: ${testUsername}`);
    console.log(`   Credits: 100\n`);
    console.log('🧪 You can now run: node test-ai-features.js\n');

  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    console.error(error);
  }
}

setupTestUser();
