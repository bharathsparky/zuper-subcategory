import React, { useState } from 'react'

// ─── Asset paths (shared with MobileProposalPage) ──────────────────
const ASSETS = '/assets/mobile-proposal'
const IMG_PRODUCT = `${ASSETS}/7cedfbfb6d723ed95a9c12a4e11288387f2bd9a5.png`
const IMG_COVER = `${ASSETS}/1821226f40fd6f98c55b647c5fcbe0637e1f6d64.png`
const ICO_CHEVRON_LEFT = `${ASSETS}/679cc8780106e07bfb731c35acca12a3d82536ca.svg`
const ICO_CAP = `${ASSETS}/db61f70a21ad86561aa39cb04b6e284b47202818.svg`
const ICO_WIFI = `${ASSETS}/11056b1721385973e6b779b028d5783479f78fe9.svg`
const ICO_CELLULAR = `${ASSETS}/32ad76797a82fcc0c87056789b40cce1d1c1eda0.svg`

// ─── Section display color helpers ─────────────────────────────────
const SECTION_COLORS = {
  expanded: { bg: '#EFF6FF', border: '#3B82F6', badge: '#DBEAFE', badgeText: '#1D4ED8', badgeBorder: '#BFDBFE', itemBg: '#FAFBFF', itemBorder: '#BFDBFE' },
  collapsed: { bg: '#FFF7ED', border: '#F97316', badge: '#FFEDD5', badgeText: '#C2410C', badgeBorder: '#FED7AA', itemBg: '#FFFBF5', itemBorder: '#FED7AA' },
  hidden: { bg: '#FEF2F2', border: '#EF4444', badge: '#FEE2E2', badgeText: '#B91C1C', badgeBorder: '#FECACA', itemBg: '#FFFAFA', itemBorder: '#FECACA' },
}

// ─── Mock data ─────────────────────────────────────────────────────
const PROPOSAL_DATA = {
  proposalNo: 'PRO-2024-0147',
  proposalName: 'Residential Roof Replacement',
  status: 'Draft',
  createdBy: 'Marcus Chen',
  soldBy: 'Henry Jones',
  customerName: 'Johnson Residence',
  proposalDate: '02/09/2026',
  expiryDate: '03/09/2026',
  options: [
    {
      id: 1,
      name: 'Basic',
      description: 'Standard roofing package with essential materials and installation.',
      image: IMG_COVER,
      sections: [
        {
          id: 's1',
          title: 'Roofing Materials',
          sectionDisplay: 'expanded',
          showSubtotal: true,
          showChildPrices: true,
          items: [
            { id: 'i1', name: 'GAF Timberline HDZ Shingles', sku: '#RF-2041', image: IMG_PRODUCT, quantity: '24 SQ', unitPrice: '$145.00', total: '$3,480.00', taxNote: 'Taxable' },
            { id: 'i2', name: 'Synthetic Roof Underlayment', sku: '#RF-3082', image: IMG_PRODUCT, quantity: '6 Roll', unitPrice: '$130.00', total: '$780.00', taxNote: 'Taxable' },
            { id: 'i3', name: 'Drip Edge Flashing - 10ft', sku: '#RF-4420', image: IMG_PRODUCT, quantity: '26 PC', unitPrice: '$12.00', total: '$312.00', taxNote: 'Taxable' },
          ],
        },
        {
          id: 's2',
          title: 'Ventilation & Accessories',
          sectionDisplay: 'collapsed',
          showSubtotal: true,
          showChildPrices: false,
          items: [
            { id: 'i4', name: 'Cobra Snow Country Ridge Vent', sku: '#RF-1157', image: IMG_PRODUCT, quantity: '8 PC', unitPrice: '$25.00', total: '$200.00', taxNote: 'Taxable' },
            { id: 'i5', name: 'Starter Strip Shingles', sku: '#RF-6610', image: IMG_PRODUCT, quantity: '4 Bundle', unitPrice: '$45.00', total: '$180.00', taxNote: 'Taxable' },
          ],
        },
        {
          id: 's3',
          title: 'Labor & Installation',
          sectionDisplay: 'expanded',
          showSubtotal: true,
          showChildPrices: true,
          items: [
            { id: 'i6', name: 'Roof Tear-Off & Disposal', sku: '#SVC-8001', image: null, quantity: '24 SQ', unitPrice: '$90.00', total: '$2,160.00', taxNote: 'Non-Taxable' },
            { id: 'i7', name: 'Shingle Installation', sku: '#SVC-8002', image: null, quantity: '24 SQ', unitPrice: '$125.00', total: '$3,000.00', taxNote: 'Non-Taxable' },
          ],
        },
        {
          id: 's4',
          title: 'Cleanup & Disposal',
          sectionDisplay: 'hidden',
          showSubtotal: false,
          showChildPrices: false,
          items: [
            { id: 'i8', name: 'Dumpster Rental - 20 Yard', sku: '#SVC-9001', image: null, quantity: '1 EA', unitPrice: '$450.00', total: '$450.00', taxNote: 'Taxable' },
            { id: 'i9', name: 'Magnetic Nail Sweep & Cleanup', sku: '#SVC-9002', image: null, quantity: '1 EA', unitPrice: '$230.00', total: '$230.00', taxNote: 'Non-Taxable' },
          ],
        },
      ],
      subtotal: '$10,792.00',
      discount: '$150.00',
      taxLabel: 'Sales Tax',
      taxPercent: '8.25%',
      taxAmount: '$877.84',
      total: '$11,519.84',
      deposit: '$2,303.97',
    },
    {
      id: 2,
      name: 'Premium',
      description: 'Premium roofing package with upgraded materials and extended warranty.',
      image: null,
      sections: [
        {
          id: 's5',
          title: 'Premium Roofing Materials',
          sectionDisplay: 'expanded',
          showSubtotal: true,
          showChildPrices: true,
          items: [
            { id: 'i10', name: 'GAF Grand Sequoia Shingles', sku: '#RF-5001', image: IMG_PRODUCT, quantity: '24 SQ', unitPrice: '$210.00', total: '$5,040.00', taxNote: 'Taxable' },
            { id: 'i11', name: 'Premium Synthetic Underlayment', sku: '#RF-5002', image: IMG_PRODUCT, quantity: '6 Roll', unitPrice: '$165.00', total: '$990.00', taxNote: 'Taxable' },
          ],
        },
        {
          id: 's6',
          title: 'Extended Warranty Services',
          sectionDisplay: 'collapsed',
          showSubtotal: true,
          showChildPrices: false,
          items: [
            { id: 'i12', name: '25-Year Extended Warranty', sku: '#WRN-001', image: null, quantity: '1 EA', unitPrice: '$1,200.00', total: '$1,200.00', taxNote: 'Non-Taxable' },
          ],
        },
      ],
      subtotal: '$7,230.00',
      discount: '$0.00',
      taxLabel: 'Sales Tax',
      taxPercent: '8.25%',
      taxAmount: '$596.48',
      total: '$7,826.48',
      deposit: '$1,565.30',
    },
  ],
}

// ─── Status styles ─────────────────────────────────────────────────
const STATUS_STYLES = {
  Draft: { bg: '#FDF0E3', border: '#FAE2C7', text: '#AE5700' },
  Sent: { bg: '#E0F2FE', border: '#BAE6FD', text: '#0369A1' },
  Viewed: { bg: '#F0F9FF', border: '#BAE6FD', text: '#0284C7' },
  Accepted: { bg: '#E6F4EA', border: '#A8DAB5', text: '#1E7E34' },
  Rejected: { bg: '#FDECEA', border: '#F5C6CB', text: '#C62828' },
  Expired: { bg: '#F1F5F9', border: '#CBD5E1', text: '#64748B' },
}

// ─── SVG Icons ─────────────────────────────────────────────────────
const ChevronDownIcon = ({ size = 20, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const EyeIcon = ({ size = 16, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EyeOffIcon = ({ size = 16, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
)

const StackIcon = ({ size = 16, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
)

const DotsIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
)

const ShareIcon = ({ size = 18, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
)

const CubeIcon = ({ size = 24, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
  </svg>
)

const CheckCircleIcon = ({ size = 16, className = '' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
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
      <div className="absolute right-[16.67px] top-1/2 -translate-y-1/2 w-[22px] h-[11.333px] border border-[#252A31] rounded-[2.667px] opacity-35" />
      <div className="absolute right-[14.34px] top-1/2 -translate-y-1/2 w-[1.328px] h-[4px]">
        <img alt="" className="block w-full h-full" src={ICO_CAP} />
      </div>
      <div className="absolute right-[18.67px] top-1/2 -translate-y-1/2 w-[18px] h-[7.333px] bg-[#252A31] rounded-[1.333px]" />
      <div className="absolute right-[43.67px] top-1/2 -translate-y-1/2 w-[15.333px] h-[11px]">
        <img alt="" className="block w-full h-full" src={ICO_WIFI} />
      </div>
      <div className="absolute right-[64px] top-1/2 -translate-y-1/2 w-[17px] h-[10.667px]">
        <img alt="" className="block w-full h-full" src={ICO_CELLULAR} />
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

// ─── Status Badge ──────────────────────────────────────────────────
function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES['Draft']
  return (
    <div
      className="px-[8px] py-[3px] rounded-full border"
      style={{ backgroundColor: style.bg, borderColor: style.border }}
    >
      <span className="text-[12px] font-medium leading-[1.4] tracking-[0.2px]" style={{ color: style.text }}>
        {status}
      </span>
    </div>
  )
}

// ─── Section Header (Details view - read-only) ────────────────────
function DetailsSectionHeader({ section, isCollapsed, onToggle }) {
  const display = section.sectionDisplay || 'expanded'
  const colors = SECTION_COLORS[display]
  const badgeLabels = { expanded: 'Expanded', collapsed: 'Collapsed', hidden: 'Hidden' }
  const badgeIcons = { expanded: EyeIcon, collapsed: StackIcon, hidden: EyeOffIcon }
  const BadgeIcon = badgeIcons[display]

  const sectionTotal = section.items.reduce((sum, item) => {
    const val = parseFloat((item.total || '').replace(/[^0-9.-]/g, ''))
    return sum + (isNaN(val) ? 0 : val)
  }, 0)

  return (
    <div
      className="w-full"
      style={{ borderLeft: `3px solid ${colors.border}`, backgroundColor: colors.bg }}
    >
      <div className="flex items-center px-[12px] py-[10px] gap-[8px]">
        {/* Collapse chevron */}
        <button
          onClick={onToggle}
          className="w-[24px] h-[24px] flex items-center justify-center shrink-0"
        >
          <ChevronDownIcon
            size={18}
            className={`text-[#64748B] transition-transform duration-200 ${isCollapsed ? '-rotate-90' : ''}`}
          />
        </button>

        {/* Section title */}
        <p className="font-semibold text-[14px] text-[#1E293B] tracking-[0.2px] leading-[1.4] flex-1 min-w-0 truncate">
          {section.title}
        </p>

        {/* Display badge */}
        <span
          className="inline-flex items-center gap-[4px] text-[10px] font-semibold px-[6px] py-[2px] rounded-[4px] shrink-0 border"
          style={{
            backgroundColor: colors.badge,
            color: colors.badgeText,
            borderColor: colors.badgeBorder,
          }}
        >
          <BadgeIcon size={10} className="shrink-0" />
          {badgeLabels[display]}
        </span>

        {/* Item count */}
        <span className="text-[11px] text-[#94A3B8] shrink-0">
          {section.items.length} items
        </span>
      </div>

      {/* Section total */}
      {section.showSubtotal && (
        <div className="px-[12px] pb-[8px] flex items-center justify-between">
          <span className="text-[11px] text-[#64748B] font-medium pl-[32px]">Section Total</span>
          <span className="text-[12px] font-semibold text-[#1E293B]">
            ${sectionTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      )}
    </div>
  )
}

// ─── Line Item Row (Details view - read-only) ─────────────────────
function DetailsLineItem({ item, sectionDisplay }) {
  const colors = SECTION_COLORS[sectionDisplay] || SECTION_COLORS.expanded
  const isHiddenOrCollapsed = sectionDisplay === 'hidden' || sectionDisplay === 'collapsed'

  return (
    <div
      className="bg-white w-full"
      style={{ borderLeft: `3px solid ${colors.itemBorder}`, backgroundColor: colors.itemBg }}
    >
      <div className="flex gap-[10px] items-center px-[12px] py-[10px] w-full">
        {/* Product image / placeholder */}
        <div className="w-[40px] h-[40px] rounded-[6px] overflow-hidden bg-[#F1F5F9] flex items-center justify-center shrink-0">
          {item.image ? (
            <img alt="" className="w-full h-full object-cover" src={item.image} />
          ) : (
            <CubeIcon size={20} className="text-[#94A3B8]" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-[4px]">
            <p className="font-medium text-[13px] text-[#1E293B] truncate leading-[1.4]">{item.name}</p>
            {isHiddenOrCollapsed && (
              <EyeOffIcon size={12} className="text-[#94A3B8] shrink-0" />
            )}
          </div>
          <p className="text-[11px] text-[#64748B] leading-[1.4]">
            {item.sku} · {item.quantity}
          </p>
        </div>

        {/* Price */}
        <div className="text-right shrink-0">
          <p className="font-semibold text-[13px] text-[#1E293B] leading-[1.4]">{item.total}</p>
          <p className="text-[10px] text-[#94A3B8] leading-[1.3]">{item.taxNote}</p>
        </div>
      </div>
      <Separator />
    </div>
  )
}

// ─── Customer View Info Banner ─────────────────────────────────────
function CustomerViewBanner({ sectionDisplay }) {
  if (sectionDisplay === 'expanded') return null

  const messages = {
    collapsed: 'Customer sees only the section header with total',
    hidden: 'This section is hidden from customer view',
  }
  const bgColors = {
    collapsed: 'bg-[#FFF7ED]',
    hidden: 'bg-[#FEF2F2]',
  }
  const textColors = {
    collapsed: 'text-[#C2410C]',
    hidden: 'text-[#B91C1C]',
  }
  const icons = {
    collapsed: StackIcon,
    hidden: EyeOffIcon,
  }
  const Icon = icons[sectionDisplay]

  return (
    <div className={`${bgColors[sectionDisplay]} px-[12px] py-[6px] flex items-center gap-[6px]`} style={{ borderLeft: `3px solid ${SECTION_COLORS[sectionDisplay].border}` }}>
      <Icon size={12} className={textColors[sectionDisplay]} />
      <p className={`text-[10px] font-medium ${textColors[sectionDisplay]} leading-[1.4]`}>
        {messages[sectionDisplay]}
      </p>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════════
export default function MobileProposalDetailsPage() {
  const [activeTab, setActiveTab] = useState('details')
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(0)
  const [collapsedSections, setCollapsedSections] = useState(new Set())
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false)

  const proposal = PROPOSAL_DATA
  const selectedOption = proposal.options[selectedOptionIdx]

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'associated', label: 'Associated' },
    { id: 'notes', label: 'Notes' },
    { id: 'activity', label: 'Activity' },
  ]

  const handleToggleSection = (sectionId) => {
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

  // Compute total items across all sections
  const totalItems = selectedOption.sections.reduce((sum, sec) => sum + sec.items.length, 0)

  return (
    <div className="bg-white flex flex-col items-start overflow-hidden relative w-full h-full max-w-[390px] mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ── Status Bar ── */}
      <StatusBar />

      <Separator />

      {/* ── Nav Bar ── */}
      <div className="bg-white flex items-center justify-between px-[12px] py-[10px] w-full shrink-0 border-b border-[#E8EDF1]">
        <button
          onClick={() => window.history.back()}
          className="flex items-center shrink-0"
        >
          <div className="w-[24px] h-[24px] shrink-0">
            <img alt="" className="block w-full h-full" src={ICO_CHEVRON_LEFT} />
          </div>
          <p className="font-medium text-[16px] text-[#252A31] tracking-[0.2px] leading-[1.4]">Back</p>
        </button>
        <div className="flex items-center gap-[12px]">
          <button className="w-[28px] h-[28px] flex items-center justify-center">
            <ShareIcon size={20} className="text-[#252A31]" />
          </button>
          <button className="w-[28px] h-[28px] flex items-center justify-center">
            <DotsIcon size={24} className="text-[#252A31]" />
          </button>
        </div>
      </div>

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto w-full bg-[#F8FAFC]">
        {/* ── Proposal Header ── */}
        <div className="bg-white px-[16px] pt-[16px] pb-[12px]">
          {/* Proposal name + status */}
          <div className="flex items-start justify-between mb-[6px]">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-[#94A3B8] uppercase tracking-[0.5px] font-medium mb-[2px]">
                {proposal.proposalNo}
              </p>
              <h1 className="font-semibold text-[20px] text-[#1E293B] leading-[1.2] mb-[4px]">
                {proposal.proposalName}
              </h1>
            </div>
            <StatusBadge status={proposal.status} />
          </div>

          {/* Meta rows */}
          <div className="flex items-center gap-[16px] mb-[10px]">
            <div className="flex items-center gap-[4px]">
              <span className="text-[11px] text-[#94A3B8] uppercase tracking-wide">Created</span>
              <span className="text-[12px] font-medium text-[#0172CB]">{proposal.createdBy}</span>
            </div>
            <div className="w-px h-[12px] bg-[#E2E8F0]" />
            <div className="flex items-center gap-[4px]">
              <span className="text-[11px] text-[#94A3B8] uppercase tracking-wide">Sold</span>
              <span className="text-[12px] font-medium text-[#0172CB]">{proposal.soldBy}</span>
            </div>
          </div>

          {/* Customer */}
          <div className="flex items-center gap-[6px] mb-[12px]">
            <div className="w-[24px] h-[24px] rounded-full bg-[#EFF6FF] flex items-center justify-center">
              <span className="text-[10px] font-bold text-[#3B82F6]">
                {proposal.customerName.charAt(0)}
              </span>
            </div>
            <span className="text-[13px] font-medium text-[#1E293B]">{proposal.customerName}</span>
          </div>

          {/* Dates */}
          <div className="flex items-stretch bg-[#F8FAFC] rounded-[8px] border border-[#E8EDF1] overflow-hidden">
            <div className="flex-1 flex flex-col items-center gap-[2px] py-[10px]">
              <span className="text-[10px] text-[#94A3B8] uppercase tracking-wide font-medium">Proposal Date</span>
              <span className="text-[13px] text-[#1E293B] font-medium">{proposal.proposalDate}</span>
            </div>
            <div className="w-px bg-[#E8EDF1] self-stretch" />
            <div className="flex-1 flex flex-col items-center gap-[2px] py-[10px]">
              <span className="text-[10px] text-[#94A3B8] uppercase tracking-wide font-medium">Expiry Date</span>
              <span className="text-[13px] text-[#1E293B] font-medium">{proposal.expiryDate}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* ── Tab Navigation ── */}
        <div className="bg-white">
          <div className="flex items-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-[16px] py-[10px] text-center relative ${
                  activeTab === tab.id ? 'text-[#1E293B]' : 'text-[#94A3B8]'
                }`}
              >
                <span className="font-medium text-[13px] leading-[20px]">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[48px] h-[3px] bg-[#E44A19] rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[8px]" />

        {/* ── Option Selector Pills ── */}
        <div className="px-[12px] mb-[8px]">
          <div className="flex items-center gap-[8px]">
            {proposal.options.map((opt, idx) => {
              const isActive = idx === selectedOptionIdx
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedOptionIdx(idx)}
                  className={`flex items-center gap-[6px] px-[14px] py-[8px] rounded-full text-[13px] font-medium transition-all ${
                    isActive
                      ? 'bg-[#1E293B] text-white shadow-sm'
                      : 'bg-white text-[#64748B] border border-[#E8EDF1]'
                  }`}
                >
                  {isActive && <CheckCircleIcon size={14} className="text-white" />}
                  {opt.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Option Cover + Info ── */}
        <div className="mx-[12px] mb-[8px] bg-white rounded-[8px] border border-[#E8EDF1] overflow-hidden">
          {/* Cover image */}
          {selectedOption.image && (
            <div className="h-[120px] w-full overflow-hidden">
              <img alt="" className="w-full h-full object-cover" src={selectedOption.image} />
            </div>
          )}
          {/* Option info */}
          <div className="px-[12px] py-[10px]">
            <div className="flex items-center justify-between mb-[2px]">
              <h2 className="font-semibold text-[16px] text-[#1E293B] leading-[1.3]">
                {selectedOption.name}
              </h2>
              <span className="text-[11px] text-[#94A3B8]">
                {totalItems} items · {selectedOption.sections.length} sections
              </span>
            </div>
            {selectedOption.description && (
              <p className="text-[12px] text-[#64748B] leading-[1.5] line-clamp-2">
                {selectedOption.description}
              </p>
            )}
          </div>
        </div>

        {/* ── Sections + Line Items ── */}
        <div className="mx-[12px] mb-[8px] bg-white rounded-[8px] border border-[#E8EDF1] overflow-hidden">
          {/* Section list header */}
          <div className="flex items-center justify-between px-[12px] py-[10px] border-b border-[#E8EDF1]">
            <p className="font-semibold text-[14px] text-[#1E293B] leading-[1.4]">
              Line Items
            </p>
            <span className="text-[11px] text-[#94A3B8]">{totalItems} items</span>
          </div>

          {/* Sections */}
          {selectedOption.sections.map((section) => {
            const isCollapsed = collapsedSections.has(section.id)
            return (
              <div key={section.id}>
                <DetailsSectionHeader
                  section={section}
                  isCollapsed={isCollapsed}
                  onToggle={() => handleToggleSection(section.id)}
                />
                {/* Customer view info */}
                {!isCollapsed && (
                  <CustomerViewBanner sectionDisplay={section.sectionDisplay} />
                )}
                {/* Items */}
                {!isCollapsed && section.items.map((item) => (
                  <DetailsLineItem
                    key={item.id}
                    item={item}
                    sectionDisplay={section.sectionDisplay}
                  />
                ))}
              </div>
            )
          })}

          <Separator />

          {/* ── Financial Summary ── */}
          <div className="bg-white">
            {/* Subtotal */}
            <div className="flex items-center justify-between px-[12px] py-[10px]">
              <div>
                <p className="text-[12px] font-medium text-[#64748B]">Subtotal</p>
                {parseFloat(selectedOption.discount.replace(/[^0-9.-]/g, '')) > 0 && (
                  <p className="text-[10px] text-[#64748B]">
                    after discount <span className="text-[#0172CB]">(-{selectedOption.discount})</span>
                  </p>
                )}
              </div>
              <p className="font-medium text-[14px] text-[#0172CB] uppercase">{selectedOption.subtotal}</p>
            </div>

            <Separator />

            {/* Tax */}
            <div className="flex items-center justify-between px-[12px] py-[10px]">
              <p className="text-[12px] font-medium text-[#64748B]">
                {selectedOption.taxLabel} <span className="text-[#0172CB]">({selectedOption.taxPercent})</span>
              </p>
              <p className="font-medium text-[14px] text-[#0172CB] uppercase">{selectedOption.taxAmount}</p>
            </div>

            <Separator />

            {/* Total */}
            <div className="flex items-center justify-between px-[12px] py-[12px] bg-[#F8FAFC]">
              <p className="text-[13px] font-semibold text-[#1E293B]">Total</p>
              <p className="font-bold text-[18px] text-[#1E293B]">{selectedOption.total}</p>
            </div>

            <Separator />

            {/* Deposit */}
            <div className="flex items-center justify-between px-[12px] py-[10px]">
              <p className="text-[12px] font-medium text-[#64748B]">Deposit to collect</p>
              <p className="font-medium text-[14px] text-[#0172CB] uppercase">{selectedOption.deposit}</p>
            </div>
          </div>
        </div>

        {/* ── Section Display Legend ── */}
        <div className="mx-[12px] mb-[8px] bg-white rounded-[8px] border border-[#E8EDF1] overflow-hidden">
          <div className="px-[12px] py-[10px] border-b border-[#E8EDF1]">
            <p className="font-semibold text-[13px] text-[#1E293B]">Section Visibility Guide</p>
            <p className="text-[10px] text-[#94A3B8] mt-[1px]">How each section appears to the customer</p>
          </div>
          <div className="divide-y divide-[#E8EDF1]">
            {/* Expanded */}
            <div className="flex items-start gap-[10px] px-[12px] py-[10px]" style={{ borderLeft: `3px solid ${SECTION_COLORS.expanded.border}` }}>
              <div className="w-[28px] h-[28px] rounded-[6px] flex items-center justify-center shrink-0" style={{ backgroundColor: SECTION_COLORS.expanded.badge }}>
                <EyeIcon size={14} className="text-[#1D4ED8]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-[#1E293B]">Expanded</p>
                <p className="text-[10px] text-[#94A3B8] leading-[1.4]">Section header and all items visible to customer</p>
              </div>
            </div>
            {/* Collapsed */}
            <div className="flex items-start gap-[10px] px-[12px] py-[10px]" style={{ borderLeft: `3px solid ${SECTION_COLORS.collapsed.border}` }}>
              <div className="w-[28px] h-[28px] rounded-[6px] flex items-center justify-center shrink-0" style={{ backgroundColor: SECTION_COLORS.collapsed.badge }}>
                <StackIcon size={14} className="text-[#C2410C]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-[#1E293B]">Collapsed</p>
                <p className="text-[10px] text-[#94A3B8] leading-[1.4]">Customer sees section header with total only. Items are hidden.</p>
              </div>
            </div>
            {/* Hidden */}
            <div className="flex items-start gap-[10px] px-[12px] py-[10px]" style={{ borderLeft: `3px solid ${SECTION_COLORS.hidden.border}` }}>
              <div className="w-[28px] h-[28px] rounded-[6px] flex items-center justify-center shrink-0" style={{ backgroundColor: SECTION_COLORS.hidden.badge }}>
                <EyeOffIcon size={14} className="text-[#B91C1C]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-[#1E293B]">Hidden</p>
                <p className="text-[10px] text-[#94A3B8] leading-[1.4]">Entire section is hidden from customer view</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Attachments ── */}
        <div className="mx-[12px] mb-[12px] bg-white rounded-[8px] border border-[#E8EDF1] overflow-hidden">
          <div className="flex items-center justify-between px-[12px] py-[10px]">
            <p className="font-semibold text-[14px] text-[#1E293B]">Attachments</p>
            <span className="text-[11px] text-[#94A3B8]">0 files</span>
          </div>
          <Separator />
          <div className="flex flex-col items-center justify-center py-[24px]">
            <p className="text-[12px] text-[#94A3B8] mb-[8px]">No attachments yet</p>
            <button className="bg-[#F1F5F9] px-[16px] py-[8px] rounded-[6px]">
              <span className="font-semibold text-[13px] text-[#475569]">Add Attachment</span>
            </button>
          </div>
        </div>

        {/* Bottom spacer */}
        <div className="h-[80px]" />
      </div>

      {/* ── Bottom Bar ── */}
      <div className="bg-white border-t border-[#E8EDF1] w-full shrink-0 shadow-[0px_-2px_8px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-[10px] px-[12px] py-[10px]">
          <div className="flex-1 min-w-0">
            <p className="font-bold text-[18px] text-[#1E293B] leading-[22px]">
              {selectedOption.total}
            </p>
            <p className="text-[11px] text-[#94A3B8]">
              {selectedOption.name} option · {totalItems} items
            </p>
          </div>
          <button className="bg-[#E44A19] flex items-center justify-center h-[44px] px-[20px] rounded-[8px] shrink-0">
            <span className="font-bold text-[13px] text-white tracking-[0.3px]">Send to Customer</span>
          </button>
        </div>
      </div>

      {/* ── Home Indicator ── */}
      <HomeIndicator />
    </div>
  )
}
