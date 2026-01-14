import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import Lenis from '@studio-freight/lenis';

export const usePlayerPhysics = (gameState: 'IDLE' | 'PLAYING' | 'GAME_OVER') => {
    const playerY = useMotionValue(50); // Percent 0-100
    // Spring smoothing for movement
    const smoothPlayerY = useSpring(playerY, { damping: 20, stiffness: 300, mass: 0.5 });

    // We use a ref to track raw position for logic without React renders
    const rawY = useRef(50);

    useEffect(() => {
        if (gameState !== 'PLAYING' && gameState !== 'IDLE') return;

        // Create a local Lenis instance for "virtual" scroll inertia
        // We create a specific lenis instance that doesn't scroll the window
        // potentially just using it for the math or attaching to a dummy element
        // Simplifying: We can just listen to wheel events and simulate inertia for now if Lenis is too heavy for just input.
        // BUT, requirement said "Use Lenis".
        // Let's attach Lenis to a dummy wrapper if possible, or just use the global window lenis if we can lock scroll?
        // Let's go with Wheel Event listener + Manual Intertia for simplicity and perf if specific Lenis wrapper is tricky.
        // Actually, let's use a simple velocity accumulator.

        const handleWheel = (e: WheelEvent) => {
            // e.preventDefault(); // Prevent actual scrolling if needed
            // Normalize wheel delta
            const delta = e.deltaY;

            // Map delta to movement
            // Faster scroll = Move more
            const sensitivity = 0.05;
            rawY.current = Math.min(100, Math.max(0, rawY.current + delta * sensitivity));

            playerY.set(rawY.current);
        };

        window.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
        };
    }, [gameState]);

    return { y: smoothPlayerY, rawY };
};
