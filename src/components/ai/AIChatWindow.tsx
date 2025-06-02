'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage, { Message } from './ChatMessage';
import { Send, X, Bot } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Import useRouter

interface AIChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIChatWindow({ isOpen, onClose }: AIChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // Initialize router

  // Initial greeting from AI
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { id: 'greet1', sender: 'ai', text: "Hi there! I'm Mohamed's AI assistant. How can I help you today?" },
      ]);
    }
  }, [isOpen, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: trimmedInput,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat-gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmedInput, history: messages }), // Send history for context
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      const aiResponseText = data.reply || "Sorry, I couldn't get a response.";
      
      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText, // This will be the navigation confirmation or actual reply
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);

      if (data.action === 'navigate' && data.path) {
        const navigationPath = data.path;
        const postNavPromptText = data.postNavigationPrompt;

        // Perform navigation
        router.push(navigationPath);

        // After a short delay (to allow navigation to visually start/complete),
        // if there's a post-navigation prompt, add it as a new AI message.
        if (postNavPromptText) {
          setTimeout(() => {
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                id: (Date.now() + 2).toString(), // Ensure unique ID
                text: postNavPromptText,
                sender: 'ai',
                timestamp: new Date(),
              },
            ]);
          }, 1000); // 1-second delay, adjust as needed
        }
      }

    } catch (error) {
      console.error("Failed to send message to AI:", error);
      const errorAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, something went wrong while trying to reach the AI. Please try again later.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorAiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const windowVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 20, stiffness: 150 } },
    exit: { opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={windowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-24 right-6 sm:bottom-8 sm:right-8 w-[calc(100%-3rem)] sm:w-96 h-[70vh] sm:h-[600px] max-h-[calc(100vh-8rem)] bg-white dark:bg-slate-800 rounded-xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700 z-[60]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
            <div className="flex items-center">
              <Bot size={24} className="text-pink-500 dark:text-pink-400 mr-2" />
              <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">AI Assistant</h3>
            </div>
            <motion.button
              onClick={onClose}
              className="p-1 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close chat"
            >
              <X size={20} />
            </motion.button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow p-4 space-y-3 overflow-y-auto">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <motion.div 
                    initial={{opacity:0, scale:0.5}} animate={{opacity:1, scale:1}}
                    className="p-3 rounded-xl shadow bg-slate-200 dark:bg-slate-700 rounded-bl-none"
                  >
                  <div className="flex items-center space-x-1.5">
                    <motion.div className="w-2 h-2 bg-slate-500 rounded-full" animate={{scale:[1,1.2,1], opacity:[0.5,1,0.5]}} transition={{duration:0.8, repeat:Infinity, ease:"easeInOut"}} />
                    <motion.div className="w-2 h-2 bg-slate-500 rounded-full" animate={{scale:[1,1.2,1], opacity:[0.5,1,0.5]}} transition={{duration:0.8, repeat:Infinity, ease:"easeInOut", delay:0.2}} />
                    <motion.div className="w-2 h-2 bg-slate-500 rounded-full" animate={{scale:[1,1.2,1], opacity:[0.5,1,0.5]}} transition={{duration:0.8, repeat:Infinity, ease:"easeInOut", delay:0.4}} />
                  </div>
                </motion.div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-grow px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors placeholder-slate-400 dark:placeholder-slate-500"
                disabled={isLoading}
              />
              <motion.button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="p-2.5 rounded-lg bg-pink-500 hover:bg-pink-600 text-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                whileHover={!isLoading && inputValue.trim() ? { scale: 1.1 } : {}}
                whileTap={!isLoading && inputValue.trim() ? { scale: 0.95 } : {}}
                aria-label="Send message"
              >
                <Send size={20} />
              </motion.button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
