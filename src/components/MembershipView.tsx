/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShieldCheck, Award, Zap, BookOpen, Users, Bookmark, FileText } from 'lucide-react';
import { MembershipCategory } from '../types';

export default function MembershipView() {
  const [activeCategory, setActiveCategory] = useState<string>('full');

  const benefits = [
    { title: 'Professional Development', desc: 'Continuing education, state workshops, and accredited seminars.', icon: BookOpen },
    { title: 'Annual Platforms', desc: 'Active inclusion in flagship JIA events, exhibits, and Architects Week.', icon: Award },
    { title: 'Committee Placements', desc: 'Right to engage with practice committees and code reform boards.', icon: Users },
    { title: 'Standard Resources', desc: 'Immediate access to JIA client contracts, agreements, and practice forms.', icon: FileText },
    { title: 'Professional Network', desc: 'Connect directly with certified practitioners, contractors, and allied firms.', icon: Zap },
    { title: 'Public Advocacy', desc: 'Empower national campaigns promoting sustainable building and architectural heritage.', icon: ShieldCheck },
  ];

  const categories: MembershipCategory[] = [
    {
      id: 'full',
      name: 'Full / Architect Member',
      description: 'Open to registered architects in Jamaica who are in good standing with the Architects Registration Board of Jamaica and who satisfy the Institute’s membership requirements.',
      requirements: [
        'Registration with the Architects Registration Board of Jamaica (ARB)',
        'Submission of professional experience logs',
        'Sponsorship by two active JIA members',
        'Commitment to continuous professional development'
      ]
    },
    {
      id: 'fellow',
      name: 'Fellow',
      description: 'A distinction granted to JIA Architect Members who have shown exceptional service and distinction in architecture, education, research, professional practice, public service, or service to society.',
      requirements: [
        'Active Full Architect membership for over 10 consecutive years',
        'Nomination by the Board of Directors or a Fellow Committee',
        'Evidentiary portfolio of significant contribution to Jamaica’s built environment',
        'Active leadership or mentoring in the JIA'
      ]
    },
    {
      id: 'retired',
      name: 'Retired Member',
      description: 'Open to long-standing Architect Members who have retired from architectural practice, related professional activity, or teaching.',
      requirements: [
        'Prior Full Architect membership in good standing',
        'Formal retirement from active professional practice',
        'Application and endorsement by the Board of Directors'
      ]
    },
    {
      id: 'honorary',
      name: 'Honorary Member',
      description: 'Granted to persons who have rendered significant and valuable service to the profession and who have upheld the aims of the Institute.',
      requirements: [
        'Board of Directors selection and invitation only',
        'Distinguished record of support to architecture or the arts',
        'Non-architects are eligible based on civic contribution'
      ]
    },
    {
      id: 'licentiate',
      name: 'Licentiate Member',
      description: 'Open to persons registered by the Architects Registration Board to practise architecture in Jamaica under special, temporary, or other applicable registration provisions.',
      requirements: [
        'Valid temporary or special ARB registration',
        'Direct practice under reciprocal or state agreement'
      ]
    },
    {
      id: 'associate',
      name: 'Associate Member',
      description: 'Open to persons with architectural qualifications, architecture faculty members, or persons registered or licensed to practise architecture outside Jamaica or the Caribbean, who do not otherwise qualify for full membership.',
      requirements: [
        'Accredited architectural degree or faculty standing',
        'Licensed registration in a foreign jurisdiction'
      ]
    },
    {
      id: 'intermediate',
      name: 'Intermediate Member',
      description: 'Open to persons with architectural education or experience who are engaged in architectural practice, the design industry, or the building industry, but who are not eligible for another class of membership.',
      requirements: [
        'Architectural school degree or ongoing studies',
        'Active employment in a licensed design or construction firm'
      ]
    },
    {
      id: 'affiliate',
      name: 'Affiliate Member / Institute',
      description: 'Open to individuals, companies, or institutions whose professions or businesses are related to architecture, including allied professionals, consultants, contractors, suppliers, and industry partners.',
      requirements: [
        'Business registration within the building or planning services',
        'Allied profession credentials (structural, mechanical engineering, etc.)'
      ]
    },
    {
      id: 'student',
      name: 'Student Member',
      description: 'Open to students enrolled in recognised schools of architecture in Jamaica or reputable architectural schools outside Jamaica.',
      requirements: [
        'Active enrollment in an accredited architecture program (e.g., UTech)',
        'Copy of current registrar letters or student ID card'
      ]
    },
    {
      id: 'practice',
      name: 'JIA Practice',
      description: 'Open to architectural practices whose core business includes architecture and whose architectural work is carried out under the responsibility of a Full / Architect Member of the Institute.',
      requirements: [
        'Fully registered business corporation in Jamaica',
        'Practice supervised by a certified Full Member architect in good standing',
        'Compliance with the Professional Standards manual'
      ]
    },
  ];

  const selectedCategory = categories.find((cat) => cat.id === activeCategory) || categories[0];

  return (
    <div className="bg-white min-h-screen pb-24">
      
      {/* Page Title */}
      <section className="bg-[#f5f5f7] border-b border-gray-200 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#138F34] bg-[#138F34]/5 px-3.5 py-1.5 rounded-full">
            Join the Guild
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mt-4 mb-3">
            Membership in JIA
          </h1>
          <p className="text-sm sm:text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            Unifying Jamaican architects at every stage of their professional journey, from university classrooms to distinguished senior fellowships.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
            Professional Member Benefits
          </h2>
          <p className="text-gray-500 font-light mt-2 text-sm">
            Opportunities built directly to help you thrive in the architectural landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="bg-gray-50 border border-gray-100 p-6 rounded-2xl flex items-start space-x-4 shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
              >
                <div className="p-3 bg-[#138F34]/10 rounded-xl text-[#138F34] shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">{benefit.title}</h3>
                  <p className="text-gray-500 font-light text-xs sm:text-sm mt-1.5 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Categories Interactive Hub */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="border-t border-gray-200 pt-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              Registration Classes
            </h2>
            <p className="text-gray-500 font-light mt-2 text-sm">
              Select an option below to explore qualifications, eligibility, and core prerequisites.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Button Selector Column */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-left shrink-0 lg:shrink-1 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                    activeCategory === cat.id
                      ? 'bg-[#138F34] text-white border-[#138F34] shadow-md'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Right Information Display Column */}
            <div className="lg:col-span-8 bg-gray-50 rounded-3xl p-6 sm:p-10 border border-gray-150 min-h-[380px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-[#138F34] uppercase bg-[#138F34]/5 px-2.5 py-1 rounded">
                      Registration Details
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-3">
                      {selectedCategory.name}
                    </h3>
                    <p className="text-gray-500 font-light text-xs sm:text-sm leading-relaxed mt-3">
                      {selectedCategory.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 text-xs sm:text-sm mb-3">Core Prerequisites & Qualifications:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedCategory.requirements.map((req, index) => (
                        <div key={index} className="flex items-start space-x-2 text-xs text-gray-600 bg-white border border-gray-100 rounded-lg p-2.5">
                          <Check className="h-3.5 w-3.5 text-[#138F34] shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* simulated actions */}
              <div className="border-t border-gray-200/60 pt-6 mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <Bookmark className="h-4 w-4 text-[#138F34]" />
                  <span>Requires formal review by Education & Membership Committee</span>
                </div>
                <button
                  onClick={() => {
                    const el = document.getElementById('contact-view-form') || window;
                    if (el !== window) {
                      const trigger = document.getElementById('nav-item-contact');
                      if (trigger) trigger.click();
                    } else {
                      alert('Please visit our Contact page to request the formal application package.');
                    }
                  }}
                  className="bg-black hover:bg-black/90 text-white rounded-xl px-4 py-2 text-xs font-semibold self-start sm:self-auto transition-colors"
                >
                  Request Application Pack
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
