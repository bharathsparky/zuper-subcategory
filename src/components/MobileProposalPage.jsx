import React, { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

// ─── Asset paths ───────────────────────────────────────────────────
const ASSETS = '/assets/mobile-proposal'

// Images
const IMG_PRODUCT = `${ASSETS}/7cedfbfb6d723ed95a9c12a4e11288387f2bd9a5.png`
const IMG_COVER = `${ASSETS}/1821226f40fd6f98c55b647c5fcbe0637e1f6d64.png`

// SVG icons
const ICO_CHEVRON_LEFT = `${ASSETS}/679cc8780106e07bfb731c35acca12a3d82536ca.svg`
const ICO_COPY = `${ASSETS}/7bfa4e29c237d167639db5a377553ea4211113d2.svg`
const ICO_TRASH = `${ASSETS}/4a5af207733b7567e866845739f71a71d2eb11d6.svg`
const ICO_FRAME = `${ASSETS}/6457940958619f8038c7d1a7b7e7995fd78b3763.svg`
const ICO_PLUS = `${ASSETS}/8da65b62c2c181c02ef79be07a790a6a87a90e03.svg`
const ICO_EDIT = `${ASSETS}/ba096f66aa34d369ba6023394c46d8aef20d2ded.svg`
const ICO_SETTINGS = `${ASSETS}/dba27c561cfa4beb46109bdcc4f408c70edf572c.svg`
const ICO_CANCEL_FILLED = `${ASSETS}/a153bece6cad855d32ac37ab9f69614271b5c25e.svg`
const ICO_EDIT_FILLED = `${ASSETS}/0cb60080c002c39ac752675d5c4902fffd1cbe86.svg`
const ICO_MINUS_GLYPH = `${ASSETS}/978e3886e5d6920cb614d05432e2292145e37805.svg`
const ICO_PLUS_GLYPH = `${ASSETS}/835c509f1836583e6477da8144377c8044d679ad.svg`
const ICO_CAP = `${ASSETS}/db61f70a21ad86561aa39cb04b6e284b47202818.svg`
const ICO_WIFI = `${ASSETS}/11056b1721385973e6b779b028d5783479f78fe9.svg`
const ICO_CELLULAR = `${ASSETS}/32ad76797a82fcc0c87056789b40cce1d1c1eda0.svg`

// ─── Section display color helpers ─────────────────────────────────
const SECTION_COLORS = {
  expanded: { bg: '#EFF6FF', border: '#3B82F6', itemBorder: '#BFDBFE' },
  collapsed: { bg: '#FFF7ED', border: '#F97316', itemBorder: '#FED7AA' },
  hidden: { bg: '#FEF2F2', border: '#EF4444', itemBorder: '#FECACA' },
}

// ─── Mock data ─────────────────────────────────────────────────────
const INITIAL_OPTIONS = [
  {
    id: 1,
    name: 'Basic',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna...',
    image: IMG_COVER,
    packageName: 'Service Package Q1 2023',
    sections: [
      {
        id: 's1',
        title: 'Repair Parts',
        sectionDisplay: 'expanded',
        showSubtotal: false,
        showChildPrices: true,
        items: [
          { id: 'i1', name: 'CAT-6 Cable', sku: '6ENCAT', image: IMG_PRODUCT, qtyLabel: '200 meters X USD 0.95', oldPrice: 'USD 150', price: 'USD 90', taxLabel: 'Incl. Taxes ($250.00)', qty: 1, unitPrice: 90 },
          { id: 'i2', name: 'CAT-6 Cable', sku: '6ENCAT', image: IMG_PRODUCT, qtyLabel: '200 meters X USD 0.95', oldPrice: 'USD 150', price: 'USD 90', taxLabel: 'Incl. Taxes ($250.00)', qty: 1, unitPrice: 90 },
        ],
      },
      {
        id: 's2',
        title: 'Service Parts',
        sectionDisplay: 'expanded',
        showSubtotal: false,
        showChildPrices: true,
        items: [
          { id: 'i3', name: 'CAT-6 Cable', sku: '6ENCAT', image: IMG_PRODUCT, qtyLabel: '200 meters X USD 0.95', oldPrice: 'USD 150', price: 'USD 90', taxLabel: 'Incl. Taxes ($250.00)', qty: 1, unitPrice: 90 },
          { id: 'i4', name: 'CAT-6 Cable', sku: '6ENCAT', image: IMG_PRODUCT, qtyLabel: '200 meters X USD 0.95', oldPrice: 'USD 150', price: 'USD 90', taxLabel: 'Incl. Taxes ($250.00)', qty: 1, unitPrice: 90 },
        ],
      },
    ],
    subtotal: 'USD 220,150',
    discount: 'USD 45',
    taxLabel: 'Exercise Tax',
    taxPercent: '12%',
    taxAmount: 'USD 26,148',
    total: 'USD 246,568',
    deposit: 'USD 1143',
    totalAmount: '$2465.00',
    itemCount: 4,
  },
  {
    id: 2,
    name: 'Premium',
    description: 'Full-service premium roofing package with extended warranty coverage.',
    image: null,
    packageName: 'Service Package Q2 2023',
    sections: [
      {
        id: 's3',
        title: 'Premium Parts',
        sectionDisplay: 'expanded',
        showSubtotal: false,
        showChildPrices: true,
        items: [
          { id: 'i5', name: 'CAT-6 Cable', sku: '6ENCAT', image: IMG_PRODUCT, qtyLabel: '200 meters X USD 0.95', oldPrice: 'USD 150', price: 'USD 90', taxLabel: 'Incl. Taxes ($250.00)', qty: 1, unitPrice: 90 },
        ],
      },
    ],
    subtotal: 'USD 320,000',
    discount: 'USD 60',
    taxLabel: 'Exercise Tax',
    taxPercent: '15%',
    taxAmount: 'USD 48,000',
    total: 'USD 368,000',
    deposit: 'USD 2500',
    totalAmount: '$3680.00',
    itemCount: 1,
  },
]

// ─── SVG Icons (inline for mobile) ─────────────────────────────────
const ChevronDownIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const EyeIcon = ({ size = 18, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EyeOffIcon = ({ size = 18, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
)

const StackIcon = ({ size = 18, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
)

const MoreVertIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
)

const CloseIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const SectionIcon = ({ size = 22, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="3" y1="15" x2="21" y2="15" />
  </svg>
)

const LineItemIcon = ({ size = 22, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
)

const TextBlockIcon = ({ size = 22, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="4 7 4 4 20 4 20 7" />
    <line x1="9" y1="20" x2="15" y2="20" />
    <line x1="12" y1="4" x2="12" y2="20" />
  </svg>
)

const ImageBlockIcon = ({ size = 22, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
)

const CopyIcon = ({ size = 18, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

const TrashIcon = ({ size = 18, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)

const SettingsIcon = ({ size = 18, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

const WarningIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

// ─── Separator ─────────────────────────────────────────────────────
function Separator() {
  return <div className="w-full h-px bg-[#E8EDF1]" />
}

// ─── Status Bar ────────────────────────────────────────────────────
function StatusBar() {
  return (
    <div className="h-[44px] relative w-full bg-white">
      <p className="absolute left-[48px] top-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-[15px] text-[#252A31] tracking-[-0.3px] text-center w-[54px]">
        9:41
      </p>
      {/* Battery */}
      <div className="absolute right-[16.67px] top-1/2 -translate-y-1/2 w-[22px] h-[11.333px] border border-[#252A31] rounded-[2.667px] opacity-35" />
      <div className="absolute right-[14.34px] top-1/2 -translate-y-1/2 w-[1.328px] h-[4px]">
        <img alt="" className="block w-full h-full" src={ICO_CAP} />
      </div>
      <div className="absolute right-[18.67px] top-1/2 -translate-y-1/2 w-[18px] h-[7.333px] bg-[#252A31] rounded-[1.333px]" />
      {/* Wifi */}
      <div className="absolute right-[43.67px] top-1/2 -translate-y-1/2 w-[15.333px] h-[11px]">
        <img alt="" className="block w-full h-full" src={ICO_WIFI} />
      </div>
      {/* Cellular */}
      <div className="absolute right-[64px] top-1/2 -translate-y-1/2 w-[17px] h-[10.667px]">
        <img alt="" className="block w-full h-full" src={ICO_CELLULAR} />
      </div>
    </div>
  )
}

// ─── Stepper ───────────────────────────────────────────────────────
function Stepper({ value, onChange }) {
  return (
    <div className="bg-[#EFF2F5] flex items-center overflow-hidden rounded-[6px] shrink-0">
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        className="bg-[#E8EDF1] w-[32px] h-[32px] flex items-center justify-center rounded-l-[6px]"
      >
        <div className="w-[12.39px] h-[1.8px]">
          <img alt="−" className="block w-full h-full" src={ICO_MINUS_GLYPH} />
        </div>
      </button>
      <div className="w-[38px] h-[20px] flex items-center justify-center font-bold text-[14px] text-[#252A31]">
        {value}
      </div>
      <button
        onClick={() => onChange(value + 1)}
        className="bg-[#E8EDF1] w-[32px] h-[32px] flex items-center justify-center rounded-r-[6px]"
      >
        <div className="w-[13.78px] h-[13.78px]">
          <img alt="+" className="block w-full h-full" src={ICO_PLUS_GLYPH} />
        </div>
      </button>
    </div>
  )
}

// ─── Line Item Card ────────────────────────────────────────────────
function LineItemCard({ item, onQtyChange, sectionDisplay }) {
  const colors = SECTION_COLORS[sectionDisplay] || SECTION_COLORS.expanded
  const isHiddenOrCollapsed = sectionDisplay === 'hidden' || sectionDisplay === 'collapsed'

  return (
    <div className="bg-white w-full overflow-hidden" style={{ borderLeft: `3px solid ${colors.itemBorder}` }}>
      <div className="flex gap-[8px] items-start pl-[12px] pr-[8px] py-[12px] w-full">
        {/* Product image */}
        <div className="relative rounded-[6px] shrink-0 w-[48px] h-[48px]">
          <div className="absolute inset-0 rounded-[6px] bg-[#D9D9D9]" />
          <img alt="" className="absolute inset-0 w-full h-full object-cover rounded-[6px]" src={item.image} />
        </div>
        {/* Info */}
        <div className="flex-1 flex flex-col gap-[4px] justify-center min-w-0 leading-[1.4] tracking-[0.2px]">
          <div className="flex items-center gap-[4px]">
            <p className="font-medium text-[16px] text-[#252A31] truncate">{item.name}</p>
            {isHiddenOrCollapsed && (
              <span title="This item will be hidden from the customer.">
                <EyeOffIcon size={14} className="text-[#94A3B8] shrink-0" />
              </span>
            )}
          </div>
          <p className="font-normal text-[12px] text-[#4F5E71] w-full">{item.sku}</p>
        </div>
        {/* Stepper */}
        <Stepper value={item.qty} onChange={(v) => onQtyChange(item.id, v)} />
      </div>
      {/* Price row */}
      <div className="flex items-center justify-between px-[12px] py-[8px] border-b border-[#E8EDF1] text-[12px] tracking-[0.2px] w-full">
        <p className="font-normal text-[#252A31] leading-[1.4]">{item.qtyLabel}</p>
        <div className="flex flex-col gap-[2px] items-end">
          <div className="flex gap-[8px] items-center">
            <p className="font-normal text-[#697D95] line-through leading-[1.4]">{item.oldPrice}</p>
            <p className="font-medium text-[#0172CB] leading-[1.4]">{item.price}</p>
          </div>
          <p className="font-normal text-[#0277BD] leading-[1.4]">{item.taxLabel}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Section Header (interactive with display badges) ───────────────
function MobileSectionHeader({ section, isCollapsed, onToggleCollapse, onAddItem, isKebabOpen, onToggleKebab, onConfigure, onClone, onRemove }) {
  const display = section.sectionDisplay || 'expanded'
  const colors = SECTION_COLORS[display]
  const kebabRef = useRef(null)
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 })

  // Calculate position and open
  const handleKebabClick = () => {
    if (isKebabOpen) {
      onToggleKebab(null)
      return
    }
    if (kebabRef.current) {
      const rect = kebabRef.current.getBoundingClientRect()
      const menuHeight = 160 // approximate dropdown height
      const spaceBelow = window.innerHeight - rect.bottom
      // Flip above if not enough space below
      const top = spaceBelow < menuHeight
        ? rect.top - menuHeight - 4
        : rect.bottom + 4
      setMenuPos({
        top: Math.max(8, top),
        right: window.innerWidth - rect.right
      })
    }
    onToggleKebab(section.id)
  }

  return (
    <div
      className="w-full"
      style={{ borderLeft: `3px solid ${colors.border}`, backgroundColor: colors.bg }}
    >
      <div className="flex items-center px-[12px] py-[10px] gap-[8px]">
        {/* Collapse chevron */}
        <button
          onClick={onToggleCollapse}
          className="w-[24px] h-[24px] flex items-center justify-center shrink-0"
        >
          <ChevronDownIcon
            size={18}
            className={`text-[#64748B] transition-transform duration-200 ${isCollapsed ? '-rotate-90' : ''}`}
          />
        </button>

        {/* Section title */}
        <p className="font-medium text-[14px] text-black tracking-[0.2px] leading-[1.4] flex-1 min-w-0 truncate">
          {section.title}
        </p>

        {/* Hidden indicator icon (no text badges) */}
        {display === 'hidden' && (
          <span className="inline-flex items-center shrink-0" title="This item will be hidden from the customer.">
            <EyeOffIcon size={15} className="text-[#DC2626]" />
          </span>
        )}

        {/* Add item to section */}
        <button
          onClick={onAddItem}
          className="w-[24px] h-[24px] flex items-center justify-center shrink-0"
        >
          <img alt="Add" className="block w-[16px] h-[16px]" src={ICO_PLUS} />
        </button>

        {/* Gear icon — opens config directly */}
        <button
          onClick={onConfigure}
          className="w-[24px] h-[24px] flex items-center justify-center shrink-0"
        >
          <SettingsIcon size={16} className="text-[#64748B]" />
        </button>

        {/* Kebab menu trigger */}
        <button
          ref={kebabRef}
          onClick={handleKebabClick}
          className="w-[24px] h-[24px] flex items-center justify-center shrink-0"
        >
          <MoreVertIcon size={18} className="text-[#64748B]" />
        </button>

        {/* Kebab dropdown - rendered via portal to avoid overflow clipping */}
        {isKebabOpen && createPortal(
          <>
            {/* Transparent backdrop to catch outside clicks */}
            <div
              style={{ position: 'fixed', inset: 0, zIndex: 9998 }}
              onClick={() => onToggleKebab(null)}
            />
            {/* Dropdown menu */}
            <div
              className="bg-white border border-[#E8EDF1] rounded-[12px] shadow-xl w-[160px] py-[6px] overflow-hidden"
              style={{ position: 'fixed', top: menuPos.top, right: menuPos.right, zIndex: 9999 }}
            >
              <button
                onClick={() => { onToggleKebab(null); onClone() }}
                className="w-full flex items-center gap-[10px] px-[14px] py-[12px] text-left active:bg-[#F1F5F9] transition-colors"
              >
                <CopyIcon size={16} className="text-[#64748B]" />
                <span className="text-[14px] text-[#334155]">Clone</span>
              </button>
              <div className="h-px bg-[#E8EDF1] mx-[10px]" />
              <button
                onClick={() => { onToggleKebab(null); onRemove() }}
                className="w-full flex items-center gap-[10px] px-[14px] py-[12px] text-left active:bg-[#FEF2F2] transition-colors"
              >
                <TrashIcon size={16} className="text-[#EF4444]" />
                <span className="text-[14px] text-[#EF4444]">Remove</span>
              </button>
            </div>
          </>,
          document.body
        )}
      </div>

      {/* Section subtotal (shown when toggled on) */}
      {section.showSubtotal && (
        <div className="px-[12px] pb-[8px] flex items-center justify-between">
          <span className="text-[11px] text-[#64748B] font-medium">Section Subtotal</span>
          <span className="text-[12px] font-semibold text-[#0172CB]">
            USD {section.items.reduce((sum, item) => sum + (item.unitPrice || 0) * item.qty, 0).toLocaleString()}
          </span>
        </div>
      )}
    </div>
  )
}

// ─── Add Dropdown ────────────────────────────────────────────────────
function AddDropdown({ isOpen, onClose, onAddItem, onAddFromGroup, onAddSection, onCustomItem, anchorRef }) {
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) &&
          anchorRef?.current && !anchorRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose, anchorRef])

  if (!isOpen) return null

  const items = [
    { id: 'additem', label: 'Add Item', action: onAddItem },
    { id: 'addfromgroup', label: 'Add From Group', action: onAddFromGroup },
    { id: 'addsection', label: 'Add Section', action: onAddSection },
    { id: 'customitem', label: 'Custom Item', action: onCustomItem },
  ]

  return (
    <div
      ref={dropdownRef}
      className="absolute z-50 bg-white rounded-[8px] shadow-[0px_4px_16px_rgba(0,0,0,0.12)] border border-[#E8EDF1] py-[4px] min-w-[170px]"
      style={{ top: '100%', right: 0, marginTop: '4px' }}
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={item.action}
          className="w-full text-left px-[16px] py-[12px] text-[14px] font-normal text-[#252A31] tracking-[0.2px] leading-[1.4] hover:bg-[#F8FAFC] active:bg-[#F1F5F9] transition-colors"
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

// ─── Mobile Add Section Bottom Sheet (just name input) ─────────────
function MobileAddSectionSheet({ onAdd, onClose }) {
  const [name, setName] = useState('')

  return (
    <div className="absolute inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[16px] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-[8px] pb-[4px] shrink-0">
          <div className="w-[36px] h-[4px] bg-[#CBD5E1] rounded-full" />
        </div>
        <div className="flex items-center justify-between px-[16px] pb-[12px] pt-[4px] border-b border-[#E8EDF1] shrink-0">
          <p className="font-semibold text-[16px] text-[#252A31]">Add Section</p>
          <button onClick={onClose} className="w-[32px] h-[32px] flex items-center justify-center">
            <CloseIcon size={20} className="text-[#64748B]" />
          </button>
        </div>
        <div className="px-[16px] py-[16px]">
          <label className="font-medium text-[13px] text-[#334155] mb-[6px] block">Section Name</label>
          <div className="bg-[#EFF2F5] rounded-[8px] overflow-hidden">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && name.trim()) onAdd(name.trim()) }}
              placeholder="e.g. Roofing Materials, Labor, etc."
              autoFocus
              className="w-full h-[44px] px-[14px] bg-transparent text-[14px] text-[#252A31] placeholder-[#94A3B8] outline-none"
            />
          </div>
        </div>
        <div className="border-t border-[#E8EDF1] px-[16px] py-[12px] flex items-center gap-[10px] shrink-0">
          <button onClick={onClose} className="flex-1 h-[44px] border border-[#E8EDF1] rounded-[8px] text-[14px] font-medium text-[#475569] bg-white active:bg-[#F8FAFC] transition-colors">Cancel</button>
          <button
            onClick={() => name.trim() && onAdd(name.trim())}
            disabled={!name.trim()}
            className="flex-1 h-[44px] bg-[#E44A19] rounded-[8px] text-[14px] font-medium text-white active:bg-[#D03F14] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Section
          </button>
        </div>
        <div className="h-[20px] shrink-0" />
      </div>
    </div>
  )
}

// ─── Mobile Toggle Switch ────────────────────────────────────────────
function MobileToggleSwitch({ checked, onChange, disabled = false }) {
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative w-[44px] h-[24px] rounded-full transition-colors shrink-0 ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
      } ${
        checked ? 'bg-[#E44A19]' : 'bg-[#CBD5E1]'
      }`}
    >
      <div className={`absolute top-[3px] w-[18px] h-[18px] bg-white rounded-full shadow-sm transition-transform ${
        checked ? 'left-[23px]' : 'left-[3px]'
      }`} />
    </button>
  )
}

// ─── Section Config Sheet (simplified - bottom sheet) ────────────────
function MobileSectionConfigSheet({ section, onUpdateDisplay, onUpdateSubtotal, onUpdateName, onUpdateChildPrices, onSave, onClose }) {
  const sectionDisplay = section?.sectionDisplay || 'expanded'
  const showSubtotal = section?.showSubtotal || false
  const showChildPrices = section?.showChildPrices !== false
  const isExpanded = sectionDisplay === 'expanded'
  const isCollapsed = sectionDisplay === 'collapsed'
  const isHidden = sectionDisplay === 'hidden'

  return (
    <div className="absolute inset-0 z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[16px] flex flex-col max-h-[85%] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-[8px] pb-[4px] shrink-0">
          <div className="w-[36px] h-[4px] bg-[#CBD5E1] rounded-full" />
        </div>
        <div className="flex items-center justify-between px-[16px] pb-[12px] pt-[4px] border-b border-[#E8EDF1] shrink-0">
          <p className="font-semibold text-[16px] text-[#252A31]">Section Settings</p>
          <button onClick={onClose} className="w-[32px] h-[32px] flex items-center justify-center">
            <CloseIcon size={20} className="text-[#64748B]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-[16px] py-[16px] min-h-0">
          {/* Section Name */}
          <div className="mb-[20px]">
            <label className="font-medium text-[13px] text-[#334155] mb-[6px] block">Section Name</label>
            <div className="bg-[#EFF2F5] rounded-[8px] overflow-hidden">
              <input
                type="text"
                value={section?.title || ''}
                onChange={(e) => onUpdateName(e.target.value)}
                placeholder="Enter section name"
                className="w-full h-[44px] px-[14px] bg-transparent text-[14px] text-[#252A31] placeholder-[#94A3B8] outline-none"
              />
            </div>
          </div>

          {/* Display Settings */}
          <h4 className="font-semibold text-[14px] text-[#252A31] mb-[10px]">Display Settings</h4>

          {/* Show child items */}
          <div className={`flex items-center justify-between py-[12px] px-[14px] rounded-[10px] mb-[6px] ${isHidden ? 'opacity-50' : 'active:bg-[#F8FAFC]'}`}>
            <div className="flex items-center gap-[10px] flex-1 min-w-0 pr-[12px]">
              <EyeIcon size={18} className="text-[#94A3B8] shrink-0" />
              <div>
                <span className="text-[13px] font-medium text-[#252A31]">Show Line-Items</span>
                    <p className="text-[10px] text-[#94A3B8] mt-[1px]">Expand items for customers</p>
              </div>
            </div>
            <MobileToggleSwitch checked={isExpanded} onChange={(val) => onUpdateDisplay(val ? 'expanded' : 'collapsed')} disabled={isHidden} />
          </div>

          {/* Show section total */}
          <div className={`flex items-center justify-between py-[12px] px-[14px] rounded-[10px] mb-[6px] ${isHidden ? 'opacity-50' : 'active:bg-[#F8FAFC]'}`}>
            <div className="flex items-center gap-[10px] flex-1 min-w-0 pr-[12px]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              <div>
                <span className="text-[13px] font-medium text-[#252A31]">Show section total</span>
                <p className="text-[10px] text-[#94A3B8] mt-[1px]">Display aggregate subtotal</p>
              </div>
            </div>
            <MobileToggleSwitch checked={showSubtotal} onChange={(val) => onUpdateSubtotal(val)} disabled={isHidden} />
          </div>

          {/* Show child prices — always visible, disabled when collapsed or hidden */}
          <div className={`flex items-center justify-between py-[12px] px-[14px] rounded-[10px] mb-[6px] ${(isCollapsed || isHidden) ? 'opacity-50' : 'active:bg-[#F8FAFC]'}`}>
            <div className="flex items-center gap-[10px] flex-1 min-w-0 pr-[12px]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              <div>
                <span className="text-[13px] font-medium text-[#252A31]">Show Line-Item Prices</span>
                    <p className="text-[10px] text-[#94A3B8] mt-[1px]">
                      {isCollapsed ? 'Enable "Show Line-Items" first' : 'Individual price per line item'}
                </p>
              </div>
            </div>
            <MobileToggleSwitch checked={showChildPrices} onChange={(val) => onUpdateChildPrices(val)} disabled={isCollapsed || isHidden} />
          </div>

          {/* Divider */}
          <div className="border-t border-[#E8EDF1] my-[8px]" />

          {/* Hide from proposal */}
          <div className="flex items-center justify-between py-[12px] px-[14px] rounded-[10px] active:bg-[#FEF2F2]/60">
            <div className="flex items-center gap-[10px] flex-1 min-w-0 pr-[12px]">
              <EyeOffIcon size={18} className={isHidden ? 'text-[#DC2626] shrink-0' : 'text-[#94A3B8] shrink-0'} />
              <div>
                <span className={`text-[13px] font-medium ${isHidden ? 'text-[#DC2626]' : 'text-[#252A31]'}`}>Hide Section</span>
                    <p className="text-[10px] text-[#94A3B8] mt-[1px]">Completely hide from customer view</p>
              </div>
            </div>
            <MobileToggleSwitch checked={isHidden} onChange={(val) => onUpdateDisplay(val ? 'hidden' : 'expanded')} />
          </div>

          {isHidden && (
            <div className="border border-[#FECACA] bg-[#FEF2F2] rounded-[10px] p-[12px] mt-[8px]">
              <div className="flex items-start gap-[10px]">
                <WarningIcon size={16} className="text-[#DC2626] shrink-0 mt-[1px]" />
                <p className="text-[11px] text-[#991B1B] leading-[16px]">
                  Section &amp; Line-Item level prices will be hidden for the customer. Only final total will be visible.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#E8EDF1] px-[16px] py-[12px] flex items-center gap-[10px] shrink-0">
          <button onClick={onClose} className="flex-1 h-[44px] border border-[#E8EDF1] rounded-[8px] text-[14px] font-medium text-[#475569] bg-white active:bg-[#F8FAFC] transition-colors">Cancel</button>
          <button
            onClick={onSave}
            disabled={!(section?.title?.trim())}
            className="flex-1 h-[44px] bg-[#E44A19] rounded-[8px] text-[14px] font-medium text-white active:bg-[#D03F14] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
        <div className="h-[20px] shrink-0" />
      </div>
    </div>
  )
}

// ─── Home Indicator ────────────────────────────────────────────────
function HomeIndicator() {
  return (
    <div className="flex flex-col items-center pt-[21px] pb-[8px] w-full">
      <div className="w-[134px] h-[5px] bg-black rounded-[100px]" />
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════════
export default function MobileProposalPage() {
  const [options, setOptions] = useState(INITIAL_OPTIONS)
  const [currentOptionIdx, setCurrentOptionIdx] = useState(0)
  const fileInputRef = useRef(null)

  // Add dropdown state
  const [showAddDropdown, setShowAddDropdown] = useState(false)
  const addBtnRef = useRef(null)

  // Kebab menu state
  const [kebabSectionId, setKebabSectionId] = useState(null)

  // Section config sheet state
  const [sectionConfigOpen, setSectionConfigOpen] = useState(false)
  const [configSection, setConfigSection] = useState(null)
  const [isAddingNewSection, setIsAddingNewSection] = useState(false)

  // UI-only: tracks which sections are visually collapsed in the builder
  const [collapsedSections, setCollapsedSections] = useState(new Set())

  const option = options[currentOptionIdx]
  const totalOptions = options.length

  // ── Handlers ──────────────────────────────────────────────────
  const handleQtyChange = (itemId, newQty) => {
    setOptions(prev => prev.map((opt, oi) => {
      if (oi !== currentOptionIdx) return opt
      return {
        ...opt,
        sections: opt.sections.map(sec => ({
          ...sec,
          items: sec.items.map(item =>
            item.id === itemId ? { ...item, qty: newQty } : item
          ),
        })),
      }
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setOptions(prev => prev.map((opt, oi) => {
        if (oi !== currentOptionIdx) return opt
        return { ...opt, image: reader.result }
      }))
    }
    reader.readAsDataURL(file)
  }

  // Toggle section collapse/expand (UI only - does NOT change customer-facing sectionDisplay)
  const handleToggleSectionCollapse = (sectionId) => {
    setCollapsedSections(prev => {
      const next = new Set(prev)
      if (next.has(sectionId)) {
        next.delete(sectionId)
      } else {
        next.add(sectionId)
      }
      return next
    })
  }

  // Toggle add dropdown
  const handleToggleAddDropdown = () => {
    setShowAddDropdown(prev => !prev)
  }

  // Dropdown actions
  const handleDropdownAddItem = () => {
    setShowAddDropdown(false)
    // In future: open line item picker
  }

  const handleDropdownAddFromGroup = () => {
    setShowAddDropdown(false)
    // In future: open group picker
  }

  const handleDropdownAddSection = () => {
    setShowAddDropdown(false)
    setIsAddingNewSection(true)
  }

  // Create section with just a name — defaults: expanded, subtotal enabled
  const handleCreateMobileSection = (name) => {
    const newSection = {
      id: `s-${Date.now()}`,
      title: name,
      sectionDisplay: 'expanded',
      showSubtotal: true,
      showChildPrices: true,
      items: [],
    }
    setOptions(prev => prev.map((opt, oi) => {
      if (oi !== currentOptionIdx) return opt
      return { ...opt, sections: [...opt.sections, newSection] }
    }))
    setIsAddingNewSection(false)
  }

  const handleDropdownCustomItem = () => {
    setShowAddDropdown(false)
    // In future: open custom item form
  }

  // Open section config for existing section
  const handleConfigureSection = (section) => {
    setConfigSection({ ...section })
    setIsAddingNewSection(false)
    setSectionConfigOpen(true)
  }

  // Clone a section
  const handleCloneSection = (section) => {
    const cloned = {
      ...section,
      id: `s-${Date.now()}`,
      title: `${section.title} (Copy)`,
      items: section.items.map(item => ({ ...item, id: `${item.id}-copy-${Date.now()}` })),
    }
    setOptions(prev => prev.map((opt, oi) => {
      if (oi !== currentOptionIdx) return opt
      const sectionIdx = opt.sections.findIndex(s => s.id === section.id)
      const newSections = [...opt.sections]
      newSections.splice(sectionIdx + 1, 0, cloned)
      return { ...opt, sections: newSections }
    }))
  }

  // Remove a section
  const handleRemoveSection = (sectionId) => {
    setOptions(prev => prev.map((opt, oi) => {
      if (oi !== currentOptionIdx) return opt
      return {
        ...opt,
        sections: opt.sections.filter(s => s.id !== sectionId),
      }
    }))
  }

  // Update section display mode in config
  const handleUpdateDisplay = (mode) => {
    setConfigSection(prev => {
      const updated = { ...prev, sectionDisplay: mode }
      if (mode === 'hidden') {
        // Hidden mode: toggles are disabled in UI, preserve values so they restore on unhide
      } else if (mode === 'collapsed') {
        // Collapsed: child prices not applicable (children are hidden), auto-disable
        updated.showChildPrices = false
      } else if (mode === 'expanded') {
        // Expanded: if child prices were auto-disabled by collapsed, restore to true
        if (prev.sectionDisplay === 'collapsed' || prev.showChildPrices === undefined) {
          updated.showChildPrices = true
        }
      }
      return updated
    })
  }

  // Save section configuration (existing sections only)
  const handleSaveSection = () => {
    {
      setOptions(prev => prev.map((opt, oi) => {
        if (oi !== currentOptionIdx) return opt
        return {
          ...opt,
          sections: opt.sections.map(s =>
            s.id === configSection.id
              ? {
                  ...s,
                  title: configSection.title,
                  sectionDisplay: configSection.sectionDisplay,
                  showSubtotal: configSection.showSubtotal,
                  showChildPrices: configSection.showChildPrices,
                }
              : s
          ),
        }
      }))
    }
    setSectionConfigOpen(false)
    setConfigSection(null)
    setIsAddingNewSection(false)
  }

  const handleCloseConfig = () => {
    setSectionConfigOpen(false)
    setConfigSection(null)
    setIsAddingNewSection(false)
  }

  // Add item to specific section (placeholder)
  const handleAddItemToSection = (sectionId) => {
    // In future: open line item picker for this section
  }

  // Compute total item count across all sections
  const totalItemCount = option.sections.reduce((sum, sec) => sum + sec.items.length, 0)

  return (
    <div className="bg-white flex flex-col items-start overflow-hidden relative w-full h-full max-w-[390px] mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ── Status Bar ── */}
      <StatusBar />

      {/* ── Title bar separator ── */}
      <Separator />

      {/* ── Nav Bar ── */}
      <div className="bg-white flex items-center gap-[24px] px-[12px] py-[10px] w-full shrink-0">
        {/* Back */}
        <button className="flex items-center shrink-0">
          <div className="w-[24px] h-[24px] shrink-0">
            <img alt="" className="block w-full h-full" src={ICO_CHEVRON_LEFT} />
          </div>
          <p className="font-medium text-[16px] text-[#252A31] tracking-[0.2px] leading-[1.4] text-center">Back</p>
        </button>
        {/* Title + actions */}
        <div className="flex flex-1 items-center justify-between min-w-0">
          <p className="font-medium text-[16px] text-[#252A31] tracking-[0.2px] leading-[1.4] text-center w-[191px]">
            Options ({currentOptionIdx + 1}/{totalOptions})
          </p>
          <div className="flex items-start gap-[10px] shrink-0">
            <button className="w-[24px] h-[24px] shrink-0">
              <img alt="Copy" className="block w-full h-full" src={ICO_COPY} />
            </button>
            <button className="w-[24px] h-[24px] shrink-0">
              <img alt="Delete" className="block w-full h-full" src={ICO_TRASH} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Scrollable Content ── */}
      <div className="flex flex-col items-start flex-1 overflow-x-hidden overflow-y-auto w-full">
        {/* ── Image + Name + Description Section ── */}
        <div className="bg-white w-full overflow-hidden shrink-0">
          <div className="flex flex-col items-center justify-center px-[10px] pt-[12px] w-full">
            <div className="w-full max-w-[370px]">
              {/* Cover Image */}
              <div className="relative h-[165px] w-full rounded-[8.71px] overflow-hidden">
                {option.image ? (
                  <img alt="" className="absolute inset-0 w-full h-full object-cover rounded-[8.71px]" src={option.image} />
                ) : (
                  <div className="absolute inset-0 bg-[#EFF2F5] rounded-[8.71px] flex items-center justify-center">
                    <p className="text-[14px] text-[#697D95]">No Image</p>
                  </div>
                )}
                {/* Change Image Tag */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute left-0 top-[130px] bg-[rgba(50,50,50,0.75)] flex items-center h-[26px] px-[12px] py-[8px] rounded-[4px]"
                >
                  <span className="font-medium text-[12px] text-white tracking-[0.17px] leading-[1.43] whitespace-nowrap" style={{ fontFamily: "'Roboto', 'Inter', sans-serif" }}>
                    Change Image
                  </span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Name field */}
              <div className="flex flex-col gap-[4px] items-start mt-[12px] w-full">
                <div className="flex gap-[4px] items-start font-medium text-[14px] tracking-[0.2px] leading-[1.4]">
                  <span className="text-[#252A31]">Name</span>
                  <span className="text-[#D21C1C]">*</span>
                </div>
                <div className="bg-[#EFF2F5] flex items-center overflow-hidden p-[12px] rounded-[6px] w-full">
                  <input
                    type="text"
                    value={option.name}
                    onChange={(e) => {
                      const val = e.target.value
                      setOptions(prev => prev.map((o, i) => i === currentOptionIdx ? { ...o, name: val } : o))
                    }}
                    className="bg-transparent font-normal text-[14px] text-[#252A31] tracking-[0.2px] leading-[1.4] outline-none w-full"
                  />
                </div>
              </div>

              {/* Description field */}
              <div className="flex flex-col gap-[4px] items-start mt-[12px] w-full pb-[12px]">
                <p className="font-medium text-[14px] text-[#252A31] tracking-[0.2px] leading-[1.4]">Description</p>
                <div className="bg-[#EFF2F5] flex items-center overflow-hidden p-[12px] rounded-[6px] w-full">
                  <textarea
                    value={option.description}
                    onChange={(e) => {
                      const val = e.target.value
                      setOptions(prev => prev.map((o, i) => i === currentOptionIdx ? { ...o, description: val } : o))
                    }}
                    rows={3}
                    className="bg-transparent font-normal text-[12px] text-[#252A31] tracking-[0.2px] leading-[1.4] outline-none w-full resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Line Items Card ── */}
        <div className="bg-white flex flex-col items-start rounded-[6px] w-full shrink-0">
          {/* Package header */}
          <div className="flex flex-col items-start px-[12px] py-[10px] border-b border-[#E8EDF1] w-full">
            <div className="flex items-center gap-[16px] w-full">
              <div className="flex-1 flex flex-col items-start min-w-0 leading-[1.4] tracking-[0.2px]">
                <p className="font-normal text-[12px] text-[#697D95]">{option.packageName}</p>
                <p className="font-semibold text-[16px] text-[#252A31]">{totalItemCount} items</p>
              </div>
              <button className="block w-[24px] h-[24px] shrink-0">
                <img alt="Reorder" className="block w-full h-full" src={ICO_FRAME} />
              </button>
              <div className="relative">
                <button ref={addBtnRef} onClick={handleToggleAddDropdown} className="block w-[24px] h-[24px] shrink-0">
                  <img alt="Add" className="block w-full h-full" src={ICO_PLUS} />
                </button>
                <AddDropdown
                  isOpen={showAddDropdown}
                  onClose={() => setShowAddDropdown(false)}
                  onAddItem={handleDropdownAddItem}
                  onAddFromGroup={handleDropdownAddFromGroup}
                  onAddSection={handleDropdownAddSection}
                  onCustomItem={handleDropdownCustomItem}
                  anchorRef={addBtnRef}
                />
              </div>
              <button className="block w-[24px] h-[24px] shrink-0">
                <img alt="Edit" className="block w-full h-full" src={ICO_EDIT} />
              </button>
              <button className="block w-[24px] h-[24px] shrink-0">
                <img alt="Settings" className="block w-full h-full" src={ICO_SETTINGS} />
              </button>
            </div>
          </div>

          {/* Sections + items */}
          <div className="flex flex-col items-start w-full">
            {option.sections.map((section) => {
              const isCollapsed = collapsedSections.has(section.id)
              return (
                <React.Fragment key={section.id}>
                  <MobileSectionHeader
                    section={section}
                    isCollapsed={isCollapsed}
                    onToggleCollapse={() => handleToggleSectionCollapse(section.id)}
                    isKebabOpen={kebabSectionId === section.id}
                    onToggleKebab={setKebabSectionId}
                    onConfigure={() => handleConfigureSection(section)}
                    onClone={() => handleCloneSection(section)}
                    onRemove={() => handleRemoveSection(section.id)}
                    onAddItem={() => handleAddItemToSection(section.id)}
                  />
                  {!isCollapsed && section.items.map((item) => (
                    <LineItemCard
                      key={item.id}
                      item={item}
                      onQtyChange={handleQtyChange}
                      sectionDisplay={section.sectionDisplay}
                    />
                  ))}
                </React.Fragment>
              )
            })}
          </div>

          {/* ── Summary section ── */}
          <div className="bg-white flex flex-col items-start w-full">
            {/* Sub Total */}
            <div className="flex items-center gap-[12px] font-medium px-[16px] py-[12px] text-right tracking-[0.2px] leading-[1.4] w-full">
              <div className="shrink-0 text-[#4F5E71] text-[12px] w-[192px]">
                <p className="mb-0">Sub Total</p>
                <p>
                  <span>with discount </span>
                  <span className="text-[#0172CB]">({option.discount})</span>
                </p>
              </div>
              <div className="flex-1 min-w-0 text-[#0172CB] text-[14px] font-medium uppercase">
                <p>{option.subtotal}</p>
              </div>
            </div>

            <Separator />

            {/* Tax */}
            <div className="flex items-center gap-[2px] px-[16px] py-[12px] w-full">
              <div className="flex items-start gap-[8px] pr-[7px] shrink-0 w-[192px]">
                <div className="w-[16px] h-[16px] shrink-0 overflow-hidden">
                  <img alt="" className="block w-full h-full" src={ICO_CANCEL_FILLED} />
                </div>
                <p className="flex-1 min-w-0 font-medium text-[12px] text-[#4F5E71] text-right tracking-[0.2px] leading-[1.4]">
                  <span>{option.taxLabel} </span>
                  <span className="text-[#0172CB]">({option.taxPercent})</span>
                </p>
              </div>
              <div className="shrink-0 w-[89px] font-medium text-[14px] text-[#0172CB] text-right tracking-[0.2px] leading-[1.4] uppercase">
                <p>{option.taxAmount}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Total */}
          <div className="flex items-center gap-[12px] p-[12px] text-right w-full">
            <p className="font-medium text-[12px] text-[#4F5E71] tracking-[0.2px] leading-[1.4] w-[157px] shrink-0">Total</p>
            <div className="flex-1 min-w-0 font-semibold text-[18px] text-[#0172CB] leading-[1.2]">
              <p>{option.total}</p>
            </div>
          </div>

          <Separator />
        </div>

        {/* Deposit row */}
        <div className="flex items-center gap-[12px] px-[16px] py-[12px] w-full">
          <div className="flex items-start gap-[8px] shrink-0 w-[192px]">
            <div className="w-[16px] h-[16px] shrink-0 overflow-hidden relative">
              <div className="absolute inset-[12.49%]">
                <img alt="" className="block w-full h-full" src={ICO_EDIT_FILLED} />
              </div>
            </div>
            <p className="flex-1 min-w-0 font-medium text-[12px] text-[#4F5E71] text-right tracking-[0.2px] leading-[1.4]">
              Deposit to collect
            </p>
          </div>
          <div className="flex-1 min-w-0 font-medium text-[14px] text-[#0172CB] text-right tracking-[0.2px] leading-[1.4] uppercase">
            <p>{option.deposit}</p>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar (fixed) ── */}
      <div className="bg-white border-t border-[rgba(0,0,0,0.1)] flex flex-col items-start overflow-hidden w-full shrink-0 shadow-[0px_-4.8px_14.4px_0px_rgba(0,0,0,0.18),0px_-25.6px_57.6px_0px_rgba(0,0,0,0.22)] rounded-t-[6px]">
        <div className="bg-white flex items-center gap-[12px] pl-[16px] pr-[12px] py-[10px] w-full">
          <div className="flex flex-1 items-center gap-[2px] min-w-0">
            <div className="flex-1 min-w-0 relative h-[49px]">
              <div className="flex flex-col justify-center h-[49px] w-full tracking-[0.46px]">
                <p className="font-bold text-[18px] text-[#252A31] leading-[22px] mb-0">{option.totalAmount}</p>
                <p className="text-[12px] text-[#0172CB] tracking-[0.36px] leading-[22px]">VIEW DETAILS</p>
              </div>
            </div>
            <button
              onClick={() => {
                window.history.pushState({}, '', '/mobile/proposal/details')
                window.dispatchEvent(new PopStateEvent('popstate'))
              }}
              className="bg-[#E44A19] flex items-center justify-center h-[44px] px-[12px] py-[4px] rounded-[6px] shrink-0"
            >
              <span className="font-bold text-[12px] text-white tracking-[0.46px] leading-[22px] text-center w-[98px]">Save</span>
            </button>
          </div>
        </div>
        <Separator />
      </div>

      {/* ── Home Indicator ── */}
      <HomeIndicator />


      {/* ── Add Section Name Sheet ── */}
      {isAddingNewSection && (
        <MobileAddSectionSheet
          onAdd={handleCreateMobileSection}
          onClose={() => setIsAddingNewSection(false)}
        />
      )}

      {/* ── Section Config Sheet ── */}
      {sectionConfigOpen && configSection && (
        <MobileSectionConfigSheet
          section={configSection}
          onUpdateDisplay={handleUpdateDisplay}
          onUpdateName={(name) => setConfigSection(prev => ({ ...prev, title: name }))}
          onUpdateSubtotal={(checked) => setConfigSection(prev => ({ ...prev, showSubtotal: checked }))}
          onUpdateChildPrices={(checked) => setConfigSection(prev => ({ ...prev, showChildPrices: checked }))}
          onSave={handleSaveSection}
          onClose={handleCloseConfig}
        />
      )}
    </div>
  )
}
