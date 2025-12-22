import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const CinematicIntro = ({ onComplete }: any) => {
    gsap.registerPlugin(ScrollTrigger);
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const skillRefs = useRef<any>([]);
    const portalRef = useRef(null);
    const particleCanvasRef = useRef<any>(null);

    // Particle animation
    useEffect(() => {
        const canvas: any = particleCanvasRef?.current;
        const ctx = canvas.getContext("2d");
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let particles: any[] = [];

        class Particle {
            x: number = 0;
            y: number = 0;
            vx: number = 0;
            vy: number = 0;
            size: number = 1;
            alpha: number = 0.5;

            ctx: CanvasRenderingContext2D;
            width: number;
            height: number;

            constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
                this.ctx = ctx;
                this.width = width;
                this.height = height;
                this.reset();
            }

            reset() {
                this.x = Math.random() * this.width;
                this.y = Math.random() * this.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.alpha = Math.random() * 0.5 + 0.3;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > this.width || this.y < 0 || this.y > this.height) {
                    this.reset();
                }
            }

            draw() {
                this.ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
                this.ctx.beginPath();
                this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }



        for (let i = 0; i < 150; i++) {
            particles.push(new Particle(ctx, canvas.width, canvas.height));
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles?.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animateParticles);
        }
        animateParticles

        window.addEventListener("resize", () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });
    }, []);

    // Scroll animations
    useEffect(() => {
        // Hero text fade & kinetic movement
        gsap.fromTo(
            heroRef.current,
            { opacity: 0, y: 50, rotationX: 10 },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "top 30%",
                    scrub: true,
                },
            }
        );

        // Floating skill cards animation
        skillRefs.current.forEach((el: any, i: number) => {
            gsap.fromTo(
                el,
                { y: 100, opacity: 0, rotation: 15 * (i % 2 ? 1 : -1) },
                {
                    y: 0,
                    opacity: 1,
                    rotation: 0,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                        end: "top 40%",
                        scrub: true,
                    },
                }
            );
        });

        // Portal exit effect
        gsap.to(portalRef.current, {
            scale: 60,
            opacity: 1,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "bottom bottom",
                end: "bottom top",
                scrub: true,
                onUpdate: ({ progress }) => {
                    if (progress >= 1 && onComplete) onComplete();
                },
            },
        });
    }, [onComplete]);

    return (
        <section
            ref={containerRef}
            style={{
                position: "relative",
                height: "200vh",
                overflow: "hidden",
                background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
            }}
        >
            {/* Particle Canvas */}
            <canvas
                ref={particleCanvasRef}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 0,
                }}
            />

            {/* Hero Text */}
            <motion.h1
                ref={heroRef}
                style={{
                    position: "fixed",
                    top: "40%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "4rem",
                    fontWeight: "bold",
                    color: "#fff",
                    zIndex: 2,
                }}
            >
                Explore My Universe
            </motion.h1>

            {/* Floating Skill Cards */}
            <div style={{ position: "absolute", top: "60%", width: "100%", zIndex: 2 }}>
                {["React", "GSAP", "Motion", "Three.js"].map((skill, i) => (
                    <motion.div
                        key={i}
                        ref={(el) => (skillRefs.current[i] = el)}
                        style={{
                            display: "inline-block",
                            margin: "0 20px",
                            padding: "15px 25px",
                            background: "rgba(255,255,255,0.1)",
                            borderRadius: "10px",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                            cursor: "pointer",
                        }}
                        whileHover={{ scale: 1.1, rotateZ: 5 }}
                    >
                        {skill}
                    </motion.div>
                ))}
            </div>

            {/* Portal Exit */}
            <div
                ref={portalRef}
                style={{
                    position: "fixed",
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background: "#fff",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) scale(1)",
                    opacity: 0,
                    zIndex: 5,
                }}
            ></div>
        </section>
    );
};

export default CinematicIntro;
