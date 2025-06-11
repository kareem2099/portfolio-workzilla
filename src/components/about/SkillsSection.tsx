'use client';

import { motion, Variants } from 'framer-motion';
import { Zap, Smartphone, Code, Wind, Palette } from 'lucide-react'; // Removed Award, Added Wind for Tailwind, Palette for UI/UX
import InteractiveSkillCard from './InteractiveSkillCard';
import { useTranslations } from 'next-intl';

const skillCardMotionVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 120, delay: Math.random() * 0.2 },
  },
  hover: { scale: 1.05, boxShadow: "0px 8px 15px rgba(0,0,0,0.1)", y: -4 }
};


// Helper function to get skill data from translations
const getSkillData = (t: ReturnType<typeof useTranslations>, skillKey: string, icon: React.ReactElement, levelKey: string, experienceCount: number, experienceUnit: 'years' | 'months', projectsCount?: number, detailsColor?: string, isPulsing?: boolean) => {
  return {
    name: t(`skills.${skillKey}.name`),
    icon,
    level: t(`levels.${levelKey}`),
    experience: t(`experienceUnit.${experienceUnit}`, { count: experienceCount }),
    projects: projectsCount ? t('projectsUnit', { count: projectsCount }) : undefined,
    detailsColor,
    isPulsing,
  };
};

const sectionItemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

interface SkillsSectionProps {
  variants?: Variants;
}

const skillsetTitleVariants: Variants = {
  initial: { opacity: 0.8 },
  animate: {
    opacity: [0.7, 1, 0.7],
    textShadow: [
      "0 0 5px #ff00de, 0 0 10px #ff00de, 0 0 15px #ff00de",
      "0 0 10px #ff00de, 0 0 20px #ff00de, 0 0 30px #ff00de, 0 0 40px #ff00de",
      "0 0 5px #ff00de, 0 0 10px #ff00de, 0 0 15px #ff00de",
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

export default function SkillsSection({ variants = sectionItemVariants }: SkillsSectionProps) {
  const t = useTranslations('aboutPage.skillsSection');

  const skillsData = [
    getSkillData(t, 'nextjs', <Zap className="h-8 w-8 text-purple-600 dark:text-purple-400" />, 'advanced', 3, 'years', 3, undefined, true),
    getSkillData(t, 'javascript', <Zap className="h-8 w-8 text-yellow-500 dark:text-yellow-400" />, 'advanced', 4, 'years', 7, 'text-yellow-500 dark:text-yellow-400'),
    getSkillData(t, 'webDevelopment', <Code className="h-8 w-8 text-sky-600 dark:text-sky-400" />, 'advanced', 3, 'years', 4, 'text-yellow-500 dark:text-yellow-400'),
    getSkillData(t, 'tailwindCss', <Wind className="h-8 w-8 text-teal-600 dark:text-teal-400" />, 'proficient', 3, 'years', 3),
    getSkillData(t, 'framerMotion', <motion.div className="h-8 w-8 text-pink-600 dark:text-pink-400"> 
                                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5zM12 12.53L2.93 8 12 3.47 21.07 8 12 12.53z"></path></svg>
                                      </motion.div>, 'proficient', 2, 'years'),
    getSkillData(t, 'flutter', <Smartphone className="h-8 w-8 text-blue-600 dark:text-blue-400" />, 'advanced', 2, 'years', 10, undefined, true),
    getSkillData(t, 'dart', <Smartphone className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />, 'advanced', 2, 'years', 10),
    getSkillData(t, 'kotlin', <Smartphone className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />, 'advanced', 3, 'months', 2, undefined, true),
    getSkillData(t, 'reactjs', <Code className="h-8 w-8 text-blue-700 dark:text-blue-500" />, 'advanced', 4, 'years', 4, undefined, true),
    getSkillData(t, 'uiuxDesign', <Palette className="h-8 w-8 text-orange-500 dark:text-orange-400" />, 'intermediate', 2, 'years', undefined, undefined, true),
  ];

  return (
    <motion.section variants={variants} className="mb-16">
      <motion.h2 
        className="text-4xl font-bold mb-12 text-center text-pink-600 dark:text-pink-300 flex items-center justify-center"
        variants={skillsetTitleVariants}
        initial="initial"
        animate="animate"
      >
        <Zap className="mr-3 h-10 w-10" /> {t('title')}
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8"> {/* Adjusted grid for potentially taller cards */}
        {skillsData.map((skill) => (
          <InteractiveSkillCard
            key={skill.name}
            name={skill.name}
            icon={skill.icon}
            level={skill.level}
            experience={skill.experience}
            projects={skill.projects}
            detailsColor={skill.detailsColor}
            // baseColor prop removed from InteractiveSkillCard
            skillVariants={skillCardMotionVariants}
            isPulsing={skill.isPulsing}
          />
        ))}
      </div>
    </motion.section>
  );
}
