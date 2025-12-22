import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Starfield from "./StarFied";
import "./ProjectIntro.css";


const ProjectsIntro: React.FC = () => {
    gsap.registerPlugin(ScrollTrigger);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    const splitLines = (element: HTMLElement) => {
        const text = element.innerHTML;
        const lines = text.split("<br>");
        element.innerHTML = "";
        lines.forEach((line) => {
            const span = document.createElement("span");
            span.className = "line-block sharp-text";
            span.innerHTML = line;
            element.appendChild(span);
        });
    };

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.3,
            easing: (t) => t,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        if (textRef.current) splitLines(textRef.current);

        const section = containerRef.current;
        const content = section?.querySelector(".content") as HTMLElement;
        const lines = section?.querySelectorAll(".line-block") as NodeListOf<HTMLElement>;
        const whiteWipe = section?.querySelector(".white-wipe") as HTMLElement;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=2000",
                scrub: true,
                pin: true,
                anticipatePin: 1,
            },
        });

        // 1) Intro cinematic fade + scale
        tl.fromTo(
            content,
            {
                opacity: 0,
                scale: 0.65,
                rotateX: 30,
                rotateY: -20,
                // filter: "blur(15px)",
                y: 120,
            },
            {
                opacity: 1,
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                // filter: "blur(0px)",
                y: 0,
                ease: "power3.out",
            }
        );

        // 2) Stagger line pop-in
        tl.from(
            lines,
            {
                opacity: 0,
                y: 35,
                x: -20,
                rotateZ: 2,
                filter: "blur(6px)",
                stagger: 0.2,
                ease: "power2.out",
            },
            "-=0.3"
        );

        // 3) Merge lines
        tl.to(
            lines,
            {
                x: 0,
                y: 0,
                rotate: 0,
                stagger: 0.05,
                duration: 1.5,
                ease: "power2.inOut",
            },
            "-=0.5"
        );

        // 4) Massive scale with 3D Z translation
        tl.to(content, {
            scale: () => {
                if (!content || !section) return 60;
                const sectionHeight = section.clientHeight;
                const contentHeight = content.getBoundingClientRect().height;
                return (sectionHeight / contentHeight) * 8; // adjust multiplier
            },
            z: 800,                       // move text toward viewer
            rotateY: 10,
            rotateX: -5,
            transformOrigin: "center center",
            backfaceVisibility: "hidden", // prevents blur
            force3D: true,                // uses GPU for smoother 3D
            willChange: "transform",      // hint browser to optimize
            duration: 2,
            ease: "power2.inOut",
        });


        return () => {
            lenis.destroy();
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="section relative w-full h-screen bg-primary text-primary overflow-hidden flex justify-center items-center perspective-1000"
        >
            <Starfield />
            <div className="content text-center scale-container">
                <h1 ref={textRef} className="text-4xl md:text-4xl font-bold leading-tight relative z-10">
                    Scroll to Explore, Projects That Speak
                </h1>
            </div>

        </section>
    );
};

export default ProjectsIntro;
