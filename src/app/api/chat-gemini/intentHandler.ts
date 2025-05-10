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
          return NextResponse.json({ action: "navigate", path: "/contact", reply: "Great, taking you to the Contact page!" } as NavigationAction);
        } else if (lastAiText.includes("about page")) {
          return NextResponse.json({ action: "navigate", path: "/about", reply: "Great, taking you to the About page!" } as NavigationAction);
        } else if (lastAiText.includes("projects page")) {
          return NextResponse.json({ action: "navigate", path: "/projects", reply: "Great, taking you to the Projects page!" } as NavigationAction);
        } else if (lastAiText.includes("home page") || lastAiText.includes("main portfolio page")) {
          return NextResponse.json({ action: "navigate", path: "/", reply: "Great, taking you to the Home page!" } as NavigationAction);
        }
        // If "yes" to a generic navigation offer without a clear page, AI might need to ask "where to?"
        // For now, if it's a nav offer but no page is matched above, we let it fall through to Gemini.
      }
    }
  }

  // 2. Check for explicit navigation intents (if not a "yes" to a prior offer)
  if (userMessageLower.includes("navigate to about") || userMessageLower.includes("go to about") || userMessageLower.includes("show me about")) {
    return NextResponse.json({ action: "navigate", path: "/about", reply: "Okay, navigating to the About page for you!" } as NavigationAction);
  }
  if (userMessageLower.includes("projects") && (userMessageLower.includes("show me") || userMessageLower.includes("tell me about") || userMessageLower.includes("what are") || userMessageLower.includes("navigate to") || userMessageLower.includes("go to"))) {
    return NextResponse.json({ action: "navigate", path: "/projects", reply: "Sure, let's head over to the Projects page to see Kareem's work!" } as NavigationAction);
  }
  if ((userMessageLower.includes("navigate to contact") || userMessageLower.includes("go to contact") || userMessageLower.includes("show me contact")) ||
      (userMessageLower.includes("contact") && (userMessageLower.includes("kareem") || userMessageLower.includes("information") || userMessageLower.includes("details") || userMessageLower.includes("whatsapp") || userMessageLower.includes("connect with him")) ) ) {
    return NextResponse.json({ 
      action: "navigate", path: "/contact",
      reply: "Okay, I'll take you to the Contact page where you can find Kareem's contact details." 
    } as NavigationAction);
  }
  if (userMessageLower.includes("navigate to home") || userMessageLower.includes("go home") || userMessageLower.includes("show me home")) {
    return NextResponse.json({ action: "navigate", path: "/", reply: "Okay, taking you to the Home page." } as NavigationAction);
  }

  // 3. Contextual navigation for generic "navigate me" (less specific than "yes" to an offer)
  if (userMessageLower.includes("navigate me") || userMessageLower.includes("take me to")) {
    const lastAiMessageInHistory = processedHistory.length > 0 ? processedHistory[processedHistory.length - 1] : null;
    if (lastAiMessageInHistory && lastAiMessageInHistory.role === 'model') {
      const lastAiText = lastAiMessageInHistory.parts[0].text.toLowerCase();
      if (lastAiText.includes("projects page")) {
        return NextResponse.json({ action: "navigate", path: "/projects", reply: "Okay, navigating to the Projects page as you asked!" } as NavigationAction);
      } else if (lastAiText.includes("about page")) {
        return NextResponse.json({ action: "navigate", path: "/about", reply: "Okay, navigating to the About page as you asked!" } as NavigationAction);
      } else if (lastAiText.includes("contact page")) { 
        return NextResponse.json({ action: "navigate", path: "/contact", reply: "Okay, navigating to the Contact page as you asked!" } as NavigationAction);
      }
    }
  }

  return null; // No navigation intent detected
}
