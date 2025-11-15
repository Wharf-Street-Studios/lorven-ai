import dotenv from 'dotenv';
dotenv.config();

const API_URL = 'http://localhost:5001';

async function verifyEmailFix() {
  console.log('🔍 Verifying email bouncing fix...\n');

  try {
    // Test registration with Mailinator email
    const timestamp = Date.now();
    const testEmail = `verify${timestamp}@mailinator.com`;
    const testUsername = `verify_${timestamp}`;

    console.log('Testing registration without email confirmation...');
    console.log(`Email: ${testEmail}`);
    console.log(`Username: ${testUsername}\n`);

    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullName: 'Verification Test User',
        email: testEmail,
        username: testUsername,
        password: 'TestPass123!'
      })
    });

    const data = await response.json();

    if (response.ok) {
      if (data.token) {
        console.log('✅ SUCCESS! Registration completed immediately');
        console.log('   Email confirmation is DISABLED');
        console.log('   User received auth token instantly');
        console.log(`   Token: ${data.token.substring(0, 30)}...`);
        console.log(`   User ID: ${data.user.id}\n`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        console.log('✅ Email bouncing issue is FIXED!');
        console.log('   - No confirmation email sent');
        console.log('   - No bounce risk');
        console.log('   - Users can register instantly\n');
        return true;
      } else {
        console.log('⚠️  Registration succeeded but no token received');
        console.log('   Email confirmation might still be enabled');
        console.log('   Response:', data);
        console.log('\n❌ Please double-check Supabase settings\n');
        return false;
      }
    } else {
      console.log('❌ Registration failed');
      console.log(`   Status: ${response.status}`);
      console.log(`   Error: ${data.message || 'Unknown error'}`);
      console.log('\n⚠️  Make sure the backend is running on port 5001\n');
      return false;
    }
  } catch (error) {
    console.log('❌ Connection error');
    console.log(`   ${error.message}`);
    console.log('\n⚠️  Is the backend running? Try: npm start\n');
    return false;
  }
}

verifyEmailFix();
