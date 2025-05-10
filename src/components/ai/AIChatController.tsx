'use client';

import { useState, useEffect } from 'react';
import AIChatbotButton from './AIChatbotButton';
import AIChatWindow from './AIChatWindow';
import ChatbotIntroPopup from './ChatbotIntroPopup';

export default function AIChatController() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showIntroPopup, setShowIntroPopup] = useState(false);

  useEffect(() => {
    // Show the intro popup a bit after the chatbot button likely appears
    const timer = setTimeout(() => {
      setShowIntroPopup(true);
    }, 2500); // Delay after initial page load / button animation
    return () => clearTimeout(timer);
  }, []);

  const handleToggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setShowIntroPopup(false); // Hide intro popup when chat is interacted with
  };

  const handleCloseIntroPopup = () => {
    setShowIntroPopup(false);
  };

  return (
    <>
      <AIChatbotButton onClick={handleToggleChat} />
      <ChatbotIntroPopup isVisible={showIntroPopup} onClose={handleCloseIntroPopup} />
      <AIChatWindow isOpen={isChatOpen} onClose={handleToggleChat} />
    </>
  );
}
