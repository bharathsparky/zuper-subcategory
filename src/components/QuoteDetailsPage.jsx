import React, { useState } from 'react';
import { 
  IconChevronDown, 
  IconChevronRight,
  IconPrinter,
  IconFileText,
  IconSend,
  IconPlus,
  IconX,
} from '@tabler/icons-react';

// Mock data for the quote
const QUOTE_DATA = {
  quoteNo: '#2024-3',
  quoteTitle: 'Proposal for Albus Sverus',
  status: 'Accepted',
  job: {
    id: '#202545',
    title: 'Installation job for Albus',
  },
  quoteDate: '09/15/2025',
  expiryDate: '10/15/2025',
  createdBy: 'Eric Taylor',
  quoteSoldBy: 'Marcus Chen',
  billingAddress: {
    name: 'Albus Sverus',
    street: '520 East Denny Way',
    city: 'Seattle',
    state: 'Washington',
    zip: '98122',
    email: 'dilith@zuper.co',
  },
  customerAddress: {
    name: 'Albus Sverus',
    street: '520 East Denny Way',
    city: 'Seattle',
    state: 'Washington',
    zip: '98122',
    email: 'dilith@zuper.co',
  },
  proposalTemplate: 'Roof Replacement',
  quoteTemplate: 'Proposal Template',
  lineItems: [
    { id: 1, category: 'Roofing Foundations', items: [
      { id: 101, name: 'RSS103 - OCF Starter Strip Plus', unitCost: '$92.00', markup: '-', taxPreference: 'Taxable', location: 'Warehouse', quantity: '1 Bundle(s)', price: '$115.00', total: '$115.00', image: true },
      { id: 102, name: 'Install -1 - Double Underlayment - Install - SQ', unitCost: '$50.00', markup: '-', taxPreference: 'Taxable', location: '---', quantity: '1', price: '$50.00', total: '$50.00', image: true },
      { id: 103, name: 'Pipie Boot-1 - Pipe Boot - Master Flow Pivot Boot - Black - 2.0" - EA', unitCost: '$120.00', markup: '-', taxPreference: 'Taxable', location: 'Warehouse', quantity: '1', price: '$120.00', total: '$120.00', image: true },
      { id: 104, name: 'Storm Guard -1 - IWS - Storm Guard - Blue - 2 SQ - SQ', unitCost: '$350.00', markup: '-', taxPreference: 'Taxable', location: 'Warehouse', quantity: '1', price: '$350.00', total: '$350.00', image: true },
      { id: 105, name: 'Sealant -1 - Sealant - All - Black - EA', unitCost: '$24.99', markup: '-', taxPreference: 'Taxable', location: 'Warehouse', quantity: '1', price: '$24.99', total: '$24.99', image: true },
      { id: 106, name: 'Vent-1 - Dryer/Bath/Exhaust - Masterflow Goose Neck - Black - 4" - EA', unitCost: '$34.99', markup: '-', taxPreference: 'Taxable', location: 'Warehouse', quantity: '1', price: '$34.99', total: '$34.99', image: true },
      { id: 107, name: 'Labour -1 - Install - Architectural - Install - SQ', unitCost: '$100.00', markup: '-', taxPreference: 'Taxable', location: '---', quantity: '1', price: '$100.00', total: '$100.00', image: true },
      { id: 108, name: 'Install LF - Starter Strip - Install - LF', unitCost: '$92.00', markup: '-', taxPreference: 'Taxable', location: '---', quantity: '1 Bundle(s)', price: '$115.00', total: '$115.00', image: true },
      { id: 109, name: 'Drip edge - Drip Edge - Aluminum F5 Drip Edge - White - F5 - EA', unitCost: '$8.81', markup: '-', taxPreference: 'Taxable', location: 'Warehouse', quantity: '1 Stick(s)', price: '$22.50', total: '$22.50', image: true },
      { id: 110, name: 'Perimeter - Drip Edge - Aluminum F5 Drip Edge - White - F5 - EA', unitCost: '$92.00', markup: '-', taxPreference: 'Taxable', location: '---', quantity: '1 Bundle(s)', price: '$30.00', total: '$30.00', image: true },
      { id: 111, name: 'Perimeter -1 - Starter Strip - GAF ProStart - Black - 120 LF - BD', unitCost: '$92.00', markup: '-', taxPreference: 'Taxable', location: '---', quantity: '1 Bundle(s)', price: '$48.00', total: '$48.00', image: true },
      { id: 112, name: 'Perimeter -2 - Transition Flashing - Install Repair - LF', unitCost: '$92.00', markup: '-', taxPreference: 'Taxable', location: '---', quantity: '1 Bundle(s)', price: '$12.00', total: '$12.00', image: true },
      { id: 113, name: 'Labour - - Drip Edge - Install - LF', unitCost: '$8.81', markup: '-', taxPreference: 'Taxable', location: 'Warehouse', quantity: '1 Stick(s)', price: '$36.00', total: '$36.00', image: true },
    ]}
  ],
  summary: {
    subTotal: '$1,058.48',
    taxes: [
      { name: 'King County Tax (5%)', amount: '$52.92' },
      { name: 'Purchase Tax (5.5%)', amount: '$58.22' },
    ],
    total: '$1,169.62',
    deposit: {
      type: 'Collect Deposit',
      amount: '$211.70',
    },
  },
  financingOptions: [
    { label: 'Option 1: 120mo.', value: '---' },
    { label: 'Option 1: 180mo.', value: '---' },
    { label: 'Option 2: 120mo.', value: '---' },
    { label: 'Option 2: 180mo.', value: '---' },
    { label: 'Option 3: 120mo.', value: '---' },
    { label: 'Option 3: 180mo.', value: '---' },
    { label: 'Option 4: 120mo.', value: '---' },
    { label: 'Option 4: 180mo.', value: '---' },
  ],
};

// Sidebar items
const SIDEBAR_ITEMS = [
  { id: 'quote-status', label: 'Quote Status', icon: 'status', hasChevron: true },
  { id: 'customer', label: 'Customer', icon: 'customer', hasChevron: true },
  { id: 'proposal-options', label: 'Proposal Options', icon: 'options', hasChevron: true },
  { id: 'property', label: 'Property', icon: 'property', hasChevron: true },
  { id: 'project', label: 'Project', icon: 'project', hasPlus: true, hasChevron: true },
  { id: 'job', label: 'Job', icon: 'job', hasChevron: true },
  { id: 'material-requests', label: 'Material Requests', icon: 'material', count: 0, hasPlus: true, hasChevron: true },
  { id: 'purchase-orders', label: 'Purchase Orders', icon: 'purchase', count: 0, hasPlus: true, hasChevron: true },
  { id: 'attachments', label: 'Attachments', icon: 'attachment', count: 0, hasPlus: true, hasChevron: true },
  { id: 'notes', label: 'Notes', icon: 'notes', count: 0, hasPlus: true, hasChevron: true },
  { id: 'quote-activity', label: 'Quote Activity', icon: 'activity', hasChevron: true },
  { id: 'workflow-activity', label: 'Workflow Activity', icon: 'workflow', count: 1, hasChevron: true },
];

// Sidebar Icons
const SidebarIcon = ({ type }) => {
  const icons = {
    status: (
      <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3H21V17H7L3 21V3Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    customer: (
      <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="7" r="4" stroke="#64748B" strokeWidth="1.5"/>
        <path d="M4 19C4 15.134 7.582 12 12 12C16.418 12 20 15.134 20 19" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    options: (
      <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="15" rx="2" stroke="#64748B" strokeWidth="1.5"/>
        <path d="M7 8H17M7 12H13" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    property: (
      <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 10L12 3L21 10V19H3V10Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="9" y="13" width="6" height="6" stroke="#64748B" strokeWidth="1.5"/>
      </svg>
    ),
    project: (
      <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="15" rx="2" stroke="#64748B" strokeWidth="1.5"/>
        <path d="M3 8H21" stroke="#64748B" strokeWidth="1.5"/>
        <path d="M9 3V8" stroke="#64748B" strokeWidth="1.5"/>
      </svg>
    ),
    job: (
      <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="#64748B" strokeWidth="1.5"/>
        <path d="M8 6V4C8 2.895 8.895 2 10 2H14C15.105 2 16 2.895 16 4V6" stroke="#64748B" strokeWidth="1.5"/>
      </svg>
    ),
    material: (
      <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="15" rx="2" stroke="#64748B" strokeWidth="1.5"/>
        <path d="M3 9H21" stroke="#64748B" strokeWidth="1.5"/>
        <path d="M9 9V18" stroke="#64748B" strokeWidth="1.5"/>
      </svg>
    ),
    purchase: (
      <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4H6L8 16H18L20 6H7" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="19" r="1" stroke="#64748B" strokeWidth="1.5"/>
        <circle cx="17" cy="19" r="1" stroke="#64748B" strokeWidth="1.5"/>
      </svg>
    ),
    attachment: (
      <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.44 11.05L12.25 20.24C10.72 21.77 8.18 21.77 6.65 20.24C5.12 18.71 5.12 16.17 6.65 14.64L15.84 5.45C16.87 4.42 18.48 4.42 19.51 5.45C20.54 6.48 20.54 8.09 19.51 9.12L10.32 18.31C9.8 18.83 9 18.83 8.48 18.31C7.96 17.79 7.96 16.99 8.48 16.47L17.67 7.28" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    notes: (
      <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 3V7H18M14 3H6C4.895 3 4 3.895 4 5V17C4 18.105 4.895 19 6 19H18C19.105 19 20 18.105 20 17V9L14 3Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 13H16M8 16H12" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    activity: (
      <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="11" r="8" stroke="#64748B" strokeWidth="1.5"/>
        <path d="M12 7V11L15 13" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    workflow: (
      <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="11" r="8" stroke="#64748B" strokeWidth="1.5"/>
        <path d="M12 7V11L15 13" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  };
  return icons[type] || null;
};

// Email icon for addresses
const EmailIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.625 3.25L6.5 7.3125L11.375 3.25" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="1.625" y="2.4375" width="9.75" height="8.125" rx="1" stroke="#64748B" strokeWidth="1.5"/>
  </svg>
);

// QR Code icon
const QRCodeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="5" height="5" rx="1" stroke="#64748B" strokeWidth="1.5"/>
    <rect x="8" y="1" width="5" height="5" rx="1" stroke="#64748B" strokeWidth="1.5"/>
    <rect x="1" y="8" width="5" height="5" rx="1" stroke="#64748B" strokeWidth="1.5"/>
    <rect x="8.5" y="8.5" width="4" height="4" stroke="#64748B" strokeWidth="1.5"/>
  </svg>
);

function QuoteDetailsPage({ onBack, quoteData }) {
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(QUOTE_DATA.status);
  const [expandedSidebar, setExpandedSidebar] = useState({});

  const toggleSidebarItem = (id) => {
    setExpandedSidebar(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const statusOptions = ['Draft', 'Sent', 'Viewed', 'Accepted', 'Declined', 'Expired'];

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        {/* Breadcrumb and Actions */}
        <div className="h-[49px] flex items-center justify-between px-[21px]">
          {/* Breadcrumb */}
          <div className="flex items-center gap-[14px]">
            <button 
              onClick={onBack}
              className="text-[14px] text-[#3B82F6] hover:underline"
            >
              Quotes
            </button>
            <IconChevronRight size={21} stroke={1.5} className="text-[#94A3B8]" />
            <span className="text-[14px] text-[#1E293B]">
              Quote {QUOTE_DATA.quoteNo} - {QUOTE_DATA.quoteTitle}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-[7px]">
            {/* New Button */}
            <button className="h-[31.5px] px-[15px] flex items-center gap-[7px] border border-[#E2E8F0] rounded-[4px] text-[14px] text-[#334155] hover:bg-[#F8FAFC] transition-colors">
              <span>New</span>
              <IconChevronDown size={13} stroke={2} />
            </button>

            {/* Print, PDF, Send Group */}
            <div className="flex items-center border border-[#E2E8F0] rounded-[4px] overflow-hidden">
              <button className="h-[31.5px] px-[14px] flex items-center gap-[7px] text-[14px] text-[#334155] hover:bg-[#F8FAFC] transition-colors border-r border-[#E2E8F0]">
                <IconPrinter size={16} stroke={1.5} />
                <span>Print</span>
                <IconChevronDown size={13} stroke={2} />
              </button>
              <button className="h-[31.5px] px-[14px] flex items-center gap-[7px] text-[14px] text-[#334155] hover:bg-[#F8FAFC] transition-colors border-r border-[#E2E8F0]">
                <IconFileText size={16} stroke={1.5} />
                <span>PDF</span>
                <IconChevronDown size={13} stroke={2} />
              </button>
              <button className="h-[31.5px] px-[14px] flex items-center gap-[7px] text-[14px] text-[#334155] hover:bg-[#F8FAFC] transition-colors">
                <IconSend size={16} stroke={1.5} />
                <span>Send</span>
              </button>
            </div>

            {/* More Actions */}
            <button className="h-[31.5px] px-[15px] flex items-center gap-[7px] border border-[#E2E8F0] rounded-[4px] text-[14px] text-[#334155] hover:bg-[#F8FAFC] transition-colors">
              <span>More Actions</span>
              <IconChevronDown size={13} stroke={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Content Area */}
        <div className="flex-1 overflow-y-auto p-[21px]">
          {/* Job & Status Card */}
          <div className="bg-white rounded-[4px] border border-[#E2E8F0] mb-[17.5px]">
            <div className="flex">
              {/* Job Info */}
              <div className="flex-1 p-[21px] border-r border-[#E2E8F0]">
                <div className="text-[14px] text-[#64748B] mb-[8px]">Job</div>
                <a href="#" className="text-[14px] text-[#3B82F6] hover:underline leading-relaxed">
                  {QUOTE_DATA.job.id} - {QUOTE_DATA.job.title}
                </a>
              </div>

              {/* Status */}
              <div className="flex-1 p-[21px]">
                <div className="text-[14px] text-[#64748B] mb-[8px]">Status</div>
                <div className="relative">
                  <button
                    onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                    className="w-full h-[39px] px-[10px] flex items-center justify-between border border-[#E2E8F0] rounded-[4px] text-[14px] text-[#334155] hover:border-[#CBD5E1] transition-colors"
                  >
                    <span>{currentStatus}</span>
                    <IconChevronDown size={18} stroke={1.5} className="text-[#64748B]" />
                  </button>
                  {statusDropdownOpen && (
                    <div className="absolute top-[43px] left-0 right-0 bg-white border border-[#E2E8F0] rounded-[4px] shadow-lg z-10">
                      {statusOptions.map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            setCurrentStatus(status);
                            setStatusDropdownOpen(false);
                          }}
                          className={`w-full px-[14px] py-[10px] text-left text-[14px] hover:bg-[#F8FAFC] transition-colors ${
                            currentStatus === status ? 'bg-[#F1F5F9] text-[#3B82F6]' : 'text-[#334155]'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quote Details Card */}
          <div className="bg-white rounded-[4px] border border-[#E2E8F0] mb-[17.5px]">
            {/* Preview Image with Ribbon Badge */}
            <div className="relative p-[21px] border-b border-[#E2E8F0] overflow-hidden">
              <div className="flex">
                {/* Image */}
                <div className="w-[105px] h-[70px] rounded-[4px] overflow-hidden bg-[#E2E8F0]">
                  <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&h=140&fit=crop" 
                    alt="Property" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Accepted Ribbon Badge */}
                <div className="absolute -top-[2px] -right-[2px] w-[120px] h-[120px] overflow-hidden">
                  <div 
                    className="absolute bg-[#22C55E] text-white text-[11px] font-semibold tracking-wide text-center py-[6px] w-[170px]"
                    style={{
                      top: '26px',
                      right: '-40px',
                      transform: 'rotate(45deg)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                    }}
                  >
                    ACCEPTED
                  </div>
                </div>
              </div>
            </div>

            {/* Addresses and Summary */}
            <div className="flex p-[21px]">
              {/* Left - Addresses */}
              <div className="flex gap-[17.5px]">
                {/* Billing Address */}
                <div className="w-[252px] border border-[#E2E8F0] rounded-[4px] p-[15px]">
                  <div className="text-[14px] font-medium text-[#334155] mb-[10.5px]">Billing Address</div>
                  <div className="space-y-[0px] text-[13px] text-[#64748B]">
                    <div>{QUOTE_DATA.billingAddress.name}</div>
                    <div>{QUOTE_DATA.billingAddress.street}</div>
                    <div>{QUOTE_DATA.billingAddress.city}</div>
                    <div>{QUOTE_DATA.billingAddress.state} - {QUOTE_DATA.billingAddress.zip}</div>
                    <div className="flex items-center gap-[7px] pt-[3.5px]">
                      <EmailIcon />
                      <a href={`mailto:${QUOTE_DATA.billingAddress.email}`} className="text-[#3B82F6] hover:underline">
                        {QUOTE_DATA.billingAddress.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Customer Address */}
                <div className="w-[252px] border border-[#E2E8F0] rounded-[4px] p-[15px]">
                  <div className="text-[14px] font-medium text-[#334155] mb-[10.5px]">Customer Address</div>
                  <div className="space-y-[0px] text-[13px] text-[#64748B]">
                    <div>{QUOTE_DATA.customerAddress.name}</div>
                    <div>{QUOTE_DATA.customerAddress.street}</div>
                    <div>{QUOTE_DATA.customerAddress.city}</div>
                    <div>{QUOTE_DATA.customerAddress.state} - {QUOTE_DATA.customerAddress.zip}</div>
                    <div className="flex items-center gap-[7px] pt-[3.5px]">
                      <EmailIcon />
                      <a href={`mailto:${QUOTE_DATA.customerAddress.email}`} className="text-[#3B82F6] hover:underline">
                        {QUOTE_DATA.customerAddress.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Total Amount & Details */}
              <div className="flex-1 ml-[21px]">
                {/* Total Amount Header */}
                <div className="bg-[#F1F5F9] rounded-[4px] p-[10.5px] text-center mb-[13.5px]">
                  <div className="text-[12px] text-[#3B82F6] font-medium uppercase tracking-wide">Total Amount</div>
                  <div className="text-[18px] font-semibold text-[#1E293B]">{QUOTE_DATA.summary.total}</div>
                </div>

                {/* Quote Details */}
                <div className="space-y-[0px]">
                  <div className="flex justify-between py-[7px]">
                    <span className="text-[13px] text-[#64748B]">Quote No</span>
                    <span className="text-[13px] text-[#334155]">{QUOTE_DATA.quoteNo}</span>
                  </div>
                  <div className="flex justify-between py-[7px]">
                    <span className="text-[13px] text-[#64748B]">Quote Date</span>
                    <span className="text-[13px] text-[#334155]">{QUOTE_DATA.quoteDate}</span>
                  </div>
                  <div className="flex justify-between py-[7px]">
                    <span className="text-[13px] text-[#64748B]">Expiry Date</span>
                    <span className="text-[13px] text-[#334155]">{QUOTE_DATA.expiryDate}</span>
                  </div>
                  <div className="flex justify-between py-[7px]">
                    <span className="text-[13px] text-[#64748B]">Created By</span>
                    <span className="text-[13px] text-[#334155]">{QUOTE_DATA.createdBy}</span>
                  </div>
                  <div className="flex justify-between py-[7px]">
                    <span className="text-[13px] text-[#64748B]">Quote Sold By</span>
                    <span className="text-[13px] text-[#334155]">{QUOTE_DATA.quoteSoldBy}</span>
                  </div>
                </div>

                {/* QR Code Button */}
                <div className="flex justify-end mt-[14px]">
                  <button className="w-[37px] h-[37px] flex items-center justify-center border border-[#E2E8F0] rounded-[4px] hover:bg-[#F8FAFC] transition-colors">
                    <QRCodeIcon />
                  </button>
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="border-t border-[#E2E8F0]">
              {/* Table Header */}
              <div className="grid grid-cols-[48px_1fr_96px_96px_144px_96px_192px] bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <div className="px-[15px] py-[18.5px] text-[13px] text-[#64748B]">#</div>
                <div className="px-[14px] py-[18.5px] text-[13px] text-[#64748B]">Product / Service</div>
                <div className="px-[14px] py-[18.5px] text-[13px] text-[#64748B]">Unit Cost</div>
                <div className="px-[14px] py-[18.5px] text-[13px] text-[#64748B]">Markup</div>
                <div className="px-[14px] py-[18.5px] text-[13px] text-[#64748B]">Tax Preference</div>
                <div className="px-[14px] py-[18.5px] text-[13px] text-[#64748B]">Location</div>
                <div className="px-[14px] py-[18.5px] text-[13px] text-[#64748B]">Price</div>
              </div>

              {/* Table Body */}
              {QUOTE_DATA.lineItems.map((category) => (
                <div key={category.id}>
                  {/* Category Header */}
                  <div className="grid grid-cols-[48px_1fr_96px_96px_144px_96px_192px] border-b border-[#E2E8F0] bg-[#FAFAFA]">
                    <div className="px-[15px] py-[5.3px]"></div>
                    <div className="px-[14px] py-[5.3px] text-[13px] font-medium text-[#334155]">{category.category}</div>
                    <div className="px-[14px] py-[5.3px]"></div>
                    <div className="px-[14px] py-[5.3px] text-[13px] text-[#64748B]">-</div>
                    <div className="px-[14px] py-[5.3px]"></div>
                    <div className="px-[14px] py-[5.3px]"></div>
                    <div className="px-[14px] py-[5.3px]"></div>
                  </div>

                  {/* Line Items */}
                  {category.items.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-[48px_1fr_96px_96px_144px_96px_192px] border-b border-[#E2E8F0] hover:bg-[#F8FAFC]">
                      <div className="px-[15px] py-[28.5px] text-[13px] text-[#64748B]">{index + 1}</div>
                      <div className="px-[14px] py-[14px] flex items-center gap-[10.5px]">
                        <div className="w-[49px] h-[49px] bg-[#E2E8F0] rounded-[4px] overflow-hidden flex-shrink-0">
                          {item.image && (
                            <img 
                              src={`https://placehold.co/49x49/E2E8F0/64748B?text=${index + 1}`} 
                              alt="" 
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <span className="text-[13px] text-[#3B82F6]">{item.name}</span>
                      </div>
                      <div className="px-[14px] py-[28.5px] text-[13px] text-[#334155]">{item.unitCost}</div>
                      <div className="px-[14px] py-[28.5px] text-[13px] text-[#64748B]">{item.markup}</div>
                      <div className="px-[14px] py-[28.5px] text-[13px] text-[#334155]">{item.taxPreference}</div>
                      <div className="px-[14px] py-[28.5px] text-[13px] text-[#334155]">{item.location}</div>
                      <div className="px-[14px] py-[28.5px] text-[13px] text-[#334155]">
                        <span>{item.quantity}</span>
                        <span className="mx-[7px] text-[#94A3B8]">×</span>
                        <span>{item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {/* Summary Section */}
              <div className="border-t border-[#E2E8F0]">
                {/* Sub-Total */}
                <div className="grid grid-cols-[1fr_157px_157px] border-b border-[#E2E8F0]">
                  <div></div>
                  <div className="px-[7px] py-[10.5px] text-[13px] text-[#64748B]">Sub-Total</div>
                  <div className="px-[7px] py-[10.5px] text-[13px] text-[#334155]">{QUOTE_DATA.summary.subTotal}</div>
                </div>

                {/* Taxes */}
                {QUOTE_DATA.summary.taxes.map((tax, index) => (
                  <div key={index} className="grid grid-cols-[1fr_157px_157px] border-b border-[#E2E8F0]">
                    <div></div>
                    <div className="px-[7px] py-[10.5px] text-[13px] text-[#64748B]">{tax.name}</div>
                    <div className="px-[7px] py-[10.5px] text-[13px] text-[#334155]">{tax.amount}</div>
                  </div>
                ))}

                {/* Total */}
                <div className="grid grid-cols-[1fr_157px_157px] border-b border-[#E2E8F0]">
                  <div></div>
                  <div className="px-[7px] py-[10.5px] text-[16px] font-semibold text-[#1E293B]">Total</div>
                  <div className="px-[7px] py-[10.5px] text-[16px] font-semibold text-[#1E293B]">{QUOTE_DATA.summary.total}</div>
                </div>

                {/* Deposit */}
                <div className="grid grid-cols-[1fr_157px_157px]">
                  <div></div>
                  <div className="px-[7px] py-[14px]">
                    <div className="flex items-center gap-[7px] text-[13px] text-[#64748B]">
                      <span>Deposit</span>
                      <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 1L4 8L12 15" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="text-[13px] text-[#64748B]">{QUOTE_DATA.summary.deposit.type}</div>
                  </div>
                  <div className="px-[7px] py-[14px] flex items-center gap-[14px]">
                    <span className="text-[13px] text-[#334155]">{QUOTE_DATA.summary.deposit.amount}</span>
                    <button className="text-[#3B82F6] hover:text-[#2563EB]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4C3.447 4 3 4.447 3 5V20C3 20.553 3.447 21 4 21H19C19.553 21 20 20.553 20 20V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.5 2.5L21.5 5.5L12 15H9V12L18.5 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Templates Section */}
            <div className="border-t border-[#E2E8F0] p-[21px]">
              <div className="grid grid-cols-2 gap-[14px]">
                <div>
                  <div className="text-[14px] text-[#64748B] mb-[7px]">Proposal Template</div>
                  <div className="text-[13px] text-[#334155]">{QUOTE_DATA.proposalTemplate}</div>
                </div>
                <div>
                  <div className="text-[14px] text-[#64748B] mb-[7px]">Quote Template</div>
                  <div className="text-[13px] text-[#334155]">{QUOTE_DATA.quoteTemplate}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white rounded-[4px] border border-[#E2E8F0] mb-[17.5px]">
            <div className="px-[22px] py-[8px] border-b border-[#E2E8F0]">
              <h3 className="text-[17px] font-semibold text-[#1E293B]">Description</h3>
            </div>
            <div className="p-[21px]">
              <p className="text-[14px] text-[#64748B]">---</p>
            </div>
          </div>

          {/* Financing Options Section */}
          <div className="bg-white rounded-[4px] border border-[#E2E8F0]">
            <div className="flex items-center justify-between px-[21px] py-[12px] border-b border-[#E2E8F0]">
              <h3 className="text-[17px] font-semibold text-[#1E293B]">Financing Options</h3>
              <button className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#F1F5F9] transition-colors">
                <IconPlus size={16} stroke={2} className="text-[#64748B]" />
              </button>
            </div>
            <div className="p-[21px]">
              <div className="grid grid-cols-3 gap-x-[14px] gap-y-[14px]">
                {QUOTE_DATA.financingOptions.map((option, index) => (
                  <div key={index}>
                    <div className="text-[14px] text-[#64748B] mb-[7px]">{option.label}</div>
                    <div className="text-[14px] text-[#334155]">{option.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[343px] bg-white border-l border-[#E2E8F0] flex">
          {/* Main Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            {SIDEBAR_ITEMS.map((item) => (
              <div key={item.id} className="border-b border-[#F1F5F9]">
                <button
                  onClick={() => toggleSidebarItem(item.id)}
                  className="w-full h-[45.5px] flex items-center justify-between px-[14px] hover:bg-[#F8FAFC] transition-colors"
                >
                  <div className="flex items-center gap-[7px]">
                    <SidebarIcon type={item.icon} />
                    <span className="text-[14px] text-[#334155]">{item.label}</span>
                    {item.count !== undefined && (
                      <span className="text-[14px] text-[#64748B]">({item.count})</span>
                    )}
                  </div>
                  <div className="flex items-center gap-[7px]">
                    {item.hasPlus && (
                      <IconPlus size={18} stroke={2} className="text-[#64748B]" />
                    )}
                    {item.hasChevron && (
                      <IconChevronDown 
                        size={12} 
                        stroke={2} 
                        className={`text-[#64748B] transition-transform ${expandedSidebar[item.id] ? 'rotate-180' : ''}`} 
                      />
                    )}
                  </div>
                </button>
                {expandedSidebar[item.id] && (
                  <div className="px-[14px] py-[14px] bg-[#F8FAFC]">
                    <p className="text-[13px] text-[#64748B]">No data available</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Icon Strip */}
          <div className="w-[48px] min-w-[48px] bg-white border-l border-[#E2E8F0] flex flex-col py-[3.5px]">
            {SIDEBAR_ITEMS.map((item) => (
              <div key={item.id} className="px-[7px] py-[7px]">
                <button
                  onClick={() => toggleSidebarItem(item.id)}
                  className={`w-[31.5px] h-[31.5px] flex items-center justify-center transition-colors rounded-[7px] ${
                    expandedSidebar[item.id] ? 'bg-[#FBE9E7]' : 'hover:bg-[#F1F5F9]'
                  }`}
                  title={item.label}
                >
                  <SidebarIcon type={item.icon} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteDetailsPage;
