import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { ThemeToggle } from './ThemeToggle';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGame } from '../context/GameContext';


export function Navigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const progress = useScrollProgress();
  const { openGame } = useGame();

  gsap.registerPlugin(ScrollToPlugin);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  const navItems = [{
    label: 'About',
    href: '#about'
  }, {
    label: 'Projects',
    href: '#projects'
  }, {
    label: 'Experience',
    href: '#experience'
  }, {
    label: 'Skills',
    href: '#skills'
  }, {
    label: 'Contact',
    href: '#contact'
  }];

  const handleScrollTo = (target: any) => {
    gsap.to(window, {
      duration: 3,
      scrollTo: target,
      ease: "power2.out"
    });
  };

  return <>
    <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent z-50" style={{
      scaleX: progress / 100,
      transformOrigin: '0%'
    }} />

    <AnimatePresence>
      {isVisible && <motion.nav initial={{
        y: -100
      }} animate={{
        y: 0
      }} exit={{
        y: -100
      }} transition={{
        duration: 0.3
      }} className="fixed top-0 left-0 right-0 z-40 bg-elevated/80 backdrop-blur-md border-b border-custom">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.a href="#hero" className="text-xl font-bold gradient-text" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
              {'<Dev />'}
            </motion.a>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => <motion.button key={item.href} onClick={() => handleScrollTo(item.href)} className="text-secondary hover:text-primary relative group transition-colors" initial={{
                opacity: 0,
                y: -20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: index * 0.1
              }}>
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
              </motion.button>)}

              {/* Game Button */}
              <motion.button
                onClick={openGame}
                className="px-4 py-1.5 bg-accent-primary/10 border border-accent-primary/30 rounded-full text-accent-primary text-sm font-bold flex items-center gap-2 hover:bg-accent-primary hover:text-white transition-all"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>🎮</span>
              </motion.button>

              <ThemeToggle />
            </div>

            <div className="md:hidden flex items-center gap-4">
              <button onClick={openGame} className="text-2xl">🎮</button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.nav>}
    </AnimatePresence>
  </>;
}