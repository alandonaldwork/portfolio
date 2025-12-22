import React, { useEffect, useRef } from "react";

interface BackgroundEffectsProps {
    opacity?: number;
    zIndex?: number;
    showParticles?: boolean;
    numParticles?: number;
}

const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({
    opacity = 0.7,
    zIndex = 0,
    showParticles = true,
    numParticles = 60,
}) => {
    const glowCanvasRef = useRef<HTMLCanvasElement>(null);
    const particleCanvasRef = useRef<HTMLCanvasElement>(null);

    // ---------------------------------------------------------------------
    // 1) NEBULA GLOW LAYER
    // ---------------------------------------------------------------------
    useEffect(() => {
        const canvas = glowCanvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        // Large drifting blobs
        const blobs = Array.from({ length: 5 }).map(() => ({
            x: Math.random() * w,
            y: Math.random() * h,
            radius: 400 + Math.random() * 600,
            dx: -0.05 + Math.random() * 0.1,
            dy: -0.05 + Math.random() * 0.1,
            hue: 200 + Math.random() * 60,
            offset: Math.random() * Math.PI * 2,
        }));

        const drawGlow = (time: number) => {
            ctx.clearRect(0, 0, w, h);

            blobs.forEach((b) => {
                b.x += b.dx;
                b.y += b.dy;

                // wrap
                if (b.x - b.radius > w) b.x = -b.radius;
                if (b.x + b.radius < 0) b.x = w + b.radius;
                if (b.y - b.radius > h) b.y = -b.radius;
                if (b.y + b.radius < 0) b.y = h + b.radius;

                const radius = b.radius * (0.9 + 0.1 * Math.sin(time / 3000 + b.offset));

                const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, radius);
                grad.addColorStop(0, `hsla(${b.hue}, 80%, 60%, 0.18)`);
                grad.addColorStop(1, "rgba(0,0,0,0)");

                ctx.globalCompositeOperation = "lighter";
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(b.x, b.y, radius, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(drawGlow);
        };

        requestAnimationFrame(drawGlow);

        window.addEventListener("resize", () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        });
    }, []);

    // ---------------------------------------------------------------------
    // 2) PARTICLE LAYER (YOUR ORIGINAL CODE)
    // ---------------------------------------------------------------------
    // useEffect(() => {
    //     const canvas = particleCanvasRef.current!;
    //     const ctx = canvas.getContext("2d")!;
    //     let w = (canvas.width = window.innerWidth);
    //     let h = (canvas.height = window.innerHeight);

    //     const numParticles = 60;
    //     const particles: any[] = [];

    //     const accentGlow = getComputedStyle(document.documentElement)
    //         .getPropertyValue("--accent-glow") || "rgba(70,120,255,0.28)";

    //     for (let i = 0; i < numParticles; i++) {
    //         particles.push({
    //             x: Math.random() * w,
    //             y: Math.random() * h,
    //             baseRadius: 60 + Math.random() * 100,
    //             radius: 0,
    //             alpha: 0.1 + Math.random() * 0.2,
    //             speedX: -0.2 + Math.random() * 0.4,
    //             speedY: -0.1 + Math.random() * 0.2,
    //             pulseOffset: Math.random() * Math.PI * 2,
    //         });
    //     }

    //     const animate = (time: number) => {
    //         ctx.clearRect(0, 0, w, h);

    //         particles.forEach((p) => {
    //             p.x += p.speedX;
    //             p.y += p.speedY;

    //             if (p.x - p.baseRadius > w) p.x = -p.baseRadius;
    //             if (p.x + p.baseRadius < 0) p.x = w + p.baseRadius;
    //             if (p.y - p.baseRadius > h) p.y = -p.baseRadius;
    //             if (p.y + p.baseRadius < 0) p.y = h + p.baseRadius;

    //             p.radius =
    //                 p.baseRadius *
    //                 (0.85 + 0.15 * Math.sin(time / 500 + p.pulseOffset));

    //             const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
    //             const rgb = accentGlow.match(/\d+/g)!;
    //             const alpha =
    //                 p.alpha * (0.7 + 0.3 * Math.sin(time / 700 + p.pulseOffset));

    //             gradient.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`);
    //             gradient.addColorStop(1, "rgba(0,0,0,0)");

    //             ctx.fillStyle = gradient;
    //             ctx.beginPath();
    //             ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    //             ctx.fill();
    //         });

    //         requestAnimationFrame(animate);
    //     };

    //     requestAnimationFrame(animate);

    //     window.addEventListener("resize", () => {
    //         w = canvas.width = window.innerWidth;
    //         h = canvas.height = window.innerHeight;
    //     });
    // }, []);

    useEffect(() => {
        if (!showParticles) return; // skip particles if false

        const canvas = particleCanvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        const particles: any[] = [];

        const accentGlow =
            getComputedStyle(document.documentElement).getPropertyValue("--accent-glow") ||
            "rgba(70,120,255,0.28)";

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
                    p.baseRadius *
                    (0.85 + 0.15 * Math.sin(time / 500 + p.pulseOffset));

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
    }, [showParticles]);

    return (
        <>
            {/* Background nebula glow */}
            <canvas
                ref={glowCanvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ opacity: opacity * 0.9, zIndex }}
            />

            {/* Particles (your original layer) */}
            <canvas
                ref={particleCanvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ opacity, zIndex: zIndex + 1 }}
            />
        </>
    );
};

export default BackgroundEffects;
