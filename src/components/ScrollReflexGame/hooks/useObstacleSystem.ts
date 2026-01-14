import { useRef, useCallback } from 'react';
import gsap from 'gsap';

export interface Obstacle {
    id: string;
    element: HTMLDivElement;
    x: number;
    y: number; // 0-100%
    width: number;
    height: number;
    speed: number;
    active: boolean;
}

export const useObstacleSystem = (gameState: 'IDLE' | 'PLAYING' | 'GAME_OVER') => {
    const obstaclesRef = useRef<Obstacle[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const timeRef = useRef(0);
    const difficultyRef = useRef(1);

    const spawnObstacle = useCallback(() => {
        if (!containerRef.current) return;

        const id = Math.random().toString(36).substr(2, 9);
        const y = Math.random() * 90 + 5; // 5% to 95%
        const size = Math.random() * 40 + 20; // 20px - 60px
        // FIX: Speed was way too high (3-5). Reduced to 0.2 - 0.5 range (vw per frame approx)
        const speed = (Math.random() * 0.3 + 0.2) * difficultyRef.current;

        // Create element
        const el = document.createElement('div');
        el.className = 'obstacle';
        el.style.top = `${y}%`;
        el.style.height = `${size}px`;
        el.style.width = `${size * 1.5}px`; // Rectangular
        el.style.left = '100%'; // Start off screen
        // Hardware acceleration hint
        el.style.willChange = 'transform';

        containerRef.current.appendChild(el);

        obstaclesRef.current.push({
            id,
            element: el,
            x: 100, // %
            y,
            width: size * 1.5,
            height: size,
            speed,
            active: true
        });
    }, []);

    const updateObstacles = useCallback((deltaTime: number) => {
        if (gameState !== 'PLAYING') return;

        timeRef.current += deltaTime;

        // Spawn logic
        // Spawn rate increases with difficulty
        // FIX: Much faster spawning for "More than one at a time"
        // Previous: max(1500, ..) -> New: max(400, ...)
        // Speed is ~0.3vw/frame. 400ms is ~24 frames * 0.3 = 7vw gap. Very tight but playable.
        // Let's go with 600ms base.
        const spawnRate = Math.max(600, 2000 - difficultyRef.current * 300);

        if (timeRef.current > spawnRate) {
            spawnObstacle();

            // 30% Chance to spawn a second obstacle immediately (if difficulty is high enough)
            if (difficultyRef.current > 1.2 && Math.random() > 0.7) {
                setTimeout(() => spawnObstacle(), 300); // Slight delay for staggered pattern
            }

            timeRef.current = 0;
        }

        // Move obstacles
        // Using Percentages for X to be responsive
        // Speed is roughly % per frame? No, better use pixel or consistent unit.
        // Let's use GSAP set for performant transforms

        obstaclesRef.current.forEach(obs => {
            if (!obs.active) return;

            obs.x -= obs.speed * (deltaTime / 16); // Scale by delta

            // Render
            gsap.set(obs.element, { x: `${obs.x}vw`, xPercent: -100 });
            // Note: x is in Viewport Width units (vw) roughly if we treat 100 as screen width
            // Actually, we started at left: 100%. 
            // Let's treat x as offset from left 100%.
            // Cleaner: Set left: 0, x: 100vw to start. move x to -10vw.
            // Let's stick to: Element is absolute at left: 0. transform x is used for positioning.

            // Check bounds
            if (obs.x < -10) { // Off screen left
                obs.active = false;
                obs.element.remove();
            } else {
                gsap.set(obs.element, { left: `${obs.x}vw` });
            }
        });

        // Cleanup
        obstaclesRef.current = obstaclesRef.current.filter(o => o.active);

        // Ramp difficulty
        difficultyRef.current += 0.0005;

    }, [gameState, spawnObstacle]);

    const resetObstacles = useCallback(() => {
        obstaclesRef.current.forEach(o => o.element.remove());
        obstaclesRef.current = [];
        difficultyRef.current = 1;
        timeRef.current = 0;
    }, []);

    return { containerRef, obstaclesRef, updateObstacles, resetObstacles };
};
