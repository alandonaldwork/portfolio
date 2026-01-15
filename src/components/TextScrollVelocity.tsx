import React, { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform, useVelocity, useScroll } from 'framer-motion';
import './TextScrollVelocity.css';
import Starfield from './StarFied';
import BackgroundEffects from './BackgroundEffects';
import NebulaBackground from './NebulaBackground';
import { useLenis } from '../hooks/useLenis';
// import parallaxBg from '../assets/parallax-bg.png';

interface TextScrollVelocityProps {
    text?: string | string[];
    baseVelocity?: number;
    direction?: 'left' | 'right';
    className?: string;
    textClassName?: string;
    fontSize?: string;
}
const parallaxBg = "https://plus.unsplash.com/premium_photo-1685786788009-2ab6cd0349b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWJzdHJhY3QlMjBkYXJrJTIwbmVidWxhfGVufDB8fDB8fHww"
/**
 * TextScrollVelocity - An interactive component with parallax effect
 * Creates an infinite scrolling text effect that reacts to scroll speed
 */
export const TextScrollVelocity: React.FC<TextScrollVelocityProps> = ({
    baseVelocity = 1,
    direction = 'left',
    className = '',
    textClassName = '',
    fontSize = 'clamp(1.5rem, 0.5116rem + 4.6512vw, 4rem)',
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Background parallax effect - starts from bottom (100%) and moves up (-100%)
    // const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    // Direction factor
    const directionFactor = direction === 'right' ? -1 : 1;

    // Define specific styles for each line with colors and unique text
    const defaultLines = [
        // "SELECTED PROJECTS • FEATURED WORK • CREATIVE SOLUTIONS",
        "PROJECTS THAT SPEAKS • ",
        "JAVA • SPRING BOOT • MICROSERVICES • KOTLIN • ANGULAR",
        "DIGITAL EXPERIENCES • INTERACTIVE DESIGN • CREATIVE • INNOVATIONS",
        // "LET'S COLLABORATE • GET IN TOUCH"
        "PROJECTS THAT SPEAKS • "
    ];

    const styles = [
        { top: "15%", baseVelocity: -0.5 * directionFactor, color: "text-primary", text: defaultLines[0] },
        { top: "35%", baseVelocity: 0.5 * directionFactor, color: "text-tertiary", text: defaultLines[1] },
        { top: "55%", baseVelocity: -0.5 * directionFactor, color: "text-tertiary", text: defaultLines[2] },
        { top: "75%", baseVelocity: 0.5 * directionFactor, color: "text-primary", text: defaultLines[3] },
    ];

    return (
        <div ref={containerRef} className={`relative h-[250vh] ${className}`}>
            <Starfield />
            <NebulaBackground opacity={0.7} zIndex={0} />
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center bg-background">
                {/* Foreground Scrolling Text */}
                <div className="relative z-10 flex flex-col justify-center h-full gap-8">
                    {styles.map((style, i) => (
                        <ParallaxText
                            key={i}
                            baseVelocity={style.baseVelocity * (baseVelocity || 1)}
                            fontSize={fontSize}
                            className={`${textClassName} ${style.color}`}
                        >
                            {style.text}
                        </ParallaxText>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Subcomponent for individual text line to keep logic clean
interface ParallaxTextProps {
    children: string;
    baseVelocity: number;
    className?: string;
    fontSize?: string;
}

function ParallaxText({ children, baseVelocity = 100, className, fontSize }: ParallaxTextProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 300,
        mass: 0.6
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 3], {
        clamp: false
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        // This part captures the scroll direction and speed
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="parallax-text-wrap overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
            <motion.div className={`font-bold uppercase flex flex-nowrap whitespace-nowrap ${className}`} style={{ x, fontSize }}>
                <span className="block mr-8">{children}</span>
                <span className="block mr-8">{children}</span>
                <span className="block mr-8">{children}</span>
                <span className="block mr-8">{children}</span>
            </motion.div>
        </div>
    );
}

// Helper utility
const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default TextScrollVelocity;
