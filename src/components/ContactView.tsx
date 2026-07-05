/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Shield, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Inquiry details are required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'general',
        message: ''
      });
    }, 1200);
  };

  return (
    <div className="bg-[#f5f5f7] min-h-screen pb-24">
      
      {/* Page Header */}
      <section className="bg-black text-white py-16 sm:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#18B345] bg-[#18B345]/10 px-3 py-1 rounded-full">
            Connect
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-4 mb-3">
            Contact JIA
          </h1>
          <p className="text-sm sm:text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Have questions about registrations, CPD credits, or standard guidelines? Reach out directly to our Administrative Officers.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Cards detailing physical and email contacts */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 border-b border-gray-200 pb-3">
              Administrative Office
            </h2>
            <p className="text-gray-500 font-light text-xs sm:text-sm leading-relaxed">
              For membership inquiries, professional resources, events, CPD, partnerships, sponsorships, or general information, please contact the Jamaican Institute of Architects.
            </p>

            <div className="space-y-4 pt-2">
              {/* Card Phone */}
              <div className="bg-white border border-gray-150 p-5 rounded-2xl flex items-start space-x-4">
                <div className="p-2.5 bg-green-50 text-[#138F34] rounded-xl">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm">Administrative Phone</h3>
                  <a href="tel:876-533-9752" className="text-[#138F34] text-sm font-medium hover:underline block mt-1">
                    876-533-9752
                  </a>
                  <span className="text-[10px] text-gray-400 mt-0.5 block font-light">Monday to Friday, 9:00 AM - 4:00 PM</span>
                </div>
              </div>

              {/* Card Email */}
              <div className="bg-white border border-gray-150 p-5 rounded-2xl flex items-start space-x-4">
                <div className="p-2.5 bg-green-50 text-[#138F34] rounded-xl">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm">Registry Email</h3>
                  <a href="mailto:admin@jamaicanarchitects.com" className="text-[#138F34] text-sm font-medium hover:underline block mt-1 break-all">
                    admin@jamaicanarchitects.com
                  </a>
                  <span className="text-[10px] text-gray-400 mt-0.5 block font-light">Direct response within 24 business hours</span>
                </div>
              </div>

              {/* Card Location */}
              <div className="bg-white border border-gray-150 p-5 rounded-2xl flex items-start space-x-4">
                <div className="p-2.5 bg-green-50 text-[#138F34] rounded-xl">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm">Secretariat Headquarters</h3>
                  <p className="text-gray-600 text-xs sm:text-sm mt-1 font-light leading-relaxed">
                    The Jamaican Institute of Architects Limited,<br />
                    Kingston, Jamaica
                  </p>
                </div>
              </div>
            </div>

            {/* Verification card */}
            <div className="bg-white/80 border border-gray-150 p-5 rounded-2xl flex items-start space-x-3 text-gray-400">
              <Shield className="h-5 w-5 text-[#138F34] shrink-0" />
              <span className="text-[10px] sm:text-xs font-light leading-normal">
                This channel connects directly to the Secretariat of the JIA Board. Standard practice agreements and certificate application templates are processed exclusively through our digital registry.
              </span>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-8 bg-white border border-gray-150 rounded-3xl p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.015)]" id="contact-view-form">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">Electronic Inquiry Desk</h2>
                    <p className="text-gray-400 text-xs mt-0.5 font-light">Fill out your credential details and submit to our Administrative Officers.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-700">First Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className={`w-full bg-gray-50 border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:bg-white focus:ring-1 ${
                          errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[#138F34]'
                        }`}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-[10px] flex items-center space-x-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>{errors.firstName}</span>
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-700">Last Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className={`w-full bg-gray-50 border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:bg-white focus:ring-1 ${
                          errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[#138F34]'
                        }`}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-[10px] flex items-center space-x-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>{errors.lastName}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-700">Email Address <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full bg-gray-50 border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:bg-white focus:ring-1 ${
                          errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[#138F34]'
                        }`}
                        placeholder="john.doe@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-[10px] flex items-center space-x-1">
                          <AlertCircle className="h-3 w-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-700">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#138F34]"
                        placeholder="876-123-4567"
                      />
                    </div>
                  </div>

                  {/* Subject selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Subject of Inquiry</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#138F34]"
                    >
                      <option value="general">General Inquiries</option>
                      <option value="membership">Membership Application Package</option>
                      <option value="cpd">CPD Seminars & Architects Week RSVP</option>
                      <option value="standards">Practice Standards Binders & Fee Scale</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Inquiry & Comments <span className="text-red-500">*</span></label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full bg-gray-50 border rounded-xl px-4 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:bg-white focus:ring-1 ${
                        errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[#138F34]'
                      }`}
                      placeholder="Detail your inquiry here..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-[10px] flex items-center space-x-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#138F34] hover:bg-[#18B345] disabled:bg-gray-400 text-white rounded-xl py-3 text-xs sm:text-sm font-semibold transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                  >
                    <Send className="h-4 w-4" />
                    <span>{isSubmitting ? 'Sending Request...' : 'Transmit Inquiry'}</span>
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 space-y-5"
                >
                  <div className="flex justify-center">
                    <div className="p-4 bg-green-50 rounded-full text-[#138F34] shadow-inner animate-pulse">
                      <CheckCircle2 className="h-12 w-12" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">Inquiry Transmitted</h3>
                    <p className="text-gray-500 font-light text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                      Thank you! Your inquiries have been securely dispatched to the JIA Electronic Registry. Our administrative staff will review your credential details and reply within 24 business hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="border border-gray-200 hover:bg-gray-50 px-5 py-2 rounded-xl text-xs font-semibold text-gray-500 transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </main>

    </div>
  );
}
