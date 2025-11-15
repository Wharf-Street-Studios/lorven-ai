import { generateImageWithGemini, generateContent } from './src/config/gemini.js';

console.log('🧪 Testing Gemini AI Integration...\n');

async function testGemini() {
  try {
    // Test 1: Generate content
    console.log('Test 1: Generating content with Gemini...');
    const contentResult = await generateContent('Tell me a fun fact about AI in one sentence');

    if (contentResult.success) {
      console.log('✅ Content generation successful!');
      console.log('Response:', contentResult.content);
      console.log('');
    } else {
      console.log('❌ Content generation failed:', contentResult.error);
      console.log('');
    }

    // Test 2: Generate image prompt
    console.log('Test 2: Generating image description with Gemini...');
    const imageResult = await generateImageWithGemini('A futuristic cityscape at sunset');

    if (imageResult.success) {
      console.log('✅ Image prompt generation successful!');
      console.log('Enhanced prompt:', imageResult.description);
      console.log('');
    } else {
      console.log('❌ Image prompt generation failed:', imageResult.error);
      console.log('');
    }

    console.log('🎉 Gemini AI testing complete!');
  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

testGemini();
