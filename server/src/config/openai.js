import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.error('❌ Missing OpenAI API key. Please check your .env file.');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openaiConfig = {
  model: process.env.OPENAI_MODEL || 'gpt-4',
  maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 2000,
  imageModel: process.env.IMAGE_GENERATION_MODEL || 'dall-e-3',
};

console.log('✅ OpenAI client initialized');

export default openai;
