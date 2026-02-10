import React, { useState } from 'react';
import { 
  IconChevronDown, 
  IconChevronRight,
  IconChevronUp,
  IconPrinter,
  IconFileText,
  IconSend,
  IconPlus,
  IconX,
  IconEye,
  IconEyeOff,
  IconStack2,
  IconCheck,
  IconMail,
  IconPhone,
  IconCopy,
  IconPencil,
  IconAlertTriangle,
  IconTrendingUp,
  IconTrendingDown,
  IconDotsVertical,
  IconClock,
  IconBuilding,
  IconUser,
  IconHome,
  IconFolder,
  IconBriefcase,
  IconPackage,
  IconShoppingCart,
  IconPaperclip,
  IconNotes,
  IconActivity,
  IconSettings,
  IconLayoutColumns,
} from '@tabler/icons-react';

// ─── Mock Data ──────────────────────────────────────────────────
const QUOTE_DATA = {
  quoteNo: '13341',
  quoteTitle: 'Residential Roof Replacement - 42 Oak Street',
  status: 'Accepted',
  job: { id: 'JOB-4521', title: 'Roof Replacement' },
  quoteDate: '02/07/2026',
  expiryDate: '02/08/2026',
  createdBy: 'Mike Johnson',
  quoteSoldBy: 'Mike Johnson',

  billingAddress: {
    name: 'David & Sarah Thompson',
    lines: ['42 Oak Street', 'Apt 2B', 'Austin', 'Texas - 78701'],
    phone: '+15129876543',
    email: 'thompson.roofing@email.com',
  },
  customerAddress: {
    name: 'David Thompson',
    lines: ['42 Oak Street', 'Residential Property', 'Austin', 'Texas - 78701'],
    phone: '+15129876543',
    email: 'thompson.roofing@email.com',
  },

  totalAmount: '$14,847.00',

  lineItems: [
    { id: 1, category: 'Roofing Materials', sectionDisplay: 'expanded', showSubtotal: true, items: [
      { id: 101, name: '#RF-2041 - GAF Timberline HDZ Shingles', desc: 'Lifetime architectural shingles with\nLayerLock™ technology.\nColor: Weathered Wood', unitCost: '$98.00', markup: '48%', taxPreference: 'Taxable', location: 'Main\nWarehouse\nA-12', brand: 'GAF', spec: 'Weathered Wood', quantity: '24 SQ', price: '$145.00', total: '$3,480.00', taxNote: 'Taxable', image: '/assets/shingles.jpg', hasTaxDetails: true, hasReadMore: true, readMoreText: 'Actual shingle color may vary from\ndigital representation.\nRead More' },
      { id: 102, name: '#RF-3082 - Synthetic Roof Underlayment', desc: 'High-performance synthetic underlayment\nfor superior moisture protection.', unitCost: '$85.00', markup: '53%', taxPreference: 'Taxable', location: 'Main\nWarehouse\nB-04', brand: 'CertainTeed', spec: '4ft × 250ft Roll', quantity: '6 Roll', price: '$130.00', total: '$780.00', taxNote: 'Taxable', image: '/assets/underlayment.jpg', hasReadMore: false },
      { id: 103, name: '#RF-4420 - Drip Edge Flashing - 10ft', desc: 'Aluminum drip edge flashing\nColor: Brown', unitCost: '$8.50', markup: '41%', taxPreference: 'Taxable', location: 'Main\nWarehouse\nC-07', brand: 'Amerimax', spec: '2×2 Profile', quantity: '26 PC', price: '$12.00', total: '$312.00', taxNote: 'Taxable', image: '/assets/drip-edge.jpg', isBundle: false },
    ]},
    { id: 2, category: 'Ventilation & Accessories', sectionDisplay: 'collapsed', showSubtotal: true, items: [
      { id: 201, name: '#RF-1157 - GAF Cobra Snow Country Ridge Vent - 4ft', unitCost: '$18.50', markup: '35%', taxPreference: 'Taxable', location: 'Warehouse', brand: 'GAF', spec: '4ft Section', quantity: '8 PC', price: '$25.00', total: '$200.00', image: null },
      { id: 202, name: '#RF-6610 - Starter Strip Shingles - Pro-Start', unitCost: '$32.00', markup: '41%', taxPreference: 'Taxable', location: 'Warehouse', brand: 'GAF', spec: '120 LF Bundle', quantity: '4 Bundle', price: '$45.00', total: '$180.00', image: null },
      { id: 203, name: '#RF-7715 - Hip & Ridge Cap Shingles - Seal-A-Ridge', unitCost: '$42.00', markup: '43%', taxPreference: 'Taxable', location: 'Warehouse', brand: 'GAF', spec: '25 LF Bundle', quantity: '3 Bundle', price: '$60.00', total: '$180.00', image: null },
    ]},
    { id: 3, category: 'Labor & Installation', sectionDisplay: 'expanded', showSubtotal: true, items: [
      { id: 301, name: '#SVC-8001 - Roof Tear-Off & Disposal', unitCost: '$65.00', markup: '38%', taxPreference: 'Tax Exempt', location: '---', brand: '', spec: 'Per Square', quantity: '24 SQ', price: '$90.00', total: '$2,160.00', taxNote: 'Non-Taxable', image: null },
      { id: 302, name: '#SVC-8002 - Shingle Installation - Architectural', unitCost: '$85.00', markup: '47%', taxPreference: 'Tax Exempt', location: '---', brand: '', spec: 'Per Square', quantity: '24 SQ', price: '$125.00', total: '$3,000.00', taxNote: 'Non-Taxable', image: null },
      { id: 303, name: '#SVC-8010 - Ridge Vent Installation', unitCost: '$4.00', markup: '50%', taxPreference: 'Tax Exempt', location: '---', brand: '', spec: 'Per LF', quantity: '32 LF', price: '$6.00', total: '$192.00', taxNote: 'Non-Taxable', image: null },
    ]},
    { id: 4, category: 'Cleanup & Disposal', sectionDisplay: 'hidden', showSubtotal: false, items: [
      { id: 401, name: '#SVC-9001 - Dumpster Rental - 20 Yard Roll-off', unitCost: '$350.00', markup: '29%', taxPreference: 'Taxable', location: '---', brand: '', spec: '', quantity: '1 EA', price: '$450.00', total: '$450.00', taxNote: 'Taxable', image: null },
      { id: 402, name: '#SVC-9002 - Magnetic Nail Sweep & Final Cleanup', unitCost: '$150.00', markup: '53%', taxPreference: 'Tax Exempt', location: '---', brand: '', spec: '', quantity: '1 EA', price: '$230.00', total: '$230.00', taxNote: 'Non-Taxable', image: null },
    ]},
  ],

  summary: {
    subTotal: '$11,164.00',
    taxes: [
      { name: 'Sales Tax (8.25%)', amount: '$920.53' },
      { name: 'Material Surcharge (2%)', amount: '$223.28' },
    ],
    total: '$14,847.00',
  },

  costBreakdown: {
    profitMargin: '38.2%',
    profitMarginNegative: false,
    cogs: '$6,898.00',
    quoteTotal: '$11,164.00',
    profit: '$4,266.00',
    profitNegative: false,
  },

  templates: {
    proposalTemplate: 'Residential Roofing Proposal',
    proposalLayout: 'Template of CertainTeed Residential Roofing',
    quoteTemplate: 'Roof Estimate - Standard',
    tradeType: 'Roofing',
    pricelist: 'GAF Certified 2026',
  },

  quoteStatusTimeline: [
    { label: 'Draft', date: '02/07/2026 09:45 AM', sub: 'Created by Mike Johnson', done: true },
    { label: 'Sent', date: '02/07/2026 10:12 AM', sub: 'Sent to David Thompson', done: true },
    { label: 'Viewed', date: '02/07/2026 11:30 AM', sub: 'Viewed by David Thompson', done: true },
    { label: 'Accepted', date: '02/07/2026 02:19 PM', sub: 'Accepted by David Thompson', done: true, isAccepted: true },
  ],

  organization: {
    letter: 'S',
    name: 'Summit Roofing & Exteriors',
    status: 'Active',
    customerCount: 142,
    address: '8500 Shoal Creek Blvd, Suite 200, Austin, Texas, 78757',
  },

  customer: {
    name: 'David Thompson',
    company: 'Summit Roofing & Exteriors',
    type: 'Residential',
    address: '42 Oak Street, Apt 2B, Austin, Texas, 78701',
  },

  otherDetails: [
    { label: 'Roof Type', value: 'Gable' },
    { label: 'Roof Pitch', value: '6/12' },
    { label: 'Total Squares', value: '24 SQ' },
    { label: 'Stories', value: '2' },
    { label: 'Existing Material', value: 'Asphalt Shingles (3-tab)' },
    { label: 'Layers to Remove', value: '1' },
    { label: 'Decking Condition', value: 'Good - Minor repairs needed' },
    { label: 'Permit Required', value: 'Yes' },
    { label: 'HOA Approval', value: 'Approved - Color: Weathered Wood' },
  ],

  testSection: [
    { label: 'Inspection Date', value: '01/28/2026' },
    { label: 'Inspector', value: 'Mike Johnson' },
    { label: 'Storm Damage', value: 'Hail - 1.5" diameter' },
    { label: 'Insurance Claim #', value: 'CLM-2026-087432' },
    { label: 'Adjuster Name', value: 'Robert Davis' },
    { label: 'Adjuster Phone', value: '+1 (512) 555-0198' },
    { label: 'Satellite Measurements', value: 'EagleView Report #EV-44521' },
    { label: 'Warranty Type', value: 'GAF Golden Pledge - 50 Year' },
    { label: 'Estimated Start Date', value: '02/15/2026' },
  ],
};

// ─── Sidebar items for icon strip ─────────────────────────────
const SIDEBAR_ITEMS = [
  { id: 'quote-status', label: 'Quote Status', icon: IconClock },
  { id: 'organization', label: 'Organization', icon: IconBuilding },
  { id: 'customer', label: 'Customer', icon: IconUser },
  { id: 'property', label: 'Property', icon: IconHome },
  { id: 'project', label: 'Project', icon: IconFolder },
  { id: 'job', label: 'Job', icon: IconBriefcase },
  { id: 'material-requests', label: 'Material Requests', icon: IconPackage },
  { id: 'purchase-orders', label: 'Purchase Orders', icon: IconShoppingCart },
  { id: 'attachments', label: 'Attachments', icon: IconPaperclip },
  { id: 'notes', label: 'Notes', icon: IconNotes },
  { id: 'quote-activity', label: 'Quote Activity', icon: IconActivity },
  { id: 'workflow-activity', label: 'Workflow Activity', icon: IconSettings },
];

// ─── Component ──────────────────────────────────────────────────
function QuoteDetailsPage({ onBack }) {
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(QUOTE_DATA.status);
  const [expandedSidebar, setExpandedSidebar] = useState({
    'quote-status': true,
    'organization': true,
    'customer': true,
  });
  const [costBreakdownOpen, setCostBreakdownOpen] = useState(true);
  const [collapsedSections, setCollapsedSections] = useState({});

  const toggleSidebarSection = (id) => {
    setExpandedSidebar(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSectionCollapse = (sectionId) => {
    setCollapsedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const statusOptions = ['Draft', 'Sent', 'Viewed', 'Accepted', 'Declined', 'Expired'];

  return (
    <div className="flex flex-col h-full bg-[#FCFCFC]">
      {/* ─── Top Bar ─── */}
      <div className="bg-white border-b border-[#E8EDF1]">
        <div className="h-[49px] flex items-center justify-between px-[21px]">
          {/* Breadcrumb */}
          <div className="flex items-center gap-[8px]">
            <button onClick={onBack} className="text-[14px] text-[#0172CB] hover:underline">Quotes</button>
            <IconChevronRight size={14} stroke={2} className="text-[#697D95]" />
            <span className="text-[14px] text-[#252A31]">
              Quote # {QUOTE_DATA.quoteNo} - {QUOTE_DATA.quoteTitle}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-[7px]">
            {/* New button */}
            <button className="h-[32px] px-[12px] flex items-center gap-[6px] border border-[#E8EDF1] rounded-[4px] text-[13px] font-medium text-[#252A31] hover:bg-[#FCFCFC] transition-colors">
              <span>New</span>
              <IconChevronDown size={13} stroke={2} />
            </button>
            {/* Print / PDF / Send group */}
            <div className="flex items-center border border-[#E8EDF1] rounded-[4px] overflow-hidden">
              <button className="h-[32px] px-[12px] flex items-center gap-[6px] text-[13px] text-[#252A31] hover:bg-[#FCFCFC] transition-colors border-r border-[#E8EDF1]">
                <IconPrinter size={15} stroke={1.5} />
                <span>Print</span>
                <IconChevronDown size={12} stroke={2} className="text-[#697D95]" />
              </button>
              <button className="h-[32px] px-[12px] flex items-center gap-[6px] text-[13px] text-[#252A31] hover:bg-[#FCFCFC] transition-colors border-r border-[#E8EDF1]">
                <IconFileText size={15} stroke={1.5} />
                <span>PDF</span>
                <IconChevronDown size={12} stroke={2} className="text-[#697D95]" />
              </button>
              <button className="h-[32px] px-[12px] flex items-center gap-[6px] text-[13px] text-[#252A31] hover:bg-[#FCFCFC] transition-colors">
                <IconSend size={15} stroke={1.5} />
                <span>Send</span>
              </button>
            </div>
            {/* More Actions */}
            <button className="h-[32px] px-[12px] flex items-center gap-[6px] border border-[#E8EDF1] rounded-[4px] text-[13px] text-[#252A31] hover:bg-[#FCFCFC] transition-colors">
              <span>More Actions</span>
              <IconChevronDown size={13} stroke={2} />
            </button>
          </div>
        </div>
      </div>

      {/* ─── Body ─── */}
      <div className="flex-1 flex overflow-hidden">
        {/* ─── Left Content ─── */}
        <div className="flex-1 overflow-y-auto p-[21px]">

          {/* ─── Job & Status Row ─── */}
          <div className="bg-white rounded-[4px] border border-[#E8EDF1] mb-[14px]">
            <div className="flex">
              <div className="flex-1 p-[14px] border-r border-[#E8EDF1]">
                <div className="text-[13px] text-[#697D95] mb-[4px]">Job</div>
                <div className="text-[13px] text-[#252A31]">{QUOTE_DATA.job.id || '---'}</div>
              </div>
              <div className="flex-1 p-[14px]">
                <div className="text-[13px] text-[#697D95] mb-[4px]">Status</div>
                <div className="relative">
                  <button
                    onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                    className="w-full h-[36px] px-[10px] flex items-center justify-between border border-[#E8EDF1] rounded-[4px] text-[13px] text-[#252A31] hover:border-[#CBD5E1] transition-colors"
                  >
                    <span>{currentStatus}</span>
                    <IconChevronDown size={16} stroke={1.5} className="text-[#697D95]" />
                  </button>
                  {statusDropdownOpen && (
                    <div className="absolute top-[40px] left-0 right-0 bg-white border border-[#E8EDF1] rounded-[4px] shadow-lg z-10">
                      {statusOptions.map(s => (
                        <button key={s} onClick={() => { setCurrentStatus(s); setStatusDropdownOpen(false); }}
                          className={`w-full px-[12px] py-[8px] text-left text-[13px] hover:bg-[#FCFCFC] ${currentStatus === s ? 'bg-[#EFF2F5] text-[#0172CB]' : 'text-[#252A31]'}`}
                        >{s}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ─── Main Info Card ─── */}
          <div className="bg-white rounded-[4px] border border-[#E8EDF1] mb-[14px]">
            {/* Logo row + ACCEPTED ribbon */}
            <div className="relative p-[21px] border-b border-[#E8EDF1] overflow-hidden">
              <div className="flex items-start">
                {/* Company logo */}
                <div>
                  <div className="flex items-center gap-[4px]">
                    <span className="text-[22px] font-extrabold text-[#252A31] tracking-tight italic">SUMMIT</span>
                  </div>
                  <div className="text-[7px] font-medium text-[#697D95] tracking-[0.15em] uppercase -mt-[2px]">Roofing & Exteriors</div>
                </div>
              </div>
              {/* ACCEPTED diagonal ribbon */}
              <div className="absolute -top-[2px] -right-[2px] w-[120px] h-[120px] overflow-hidden">
                <div
                  className="absolute bg-[#28A138] text-white text-[11px] font-semibold tracking-wide text-center py-[6px] w-[170px]"
                  style={{ top: '26px', right: '-40px', transform: 'rotate(45deg)', boxShadow: '0 2px 4px rgba(0,0,0,0.12)' }}
                >ACCEPTED</div>
              </div>
            </div>

            {/* Addresses + Quote Details */}
            <div className="flex p-[14px] gap-[14px]">
              {/* Billing Address */}
              <div className="flex-1 border border-[#E8EDF1] rounded-[4px] p-[12px]">
                <div className="text-[12px] font-semibold text-[#252A31] mb-[6px]">Billing Address</div>
                <div className="space-y-[1px] text-[12px] text-[#697D95] leading-[18px]">
                  <div className="font-medium text-[#252A31]">{QUOTE_DATA.billingAddress.name}</div>
                  {QUOTE_DATA.billingAddress.lines.map((l, i) => <div key={i}>{l}</div>)}
                  <div className="flex items-center gap-[6px] pt-[4px]">
                    <IconPhone size={13} stroke={1.5} className="text-[#697D95] flex-shrink-0" />
                    <span>{QUOTE_DATA.billingAddress.phone}</span>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <IconMail size={13} stroke={1.5} className="text-[#697D95] flex-shrink-0" />
                    <a href={`mailto:${QUOTE_DATA.billingAddress.email}`} className="text-[#0172CB] hover:underline">{QUOTE_DATA.billingAddress.email}</a>
                  </div>
                </div>
              </div>

              {/* Customer Address */}
              <div className="flex-1 border border-[#E8EDF1] rounded-[4px] p-[12px]">
                <div className="text-[12px] font-semibold text-[#252A31] mb-[6px]">Customer Address</div>
                <div className="space-y-[1px] text-[12px] text-[#697D95] leading-[18px]">
                  <div className="font-medium text-[#252A31]">{QUOTE_DATA.customerAddress.name}</div>
                  {QUOTE_DATA.customerAddress.lines.map((l, i) => <div key={i}>{l}</div>)}
                  <div className="flex items-center gap-[6px] pt-[4px]">
                    <IconPhone size={13} stroke={1.5} className="text-[#697D95] flex-shrink-0" />
                    <span>{QUOTE_DATA.customerAddress.phone}</span>
                  </div>
                  <div className="flex items-center gap-[6px]">
                    <IconMail size={13} stroke={1.5} className="text-[#697D95] flex-shrink-0" />
                    <a href={`mailto:${QUOTE_DATA.customerAddress.email}`} className="text-[#0172CB] hover:underline">{QUOTE_DATA.customerAddress.email}</a>
                  </div>
                </div>
              </div>

              {/* Right - Total Amount & Details */}
              <div className="w-[240px] flex-shrink-0 border border-[#E8EDF1] rounded-[4px] overflow-hidden">
                {/* Total Amount Header */}
                <div className="bg-[#FCFCFC] p-[12px] text-center border-b border-[#E8EDF1]">
                  <div className="text-[11px] text-[#4F5E71] font-medium uppercase tracking-wide">Total Amount</div>
                  <div className="text-[20px] font-semibold text-[#252A31]">{QUOTE_DATA.totalAmount}</div>
                </div>
                {/* Quote Detail Rows */}
                <div className="p-[12px] space-y-[6px]">
                  {[
                    ['Quote No', QUOTE_DATA.quoteNo],
                    ['Quote Date', QUOTE_DATA.quoteDate],
                    ['Expiry Date', QUOTE_DATA.expiryDate],
                    ['Created By', QUOTE_DATA.createdBy],
                    ['Quote Sold By', QUOTE_DATA.quoteSoldBy],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-[12px] text-[#697D95]">{label}</span>
                      <span className="text-[12px] text-[#252A31] font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── Line Items Table ─── */}
            <div className="border-t border-[#E8EDF1]">
              {/* Toolbar row */}
              <div className="flex justify-end px-[14px] py-[6px]">
                <button className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#EFF2F5] transition-colors" title="Table layout">
                  <IconLayoutColumns size={15} stroke={1.5} className="text-[#697D95]" />
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[960px]">
                  <thead>
                    <tr className="bg-[#FCFCFC] border-b border-t border-[#E8EDF1]">
                      <th className="w-[44px] px-[12px] py-[10px] text-left text-[12px] font-medium text-[#4F5E71]">#</th>
                      <th className="px-[12px] py-[10px] text-left text-[12px] font-medium text-[#4F5E71]">Product / Service</th>
                      <th className="w-[100px] px-[12px] py-[10px] text-left text-[12px] font-medium text-[#4F5E71]">Unit Cost</th>
                      <th className="w-[70px] px-[12px] py-[10px] text-left text-[12px] font-medium text-[#4F5E71]">Markup</th>
                      <th className="w-[110px] px-[12px] py-[10px] text-left text-[12px] font-medium text-[#4F5E71]">Tax Preference</th>
                      <th className="w-[100px] px-[12px] py-[10px] text-left text-[12px] font-medium text-[#4F5E71]">Location</th>
                      <th className="w-[60px] px-[12px] py-[10px] text-left text-[12px] font-medium text-[#4F5E71]">Brand</th>
                      <th className="w-[90px] px-[12px] py-[10px] text-left text-[12px] font-medium text-[#4F5E71]">Specification</th>
                      <th className="w-[130px] px-[12px] py-[10px] text-left text-[12px] font-medium text-[#4F5E71]">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {QUOTE_DATA.lineItems.map((category) => {
                      const displayMode = category.sectionDisplay || 'expanded';
                      const isExpanded = displayMode === 'expanded';
                      const isCollapsed = displayMode === 'collapsed';
                      const isHidden = displayMode === 'hidden';

                      const sectionTotal = category.items.reduce((sum, item) => {
                        const val = parseFloat((item.total || '').replace(/[^0-9.-]/g, ''));
                        return sum + (isNaN(val) ? 0 : val);
                      }, 0);

                      const isSectionCollapsedInUI = collapsedSections[category.id] ?? false;

                      return (
                        <React.Fragment key={category.id}>
                          {/* Section Header Row */}
                          <tr className={`border-b border-[#E8EDF1] border-l-[3px] ${
                            isHidden ? 'border-l-[#E8A0BF] bg-[#FDF2F8]/40' :
                            isCollapsed ? 'border-l-[#D4B896] bg-[#FFFBF5]/40' :
                            'border-l-[#0172CB] bg-[#FCFCFC]'
                          }`}>
                            <td colSpan={9} className="px-[12px] py-[10px]">
                              <div className="flex items-center gap-[10px]">
                                {/* Accordion chevron */}
                                <button
                                  onClick={() => toggleSectionCollapse(category.id)}
                                  className="w-[20px] h-[20px] flex items-center justify-center rounded hover:bg-black/5 transition-colors flex-shrink-0"
                                >
                                  <IconChevronDown
                                    size={14}
                                    stroke={2}
                                    className={`text-[#697D95] transition-transform ${isSectionCollapsedInUI ? '-rotate-90' : ''}`}
                                  />
                                </button>
                                <span className="text-[13px] font-semibold text-[#252A31]">{category.category}</span>
                                {/* Item count when collapsed */}
                                {isSectionCollapsedInUI && (
                                  <span className="text-[11px] text-[#697D95]">({category.items.length} items)</span>
                                )}
                                {/* Display Mode Badge with tooltip */}
                                <span
                                  title={
                                    isExpanded
                                      ? 'Expanded: Section header and all items visible to customer.'
                                      : isCollapsed
                                      ? 'Collapsed: Customer sees only the section header with total. Items are hidden from customer.'
                                      : 'Hidden: Entire section is hidden from customer view.'
                                  }
                                  className={`inline-flex items-center gap-1 px-[6px] py-[2px] rounded-[4px] text-[10px] font-medium cursor-default ${
                                    isHidden
                                      ? 'bg-[#FDF2F8] text-[#9D174D] border border-[#FBCFE8]/60'
                                      : isCollapsed
                                      ? 'bg-[#FFFBF5] text-[#92400E] border border-[#FDE68A]/50'
                                      : 'bg-[#EBF4EC] text-[#28A138] border border-[#CDDFCF]/60'
                                  }`}
                                >
                                  {isHidden ? <IconEyeOff className="w-3 h-3" /> : isCollapsed ? <IconStack2 className="w-3 h-3" /> : <IconEye className="w-3 h-3" />}
                                  {isExpanded ? 'Expanded' : isCollapsed ? 'Collapsed' : 'Hidden'}
                                </span>
                                {/* Section total */}
                                {category.showSubtotal && (
                                  <span className="ml-auto text-[11px] text-[#4F5E71]">
                                    Section Total: <span className="font-semibold text-[#252A31]">${sectionTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                                  </span>
                                )}
                              </div>
                            </td>
                          </tr>

                          {/* Items — always present, accordion controls UI collapse */}
                          {!isSectionCollapsedInUI && category.items.map((item, idx) => (
                            <React.Fragment key={item.id}>
                              <tr className={`border-b border-[#E8EDF1] hover:bg-[#FAFBFC] border-l-[3px] ${
                                isHidden ? 'border-l-[#E8A0BF]' :
                                isCollapsed ? 'border-l-[#D4B896]' :
                                'border-l-[#0172CB]'
                              }`}>
                                <td className="px-[12px] py-[12px] text-[12px] text-[#697D95] align-top">{idx + 1}</td>
                                <td className="px-[12px] py-[12px] align-top">
                                  <div className="flex items-start gap-[10px]">
                                    <div className="w-[40px] h-[40px] bg-[#EFF2F5] rounded-[4px] overflow-hidden flex-shrink-0 flex items-center justify-center">
                                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="#697D95" strokeWidth="1.5"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="#697D95" strokeWidth="1.5"/></svg>
                                    </div>
                                    <div className="min-w-0">
                                      <div className="flex items-center gap-[6px]">
                                        <span className="text-[12px] text-[#0172CB] leading-[16px]">{item.name}</span>
                                        {isHidden && (
                                          <span className="inline-flex items-center gap-[3px] text-[9px] text-[#9D174D]/50" title="This item is hidden from customer view">
                                            <IconEyeOff size={10} stroke={1.5} />
                                          </span>
                                        )}
                                        {isCollapsed && (
                                          <span className="inline-flex items-center gap-[3px] text-[9px] text-[#92400E]/40" title="This item is inside a collapsed section — customer sees only the section header">
                                            <IconEyeOff size={10} stroke={1.5} />
                                          </span>
                                        )}
                                      </div>
                                      {item.desc && (
                                        <div className="text-[10px] text-[#697D95] mt-[2px] leading-[14px] whitespace-pre-line">{item.desc}</div>
                                      )}
                                      {item.hasReadMore && (
                                        <button className="text-[10px] text-[#0172CB] hover:underline mt-[1px]">Read More</button>
                                      )}
                                      {item.isBundle && (
                                        <div className="flex items-center gap-[4px] mt-[2px]">
                                          <IconChevronDown size={12} stroke={2} className="text-[#697D95]" />
                                          <button className="text-[10px] text-[#0172CB] hover:underline">{item.bundleCount} item(s)</button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-[12px] py-[12px] text-[12px] text-[#252A31] align-top">{item.unitCost}</td>
                                <td className="px-[12px] py-[12px] text-[12px] text-[#697D95] align-top">{item.markup}</td>
                                <td className="px-[12px] py-[12px] text-[12px] text-[#252A31] align-top">{item.taxPreference}</td>
                                <td className="px-[12px] py-[12px] text-[12px] text-[#252A31] align-top whitespace-pre-line">{item.location}</td>
                                <td className="px-[12px] py-[12px] text-[12px] text-[#252A31] align-top">{item.brand || ''}</td>
                                <td className="px-[12px] py-[12px] text-[12px] text-[#252A31] align-top">{item.spec || ''}</td>
                                <td className="px-[12px] py-[12px] text-[12px] text-[#252A31] align-top whitespace-nowrap">
                                  <div>{item.quantity} <span className="text-[#697D95]">×</span> {item.price}</div>
                                  <div className="text-[10px] text-[#697D95] mt-[1px]">{item.taxNote}</div>
                                </td>
                              </tr>
                            </React.Fragment>
                          ))}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* ─── Summary ─── */}
              <div className="border-t border-[#E8EDF1]">
                {[
                  ['Sub-Total', QUOTE_DATA.summary.subTotal, false],
                  ...QUOTE_DATA.summary.taxes.map(t => [t.name, t.amount, false]),
                  ['Total', QUOTE_DATA.summary.total, true],
                ].map(([label, val, isBold], i) => (
                  <div key={i} className="flex justify-end border-b border-[#E8EDF1] last:border-b-0">
                    <div className={`w-[160px] px-[12px] py-[8px] text-[12px] font-medium ${isBold ? 'text-[#4F5E71] text-[12px]' : 'text-[#4F5E71]'}`}>{label}</div>
                    <div className={`w-[140px] px-[12px] py-[8px] text-right ${isBold ? 'font-semibold text-[#0172CB] text-[16px]' : 'font-medium text-[#252A31] text-[13px]'}`}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Cost & Profit Breakdown ─── */}
          <div className="bg-white rounded-[4px] border border-[#E8EDF1] mb-[14px]">
            <button
              onClick={() => setCostBreakdownOpen(!costBreakdownOpen)}
              className="w-full h-[44px] px-[14px] flex items-center justify-between hover:bg-[#FCFCFC] transition-colors"
            >
              <span className="text-[14px] font-semibold text-[#252A31]">Cost & Profit Breakdown</span>
              <IconChevronUp size={16} stroke={2} className={`text-[#697D95] transition-transform ${costBreakdownOpen ? '' : 'rotate-180'}`} />
            </button>
            {costBreakdownOpen && (
              <div className="px-[14px] pb-[14px] border-t border-[#E8EDF1] pt-[14px]">
                <div className="grid grid-cols-4 gap-[14px]">
                  {/* Profit Margin */}
                  <div className="flex items-center gap-[10px]">
                    <div className={`w-[36px] h-[36px] rounded-full flex items-center justify-center ${QUOTE_DATA.costBreakdown.profitMarginNegative ? 'bg-[#FEF2F2]' : 'bg-[#EBF4EC]'}`}>
                      <IconTrendingDown size={18} stroke={1.5} className={QUOTE_DATA.costBreakdown.profitMarginNegative ? 'text-[#EF4444]' : 'text-[#28A138]'} />
                    </div>
                    <div>
                      <div className="text-[11px] text-[#697D95]">Profit Margin</div>
                      <div className={`text-[14px] font-bold ${QUOTE_DATA.costBreakdown.profitMarginNegative ? 'text-[#EF4444]' : 'text-[#252A31]'}`}>{QUOTE_DATA.costBreakdown.profitMargin}</div>
                    </div>
                  </div>
                  {/* COGS */}
                  <div className="flex items-center gap-[10px]">
                    <div className="w-[36px] h-[36px] rounded-full bg-[#FEF2F2] flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#EF4444" strokeWidth="1.5"/><path d="M12 8V12M12 16H12.01" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#697D95] flex items-center gap-[3px]">COGS <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#697D95" strokeWidth="1.5"/><path d="M8 5.5V8.5M8 10.5H8.005" stroke="#697D95" strokeWidth="1.5" strokeLinecap="round"/></svg></div>
                      <div className="text-[14px] font-bold text-[#252A31]">{QUOTE_DATA.costBreakdown.cogs}</div>
                    </div>
                  </div>
                  {/* Quote Total */}
                  <div className="flex items-center gap-[10px]">
                    <div className="w-[36px] h-[36px] rounded-full bg-[#E8F4FD] flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#0172CB" strokeWidth="1.5"/><path d="M8 10H16M8 14H12" stroke="#0172CB" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </div>
                    <div>
                      <div className="text-[11px] text-[#697D95]">Quote Total</div>
                      <div className="text-[14px] font-bold text-[#252A31]">{QUOTE_DATA.costBreakdown.quoteTotal}</div>
                    </div>
                  </div>
                  {/* Profit */}
                  <div className="flex items-center gap-[10px]">
                    <div className={`w-[36px] h-[36px] rounded-full flex items-center justify-center ${QUOTE_DATA.costBreakdown.profitNegative ? 'bg-[#FEF2F2]' : 'bg-[#EBF4EC]'}`}>
                      {QUOTE_DATA.costBreakdown.profitNegative
                        ? <IconTrendingDown size={18} stroke={1.5} className="text-[#EF4444]" />
                        : <IconTrendingUp size={18} stroke={1.5} className="text-[#28A138]" />
                      }
                    </div>
                    <div>
                      <div className="text-[11px] text-[#697D95]">Profit</div>
                      <div className={`text-[14px] font-bold ${QUOTE_DATA.costBreakdown.profitNegative ? 'text-[#EF4444]' : 'text-[#28A138]'}`}>{QUOTE_DATA.costBreakdown.profit}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ─── Templates & Trade ─── */}
          <div className="bg-white rounded-[4px] border border-[#E8EDF1] mb-[14px] p-[14px]">
            <div className="grid grid-cols-3 gap-[14px] mb-[14px]">
              <div>
                <div className="text-[12px] text-[#697D95] mb-[2px]">Proposal Template</div>
                <div className="text-[12px] text-[#252A31]">{QUOTE_DATA.templates.proposalTemplate}</div>
              </div>
              <div>
                <div className="text-[12px] text-[#697D95] mb-[2px]">Proposal Layout</div>
                <div className="text-[12px] text-[#252A31]">{QUOTE_DATA.templates.proposalLayout}</div>
              </div>
              <div>
                <div className="text-[12px] text-[#697D95] mb-[2px]">Quote Template</div>
                <div className="text-[12px] text-[#252A31]">{QUOTE_DATA.templates.quoteTemplate}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-[14px]">
              <div>
                <div className="text-[12px] text-[#697D95] mb-[2px]">Trade Type</div>
                <div className="text-[12px] text-[#252A31]">{QUOTE_DATA.templates.tradeType}</div>
              </div>
              <div>
                <div className="text-[12px] text-[#697D95] mb-[2px]">Pricelist</div>
                <div className="text-[12px] text-[#252A31]">{QUOTE_DATA.templates.pricelist}</div>
              </div>
            </div>
          </div>

          {/* ─── Description ─── */}
          <div className="bg-white rounded-[4px] border border-[#E8EDF1] mb-[14px]">
            <div className="px-[14px] py-[10px] border-b border-[#E8EDF1]">
              <h3 className="text-[14px] font-semibold text-[#252A31]">Scope of Work</h3>
            </div>
            <div className="p-[14px]">
              <p className="text-[12px] text-[#697D95] leading-[18px]">
                Complete tear-off and replacement of existing 3-tab asphalt shingle roof system. Work includes removal and disposal of existing roofing materials (1 layer), inspection and repair of roof decking as needed, installation of synthetic underlayment, GAF Timberline HDZ architectural shingles (Weathered Wood), new drip edge flashing, starter strips, hip & ridge caps, and ridge vent system. All work performed per local building codes with required permits. Includes magnetic nail sweep and final site cleanup. Covered by GAF Golden Pledge 50-Year warranty.
              </p>
            </div>
          </div>

          {/* ─── Other Details ─── */}
          <div className="bg-white rounded-[4px] border border-[#E8EDF1] mb-[14px]">
            <div className="flex items-center justify-between px-[14px] py-[10px] border-b border-[#E8EDF1]">
              <h3 className="text-[14px] font-semibold text-[#252A31]">Roof Details</h3>
              <button className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#EFF2F5]">
                <IconPencil size={14} stroke={1.5} className="text-[#0172CB]" />
              </button>
            </div>
            <div className="p-[14px]">
              <div className="grid grid-cols-3 gap-x-[14px] gap-y-[12px]">
                {QUOTE_DATA.otherDetails.map((f, i) => (
                  <div key={i}>
                    <div className="text-[11px] font-medium text-[#252A31] mb-[2px]">{f.label}</div>
                    <div className="text-[12px] text-[#697D95]">{f.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Test Section ─── */}
          <div className="bg-white rounded-[4px] border border-[#E8EDF1] mb-[14px]">
            <div className="flex items-center justify-between px-[14px] py-[10px] border-b border-[#E8EDF1]">
              <h3 className="text-[14px] font-semibold text-[#252A31]">Roof Inspection & Insurance</h3>
              <button className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#EFF2F5]">
                <IconPencil size={14} stroke={1.5} className="text-[#0172CB]" />
              </button>
            </div>
            <div className="p-[14px]">
              <div className="grid grid-cols-3 gap-x-[14px] gap-y-[12px]">
                {QUOTE_DATA.testSection.map((f, i) => (
                  <div key={i}>
                    <div className="text-[11px] font-medium text-[#252A31] mb-[2px]">{f.label}</div>
                    <div className="text-[12px] text-[#697D95]">{f.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ─── Right Sidebar ─── */}
        <div className="w-[300px] bg-white border-l border-[#E8EDF1] flex flex-shrink-0">
          {/* Main sidebar content */}
          <div className="flex-1 overflow-y-auto">

            {/* ── Quote Status ── */}
            <div className="border-b border-[#E8EDF1]">
              <button
                onClick={() => toggleSidebarSection('quote-status')}
                className="w-full h-[42px] px-[14px] flex items-center justify-between hover:bg-[#FCFCFC] transition-colors"
              >
                <div className="flex items-center gap-[8px]">
                  <IconClock size={18} stroke={1.5} className="text-[#697D95]" />
                  <span className="text-[13px] font-medium text-[#252A31]">Quote Status</span>
                </div>
                <IconChevronDown size={14} stroke={2} className={`text-[#697D95] transition-transform ${expandedSidebar['quote-status'] ? 'rotate-180' : ''}`} />
              </button>
              {expandedSidebar['quote-status'] && (
                <div className="px-[14px] pb-[14px]">
                  <div className="relative pl-[20px]">
                    {/* Timeline line */}
                    <div className="absolute left-[7px] top-[10px] bottom-[10px] w-[2px] bg-[#E8EDF1]"></div>
                    {QUOTE_DATA.quoteStatusTimeline.map((ev, i) => (
                      <div key={i} className="relative flex items-start gap-[10px] mb-[12px] last:mb-0">
                        <div className="absolute left-[-20px] top-[2px] w-[16px] h-[16px] rounded-full bg-[#28A138] flex items-center justify-center z-10">
                          <IconCheck size={10} stroke={3} className="text-white" />
                        </div>
                        <div>
                          {ev.label && (
                            <div className={`text-[12px] font-semibold ${ev.isAccepted ? 'text-[#28A138]' : 'text-[#252A31]'}`}>
                              {ev.label}
                            </div>
                          )}
                          <div className="text-[11px] text-[#697D95]">{ev.date}</div>
                          <div className="text-[11px] text-[#697D95]">{ev.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Gray placeholder image */}
                  <div className="mt-[12px] w-full h-[80px] bg-[#EFF2F5] rounded-[4px] flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#CBD5E1" strokeWidth="1.5"/><circle cx="8.5" cy="8.5" r="1.5" stroke="#CBD5E1" strokeWidth="1.5"/><path d="M21 15L16 10L5 21" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              )}
            </div>

            {/* ── Organization ── */}
            <div className="border-b border-[#E8EDF1]">
              <button
                onClick={() => toggleSidebarSection('organization')}
                className="w-full h-[42px] px-[14px] flex items-center justify-between hover:bg-[#FCFCFC] transition-colors"
              >
                <div className="flex items-center gap-[8px]">
                  <IconBuilding size={18} stroke={1.5} className="text-[#697D95]" />
                  <span className="text-[13px] font-medium text-[#252A31]">Organization</span>
                </div>
                <IconChevronDown size={14} stroke={2} className={`text-[#697D95] transition-transform ${expandedSidebar['organization'] ? 'rotate-180' : ''}`} />
              </button>
              {expandedSidebar['organization'] && (
                <div className="px-[14px] pb-[14px] space-y-[8px]">
                  <div className="flex items-center gap-[8px]">
                    <div className="w-[28px] h-[28px] rounded-full bg-[#FFC107] flex items-center justify-center text-white text-[13px] font-bold">{QUOTE_DATA.organization.letter}</div>
                    <span className="text-[12px] font-medium text-[#252A31]">{QUOTE_DATA.organization.name}</span>
                    <span className="ml-auto px-[8px] py-[1px] text-[10px] font-medium text-[#DC2626] bg-white border border-[#DC2626] rounded">{QUOTE_DATA.organization.status}</span>
                  </div>
                  <div className="flex items-center gap-[6px] text-[11px] text-[#697D95]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="7" r="4" stroke="#697D95" strokeWidth="1.5"/><path d="M4 20C4 16.134 7.582 13 12 13C16.418 13 20 16.134 20 20" stroke="#697D95" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    <span>{QUOTE_DATA.organization.customerCount} Customers</span>
                  </div>
                  <div className="flex items-start gap-[6px] text-[11px] text-[#697D95]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-[1px] flex-shrink-0"><circle cx="12" cy="10" r="3" stroke="#697D95" strokeWidth="1.5"/><path d="M12 21C12 21 4 15 4 10C4 5.582 7.582 2 12 2C16.418 2 20 5.582 20 10C20 15 12 21 12 21Z" stroke="#697D95" strokeWidth="1.5"/></svg>
                    <span>{QUOTE_DATA.organization.address}</span>
                  </div>
                </div>
              )}
            </div>

            {/* ── Customer ── */}
            <div className="border-b border-[#E8EDF1]">
              <button
                onClick={() => toggleSidebarSection('customer')}
                className="w-full h-[42px] px-[14px] flex items-center justify-between hover:bg-[#FCFCFC] transition-colors"
              >
                <div className="flex items-center gap-[8px]">
                  <IconUser size={18} stroke={1.5} className="text-[#697D95]" />
                  <span className="text-[13px] font-medium text-[#252A31]">Customer</span>
                </div>
                <IconChevronDown size={14} stroke={2} className={`text-[#697D95] transition-transform ${expandedSidebar['customer'] ? 'rotate-180' : ''}`} />
              </button>
              {expandedSidebar['customer'] && (
                <div className="px-[14px] pb-[14px] space-y-[8px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[6px]">
                      <span className="text-[12px] font-bold text-[#252A31] bg-[#EFF2F5] w-[20px] h-[20px] rounded flex items-center justify-center text-[10px]">#</span>
                      <span className="text-[12px] font-semibold text-[#252A31]">{QUOTE_DATA.customer.name}</span>
                    </div>
                    <div className="flex items-center gap-[4px]">
                      <button className="w-[26px] h-[26px] flex items-center justify-center rounded hover:bg-[#EFF2F5]"><IconMail size={14} stroke={1.5} className="text-[#697D95]" /></button>
                      <button className="w-[26px] h-[26px] flex items-center justify-center rounded hover:bg-[#EFF2F5]"><IconPhone size={14} stroke={1.5} className="text-[#697D95]" /></button>
                      <button className="w-[26px] h-[26px] flex items-center justify-center rounded hover:bg-[#EFF2F5]"><IconCopy size={14} stroke={1.5} className="text-[#697D95]" /></button>
                    </div>
                  </div>
                  <div className="flex items-center gap-[6px] text-[11px] text-[#697D95]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="14" rx="2" stroke="#697D95" strokeWidth="1.5"/><path d="M8 6V4C8 2.895 8.895 2 10 2H14C15.105 2 16 2.895 16 4V6" stroke="#697D95" strokeWidth="1.5"/></svg>
                    <span>{QUOTE_DATA.customer.company}</span>
                  </div>
                  <div className="flex items-center gap-[6px] text-[11px] text-[#697D95]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 10L12 3L21 10V19H3V10Z" stroke="#697D95" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="9" y="13" width="6" height="6" stroke="#697D95" strokeWidth="1.5"/></svg>
                    <span>{QUOTE_DATA.customer.type}</span>
                  </div>
                  <div className="flex items-start gap-[6px] text-[11px] text-[#697D95]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-[1px] flex-shrink-0"><circle cx="12" cy="10" r="3" stroke="#697D95" strokeWidth="1.5"/><path d="M12 21C12 21 4 15 4 10C4 5.582 7.582 2 12 2C16.418 2 20 5.582 20 10C20 15 12 21 12 21Z" stroke="#697D95" strokeWidth="1.5"/></svg>
                    <span>{QUOTE_DATA.customer.address}</span>
                  </div>
                </div>
              )}
            </div>

            {/* ── Property ── */}
            <div className="border-b border-[#E8EDF1]">
              <button
                onClick={() => toggleSidebarSection('property')}
                className="w-full h-[42px] px-[14px] flex items-center justify-between hover:bg-[#FCFCFC] transition-colors"
              >
                <div className="flex items-center gap-[8px]">
                  <IconHome size={18} stroke={1.5} className="text-[#697D95]" />
                  <span className="text-[13px] font-medium text-[#252A31]">Property</span>
                </div>
                <div className="flex items-center gap-[4px]">
                  <IconPlus size={14} stroke={2} className="text-[#697D95]" />
                  <IconChevronDown size={14} stroke={2} className={`text-[#697D95] transition-transform ${expandedSidebar['property'] ? 'rotate-180' : ''}`} />
                </div>
              </button>
            </div>

          </div>

          {/* ── Right Icon Strip ── */}
          <div className="w-[48px] min-w-[48px] bg-white border-l border-[#E8EDF1] flex flex-col py-[3.5px]">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="px-[7px] py-[7px]">
                  <button
                    onClick={() => toggleSidebarSection(item.id)}
                    className={`w-[31.5px] h-[31.5px] flex items-center justify-center transition-colors rounded-[7px] ${
                      expandedSidebar[item.id] ? 'bg-[#E8F4FD]' : 'hover:bg-[#EFF2F5]'
                    }`}
                    title={item.label}
                  >
                    <Icon size={21} stroke={1.5} className="text-[#697D95]" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteDetailsPage;
