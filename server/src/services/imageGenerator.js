import axios from 'axios';
import { generateImageWithGemini } from '../config/gemini.js';

/**
 * Image Generation Service
 * Uses Gemini to create enhanced prompts and Pollinations.ai for free image generation
 */

// Pollinations.ai - Free image generation (no API key required)
const POLLINATIONS_BASE_URL = 'https://image.pollinations.ai/prompt';

/**
 * Generate an image using Pollinations.ai
 * @param {string} prompt - The image generation prompt
 * @param {object} options - Generation options
 * @returns {Promise<string>} - URL of the generated image
 */
async function generateImageWithPollinations(prompt, options = {}) {
  try {
    const {
      width = 1024,
      height = 1024,
      seed = Math.floor(Math.random() * 1000000),
      model = 'flux', // flux, turbo, or flux-realism
    } = options;

    // Encode the prompt for URL
    const encodedPrompt = encodeURIComponent(prompt);

    // Pollinations.ai URL format
    const imageUrl = `${POLLINATIONS_BASE_URL}/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&model=${model}&nologo=true`;

    // Pollinations generates images on-demand, so we just return the URL
    // The image will be generated when it's accessed
    return {
      success: true,
      imageUrl,
      prompt,
    };
  } catch (error) {
    console.error('Pollinations image generation error:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Generate image with AI-enhanced prompt
 * Uses Gemini to enhance the prompt, then generates with Pollinations
 * @param {string} userPrompt - User's original prompt
 * @param {object} options - Generation options
 * @returns {Promise<object>} - Generation result with image URL
 */
export async function generateImage(userPrompt, options = {}) {
  try {
    console.log('🎨 Generating image for prompt:', userPrompt.substring(0, 50) + '...');

    // Step 1: Enhance prompt with Gemini
    const geminiResult = await generateImageWithGemini(userPrompt);

    if (!geminiResult.success) {
      // If Gemini fails, use the original prompt
      console.warn('Gemini enhancement failed, using original prompt');
    }

    // Use enhanced prompt or fall back to original
    const finalPrompt = geminiResult.success ? geminiResult.description : userPrompt;

    // Step 2: Generate image with Pollinations
    const imageResult = await generateImageWithPollinations(finalPrompt, options);

    if (!imageResult.success) {
      throw new Error(imageResult.error || 'Image generation failed');
    }

    console.log('✅ Image generated successfully');

    return {
      success: true,
      imageUrl: imageResult.imageUrl,
      originalPrompt: userPrompt,
      enhancedPrompt: finalPrompt,
    };
  } catch (error) {
    console.error('Image generation error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Generate image with specific dimensions (for posters, portraits, etc.)
 */
export async function generateImageWithDimensions(prompt, width, height, options = {}) {
  return generateImage(prompt, { ...options, width, height });
}

/**
 * Quick image generation without AI enhancement (faster)
 */
export async function generateImageQuick(prompt, options = {}) {
  try {
    const imageResult = await generateImageWithPollinations(prompt, options);

    if (!imageResult.success) {
      throw new Error(imageResult.error || 'Image generation failed');
    }

    return {
      success: true,
      imageUrl: imageResult.imageUrl,
      prompt,
    };
  } catch (error) {
    console.error('Quick image generation error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export default {
  generateImage,
  generateImageWithDimensions,
  generateImageQuick,
};
