import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    console.log('Fetching available models...\n');

    // Make a simple request to check available models
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models?key=${process.env.GEMINI_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log('Available models:');
    console.log('================\n');

    if (data.models && data.models.length > 0) {
      data.models.forEach(model => {
        console.log(`Name: ${model.name}`);
        console.log(`Display Name: ${model.displayName || 'N/A'}`);
        console.log(`Description: ${model.description || 'N/A'}`);
        console.log(`Supported methods: ${model.supportedGenerationMethods?.join(', ') || 'N/A'}`);
        console.log('---');
      });
    } else {
      console.log('No models found or unable to list models.');
    }
  } catch (error) {
    console.error('Error listing models:', error.message);
  }
}

listModels();
