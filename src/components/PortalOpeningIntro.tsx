import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const PortalOpeningIntro: React.FC = () => {
    gsap.registerPlugin(ScrollTrigger);
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const flashRef = useRef<HTMLDivElement>(null);
    const backGlowRef = useRef<HTMLDivElement>(null);

    // -----------------------------------------------------
    // 🔥 1. UPGRADED PARTICLE PORTAL (Depth + Parallax)
    // -----------------------------------------------------
    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        const numParticles = 400;
        const particles: any = [];

        for (let i = 0; i < numParticles; i++) {
            particles?.push({
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

            particles.forEach((p: any) => {
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

    // -----------------------------------------------------
    // 🔥 2. CINEMATIC GSAP TIMELINE
    // -----------------------------------------------------
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
        const backGlow = backGlowRef.current!;
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

        // -----------------------------------------------------
        // 1) Portal Spin Intensifies (with slight camera zoom)
        // -----------------------------------------------------
        tl.to({}, {
            duration: 2,
            onUpdate: () => {
                const p = tl.progress() * 6 + 1;
                (canvas as any).setPortalSpeed(p);
            },
            ease: "power3.inOut",
        });

        tl.to(
            section,
            {
                scale: 1.04,
                duration: 1.8,
                ease: "power2.inOut",
            },
            "<"
        );

        // -----------------------------------------------------
        // 2) Soft Glow Nebula Behind Portal
        // -----------------------------------------------------
        tl.fromTo(
            backGlow,
            { opacity: 0, scale: 0.6 },
            { opacity: 0.8, scale: 1.4, duration: 2, ease: "power3.out" },
            "-=1.2"
        );

        // -----------------------------------------------------
        // 3) Title Reveal (Sharpen + Glow Pop + Aberration)
        // -----------------------------------------------------
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

        // -----------------------------------------------------
        // 4) Ring Turns Into a Lens-Flare Burst
        // -----------------------------------------------------
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

        // -----------------------------------------------------
        // 5) Intense Flash + Camera Shake
        // -----------------------------------------------------
        tl.fromTo(
            flash,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.3,
                ease: "power4.in",
                onStart: () => {
                    gsap.fromTo(
                        section,
                        { x: -5, y: -5 },
                        { x: 5, y: 5, duration: 0.2, repeat: 5, yoyo: true }
                    );
                },
            }
        );

        tl.to(flash, { opacity: 0, duration: 0.7, ease: "power2.out" });

        // -----------------------------------------------------
        // 6) Project Cards Rise From Below
        // -----------------------------------------------------
        tl.fromTo(
            ".project-grid",
            {
                opacity: 0,
                y: 80,
                scale: 0.9,
                filter: "blur(20px)",
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
                duration: 1.8,
                ease: "power3.out",
            },
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
            {/* Nebula Glow */}
            <div
                ref={backGlowRef}
                className="absolute w-[120vw] h-[120vh] rounded-full bg-[radial-gradient(circle,rgba(0,140,255,0.6),transparent_70%)] opacity-0 blur-3xl"
            />

            {/* Portal Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-[0.85]"
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
            <div className="project-grid opacity-0 absolute bottom-10 w-full max-w-5xl mx-auto z-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
                    <div className="p-6 bg-white/10 rounded-xl backdrop-blur-xl shadow-xl">Project A</div>
                    <div className="p-6 bg-white/10 rounded-xl backdrop-blur-xl shadow-xl">Project B</div>
                    <div className="p-6 bg-white/10 rounded-xl backdrop-blur-xl shadow-xl">Project C</div>
                </div>
            </div>
        </section>
    );
};

export default PortalOpeningIntro;
