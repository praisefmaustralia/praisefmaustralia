import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to convert file to base64
export const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result as string;
      const base64Content = base64Data.split(',')[1];
      resolve({
        inlineData: {
          data: base64Content,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const sendMessageToGemini = async (message: string, history: { role: string; parts: { text: string }[] }[] = []) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      history: history,
      config: {
        systemInstruction: "You are a helpful and friendly assistant for Praise FM Australia, a Christian radio station. You help listeners with show information, faith-based questions, and general inquiries about the station's content. Be uplifting and positive.",
      },
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    throw error;
  }
};

export const analyzeImageWithGemini = async (file: File, prompt: string) => {
  try {
    const imagePart = await fileToGenerativePart(file);
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          imagePart,
          { text: prompt || "Describe this image in detail and relate it to Christian themes if applicable." }
        ]
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    throw error;
  }
};