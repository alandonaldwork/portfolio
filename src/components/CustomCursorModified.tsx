import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursorModified() {
    // Track if hovering clickable elements
    const [isPointer, setIsPointer] = useState(false);

    // Motion values for cursor position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for ring and glow
    const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 });

    const glowX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const glowY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            const target = e.target as HTMLElement;
            const clickable =
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                window.getComputedStyle(target).cursor === "pointer";

            setIsPointer(!!clickable);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Main cursor dot (snappy) */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{ scale: isPointer ? 1.5 : 1 }}
                transition={{ type: "tween", duration: 0.01 }}
            />

            {/* Cursor ring (smooth trail) */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 border-2 border-accent/50 rounded-full pointer-events-none z-[9998] mix-blend-difference"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{ scale: isPointer ? 1.5 : 1 }}
            />

            {/* Spotlight glow (smooth and large) */}
            <motion.div
                className="fixed top-0 left-0 w-96 h-96 pointer-events-none z-[9997] opacity-30"
                style={{
                    x: glowX,
                    y: glowY,
                    translateX: "-50%",
                    translateY: "-50%",
                    background:
                        "radial-gradient(circle, rgba(40, 90, 200, 0.32) 50%, transparent 0%)",
                    filter: "blur(40px)",
                }}
            />
        </>
    );
}
