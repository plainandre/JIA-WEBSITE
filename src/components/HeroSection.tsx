/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronRight, ArrowRight, Shield, Award, Users, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { PageId, AboutSubPageId } from '../types';
import JiaLogo from './JiaLogo';

interface HeroSectionProps {
  setActiveTab: (tab: PageId) => void;
  setActiveSubTab: (subTab: AboutSubPageId) => void;
}

export default function HeroSection({ setActiveTab, setActiveSubTab }: HeroSectionProps) {
  const handlePageClick = (tabId: PageId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAboutSubClick = (subTabId: AboutSubPageId) => {
    setActiveTab('about');
    setActiveSubTab(subTabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 bg-[#f5f5f7] pb-16">
      
      {/* Hero Banner 1: Primary Brand Statement (Dark, Cinematic, Apple Pro Style) */}
      <section className="relative w-full overflow-hidden bg-black text-white px-4 py-24 sm:py-32 text-center" id="hero-banner-main">
        {/* Subtle glowing architectural blueprint background element */}
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-screen bg-[linear-gradient(rgba(24,179,69,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(24,179,69,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
        
        <div className="relative mx-auto max-w-4xl flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-8"
          >
            <JiaLogo size={120} showText={true} color="#18B345" className="filter drop-shadow-[0_4px_12px_rgba(24,179,69,0.2)]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-white font-sans max-w-3xl leading-[1.1]"
          >
            Excellence in <span className="text-[#18B345] bg-gradient-to-r from-[#18B345] to-[#43B65C] bg-clip-text text-transparent">Architecture</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-lg sm:text-2xl text-gray-400 font-light max-w-2xl leading-relaxed"
          >
            The national professional body representing architects in Jamaica, promoting sustainability, ethical practice, and heritage since 1967.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => handleAboutSubClick('overview')}
              className="px-6 py-3 rounded-full bg-[#138F34] hover:bg-[#18B345] text-white text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-1 hover:scale-102"
              id="hero-cta-about"
            >
              <span>Explore the JIA</span>
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => handlePageClick('portal')}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition-all border border-white/20 backdrop-blur-md flex items-center space-x-1"
              id="hero-cta-portal"
            >
              <span>Members' Portal</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Hero Banner 2: Split / Double card layout (Apple Pro Layout style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          
          {/* Left card: History card */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 flex flex-col justify-between h-[420px] shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Our Legacy</span>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 mt-2 mb-4 leading-tight">
                Established 1967.
              </h2>
              <p className="text-gray-500 font-light leading-relaxed text-sm sm:text-base">
                Founded originally as the Jamaica Society of Architects, the Institute has championed professional standards, educational excellence, and advocacy for a built environment that honors Jamaica's climate, landscape, and cultural heritage.
              </p>
            </div>
            <button
              onClick={() => handleAboutSubClick('history')}
              className="mt-6 text-[#138F34] hover:text-[#18B345] font-semibold text-sm flex items-center group self-start"
            >
              <span>Read our history</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Right card: Mission card */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-[#138F34] to-[#16683A] text-white rounded-3xl p-8 sm:p-12 flex flex-col justify-between h-[420px] shadow-[0_4px_24px_rgba(19,143,52,0.15)]"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/60">The Purpose</span>
              <h2 className="text-3xl font-bold tracking-tight text-white mt-2 mb-4 leading-tight">
                Advocacy & Standards.
              </h2>
              <p className="text-white/80 font-light leading-relaxed text-sm sm:text-base">
                Promoting excellence in architecture, encouraging top-tier professional standards, ethical practice, and supporting the active development of future generations through architectural education and student programs.
              </p>
            </div>
            <button
              onClick={() => handleAboutSubClick('mission')}
              className="mt-6 text-white hover:text-white/80 font-semibold text-sm flex items-center group self-start"
            >
              <span>View our objectives</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

        </div>
      </section>

      {/* Core Pillars / Grid section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#138F34]">Core Focus</span>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mt-2">
            The Pillars of JIA
          </h2>
          <p className="text-gray-500 font-light mt-3">
            How the Jamaican Institute of Architects advances local and global standards of architectural practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Shield,
              title: 'Professional Integrity',
              desc: 'Enforcing the Code of Professional Conduct to safeguard client relationships, public safety, and design values.',
              subTab: 'committees',
            },
            {
              icon: Award,
              title: 'Excellence & CPD',
              desc: 'Providing rigorous Continuing Professional Development seminars to maintain state-of-the-art practice skills.',
              tab: 'events',
            },
            {
              icon: Users,
              title: 'Public Engagement',
              desc: 'Contributing to national dialogues on housing, urban planning, environmental resilience, and building codes.',
              subTab: 'advocacy',
            },
            {
              icon: BookOpen,
              title: 'Architectural Education',
              desc: 'Endorsing and vetting local institutions, facilitating internships, and providing student member structures.',
              subTab: 'overview',
            },
          ].map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col justify-between hover:shadow-xl hover:shadow-gray-200/50 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.01)]"
            >
              <div>
                <div className="p-3 bg-gray-50 rounded-xl w-fit mb-5 text-[#138F34]">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{pillar.title}</h3>
                <p className="text-gray-500 font-light text-xs sm:text-sm leading-relaxed">{pillar.desc}</p>
              </div>
              <button
                onClick={() => pillar.tab ? handlePageClick(pillar.tab as PageId) : handleAboutSubClick(pillar.subTab as AboutSubPageId)}
                className="mt-6 text-[#138F34] hover:text-[#18B345] font-semibold text-xs flex items-center group self-start"
              >
                <span>Learn more</span>
                <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
