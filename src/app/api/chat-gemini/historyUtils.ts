// src/app/api/chat-gemini/historyUtils.ts
import { MAX_HISTORY_MESSAGES } from "./config";

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

  // 1. Initial formatting from client to Gemini structure
  let geminiFormattedHistory: GeminiHistoryEntry[] = clientHistory.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text.trim() }], // Trim text
  }));

  // 2. Ensure history starts with a 'user' role if not empty.
  //    And remove any leading 'model' messages.
  let firstUserMessageIndex = -1;
  for (let i = 0; i < geminiFormattedHistory.length; i++) {
    if (geminiFormattedHistory[i].role === 'user') {
      firstUserMessageIndex = i;
      break;
    }
  }

  if (firstUserMessageIndex > 0) {
    geminiFormattedHistory = geminiFormattedHistory.slice(firstUserMessageIndex);
  } else if (firstUserMessageIndex === -1 && geminiFormattedHistory.length > 0) {
    // Only model messages, invalid for starting history.
    return [];
  }
  // If firstUserMessageIndex is 0, it's already correct or empty.

  if (geminiFormattedHistory.length === 0) {
    return [];
  }

  // 3. Merge consecutive messages from the same role
  const mergedHistory: GeminiHistoryEntry[] = [];
  if (geminiFormattedHistory.length > 0) {
    mergedHistory.push({ ...geminiFormattedHistory[0] }); // Start with the first message

    for (let i = 1; i < geminiFormattedHistory.length; i++) {
      const currentMessage = geminiFormattedHistory[i];
      const lastMessageInMerged = mergedHistory[mergedHistory.length - 1];

      if (currentMessage.role === lastMessageInMerged.role) {
        // Merge text from same-role consecutive messages
        lastMessageInMerged.parts[0].text += `\n${currentMessage.parts[0].text}`;
      } else {
        mergedHistory.push({ ...currentMessage });
      }
    }
  }
  
  let finalHistory = mergedHistory;

  // 4. Apply MAX_HISTORY_MESSAGES limit (sliding window, keeps the most recent)
  if (finalHistory.length > MAX_HISTORY_MESSAGES) {
    finalHistory = finalHistory.slice(finalHistory.length - MAX_HISTORY_MESSAGES);
  }

  // 5. Ensure the history (if now starting with 'model' after slice) is corrected.
  //    This can happen if MAX_HISTORY_MESSAGES is an odd number and the slice
  //    results in a 'model' message at the beginning.
  if (finalHistory.length > 0 && finalHistory[0].role === 'model') {
    // If the first message is now a model message, we need to remove it
    // as history must start with a user message.
    finalHistory = finalHistory.slice(1); 
  }
  
  // 6. Final check for strict alternation. This is more of a safeguard.
  //    The merging step should handle most cases.
  if (finalHistory.length > 1) {
    const strictlyAlternatingHistory: GeminiHistoryEntry[] = [finalHistory[0]];
    for (let i = 1; i < finalHistory.length; i++) {
      if (finalHistory[i].role !== strictlyAlternatingHistory[strictlyAlternatingHistory.length - 1].role) {
        strictlyAlternatingHistory.push(finalHistory[i]);
      } else {
        // This case should ideally not be hit if merging worked correctly.
        // If it does, it means there's still a sequence like user, user.
        // We'll merge the current one into the previous one.
        const lastEntry = strictlyAlternatingHistory[strictlyAlternatingHistory.length - 1];
        lastEntry.parts[0].text += `\n${finalHistory[i].parts[0].text}`;
        console.warn("prepareChatHistory: Corrected non-alternating roles in final pass by merging.");
      }
    }
    finalHistory = strictlyAlternatingHistory;
  }


  // The history passed to `startChat` should be an array of Content objects
  // that alternate user and model roles.
  // If the history is intended to be [user1, model1, user2, model2],
  // and the next message is user3, then history should be [user1, model1, user2, model2].
  // If the history is [user1, model1, user2],
  // and the next message is model2 (from AI), this function isn't for that.
  // This function prepares history FOR a new user message.
  // So, if the very last message in finalHistory is 'user', it might be problematic
  // if the API expects to append another 'user' message.
  // However, `startChat` takes the history, and then `sendMessage` sends the *new* user message.
  // So, the history can end in 'model'. If it ends in 'user', it implies the last turn was by the user,
  // and the model hasn't responded yet, which is unusual for preparing history for a *new* user message.
  // For Gemini API, the history should be clean: [user, model, user, model ...].
  // If the last message is 'user', it means the model's response for that is missing.
  // Let's ensure the history ends with a 'model' message if it's not empty and has more than one entry,
  // or is a single 'user' message.
  
  if (finalHistory.length > 0 && finalHistory[finalHistory.length -1].role === 'user') {
      // If the last message is from the user, it implies the AI hasn't responded to it yet.
      // For the `startChat({ history })` method, this might be okay if the history
      // represents the state *before* the current user's new message.
      // However, some interpretations of "history" for a new message imply the last recorded
      // message should be the model's last response.
      // Given Gemini's `startChat({history})` and then `chat.sendMessage(newUserQuery)`,
      // the history should represent the conversation *up to* the new user query.
      // So, it's fine if it ends with 'user' or 'model'.
      // The critical part is the strict alternation.
  }

  return finalHistory;
}
