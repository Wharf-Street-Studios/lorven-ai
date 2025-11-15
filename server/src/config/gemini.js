import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Gemini AI
let genAI = null;
let textModel = null;
let visionModel = null;

try {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not defined in environment variables');
  }

  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  // Initialize text model
  textModel = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-2.0-flash'
  });

  // Initialize vision model
  visionModel = genAI.getGenerativeModel({
    model: process.env.GEMINI_VISION_MODEL || 'gemini-2.0-flash'
  });

  console.log('✅ Gemini AI client initialized');
} catch (error) {
  console.error('⚠️  Gemini initialization error:', error.message);
  console.error('Please check your GEMINI_API_KEY in .env file');
}

// Helper function to generate image descriptions (since Gemini doesn't directly generate images like DALL-E)
export const generateImageWithGemini = async (prompt) => {
  try {
    if (!textModel) {
      throw new Error('Gemini AI not initialized');
    }

    // Generate a detailed description for the image
    const enhancedPrompt = `Create a detailed, vivid description for generating an image based on this prompt: "${prompt}".
    Include specific details about: composition, lighting, colors, style, mood, and visual elements.
    Make it suitable for an AI image generator. Keep it concise but descriptive (max 500 characters).`;

    const result = await textModel.generateContent(enhancedPrompt);
    const response = await result.response;
    const description = response.text();

    return {
      success: true,
      description,
      prompt: description,
    };
  } catch (error) {
    console.error('Gemini generation error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Generate content with Gemini
export const generateContent = async (prompt) => {
  try {
    if (!textModel) {
      throw new Error('Gemini AI not initialized');
    }

    const result = await textModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      success: true,
      content: text,
    };
  } catch (error) {
    console.error('Gemini content generation error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// Analyze image with Gemini Vision
export const analyzeImage = async (imageData, prompt) => {
  try {
    if (!visionModel) {
      throw new Error('Gemini Vision not initialized');
    }

    // Convert base64 to image part
    const imagePart = {
      inlineData: {
        data: imageData.split(',')[1] || imageData,
        mimeType: 'image/jpeg',
      },
    };

    const result = await visionModel.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text();

    return {
      success: true,
      analysis: text,
    };
  } catch (error) {
    console.error('Gemini vision error:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const geminiConfig = {
  model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
  visionModel: process.env.GEMINI_VISION_MODEL || 'gemini-2.0-flash',
};

export default {
  genAI,
  textModel,
  visionModel,
  generateImageWithGemini,
  generateContent,
  analyzeImage,
  geminiConfig,
};
