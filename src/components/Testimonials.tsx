import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { QuoteIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
export function Testimonials() {
  const ref = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 0, 20]);
  const testimonials = [{
    name: 'Sarah Johnson',
    role: 'CTO at TechCorp',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    content: 'An exceptional developer who consistently delivers high-quality work. Their technical expertise and problem-solving abilities are outstanding.'
  }, {
    name: 'Michael Chen',
    role: 'Product Manager at InnovateLabs',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    content: 'Working with them was a pleasure. They understood our requirements perfectly and delivered beyond expectations. Highly recommended!'
  }, {
    name: 'Emily Rodriguez',
    role: 'CEO at StartupHub',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    content: 'Their full-stack expertise helped us launch our product ahead of schedule. Professional, reliable, and incredibly skilled.'
  }, {
    name: 'David Park',
    role: 'Lead Designer at CreativeStudio',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    content: 'A true professional who brings both technical excellence and creative problem-solving to every project. A joy to collaborate with.'
  }];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);
  const handlePrevious = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };
  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };
  return <section id="testimonials" className="py-32 bg-secondary overflow-hidden relative" ref={ref} style={{
    perspective: '1500px'
  }}>
      {/* 3D Background */}
      <motion.div className="absolute inset-0 opacity-10" style={{
      y: useTransform(scrollYProgress, [0, 1], [-50, 50])
    }}>
        <div className="absolute top-40 right-40 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div style={{
        y: useTransform(scrollYProgress, [0, 0.3], [100, 0]),
        rotateX: useTransform(scrollYProgress, [0, 0.3], [15, 0])
      }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Client Testimonials
          </h2>
          <motion.div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-4" style={{
          scaleX: useTransform(scrollYProgress, [0, 0.2], [0, 1])
        }} />
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            What clients and colleagues say about working with me
          </p>
        </motion.div>

        <div className="relative" style={{
        transformStyle: 'preserve-3d'
      }}>
          <div className="overflow-hidden">
            <motion.div className="flex" animate={{
            x: `-${currentIndex * 100}%`
          }} transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30
          }} style={{
            transformStyle: 'preserve-3d'
          }}>
              {testimonials.map((testimonial, index) => <div key={index} className="w-full flex-shrink-0 px-4">
                  <motion.div style={{
                rotateY: useTransform(scrollYProgress, [0.3, 0.7], [index === currentIndex ? 0 : -20, index === currentIndex ? 0 : 20]),
                z: useTransform(scrollYProgress, [0.3, 0.7], [index === currentIndex ? 50 : -50, index === currentIndex ? 50 : -50]),
                transformStyle: 'preserve-3d'
              }} whileHover={{
                scale: 1.02,
                rotateY: 5,
                z: 100
              }} transition={{
                type: 'spring',
                stiffness: 300
              }} className="bg-elevated p-8 md:p-12 rounded-3xl shadow-custom-xl border border-custom max-w-4xl mx-auto">
                    <QuoteIcon className="w-12 h-12 text-accent/30 mb-6" />
                    <p className="text-xl md:text-2xl text-primary leading-relaxed mb-8 font-light">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <motion.img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover border-2 border-accent" whileHover={{
                    scale: 1.1,
                    rotate: 5
                  }} style={{
                    transform: 'translateZ(20px)'
                  }} />
                      <div>
                        <h4 className="font-bold text-primary">
                          {testimonial.name}
                        </h4>
                        <p className="text-secondary text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>)}
            </motion.div>
          </div>

          {/* 3D Navigation buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button onClick={handlePrevious} className="w-12 h-12 rounded-full bg-elevated border border-custom flex items-center justify-center text-primary hover:bg-secondary transition-colors shadow-custom-md" whileHover={{
            scale: 1.1,
            rotateY: 10,
            z: 30
          }} whileTap={{
            scale: 0.9
          }} style={{
            transformStyle: 'preserve-3d'
          }}>
              <ChevronLeftIcon className="w-6 h-6" />
            </motion.button>
            <motion.button onClick={handleNext} className="w-12 h-12 rounded-full bg-elevated border border-custom flex items-center justify-center text-primary hover:bg-secondary transition-colors shadow-custom-md" whileHover={{
            scale: 1.1,
            rotateY: -10,
            z: 30
          }} whileTap={{
            scale: 0.9
          }} style={{
            transformStyle: 'preserve-3d'
          }}>
              <ChevronRightIcon className="w-6 h-6" />
            </motion.button>
          </div>

          {/* 3D Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => <motion.button key={index} onClick={() => setCurrentIndex(index)} className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-accent w-8' : 'bg-border-custom'}`} whileHover={{
            scale: 1.3,
            z: 20
          }} style={{
            transformStyle: 'preserve-3d'
          }} />)}
          </div>
        </div>
      </div>
    </section>;
}