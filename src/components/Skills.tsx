import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Starfield from './StarFied';
import BackgroundEffects from './BackgroundEffects';

export function Skills() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);

  const skillCategories = [
    {
      name: 'Frontend Development',
      skills: [
        { name: 'Angular', level: 85, icon: '🔺' },
        { name: 'React', level: 95, icon: '⚛️' },
        { name: 'Kotlin', level: 90, icon: '🅺' },
        { name: 'Tailwind CSS', level: 92, icon: '🌬️' }
      ]
    },
    {
      name: 'Backend Development',
      skills: [
        { name: 'Java / Spring Boot', level: 93, icon: '☕' },
        { name: 'Microservices Architecture', level: 88, icon: '🧩' },
        { name: 'PostgreSQL', level: 90, icon: '🐘' },
        { name: 'Redis', level: 85, icon: '🔴' }
      ]
    },
    {
      name: 'DevOps & Tools',
      skills: [
        { name: 'Docker', level: 87, icon: '🐳' },
        { name: 'AWS', level: 84, icon: '☁️' },
        { name: 'CI/CD', level: 89, icon: '🔄' },
        { name: 'Git', level: 95, icon: '📦' }
      ]
    }
  ];

  return (
    <section
      id="skills"
      className="py-32 bg-primary relative overflow-hidden"
      ref={ref}
      style={{ perspective: '1500px' }}
    >
      <Starfield />
      <BackgroundEffects opacity={0.6} zIndex={0} showParticles={true} numParticles={30} />

      {/* Background Blur */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -150])
        }}
      >
        <div className="absolute bottom-40 left-40 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          style={{
            rotateX,
            y: useTransform(scrollYProgress, [0, 0.2], [80, 0])
          }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Technical Skills
          </h2>

          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-4"
            style={{ scaleX: useTransform(scrollYProgress, [0, 0.2], [0, 1]) }}
          />

          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Proficient in modern technologies and frameworks across the full development stack
          </p>
        </motion.div>

        {/* Skill Cards */}
        <div className="grid md:grid-cols-3 gap-8 auto-rows-fr">
          {skillCategories.map((category, categoryIndex) => {
            const cardY = useTransform(scrollYProgress, [0.2, 0.6], [100 + categoryIndex * 30, -50]);
            const cardRotateY = useTransform(scrollYProgress, [0.2, 0.6], [-15 + categoryIndex * 5, 0]);
            const cardZ = useTransform(scrollYProgress, [0.2, 0.6], [-100, categoryIndex * 20]);

            return (
              <motion.div
                key={category.name}
                className="cursor-pointer perspective-1500"
                whileHover={{
                  scale: 1.05,
                  translateY: -10, // slight lift
                  rotateX: 5,
                  rotateY: 10,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="bg-elevated p-8 rounded-2xl shadow-custom-lg border border-custom flex flex-col h-full"
                  style={{
                    y: cardY,
                    rotateY: cardRotateY,
                    translateZ: cardZ,
                    transformStyle: "preserve-3d",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-xl font-bold mb-6 text-primary">{category.name}</h3>

                  <div className="space-y-6 flex-1">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <motion.span
                              className="text-2xl"
                              whileHover={{ scale: 1.3, rotate: 360, translateZ: 30 }}
                              transition={{ type: "spring", stiffness: 300 }}
                              style={{ display: "inline-block", transformStyle: "preserve-3d" }}
                            >
                              {skill.icon}
                            </motion.span>
                            <span className="text-sm font-medium text-primary">{skill.name}</span>
                          </div>
                          <span className="text-sm text-secondary">{skill.level}%</span>
                        </div>

                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{
                              duration: 1.2,
                              delay: skillIndex * 0.1 + 0.3,
                              type: "spring",
                              stiffness: 120,
                              damping: 15,
                            }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>



        {/* Other Technologies */}
        <motion.div
          style={{
            y: useTransform(scrollYProgress, [0.4, 0.8], [100, -50]),
            rotateX: useTransform(scrollYProgress, [0.4, 0.8], [10, -10])
          }}
          className="mt-5"
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-primary">
            Other Technologies
          </h3>

          <div className="flex flex-wrap justify-center gap-3" style={{ transformStyle: 'preserve-3d' }}>
            {[
              "Spring Security",
              "Spring Batch",
              "gRPC",
              "GraphQL",
              "REST API",
              "Microservices",
              "WebSocket",
              "Liquibase",
              "MongoDB",
              "MicroFrontend",
              "Module Federation",
              "Bucket4j (with Redis)",
              "Kubernetes",
              "Jenkins",
              "Agile",
              "Grafana",
              "Prometheus",
              "Elasticsearch"
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: "easeOut", delay: index * 0.06 }}
                whileHover={{
                  scale: 1.18,
                  y: -12,
                  boxShadow: "0 0 15px rgba(100, 200, 255, 0.5)"
                }}
                viewport={{ once: true }}
                style={{ transform: `translateZ(${(index % 3) * 10}px)` }}
                className="px-4 py-2 bg-elevated rounded-full text-sm font-medium text-secondary border border-custom shadow-custom-sm transition-shadow"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
