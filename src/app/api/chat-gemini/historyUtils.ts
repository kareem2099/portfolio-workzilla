// src/app/api/chat-gemini/historyUtils.ts

interface ClientMessage {
  sender: string;
  text: string;
}

interface GeminiMessagePart {
  text: string;
}

interface GeminiHistoryEntry {
  role: 'user' | 'model';
  parts: GeminiMessagePart[];
}

export function prepareChatHistory(clientHistory: ClientMessage[]): GeminiHistoryEntry[] {
  if (!clientHistory || clientHistory.length === 0) {
    return [];
  }

  let geminiFormattedHistory = clientHistory.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }],
  } as GeminiHistoryEntry)); // Type assertion

  // Ensure history for Gemini starts with a 'user' role if not empty.
  let firstUserMessageIndex = -1;
  for (let i = 0; i < geminiFormattedHistory.length; i++) {
    if (geminiFormattedHistory[i].role === 'user') {
      firstUserMessageIndex = i;
      break;
    }
  }

  if (firstUserMessageIndex > 0) {
    // If there are leading 'model' messages before the first 'user' message
    geminiFormattedHistory = geminiFormattedHistory.slice(firstUserMessageIndex);
  } else if (firstUserMessageIndex === -1 && geminiFormattedHistory.length > 0) {
    // History contains only 'model' messages (or is invalid), so clear it.
    geminiFormattedHistory = [];
  }
  // If firstUserMessageIndex is 0, history already starts with 'user' or is empty.
  
  // Basic alternating role correction (simple version)
  if (geminiFormattedHistory.length > 0) {
    const alternatingHistory: GeminiHistoryEntry[] = [];
    alternatingHistory.push(geminiFormattedHistory[0]);
    for (let i = 1; i < geminiFormattedHistory.length; i++) {
      if (geminiFormattedHistory[i].role !== alternatingHistory[alternatingHistory.length - 1].role) {
        alternatingHistory.push(geminiFormattedHistory[i]);
      } else {
        console.warn("prepareChatHistory: Correcting non-alternating roles by skipping subsequent same role message.");
        // This simple strategy skips the message. A more complex one might merge content.
      }
    }
    return alternatingHistory;
  }

  return geminiFormattedHistory;
}
