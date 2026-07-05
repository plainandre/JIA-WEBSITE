/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, BookOpen, Clock, Target, CalendarDays, ClipboardCheck, Landmark, ShieldCheck } from 'lucide-react';
import { AboutSubPageId } from '../types';

interface AboutViewProps {
  activeSubTab: AboutSubPageId;
  setActiveSubTab: (subTab: AboutSubPageId) => void;
}

export default function AboutView({ activeSubTab, setActiveSubTab }: AboutViewProps) {
  const subTabs: { id: AboutSubPageId; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'mission', label: 'Mission & Objectives', icon: Target },
    { id: 'what-we-do', label: 'What We Do', icon: CalendarDays },
    { id: 'committees', label: 'Committees', icon: ClipboardCheck },
    { id: 'advocacy', label: 'Advocacy & Public Role', icon: Landmark },
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* Page Header (Apple Pro style) */}
      <section className="bg-[#f5f5f7] border-b border-gray-200 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#138F34] bg-[#138F34]/5 px-3.5 py-1.5 rounded-full">
            Institute Profile
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mt-4 mb-3">
            About the JIA
          </h1>
          <p className="text-sm sm:text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            Leading the architectural landscape of Jamaica by setting standards of design, ethical integrity, and community resilience.
          </p>
        </div>
      </section>

      {/* Apple-style Subnavigation Bar */}
      <nav className="sticky top-12 z-40 bg-white/95 border-b border-gray-200 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-12 items-center justify-start md:justify-center overflow-x-auto scrollbar-none gap-6 sm:gap-8 py-1.5">
            {subTabs.map((tab) => {
              const IconComp = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSubTab(tab.id);
                    document.getElementById('about-subpage-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`flex items-center space-x-1.5 shrink-0 py-2.5 border-b-2 text-xs font-medium tracking-wide transition-all ${
                    activeSubTab === tab.id
                      ? 'border-[#138F34] text-[#138F34]'
                      : 'border-transparent text-gray-400 hover:text-gray-900'
                  }`}
                >
                  <IconComp className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Interactive Sub-tab Content Frame */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12" id="about-subpage-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSubTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            
            {/* 1. OVERVIEW */}
            {activeSubTab === 'overview' && (
              <div className="space-y-8">
                <div className="border-l-4 border-[#138F34] pl-6 space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                    The National Professional Body Representing Architects in Jamaica
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed">
                    The Jamaican Institute of Architects Limited is the national professional body representing architects in Jamaica.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                  <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 space-y-4 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900">Advancing Architecture</h3>
                    <p className="text-gray-500 text-sm font-light leading-relaxed">
                      The Institute promotes the advancement of architecture through education, advocacy, continuing professional development, professional standards, and public engagement.
                    </p>
                    <p className="text-gray-500 text-sm font-light leading-relaxed">
                      It supports the development of architectural knowledge, promotes ethical practice, and contributes to national discussions on planning, heritage, housing, sustainability, and the built environment.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 space-y-4 border border-gray-100 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">JIA Unified Platform</h3>
                      <p className="text-gray-500 text-sm font-light leading-relaxed mt-2">
                        The JIA provides a platform for architects, students, allied professionals, and industry partners to engage with issues affecting the profession and the wider public.
                      </p>
                    </div>
                    <div className="mt-6 border-t border-gray-200/60 pt-4 flex items-center space-x-3 text-xs text-[#138F34] font-medium">
                      <ShieldCheck className="h-5 w-5" />
                      <span>Certified Practitioner Framework</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. HISTORY */}
            {activeSubTab === 'history' && (
              <div className="space-y-8">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                  Our Evolution Since 1967
                </h2>

                {/* Timeline Grid (Apple style) */}
                <div className="relative border-l border-gray-200 pl-8 ml-4 space-y-12 py-4">
                  
                  {/* Timeline point 1 */}
                  <div className="relative">
                    <div className="absolute -left-[41px] top-1.5 bg-white border-2 border-[#138F34] rounded-full h-6 w-6 flex items-center justify-center">
                      <div className="bg-[#138F34] rounded-full h-2 w-2" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-semibold text-[#138F34] bg-[#138F34]/5 px-2.5 py-1 rounded-full">
                        1967
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mt-2">Foundation</h3>
                      <p className="text-gray-500 text-sm font-light mt-1 max-w-xl">
                        The Jamaican Institute of Architects began in 1967 as the <strong>Jamaica Society of Architects</strong>. Since then, the organisation has evolved into the principal professional body for architects in Jamaica, supporting the development of the profession.
                      </p>
                    </div>
                  </div>

                  {/* Timeline point 2 */}
                  <div className="relative">
                    <div className="absolute -left-[41px] top-1.5 bg-white border-2 border-gray-300 rounded-full h-6 w-6 flex items-center justify-center">
                      <div className="bg-gray-300 rounded-full h-2 w-2" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                        1967 - 2025
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mt-2">Professional Growth</h3>
                      <p className="text-gray-500 text-sm font-light mt-1 max-w-xl">
                        The organization grew to encompass the full scale of urban and regional architecture in Jamaica, driving public appreciation of architecture and the allied arts and sciences.
                      </p>
                    </div>
                  </div>

                  {/* Timeline point 3 */}
                  <div className="relative">
                    <div className="absolute -left-[41px] top-1.5 bg-[#18B345] border-2 border-[#138F34] rounded-full h-6 w-6 flex items-center justify-center">
                      <div className="bg-white rounded-full h-2 w-2" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-white bg-[#138F34] px-2.5 py-1 rounded-full">
                        June 2, 2025
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mt-2">Official Incorporation</h3>
                      <p className="text-gray-500 text-sm font-light mt-1 max-w-xl">
                        On 2 June 2025, the Jamaican Institute of Architects was incorporated as <strong>The Jamaican Institute of Architects Limited</strong>, a company limited by guarantee and not having a share capital. This marked an important governance milestone in the Institute's continued development.
                      </p>
                    </div>
                  </div>

                  {/* Timeline point 4 */}
                  <div className="relative">
                    <div className="absolute -left-[41px] top-1.5 bg-white border-2 border-[#108153] rounded-full h-6 w-6 flex items-center justify-center">
                      <div className="bg-[#108153] rounded-full h-2 w-2" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-semibold text-[#108153] bg-emerald-50 px-2.5 py-1 rounded-full">
                        Present
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mt-2">Board Governance Transition</h3>
                      <p className="text-gray-500 text-sm font-light mt-1 max-w-xl">
                        Following incorporation, the Institute's former Executive Council structure transitioned into a modern Board of Directors, while retaining officer roles including President, Vice President, Honorary Secretary, and Honorary Treasurer.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* 3. MISSION & OBJECTIVES */}
            {activeSubTab === 'mission' && (
              <div className="space-y-10">
                <div className="bg-gradient-to-br from-[#138F34] to-[#28723D] text-white rounded-3xl p-8 sm:p-12 shadow-lg">
                  <span className="text-xs font-bold tracking-widest text-white/70 uppercase">The Mission</span>
                  <h2 className="text-3xl font-extrabold text-white mt-1 mb-4 leading-tight">
                    To promote excellence in architecture and support the advancement of the architectural profession in Jamaica.
                  </h2>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900">Objectives of the Institute</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Promoting architecture and its role in Jamaica’s built environment.',
                      'Supporting education and research in architecture.',
                      'Providing continuing professional development for architects and allied professionals.',
                      'Encouraging high standards of professional practice and ethical conduct.',
                      'Supporting public appreciation of architecture, design, heritage, sustainability, and the allied arts.',
                      'Contributing to national conversations on housing, planning, climate resilience, and sustainable development.',
                      'Supporting students and institutions involved in architectural education.',
                    ].map((objective, idx) => (
                      <div key={idx} className="flex items-start space-x-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <span className="font-mono text-xs font-semibold text-[#138F34] bg-[#138F34]/5 h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="text-gray-600 text-xs sm:text-sm font-light leading-relaxed">
                          {objective}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. WHAT WE DO */}
            {activeSubTab === 'what-we-do' && (
              <div className="space-y-8">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                  Core Programs and Initiatives
                </h2>
                <p className="text-gray-500 font-light text-sm sm:text-base leading-relaxed max-w-3xl">
                  The Jamaican Institute of Architects undertakes a range of initiatives in support of the profession and the public, including:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: 'CPD Seminars', desc: 'Continuing Professional Development seminars and workshops to maintain active certifications.' },
                    { title: 'Public Lectures', desc: 'Public lectures, design exhibitions, and civic educational programmes.' },
                    { title: 'Architects Week', desc: 'Architects Week and other flagship annual networking events.' },
                    { title: 'Career Outreach', desc: 'Career outreach activities in high schools and higher architectural educational institutions.' },
                    { title: 'Public Advocacy', desc: 'Advocacy on matters affecting architecture, urban planning, heritage, and building codes.' },
                    { title: 'Standard Guidance', desc: 'Professional guidance through standard client forms, contract documents, and practice codes.' },
                    { title: 'Government Relations', desc: 'Engagement with government agencies, planning authorities, educational boards, and industry stakeholders.' },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white border border-gray-150 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-md transition-shadow">
                      <div className="font-mono text-xs font-semibold text-[#138F34] bg-green-50 px-2 py-1 rounded w-fit mb-3">
                        Pillar {idx + 1}
                      </div>
                      <h4 className="font-bold text-gray-900 text-base">{item.title}</h4>
                      <p className="text-gray-500 font-light text-xs mt-1.5 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. COMMITTEES */}
            {activeSubTab === 'committees' && (
              <div className="space-y-8">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                  Institute Working Committees
                </h2>
                <p className="text-gray-500 font-light text-sm sm:text-base leading-relaxed max-w-3xl">
                  The Institute carries out much of its work through expert committees appointed by the Board of Directors or elected by the general membership.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 space-y-3">
                    <div className="font-mono text-xs font-bold text-[#138F34] uppercase tracking-wider">Standing Committee</div>
                    <h3 className="text-lg font-bold text-gray-900">Education and Membership Committee</h3>
                    <p className="text-gray-500 font-light text-xs sm:text-sm leading-relaxed">
                      The Education and Membership Committee reviews membership applications, recommends appropriate membership categories, and supports matters relating to architectural education, professional standards, training, and state registration.
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 space-y-3">
                    <div className="font-mono text-xs font-bold text-[#138F34] uppercase tracking-wider">Standing Committee</div>
                    <h3 className="text-lg font-bold text-gray-900">Practice Committee</h3>
                    <p className="text-gray-500 font-light text-xs sm:text-sm leading-relaxed">
                      The Practice Committee promotes excellence in architectural practice, ethical conduct, professional competence, and the active development of practice documents, standard client forms, conditions of engagement, and codes of conduct.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 text-center max-w-2xl mx-auto space-y-2 mt-8">
                  <h4 className="font-bold text-[#108153] text-sm">Other Special Committees</h4>
                  <p className="text-gray-500 text-xs font-light max-w-md mx-auto">
                    The Board of Directors may establish additional standing or special task forces as required to support the temporary or legislative work of the JIA.
                  </p>
                </div>
              </div>
            )}

            {/* 6. ADVOCACY */}
            {activeSubTab === 'advocacy' && (
              <div className="space-y-8">
                <div className="border-l-4 border-[#8A9444] pl-6 space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                    Advocacy & Public Role
                  </h2>
                  <p className="text-gray-500 font-light text-sm sm:text-base max-w-2xl leading-relaxed">
                    Contributing to national conversations on architecture, planning, housing, sustainability, heritage, climate resilience, and the built environment.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                  <div className="bg-white border border-gray-150 p-6 rounded-2xl space-y-2 shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
                    <div className="h-2 w-12 bg-[#8A9444] rounded" />
                    <h4 className="font-bold text-gray-900 text-base pt-2">Civic Planning</h4>
                    <p className="text-gray-500 font-light text-xs leading-relaxed">
                      Promoting the JIA's values in the formulation of state planning, zoning guidelines, and housing standards to ensure livable civic zones.
                    </p>
                  </div>

                  <div className="bg-white border border-gray-150 p-6 rounded-2xl space-y-2 shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
                    <div className="h-2 w-12 bg-[#28723D] rounded" />
                    <h4 className="font-bold text-gray-900 text-base pt-2">Climate Resilience</h4>
                    <p className="text-gray-500 font-light text-xs leading-relaxed">
                      Advocating for tropical architectural designs, energy self-sufficiency, and materials that withstand the tropical environment.
                    </p>
                  </div>

                  <div className="bg-white border border-gray-150 p-6 rounded-2xl space-y-2 shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
                    <div className="h-2 w-12 bg-[#138F34] rounded" />
                    <h4 className="font-bold text-gray-900 text-base pt-2">Legislative Advice</h4>
                    <p className="text-gray-500 font-light text-xs leading-relaxed">
                      Through its members, the JIA actively engages with government agencies, statutory bodies, and educational boards to support decision-making.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

    </div>
  );
}
