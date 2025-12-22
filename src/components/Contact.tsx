import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SendIcon, CheckCircleIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import NebulaBackground from './NebulaBackground';
import BackgroundEffects from './BackgroundEffects';
import Starfield from './StarFied';
export function Contact() {
  const ref = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  return <section id="contact" className="py-5 bg-primary relative overflow-hidden" ref={ref} style={{
    perspective: '1500px'
  }}>
    <Starfield />
    <BackgroundEffects opacity={0.6} zIndex={0} showParticles={true} numParticles={30} />

    {/* 3D Background */}
    {/* <motion.div className="absolute inset-0 opacity-10" style={{
      y: useTransform(scrollYProgress, [0, 1], [0, 150])
    }}>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
    </motion.div> */}

    <div className="max-w-6xl mx-auto px-6 relative z-10">
      <motion.div style={{
        rotateX,
        y: useTransform(scrollYProgress, [0, 0.3], [100, 0])
      }} className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
          Get In Touch
        </h2>
        <motion.div className="w-20 h-1 bg-gradient-to-r bg-accent mx-auto mb-4" style={{
          scaleX: useTransform(scrollYProgress, [0, 0.2], [0, 1])
        }} />
        <p className="text-secondary text-lg max-w-2xl mx-auto">
          Have a project in mind? Let's discuss how we can work together
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12" style={{
        transformStyle: 'preserve-3d'
      }}>
        {/* Contact Info - 3D Cards */}
        <motion.div style={{
          x: useTransform(scrollYProgress, [0.2, 0.6], [-100, 0]),
          rotateY: useTransform(scrollYProgress, [0.2, 0.6], [-20, 0]),
          z: useTransform(scrollYProgress, [0.2, 0.6], [-50, 0]),
          transformStyle: 'preserve-3d'
        }} className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-primary">
              Let's Connect
            </h3>
            <p className="text-secondary leading-relaxed mb-8">
              I'm always interested in hearing about new projects and
              opportunities. Whether you have a question or just want to say
              hi, feel free to reach out!
            </p>
          </div>

          <div className="space-y-6">
            {[{
              Icon: MailIcon,
              label: 'Email',
              value: 'dev@example.com'
            }, {
              Icon: PhoneIcon,
              label: 'Phone',
              value: '+1 (555) 123-4567'
            }, {
              Icon: MapPinIcon,
              label: 'Location',
              value: 'San Francisco, CA'
            }].map(({
              Icon,
              label,
              value
            }, index) => <motion.div key={label} initial={{
              opacity: 0,
              x: -20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.4,
              delay: index * 0.1
            }} viewport={{
              once: true
            }} whileHover={{
              scale: 1.05,
              rotateY: 5,
              z: 30
            }} style={{
              transform: `translateZ(${index * 10}px)`,
              transformStyle: 'preserve-3d'
            }} className="flex items-center gap-4 p-4 bg-elevated rounded-xl border border-custom hover:shadow-custom-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-tertiary">{label}</div>
                  <div className="font-medium text-primary">{value}</div>
                </div>
              </motion.div>)}
          </div>
        </motion.div>

        {/* 3D Contact Form */}
        <motion.div style={{
          x: useTransform(scrollYProgress, [0.2, 0.6], [100, 0]),
          rotateY: useTransform(scrollYProgress, [0.2, 0.6], [20, 0]),
          z: useTransform(scrollYProgress, [0.2, 0.6], [-50, 0]),
          transformStyle: 'preserve-3d'
        }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {[{
              id: 'name',
              label: 'Name',
              type: 'text'
            }, {
              id: 'email',
              label: 'Email',
              type: 'email'
            }, {
              id: 'subject',
              label: 'Subject',
              type: 'text'
            }].map((field, index) => <motion.div key={field.id} style={{
              transform: `translateZ(${index * 5}px)`
            }}>
              <label htmlFor={field.id} className="block text-sm font-medium text-secondary mb-2">
                {field.label}
              </label>
              <motion.input type={field.type} id={field.id} name={field.id} value={formData[field.id as keyof typeof formData]} onChange={handleChange} required className="w-full px-4 py-3 bg-elevated border-2 border-custom rounded-xl text-primary focus:border-accent focus:outline-none transition-colors" whileFocus={{
                scale: 1.02,
                z: 20
              }} />
            </motion.div>)}

            <motion.div style={{
              transform: 'translateZ(15px)'
            }}>
              <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">
                Message
              </label>
              <motion.textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full px-4 py-3 bg-elevated border-2 border-custom rounded-xl text-primary focus:border-accent focus:outline-none transition-colors resize-none" whileFocus={{
                scale: 1.02,
                z: 20
              }} />
            </motion.div>

            <motion.button type="submit" className="w-full px-8 py-4 gradient-button font-medium rounded-xl flex items-center justify-center gap-2 relative overflow-hidden" whileHover={{
              scale: 1.02,
              z: 30,
            }} whileTap={{
              scale: 0.98
            }} style={{
              transform: 'translateZ(20px)'
            }} disabled={isSubmitted}>
              {isSubmitted ? <>
                <motion.div initial={{
                  scale: 0
                }} animate={{
                  scale: 1
                }} transition={{
                  type: 'spring',
                  stiffness: 200
                }}>
                  <CheckCircleIcon className="w-5 h-5" />
                </motion.div>
                Message Sent!
              </> : <>
                Send Message
                <SendIcon className="w-5 h-5" />
              </>}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  </section>;
}