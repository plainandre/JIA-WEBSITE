/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Download, ShieldCheck, HelpCircle, Eye, X, BookOpen, Scale, FileCheck, CheckCircle2 } from 'lucide-react';
import { DocumentInfo } from '../types';

export default function StandardsView() {
  const [selectedDoc, setSelectedDoc] = useState<DocumentInfo | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const documents: DocumentInfo[] = [
    {
      id: 'code-conduct',
      title: 'Code of Professional Conduct',
      category: 'Ethics & Integrity',
      description: 'The definitive guidelines ensuring architects act with honesty, fairness, and absolute professionalism towards clients, colleagues, and the public.',
      fileSize: '142 KB'
    },
    {
      id: 'conditions-engagement',
      title: 'Conditions of Engagement',
      category: 'Contracts & Agreements',
      description: 'Defines the legal parameters of the relationship between client and architect, including liability limits, scope variations, and terminations.',
      fileSize: '210 KB'
    },
    {
      id: 'client-agreement',
      title: 'Standard Client / Architect Agreement',
      category: 'Contracts & Agreements',
      description: 'A formal template agreement to secure professional engagements, detailing duties, payment deliverables, and copyright ownership of blueprints.',
      fileSize: '185 KB'
    },
    {
      id: 'scale-fees',
      title: 'Recommended Scale of Fees',
      category: 'Finance & Remuneration',
      description: 'Standard percentages and lump sum fee ratios recommended by the JIA Board for residential, commercial, industrial, and restoration commissions.',
      fileSize: '98 KB'
    },
  ];

  // Creates a mock downloadable file representing the official JIA document
  const triggerDownload = (doc: DocumentInfo) => {
    setDownloadingId(doc.id);
    
    setTimeout(() => {
      const content = `========================================================================
THE JAMAICAN INSTITUTE OF ARCHITECTS LIMITED (JIA)
OFFICIAL PROFESSIONAL PRACTICE DOCUMENT
========================================================================
Document: ${doc.title}
Category: ${doc.category}
Status: Certified JIA Publication
Published: June 2025 (Incorporated framework)
Document Size: ${doc.fileSize}

SUMMARY OVERVIEW:
This document represents the official practice guidelines and intellectual property of the Jamaican Institute of Architects Limited.

${doc.description}

TERMS OF PRACTICE:
1. Certified members of the JIA must adhere strictly to these conditions.
2. Unlicensed duplication or modification of these standard templates is strictly prohibited.
3. This is an official digital issue. For printed binders or legal disputes, contact: admin@jamaicanarchitects.com

------------------------------------------------------------------------
Copyright (c) ${new Date().getFullYear()} The Jamaican Institute of Architects Limited.
Kingston, Jamaica.
876-533-9752
========================================================================`;

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `JIA_${doc.id.replace('-', '_')}_official.txt`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloadingId(null);
    }, 1000);
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      
      {/* Standards Header */}
      <section className="bg-[#f5f5f7] border-b border-gray-200 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#138F34] bg-[#138F34]/5 px-3.5 py-1.5 rounded-full">
            Practice Guidelines
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mt-4 mb-3">
            Professional Standards
          </h1>
          <p className="text-sm sm:text-lg text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            Standardizing the legal, ethical, and commercial landscapes of architectural practice in Jamaica.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        
        {/* Intro panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center space-x-2 text-[#138F34]">
              <ShieldCheck className="h-6 w-6" />
              <span className="font-bold text-sm tracking-wider uppercase">Our Professional Commitment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Honesty, Fairness, & Professionalism
            </h2>
            <p className="text-gray-500 font-light text-sm sm:text-base leading-relaxed">
              The Jamaican Institute of Architects is committed to promoting high standards of professional practice, integrity, competence, and ethical conduct. Members are expected to act with honesty, fairness, and absolute professionalism in their dealings with clients, colleagues, consultants, contractors, public authorities, and the wider public.
            </p>
            <div className="border-t border-gray-150 pt-4 grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <CheckCircle2 className="h-4 w-4 text-[#138F34]" />
                <span>Regulatory Safety</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <CheckCircle2 className="h-4 w-4 text-[#138F34]" />
                <span>Intellectual Protection</span>
              </div>
            </div>
          </div>
          
          {/* Card detailing the Board oversight */}
          <div className="lg:col-span-5 bg-gray-50 border border-gray-150 rounded-3xl p-8 space-y-4">
            <div className="p-3 bg-white border border-gray-100 rounded-xl w-fit text-[#138F34]">
              <Scale className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Practice Committee Oversight</h3>
            <p className="text-gray-500 font-light text-xs sm:text-sm leading-relaxed">
              Standard agreements are reviewed annually by our standing Practice Committee. These blueprints safeguard the architect's copyright and clarify remuneration benchmarks to avoid client disputes.
            </p>
          </div>
        </div>

        {/* Practice Documents Section */}
        <div className="border-t border-gray-200 pt-12">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              Practice Binders & Templates
            </h2>
            <p className="text-gray-500 font-light mt-2 text-sm">
              Approved standard contracts and scale guides available for local practitioner download.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-gray-150 p-6 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-md transition-shadow relative"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-[#138F34] bg-[#138F34]/5 px-2.5 py-1 rounded-full uppercase">
                      {doc.category}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">{doc.fileSize}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{doc.title}</h3>
                  <p className="text-gray-500 font-light text-xs sm:text-sm leading-relaxed">
                    {doc.description}
                  </p>
                </div>

                <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => triggerDownload(doc)}
                    disabled={downloadingId === doc.id}
                    className="flex-1 bg-black text-white hover:bg-black/90 disabled:bg-gray-400 rounded-xl py-2.5 px-4 text-xs font-semibold flex items-center justify-center space-x-2 transition-all"
                  >
                    <Download className={`h-3.5 w-3.5 ${downloadingId === doc.id ? 'animate-bounce' : ''}`} />
                    <span>{downloadingId === doc.id ? 'Compiling File...' : 'Download Template'}</span>
                  </button>
                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="border border-gray-200 hover:bg-gray-50 p-2.5 rounded-xl text-gray-500 hover:text-gray-900 transition-colors"
                    title="Quick Preview"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* Preview Dialog (Apple Overlay Style) */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl relative border border-gray-100 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedDoc(null)}
                className="absolute right-5 top-5 p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-all"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-[#138F34] bg-green-50 px-2.5 py-1 rounded uppercase">
                    In-Browser Preview
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-2">{selectedDoc.title}</h3>
                  <p className="text-gray-400 text-xs font-light font-mono mt-1">Official Publication - {selectedDoc.fileSize}</p>
                </div>

                {/* Simulated doc parchment paper */}
                <div className="bg-amber-50/40 border border-amber-100 rounded-xl p-5 sm:p-6 text-gray-700 font-mono text-[11px] leading-relaxed select-none space-y-4">
                  <div className="text-center border-b border-amber-200 pb-4">
                    <p className="font-bold text-gray-900">THE JAMAICAN INSTITUTE OF ARCHITECTS LIMITED</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Kingston, Jamaica | Inc. 2025</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-gray-900 uppercase">Section I: Intent & Scope</p>
                    <p className="text-gray-500">
                      Pursuant to Article 4 of the JIA Incorporation acts, this document binds and advises the contract deliverables and scale of professional engagements within the Jamaican judicial system...
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-gray-900 uppercase">Section II: Deliverables</p>
                    <ul className="list-disc pl-4 text-gray-500 space-y-1">
                      <li>Phase 1: Feasibility Study & Conceptual Blueprints</li>
                      <li>Phase 2: Schematic Designs & Planning Approvals</li>
                      <li>Phase 3: Working Drawings & Bill of Quantity coordination</li>
                    </ul>
                  </div>
                  <p className="text-[9px] text-gray-400 italic text-center pt-4 border-t border-amber-200">
                    -- End of Preview Page -- Complete binder is generated upon download.
                  </p>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setSelectedDoc(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
                  >
                    Close Preview
                  </button>
                  <button
                    onClick={() => {
                      triggerDownload(selectedDoc);
                      setSelectedDoc(null);
                    }}
                    className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#138F34] hover:bg-[#18B345] text-white flex items-center space-x-2 transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download File</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
