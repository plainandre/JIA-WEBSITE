/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, X, ChevronDown, User, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import JiaLogo from './JiaLogo';
import { PageId, AboutSubPageId } from '../types';

interface NavbarProps {
  activeTab: PageId;
  setActiveTab: (tab: PageId) => void;
  setActiveSubTab: (subTab: AboutSubPageId) => void;
}

export default function Navbar({ activeTab, setActiveTab, setActiveSubTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);

  const navItems: { id: PageId; label: string; hasDropdown?: boolean }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About JIA', hasDropdown: true },
    { id: 'leadership', label: 'Leadership' },
    { id: 'membership', label: 'Membership' },
    { id: 'standards', label: 'Standards' },
    { id: 'events', label: 'CPD & Events' },
    { id: 'contact', label: 'Contact' },
  ];

  const aboutDropdownItems: { id: AboutSubPageId; label: string; desc: string }[] = [
    { id: 'overview', label: 'Overview', desc: 'The national professional body representing Jamaican architects' },
    { id: 'history', label: 'History', desc: 'Our legacy since 1967 and the 2025 incorporation' },
    { id: 'mission', label: 'Mission & Objectives', desc: 'Core goals, advocacy, and educational standards' },
    { id: 'what-we-do', label: 'What We Do', desc: 'Seminars, public exhibitions, outreach, and advocacy' },
    { id: 'committees', label: 'Committees', desc: 'Education, Membership, Practice, and Special boards' },
    { id: 'advocacy', label: 'Advocacy & Public Role', desc: 'National planning, heritage, climate resilience' },
  ];

  const [logoHovered, setLogoHovered] = useState(false);

  const handleTabClick = (tabId: PageId) => {
    setActiveTab(tabId);
    setIsOpen(false);
    setShowAboutDropdown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAboutSubClick = (subId: AboutSubPageId) => {
    setActiveTab('about');
    setActiveSubTab(subId);
    setIsOpen(false);
    setShowAboutDropdown(false);
    
    // Smooth scroll to content
    const element = document.getElementById('about-subpage-content');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black/85 backdrop-blur-md border-b border-white/10 text-white/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => handleTabClick('home')} 
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            className="flex cursor-pointer items-center space-x-2.5 group transition-opacity duration-200"
            id="navbar-logo-container"
          >
            <JiaLogo 
              size={32} 
              showText={false} 
              color="#FFFFFF" 
              hoverColor="#18B345" 
              isHoveredExternal={logoHovered}
              bgColor="transparent"
            />
            <span className="font-sans text-sm font-semibold tracking-wider text-white group-hover:text-[#18B345] transition-colors duration-200 hidden sm:block">
              JIA
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => item.hasDropdown && setShowAboutDropdown(true)}
                onMouseLeave={() => item.hasDropdown && setShowAboutDropdown(false)}
              >
                <button
                  onClick={() => !item.hasDropdown && handleTabClick(item.id)}
                  id={`nav-item-${item.id}`}
                  className={`flex items-center space-x-1 py-3 text-[13px] font-normal tracking-wide transition-colors ${
                    activeTab === item.id
                      ? 'text-[#18B345] font-medium'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown className="h-3 w-3 opacity-60 transition-transform group-hover:rotate-180" />
                  )}
                </button>

                {/* Dropdown Menu for About */}
                {item.hasDropdown && (
                  <AnimatePresence>
                    {showAboutDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full w-80 rounded-2xl bg-black/95 p-4 shadow-2xl border border-white/15 backdrop-blur-xl"
                      >
                        <div className="grid gap-1">
                          {aboutDropdownItems.map((subItem) => (
                            <button
                              key={subItem.id}
                              onClick={() => handleAboutSubClick(subItem.id)}
                              className="group flex flex-col items-start rounded-lg p-2.5 hover:bg-white/5 transition-all text-left"
                            >
                              <span className="text-xs font-semibold text-white group-hover:text-[#18B345] transition-colors">
                                {subItem.label}
                              </span>
                              <span className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">
                                {subItem.desc}
                              </span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Members' Portal CTA */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => handleTabClick('portal')}
              id="members-portal-cta-button"
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                activeTab === 'portal'
                  ? 'bg-white text-black border border-white'
                  : 'bg-[#138F34] hover:bg-[#18B345] text-white border border-[#138F34] shadow-sm hover:shadow-md'
              }`}
            >
              <User className="h-3.5 w-3.5" />
              <span>Members' Portal</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={() => handleTabClick('portal')}
              className={`p-1.5 rounded-full transition-all ${
                activeTab === 'portal' ? 'text-[#18B345]' : 'text-gray-300 hover:text-white'
              }`}
              title="Members' Portal"
            >
              <User className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-trigger"
              className="p-1 text-gray-300 hover:text-white transition-colors"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden w-full overflow-hidden bg-black border-t border-white/10"
          >
            <div className="px-6 py-6 space-y-6 max-h-[calc(100vh-3rem)] overflow-y-auto">
              {navItems.map((item, index) => (
                <div key={item.id} className="space-y-2">
                  {item.hasDropdown ? (
                    <>
                      <div className="text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                        {item.label}
                      </div>
                      <div className="pl-3 grid gap-3 border-l border-white/10">
                        {aboutDropdownItems.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => handleAboutSubClick(subItem.id)}
                            className="block text-left text-sm text-gray-300 hover:text-white transition-colors py-1"
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <button
                      onClick={() => handleTabClick(item.id)}
                      className={`block w-full text-left text-lg font-medium transition-colors py-1 ${
                        activeTab === item.id ? 'text-[#18B345]' : 'text-gray-200 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => handleTabClick('portal')}
                  className="flex w-full items-center justify-center space-x-2 bg-[#138F34] text-white rounded-xl py-3 text-sm font-medium hover:bg-[#18B345] transition-all"
                >
                  <User className="h-4 w-4" />
                  <span>Access Members' Portal</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
