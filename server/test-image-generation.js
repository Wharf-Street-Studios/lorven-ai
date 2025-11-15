import { generateImage, generateImageQuick } from './src/services/imageGenerator.js';

console.log('🧪 Testing Image Generation Integration...\n');

async function testImageGeneration() {
  try {
    // Test 1: Generate image with AI enhancement (Gemini + Pollinations)
    console.log('Test 1: AI-Enhanced Image Generation');
    console.log('=====================================');
    const result1 = await generateImage('A beautiful sunset over mountains with vibrant colors');

    if (result1.success) {
      console.log('✅ Image generated successfully!');
      console.log('📝 Original prompt:', result1.originalPrompt);
      console.log('🎨 Enhanced prompt:', result1.enhancedPrompt.substring(0, 100) + '...');
      console.log('🖼️  Image URL:', result1.imageUrl);
      console.log('');
    } else {
      console.log('❌ Image generation failed:', result1.error);
      console.log('');
    }

    // Test 2: Quick image generation (without AI enhancement)
    console.log('Test 2: Quick Image Generation');
    console.log('================================');
    const result2 = await generateImageQuick('A cute cat wearing sunglasses', { model: 'flux' });

    if (result2.success) {
      console.log('✅ Quick image generated successfully!');
      console.log('📝 Prompt:', result2.prompt);
      console.log('🖼️  Image URL:', result2.imageUrl);
      console.log('');
    } else {
      console.log('❌ Quick generation failed:', result2.error);
      console.log('');
    }

    console.log('🎉 Image generation testing complete!');
    console.log('\n💡 Tip: Open the image URLs in your browser to see the generated images!');
  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

testImageGeneration();
