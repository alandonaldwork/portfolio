import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Projects } from '../components/Projects';
import { Experience } from '../components/Experience';
import { Skills } from '../components/Skills';
import { Testimonials } from '../components/Testimonials';
import { Contact } from '../components/Contact';
import { AboutModified } from '../components/AboutModified';
import { CustomCursorModified } from '../components/CustomCursorModified';
import { useLenis } from '../hooks/useLenis';
import { ProjectsModified } from '../components/ProjectsModified';
import PinnedScrollAnimation from '../components/PinnedScrollAnimation';
import ProjectsIntro from '../components/ProjectIntro';
import PortalOpeningIntro from '../components/PortalOpeningIntro';
import NebulaEffectWithTheme from '../components/NebulaEffectWithTheme';
import CinematicIntro from '../components/CinematicIntro ';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import gsap from "gsap";
import Starfield from '../components/StarFied';
import BackgroundEffects from '../components/BackgroundEffects';
import { ContactModified } from '../components/ContactModified';
import TextScrollVelocity from '../components/TextScrollVelocity';
export function Portfolio() {
  useLenis();
  return <div className="min-h-screen bg-primary cursor-none">
    <CustomCursorModified />
    <Navigation />
    <Hero />
    <AboutModified />
    <TextScrollVelocity
      baseVelocity={2}
      className="mb-0"
    />
    {/* <NebulaEffectWithTheme /> */}
    <ProjectsModified />
    <Experience />
    <Skills />
    <ContactModified />
    <footer className="bg-secondary border-t border-custom py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-secondary text-sm">
            © 2024 Full-Stack Developer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>;
}

{/* <PortalOpeningIntro /> */ }
{/* <PinnedScrollAnimation /> */ }
{/* <ProjectsIntro /> */ }
{/* <Testimonials /> */ }
{/* Footer */ }