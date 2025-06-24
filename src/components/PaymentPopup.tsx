'use client';

import { motion } from 'framer-motion';
import VisaPaymentForm from './VisaPaymentForm';
import { useState } from 'react';

interface PaymentPopupProps {
  onClose: () => void;
  price: number;
}

export default function PaymentPopup({ onClose, price }: PaymentPopupProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
      <motion.div
        className="bg-white dark:bg-slate-800/60 dark:backdrop-blur-md p-8 rounded-md shadow-lg"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-2">Payment Information</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-2">Select your payment method:</p>
        <div className="flex flex-col space-y-2">
          <button 
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setSelectedPaymentMethod('paypal')}
          >
            PayPal
          </button>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setSelectedPaymentMethod('visa')}
          >
            Visa
          </button>
          {selectedPaymentMethod === 'visa' && <VisaPaymentForm price={price} />}
        </div>
        <p className="text-slate-600 dark:text-slate-300 mt-4">Unfortunately, we are unable to process payments at this time. Please check back later.</p>
        <p className="text-slate-600 dark:text-slate-300">Thank you for your understanding.</p>
        <button onClick={onClose} className="mt-4 bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded">Close</button>
      </motion.div>
    </div>
  );
}
