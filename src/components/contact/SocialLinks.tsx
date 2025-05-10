'use client';

import { motion, Variants } from 'framer-motion';
import { Linkedin, Github, Mail, MessageCircle } from 'lucide-react'; // Changed Twitter to MessageCircle

const defaultItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const socialIconVariants: Variants = {
  hover: { 
    scale: 1.25, 
    y: -5,
    rotate: [0, -10, 10, -5, 5, 0], 
    // Color will be handled by Tailwind classes for theme awareness
    transition: { y: {type: "spring", stiffness: 300, damping: 10}, rotate: {duration: 0.5}}
  },
  tap: { scale: 0.9, y:0, transition: {type: "spring", stiffness: 400, damping: 15} }
};

const socialLinksData = [
  { Icon: Linkedin, href: 'https://www.linkedin.com/in/kareem-ehab-3530341b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn' },
  { Icon: Github, href: 'https://github.com/kareem2099', label: 'GitHub' },
  { Icon: MessageCircle, href: 'https://wa.me/201022876456', label: 'WhatsApp' }, // Changed from Twitter
  { Icon: Mail, href: 'mailto:kareem209907@gmail.com', label: 'Email' },
];

interface SocialLinksProps {
  variants?: Variants;
}

export default function SocialLinks({ variants = defaultItemVariants }: SocialLinksProps) {
  return (
    <motion.div variants={variants} className="mt-12 text-center">
      <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-200 mb-6">Or Connect Through</h3>
      <div className="flex justify-center space-x-6">
        {socialLinksData.map(({ Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Connect on ${label}`}
              variants={socialIconVariants} // Framer Motion variants for transform/rotate
              whileHover="hover"
              whileTap="tap"
              className="text-slate-500 hover:text-pink-600 dark:text-slate-400 dark:hover:text-rose-400 transition-colors duration-300" // Tailwind for colors
            >
              <Icon size={32} />
            </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
