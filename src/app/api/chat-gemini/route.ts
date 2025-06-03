// src/app/api/chat-gemini/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai"; // HarmCategory, HarmBlockThreshold are in config now
import { NextRequest, NextResponse } from 'next/server';
import { portfolioContextText, safetySettings } from './config';
import { prepareChatHistory } from './historyUtils';
import { detectNavigationIntent } from './intentHandler';
import { firestoreAdmin } from '@/lib/firebaseAdmin'; // Import firestoreAdmin
import { Timestamp } from 'firebase-admin/firestore'; // For server timestamps

console.log('--- API Route: Attempting to use firestoreAdmin from firebaseAdmin.ts ---');
console.log('--- API Route: firestoreAdmin object:', firestoreAdmin ? 'Exists' : 'Does NOT Exist or is undefined/null');

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
    
    // --- BEGIN: Special message for "mohamed ehab" ---
    if (message && message.toLowerCase().trim() === "mohamed ehab") {
      // Check if the AI's last message was asking for the name
      const lastAiMessage = clientHistory.length > 0 ? clientHistory[clientHistory.length - 1] : null;
      if (lastAiMessage && lastAiMessage.sender === 'ai') {
        const aiPromptLower = lastAiMessage.text.toLowerCase();
        // Add more variations if needed
        const namePrompts = ["what's your name?", "may i have your name?", "could you tell me your name?", "your name please?"];
        if (namePrompts.some(prompt => aiPromptLower.includes(prompt))) {
          return NextResponse.json({ 
            reply: "a5oyyyyyya 3aaaml el ya s8er eh el 7alawa de give me ur email ya rgal" 
          });
        }
      }
    }
    // --- END: Special message for "mohamed ehab" --- // Corrected comment to ehab

    // --- BEGIN: Input Validation ---
    const lastAiMessageForValidation = clientHistory.length > 0 ? clientHistory[clientHistory.length - 1] : null;
    if (lastAiMessageForValidation && lastAiMessageForValidation.sender === 'ai') {
      const aiPromptLower = lastAiMessageForValidation.text.toLowerCase();
      const emailPrompts = ["email address", "what is your email?", "your email please"]; // Add more variations if needed
      const namePromptsForValidation = ["what's your name?", "may i have your name?", "could you tell me your name?", "your name please?"];

      // Check if AI was asking for an email
      if (emailPrompts.some(prompt => aiPromptLower.includes(prompt))) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(message)) {
          return NextResponse.json({ 
            reply: "That doesn't look like a valid email address. Could you please provide a correct email?" 
          });
        }
      }
      // Check if AI was asking for a name (and it wasn't handled by the "mohamed ehab" special case)
      else if (namePromptsForValidation.some(prompt => aiPromptLower.includes(prompt)) && message.toLowerCase().trim() !== "mohamed ehab") {
        // Basic name validation: not empty, not an email, doesn't contain numbers (simple version)
        if (!message.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(message) || /\d/.test(message)) {
          return NextResponse.json({
            reply: "That doesn't seem like a valid name. Please enter a typical name without numbers or special characters."
          });
        }
      }
    }
    // --- END: Input Validation ---

    // Prepare history using the utility function
    // clientHistory (from req.json().history) is the conversation history *before* the current user's 'message'.
    // It should end with the AI's last turn (e.g., AI asking a question).
    // This full clientHistory is what Gemini needs for context.
    const historyForGemini = prepareChatHistory(clientHistory); 
    
    const userMessageLower = message.toLowerCase();

    // Detect navigation intent
    // For intent detection, history should also be the state *before* the current user message.
    // So, historyForGemini (which is prepareChatHistory(clientHistory)) is appropriate here too.
    const navigationResponse = detectNavigationIntent(userMessageLower, historyForGemini);
    if (navigationResponse) {
      return navigationResponse;
    }

    // If no navigation intent matched, proceed with Gemini text generation
    const chat = model.startChat({
      history: historyForGemini, // Use history prepared for Gemini
      generationConfig: { maxOutputTokens: 1500 }, // Increased maxOutputTokens
      safetySettings: safetySettings, // Use imported settings
    });
    const result = await chat.sendMessage(message); 
    const response = result.response;
    const aiReply = response.text();

    // --- BEGIN: Save to Firestore if data collection is complete ---
    if (aiReply.startsWith("Thanks for the information!")) {
      try {
        // clientHistory includes the current user message (phone/skip)
        // History structure: ..., AI asks name, User gives name, AI asks email, User gives email, AI asks phone, User gives phone/skip
        let collectedName = "N/A";
        let collectedEmail = "N/A";
        let collectedPhone = "N/A";

        console.log("Firestore Save: Checking clientHistory. Length:", clientHistory.length);

        // Based on logs, clientHistory might end with an AI message if the AI had an intermediate response
        // after the last piece of user data was provided.
        // Example structure that leads to save: ..., User gives Name, AI asks Email, User gives Email, AI asks Phone, User gives Phone, AI says "Thank you...", (current request) AI says "Thanks for info!"
        // So, user's actual data is at indices: length-2 (phone), length-4 (email), length-6 (name) relative to the clientHistory logged in console.warn.
        // Minimum length for this structure: User Name, AI prompt, User Email, AI prompt, User Phone, AI ack = 6 messages.
        if (clientHistory.length >= 6) { 
          console.log("Firestore Save: History length >= 6, proceeding with extraction.");
          
          // User's phone/skip is clientHistory[clientHistory.length - 2].text
          // AI's acknowledgement/prompt is clientHistory[clientHistory.length - 1].text
          // User's email is clientHistory[clientHistory.length - 4].text
          // User's name is clientHistory[clientHistory.length - 6].text
          
          const userPhoneMessage = clientHistory[clientHistory.length - 2];
          console.log("Firestore Save: userPhoneMessage (for phone):", JSON.stringify(userPhoneMessage));
          if (userPhoneMessage?.sender === 'user') {
            const phoneText = userPhoneMessage.text.toLowerCase();
            if (!["no", "skip", "proceed", "don't want to", "no thanks"].some(s => phoneText.includes(s))) {
                 collectedPhone = userPhoneMessage.text;
            } else {
                collectedPhone = "Skipped";
            }
          }
          console.log("Firestore Save: collectedPhone:", collectedPhone);

          const userEmailMessage = clientHistory[clientHistory.length - 4];
          console.log("Firestore Save: userEmailMessage (for email):", JSON.stringify(userEmailMessage));
          if (userEmailMessage?.sender === 'user') {
            collectedEmail = userEmailMessage.text;
          }
          console.log("Firestore Save: collectedEmail:", collectedEmail);

          const userNameMessage = clientHistory[clientHistory.length - 6];
          console.log("Firestore Save: userNameMessage (for name):", JSON.stringify(userNameMessage));
          if (userNameMessage?.sender === 'user') {
            collectedName = userNameMessage.text;
          }
          console.log("Firestore Save: collectedName:", collectedName);

        } else {
          console.log("Firestore Save: History length < 6. Current length:", clientHistory.length);
        }


        console.log(`Firestore Save: Final check before save: Name='${collectedName}', Email='${collectedEmail}'`);
        // Only save if we have at least a name and email
        if (collectedName !== "N/A" && collectedEmail !== "N/A") {
          console.log("Firestore Save: Condition to save met. Adding to Firestore...");
          await firestoreAdmin.collection('aiLeads').add({
            name: collectedName,
            email: collectedEmail,
            phone: collectedPhone,
            timestamp: Timestamp.now(),
            source: "AIChatbot",
            fullHistory: clientHistory // Optional: store the relevant part of history for context
          });
          console.log("AI Lead saved to Firestore:", { name: collectedName, email: collectedEmail, phone: collectedPhone });
        } else {
          console.warn("Attempted to save AI lead, but couldn't extract full details from history.", clientHistory);
        }

      } catch (dbError) {
        console.error("Error saving AI lead to Firestore:", dbError);
        // Do not block AI reply to user due to DB error
      }
    }
    // --- END: Save to Firestore ---
    
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
