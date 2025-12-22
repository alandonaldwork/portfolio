import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BriefcaseIcon } from 'lucide-react';
import BackgroundEffects from './BackgroundEffects';
export function Experience() {
  const ref = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const experiences = [{
    title: 'Senior Full-Stack Developer',
    company: 'Freelance Project',
    period: '2022 - Present',
    description: 'Leading development of enterprise SaaS platform serving 100k+ users. Architected microservices infrastructure and mentored junior developers.',
    achievements: ['Reduced API response time by 60% through optimization', 'Implemented CI/CD pipeline reducing deployment time by 80%', 'Led team of 5 developers on major product redesign']
  }, {
    title: 'Full-Stack Developer',
    company: 'Freelance Project',
    period: '2020 - 2022',
    description: 'Developed customer-facing web applications and internal tools. Collaborated with design team to implement pixel-perfect interfaces.',
    achievements: ['Built real-time analytics dashboard processing 1M+ events daily', 'Improved application performance by 40% through code refactoring', 'Integrated payment systems handling $2M+ in transactions']
  }, {
    title: 'Junior Developer',
    company: 'Freelance Project',
    period: '2019 - 2020',
    description: 'Contributed to multiple client projects across various industries. Gained experience in agile development and modern web technologies.',
    achievements: ['Developed responsive web applications for 10+ clients', 'Implemented RESTful APIs and database schemas', 'Participated in code reviews and pair programming sessions']
  }];
  return <section id="experience" className="py-32 relative overflow-hidden" ref={ref} style={{
    perspective: '1200px'
  }}>
    <BackgroundEffects opacity={0.5} zIndex={0} showParticles={true} numParticles={30} />
    {/* 3D Background */}
    <motion.div className="absolute inset-0 opacity-10" style={{
      y: useTransform(scrollYProgress, [0, 1], [-100, 100])
    }}>
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl" />
    </motion.div>

    <div className="max-w-5xl mx-auto px-6 relative z-10">
      <motion.div style={{
        rotateX,
        y: useTransform(scrollYProgress, [0, 0.2], [50, 0])
      }} className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
          Work Experience
        </h2>
        <motion.div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto" style={{
          scaleX: useTransform(scrollYProgress, [0, 0.2], [0, 1])
        }} />
      </motion.div>

      <div className="relative" style={{
        transformStyle: 'preserve-3d'
      }}>
        {/* 3D Timeline line */}
        <motion.div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary" style={{
          scaleY: useTransform(scrollYProgress, [0.2, 0.8], [0, 1]),
          transformOrigin: 'top',
          transform: 'translateZ(20px)'
        }} />

        <div className="space-y-12">
          {experiences.map((exp, index) => {
            const itemY = useTransform(scrollYProgress, [0.2 + index * 0.15, 0.5 + index * 0.15], [100, 0]);
            const itemRotateY = useTransform(scrollYProgress, [0.2 + index * 0.15, 0.5 + index * 0.15], [-20, 0]);
            const itemZ = useTransform(scrollYProgress, [0.2 + index * 0.15, 0.5 + index * 0.15], [-100, 0]);
            return <motion.div key={exp.company} style={{
              y: itemY,
              rotateY: itemRotateY,
              z: itemZ,
              transformStyle: 'preserve-3d'
            }} className="relative pl-20">
              {/* 3D Timeline dot */}
              <motion.div className="absolute left-6 top-6 w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg" style={{
                transform: 'translateZ(30px)'
              }} whileHover={{
                scale: 1.5,
                rotate: 180
              }} transition={{
                type: 'spring',
                stiffness: 300
              }}>
                <motion.div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent" animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0, 1]
                }} transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3
                }} />
              </motion.div>

              <motion.div className="bg-elevated p-6 rounded-2xl shadow-custom-lg border border-custom hover:shadow-custom-xl transition-shadow" style={{
                transform: 'translateZ(10px)'
              }} whileHover={{
                scale: 1.02,
                rotateY: 5,
                z: 50
              }} transition={{
                type: 'spring',
                stiffness: 300
              }}>
                <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-1">
                      {exp.title}
                    </h3>
                    <div className="flex items-center gap-2 text-secondary">
                      <BriefcaseIcon className="w-4 h-4" />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                  </div>
                  <span className="px-4 py-1 bg-accent/10 gradient-text rounded-full text-sm font-medium border border-accent/20">
                    {exp.period}
                  </span>
                </div>

                <p className="text-secondary mb-4 leading-relaxed">
                  {exp.description}
                </p>

                <div className="space-y-2">
                  {exp.achievements.map((achievement, i) => <motion.div key={i} initial={{
                    opacity: 0,
                    x: -20
                  }} whileInView={{
                    opacity: 1,
                    x: 0
                  }} transition={{
                    duration: 0.3,
                    delay: i * 0.1
                  }} viewport={{
                    once: true
                  }} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-sm text-secondary">
                      {achievement}
                    </span>
                  </motion.div>)}
                </div>
              </motion.div>
            </motion.div>;
          })}
        </div>
      </div>
    </div>
  </section>;
}