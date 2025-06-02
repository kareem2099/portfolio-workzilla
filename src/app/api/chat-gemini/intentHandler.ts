// src/app/api/chat-gemini/intentHandler.ts
import { NextResponse } from 'next/server';

interface ProcessedHistoryEntry {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface NavigationAction {
  action: "navigate";
  path: string;
  reply: string;
  postNavigationPrompt?: string; // Added optional field
}

export function detectNavigationIntent(
  userMessageLower: string,
  processedHistory: ProcessedHistoryEntry[] // History *before* the current user's message
): NextResponse | null {

  // 1. Handle "yes" in response to an AI's specific navigation offer
  if (userMessageLower === "yes" || userMessageLower === "ok" || userMessageLower === "sure" || userMessageLower === "alright") {
    const lastAiMessageInHistory = processedHistory.length > 0 ? processedHistory[processedHistory.length - 1] : null;
    if (lastAiMessageInHistory && lastAiMessageInHistory.role === 'model') {
      const lastAiText = lastAiMessageInHistory.parts[0].text.toLowerCase();
      
      // Check if the AI's last message was an offer to navigate
      const offeredNavigation = lastAiText.includes("navigate you there?") || 
                               lastAiText.includes("take you there?") || 
                               lastAiText.includes("guide you to") ||
                               lastAiText.includes("go to the");

      if (offeredNavigation) {
        if (lastAiText.includes("contact page")) {
          return NextResponse.json({ 
            action: "navigate", path: "/contact", 
            reply: "Great, taking you to the Contact page!",
            postNavigationPrompt: "We're on the Contact page. Here you'll find a form to send Mohamed a message directly by providing your full name, email address, and your message."
          } as NavigationAction);
        } else if (lastAiText.includes("about page")) {
          return NextResponse.json({ 
            action: "navigate", path: "/about", 
            reply: "Great, taking you to the About page!",
            postNavigationPrompt: "Now that we're on the About page, what specifically would you like to know about it?"
          } as NavigationAction);
        } else if (lastAiText.includes("projects page")) {
          return NextResponse.json({ 
            action: "navigate", path: "/projects", 
            reply: "Great, taking you to the Projects page!",
            postNavigationPrompt: "Now that we're on the Projects page, what specifically would you like to know about Mohamed's work?"
          } as NavigationAction);
        } else if (lastAiText.includes("home page") || lastAiText.includes("main portfolio page")) {
          return NextResponse.json({ 
            action: "navigate", path: "/", 
            reply: "Great, taking you to the Home page!" 
            // No specific post-nav prompt for home, can be added if needed
          } as NavigationAction);
        }
        // If "yes" to a generic navigation offer without a clear page, AI might need to ask "where to?"
        // For now, if it's a nav offer but no page is matched above, we let it fall through to Gemini.
      }
    }
  }

  // 2. Check for explicit navigation intents (if not a "yes" to a prior offer)
  const aboutKeywords = ["about", "bio", "background", "who is Mohamed"];
  const projectKeywords = ["projects", "work", "portfolio", "creations", "apps"];
  const contactKeywords = ["contact", "reach out", "email", "message", "connect"];
  const homeKeywords = ["home", "main page", "start page"];

  const actionKeywords = [
    "navigate to", "go to", "show me", "take me to", 
    "what's on the", "what does the", "tell me about the", "what is on the",
    "can i see the", "let's see the", "open the",
    "contain", "has" // these need to be combined with a page keyword
  ];

  // Helper to check if message contains page and action keywords
  const checkIntent = (message: string, pageKws: string[], actionKws: string[]): boolean => {
    const hasPageKeyword = pageKws.some(kw => message.includes(kw));
    if (!hasPageKeyword) return false;
    
    // Direct actions like "show me about"
    if (actionKws.some(akw => message.includes(akw) && !akw.includes("contain") && !akw.includes("has"))) return true;

    // Content query actions like "what does about page contain"
    const contentQueryAction = actionKws.some(akw => (akw.includes("contain") || akw.includes("has")) && message.includes(akw));
    const contentQueryDirect = actionKws.some(akw => (akw.startsWith("what") || akw.startsWith("tell me about the")) && message.includes(akw));

    return contentQueryAction || contentQueryDirect;
  };

  if (checkIntent(userMessageLower, aboutKeywords, actionKeywords)) {
    return NextResponse.json({ 
      action: "navigate", path: "/about", 
      reply: "Okay, let's go to the About page so you can see what it contains.",
      postNavigationPrompt: "We're on the About page. Here you can learn more about Mohamed's journey, skills, and experience." // Made this more descriptive
    } as NavigationAction);
  }
  if (checkIntent(userMessageLower, projectKeywords, actionKeywords)) {
    return NextResponse.json({ 
      action: "navigate", path: "/projects", 
      reply: "Sure, let's head over to the Projects page to see Mohamed's work!",
      postNavigationPrompt: "Now that we're on the Projects page, you can explore various projects Mohamed has worked on, with details for each." // Made this more descriptive
    } as NavigationAction);
  }
  if (checkIntent(userMessageLower, contactKeywords, actionKeywords)) {
    return NextResponse.json({ 
      action: "navigate", path: "/contact",
      reply: "Okay, I'll take you to the Contact page where you can find Mohamed's contact details.",
      postNavigationPrompt: "We're on the Contact page. Here you'll find a form to send Mohamed a message directly by providing your full name, email address, and your message."
    } as NavigationAction);
  }
  if (checkIntent(userMessageLower, homeKeywords, actionKeywords)) {
    return NextResponse.json({ 
      action: "navigate", path: "/", 
      reply: "Okay, let's go to the Home page.",
      postNavigationPrompt: "We're on the Home page. Here you'll typically find an introduction to Mohamed, highlights of his skills and projects, and ways to explore more of the portfolio."
    } as NavigationAction);
  }

  // 3. Contextual navigation for generic "navigate me" (less specific than "yes" to an offer)
  if (userMessageLower.includes("navigate me") || userMessageLower.includes("take me to")) {
    const lastAiMessageInHistory = processedHistory.length > 0 ? processedHistory[processedHistory.length - 1] : null;
    if (lastAiMessageInHistory && lastAiMessageInHistory.role === 'model') {
      const lastAiText = lastAiMessageInHistory.parts[0].text.toLowerCase();
      if (lastAiText.includes("projects page")) {
        return NextResponse.json({ 
          action: "navigate", path: "/projects", 
          reply: "Okay, navigating to the Projects page as you asked!",
          postNavigationPrompt: "Now that we're on the Projects page, what specifically would you like to know about Mohamed's work?"
        } as NavigationAction);
      } else if (lastAiText.includes("about page")) {
        return NextResponse.json({ 
          action: "navigate", path: "/about", 
          reply: "Okay, navigating to the About page as you asked!",
          postNavigationPrompt: "Now that we're on the About page, what specifically would you like to know about it?"
        } as NavigationAction);
      } else if (lastAiText.includes("contact page")) { 
        return NextResponse.json({ 
          action: "navigate", path: "/contact", 
          reply: "Okay, navigating to the Contact page as you asked!",
          postNavigationPrompt: "We're on the Contact page. Here you'll find a form to send Mohamed a message directly by providing your full name, email address, and your message."
        } as NavigationAction);
      }
    }
  }

  return null; // No navigation intent detected
}
