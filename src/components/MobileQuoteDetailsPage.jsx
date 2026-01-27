import React, { useState } from 'react';
import { 
  IconChevronLeft,
  IconChevronDown,
  IconChevronUp,
  IconDots,
  IconPhoto,
  IconPaperclip,
} from '@tabler/icons-react';

// Mock data for the quote
const QUOTE_DATA = {
  quoteNo: '#2022 - 1659',
  createdBy: 'Henry Jones',
  status: 'Draft',
  quoteDate: '25/11/2022',
  expiryDate: '29/11/2022',
  quoteSoldBy: 'Marcus Chen',
  totalAmount: 'USD 246,568',
  lineItems: [
    { 
      id: 1, 
      name: 'House Renovation', 
      type: 'SERVICE',
      status: 'Pending',
      quantity: '160 hours',
      unitPrice: 'USD 1375.42',
      price: 'USD 219,775',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=100&h=100&fit=crop'
    },
  ],
  subTotal: 'USD 220,150',
  total: 'USD 246,568',
  attachments: [],
};

// Status badge colors
const STATUS_STYLES = {
  'Draft': { bg: 'bg-[#FDF0E3]', border: 'border-[#FAE2C7]', text: 'text-[#AE5700]' },
  'Pending': { bg: 'bg-[#FDF0E3]', border: 'border-[#FAE2C7]', text: 'text-[#AE5700]' },
  'Accepted': { bg: 'bg-[#E6F4EA]', border: 'border-[#A8DAB5]', text: 'text-[#1E7E34]' },
  'Rejected': { bg: 'bg-[#FDECEA]', border: 'border-[#F5C6CB]', text: 'text-[#C62828]' },
};

// Status Badge Component
function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES['Draft'];
  return (
    <div className={`${style.bg} ${style.border} border-[0.5px] px-[8px] py-[4px] rounded-full`}>
      <span className={`${style.text} text-[12px] leading-[1.4] tracking-[0.2px]`}>{status}</span>
    </div>
  );
}

// Separator Component
function Separator() {
  return <div className="h-px w-full bg-[#E8EDF1]" />;
}

// Collapsible Card Component
function CollapsibleCard({ title, count, children, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="bg-white border border-black/10 rounded-[6px] overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-[12px] py-[10px]"
      >
        <span className="font-semibold text-[14px] text-[#252A31] leading-[1.4] tracking-[0.2px]">
          {title} {count !== undefined && `(${count})`}
        </span>
        {isOpen ? (
          <IconChevronUp size={24} className="text-[#4F5E71]" />
        ) : (
          <IconChevronDown size={24} className="text-[#4F5E71]" />
        )}
      </button>
      {isOpen && (
        <>
          <Separator />
          {children}
        </>
      )}
    </div>
  );
}

// Line Item Card Component
function LineItemCard({ item }) {
  const style = STATUS_STYLES[item.status] || STATUS_STYLES['Pending'];
  
  return (
    <div className="bg-white">
      <div className="flex gap-[8px] items-start pl-[12px] pr-[8px] py-[12px]">
        {/* Image */}
        <div className="w-[48px] h-[48px] rounded-[6px] overflow-hidden bg-[#D9D9D9] flex-shrink-0">
          {item.image ? (
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <IconPhoto size={24} className="text-[#4F5E71]" />
            </div>
          )}
        </div>
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-medium text-[16px] text-[#252A31] leading-[1.4] tracking-[0.2px]">{item.name}</p>
          <p className="text-[12px] text-[#4F5E71] leading-[1.4] tracking-[0.2px]">{item.type}</p>
        </div>
        
        {/* Status Badge */}
        <StatusBadge status={item.status} />
      </div>
      
      {/* Price Row */}
      <div className="flex items-center justify-between px-[12px] pb-[8px]">
        <span className="text-[12px] text-[#252A31] leading-[1.4] tracking-[0.2px]">
          {item.quantity} X {item.unitPrice}
        </span>
        <span className="font-medium text-[14px] text-[#0172CB] uppercase leading-[1.4] tracking-[0.2px]">
          {item.price}
        </span>
      </div>
    </div>
  );
}

function MobileQuoteDetailsPage() {
  const [activeTab, setActiveTab] = useState('details');
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  
  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'associated', label: 'Associated' },
    { id: 'notes', label: 'Notes' },
    { id: 'activity', label: 'Activity' },
  ];
  
  return (
    <div className="min-h-screen bg-white flex flex-col font-['Inter',sans-serif]">
      {/* iOS Status Bar */}
      <div className="h-[44px] px-[14px] flex items-center justify-between bg-white">
        <span className="font-semibold text-[15px] text-[#252A31] tracking-[-0.3px]">9:41</span>
        <div className="flex items-center gap-[5px]">
          {/* Cellular */}
          <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
            <rect x="0" y="4" width="3" height="7" rx="1" fill="#252A31"/>
            <rect x="4.5" y="2.5" width="3" height="8.5" rx="1" fill="#252A31"/>
            <rect x="9" y="0.5" width="3" height="10.5" rx="1" fill="#252A31"/>
            <rect x="13.5" y="0" width="3" height="11" rx="1" fill="#252A31" opacity="0.3"/>
          </svg>
          {/* WiFi */}
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
            <path d="M7.5 2.5C10.5 2.5 13 4 14.5 6L7.5 11L0.5 6C2 4 4.5 2.5 7.5 2.5Z" fill="#252A31"/>
          </svg>
          {/* Battery */}
          <div className="flex items-center gap-[2px]">
            <div className="w-[22px] h-[11px] border border-[#252A31] rounded-[2.67px] opacity-35 relative">
              <div className="absolute inset-[2px] bg-[#252A31] rounded-[1.33px]" />
            </div>
            <div className="w-[1.3px] h-[4px] bg-[#252A31] opacity-40 rounded-r-sm" />
          </div>
        </div>
      </div>
      
      {/* Navigation Bar */}
      <div className="flex items-center justify-between px-[12px] py-[10px] border-b border-[#E8EDF1]">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-0"
        >
          <IconChevronLeft size={24} className="text-[#252A31]" />
          <span className="font-medium text-[16px] text-[#252A31] leading-[1.4] tracking-[0.2px]">Back</span>
        </button>
        <button className="p-[4px]">
          <IconDots size={24} className="text-[#252A31]" />
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-[#FCFCFC] p-[16px]">
        {/* Quote Title */}
        <div className="text-center mb-[16px]">
          <h1 className="font-semibold text-[20px] text-[#252A31] leading-[1.2] mb-[8px]">{QUOTE_DATA.quoteNo}</h1>
          
          {/* Created & Sold By - Compact two-column */}
          <div className="flex items-center justify-center gap-[16px]">
            <div className="flex items-center gap-[6px]">
              <span className="text-[11px] text-[#94A3B8] uppercase tracking-wide">Created</span>
              <span className="text-[13px] font-medium text-[#0172CB]">{QUOTE_DATA.createdBy}</span>
            </div>
            <div className="w-px h-[14px] bg-[#E2E8F0]" />
            <div className="flex items-center gap-[6px]">
              <span className="text-[11px] text-[#94A3B8] uppercase tracking-wide">Sold</span>
              <span className="text-[13px] font-medium text-[#0172CB]">{QUOTE_DATA.quoteSoldBy}</span>
            </div>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex items-center justify-center mb-[16px]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-[16px] py-[8px] text-center relative ${
                activeTab === tab.id ? 'text-[#252A31]' : 'text-[#4F5E71]'
              }`}
            >
              <span className="font-medium text-[14px] leading-[20px]">{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[56px] h-[3px] bg-[#E44A19] rounded-full" />
              )}
            </button>
          ))}
        </div>
        
        {/* Quote Detail Status Card */}
        <div className="bg-white border border-black/10 rounded-[6px] overflow-hidden mb-[16px]">
          {/* Quote Status Row */}
          <button 
            onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
            className="w-full flex items-center gap-[12px] p-[12px]"
          >
            <span className="flex-1 text-left font-medium text-[12px] text-[#4F5E71] leading-[1.4] tracking-[0.2px]">
              Quote Status
            </span>
            <StatusBadge status={QUOTE_DATA.status} />
            <IconChevronDown size={20} className="text-[#4F5E71]" />
          </button>
          
          <Separator />
          
          {/* Quote Date / Expiry Date Row */}
          <div className="flex items-stretch">
            <div className="flex-1 flex flex-col items-center gap-[4px] p-[12px] text-center">
              <span className="font-medium text-[12px] text-[#4F5E71] leading-[1.4] tracking-[0.2px]">Quote Date</span>
              <span className="text-[14px] text-[#252A31] leading-[1.4] tracking-[0.2px]">{QUOTE_DATA.quoteDate}</span>
            </div>
            <div className="w-px bg-[#E8EDF1] self-stretch" />
            <div className="flex-1 flex flex-col items-center gap-[4px] p-[12px] text-center">
              <span className="font-medium text-[12px] text-[#4F5E71] leading-[1.4] tracking-[0.2px]">Expiry Date</span>
              <span className="text-[14px] text-[#252A31] leading-[1.4] tracking-[0.2px]">{QUOTE_DATA.expiryDate}</span>
            </div>
          </div>
          
          <Separator />
          
          {/* Total Amount */}
          <div className="flex flex-col items-center gap-[4px] pt-[12px] px-[12px] text-center">
            <span className="font-medium text-[12px] text-[#4F5E71] leading-[1.4] tracking-[0.2px]">Total Amount</span>
            <span className="font-semibold text-[20px] text-[#252A31] leading-[1.2]">{QUOTE_DATA.totalAmount}</span>
          </div>
          
          {/* Send to Customer Button */}
          <div className="p-[12px]">
            <button className="w-full h-[44px] bg-[#E44A19] text-white font-medium text-[14px] leading-[1.4] tracking-[0.2px] rounded-[6px]">
              Send to customer
            </button>
          </div>
        </div>
        
        {/* Line Items Card */}
        <CollapsibleCard title="Line Items" count={QUOTE_DATA.lineItems.length} defaultOpen={true}>
          {QUOTE_DATA.lineItems.map((item) => (
            <LineItemCard key={item.id} item={item} />
          ))}
          
          <Separator />
          
          {/* Sub Total */}
          <div className="flex items-center gap-[12px] p-[12px]">
            <span className="w-[192px] font-medium text-[12px] text-[#4F5E71] text-right leading-[1.4] tracking-[0.2px]">
              Sub Total
            </span>
            <span className="flex-1 font-medium text-[14px] text-[#0172CB] text-right uppercase leading-[1.4]">
              {QUOTE_DATA.subTotal}
            </span>
          </div>
          
          <Separator />
          
          {/* Total */}
          <div className="flex items-center gap-[12px] p-[12px]">
            <span className="w-[192px] font-medium text-[12px] text-[#4F5E71] text-right leading-[1.4] tracking-[0.2px]">
              Total
            </span>
            <span className="flex-1 font-semibold text-[18px] text-[#0172CB] text-right leading-[1.2]">
              {QUOTE_DATA.total}
            </span>
          </div>
        </CollapsibleCard>
        
        {/* Attachments Card */}
        <div className="mt-[16px]">
          <CollapsibleCard title="Attachments" count={QUOTE_DATA.attachments.length} defaultOpen={true}>
            <div className="flex flex-col items-center justify-center p-[16px]">
              <button className="bg-[#EEE] px-[16px] py-[8px] rounded-[6px]">
                <span className="font-semibold text-[14px] text-[rgba(0,0,0,0.87)] leading-[24px]">
                  Add Attachment
                </span>
              </button>
            </div>
          </CollapsibleCard>
        </div>
        
        {/* Bottom Spacer */}
        <div className="h-[34px]" />
      </div>
      
      {/* iOS Home Indicator */}
      <div className="flex justify-center pt-[21px] pb-[8px] bg-white">
        <div className="w-[134px] h-[5px] bg-black rounded-full" />
      </div>
    </div>
  );
}

export default MobileQuoteDetailsPage;
