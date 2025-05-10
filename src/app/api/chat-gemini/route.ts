// src/app/api/chat-gemini/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai"; // HarmCategory, HarmBlockThreshold are in config now
import { NextRequest, NextResponse } from 'next/server';
import { portfolioContextText, safetySettings } from './config';
import { prepareChatHistory } from './historyUtils';
import { detectNavigationIntent } from './intentHandler';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.warn("Gemini API key not found. Please set GEMINI_API_KEY environment variable.");
}

const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;
const model = genAI 
  ? genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest",
      systemInstruction: portfolioContextText, // Use imported context
    }) 
  : null;

// safetySettings is imported from config and used below

export async function POST(req: NextRequest) {
  if (!model) {
    return NextResponse.json({ 
      reply: "AI model not initialized. Please check server logs for API key issues." 
    }, { status: 500 });
  }

  try {
    const { message, history } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message content is required" }, { status: 400 });
    }

    const clientHistory: { sender: string; text: string }[] = history || [];
    // Prepare history using the utility function
    // clientHistory for intent detection should be all messages *including* current user's message
    // but for Gemini's `startChat` history, it should be messages *before* current user's message.
    // The `prepareChatHistory` function expects history *before* current user message.
    const historyForGemini = prepareChatHistory(clientHistory.slice(0, -1));
    
    const userMessageLower = message.toLowerCase();

    // Detect navigation intent
    // For intent detection, processedHistory should represent the state *before* the current user message.
    const navigationResponse = detectNavigationIntent(userMessageLower, historyForGemini);
    if (navigationResponse) {
      return navigationResponse;
    }

    // If no navigation intent matched, proceed with Gemini text generation
    const chat = model.startChat({
      history: historyForGemini, // Use history prepared for Gemini
      generationConfig: { maxOutputTokens: 350 }, 
      safetySettings: safetySettings, // Use imported settings
    });
    const result = await chat.sendMessage(message); 
    const response = result.response;
    const aiReply = response.text();
    
    return NextResponse.json({ reply: aiReply });

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    let errorMessage = "An error occurred while processing your request with the AI.";
    if (error instanceof Error) {
        errorMessage = error.message.includes("API key not valid") 
            ? "AI API key is invalid. Please check server configuration."
            : `AI Error: ${error.message}`;
    }
    return NextResponse.json({ reply: errorMessage }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Gemini chat API is active. Use POST to send messages." });
}
