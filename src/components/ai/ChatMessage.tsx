'use client';

import { motion } from 'framer-motion';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp?: Date; // Optional
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';

  const messageVariants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      x: isUser ? 20 : -20,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 150, damping: 20, duration: 0.4 } 
    },
  };

  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      className={`flex mb-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[70%] sm:max-w-[60%] p-3 rounded-xl shadow
          ${
            isUser
              ? 'bg-pink-500 dark:bg-pink-600 text-white rounded-br-none'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-none'
          }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        {/* Optionally display timestamp */}
        {/* {message.timestamp && (
          <p className={`text-xs mt-1 ${isUser ? 'text-pink-200' : 'text-slate-500 dark:text-slate-400'} text-right`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )} */}
      </div>
    </motion.div>
  );
}
