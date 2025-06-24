'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import PaymentPopup from '@/components/PaymentPopup';

export default function WindowsBuyPage() {
  const [showPayment, setShowPayment] = useState(false);

  const handleClosePayment = () => {
    setShowPayment(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 dark:text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="container mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-5xl font-bold mb-4">Stocktune for Windows</h1>
        <Image
          src="/assets/project-placeholder-1.png"
          alt="Stocktune"
          width={500}
          height={300}
          className="rounded-lg shadow-md mb-4"
        />
        <p className="text-lg mb-4">Stocktune is a powerful desktop application that allows you to easily search, download, and organize royalty-free stock music for your creative projects. With Stocktune, you can:</p>
        <ul className="list-disc pl-5 mb-4">
          <li>Quickly find the perfect music for your videos, podcasts, and more.</li>
          <li>Download high-quality audio files in various formats.</li>
          <li>Organize your music library with tags and playlists.</li>
          <li>Use the music in your projects without worrying about copyright issues.</li>
        </ul>
        <p className="mb-4">Thank you for purchasing Stocktune for Windows! To complete your purchase, please click the button below:</p>
        <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowPayment(true)}>
          Buy Now - $30 (Windows Version)
        </button>
        {showPayment && (
          <PaymentPopup onClose={handleClosePayment} price={30} />
        )}
      </motion.div>
    </div>
  );
}
