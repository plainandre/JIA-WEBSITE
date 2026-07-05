/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Mail, Linkedin, Briefcase } from 'lucide-react';
import { Director } from '../types';

export default function LeadershipView() {
  const board: Director[] = [
    { name: 'David Cuthbert', role: 'President', initials: 'DC' },
    { name: 'Sana Lawson', role: 'Vice President', initials: 'SL' },
    { name: 'Monique Rose Mullings', role: 'Honorary Secretary', initials: 'MM' },
    { name: 'Dewayne Webb', role: 'Honorary Treasurer', initials: 'DW' },
    { name: 'Matthew McFarlane', role: 'Director', initials: 'MM' },
    { name: 'Owayne Hamilton', role: 'Director', initials: 'OH' },
    { name: 'Stacey Ann Dennison Heron', role: 'Director', initials: 'SH' },
    { name: 'Camille Douglas Stephenson', role: 'Director', initials: 'CS' },
    { name: 'Garfield Wood', role: 'Ex Officio Director', initials: 'GW' },
    { name: 'Martin Lyn', role: 'Director / Company Secretary', initials: 'ML' },
  ];

  // Helper to assign specific JIA brand colors dynamically for visual diversity in initials avas
  const getAvatarBg = (idx: number) => {
    const bgColors = [
      'bg-jia-jewel text-white',
      'bg-jia-chateau text-white',
      'bg-jia-killarney text-white',
      'bg-jia-salem text-white',
      'bg-jia-darkgreen text-white',
      'bg-jia-olive text-white',
    ];
    return bgColors[idx % bgColors.length];
  };

  return (
    <div className="bg-[#f5f5f7] min-h-screen pb-20">
      
      {/* Leadership Header Banner */}
      <section className="bg-black text-white py-16 sm:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#18B345] bg-[#18B345]/10 px-3 py-1 rounded-full">
            Elected Officers
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-4 mb-3">
            Board of Directors
          </h1>
          <p className="text-sm sm:text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            The Jamaican Institute of Architects is governed by a Board of Directors elected from among its distinguished professional membership.
          </p>
        </div>
      </section>

      {/* Directors Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        
        {/* Executive Committee Section */}
        <div className="mb-10">
          <div className="flex items-center space-x-2 border-b border-gray-200 pb-3 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
              The Current Board
            </h2>
            <span className="bg-gray-200 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
              Term 2025 - 2026
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {board.map((director, idx) => (
              <motion.div
                key={director.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white rounded-3xl p-6 border border-gray-150 shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-lg transition-all flex flex-col items-center text-center group"
              >
                {/* Visual Avatar with JIA green combinations */}
                <div className={`h-20 w-20 rounded-full flex items-center justify-center text-xl font-bold font-sans shadow-md group-hover:scale-105 transition-transform ${getAvatarBg(idx)}`}>
                  {director.initials}
                </div>

                <h3 className="font-bold text-gray-900 text-lg mt-5 leading-tight">
                  {director.name}
                </h3>
                <p className="text-[#138F34] font-medium text-xs mt-1 bg-[#138F34]/5 px-2.5 py-0.5 rounded-full">
                  {director.role}
                </p>

                <p className="text-gray-400 text-xs font-light mt-4 leading-relaxed">
                  Registered Professional Architect, practicing under the guidelines of the Architects Registration Board of Jamaica.
                </p>

                {/* Simulated profiles contact triggers */}
                <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-gray-100 w-full justify-center text-gray-300">
                  <button className="hover:text-gray-600 transition-colors" title="Contact Director">
                    <Mail className="h-4 w-4" />
                  </button>
                  <span className="text-gray-200">|</span>
                  <button className="hover:text-gray-600 transition-colors" title="View Portfolio">
                    <Briefcase className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Notice Section */}
        <div className="bg-white rounded-2xl border border-gray-150 p-6 sm:p-8 max-w-4xl mx-auto mt-16 flex flex-col sm:flex-row items-center gap-6">
          <div className="p-4 bg-gray-50 rounded-full text-gray-500 shrink-0">
            <ShieldCheck className="h-8 w-8 text-[#138F34]" />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-gray-900 text-base">Roster Information & Photos</h4>
            <p className="text-gray-500 font-light text-xs sm:text-sm leading-relaxed">
              We update this directory regularly to match official board resolutions. Full biography details, certified credentials, and high-resolution professional board photographs will be published upon final receipt from the Executive Secretary.
            </p>
          </div>
        </div>

      </main>

    </div>
  );
}
