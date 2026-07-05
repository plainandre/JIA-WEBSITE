/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Award, MapPin, Users, BookOpen, Clock, Filter, CheckCircle } from 'lucide-react';
import { UpcomingEvent } from '../types';

export default function EventsView() {
  const [filter, setFilter] = useState<'all' | 'cpd' | 'event' | 'architects-week'>('all');
  const [rsvpedId, setRsvpedId] = useState<string | null>(null);

  const events: UpcomingEvent[] = [
    {
      id: 'evt-1',
      title: 'CPD: Tropical Climate Adaptation & Resilient Design',
      date: 'July 18, 2026',
      location: 'Knutsford Court, Kingston & Zoom',
      description: 'An intensive technical seminar explaining structural calculations, water harvesting, and heat reduction methods for Caribbean urban blocks. Accredited for 2 JIA CPD credits.',
      category: 'cpd'
    },
    {
      id: 'evt-2',
      title: 'Architects Week: Annual Public Gallery & Exhibition',
      date: 'October 12 - 18, 2026',
      location: 'Jamaica National Gallery, Kingston',
      description: 'Our flagship annual exhibition showcasing the finest recent civic, residential, and environmental building designs in Jamaica. Free entry to the general public.',
      category: 'architects-week'
    },
    {
      id: 'evt-3',
      title: 'Public Lecture: The Heritage and Restoration of Spanish Town',
      date: 'August 24, 2026',
      location: 'University of Technology (UTech) Auditorium',
      description: 'Co-hosted with the Heritage Trust, this public forum focuses on structural preservation, seismic stabilization, and material matches for historical brick networks.',
      category: 'event'
    },
    {
      id: 'evt-4',
      title: 'CPD: National Building Code & Fire Safety Compliance',
      date: 'September 05, 2026',
      location: 'Virtual Workshop via JIA Portal',
      description: 'A legislative walkthrough of local fire egress regulations, building occupancy load ratios, and mechanical safety filings. Accredited for 1.5 JIA CPD credits.',
      category: 'cpd'
    },
    {
      id: 'evt-5',
      title: 'Architects Week: Student Design Showcase & Mentorship Forum',
      date: 'October 15, 2026',
      location: 'UTech Caribbean School of Architecture (CSA)',
      description: 'Providing student members the platform to present their graduate theses to senior fellows and active board directors for internship placement.',
      category: 'architects-week'
    }
  ];

  const filteredEvents = filter === 'all' ? events : events.filter(e => e.category === filter);

  const handleRsvp = (id: string) => {
    setRsvpedId(id);
    setTimeout(() => {
      setRsvpedId(null);
      alert('Thank you! Your RSVP has been registered. Detailed entry credentials and Zoom links have been dispatched.');
    }, 800);
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      
      {/* CPD Header */}
      <section className="bg-[#f5f5f7] border-b border-gray-200 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#138F34] bg-[#138F34]/5 px-3.5 py-1.5 rounded-full">
            Continuous Education
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mt-4 mb-3">
            CPD & Annual Events
          </h1>
          <p className="text-sm sm:text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            Acquiring modern skills, celebrating local designs, and fostering student integration in Jamaica's planning culture.
          </p>
        </div>
      </section>

      {/* Main Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        
        {/* Intro Grid cards representing CPD vs Architects Week */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-[#108153] to-[#16683A] text-white rounded-3xl p-8 sm:p-10 shadow-md flex flex-col justify-between">
            <div className="space-y-4">
              <div className="p-3 bg-white/10 rounded-xl w-fit">
                <BookOpen className="h-6 w-6 text-[#54E97A]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold leading-tight">Continuing Professional Development (CPD)</h3>
              <p className="text-white/80 font-light text-xs sm:text-sm leading-relaxed">
                The Jamaican Institute of Architects supports continuing professional development through seminars, workshops, lectures, training sessions, and public events. These programmes help architects and allied professionals remain informed on issues affecting professional practice, construction, planning, sustainability, heritage, technology, regulation, and the wider built environment.
              </p>
            </div>
            <div className="mt-8 border-t border-white/10 pt-4 flex items-center space-x-2 text-xs text-[#54E97A] font-semibold">
              <CheckCircle className="h-4 w-4" />
              <span>Mandatory for Annual License Reregistration</span>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-150 rounded-3xl p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="p-3 bg-white border border-gray-100 rounded-xl w-fit text-[#138F34] shadow-sm">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">Architects Week</h3>
              <p className="text-gray-500 font-light text-xs sm:text-sm leading-relaxed">
                Architects Week is one of the Institute's key annual events, providing a platform for public engagement, professional discussion, exhibitions, lectures, networking, student involvement, and celebration of architecture in Jamaica.
              </p>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-4 text-xs text-gray-400 font-medium">
              Scheduled Every October • Open To The Public
            </div>
          </div>
        </div>

        {/* Schedule & Filters */}
        <div className="border-t border-gray-200 pt-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Calendar of Forums</h2>
              <p className="text-gray-500 font-light text-xs sm:text-sm mt-0.5">Explore scheduled seminars and galleries for active reregistration.</p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 items-center">
              <Filter className="h-4 w-4 text-gray-400 mr-1 hidden sm:block" />
              {[
                { id: 'all', label: 'All Events' },
                { id: 'cpd', label: 'CPD Seminars' },
                { id: 'event', label: 'Public Forums' },
                { id: 'architects-week', label: 'Architects Week' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setFilter(btn.id as any)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                    filter === btn.id
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Events Listings */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((evt) => (
                <motion.div
                  key={evt.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-white border border-gray-150 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                        evt.category === 'cpd'
                          ? 'bg-[#138F34]/5 text-[#138F34]'
                          : evt.category === 'architects-week'
                          ? 'bg-[#8A9444]/5 text-[#8A9444]'
                          : 'bg-blue-50 text-blue-600'
                      }`}>
                        {evt.category === 'cpd' ? 'CPD Seminar' : evt.category === 'architects-week' ? 'Architects Week' : 'Public Event'}
                      </span>
                      <span className="text-gray-400 text-xs font-light">•</span>
                      <span className="text-gray-500 font-mono text-xs flex items-center space-x-1">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>{evt.date}</span>
                      </span>
                    </div>

                    <h3 className="font-extrabold text-gray-900 text-lg sm:text-xl tracking-tight leading-snug">
                      {evt.title}
                    </h3>
                    
                    <p className="text-gray-500 font-light text-xs sm:text-sm leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="flex items-center text-gray-400 text-xs space-x-1.5 pt-1.5">
                      <MapPin className="h-3.5 w-3.5 text-[#138F34]" />
                      <span className="font-light">{evt.location}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRsvp(evt.id)}
                    disabled={rsvpedId === evt.id}
                    className="md:shrink-0 bg-black hover:bg-black/90 disabled:bg-gray-400 text-white rounded-xl py-2.5 px-6 text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <span>{rsvpedId === evt.id ? 'Booking RSVP...' : 'RSVP Entrance'}</span>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </main>

    </div>
  );
}
