import dotenv from 'dotenv';
dotenv.config();

const API_URL = 'http://localhost:5001';

async function testAIFeatures() {
  console.log('🧪 Testing AI Features\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let authToken = '';
  let userId = '';

  // Step 1: Register a test user
  console.log('1️⃣  Creating test user...\n');
  const timestamp = Date.now();

  try {
    const registerRes = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'AI Test User',
        email: `aitest.${timestamp}@gmail.com`,
        username: `aitest_${timestamp}`,
        password: 'TestPass123!'
      })
    });

    const registerData = await registerRes.json();
    console.log('Registration response:', JSON.stringify(registerData, null, 2));

    // Check if we need to handle email confirmation
    if (!registerData.token && registerData.message?.includes('email')) {
      console.log('\n⚠️  Email confirmation required.');
      console.log('📧 To disable email confirmation:');
      console.log('   1. Go to: https://supabase.com/dashboard/project/qtaidcamesetdbpqkmjq/auth/providers');
      console.log('   2. Scroll to "Email Auth"');
      console.log('   3. Disable "Confirm email" toggle');
      console.log('   4. Click Save\n');
      console.log('Attempting to login with an existing user instead...\n');

      // Try to login with a previously created user
      const loginRes = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'aitest.1731611145639@gmail.com', // Use a known test user
          password: 'TestPass123!'
        })
      });

      const loginData = await loginRes.json();

      if (loginData.token) {
        authToken = loginData.token;
        userId = loginData.user.id;
        console.log('✅ Logged in with existing user');
        console.log(`   User: ${loginData.user.username}`);
        console.log(`   Credits: ${loginData.user.credits}\n`);
      } else {
        console.log('❌ Could not login. Please disable email confirmation or create a user manually.\n');
        return;
      }
    } else if (registerData.token) {
      authToken = registerData.token;
      userId = registerData.user.id;
      console.log('✅ User registered successfully');
      console.log(`   User: ${registerData.user.username}`);
      console.log(`   Credits: ${registerData.user.credits}\n`);
    } else {
      console.log('❌ Registration failed:', registerData.message);
      return;
    }
  } catch (error) {
    console.log('❌ Error during authentication:', error.message);
    return;
  }

  // Step 2: Test AI Avatar Generation
  console.log('2️⃣  Testing AI Avatar Generation...\n');

  try {
    console.log('   Generating avatar with prompt: "professional headshot of a business person"');
    console.log('   This will use 8 credits and may take 10-30 seconds...\n');

    const avatarRes = await fetch(`${API_URL}/api/ai/avatar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        prompt: 'professional headshot of a business person',
        style: 'photorealistic'
      })
    });

    const avatarData = await avatarRes.json();

    if (avatarData.success) {
      console.log('✅ AI Avatar Generated Successfully!');
      console.log(`   Image URL: ${avatarData.imageUrl}`);
      console.log(`   Credits Used: ${avatarData.creditsUsed}`);
      console.log(`   Remaining Credits: ${avatarData.remainingCredits}\n`);
    } else {
      console.log('❌ AI Avatar Generation Failed');
      console.log(`   Status: ${avatarRes.status}`);
      console.log(`   Message: ${avatarData.message}`);
      console.log(`   Full Response: ${JSON.stringify(avatarData, null, 2)}\n`);
    }
  } catch (error) {
    console.log('❌ Error during avatar generation:', error.message);
    console.log(`   Error details: ${error.stack}\n`);
  }

  // Step 3: Test Face Swap
  console.log('3️⃣  Testing Face Swap...\n');

  try {
    console.log('   Generating face swap...');
    console.log('   This will use 10 credits and may take 10-30 seconds...\n');

    const faceSwapRes = await fetch(`${API_URL}/api/ai/face-swap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        sourceImage: 'https://example.com/face1.jpg',
        targetImage: 'https://example.com/face2.jpg'
      })
    });

    const faceSwapData = await faceSwapRes.json();

    if (faceSwapData.success) {
      console.log('✅ Face Swap Generated Successfully!');
      console.log(`   Image URL: ${faceSwapData.imageUrl}`);
      console.log(`   Credits Used: ${faceSwapData.creditsUsed}`);
      console.log(`   Remaining Credits: ${faceSwapData.remainingCredits}\n`);
    } else {
      console.log('❌ Face Swap Failed');
      console.log(`   Status: ${faceSwapRes.status}`);
      console.log(`   Message: ${faceSwapData.message}`);
      console.log(`   Full Response: ${JSON.stringify(faceSwapData, null, 2)}\n`);
    }
  } catch (error) {
    console.log('❌ Error during face swap:', error.message);
    console.log(`   Error details: ${error.stack}\n`);
  }

  // Step 4: Test Poster Generation
  console.log('4️⃣  Testing Poster Generator...\n');

  try {
    console.log('   Generating poster...');
    console.log('   This will use 10 credits and may take 10-30 seconds...\n');

    const posterRes = await fetch(`${API_URL}/api/ai/poster`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        theme: 'Technology Innovation',
        text: 'Future of AI',
        style: 'Modern Minimalist'
      })
    });

    const posterData = await posterRes.json();

    if (posterData.success) {
      console.log('✅ Poster Generated Successfully!');
      console.log(`   Image URL: ${posterData.imageUrl}`);
      console.log(`   Credits Used: ${posterData.creditsUsed}`);
      console.log(`   Remaining Credits: ${posterData.remainingCredits}\n`);
    } else {
      console.log('❌ Poster Generation Failed');
      console.log(`   Status: ${posterRes.status}`);
      console.log(`   Message: ${posterData.message}`);
      console.log(`   Full Response: ${JSON.stringify(posterData, null, 2)}\n`);
    }
  } catch (error) {
    console.log('❌ Error during poster generation:', error.message);
    console.log(`   Error details: ${error.stack}\n`);
  }

  // Step 5: Get AI Generation History
  console.log('5️⃣  Testing AI History...\n');

  try {
    const historyRes = await fetch(`${API_URL}/api/ai/history`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });

    const historyData = await historyRes.json();

    if (historyData.success) {
      console.log(`✅ Retrieved ${historyData.generations.length} AI generations`);

      if (historyData.generations.length > 0) {
        console.log('\n   Recent generations:');
        historyData.generations.slice(0, 5).forEach((gen, i) => {
          console.log(`   ${i + 1}. ${gen.tool} - ${gen.status} (${gen.creditsUsed} credits)`);
        });
      }
      console.log('');
    } else {
      console.log('❌ Failed to retrieve history');
      console.log(`   Message: ${historyData.message}\n`);
    }
  } catch (error) {
    console.log('❌ Error retrieving history:', error.message);
  }

  // Step 6: Verify OpenAI Configuration
  console.log('6️⃣  Verifying OpenAI Configuration...\n');

  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey) {
    console.log('✅ OpenAI API Key is configured');
    console.log(`   Key prefix: ${apiKey.substring(0, 20)}...`);
    console.log(`   Key length: ${apiKey.length} characters`);

    // Test if key is valid
    try {
      const testRes = await fetch('https://api.openai.com/v1/models', {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      if (testRes.ok) {
        console.log('✅ OpenAI API Key is valid and working!\n');
      } else {
        const errorData = await testRes.json();
        console.log('❌ OpenAI API Key validation failed');
        console.log(`   Status: ${testRes.status}`);
        console.log(`   Error: ${JSON.stringify(errorData, null, 2)}\n`);
      }
    } catch (error) {
      console.log('❌ Failed to validate OpenAI API key:', error.message);
    }
  } else {
    console.log('❌ OpenAI API Key is NOT configured in .env file\n');
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('🎯 AI Features Test Complete!\n');
}

testAIFeatures().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
