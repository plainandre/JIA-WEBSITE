/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import BentoGrid from './components/BentoGrid';
import AboutView from './components/AboutView';
import LeadershipView from './components/LeadershipView';
import MembershipView from './components/MembershipView';
import StandardsView from './components/StandardsView';
import EventsView from './components/EventsView';
import ContactView from './components/ContactView';
import PortalView from './components/PortalView';
import { PageId, AboutSubPageId } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageId>('home');
  const [activeSubTab, setActiveSubTab] = useState<AboutSubPageId>('overview');

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f7] selection:bg-[#18B345]/35 selection:text-black">
      
      {/* Apple-style translucent unified navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        setActiveSubTab={setActiveSubTab} 
      />

      {/* Main Page Swapper with micro-animations */}
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {activeTab === 'home' && (
              <>
                <HeroSection 
                  setActiveTab={setActiveTab} 
                  setActiveSubTab={setActiveSubTab} 
                />
                <BentoGrid 
                  setActiveTab={setActiveTab} 
                  setActiveSubTab={setActiveSubTab} 
                />
              </>
            )}

            {activeTab === 'about' && (
              <AboutView 
                activeSubTab={activeSubTab} 
                setActiveSubTab={setActiveSubTab} 
              />
            )}

            {activeTab === 'leadership' && <LeadershipView />}

            {activeTab === 'membership' && <MembershipView />}

            {activeTab === 'standards' && <StandardsView />}

            {activeTab === 'events' && <EventsView />}

            {activeTab === 'contact' && <ContactView />}

            {activeTab === 'portal' && <PortalView />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Apple-style directories and legal footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        setActiveSubTab={setActiveSubTab} 
      />
      
    </div>
  );
}
