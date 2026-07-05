/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, Sparkles, Code, Mail, Lock, CheckCircle, 
  GraduationCap, Laptop, Compass, Newspaper, ArrowRight,
  FolderOpen, FileCode, Download, Search, Filter, Upload, 
  Eye, EyeOff, Layers, Settings2, ArrowLeft, Check, 
  Maximize2, Minimize2, Plus, RefreshCw, Copy
} from 'lucide-react';

// Define CAD item interface
interface CADItem {
  id: string;
  code: string;
  title: string;
  category: string;
  region: string;
  scale: string;
  dwgSize: string;
  desc: string;
  specs: string[];
  dwgText: string;
  renderSvg: (colors: CADColors, showLayers: CADLayers) => React.ReactNode;
}

interface CADColors {
  bg: string;
  grid: string;
  structure: string;
  rebar: string;
  annotations: string;
  dimensions: string;
  hatch: string;
}

interface CADLayers {
  grid: boolean;
  structure: boolean;
  reinforcement: boolean;
  annotations: boolean;
  dimensions: boolean;
  hatching: boolean;
}

export default function PortalView() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [waitlist, setWaitlist] = useState<string[]>([]);
  const [registered, setRegistered] = useState(false);
  
  // App navigation state: null for home, 'cad-library' for CAD workspace
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  // CAD Explorer states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedItemId, setSelectedItemId] = useState<string>('jia-c-01');
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [copiedSpecIndex, setCopiedSpecIndex] = useState<number | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  
  // Custom uploaded files simulator
  const [customAssets, setCustomAssets] = useState<CADItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active layers configuration
  const [layers, setLayers] = useState<CADLayers>({
    grid: true,
    structure: true,
    reinforcement: true,
    annotations: true,
    dimensions: true,
    hatching: true
  });

  // Load waitlist from localStorage on boot
  useEffect(() => {
    const saved = localStorage.getItem('jia_waitlist');
    if (saved) {
      try {
        setWaitlist(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !fullName.trim()) return;

    const newList = [...waitlist, `${fullName} (${email})`];
    setWaitlist(newList);
    localStorage.setItem('jia_waitlist', JSON.stringify(newList));
    setRegistered(true);
    setEmail('');
    setFullName('');
  };

  // Preloaded Caribbean and US Standard CAD Details Library
  const preloadedCADItems: CADItem[] = [
    {
      id: 'jia-c-01',
      code: 'JIA-DET-STR-01',
      title: 'Caribbean Storm-Resistant Slab & Strip Footing',
      category: 'Structural Concrete',
      region: 'Caribbean / Tropic Wind',
      scale: '1 : 10 (Metric)',
      dwgSize: '412 KB',
      desc: 'Typical heavy-duty reinforced foundation detail for tropical coastal regions prone to category 5 hurricane wind forces and seismic activity.',
      specs: [
        'Concrete strength min. 3000 PSI at 28 days.',
        'High-yield reinforcement steel rebars compliant with ASTM A615 Grade 60.',
        'Footing minimum embedment depth: 600mm below finished grade.',
        'Integrated heavy-duty vapor barrier (6-mil polyethylene) underneath slab.'
      ],
      dwgText: 'SECTION: STRIP_FOOTING_01; COMP_STRENGTH: 3000PSI; REBAR: 4#5_CONT; TIES: #3_@_8in_OC; ANCHORS: 5/8in_HD_GALV;',
      renderSvg: (colors, showLayers) => (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          {/* Grid lines */}
          {showLayers.grid && (
            <path d="M 0 50 L 400 50 M 0 100 L 400 100 M 0 150 L 400 150 M 0 200 L 400 200 M 0 250 L 400 250 M 50 0 L 50 300 M 100 0 L 100 300 M 150 0 L 150 300 M 200 0 L 200 300 M 250 0 L 250 300 M 300 0 L 300 300 M 350 0 L 350 300" stroke={colors.grid} strokeWidth="0.5" strokeDasharray="2 4" />
          )}

          {/* Ground surface and hatching */}
          {showLayers.hatching && (
            <g stroke={colors.hatch} strokeWidth="1" opacity="0.4">
              <line x1="20" y1="210" x2="150" y2="210" />
              <line x1="20" y1="210" x2="30" y2="220" />
              <line x1="50" y1="210" x2="60" y2="220" />
              <line x1="80" y1="210" x2="90" y2="220" />
              <line x1="110" y1="210" x2="120" y2="220" />
              <line x1="250" y1="210" x2="380" y2="210" />
              <line x1="260" y1="210" x2="270" y2="220" />
              <line x1="290" y1="210" x2="300" y2="220" />
              <line x1="320" y1="210" x2="330" y2="220" />
              {/* Gravel subbase hatching */}
              <circle cx="160" cy="180" r="1.5" />
              <circle cx="180" cy="182" r="1" />
              <circle cx="200" cy="178" r="2" />
              <circle cx="220" cy="185" r="1" />
              <circle cx="240" cy="179" r="1.5" />
            </g>
          )}

          {/* Concrete Footing & Slab Structure */}
          {showLayers.structure && (
            <path d="M 150 110 L 250 110 L 250 170 L 350 170 L 350 250 L 50 250 L 50 170 L 150 170 Z" fill="none" stroke={colors.structure} strokeWidth="2.5" />
          )}

          {/* Rebars / Reinforcement (Red / Orange style) */}
          {showLayers.reinforcement && (
            <g stroke={colors.rebar} strokeWidth="2" fill="none">
              {/* Vertical hooks */}
              <path d="M 175 125 L 175 235 L 225 235 L 225 125" />
              {/* Main longitudinal continuous rebar circles (cross section dots) */}
              <circle cx="75" cy="235" r="3.5" fill={colors.rebar} />
              <circle cx="130" cy="235" r="3.5" fill={colors.rebar} />
              <circle cx="185" cy="235" r="3.5" fill={colors.rebar} />
              <circle cx="270" cy="235" r="3.5" fill={colors.rebar} />
              <circle cx="325" cy="235" r="3.5" fill={colors.rebar} />
              {/* Horizontal stirrup lines */}
              <line x1="175" y1="160" x2="225" y2="160" />
              <line x1="175" y1="200" x2="225" y2="200" />
            </g>
          )}

          {/* Dimension Lines (Yellow/Cyan CAD format) */}
          {showLayers.dimensions && (
            <g stroke={colors.dimensions} strokeWidth="1" fill={colors.dimensions} className="text-[9px] font-mono">
              {/* Depth dimension */}
              <line x1="30" y1="170" x2="30" y2="250" />
              <polygon points="30,170 28,175 32,175" />
              <polygon points="30,250 28,245 32,245" />
              <text x="12" y="215" stroke="none">600mm</text>

              {/* Slab thickness */}
              <line x1="375" y1="110" x2="375" y2="170" />
              <polygon points="375,110 373,115 377,115" />
              <polygon points="375,170 373,165 377,165" />
              <text x="345" y="145" stroke="none">150mm</text>

              {/* Footing Width */}
              <line x1="50" y1="270" x2="350" y2="270" />
              <polygon points="50,270 55,268 55,272" />
              <polygon points="350,270 345,268 345,272" />
              <text x="180" y="282" stroke="none">900mm WIDTH</text>
            </g>
          )}

          {/* Annotation labels (White/Cyan text with arrows) */}
          {showLayers.annotations && (
            <g stroke={colors.annotations} strokeWidth="1" fill={colors.annotations} className="text-[8px] font-mono" opacity="0.85">
              {/* Slab pointer */}
              <path d="M 200 110 L 220 75 L 240 75" fill="none" />
              <polygon points="200,110 203,113 201,107" />
              <text x="245" y="78" stroke="none">150mm TROPICAL SLAB</text>

              {/* Footing label */}
              <path d="M 100 250 L 115 285" fill="none" />
              <polygon points="100,250 104,253 98,252" />
              <text x="120" y="287" stroke="none">MASSIVE TIE BEAM</text>

              {/* G60 Rebar label */}
              <path d="M 185 235 L 150 190 L 110 190" fill="none" />
              <polygon points="185,235 181,232 186,238" />
              <text x="35" y="186" stroke="none">4#5 GRADE 60 CONTINUOUS</text>
            </g>
          )}

          {/* Title block frame mockup */}
          <rect x="5" y="5" width="390" height="290" fill="none" stroke={colors.grid} strokeWidth="1" />
        </svg>
      )
    },
    {
      id: 'jia-m-02',
      code: 'JIA-DET-MAS-02',
      title: 'Hurricane-Tied Reinforced Masonry Block Column',
      category: 'Masonry & Columns',
      region: 'Caribbean Standard',
      scale: '1 : 12',
      dwgSize: '495 KB',
      desc: 'Structural masonry pillar details utilizing reinforced high-strength concrete blocks tied directly into ground ring-beams.',
      specs: [
        'ASTM C90 Hollow Load-Bearing Concrete Masonry Units (Grade N).',
        'Vertical reinforcement rebar loops spliced to foundation dowels.',
        'Hollow blocks filled completely with high-slump 2500 PSI pea gravel grout.',
        'Dur-O-Wal truss-type joint wire reinforcement every second course.'
      ],
      dwgText: 'MASONRY_BLOCK_DET: TYPE_C90_CMU; GROUT: 2500PSI_SOLID; REBARS: 2#6_VERT; JOINT: TRUSS_STYLE_9GA;',
      renderSvg: (colors, showLayers) => (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          {/* Grid lines */}
          {showLayers.grid && (
            <path d="M 0 50 L 400 50 M 0 100 L 400 100 M 0 150 L 400 150 M 0 200 L 400 200 M 0 250 L 400 250 M 50 0 L 50 300 M 100 0 L 100 300 M 150 0 L 150 300 M 200 0 L 200 300 M 250 0 L 250 300 M 300 0 L 300 300 M 350 0 L 350 300" stroke={colors.grid} strokeWidth="0.5" strokeDasharray="2 4" />
          )}

          {/* Masonry Block Stack Section */}
          {showLayers.structure && (
            <g fill="none" stroke={colors.structure} strokeWidth="2">
              {/* Stacked CMU blocks in elevation cross-section */}
              <rect x="130" y="30" width="140" height="240" />
              {/* Course joints */}
              <line x1="130" y1="70" x2="270" y2="70" />
              <line x1="130" y1="110" x2="270" y2="110" />
              <line x1="130" y1="150" x2="270" y2="150" />
              <line x1="130" y1="190" x2="270" y2="190" />
              <line x1="130" y1="230" x2="270" y2="230" />
              
              {/* Internal hollow chambers */}
              <path d="M 150 30 L 150 270 M 250 30 L 250 270" strokeWidth="1" strokeDasharray="4 4" />
            </g>
          )}

          {/* Grout Fill Hatching */}
          {showLayers.hatching && (
            <g stroke={colors.hatch} strokeWidth="0.8" opacity="0.35">
              <path d="M 155 35 L 245 45 M 155 75 L 245 85 M 155 115 L 245 125 M 155 155 L 245 165 M 155 195 L 245 205 M 155 235 L 245 245" />
              <path d="M 245 35 L 155 45 M 245 75 L 155 85 M 245 115 L 155 125 M 245 155 L 155 165 M 245 195 L 155 205 M 245 235 L 155 245" />
            </g>
          )}

          {/* Vertical Rebars */}
          {showLayers.reinforcement && (
            <g stroke={colors.rebar} strokeWidth="2.5" fill="none">
              {/* Core steel rods with hooks */}
              <path d="M 170 10 L 170 280" />
              <path d="M 230 10 L 230 280" />
              {/* Lateral tie-wires */}
              <line x1="170" y1="50" x2="230" y2="50" strokeWidth="1" />
              <line x1="170" y1="130" x2="230" y2="130" strokeWidth="1" />
              <line x1="170" y1="210" x2="230" y2="210" strokeWidth="1" />
            </g>
          )}

          {/* Dimensions */}
          {showLayers.dimensions && (
            <g stroke={colors.dimensions} strokeWidth="1" fill={colors.dimensions} className="text-[9px] font-mono">
              <line x1="100" y1="30" x2="100" y2="270" />
              <polygon points="100,30 98,35 102,35" />
              <polygon points="100,270 98,265 102,265" />
              <text x="60" y="150" stroke="none">2400mm HT</text>

              <line x1="130" y1="285" x2="270" y2="285" />
              <polygon points="130,285 135,283 135,287" />
              <polygon points="270,285 265,283 265,287" />
              <text x="175" y="297" stroke="none">400mm SQ</text>
            </g>
          )}

          {/* Annotation Pointers */}
          {showLayers.annotations && (
            <g stroke={colors.annotations} strokeWidth="1" fill={colors.annotations} className="text-[8px] font-mono" opacity="0.85">
              <path d="M 130 90 L 80 90" fill="none" />
              <polygon points="130,90 126,87 126,93" />
              <text x="15" y="87" stroke="none">CMU STANDARD BLOCK</text>

              <path d="M 170 170 L 110 170" fill="none" />
              <polygon points="170,170 166,167 166,173" />
              <text x="15" y="166" stroke="none">2#6 STEEL REBARS</text>

              <path d="M 200 130 L 320 130" fill="none" />
              <polygon points="200,130 204,133 204,127" />
              <text x="325" y="133" stroke="none">SOLID PORTLAND GROUT FILL</text>
            </g>
          )}

          <rect x="5" y="5" width="390" height="290" fill="none" stroke={colors.grid} strokeWidth="1" />
        </svg>
      )
    },
    {
      id: 'jia-t-03',
      code: 'JIA-DET-TIM-03',
      title: 'Category 5 Hurricane Roof Strap & Truss Detail',
      category: 'Timber & Roof',
      region: 'Caribbean Standard',
      scale: '1 : 5',
      dwgSize: '388 KB',
      desc: 'Robust timber-to-wall hardware details detailing Simpson-style double hurricane ties to secure roof trusses against massive uplift forces.',
      specs: [
        'SDR No.2 Southern Yellow Pine timber elements (treated against termites).',
        'Double Simpson Strong-Tie H10S galvanized hurricane metal connectors.',
        '10d x 1-1/2" hot-dip galvanized nails in all prepunched connector holes.',
        'Truss spacing at 600mm (24") on center maximum.'
      ],
      dwgText: 'TIMBER_TRUSS_DET: WOOD_PINE_SDR2; MET_STRAP: DOUBLE_SIMPSON_H10S; ANCHOR: 10D_GALV_NAILS; UPLIFT: Cat5_READY;',
      renderSvg: (colors, showLayers) => (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          {/* Grid lines */}
          {showLayers.grid && (
            <path d="M 0 50 L 400 50 M 0 100 L 400 100 M 0 150 L 400 150 M 0 200 L 400 200 M 0 250 L 400 250 M 50 0 L 50 300 M 100 0 L 100 300 M 150 0 L 150 300 M 200 0 L 200 300 M 250 0 L 250 300 M 300 0 L 300 300 M 350 0 L 350 300" stroke={colors.grid} strokeWidth="0.5" strokeDasharray="2 4" />
          )}

          {/* Wall Support Structure */}
          {showLayers.structure && (
            <g fill="none" stroke={colors.structure} strokeWidth="2.5">
              {/* Brick/block wall support */}
              <rect x="70" y="160" width="120" height="120" />
              {/* Double timber top plates */}
              <rect x="60" y="120" width="140" height="20" />
              <rect x="60" y="140" width="140" height="20" />
              {/* Rafter Timber angled */}
              <path d="M 40 120 L 360 30 L 380 70 L 60 120 Z" />
            </g>
          )}

          {/* Wood Grain Hatching */}
          {showLayers.hatching && (
            <g stroke={colors.hatch} strokeWidth="1" opacity="0.3" fill="none">
              <path d="M 120 70 C 180 55, 230 45, 290 35" />
              <path d="M 130 80 C 190 65, 240 55, 300 45" />
              {/* Brick hatch inside wall */}
              <line x1="80" y1="180" x2="110" y2="160" />
              <line x1="120" y1="180" x2="150" y2="160" />
              <line x1="80" y1="230" x2="110" y2="210" />
              <line x1="120" y1="230" x2="150" y2="210" />
            </g>
          )}

          {/* Hurricane Strap Reinforcement (Silver/Grey with outline) */}
          {showLayers.reinforcement && (
            <g stroke={colors.rebar} strokeWidth="2" fill="none">
              {/* Structural hurricane metal tie wrapping around plate and rafter */}
              <path d="M 110 80 L 110 160 L 135 160 L 135 95 Z" strokeWidth="3" />
              {/* Connector plate nails */}
              <circle cx="118" cy="90" r="1.5" fill={colors.rebar} />
              <circle cx="118" cy="110" r="1.5" fill={colors.rebar} />
              <circle cx="127" cy="130" r="1.5" fill={colors.rebar} />
              <circle cx="127" cy="150" r="1.5" fill={colors.rebar} />
            </g>
          )}

          {/* Dimensions */}
          {showLayers.dimensions && (
            <g stroke={colors.dimensions} strokeWidth="1" fill={colors.dimensions} className="text-[9px] font-mono">
              <line x1="50" y1="120" x2="50" y2="160" />
              <polygon points="50,120 48,125 52,125" />
              <polygon points="50,160 48,155 52,155" />
              <text x="15" y="145" stroke="none">2x PLATES</text>

              <line x1="380" y1="25" x2="350" y2="15" />
              <text x="310" y="12" stroke="none">SLOPE: 4/12</text>
            </g>
          )}

          {/* Annotations */}
          {showLayers.annotations && (
            <g stroke={colors.annotations} strokeWidth="1" fill={colors.annotations} className="text-[8px] font-mono" opacity="0.85">
              <path d="M 125 110 L 220 110" fill="none" />
              <polygon points="125,110 129,113 129,107" />
              <text x="225" y="113" stroke="none">H10S GALVANIZED CONNECTOR</text>

              <path d="M 250 50 L 300 80" fill="none" />
              <polygon points="250,50 254,53 254,47" />
              <text x="305" y="83" stroke="none">2x6 TRUSS CHORD</text>

              <path d="M 120 220 L 240 220" fill="none" />
              <polygon points="120,220 124,223 124,217" />
              <text x="245" y="223" stroke="none">REINFORCED TIE BEAM BELOW</text>
            </g>
          )}

          <rect x="5" y="5" width="390" height="290" fill="none" stroke={colors.grid} strokeWidth="1" />
        </svg>
      )
    },
    {
      id: 'jia-int-04',
      code: 'JIA-DET-INT-04',
      title: 'Modern Kitchen Cabinet & Countertop Section',
      category: 'Interior Design Details',
      region: 'Caribbean / US Standard',
      scale: '1 : 8',
      dwgSize: '290 KB',
      desc: 'Architectural interior millwork details detailing carcass wall anchoring, quartz counters, drawer slides, and hardwood kick plates.',
      specs: [
        'Countertop material: 20mm engineered Quartz slab with mitered apron edge.',
        'Cabinet Box: 18mm high-density marine-grade plywood (water-resistant).',
        'Soft-close ball-bearing concealed drawer slide runner system.',
        'Recessed 100mm (4") high toe-kick base painted black water-resistant enamel.'
      ],
      dwgText: 'MILLWORK: KITCHEN_BASE_01; COUNTER: 20mm_QUARTZ; CABINET: 18mm_MARINE_PLY; HINGE: BLUM_SOFT_CLOSE;',
      renderSvg: (colors, showLayers) => (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          {/* Grid lines */}
          {showLayers.grid && (
            <path d="M 0 50 L 400 50 M 0 100 L 400 100 M 0 150 L 400 150 M 0 200 L 400 200 M 0 250 L 400 250 M 50 0 L 50 300 M 100 0 L 100 300 M 150 0 L 150 300 M 200 0 L 200 300 M 250 0 L 250 300 M 300 0 L 300 300 M 350 0 L 350 300" stroke={colors.grid} strokeWidth="0.5" strokeDasharray="2 4" />
          )}

          {/* Wall Backdrop & Cabinet Carcass */}
          {showLayers.structure && (
            <g fill="none" stroke={colors.structure} strokeWidth="2">
              {/* Back wall stud section */}
              <line x1="80" y1="10" x2="80" y2="290" strokeWidth="3" />
              {/* Quartz counter slab */}
              <rect x="80" y="80" width="180" height="15" />
              {/* Cabinet box body */}
              <rect x="85" y="95" width="165" height="160" />
              {/* Drawer front */}
              <rect x="250" y="100" width="8" height="60" fill="none" />
              {/* Door front */}
              <rect x="250" y="165" width="8" height="90" fill="none" />
              {/* Recessed toe kick */}
              <path d="M 210 255 L 210 285 L 250 285" />
            </g>
          )}

          {/* Hatching for Quartz & Plywood */}
          {showLayers.hatching && (
            <g stroke={colors.hatch} strokeWidth="1" opacity="0.3">
              {/* Quartz counter hatch */}
              <line x1="85" y1="80" x2="105" y2="95" />
              <line x1="125" y1="80" x2="145" y2="95" />
              <line x1="165" y1="80" x2="185" y2="95" />
              <line x1="205" y1="80" x2="225" y2="95" />
              {/* Wall block hatch */}
              <line x1="40" y1="40" x2="80" y2="40" />
              <line x1="40" y1="90" x2="80" y2="90" />
              <line x1="40" y1="140" x2="80" y2="140" />
            </g>
          )}

          {/* Core hardware fittings & drawers */}
          {showLayers.reinforcement && (
            <g stroke={colors.rebar} strokeWidth="1.5" fill="none">
              {/* Metal soft close drawer slide rail */}
              <line x1="95" y1="130" x2="240" y2="130" />
              {/* Hanging wall cleats bracket (french cleat anchor) */}
              <polygon points="85,100 110,100 100,115 85,115" />
              {/* Wall fixing screw bolt */}
              <line x1="70" y1="107" x2="95" y2="107" />
            </g>
          )}

          {/* Dimension */}
          {showLayers.dimensions && (
            <g stroke={colors.dimensions} strokeWidth="1" fill={colors.dimensions} className="text-[9px] font-mono">
              <line x1="280" y1="80" x2="280" y2="285" />
              <polygon points="280,80 278,85 282,85" />
              <polygon points="280,285 278,280 282,280" />
              <text x="290" y="190" stroke="none">850mm HT</text>

              <line x1="80" y1="60" x2="260" y2="60" />
              <polygon points="80,60 85,58 85,62" />
              <polygon points="260,60 255,58 255,62" />
              <text x="145" y="50" stroke="none">600mm DEPTH</text>
            </g>
          )}

          {/* Annotations */}
          {showLayers.annotations && (
            <g stroke={colors.annotations} strokeWidth="1" fill={colors.annotations} className="text-[8px] font-mono" opacity="0.85">
              <path d="M 180 80 L 195 40 L 220 40" fill="none" />
              <polygon points="180,80 184,83 184,77" />
              <text x="225" y="43" stroke="none">20mm MITERED QUARTZ</text>

              <path d="M 150 130 L 135 155 L 110 155" fill="none" />
              <polygon points="150,130 146,127 146,133" />
              <text x="15" y="158" stroke="none">BLUM CONCEALED RUNNER</text>

              <path d="M 210 270 L 180 270" fill="none" />
              <polygon points="210,270 206,267 206,273" />
              <text x="105" y="273" stroke="none">100mm RECESSED KICKPLATE</text>
            </g>
          )}

          <rect x="5" y="5" width="390" height="290" fill="none" stroke={colors.grid} strokeWidth="1" />
        </svg>
      )
    },
    {
      id: 'jia-ent-05',
      code: 'JIA-DET-ENT-05',
      title: 'Tropical Landscaping (Palm Tree) Entourage & Figure',
      category: 'Presentation Blocks',
      region: 'Caribbean Standard',
      scale: '1 : 25',
      dwgSize: '180 KB',
      desc: 'Elegant 2D elevation presentation entourage blocks of Caribbean flora (Coconut Palm Tree) paired with a standard scale helper figure.',
      specs: [
        'Polished 2D vector graphic optimized for presentation rendering and dwg block import.',
        'Typical regional coconut palm silhouette (Cocos Nucifera).',
        'Includes standard scale helper model silhouette (Height: 1800mm / 6-foot equivalent).',
        'Fully layered vector groups allowing easy opacity adjustments in AutoCAD.'
      ],
      dwgText: 'ENTOURAGE: COCOS_NUCIFERA_PALM_01; REF_FIGURE: HEIGHT_1.8m_MALE; CAD_UNIT: mm; PERS_BLOCK: YES;',
      renderSvg: (colors, showLayers) => (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          {/* Grid lines */}
          {showLayers.grid && (
            <path d="M 0 50 L 400 50 M 0 100 L 400 100 M 0 150 L 400 150 M 0 200 L 400 200 M 0 250 L 400 250 M 50 0 L 50 300 M 100 0 L 100 300 M 150 0 L 150 300 M 200 0 L 200 300 M 250 0 L 250 300 M 300 0 L 300 300 M 350 0 L 350 300" stroke={colors.grid} strokeWidth="0.5" strokeDasharray="2 4" />
          )}

          {/* Palm Trunk Elevation */}
          {showLayers.structure && (
            <g stroke={colors.structure} fill="none" strokeWidth="2">
              {/* Leaning tropical organic trunk */}
              <path d="M 120 280 C 122 210, 150 140, 180 80 M 140 280 C 142 210, 168 142, 195 83" />
              {/* Ring segment markings */}
              <path d="M 122 250 L 138 251 M 125 220 L 142 222 M 130 190 L 148 193 M 137 160 L 157 163 M 147 130 L 168 133 M 160 100 L 180 102" strokeWidth="1" />
            </g>
          )}

          {/* Tropical Fronds Leaves (Green organic outline) */}
          {showLayers.hatching && (
            <g stroke={colors.hatch} fill="none" strokeWidth="1.5">
              {/* Organic branches curving outward */}
              <path d="M 188 82 C 140 70, 90 90, 60 130" />
              <path d="M 188 82 C 160 40, 120 20, 80 40" />
              <path d="M 188 82 C 210 30, 260 20, 300 45" />
              <path d="M 188 82 C 240 60, 290 80, 320 120" />
              <path d="M 188 82 C 180 120, 160 160, 140 200" />
              <path d="M 188 82 C 210 110, 240 140, 260 180" />

              {/* Feather leaf lines */}
              <path d="M 120 78 L 115 95 M 100 84 L 95 101 M 80 95 L 75 110 M 140 35 L 145 20 M 120 28 L 125 10 M 230 25 L 240 10 M 255 35 L 265 20 M 270 70 L 285 85 M 290 85 L 305 100" strokeWidth="0.8" />
            </g>
          )}

          {/* Scale human figure silhouette */}
          {showLayers.reinforcement && (
            <g fill={colors.rebar} opacity="0.75" stroke="none">
              {/* Abstract architect figure standing */}
              <circle cx="280" cy="205" r="7" /> {/* head */}
              <path d="M 273 213 L 287 213 L 284 250 L 288 280 L 281 280 L 280 255 L 279 280 L 272 280 L 276 250 Z" /> {/* torso & legs */}
              <path d="M 272 213 L 266 235 L 268 245 L 271 245 L 270 235 L 274 218 Z" /> {/* arm 1 */}
              <path d="M 288 213 L 294 235 L 292 245 L 289 245 L 291 235 L 286 218 Z" /> {/* arm 2 */}
            </g>
          )}

          {/* Elevation Dimensions */}
          {showLayers.dimensions && (
            <g stroke={colors.dimensions} strokeWidth="1" fill={colors.dimensions} className="text-[9px] font-mono">
              <line x1="335" y1="200" x2="335" y2="280" />
              <polygon points="335,200 333,205 337,205" />
              <polygon points="335,280 333,275 337,275" />
              <text x="345" y="245" stroke="none">1800mm MALE</text>

              <line x1="25" y1="40" x2="25" y2="280" />
              <polygon points="25,40 23,45 27,45" />
              <polygon points="25,280 23,275 27,275" />
              <text x="35" y="165" stroke="none">6500mm AVG HEIGHT</text>
            </g>
          )}

          {/* Labels */}
          {showLayers.annotations && (
            <g stroke={colors.annotations} strokeWidth="1" fill={colors.annotations} className="text-[8px] font-mono" opacity="0.85">
              <path d="M 250 120 L 270 150 L 280 150" fill="none" />
              <polygon points="250,120 254,123 254,117" />
              <text x="285" y="153" stroke="none">2D TROPICAL PLANTING</text>

              <path d="M 273 235 L 220 235" fill="none" />
              <polygon points="273,235 269,232 269,238" />
              <text x="160" y="238" stroke="none">1.8m VECTOR BLOCK</text>
            </g>
          )}

          <rect x="5" y="5" width="390" height="290" fill="none" stroke={colors.grid} strokeWidth="1" />
        </svg>
      )
    },
    {
      id: 'jia-wd-06',
      code: 'JIA-DET-WD-06',
      title: 'Storm-Resistant Aluminum Jalousie Window Sill Section',
      category: 'Windows & Louvers',
      region: 'Caribbean Standard',
      scale: '1 : 2',
      dwgSize: '345 KB',
      desc: 'Extruded aluminum framing detail with interlocking rain-drips and neoprene gaskets for high-velocity tropical storm louver installations.',
      specs: [
        'Anodized structural grade 6063-T5 aluminum framing components.',
        'High-density double-barrier Neoprene bulb weather-stripping seals.',
        'Louvers support 6mm heavy-duty impact-resistant laminated glazing panes.',
        'Integrated anti-slam torque operator mechanism with multi-point locking.'
      ],
      dwgText: 'WINDOW_SILL: ALUM_6063_T5; GLAZING: 6mm_LAMINATED; WEATHERSTRIP: NEOPRENE_BULB; TEST_UPLIFT: 120_PSF;',
      renderSvg: (colors, showLayers) => (
        <svg viewBox="0 0 400 300" className="w-full h-full">
          {/* Grid lines */}
          {showLayers.grid && (
            <path d="M 0 50 L 400 50 M 0 100 L 400 100 M 0 150 L 400 150 M 0 200 L 400 200 M 0 250 L 400 250 M 50 0 L 50 300 M 100 0 L 100 300 M 150 0 L 150 300 M 200 0 L 200 300 M 250 0 L 250 300 M 300 0 L 300 300 M 350 0 L 350 300" stroke={colors.grid} strokeWidth="0.5" strokeDasharray="2 4" />
          )}

          {/* Extruded aluminum frames & sill */}
          {showLayers.structure && (
            <g fill="none" stroke={colors.structure} strokeWidth="2.5">
              {/* Masonry opening sill below */}
              <rect x="50" y="220" width="300" height="60" />
              {/* Main aluminum window outer channel sill track */}
              <path d="M 80 140 L 80 220 L 320 220 L 320 180 L 290 180 L 290 205 L 110 205 L 110 140 Z" />
              {/* Pivoting louver blades overlapping in semi-closed position */}
              <rect x="140" y="80" width="12" height="110" transform="rotate(25 140 80)" />
              <rect x="220" y="50" width="12" height="110" transform="rotate(25 220 50)" />
            </g>
          )}

          {/* Water drainage direction & Rain lines */}
          {showLayers.hatching && (
            <g stroke={colors.hatch} strokeWidth="1" opacity="0.4" fill="none">
              {/* Concrete hatching below sill */}
              <line x1="60" y1="240" x2="80" y2="220" />
              <line x1="110" y1="240" x2="130" y2="220" />
              <line x1="160" y1="240" x2="180" y2="220" />
              <line x1="210" y1="240" x2="230" y2="220" />
              <line x1="260" y1="240" x2="280" y2="220" />
              <line x1="310" y1="240" x2="330" y2="220" />

              {/* Rain storm directional arrows outside */}
              <path d="M 370 20 L 350 60" strokeWidth="1.5" />
              <polygon points="350,60 355,54 350,51" />
              <path d="M 350 10 L 330 50" strokeWidth="1.5" />
              <polygon points="330,50 335,44 330,41" />
            </g>
          )}

          {/* Neoprene bulb rubber gasket anchors */}
          {showLayers.reinforcement && (
            <g stroke={colors.rebar} strokeWidth="2" fill="none">
              {/* Rubber bubble seals inside louver channel contact joints */}
              <circle cx="152" cy="120" r="4.5" fill={colors.rebar} />
              <circle cx="232" cy="90" r="4.5" fill={colors.rebar} />
              {/* Steel window locking lever mechanism line */}
              <path d="M 110 180 L 290 180" strokeWidth="1" strokeDasharray="3 3" />
            </g>
          )}

          {/* Dimensions */}
          {showLayers.dimensions && (
            <g stroke={colors.dimensions} strokeWidth="1" fill={colors.dimensions} className="text-[9px] font-mono">
              <line x1="80" y1="235" x2="320" y2="235" />
              <polygon points="80,235 85,233 85,237" />
              <polygon points="320,235 315,233 315,237" />
              <text x="170" y="247" stroke="none">240mm DEPTH</text>

              <line x1="335" y1="140" x2="335" y2="220" />
              <polygon points="335,140 333,145 337,145" />
              <polygon points="335,220 333,215 337,215" />
              <text x="345" y="185" stroke="none">80mm FRAME</text>
            </g>
          )}

          {/* Annotations */}
          {showLayers.annotations && (
            <g stroke={colors.annotations} strokeWidth="1" fill={colors.annotations} className="text-[8px] font-mono" opacity="0.85">
              <path d="M 160 120 L 100 120" fill="none" />
              <polygon points="160,120 156,117 156,123" />
              <text x="15" y="117" stroke="none">NEOPRENE GASKET SEAL</text>

              <path d="M 180 60 L 150 40 L 95 40" fill="none" />
              <polygon points="180,60 177,55 183,57" />
              <text x="15" y="37" stroke="none">6mm HEAVY LOUVER BLADE</text>

              <path d="M 280 220 L 295 260 M 295 260 L 310 260" fill="none" />
              <polygon points="280,220 284,223 278,224" />
              <text x="315" y="263" stroke="none">REINFORCED CONCRETE SILL</text>
            </g>
          )}

          <rect x="5" y="5" width="390" height="290" fill="none" stroke={colors.grid} strokeWidth="1" />
        </svg>
      )
    }
  ];

  const allCADItems = [...preloadedCADItems, ...customAssets];

  // Filters search query & categories
  const filteredCADItems = allCADItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activeCADItem = allCADItems.find(item => item.id === selectedItemId) || preloadedCADItems[0];

  // Colors config based on selected theme (Blueprint Dark vs light grey)
  const cadColors: CADColors = isDarkTheme ? {
    bg: '#0A0F1D',
    grid: '#183059',
    structure: '#FFFFFF',
    rebar: '#FF5E5B',
    annotations: '#4D96FF',
    dimensions: '#FFE61B',
    hatch: '#00D7FF'
  } : {
    bg: '#F5F5F7',
    grid: '#D1D5DB',
    structure: '#111827',
    rebar: '#DC2626',
    annotations: '#2563EB',
    dimensions: '#D97706',
    hatch: '#059669'
  };

  // Preset categories
  const categories = ['All', 'Structural Concrete', 'Masonry & Columns', 'Timber & Roof', 'Interior Design Details', 'Presentation Blocks', 'Windows & Louvers', 'User Uploads'];

  // DXF generator compliant with direct download for users
  const triggerDXFDownload = (item: CADItem) => {
    setDownloadingId(item.id);
    setTimeout(() => {
      // Construct a valid DXF mock-database file representing standard drafting layouts
      const dxfContent = `0
SECTION
2
HEADER
9
$ACADVER
1
AC1015
9
$INSUNITS
70
4
0
ENDSEC
0
SECTION
2
TABLES
0
ENDSEC
0
SECTION
2
BLOCKS
0
ENDSEC
0
SECTION
2
ENTITIES
0
MTEXT
8
ANNOTATIONS
10
100.0
20
150.0
30
0.0
40
8.0
1
JIA DIGITAL PORTAL DETAILED SYSTEM BLOCK\\PCODE: ${item.code}\\PTITLE: ${item.title}\\PREGION: ${item.region}\\PSCALE: ${item.scale}
0
LINE
8
STRUCTURE
10
0.0
20
0.0
30
0.0
11
300.0
21
0.0
31
0.0
0
LINE
8
STRUCTURE
10
300.0
20
0.0
30
0.0
11
300.0
21
200.0
31
0.0
0
LINE
8
STRUCTURE
10
300.0
20
200.0
30
0.0
11
0.0
21
200.0
31
0.0
0
LINE
8
STRUCTURE
10
0.0
20
200.0
30
0.0
11
0.0
21
0.0
31
0.0
0
ENDSEC
0
EOF`;

      const blob = new Blob([dxfContent], { type: 'application/dxf;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${item.code}_CARIBBEAN_STANDARD.dxf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadingId(null);
    }, 1200);
  };

  // Custom File Uploader Drag/Drop handler
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUploadedFile(e.target.files[0]);
    }
  };

  const handleUploadedFile = (file: File) => {
    setIsUploading(true);
    // Simulate complex DXF/DWG coordinate mapping and layer separation scan
    setTimeout(() => {
      const isDxf = file.name.endsWith('.dxf') || file.name.endsWith('.dwg');
      const itemCode = `USER-DET-${Math.floor(100 + Math.random() * 900)}`;
      const newAsset: CADItem = {
        id: `custom-${Date.now()}`,
        code: itemCode,
        title: file.name.replace(/\.[^/.]+$/, ""),
        category: 'User Uploads',
        region: 'Local User Workspace',
        scale: 'NTS (Not to Scale)',
        dwgSize: `${(file.size / 1024).toFixed(1)} KB`,
        desc: `Custom user CAD file "${file.name}" imported and scanned into current session layers workspace.`,
        specs: [
          'Scanned file compliant with standard ANSI layout structures.',
          'Coordinates parsed successfully to browser rendering plane.',
          'Custom layer configuration automatically generated.'
        ],
        dwgText: `USER_IMPORT: ${file.name}; SIZE: ${file.size}B; STATUS: LAYER_SCANNED;`,
        renderSvg: (colors, showLayers) => (
          <svg viewBox="0 0 400 300" className="w-full h-full">
            {showLayers.grid && (
              <path d="M 0 50 L 400 50 M 0 100 L 400 100 M 0 150 L 400 150 M 0 200 L 400 200 M 0 250 L 400 250 M 50 0 L 50 300 M 100 0 L 100 300 M 150 0 L 150 300 M 200 0 L 200 300 M 250 0 L 250 300 M 300 0 L 300 300 M 350 0 L 350 300" stroke={colors.grid} strokeWidth="0.5" strokeDasharray="2 4" />
            )}
            {/* Render a beautiful, generic imported detail blueprint of coordinates */}
            {showLayers.structure && (
              <g fill="none" stroke={colors.structure} strokeWidth="2">
                <rect x="80" y="60" width="240" height="180" rx="4" />
                <line x1="80" y1="150" x2="320" y2="150" strokeDasharray="4 4" />
                <circle cx="200" cy="150" r="45" />
                <polygon points="200,105 160,175 240,175" />
              </g>
            )}
            {showLayers.reinforcement && (
              <g stroke={colors.rebar} strokeWidth="2" fill="none">
                <line x1="80" y1="60" x2="320" y2="240" />
                <line x1="320" y1="60" x2="80" y2="240" />
              </g>
            )}
            {showLayers.dimensions && (
              <g stroke={colors.dimensions} strokeWidth="1" fill={colors.dimensions} className="text-[9px] font-mono">
                <line x1="80" y1="260" x2="320" y2="260" />
                <polygon points="80,260 85,258 85,262" />
                <polygon points="320,260 315,258 315,262" />
                <text x="175" y="272" stroke="none">PARSED DRAWING</text>
              </g>
            )}
            {showLayers.annotations && (
              <g stroke={colors.annotations} strokeWidth="1" fill={colors.annotations} className="text-[8px] font-mono">
                <text x="90" y="80" stroke="none">IMPORTED: {file.name.substring(0, 18)}...</text>
                <text x="90" y="220" stroke="none">STATUS: LAYER_SCANNED_OK</text>
              </g>
            )}
            <rect x="5" y="5" width="390" height="290" fill="none" stroke={colors.grid} strokeWidth="1" />
          </svg>
        )
      };

      setCustomAssets([newAsset, ...customAssets]);
      setSelectedItemId(newAsset.id);
      setSelectedCategory('User Uploads');
      setIsUploading(false);
    }, 1500);
  };

  const copySpecToClipboard = (spec: string, index: number) => {
    navigator.clipboard.writeText(spec);
    setCopiedSpecIndex(index);
    setTimeout(() => setCopiedSpecIndex(null), 2000);
  };

  const portalModules = [
    {
      id: 'courses',
      icon: GraduationCap,
      title: 'Accredited Courses',
      badge: 'Courses & CPD',
      desc: 'Accredited professional certifications covering tropical climate materials, legal liability frameworks, and 2026 building code updates.',
      status: 'Coming Soon',
      unlocked: false
    },
    {
      id: 'tools',
      icon: Laptop,
      title: 'Architectural Tools',
      badge: 'Business Utility',
      desc: 'In-app contract template builders, automatic recommended fee estimators, client communication boards, and design scope calculators.',
      status: 'Development Phase',
      unlocked: false
    },
    {
      id: 'cad-library',
      icon: FolderOpen,
      title: 'Preloaded CAD DWG Library',
      badge: '2D & 3D CAD Libraries',
      desc: 'Access typical details, 2D and 3D CAD DWG blocks, interior design details, and presentation assets customized for Jamaica & the wider Caribbean.',
      status: 'Coming Soon',
      unlocked: false
    },
    {
      id: 'newsletters',
      icon: Newspaper,
      title: 'Technical Newsletters',
      badge: 'Publications',
      desc: 'Exclusive access to our quarterly design portfolios, national urban reports, and board legislative resolutions.',
      status: 'Coming Soon',
      unlocked: false
    }
  ];

  return (
    <div className="bg-[#0b0c10] text-gray-300 min-h-screen pb-24 font-sans">
      
      {/* Immersive Tech Banner (only visible if not looking at workspace) */}
      {!selectedModule && (
        <section className="relative overflow-hidden py-20 text-center border-b border-white/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-950/40 via-[#0b0c10] to-[#0b0c10]">
          
          {/* Abstract cyber backdrop wires */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(rgba(24,179,69,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(24,179,69,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="relative max-w-4xl mx-auto px-4 space-y-6 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-1 bg-[#138F34]/15 border border-[#18B345]/30 rounded-full px-4 py-1.5 text-xs font-semibold text-[#18B345]"
            >
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>Introducing JIA Members' Digital Portal</span>
            </motion.div>

            <motion.h1
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-white"
            >
              JIA Portal <span className="text-[#18B345]">Coming Soon</span>
            </motion.h1>

            <motion.p
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed"
            >
              The upcoming JIA Members' Digital Portal will provide a comprehensive suite of resources for Jamaican and Caribbean professionals. Beyond our preloaded CAD DWG library, members will gain direct access to accredited courses, essential architectural tools, and technical newsletters.
            </motion.p>
          </div>
        </section>
      )}

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        <AnimatePresence mode="wait">
          {!selectedModule ? (
            /* MODULES HOME VIEW */
            <motion.div
              key="portal-home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
            >
              
              {/* Left Column: Register / Info Card */}
              <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 text-[#18B345]/10">
                  <Code size={120} />
                </div>

                <div className="space-y-6 relative">
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Request Early Developer Access</h2>
                    <p className="text-gray-400 text-xs mt-1 font-light">Join the queue to contribute custom detail sheets, propose drawing amendments, and access advanced drafting features.</p>
                  </div>

                  <AnimatePresence mode="wait">
                    {!registered ? (
                      <motion.form
                        key="portal-form"
                        onSubmit={handleRegister}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                      >
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-gray-300">Full Name</label>
                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="John Doe, JIA"
                            className="w-full bg-white/5 border border-white/15 focus:border-[#18B345] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-gray-300">Email Address</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john.doe@firm.com"
                            className="w-full bg-white/5 border border-white/15 focus:border-[#18B345] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-[#138F34] hover:bg-[#18B345] text-white rounded-xl py-3 text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5"
                        >
                          <span>Join Early List</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="portal-success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-6 space-y-4"
                      >
                        <div className="flex justify-center text-[#18B345]">
                          <CheckCircle className="h-10 w-10 animate-bounce" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-white text-sm">Waitlist Enlisted!</h4>
                          <p className="text-gray-400 text-xs font-light">Your professional credentials have been secured. You will receive an access key soon.</p>
                        </div>
                        <button
                          onClick={() => setRegistered(false)}
                          className="text-xs text-gray-500 hover:text-white transition-colors underline"
                        >
                          Enlist another email
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Waitlist Counter */}
                  {waitlist.length > 0 && (
                    <div className="border-t border-white/10 pt-4 mt-6">
                      <div className="flex justify-between text-[11px] text-gray-400 mb-2 font-mono">
                        <span>Active Queue Waitlist</span>
                        <span>{waitlist.length} Registrants</span>
                      </div>
                      <div className="max-h-24 overflow-y-auto space-y-1.5 scrollbar-none">
                        {waitlist.map((name, i) => (
                          <div key={i} className="bg-white/5 rounded px-2.5 py-1 text-[10px] text-gray-300 font-mono flex items-center justify-between">
                            <span className="truncate">{name}</span>
                            <span className="text-[#18B345] text-[9px]">Enlisted</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Right Column: Cards of Portal Core Apps */}
              <div className="lg:col-span-8 space-y-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight border-b border-white/10 pb-3">
                  Select Portal Module
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {portalModules.map((mod, i) => {
                    const Icon = mod.icon;
                    return (
                      <div
                        key={i}
                        id={`portal-module-card-${mod.id}`}
                        onClick={() => {
                          if (mod.unlocked) {
                            setSelectedModule(mod.id);
                          }
                        }}
                        className={`bg-white/[0.02] border border-white/5 rounded-2xl p-6 relative overflow-hidden group flex flex-col justify-between h-[230px] shadow-sm transition-all duration-300 ${
                          mod.unlocked 
                            ? 'cursor-pointer hover:border-[#18B345]/40 hover:bg-white/[0.05] hover:scale-[1.02]' 
                            : 'opacity-70'
                        }`}
                      >
                        {/* Status tag */}
                        <div className={`absolute top-5 right-5 flex items-center space-x-1 text-[10px] font-bold px-2 py-0.5 rounded ${
                          mod.unlocked 
                            ? 'text-white bg-[#138F34] animate-pulse' 
                            : 'text-[#18B345] bg-[#18B345]/10'
                        }`}>
                          {!mod.unlocked && <Lock className="h-2.5 w-2.5 mr-0.5" />}
                          <span>{mod.status}</span>
                        </div>

                        <div className="space-y-4">
                          <div className={`p-3 rounded-xl w-fit ${mod.unlocked ? 'bg-[#138F34]/15 text-[#18B345]' : 'bg-white/5 text-gray-400'}`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <span className="text-[9px] font-bold tracking-widest text-[#18B345] uppercase">{mod.badge}</span>
                            <h3 className="font-bold text-white text-base mt-0.5">{mod.title}</h3>
                            <p className="text-gray-400 font-light text-xs mt-1.5 leading-relaxed">{mod.desc}</p>
                          </div>
                        </div>

                        {mod.unlocked && (
                          <div className="text-[10px] font-medium text-[#18B345] group-hover:underline flex items-center space-x-1 mt-2">
                            <span>Open Library Workspace</span>
                            <ArrowRight className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </motion.div>
          ) : (
            /* DEDICATED CAD LIBRARY INTERACTIVE WORKSPACE */
            <motion.div
              key="cad-workspace"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              
              {/* Back to Home & Title Area */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSelectedModule(null)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors flex items-center justify-center"
                    title="Return to Portal Modules"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <div>
                    <div className="flex items-center space-x-2">
                      <FolderOpen className="h-5 w-5 text-[#18B345]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[#18B345]">Members' Resource</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1">Preloaded CAD DWG Library</h1>
                  </div>
                </div>

                {/* Statistics banner */}
                <div className="flex items-center space-x-6 text-xs font-mono bg-white/[0.02] border border-white/5 rounded-2xl p-4">
                  <div>
                    <span className="text-gray-500 block">STANDARD REGION</span>
                    <span className="text-white font-bold">CARIBBEAN / US</span>
                  </div>
                  <div className="border-l border-white/10 pl-6">
                    <span className="text-gray-500 block">TOTAL ASSETS</span>
                    <span className="text-[#18B345] font-bold">{allCADItems.length} Blocks Available</span>
                  </div>
                </div>
              </div>

              {/* Grid Workspace */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Side: Search, Categories & Library Selector */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Search box */}
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search JIA CAD detail database..."
                      className="w-full bg-white/5 border border-white/10 focus:border-[#18B345] rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Horizontal Scroll Categories */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Filter Asset Categories</label>
                    <div className="flex flex-wrap gap-1.5">
                      {categories.map((cat, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all ${
                            selectedCategory === cat
                              ? 'bg-[#138F34] text-white'
                              : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Main list container */}
                  <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1 scrollbar-none border-t border-white/5 pt-4">
                    {filteredCADItems.length > 0 ? (
                      filteredCADItems.map((item) => {
                        const isSelected = item.id === selectedItemId;
                        return (
                          <div
                            key={item.id}
                            onClick={() => setSelectedItemId(item.id)}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer flex justify-between items-start ${
                              isSelected
                                ? 'bg-[#138F34]/10 border-[#18B345]/50 shadow-md'
                                : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'
                            }`}
                          >
                            <div className="space-y-1 max-w-[80%]">
                              <div className="flex items-center space-x-1.5">
                                <span className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded ${
                                  isSelected ? 'bg-[#18B345]/20 text-[#18B345]' : 'bg-white/5 text-gray-400'
                                }`}>
                                  {item.code}
                                </span>
                                <span className="text-[9px] text-gray-500 truncate">{item.category}</span>
                              </div>
                              <h4 className="font-semibold text-white text-xs truncate">{item.title}</h4>
                              <p className="text-gray-400 text-[10px] font-light truncate">{item.desc}</p>
                            </div>
                            <div className="text-right text-[9px] font-mono text-gray-500 space-y-1 shrink-0">
                              <span className="block">{item.scale}</span>
                              <span className="text-[#18B345]">{item.dwgSize}</span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-10 border border-dashed border-white/10 rounded-xl">
                        <FileCode className="h-8 w-8 mx-auto text-gray-500 animate-pulse mb-2" />
                        <p className="text-gray-400 text-xs">No CAD details match your query.</p>
                        <button
                          onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                          className="text-xs text-[#18B345] underline mt-1 font-semibold"
                        >
                          Clear Search Filter
                        </button>
                      </div>
                    )}
                  </div>

                  {/* CAD Uploader section */}
                  <div className="border-t border-white/10 pt-4">
                    <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase block mb-2">Import Custom CAD Workspace</label>
                    
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
                        dragActive 
                          ? 'border-[#18B345] bg-[#138F34]/5' 
                          : 'border-white/10 hover:border-white/20 bg-white/[0.01]'
                      }`}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept=".dwg,.dxf,.xml,.png"
                        className="hidden"
                      />
                      
                      {isUploading ? (
                        <div className="space-y-2 py-2">
                          <RefreshCw className="h-5 w-5 mx-auto text-[#18B345] animate-spin" />
                          <p className="text-white text-xs font-semibold">Parsing Vectors & Layers...</p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <Upload className="h-5 w-5 mx-auto text-gray-400" />
                          <p className="text-white text-xs font-semibold">Drag & Drop DWG/DXF/PNG</p>
                          <p className="text-gray-500 text-[10px]">Or click to scan device files</p>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* Right Side: High fidelity Interactive Blueprint Viewer */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Outer Frame of Blueprint Canvas */}
                  <div className="bg-white/[0.01] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                    
                    {/* Viewport Toolbar Header */}
                    <div className="bg-black/40 px-5 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
                      
                      {/* Active file metadata */}
                      <div className="flex items-center space-x-3">
                        <div className="p-1.5 bg-white/5 rounded-lg">
                          <FileCode className="h-4 w-4 text-[#18B345]" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-gray-500 font-bold block">{activeCADItem.code} / SCALE {activeCADItem.scale}</span>
                          <h3 className="text-white font-bold text-xs">{activeCADItem.title}</h3>
                        </div>
                      </div>

                      {/* Viewport controls */}
                      <div className="flex items-center space-x-2">
                        {/* Theme Toggle */}
                        <button
                          onClick={() => setIsDarkTheme(!isDarkTheme)}
                          className="px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-colors flex items-center space-x-1.5"
                        >
                          <Settings2 className="h-3 w-3 text-gray-400" />
                          <span>{isDarkTheme ? 'Autocad Classic' : 'Light Drafting'}</span>
                        </button>

                        {/* Zoom control */}
                        <button
                          onClick={() => setIsZoomed(!isZoomed)}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            isZoomed 
                              ? 'bg-[#138F34] border-[#138F34] text-white' 
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                          title="Toggle Zoom Factor"
                        >
                          <Maximize2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                    </div>

                    {/* INTERACTIVE CAD CANVAS CONTAINER */}
                    <div 
                      className="relative overflow-hidden transition-colors duration-300"
                      style={{ 
                        backgroundColor: cadColors.bg,
                        height: '380px'
                      }}
                    >
                      {/* CAD Grid Backdrop Overlay */}
                      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:20px_20px]" />

                      {/* Main Vector Frame */}
                      <motion.div 
                        className="w-full h-full flex items-center justify-center p-6"
                        animate={{ scale: isZoomed ? 1.35 : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {activeCADItem.renderSvg(cadColors, layers)}
                      </motion.div>

                      {/* Technical Scale Bar Mockup Overlay */}
                      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-2.5 py-1 rounded text-[8px] font-mono text-gray-400 border border-white/10">
                        <span>CAD UNIT: METRIC (MM) | GRID INTERVAL: 50MM</span>
                      </div>
                    </div>

                    {/* LAYERS MANAGER CONTROLLER BAR */}
                    <div className="bg-black/30 px-5 py-4 border-t border-white/10">
                      <div className="flex items-center space-x-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                        <Layers className="h-3.5 w-3.5 text-[#18B345]" />
                        <span>Vector Layer Visibility Manager</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
                        
                        {/* Layer Grid Toggle */}
                        <button
                          onClick={() => setLayers({ ...layers, grid: !layers.grid })}
                          className={`px-3 py-2 rounded-xl text-[10px] font-mono border text-left flex items-center justify-between transition-colors ${
                            layers.grid 
                              ? 'bg-white/5 border-[#18B345]/30 text-white' 
                              : 'bg-black/40 border-transparent text-gray-600'
                          }`}
                        >
                          <span>L-GRID</span>
                          {layers.grid ? <Eye className="h-3 w-3 text-[#18B345]" /> : <EyeOff className="h-3 w-3" />}
                        </button>

                        {/* Layer Structure Toggle */}
                        <button
                          onClick={() => setLayers({ ...layers, structure: !layers.structure })}
                          className={`px-3 py-2 rounded-xl text-[10px] font-mono border text-left flex items-center justify-between transition-colors ${
                            layers.structure 
                              ? 'bg-white/5 border-[#18B345]/30 text-white' 
                              : 'bg-black/40 border-transparent text-gray-600'
                          }`}
                        >
                          <span>L-WALL</span>
                          {layers.structure ? <Eye className="h-3 w-3 text-[#18B345]" /> : <EyeOff className="h-3 w-3" />}
                        </button>

                        {/* Layer Reinforcement Toggle */}
                        <button
                          onClick={() => setLayers({ ...layers, reinforcement: !layers.reinforcement })}
                          className={`px-3 py-2 rounded-xl text-[10px] font-mono border text-left flex items-center justify-between transition-colors ${
                            layers.reinforcement 
                              ? 'bg-white/5 border-[#18B345]/30 text-white' 
                              : 'bg-black/40 border-transparent text-gray-600'
                          }`}
                        >
                          <span>L-REBAR</span>
                          {layers.reinforcement ? <Eye className="h-3 w-3 text-[#18B345]" /> : <EyeOff className="h-3 w-3" />}
                        </button>

                        {/* Layer Annotations Toggle */}
                        <button
                          onClick={() => setLayers({ ...layers, annotations: !layers.annotations })}
                          className={`px-3 py-2 rounded-xl text-[10px] font-mono border text-left flex items-center justify-between transition-colors ${
                            layers.annotations 
                              ? 'bg-white/5 border-[#18B345]/30 text-white' 
                              : 'bg-black/40 border-transparent text-gray-600'
                          }`}
                        >
                          <span>L-TEXT</span>
                          {layers.annotations ? <Eye className="h-3 w-3 text-[#18B345]" /> : <EyeOff className="h-3 w-3" />}
                        </button>

                        {/* Layer Dimensions Toggle */}
                        <button
                          onClick={() => setLayers({ ...layers, dimensions: !layers.dimensions })}
                          className={`px-3 py-2 rounded-xl text-[10px] font-mono border text-left flex items-center justify-between transition-colors ${
                            layers.dimensions 
                              ? 'bg-white/5 border-[#18B345]/30 text-white' 
                              : 'bg-black/40 border-transparent text-gray-600'
                          }`}
                        >
                          <span>L-DIMS</span>
                          {layers.dimensions ? <Eye className="h-3 w-3 text-[#18B345]" /> : <EyeOff className="h-3 w-3" />}
                        </button>

                        {/* Layer Hatching Toggle */}
                        <button
                          onClick={() => setLayers({ ...layers, hatching: !layers.hatching })}
                          className={`px-3 py-2 rounded-xl text-[10px] font-mono border text-left flex items-center justify-between transition-colors ${
                            layers.hatching 
                              ? 'bg-white/5 border-[#18B345]/30 text-white' 
                              : 'bg-black/40 border-transparent text-gray-600'
                          }`}
                        >
                          <span>L-HATCH</span>
                          {layers.hatching ? <Eye className="h-3 w-3 text-[#18B345]" /> : <EyeOff className="h-3 w-3" />}
                        </button>

                      </div>

                    </div>

                  </div>

                  {/* Detail Technical Metadata & Specifications */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* File info card */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-4">
                      <div>
                        <span className="text-[9px] font-bold tracking-wider text-[#18B345] uppercase">Drawing Description</span>
                        <h4 className="text-white font-bold text-sm mt-0.5">{activeCADItem.title}</h4>
                        <p className="text-gray-400 text-xs mt-2 leading-relaxed font-light">{activeCADItem.desc}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 text-xs font-mono">
                        <div>
                          <span className="text-gray-500 block text-[9px]">COMPLIANT CODE</span>
                          <span className="text-white">{activeCADItem.region}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block text-[9px]">DRAFTING SCALE</span>
                          <span className="text-white">{activeCADItem.scale}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 border-t border-white/5 pt-4">
                        <button
                          onClick={() => triggerDXFDownload(activeCADItem)}
                          disabled={downloadingId !== null}
                          className="flex-1 bg-[#138F34] hover:bg-[#18B345] disabled:bg-gray-700 text-white rounded-xl py-3 text-xs font-semibold transition-all flex items-center justify-center space-x-1.5"
                        >
                          {downloadingId === activeCADItem.id ? (
                            <>
                              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                              <span>Compiling DXF...</span>
                            </>
                          ) : (
                            <>
                              <Download className="h-3.5 w-3.5" />
                              <span>Download CAD DWG (DXF)</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Regional technical notes / specifications */}
                    <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
                      <div className="space-y-3">
                        <span className="text-[9px] font-bold tracking-wider text-[#18B345] uppercase block">Regional Compliance Specifications</span>
                        
                        <div className="space-y-2.5">
                          {activeCADItem.specs.map((spec, i) => (
                            <div key={i} className="bg-white/[0.01] border border-white/5 rounded-xl p-2.5 flex items-start space-x-2.5 relative group">
                              <span className="text-[10px] font-bold text-[#18B345] font-mono shrink-0 mt-0.5">{i+1}.</span>
                              <p className="text-gray-300 text-xs font-light leading-normal pr-8">{spec}</p>
                              
                              {/* Clipboard copy helper */}
                              <button
                                onClick={() => copySpecToClipboard(spec, i)}
                                className="absolute right-2 top-2 p-1 rounded hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-white"
                                title="Copy spec to clipboard"
                              >
                                {copiedSpecIndex === i ? (
                                  <Check className="h-3 w-3 text-green-400" />
                                ) : (
                                  <Copy className="h-3 w-3" />
                                )}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="text-[10px] text-gray-500 font-mono text-center pt-2 border-t border-white/5">
                        <span>Details conform with JIA Tropical Design Guidelines</span>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
}
