// API Service for backend communication
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5001/api';

// Get auth token from localStorage (Supabase session)
const getAuthToken = (): string | null => {
  try {
    const authData = localStorage.getItem('sb-qtaidcamesetdbpqkmjq-auth-token');
    if (authData) {
      const parsed = JSON.parse(authData);
      return parsed.access_token || null;
    }
  } catch (error) {
    console.error('Error getting auth token:', error);
  }
  return null;
};

// API request helper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string; error?: string }> {
  const token = getAuthToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'Request failed',
        message: data.message,
      };
    }

    return {
      success: true,
      data,
      ...data,
    };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

// AI Generation API Calls
export interface AIGenerationResponse {
  success: boolean;
  imageUrl?: string;
  creditsUsed?: number;
  remainingCredits?: number;
  message?: string;
  error?: string;
}

export interface AIHistoryItem {
  id: string;
  tool: string;
  outputUrl: string;
  creditsUsed: number;
  status: string;
  createdAt: string;
  completedAt: string;
}

export const aiAPI = {
  // Face Swap
  generateFaceSwap: async (sourceImage: string, targetImage: string): Promise<AIGenerationResponse> => {
    return apiRequest('/ai/face-swap', {
      method: 'POST',
      body: JSON.stringify({ sourceImage, targetImage }),
    });
  },

  // AI Avatar
  generateAvatar: async (prompt: string, style: string): Promise<AIGenerationResponse> => {
    return apiRequest('/ai/avatar', {
      method: 'POST',
      body: JSON.stringify({ prompt, style }),
    });
  },

  // Duo Portrait
  generateDuoPortrait: async (person1: string, person2: string, style: string): Promise<AIGenerationResponse> => {
    return apiRequest('/ai/duo-portrait', {
      method: 'POST',
      body: JSON.stringify({ person1, person2, style }),
    });
  },

  // Poster
  generatePoster: async (theme: string, text: string, style: string): Promise<AIGenerationResponse> => {
    return apiRequest('/ai/poster', {
      method: 'POST',
      body: JSON.stringify({ theme, text, style }),
    });
  },

  // Age Transform
  ageTransform: async (image: string, targetAge: number): Promise<AIGenerationResponse> => {
    return apiRequest('/ai/age-transform', {
      method: 'POST',
      body: JSON.stringify({ image, targetAge }),
    });
  },

  // Enhance Image
  enhanceImage: async (image: string, enhancementType: string): Promise<AIGenerationResponse> => {
    return apiRequest('/ai/enhance', {
      method: 'POST',
      body: JSON.stringify({ image, enhancementType }),
    });
  },

  // Get History
  getHistory: async (): Promise<{ success: boolean; generations?: AIHistoryItem[]; error?: string }> => {
    return apiRequest('/ai/history', {
      method: 'GET',
    });
  },
};

// Helper function to map tool IDs to API calls
export const getAIApiFunction = (toolId: string) => {
  const apiMap: Record<string, any> = {
    'face-swap': aiAPI.generateFaceSwap,
    'ai-avatar': aiAPI.generateAvatar,
    'duo-portrait': aiAPI.generateDuoPortrait,
    'poster-maker': aiAPI.generatePoster,
    'age-transform': aiAPI.ageTransform,
    'enhance': aiAPI.enhanceImage,
  };
  return apiMap[toolId];
};

export default {
  aiAPI,
  getAIApiFunction,
};
