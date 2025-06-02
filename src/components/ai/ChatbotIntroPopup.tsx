'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquarePlus } from 'lucide-react'; // MessageSquarePlus to hint at the button
import { useEffect } from 'react';

interface ChatbotIntroPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function ChatbotIntroPopup({ isVisible, onClose }: ChatbotIntroPopupProps) {
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isVisible) {
      timer = setTimeout(() => {
        onClose();
      }, 7000); // Auto-close after 7 seconds
    }
    return () => clearTimeout(timer);
  }, [isVisible, onClose]);

  const popupVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 20, stiffness: 200, delay: 0.5 } }, // Delay slightly after button appears
    exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={popupVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-28 right-6 sm:bottom-24 sm:right-24 z-50 p-4 w-64 sm:w-72 bg-slate-700 dark:bg-slate-800 text-white rounded-lg shadow-xl border border-slate-600 dark:border-slate-700"
          role="alert"
        >
          <button 
            onClick={onClose} 
            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-white"
            aria-label="Close introductory message"
          >
            <X size={18} />
          </button>
          <div className="flex items-start">
            <MessageSquarePlus size={24} className="text-pink-400 dark:text-pink-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold mb-1">Mohamed&apos;s AI Assistant</p>
              <p className="text-xs text-slate-200 dark:text-slate-300">
                Hi there! I am Mohamed&apos;s AI. Press the chat icon below to get assistance!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
