import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CodeIcon, DatabaseIcon, ServerIcon, SmartphoneIcon } from 'lucide-react';
export function About() {
  const ref = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
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
  return <section id="about" className="py-32 bg-secondary relative overflow-hidden" ref={ref} style={{
    perspective: '1000px'
  }}>
    {/* 3D Background layers */}
    <motion.div className="absolute inset-0 opacity-10" style={{
      y: useTransform(scrollYProgress, [0, 1], [0, -200])
    }}>
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
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
        <motion.div style={{
          x: useTransform(scrollYProgress, [0, 0.5], [-100, 0]),
          rotateY: useTransform(scrollYProgress, [0, 0.5], [-15, 0])
        }}>
          <h3 className="text-2xl font-bold mb-6 text-primary">
            Full-Stack Engineer
          </h3>
          <p className="text-secondary text-lg leading-relaxed mb-4">
            With over 5 years of experience building scalable web
            applications, I specialize in creating seamless user experiences
            backed by robust server architectures.
          </p>
          <p className="text-secondary text-lg leading-relaxed mb-4">
            I'm passionate about writing clean, maintainable code and staying
            current with the latest technologies. My approach combines
            technical excellence with a deep understanding of user needs.
          </p>
          <p className="text-secondary text-lg leading-relaxed">
            When I'm not coding, you'll find me contributing to open-source
            projects, writing technical articles, or exploring new frameworks
            and tools.
          </p>
        </motion.div>

        <motion.div style={{
          x: useTransform(scrollYProgress, [0, 0.5], [100, 0]),
          rotateY: useTransform(scrollYProgress, [0, 0.5], [15, 0])
        }} className="relative">
          <div className="grid grid-cols-2 gap-4" style={{
            transformStyle: 'preserve-3d'
          }}>
            {[{
              label: 'Years Experience',
              value: '5+'
            }, {
              label: 'Projects Completed',
              value: '50+'
            }, {
              label: 'Happy Clients',
              value: '30+'
            }, {
              label: 'Code Commits',
              value: '10k+'
            }].map((stat, index) => <motion.div key={stat.label} className="bg-elevated p-6 rounded-2xl shadow-custom-lg border border-custom" style={{
              transform: `translateZ(${index % 2 === 0 ? 20 : -20}px)`,
              transformStyle: 'preserve-3d'
            }} whileHover={{
              scale: 1.05,
              rotateY: 10,
              z: 50
            }} transition={{
              type: 'spring',
              stiffness: 300
            }}>
              <div className="text-3xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-secondary">{stat.label}</div>
            </motion.div>)}
          </div>
        </motion.div>
      </div>

      <motion.div style={{
        rotateX: useTransform(scrollYProgress, [0.3, 0.7], [10, -10]),
        y: useTransform(scrollYProgress, [0.3, 0.7], [50, -50])
      }}>
        <h3 className="text-2xl font-bold mb-8 text-center text-primary">
          Tech Stack
        </h3>
        <div className="grid md:grid-cols-4 gap-6" style={{
          transformStyle: 'preserve-3d'
        }}>
          {techStack.map(({
            category,
            Icon,
            techs
          }, index) => <motion.div key={category} className="bg-elevated p-6 rounded-2xl shadow-custom-md border border-custom hover:shadow-custom-xl transition-shadow" style={{
            transform: `translateZ(${index * 10}px) rotateY(${index * 2}deg)`,
            transformStyle: 'preserve-3d'
          }} whileHover={{
            scale: 1.05,
            rotateY: 0,
            z: 100
          }} transition={{
            type: 'spring',
            stiffness: 300
          }}>
              <motion.div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4" whileHover={{
                rotate: 360
              }} transition={{
                duration: 0.6
              }}>
                <Icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h4 className="font-semibold text-primary mb-3">{category}</h4>
              <div className="flex flex-wrap gap-2">
                {techs.map(tech => <span key={tech} className="text-xs px-3 py-1 bg-secondary rounded-full text-secondary border border-custom">
                  {tech}
                </span>)}
              </div>
            </motion.div>)}
        </div>
      </motion.div>
    </div>
  </section>;
}