import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLinkIcon, GithubIcon } from 'lucide-react';
export function Projects() {
  const ref = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  const projects = [{
    title: 'E-Commerce Platform',
    description: 'Full-featured online store with payment integration, inventory management, and real-time analytics.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    demoUrl: '#',
    githubUrl: '#'
  }, {
    title: 'Project Management Tool',
    description: 'Collaborative workspace with task tracking, team communication, and progress visualization.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    tags: ['Next.js', 'TypeScript', 'MongoDB', 'WebSocket'],
    demoUrl: '#',
    githubUrl: '#'
  }, {
    title: 'AI Content Generator',
    description: 'ML-powered application for generating marketing copy, blog posts, and social media content.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    tags: ['Python', 'React', 'OpenAI', 'Redis'],
    demoUrl: '#',
    githubUrl: '#'
  }, {
    title: 'Real-Time Analytics Dashboard',
    description: 'Interactive dashboard with live data visualization, custom reports, and export functionality.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    tags: ['Vue.js', 'D3.js', 'Node.js', 'InfluxDB'],
    demoUrl: '#',
    githubUrl: '#'
  }, {
    title: 'Social Media Scheduler',
    description: 'Multi-platform scheduling tool with content calendar, analytics, and team collaboration features.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    tags: ['React', 'Express', 'PostgreSQL', 'AWS'],
    demoUrl: '#',
    githubUrl: '#'
  }, {
    title: 'Video Streaming Platform',
    description: 'Netflix-style streaming service with adaptive bitrate, recommendations, and user profiles.',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&q=80',
    tags: ['Next.js', 'Node.js', 'FFmpeg', 'AWS S3'],
    demoUrl: '#',
    githubUrl: '#'
  }];
  return <section id="projects" className="py-32 bg-primary relative overflow-hidden" ref={ref} style={{
    perspective: '1500px'
  }}>
      {/* 3D Background */}
      <motion.div className="absolute inset-0 opacity-10" style={{
      y: useTransform(scrollYProgress, [0, 1], [0, 200])
    }}>
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div style={{
        rotateX,
        y: useTransform(scrollYProgress, [0, 0.3], [100, 0])
      }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Featured Projects
          </h2>
          <motion.div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-4" style={{
          scaleX: useTransform(scrollYProgress, [0, 0.2], [0, 1])
        }} />
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            A selection of projects showcasing my expertise in full-stack
            development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{
        transformStyle: 'preserve-3d'
      }}>
          {projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} scrollProgress={scrollYProgress} />)}
        </div>
      </div>
    </section>;
}
function ProjectCard({
  project,
  index,
  scrollProgress
}: {
  project: any;
  index: number;
  scrollProgress: any;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const yOffset = useTransform(scrollProgress, [0, 1], [100 + index * 20, -100 - index * 20]);
  const rotateY = useTransform(scrollProgress, [0, 0.5, 1], [-10 + index * 2, 0, 10 - index * 2]);
  const z = useTransform(scrollProgress, [0, 0.5, 1], [-50, 0, -50]);
  return <motion.div ref={cardRef} style={{
    y: yOffset,
    rotateY,
    z,
    transformStyle: 'preserve-3d'
  }} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)} whileHover={{
    scale: 1.05,
    rotateY: 5,
    z: 100
  }} transition={{
    type: 'spring',
    stiffness: 300,
    damping: 20
  }} className="group relative bg-elevated rounded-2xl overflow-hidden shadow-custom-lg hover:shadow-custom-xl border border-custom">
      <div className="relative h-48 overflow-hidden">
        <motion.img src={project.image} alt={project.title} className="w-full h-full object-cover" animate={{
        scale: isHovered ? 1.1 : 1
      }} transition={{
        duration: 0.4
      }} />
        <motion.div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" initial={{
        opacity: 0
      }} animate={{
        opacity: isHovered ? 1 : 0
      }} transition={{
        duration: 0.3
      }} />
        <motion.div className="absolute inset-0 flex items-center justify-center gap-4" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: isHovered ? 1 : 0,
        y: isHovered ? 0 : 20
      }} transition={{
        duration: 0.3
      }}>
          <motion.a href={project.demoUrl} className="px-4 py-2 bg-white text-black rounded-lg font-medium flex items-center gap-2 hover:bg-white/90 transition-colors" whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            <ExternalLinkIcon className="w-4 h-4" />
            Demo
          </motion.a>
          <motion.a href={project.githubUrl} className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg font-medium flex items-center gap-2 hover:bg-white/20 transition-colors" whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            <GithubIcon className="w-4 h-4" />
            Code
          </motion.a>
        </motion.div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-primary">{project.title}</h3>
        <p className="text-secondary mb-4 text-sm leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string, i: number) => <motion.span key={tag} className="text-xs px-3 py-1 bg-secondary rounded-full text-secondary border border-custom" whileHover={{
          scale: 1.1,
          y: -2
        }} transition={{
          duration: 0.2,
          delay: i * 0.05
        }}>
              {tag}
            </motion.span>)}
        </div>
      </div>
    </motion.div>;
}