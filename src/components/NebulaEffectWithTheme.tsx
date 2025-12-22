import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


interface NebulaParticle {
    x: number;
    y: number;
    baseRadius: number;
    radius: number;
    alpha: number;
    speedX: number;
    speedY: number;
    pulseOffset: number; // for sine wave pulsing
}

const NebulaEffectWithTheme: React.FC = () => {
    gsap.registerPlugin(ScrollTrigger);

    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nebulaCanvasRef = useRef<HTMLCanvasElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const flashRef = useRef<HTMLDivElement>(null);

    // ---------------------------
    // 1. PORTAL PARTICLES
    // ---------------------------
    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        const numParticles = 400;
        const particles: any[] = [];

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                angle: Math.random() * Math.PI * 2,
                radius: 40 + Math.random() * 280,
                depth: Math.random() * 1.5 + 0.3,
                speed: 0.002 + Math.random() * 0.004,
            });
        }

        let globalSpeed = 1;

        const animate = () => {
            ctx.clearRect(0, 0, w, h);
            ctx.save();
            ctx.translate(w / 2, h / 2);

            particles.forEach((p) => {
                p.angle += p.speed * globalSpeed;

                const x = Math.cos(p.angle) * p.radius;
                const y = Math.sin(p.angle) * p.radius * 0.9;

                const size = 1.2 * p.depth;
                const alpha = 0.3 + p.depth * 0.4;

                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.restore();
            requestAnimationFrame(animate);
        };

        animate();

        window.addEventListener("resize", () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        });

        (canvas as any).setPortalSpeed = (v: number) => {
            globalSpeed = v;
        };
    }, []);

    // ---------------------------
    // 2. SCROLL-REACTIVE & PULSING NEBULA
    // ---------------------------
    useEffect(() => {
        const canvas = nebulaCanvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        const numNebula = 60;
        const nebulaParticles: NebulaParticle[] = [];

        const accentGlow = getComputedStyle(document.documentElement)
            .getPropertyValue("--accent-glow") || "rgba(59,130,246,0.2)";

        for (let i = 0; i < numNebula; i++) {
            nebulaParticles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                baseRadius: 60 + Math.random() * 100,
                radius: 0, // will be calculated
                alpha: 0.1 + Math.random() * 0.2,
                speedX: -0.2 + Math.random() * 0.4,
                speedY: -0.1 + Math.random() * 0.2,
                pulseOffset: Math.random() * Math.PI * 2,
            });
        }

        let scrollFactor = 1;

        ScrollTrigger.create({
            trigger: containerRef.current!,
            start: "top top",
            end: "+=2700",
            onUpdate: (self) => {
                scrollFactor = 1 + self.progress * 2; // speeds up nebula
            },
        });

        const animateNebula = (time: number) => {
            ctx.clearRect(0, 0, w, h);

            nebulaParticles.forEach((p) => {
                p.x += p.speedX * scrollFactor;
                p.y += p.speedY * scrollFactor;

                // Wrap around edges
                if (p.x - p.baseRadius > w) p.x = -p.baseRadius;
                if (p.x + p.baseRadius < 0) p.x = w + p.baseRadius;
                if (p.y - p.baseRadius > h) p.y = -p.baseRadius;
                if (p.y + p.baseRadius < 0) p.y = h + p.baseRadius;

                // Pulsing radius (sine wave)
                p.radius = p.baseRadius * (0.85 + 0.15 * Math.sin(time / 500 + p.pulseOffset));

                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
                const rgb = accentGlow.match(/\d+/g)!;
                const alpha = p.alpha * scrollFactor * (0.7 + 0.3 * Math.sin(time / 700 + p.pulseOffset));

                gradient.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`);
                gradient.addColorStop(1, "rgba(0,0,0,0)");

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animateNebula);
        };

        requestAnimationFrame(animateNebula);

        window.addEventListener("resize", () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        });
    }, []);

    // ---------------------------
    // 3. CINEMATIC TIMELINE
    // ---------------------------
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => t,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        const canvas = canvasRef.current!;
        const title = titleRef.current!;
        const ring = ringRef.current!;
        const flash = flashRef.current!;
        const section = containerRef.current!;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=2700",
                scrub: 1.3,
                pin: true,
            },
        });

        // Portal Spin
        tl.to(
            {},
            {
                duration: 2,
                onUpdate: () => {
                    const p = tl.progress() * 6 + 1;
                    (canvas as any).setPortalSpeed(p);
                },
                ease: "power3.inOut",
            }
        );

        tl.to(
            section,
            { scale: 1.04, duration: 1.8, ease: "power2.inOut" },
            "<"
        );

        // Title Reveal
        tl.fromTo(
            title,
            {
                opacity: 0,
                scale: 0.8,
                filter: "blur(40px) brightness(40%) contrast(60%)",
                letterSpacing: "-6px",
            },
            {
                opacity: 1,
                scale: 1,
                filter: "blur(0px) brightness(120%) contrast(110%)",
                letterSpacing: "0px",
                duration: 2,
                ease: "power4.out",
            },
            "-=1"
        );

        // Ring Burst
        tl.fromTo(
            ring,
            { opacity: 0, scale: 0.3, rotate: 0 },
            {
                opacity: 1,
                scale: 6,
                rotate: 180,
                filter: "blur(10px) brightness(180%)",
                duration: 3,
                ease: "power3.inOut",
            },
            "-=1.6"
        );

        // Flash + Camera Shake
        // tl.fromTo(
        //     flash,
        //     { opacity: 0 },
        //     {
        //         opacity: 1,
        //         duration: 0.3,
        //         ease: "power4.in",
        //         onStart: () => {
        //             gsap.fromTo(
        //                 section,
        //                 { x: -5, y: -5 },
        //                 { x: 5, y: 5, duration: 0.2, repeat: 5, yoyo: true }
        //             );
        //         },
        //     }
        // );

        // tl.to(flash, { opacity: 0, duration: 0.7, ease: "power2.out" });

        // Project Cards
        tl.fromTo(
            ".project-grid",
            { opacity: 0, y: 80, scale: 0.9, filter: "blur(20px)" },
            { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.8, ease: "power3.out" },
            "-=0.4"
        );

        return () => {
            lenis.destroy();
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Nebula Canvas */}
            <canvas
                ref={nebulaCanvasRef}
                className="absolute inset-0 w-full h-full opacity-70 z-0"
            />

            {/* Portal Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-[0.85] z-10"
            />

            {/* Title */}
            <h1
                ref={titleRef}
                className="relative z-20 text-white text-6xl md:text-7xl font-bold tracking-tight text-center drop-shadow-[0_0_18px_rgba(255,255,255,0.35)]"
            >
                PROJECTS THAT SPEAK
            </h1>

            {/* Lens-Flare Ring */}
            <div
                ref={ringRef}
                className="absolute w-40 h-40 border-4 border-cyan-400/50 rounded-full blur-md z-10 shadow-[0_0_60px_20px_rgba(0,200,255,0.4)]"
            />

            {/* Flash */}
            <div
                ref={flashRef}
                className="absolute inset-0 bg-white opacity-0 z-30"
            />

            {/* Project Grid */}
            <div style={{ width: "50%" }} className="project-grid opacity-0 absolute bottom-10 max-w-5xl mx-auto z-20">
                <div className="grid gap-6 px-6">
                    <div className="p-6 bg-white/10 rounded-xl backdrop-blur-xl shadow-xl text-center">
                        {/* Project A */}
                        Scroll Down to view projects
                    </div>
                    {/* <div className="p-6 bg-white/10 rounded-xl backdrop-blur-xl shadow-xl">
                        Project B
                    </div>
                    <div className="p-6 bg-white/10 rounded-xl backdrop-blur-xl shadow-xl">
                        Project C
                    </div> */}
                </div>
            </div>
        </section>
    );
};

export default NebulaEffectWithTheme;
