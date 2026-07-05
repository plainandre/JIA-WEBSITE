/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, ExternalLink, Calendar, ShieldCheck, ChevronRight } from 'lucide-react';
import JiaLogo from './JiaLogo';
import { PageId, AboutSubPageId } from '../types';

interface FooterProps {
  setActiveTab: (tab: PageId) => void;
  setActiveSubTab: (subTab: AboutSubPageId) => void;
}

export default function Footer({ setActiveTab, setActiveSubTab }: FooterProps) {
  const [logoHovered, setLogoHovered] = useState(false);

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
    <footer className="bg-[#1d1d1f] text-gray-400 font-sans text-xs pt-12 pb-8 border-t border-white/10" id="jia-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top explanatory text */}
        <div className="pb-8 border-b border-white/10 mb-8 space-y-3">
          <p className="leading-relaxed text-gray-500">
            1. The Jamaican Institute of Architects Limited (JIA) is incorporated as a company limited by guarantee, representing certified professionals in Jamaica. Information listed on this portal is provided for public awareness and professional guidelines. Standard practice agreements and code of conduct manuals are intellectual property of the JIA.
          </p>
          <p className="leading-relaxed text-gray-500">
            2. Members' Portal and Continuing Professional Development (CPD) modules are undergoing initial expansion. Early registration ensures active placement on our professional rosters.
          </p>
        </div>

        {/* Multi-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-10">
          
          {/* Column 1: JIA Core */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">About JIA</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => handleAboutSubClick('overview')} className="hover:text-white hover:underline text-left">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleAboutSubClick('history')} className="hover:text-white hover:underline text-left">
                  History
                </button>
              </li>
              <li>
                <button onClick={() => handleAboutSubClick('mission')} className="hover:text-white hover:underline text-left">
                  Mission & Objectives
                </button>
              </li>
              <li>
                <button onClick={() => handleAboutSubClick('what-we-do')} className="hover:text-white hover:underline text-left">
                  What We Do
                </button>
              </li>
              <li>
                <button onClick={() => handleAboutSubClick('committees')} className="hover:text-white hover:underline text-left">
                  Committees
                </button>
              </li>
              <li>
                <button onClick={() => handleAboutSubClick('advocacy')} className="hover:text-white hover:underline text-left">
                  Advocacy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Membership */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Membership</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => handlePageClick('membership')} className="hover:text-white hover:underline text-left">
                  Categories
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick('membership')} className="hover:text-white hover:underline text-left">
                  Member Benefits
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick('leadership')} className="hover:text-white hover:underline text-left">
                  Current Board
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick('portal')} className="hover:text-white hover:underline text-left flex items-center space-x-1">
                  <span>Members' Portal</span>
                  <ExternalLink className="h-2.5 w-2.5 text-[#18B345]" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Standards & Documents */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Standards</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => handlePageClick('standards')} className="hover:text-white hover:underline text-left">
                  Code of Conduct
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick('standards')} className="hover:text-white hover:underline text-left">
                  Scale of Fees
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick('standards')} className="hover:text-white hover:underline text-left">
                  Client Agreements
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick('standards')} className="hover:text-white hover:underline text-left">
                  Conditions of Engagement
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: CPD & Forums */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">Events</h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => handlePageClick('events')} className="hover:text-white hover:underline text-left">
                  CPD Seminars
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick('events')} className="hover:text-white hover:underline text-left">
                  Architects Week
                </button>
              </li>
              <li>
                <button onClick={() => handlePageClick('events')} className="hover:text-white hover:underline text-left">
                  Public Lectures
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: JIA Info & Contacts */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <div 
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
              className="flex items-center space-x-2 group cursor-pointer"
              onClick={() => handlePageClick('home')}
            >
              <JiaLogo 
                size={36} 
                showText={false} 
                color="#FFFFFF" 
                hoverColor="#18B345" 
                isHoveredExternal={logoHovered}
                bgColor="transparent"
              />
              <div>
                <h4 className="text-white font-bold text-xs group-hover:text-[#18B345] transition-colors duration-200">JIA Limited</h4>
                <p className="text-[10px] text-gray-500">Established 1967</p>
              </div>
            </div>
            <div className="space-y-2.5 pt-2 text-gray-400">
              <div className="flex items-start space-x-2">
                <MapPin className="h-3.5 w-3.5 mt-0.5 text-[#18B345] shrink-0" />
                <span>Kingston, Jamaica</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-3.5 w-3.5 text-[#18B345] shrink-0" />
                <a href="tel:876-533-9752" className="hover:text-white hover:underline">876-533-9752</a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-3.5 w-3.5 text-[#18B345] shrink-0" />
                <a href="mailto:admin@jamaicanarchitects.com" className="hover:text-white hover:underline break-all">
                  admin@jamaicanarchitects.com
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Footer bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-gray-500 text-[11px]">
          <div>
            Copyright © {new Date().getFullYear()} The Jamaican Institute of Architects Limited. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <button onClick={() => handlePageClick('contact')} className="hover:text-white hover:underline">Contact JIA</button>
            <span className="text-gray-700">|</span>
            <button onClick={() => handlePageClick('standards')} className="hover:text-white hover:underline">Privacy Policy</button>
            <span className="text-gray-700">|</span>
            <button onClick={() => handlePageClick('portal')} className="hover:text-white hover:underline">Terms of Use</button>
          </div>
          <div className="text-gray-500">
            Jamaica
          </div>
        </div>

      </div>
    </footer>
  );
}
