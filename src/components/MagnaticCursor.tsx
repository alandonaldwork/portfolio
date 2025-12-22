import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export function MagnaticCursor() {
    const [isPointer, setIsPointer] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const ringX = useSpring(mouseX, { stiffness: 150, damping: 20 });
    const ringY = useSpring(mouseY, { stiffness: 150, damping: 20 });

    const glowX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const glowY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            let cursorX = e.clientX;
            let cursorY = e.clientY;

            const target = e.target as HTMLElement;
            const clickable =
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                window.getComputedStyle(target).cursor === "pointer";

            setIsPointer(!!clickable);

            // Magnetic effect for main cursor
            const magnetEl = clickable ? target.closest("a, button") || target : null;
            if (magnetEl) {
                const rect = magnetEl.getBoundingClientRect();
                const magnetStrength = 0.3; // cursor pull
                const magnetX = rect.left + rect.width / 2;
                const magnetY = rect.top + rect.height / 2;

                cursorX += (magnetX - cursorX) * magnetStrength;
                cursorY += (magnetY - cursorY) * magnetStrength;
            }

            mouseX.set(cursorX);
            mouseY.set(cursorY);

            // Magnetic effect for buttons
            document.querySelectorAll("button, a").forEach((btn) => {
                const rect = btn.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const dx = cursorX - centerX;
                const dy = cursorY - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                const maxDistance = 100; // radius of magnetic effect
                if (distance < maxDistance) {
                    const strength = (maxDistance - distance) / maxDistance * 0.3; // 0.3 max translation
                    (btn as HTMLElement).style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
                } else {
                    (btn as HTMLElement).style.transform = "translate(0px, 0px)";
                }
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
                animate={{ scale: isPointer ? 1.5 : 1 }}
                transition={{ type: "tween", duration: 0.01 }}
            />

            {/* Ring (trailing) */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 border-2 border-accent/50 rounded-full pointer-events-none z-[9998] mix-blend-difference"
                style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
                animate={{ scale: isPointer ? 1.5 : 1 }}
            />

            {/* Glow */}
            <motion.div
                className="fixed top-0 left-0 w-96 h-96 pointer-events-none z-[9997] opacity-30"
                style={{
                    x: glowX,
                    y: glowY,
                    translateX: "-50%",
                    translateY: "-50%",
                    background:
                        "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
                    filter: "blur(40px)",
                }}
            />
        </>
    );
}
