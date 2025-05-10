'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Send, User, AtSign, MessageCircle } from 'lucide-react';

const itemVariants: Variants = { // For the overall form container
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const inputVariants: Variants = {
  focus: { 
    borderColor: "rgba(236, 72, 153, 1)", // pink-500
    boxShadow: "0 0 0 3px rgba(236, 72, 153, 0.4)",
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  blur: { 
    borderColor: "rgba(55, 65, 81, 1)", // gray-600 / slate-600
    boxShadow: "0 0 0 0px rgba(236, 72, 153, 0)",
    scale: 1,
    transition: { duration: 0.2 }
  }
};

interface ContactFormProps {
  variants?: Variants;
}

export default function ContactForm({ variants = itemVariants }: ContactFormProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{name?: string, email?: string, message?: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({...errors, [e.target.name]: undefined });
    }
  };

  const validateForm = () => {
    const tempErrors: {name?: string, email?: string, message?: string} = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid.";
    }
    if (!formData.message.trim()) tempErrors.message = "Message is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const [isSubmitting, setIsSubmitting] = useState(false); // For button state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      // Optionally, trigger a shake animation on the form or button if validation fails
      return;
    }
    
    setIsSubmitting(true); // Indicate submission start
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    console.log('Form data:', formData); 
    setIsSubmitted(true);
    setIsSubmitting(false); // Reset submission state
  };

  const errorTextVariants = {
    initial: { opacity: 0, y: -5 },
    animate: { opacity: 1, y: 0, x: [0, -2, 2, -2, 2, 0], transition: { duration: 0.3, x: {duration: 0.2} } },
    exit: { opacity: 0, y: -5 }
  };

  return (
    <motion.div 
      variants={variants} 
      className="bg-white dark:bg-slate-800/50 dark:backdrop-blur-lg p-8 sm:p-10 rounded-2xl shadow-xl dark:shadow-2xl relative border border-slate-200 dark:border-transparent"
    >
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="thankyou"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15, delay:0.1 } }}
            exit={{ opacity: 0, y: -50, scale: 0.9, transition: { duration: 0.3, ease:"easeIn" } }}
            className="text-center py-10"
          >
            <motion.div 
                initial={{ scale:0 }} animate={{ scale:1 }} transition={{delay:0.1, type:'spring', stiffness:150}}
                className="inline-block p-3 bg-green-100 dark:bg-green-500/20 rounded-full mb-4"
              >
                <Send size={40} className="text-green-600 dark:text-green-400" />
              </motion.div>
              <h2 className="text-3xl font-semibold text-green-600 dark:text-green-400 mb-3">Message Sent!</h2>
              <p className="text-slate-600 dark:text-slate-300">Thank you for reaching out, {formData.name}. I&apos;ll get back to you soon.</p>
               <button 
                  onClick={() => { setIsSubmitted(false); setFormData({ name: '', email: '', message: '' }); setErrors({}); }}
                  className="mt-6 px-6 py-2 text-sm font-medium text-pink-600 border border-pink-500 rounded-lg hover:bg-pink-500 hover:text-white dark:text-pink-400 dark:border-pink-400 dark:hover:bg-pink-400 dark:hover:text-slate-900 transition-colors duration-300"
                >
                  Send Another Message
                </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3, ease:"easeIn" } }}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                <User size={16} className="inline mr-2 opacity-70" />Full Name
              </label>
              <motion.input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                variants={inputVariants}
                whileFocus="focus"
                onBlurCapture={() => { /* Trigger blur variant if needed, though whileFocus handles reversal */ }}
                className={`w-full px-4 py-3 bg-slate-100 dark:bg-slate-700/50 border ${errors.name ? 'border-red-500 dark:border-red-500' : 'border-slate-300 dark:border-slate-600'} rounded-lg text-slate-900 dark:text-slate-100 focus:ring-0 focus:outline-none transition-colors duration-300 placeholder-slate-400 dark:placeholder-slate-500`}
                placeholder="Kareem Ehab"
              />
              <AnimatePresence>
                {errors.name && <motion.p variants={errorTextVariants} initial="initial" animate="animate" exit="exit" className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.name}</motion.p>}
              </AnimatePresence>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                <AtSign size={16} className="inline mr-2 opacity-70" />Email Address
              </label>
              <motion.input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                variants={inputVariants}
                whileFocus="focus"
                className={`w-full px-4 py-3 bg-slate-100 dark:bg-slate-700/50 border ${errors.email ? 'border-red-500 dark:border-red-500' : 'border-slate-300 dark:border-slate-600'} rounded-lg text-slate-900 dark:text-slate-100 focus:ring-0 focus:outline-none transition-colors duration-300 placeholder-slate-400 dark:placeholder-slate-500`}
                placeholder="you@example.com"
              />
              <AnimatePresence>
                {errors.email && <motion.p variants={errorTextVariants} initial="initial" animate="animate" exit="exit" className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.email}</motion.p>}
              </AnimatePresence>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                <MessageCircle size={16} className="inline mr-2 opacity-70" />Your Message
              </label>
              <motion.textarea
                name="message"
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                variants={inputVariants}
                whileFocus="focus"
                className={`w-full px-4 py-3 bg-slate-100 dark:bg-slate-700/50 border ${errors.message ? 'border-red-500 dark:border-red-500' : 'border-slate-300 dark:border-slate-600'} rounded-lg text-slate-900 dark:text-slate-100 focus:ring-0 focus:outline-none transition-colors duration-300 resize-none placeholder-slate-400 dark:placeholder-slate-500`}
                placeholder="How can I help you today?"
              />
              <AnimatePresence>
                {errors.message && <motion.p variants={errorTextVariants} initial="initial" animate="animate" exit="exit" className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.message}</motion.p>}
              </AnimatePresence>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3 text-lg font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:ring-opacity-50 transition-all duration-300 ease-in-out
                ${isSubmitting 
                  ? 'bg-slate-400 dark:bg-slate-500 text-slate-600 dark:text-slate-400 cursor-not-allowed' 
                  : 'text-white bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:shadow-xl dark:from-pink-600 dark:via-red-600 dark:to-yellow-600'
                }`}
              whileHover={!isSubmitting ? { scale: 1.03, y:-2, boxShadow: "0px 8px 20px rgba(236, 72, 153, 0.4)" } : {}} // Simplified boxShadow
              whileTap={!isSubmitting ? { scale: 0.97, y:0 } : {}}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            >
              {isSubmitting ? (
                <motion.div className="flex items-center justify-center"
                  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                >
                  <motion.div 
                    className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full mr-2"
                    animate={{rotate:360}}
                    transition={{duration:0.7, repeat:Infinity, ease:"linear"}}
                  />
                  Sending...
                </motion.div>
              ) : (
                <>Send Message <Send size={20} className="inline ml-2" /></>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
