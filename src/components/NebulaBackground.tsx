import React, { useEffect, useRef } from "react";

interface NebulaParticle {
    x: number;
    y: number;
    baseRadius: number;
    radius: number;
    alpha: number;
    speedX: number;
    speedY: number;
    pulseOffset: number;
}

interface NebulaBackgroundProps {
    opacity?: number; // optional opacity
    zIndex?: number;
}

const NebulaBackground: React.FC<NebulaBackgroundProps> = ({
    opacity = 0.7,
    zIndex = 0,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        const numParticles = 60;
        const particles: NebulaParticle[] = [];

        const accentGlow =
            getComputedStyle(document.documentElement).getPropertyValue(
                "--accent-glow"
            ) || "rgba(70,120,255,0.28)";

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                baseRadius: 60 + Math.random() * 100,
                radius: 0,
                alpha: 0.1 + Math.random() * 0.2,
                speedX: -0.2 + Math.random() * 0.4,
                speedY: -0.1 + Math.random() * 0.2,
                pulseOffset: Math.random() * Math.PI * 2,
            });
        }

        const animate = (time: number) => {
            ctx.clearRect(0, 0, w, h);

            particles.forEach((p) => {
                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x - p.baseRadius > w) p.x = -p.baseRadius;
                if (p.x + p.baseRadius < 0) p.x = w + p.baseRadius;
                if (p.y - p.baseRadius > h) p.y = -p.baseRadius;
                if (p.y + p.baseRadius < 0) p.y = h + p.baseRadius;

                p.radius =
                    p.baseRadius * (0.85 + 0.15 * Math.sin(time / 500 + p.pulseOffset));

                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
                const rgb = accentGlow.match(/\d+/g)!;
                const alpha =
                    p.alpha * (0.7 + 0.3 * Math.sin(time / 700 + p.pulseOffset));

                gradient.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`);
                gradient.addColorStop(1, "rgba(0,0,0,0)");

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);

        window.addEventListener("resize", () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        });
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ opacity, zIndex }}
        />
    );
};

export default NebulaBackground;
