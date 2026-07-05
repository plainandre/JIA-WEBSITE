/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar, UserPlus, BookOpen, MapPin, ArrowUpRight, Award, Briefcase, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { PageId, AboutSubPageId } from '../types';

interface BentoGridProps {
  setActiveTab: (tab: PageId) => void;
  setActiveSubTab: (subTab: AboutSubPageId) => void;
}

export default function BentoGrid({ setActiveTab, setActiveSubTab }: BentoGridProps) {
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" id="bento-navigation-section">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#138F34]">Quick Access</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 mt-1">
          Explore JIA Platforms
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[160px] sm:auto-rows-[180px]">
        
        {/* Card 1: About (Medium card: span-4) */}
        <motion.div
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="md:col-span-4 md:row-span-2 bg-white rounded-3xl p-8 border border-gray-100 flex flex-col justify-between shadow-[0_4px_16px_rgba(0,0,0,0.015)] group relative overflow-hidden"
          onClick={() => handleAboutSubClick('overview')}
        >
          {/* Subtle logo background shadow for JIA feel */}
          <div className="absolute -right-12 -bottom-12 opacity-5 text-[#138F34] pointer-events-none group-hover:scale-110 transition-transform duration-500">
            <BookOpen size={240} />
          </div>
          <div className="flex justify-between items-start">
            <div className="p-3 bg-[#138F34]/5 text-[#138F34] rounded-2xl">
              <BookOpen className="h-6 w-6" />
            </div>
            <span className="p-1.5 bg-gray-50 rounded-full text-gray-400 group-hover:text-gray-900 group-hover:bg-gray-100 transition-colors">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Institutional Role</span>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 mb-2">About the JIA</h3>
            <p className="text-gray-500 font-light text-xs sm:text-sm max-w-md">
              Discover our foundation as the Jamaica Society of Architects in 1967, our transition to a Board of Directors, and our governance as a registered professional organization in Jamaica.
            </p>
          </div>
        </motion.div>

        {/* Card 2: Membership (Small card: span-2) */}
        <motion.div
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="md:col-span-2 md:row-span-1 bg-white rounded-3xl p-6 border border-gray-100 flex flex-col justify-between shadow-[0_4px_16px_rgba(0,0,0,0.015)] group cursor-pointer"
          onClick={() => handlePageClick('membership')}
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-50 text-[#108153] rounded-2xl">
              <UserPlus className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-gray-300 group-hover:text-gray-900 transition-colors" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">Membership</h3>
            <p className="text-gray-500 font-light text-xs mt-1">Explore classes of registration, credentials, and benefits.</p>
          </div>
        </motion.div>

        {/* Card 3: CPD & Events (Small card: span-2) */}
        <motion.div
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="md:col-span-2 md:row-span-1 bg-white rounded-3xl p-6 border border-gray-100 flex flex-col justify-between shadow-[0_4px_16px_rgba(0,0,0,0.015)] group cursor-pointer"
          onClick={() => handlePageClick('events')}
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
              <Calendar className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-gray-300 group-hover:text-gray-900 transition-colors" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">CPD Seminars</h3>
            <p className="text-gray-500 font-light text-xs mt-1">Continuous educational guidelines and credit workshops.</p>
          </div>
        </motion.div>

        {/* Card 4: Architects Week (Medium card: span-3) */}
        <motion.div
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="md:col-span-3 md:row-span-2 bg-gradient-to-br from-[#16683A] to-[#138F34] text-white rounded-3xl p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(22,104,58,0.15)] group cursor-pointer"
          onClick={() => handlePageClick('events')}
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-white/10 rounded-2xl">
              <Award className="h-6 w-6 text-[#54E97A]" />
            </div>
            <span className="p-1.5 bg-white/10 rounded-full text-white/60 group-hover:text-white transition-colors">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase">Annual Exhibition</span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-1 mb-2">Architects Week</h3>
            <p className="text-white/80 font-light text-xs sm:text-sm">
              Our flagship annual celebration of Jamaican architecture. Features public lectures, design galleries, student galleries, and high-impact social networking.
            </p>
          </div>
        </motion.div>

        {/* Card 5: Resources & Standards (Small/medium: span-3) */}
        <motion.div
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="md:col-span-3 md:row-span-1 bg-white rounded-3xl p-6 border border-gray-100 flex flex-col justify-between shadow-[0_4px_16px_rgba(0,0,0,0.015)] group cursor-pointer"
          onClick={() => handlePageClick('standards')}
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
              <FileText className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-gray-300 group-hover:text-gray-900 transition-colors" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">Practice Standards</h3>
            <p className="text-gray-500 font-light text-xs mt-1">Scale of Fees, Code of Ethics, Client agreements, and standard JIA documents.</p>
          </div>
        </motion.div>

        {/* Card 6: Contact (Small/medium: span-3) */}
        <motion.div
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="md:col-span-3 md:row-span-1 bg-white rounded-3xl p-6 border border-gray-100 flex flex-col justify-between shadow-[0_4px_16px_rgba(0,0,0,0.015)] group cursor-pointer"
          onClick={() => handlePageClick('contact')}
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-gray-50 text-gray-800 rounded-2xl">
              <MapPin className="h-5 w-5" />
            </div>
            <ArrowUpRight className="h-4 w-4 text-gray-300 group-hover:text-gray-900 transition-colors" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">Connect with JIA</h3>
            <p className="text-gray-500 font-light text-xs mt-1">General inquiries, office registration, administrative boards, and consultations.</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
