import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

export function TiltCard({ children }: any) {
    const cardRef = useRef<any>(null);

    // Mouse position relative to card
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Transform mouse position into rotation values
    const rotateX = useTransform(mouseY, [0, 1], [15, -15]);
    const rotateY = useTransform(mouseX, [0, 1], [-15, 15]);

    // On mouse move, normalize x and y to 0–1 inside the card
    const handleMouseMove = (e: any) => {
        const rect = cardRef?.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        mouseX.set(x);
        mouseY.set(y);
    };

    // Reset rotation on mouse leave
    const handleMouseLeave = () => {
        mouseX.set(0.5);
        mouseY.set(0.5);
    };

    return (
        <motion.div
            ref={cardRef}
            className="cursor-pointer perspective-1500"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                scale: 1.05, // slight pop effect
                transition: "transform 0.2s",
            }}
        >
            {children}
        </motion.div>
    );
}
