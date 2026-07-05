/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Director {
  name: string;
  role: string;
  bio?: string;
  initials: string;
}

export interface MembershipCategory {
  id: string;
  name: string;
  description: string;
  requirements: string[];
}

export interface DocumentInfo {
  id: string;
  title: string;
  category: string;
  description: string;
  fileSize: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  category: 'cpd' | 'event' | 'architects-week';
}

export type PageId =
  | 'home'
  | 'about'
  | 'membership'
  | 'standards'
  | 'leadership'
  | 'events'
  | 'contact'
  | 'portal';

export type AboutSubPageId =
  | 'overview'
  | 'history'
  | 'mission'
  | 'what-we-do'
  | 'committees'
  | 'advocacy';
