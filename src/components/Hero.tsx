import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { ArrowRightIcon, GithubIcon, LinkedinIcon, MailIcon, CodeIcon, DatabaseIcon, ServerIcon } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import Starfield from './StarFied';
import BackgroundEffects from './BackgroundEffects';
export function Hero() {
  const ref = useRef(null);

  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const {
        clientX,
        clientY
      } = e;
      const {
        innerWidth,
        innerHeight
      } = window;
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      setMousePosition({
        x,
        y
      });
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  const rotateX = useTransform(mouseY, [-1, 1], [15, -15]);
  const rotateY = useTransform(mouseX, [-1, 1], [-15, 15]);
  return <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary pt-20" style={{
    perspective: '1000px'
  }}>
    <Starfield NUM_STARS={40} />
    <BackgroundEffects opacity={0.3} zIndex={0} showParticles={true} numParticles={30} />
    <motion.div className="absolute inset-0 opacity-10" style={{
      y: useTransform(scrollYProgress, [0, 1], [0, -200])
    }}>
      <div className="absolute top-20 left-10 w-64 h-64 bg-accent rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
    </motion.div>
    {/* Animated gradient background */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div className="absolute top-0 left-0 w-full h-full" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
      }} animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut'
      }} />
      <motion.div className="absolute bottom-0 right-0 w-full h-full" style={{
        background: 'radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)'
      }} animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.4, 0.6, 0.4]
      }} transition={{
        duration: 10,
        repeat: Infinity,
        ease: 'easeInOut'
      }} />
    </div>

    <div className="max-w-7xl mx-auto px-6 py-5 relative z-10 w-full">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left content */}
        <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }}>
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }} className="inline-block mb-4 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 backdrop-blur-sm">
            {/* <span className="text-sm font-medium text-accent"> */}
            <span className="text-sm font-medium gradient-text">
              Full-Stack Developer
            </span>
          </motion.div>

          <motion.h1 initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3
          }} className="text-5xl md:text-5xl font-bold mb-6 text-primary leading-tight">
            {/* Building
            <TypeAnimation
              sequence={[
                " Digital", 1000,
                " Seamless", 1000,
                " Modern", 1000,
                " Interactive", 1000,
              ]}
              wrapper="span"
              repeat={Infinity}
            /> */}
            <div className="building-container">
              <span className="building-text">Building</span>
              <TypeAnimation
                sequence={[
                  " Digital", 1000,
                  " Seamless", 1000,
                  " Modern", 1000,
                  " Interactive", 1000,
                ]}
                wrapper="span"
                repeat={Infinity}
                className="type-animation"
              />
            </div>
            <span className="gradient-text block">Experiences</span>
          </motion.h1>

          <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }} className="text-xl text-secondary mb-8 leading-relaxed">
            Transforming concepts into engaging digital experiences.
            I blend design, development, and problem-solving to create interfaces and systems that feel effortless to use.
          </motion.p>
          {/* <p className="reveal-text text-xl text-secondary mb-8 leading-relaxed">
            Transforming concepts into engaging digital experiences.
            I blend design, development, and problem-solving to create interfaces and systems that feel effortless to use.
          </p> */}
          <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5
          }} className="flex flex-wrap gap-4 mb-8">
            <MagneticButton href="#projects">
              View Projects
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>

            <MagneticButton href="#contact" className="px-8 py-4 rounded-full border-2 border-custom text-primary font-medium hover:bg-secondary transition-colors">
              Get in Touch
            </MagneticButton>
          </motion.div>

          <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.6
          }} className="flex gap-4">
            {[{
              Icon: GithubIcon,
              href: 'https://github.com'
            }, {
              Icon: LinkedinIcon,
              href: 'https://linkedin.com'
            }, {
              Icon: MailIcon,
              href: 'mailto:dev@example.com'
            }].map(({
              Icon,
              href
            }, index) => <motion.a key={href} href={href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-secondary hover:text-primary hover:bg-accent/10 transition-colors" whileHover={{
              scale: 1.1,
              rotate: 5
            }} whileTap={{
              scale: 0.9
            }} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.7 + index * 0.1
            }}>
                <Icon className="w-5 h-5" />
              </motion.a>)}
          </motion.div>
        </motion.div>

        {/* Right content - 3D Cards */}
        <motion.div initial={{
          opacity: 0,
          x: 50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="relative h-[600px] hidden lg:block" style={{
          perspective: '1000px'
        }}>
          <motion.div className="relative w-full h-full" style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d'
          }}>
            {/* Center main card */}
            <FloatingCard delay={0} depth={0} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-96">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-8 backdrop-blur-xl border border-custom shadow-custom-xl flex flex-col items-center justify-center">
                <motion.div className="text-8xl mb-6" animate={{
                  // rotate: [0, 10, -10, 0]
                }} transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}>
                  👨‍💻
                </motion.div>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Full-Stack
                </h3>
                <p className="text-secondary text-center">
                  Building the future, one line at a time
                </p>
              </div>
            </FloatingCard>

            {/* Floating tech cards */}
            <FloatingCard delay={0.2} depth={50} className="absolute top-20 -left-10 w-40 h-40">
              <TechCard icon={<CodeIcon className="w-8 h-8" />} label="Frontend" color="from-blue-500/20 to-cyan-500/20" />
            </FloatingCard>

            <FloatingCard delay={0.4} depth={-50} className="absolute top-20 -right-10 w-40 h-40">
              <TechCard icon={<ServerIcon className="w-8 h-8" />} label="Backend" color="from-purple-500/20 to-pink-500/20" />
            </FloatingCard>

            <FloatingCard delay={0.6} depth={30} className="absolute bottom-20 -left-10 w-40 h-40">
              <TechCard icon={<DatabaseIcon className="w-8 h-8" />} label="Database" color="from-green-500/20 to-emerald-500/20" />
            </FloatingCard>

            <FloatingCard delay={0.8} depth={-30} className="absolute bottom-20 -right-10 w-40 h-40">
              <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 backdrop-blur-xl border border-custom shadow-custom-lg flex flex-col items-center justify-center">
                <div className="text-4xl mb-2">⚡</div>
                <p className="text-sm font-semibold text-primary">Fast</p>
              </div>
            </FloatingCard>
          </motion.div>
        </motion.div>
      </div>
    </div>

    {/* Scroll indicator */}
    <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 1
    }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
      <motion.div animate={{
        y: [0, 10, 0]
      }} transition={{
        duration: 2,
        repeat: Infinity
      }} className="w-6 h-10 rounded-full border-2 border-custom flex justify-center pt-2">
        <motion.div animate={{
          y: [0, 12, 0],
          opacity: [1, 0, 1]
        }} transition={{
          duration: 2,
          repeat: Infinity
        }} className="w-1.5 h-1.5 bg-primary rounded-full" />
      </motion.div>
    </motion.div>
  </section>;
}
function FloatingCard({
  children,
  delay,
  depth,
  className
}: {
  children: React.ReactNode;
  delay: number;
  depth: number;
  className: string;
}) {
  return <motion.div className={className} initial={{
    opacity: 0,
    z: depth
  }} animate={{
    opacity: 1,
    z: depth,
    y: [0, -20, 0]
  }} transition={{
    opacity: {
      delay,
      duration: 0.6
    },
    y: {
      duration: 3 + delay,
      repeat: Infinity,
      ease: 'easeInOut',
      delay
    }
  }} style={{
    transformStyle: 'preserve-3d',
    transform: `translateZ(${depth}px)`
  }}>
    {children}
  </motion.div>;
}
function TechCard({
  icon,
  label,
  color
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return <motion.div className={`w-full h-full bg-gradient-to-br ${color} rounded-2xl p-6 backdrop-blur-xl border border-custom shadow-custom-lg flex flex-col items-center justify-center`} whileHover={{
    scale: 1.05,
    rotateZ: 5
  }} transition={{
    type: 'spring',
    stiffness: 300
  }}>
    <div className="text-primary mb-2">{icon}</div>
    <p className="text-sm font-semibold text-primary">{label}</p>
  </motion.div>;
}
function MagneticButton({
  children,
  href,
  className
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({
      x: x * 0.3,
      y: y * 0.3
    });
  };
  const handleMouseLeave = () => {
    setPosition({
      x: 0,
      y: 0
    });
  };
  // const defaultClasses = "group relative px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-medium overflow-hidden inline-flex items-center";
  const defaultClasses = "group relative px-8 py-4 rounded-full gradient-button text-white font-medium overflow-hidden inline-flex items-center";

  return <motion.a href={href} className={className || defaultClasses}
    onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} animate={{
      x: position.x,
      y: position.y
    }} transition={{
      type: 'spring',
      stiffness: 150,
      damping: 15
    }} whileTap={{
      scale: 0.95
    }}>
    <span className="relative z-10 flex items-center">{children}</span>
    <motion.div className="absolute inset-0 bg-white/20" initial={{
      scale: 0,
      opacity: 0
    }} whileHover={{
      scale: 1,
      opacity: 1
    }} transition={{
      duration: 0.3
    }} />
  </motion.a>;
}