import { useEffect, useState } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';
export function useScrollAnimation(offset: [string, string] = ['start end', 'end start']) {
  const {
    scrollYProgress
  } = useScroll();
  return {
    scrollYProgress,
    y: useTransform(scrollYProgress, [0, 1], [0, -100]),
    opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]),
    scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  };
}
export function useParallax(distance: number = 100) {
  const {
    scrollY
  } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, distance]);
  return y;
}
export function useSectionScroll(ref: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      // Calculate progress from when element enters viewport to when it leaves
      const start = rect.top - windowHeight;
      const end = rect.bottom;
      const total = windowHeight + elementHeight;
      const current = windowHeight - rect.top;
      const scrollProgress = Math.max(0, Math.min(1, current / total));
      setProgress(scrollProgress);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);
  return progress;
}