import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

const API_KEY = process.env.API_KEY || '';

class GeminiService {
  private ai: GoogleGenAI | null = null;
  private modelId = "gemini-2.5-flash";

  constructor() {
    if (API_KEY) {
      this.ai = new GoogleGenAI({ apiKey: API_KEY });
    } else {
      console.warn("Gemini API Key is missing. AI features will be disabled.");
    }
  }

  public async getCoachingAdvice(message: string, history: ChatMessage[]): Promise<string> {
    if (!this.ai) return "AI Service Unavailable. Please configure API_KEY.";

    try {
      // Construct a simple history context for the stateless call or use chat session
      // Here we will use a chat session for context awareness
      const chat = this.ai.chats.create({
        model: this.modelId,
        config: {
          systemInstruction: "You are an expert Free Fire esports coach and tournament assistant. Keep answers short, tactical, and encouraging. Focus on game strategies, weapon combos, and tournament mental preparation.",
        },
        history: history.map(h => ({
          role: h.role,
          parts: [{ text: h.text }]
        }))
      });

      const result: GenerateContentResponse = await chat.sendMessage({
        message: message
      });

      return result.text || "No response generated.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I'm having trouble connecting to the strategy command center. Try again later.";
    }
  }
}

export const geminiService = new GeminiService();