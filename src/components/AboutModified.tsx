import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { CodeIcon, DatabaseIcon, ServerIcon, SmartphoneIcon } from 'lucide-react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BackgroundEffects from './BackgroundEffects';
import Starfield from './StarFied';

const splitTextToSpans = (text: string) => {
    return [text].map((word, i) => (
        <span key={i} style={{ display: "inline-block", marginRight: "0.25em" }}>
            {word}
        </span>
    ));
};

export function AboutModified() {
    gsap.registerPlugin(ScrollTrigger);
    const ref = useRef(null);
    const containerRef = useRef<any>(null);
    const gridRef = useRef<any>(null);
    const {
        scrollYProgress
    } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    });
    const translateY = useSpring(useTransform(scrollYProgress, [0, 1], [50, -50]), {
        stiffness: 100,
        damping: 20
    });
    const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    const techStack = [{
        category: 'Frontend',
        Icon: SmartphoneIcon,
        techs: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS']
    }, {
        category: 'Backend',
        Icon: ServerIcon,
        techs: ['Node.js', 'Python', 'PostgreSQL', 'Redis']
    }, {
        category: 'DevOps',
        Icon: DatabaseIcon,
        techs: ['Docker', 'AWS', 'CI/CD', 'Kubernetes']
    }, {
        category: 'Tools',
        Icon: CodeIcon,
        techs: ['Git', 'VS Code', 'Figma', 'Postman']
    }];


    useEffect(() => {
        // const wordSpans = containerRef?.current?.querySelectorAll("span");
        const cards = gridRef?.current?.querySelectorAll(".stat-card");
        const items = containerRef.current.querySelectorAll("h3, p");


        gsap.fromTo(
            items,
            { opacity: 0, scale: 0.8, y: 20 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 40%",
                    // toggleActions: "play reverse play reverse"
                },
            }
        );
        gsap.fromTo(
            cards,
            { opacity: 0, y: 50, scale: 0.8, rotateY: 15 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateY: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 80%",
                    end: "bottom 40%",
                    toggleActions: "play reverse play reverse",
                },
            }
        );
        gsap.fromTo(
            cards,
            { opacity: 0, y: 50, scale: 0.8, rotateY: 15 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateY: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 80%",
                    end: "bottom 40%",
                    toggleActions: "play reverse play reverse",
                },
            }
        );

        cards.forEach((card: any) => {
            card.addEventListener("mouseenter", () => {
                gsap.to(card, { scale: 1.05, rotateY: 10, z: 50, duration: 0.3 });
            });
            card.addEventListener("mouseleave", () => {
                gsap.to(card, { scale: 1, rotateY: 0, z: 0, duration: 0.3 });
            });
        });
    }, []);

    const stats = [
        { label: "Years Experience", value: "5+" },
        { label: "Projects Completed", value: "50+" },
        { label: "Happy Clients", value: "30+" },
        { label: "Code Commits", value: "10k+" },
    ];
    const cardVariants = {
        hidden: { opacity: 0, y: 50, rotateY: 15 },   // initial state
        visible: { opacity: 1, y: 0, rotateY: 0 },    // in view
        exit: { opacity: 0, y: 100, rotateY: 0 }     // leaving viewport (drop down)
    };

    return <section id="about" className="py-32 relative overflow-hidden" ref={ref} style={{
        perspective: '1000px'
    }}>
        <Starfield />
        <BackgroundEffects opacity={0.3} zIndex={0} showParticles={true} />
        {/* 3D Background layers */}
        <motion.div className="absolute inset-0 opacity-10" style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -200])
        }}>
            <div className="absolute top-20 left-10 w-64 h-64 bg-accent rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div style={{
                rotateX,
                scale
            }} className="text-center mb-16">
                <motion.h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary" style={{
                    y: useTransform(scrollYProgress, [0, 1], [50, -50])
                }}>
                    About Me
                </motion.h2>
                <motion.div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto" style={{
                    scaleX: useTransform(scrollYProgress, [0, 0.3], [0, 1])
                }} />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <div ref={containerRef}>
                    <h3 className="text-2xl font-bold mb-6 text-primary">
                        Full-Stack Engineer
                    </h3>

                    <p className="text-secondary text-lg leading-relaxed mb-4">
                        With over 5 years of experience building scalable web applications, I
                        specialize in creating seamless user experiences backed by robust
                        server architectures.
                    </p>

                    <p className="text-secondary text-lg leading-relaxed mb-4">
                        I'm passionate about writing clean, maintainable code and staying
                        current with the latest technologies. My approach combines technical
                        excellence with a deep understanding of user needs.
                    </p>

                    <p className="text-secondary text-lg leading-relaxed">
                        When I'm not coding, you'll find me contributing to open-source
                        projects, writing technical articles, or exploring new frameworks and
                        tools.
                    </p>
                </div>


                <div className="relative">
                    <div ref={gridRef} className="grid grid-cols-2 gap-4" style={{
                        transformStyle: 'preserve-3d'
                    }}>
                        {stats?.map((stat, index) => {
                            return (
                                <div
                                    key={stat.label}
                                    className="stat-card bg-elevated p-6 rounded-2xl shadow-custom-lg border border-custom"
                                    style={{
                                        transform: `translateZ(${index % 2 === 0 ? 20 : -20}px)`,
                                        transformStyle: "preserve-3d",
                                    }}
                                >
                                    <div className="text-3xl font-bold gradient-text mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-secondary">{stat.label}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <motion.div
                className="grid md:grid-cols-4 gap-6"
                style={{ transformStyle: "preserve-3d" }}
            >
                {techStack.map(({ category, Icon, techs }, index) => (
                    <motion.div
                        key={category}
                        className="bg-elevated p-6 rounded-2xl shadow-custom-md border border-custom hover:shadow-custom-xl transition-shadow"
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        viewport={{ once: false, amount: 0.5 }} // triggers when 20% of card is in view
                        transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
                    >
                        {/* Icon with rotation on hover */}
                        <motion.div
                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Icon className="w-6 h-6 text-primary" />
                        </motion.div>

                        {/* Category */}
                        <h4 className="font-semibold text-primary mb-3">{category}</h4>

                        {/* Tech badges */}
                        <div className="flex flex-wrap gap-2">
                            {techs.map((tech) => (
                                <span
                                    key={tech}
                                    className="text-xs px-3 py-1 bg-secondary rounded-full text-secondary border border-custom"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </motion.div>


        </div>
    </section>;
}