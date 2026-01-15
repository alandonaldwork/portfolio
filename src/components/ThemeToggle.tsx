import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SunIcon, MoonIcon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
export function ThemeToggle() {
  const {
    theme,
    toggleTheme
  } = useTheme();
  return <motion.button onClick={toggleTheme} className="relative w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-custom-md" whileHover={{
    scale: 1.1
  }} whileTap={{
    scale: 0.9
  }} aria-label="Toggle theme">
    <AnimatePresence mode="wait">
      {theme === 'light' ? <motion.div key="sun" initial={{
        rotate: -90,
        opacity: 0
      }} animate={{
        rotate: 0,
        opacity: 1
      }} exit={{
        rotate: 90,
        opacity: 0
      }} transition={{
        duration: 0.2
      }}>
        <SunIcon className="w-5 h-5 text-primary" />
      </motion.div> : <motion.div key="moon" initial={{
        rotate: 90,
        opacity: 0
      }} animate={{
        rotate: 0,
        opacity: 1
      }} exit={{
        rotate: -90,
        opacity: 0
      }} transition={{
        duration: 0.2
      }}>
        <MoonIcon className="w-5 h-5 text-primary" />
      </motion.div>}
    </AnimatePresence>
  </motion.button>;
}