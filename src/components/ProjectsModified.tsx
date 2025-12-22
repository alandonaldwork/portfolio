import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLinkIcon, GithubIcon } from "lucide-react";
import { projects } from "../utils/AppContent";
import Starfield from "./StarFied";
import { motion, useScroll, useTransform } from 'framer-motion';
import NebulaBackground from "./NebulaBackground";


export function ProjectsModified() {
    gsap.registerPlugin(ScrollTrigger);

    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const {
        scrollYProgress
    } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    });

    /** GSAP EFFECTS */
    useEffect(() => {
        const track = trackRef.current;
        const container = containerRef.current;
        if (!track || !container) return;

        const totalWidth = track.scrollWidth - container.offsetWidth;

        /** Horizontal scroll pinned animation */
        const horizontalAnim = gsap.to(track, {
            x: -totalWidth,
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: `+=${totalWidth}`,
                pin: true,
                scrub: 1,
            },
        });

        /** Parallax background */
        gsap.to(container, {
            backgroundPositionX: "60%", // adjust strength
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: `+=${totalWidth}`,
                scrub: true,
            },
        });

        /** Card fade-in on entering viewport (horizontal) */
        gsap.utils.toArray(".project-card").forEach((card: any) => {
            gsap.from(card, {
                opacity: 0,
                y: 60,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "left center",
                    end: "right center", // optional, can be same as start for simple fade
                    containerAnimation: horizontalAnim, // important for horizontal scroll
                    toggleActions: "play reverse play reverse", // ← key part!
                },
            });
            // gsap.from(card, {
            //     opacity: 0,
            //     y: 60,
            //     x: 50, // slides in from right
            //     duration: 1,
            //     ease: "power3.out",
            //     scrollTrigger: {
            //         trigger: card,
            //         start: "left center",
            //         containerAnimation: horizontalAnim,
            //         toggleActions: "play reverse play reverse",
            //     },
            // });
        });

        // MULTI-LAYER PARALLAX
        gsap.to("#parallax-back", {
            x: "-10%", // slowest layer
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: `+=${totalWidth}`,
                scrub: true,
                containerAnimation: horizontalAnim,
            },
        });

        gsap.to("#parallax-front", {
            x: "-35%", // fastest = closest layer
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: `+=${totalWidth}`,
                scrub: true,
                containerAnimation: horizontalAnim,
            },
        });

    }, []);

    return (
        <section
            id="projects"
            ref={containerRef}
            className="relative w-full py-10 overflow-hidden bg-primary"
        >
            <Starfield />
            <NebulaBackground opacity={0.7} zIndex={0} />

            <motion.div className="absolute inset-0 opacity-10" style={{
                y: useTransform(scrollYProgress, [0, 1], [0, -200])
            }}>
                <div className="absolute top-20 left-10 w-64 h-64 bg-accent rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
            </motion.div>

            <div className="absolute inset-0 pointer-events-none z-0">
                {/* BACK LAYER — subtle gradient glow */}
                <div id="parallax-back" className="absolute inset-0 bg-gradient-to-r from-[var(--accent-glow)]/20 to-transparent" />

                {/* FRONT LAYER — floating shapes */}
                <div id="parallax-front" className="absolute inset-0">
                    <div className="absolute w-40 h-40 rounded-full bg-[var(--accent-primary)]/10 blur-2xl top-20 left-1/4" />
                    <div className="absolute w-56 h-56 rounded-full bg-[var(--accent-primary)]/10 blur-3xl top-1/3 right-10" />
                </div>
            </div>
            {/* <div className="max-w-7xl mx-auto mb-8 px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-primary">Projects</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mt-3" />
                <p className="text-secondary text-lg mt-4">
                    Scroll to explore projects horizontally
                </p>
            </div> */}

            <div ref={trackRef} className="flex gap-10 px-20 items-stretch will-change-transform">
                {projects.map((project, idx) => (
                    <ProjectCard key={idx} project={project} />
                ))}
            </div>
        </section>
    );
}

function ProjectCard({ project }: { project: any }) {
    return (
        <div className="project-card min-w-[350px] md:min-w-[900px] bg-elevated
      rounded-3xl shadow-xl border border-[var(--border-color)] transform-gpu
       hover:scale-[1.03] hover:shadow-2xl">

            {/* Image */}
            <div className="h-56 md:h-64 relative overflow-hidden rounded-t-3xl">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-110"
                />
                {/* subtle overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-20 transition-opacity duration-500 rounded-t-3xl" />
            </div>

            {/* Content */}
            <div className="p-6 text-primary flex flex-col gap-3">
                <h3 className="text-2xl md:text-3xl font-bold">{project.title}</h3>
                <p className="text-secondary text-sm md:text-base">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag: string, i: number) => (
                        <span
                            key={i}
                            className="text-xs md:text-sm px-3 py-1 bg-[var(--bg-secondary)] text-[var(--text-secondary)] rounded-full border border-[var(--border-color)]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-1">
                    <a
                        href={project.demoUrl}
                        className="flex items-center gap-2 px-4 py-2 gradient-button text-white rounded-lg shadow-md"
                    >
                        <ExternalLinkIcon className="w-4 h-4" /> Demo
                    </a>
                    <a
                        href={project.githubUrl}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <GithubIcon className="w-4 h-4" /> Code
                    </a>
                </div>
            </div>
        </div>
    );
}

