'use client';

import { motion } from 'framer-motion';
import { MessageSquarePlus } from 'lucide-react'; // Or another suitable icon

interface AIChatbotButtonProps {
  onClick: () => void;
}

export default function AIChatbotButton({ onClick }: AIChatbotButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white rounded-full shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      aria-label="Open AI Chatbot"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.5, type: 'spring', stiffness: 100 }}
    >
      <MessageSquarePlus size={28} />
    </motion.button>
  );
}
