import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [isPointer, setIsPointer] = useState(false);
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
      const target = e.target as HTMLElement;
      const isClickable = target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || window.getComputedStyle(target).cursor === 'pointer';
      setIsPointer(!!isClickable);
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);
  return <>
      {/* Main cursor dot */}
      <motion.div className="fixed top-0 left-0 w-4 h-4 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference" animate={{
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: isPointer ? 1.5 : 1
    }} transition={{
      type: 'spring',
      stiffness: 500,
      damping: 28,
      mass: 0.5
    }} />

      {/* Cursor ring */}
      <motion.div className="fixed top-0 left-0 w-10 h-10 border-2 border-accent/50 rounded-full pointer-events-none z-[9998] mix-blend-difference" animate={{
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: isPointer ? 1.5 : 1
    }} transition={{
      type: 'spring',
      stiffness: 150,
      damping: 15,
      mass: 0.1
    }} />

      {/* Spotlight glow effect */}
      <motion.div className="fixed top-0 left-0 w-96 h-96 pointer-events-none z-[9997] opacity-30" style={{
      background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
      filter: 'blur(40px)'
    }} animate={{
      x: mousePosition.x - 192,
      y: mousePosition.y - 192
    }} transition={{
      type: 'spring',
      stiffness: 50,
      damping: 20
    }} />
    </>;
}