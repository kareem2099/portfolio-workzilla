'use client';

import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { useTranslations } from 'next-intl';

const defaultItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

interface JourneySectionProps {
  variants?: typeof defaultItemVariants;
}

export default function JourneySection({ variants = defaultItemVariants }: JourneySectionProps) {
  const t = useTranslations('aboutPage.journeySection');

  return (
    <motion.section variants={variants} className="mb-16">
      <h2 className="text-4xl font-bold mb-8 text-center text-purple-600 dark:text-purple-300 flex items-center justify-center">
        <Briefcase className="mr-3 h-10 w-10" /> {t('title')}
      </h2>
      <div className="bg-slate-100 dark:bg-gray-800/50 dark:backdrop-blur-md p-8 rounded-xl shadow-xl dark:shadow-2xl space-y-6 text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-transparent">
        <p>
          {t('paragraph1')}
        </p>
        <p>
          {t('paragraph2')}
        </p>
        <p>
          {t('paragraph3')}
        </p>
      </div>
    </motion.section>
  );
}
