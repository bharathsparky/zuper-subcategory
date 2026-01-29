import React, { useState } from 'react';
import {
  IconChevronDown,
  IconChevronUp,
  IconX,
  IconPlus,
  IconAlertTriangle,
  IconBold,
  IconItalic,
  IconList,
  IconListNumbers,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconHighlight,
  IconClearFormatting,
  IconTable,
  IconMail,
  IconPhone,
  IconMapPin,
  IconPencil,
  IconTrash,
  IconPaperclip,
  IconSearch,
  IconBell,
  IconMessage,
  IconUsers,
  IconFileDescription,
  IconPackage,
  IconTruck,
  IconClipboardList,
  IconNotes,
} from '@tabler/icons-react';

// Asset paths from Figma
const COMPANY_LOGO = '/assets/f1a06e847c1b53f8a7f6b25ada971ea15f95132b.png';
const LOCATION_PREVIEW = '/assets/5e8b95356d01faaee0e40c41704ee724c45dd548.png';

// SVG Icons from Figma
const ChevronRightIcon = () => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.875 15.75L13.125 10.5L7.875 5.25" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SaveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H10.6667L14 5.33333V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.3333 14V9.33333H4.66667V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.66667 2V5.33333H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SendIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.375 1.625L5.6875 7.3125" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.375 1.625L7.8125 11.375L5.6875 7.3125L1.625 5.1875L11.375 1.625Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PrimaryDetailsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.75 1.5H2.25C1.83579 1.5 1.5 1.83579 1.5 2.25V6.75C1.5 7.16421 1.83579 7.5 2.25 7.5H6.75C7.16421 7.5 7.5 7.16421 7.5 6.75V2.25C7.5 1.83579 7.16421 1.5 6.75 1.5Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.75 1.5H11.25C10.8358 1.5 10.5 1.83579 10.5 2.25V6.75C10.5 7.16421 10.8358 7.5 11.25 7.5H15.75C16.1642 7.5 16.5 7.16421 16.5 6.75V2.25C16.5 1.83579 16.1642 1.5 15.75 1.5Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.75 10.5H2.25C1.83579 10.5 1.5 10.8358 1.5 11.25V15.75C1.5 16.1642 1.83579 16.5 2.25 16.5H6.75C7.16421 16.5 7.5 16.1642 7.5 15.75V11.25C7.5 10.8358 7.16421 10.5 6.75 10.5Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.75 10.5H11.25C10.8358 10.5 10.5 10.8358 10.5 11.25V15.75C10.5 16.1642 10.8358 16.5 11.25 16.5H15.75C16.1642 16.5 16.5 16.1642 16.5 15.75V11.25C16.5 10.8358 16.1642 10.5 15.75 10.5Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const VendorIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15.75V14.25C12 13.4544 11.6839 12.6913 11.1213 12.1287C10.5587 11.5661 9.79565 11.25 9 11.25H3.75C2.95435 11.25 2.19129 11.5661 1.62868 12.1287C1.06607 12.6913 0.75 13.4544 0.75 14.25V15.75" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.375 8.25C8.03185 8.25 9.375 6.90685 9.375 5.25C9.375 3.59315 8.03185 2.25 6.375 2.25C4.71815 2.25 3.375 3.59315 3.375 5.25C3.375 6.90685 4.71815 8.25 6.375 8.25Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.25 15.75V14.25C17.2495 13.5853 17.0283 12.9396 16.621 12.4143C16.2138 11.889 15.6436 11.5137 15 11.3475" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.375 2.3475C13.0205 2.51266 13.5926 2.88794 14.0011 3.41411C14.4096 3.94028 14.6314 4.58753 14.6314 5.25375C14.6314 5.91997 14.4096 6.56722 14.0011 7.09339C13.5926 7.61956 13.0205 7.99484 12.375 8.16" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DeliveryAddressIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.75 7.5C15.75 12.75 9 17.25 9 17.25C9 17.25 2.25 12.75 2.25 7.5C2.25 5.70979 2.96116 3.9929 4.22703 2.72703C5.4929 1.46116 7.20979 0.75 9 0.75C10.7902 0.75 12.5071 1.46116 13.773 2.72703C15.0388 3.9929 15.75 5.70979 15.75 7.5Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const POItemsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.75 12V6C15.7497 5.73689 15.6803 5.47848 15.5487 5.25096C15.4172 5.02344 15.2282 4.83488 15 4.704L9.75 1.704C9.52197 1.57284 9.26326 1.50391 9 1.50391C8.73674 1.50391 8.47803 1.57284 8.25 1.704L3 4.704C2.77183 4.83488 2.58285 5.02344 2.45127 5.25096C2.31969 5.47848 2.25027 5.73689 2.25 6V12C2.25027 12.2631 2.31969 12.5215 2.45127 12.749C2.58285 12.9766 2.77183 13.1651 3 13.296L8.25 16.296C8.47803 16.4272 8.73674 16.4961 9 16.4961C9.26326 16.4961 9.52197 16.4272 9.75 16.296L15 13.296C15.2282 13.1651 15.4172 12.9766 15.5487 12.749C15.6803 12.5215 15.7497 12.2631 15.75 12Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.4525 5.22L9 9.0075L15.5475 5.22" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 16.56V9" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AttachmentsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.0225 8.30252L8.7975 14.5275C8.10597 15.219 7.16634 15.6074 6.18675 15.6074C5.20716 15.6074 4.26753 15.219 3.576 14.5275C2.88447 13.836 2.49609 12.8963 2.49609 11.9168C2.49609 10.9372 2.88447 9.99753 3.576 9.306L9.801 3.081C10.2623 2.61974 10.8871 2.36042 11.538 2.36042C12.1889 2.36042 12.8137 2.61974 13.275 3.081C13.7363 3.54226 13.9956 4.16709 13.9956 4.818C13.9956 5.46891 13.7363 6.09374 13.275 6.555L7.0425 12.78C6.81188 13.0106 6.49946 13.1403 6.174 13.1403C5.84854 13.1403 5.53612 13.0106 5.3055 12.78C5.07488 12.5494 4.94522 12.237 4.94522 11.9115C4.94522 11.586 5.07488 11.2736 5.3055 11.043L11.0205 5.33552" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Empty state SVG for no parts found
const NoPartsFoundSvg = () => (
  <svg width="146" height="112" viewBox="0 0 146 112" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="73" cy="56" r="45" fill="#F1F5F9"/>
    <path d="M73 25L95.5 38V64L73 77L50.5 64V38L73 25Z" stroke="#94A3B8" strokeWidth="2"/>
    <circle cx="73" cy="51" r="8" fill="#E2E8F0"/>
    <path d="M73 63V68" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="73" cy="73" r="2" fill="#94A3B8"/>
  </svg>
);

// Service address placeholder SVG
const ServiceAddressPlaceholderSvg = () => (
  <svg width="168" height="177" viewBox="0 0 168 177" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="168" height="177" rx="8" fill="#F8FAFC"/>
    <path d="M84 50C71.8497 50 62 59.8497 62 72C62 88.5 84 115 84 115C84 115 106 88.5 106 72C106 59.8497 96.1503 50 84 50Z" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="84" cy="72" r="8" stroke="#CBD5E1" strokeWidth="2"/>
    <path d="M40 140H128" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round"/>
    <path d="M50 150H118" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Attachment placeholder SVG
const AttachmentPlaceholderSvg = () => (
  <svg width="119" height="112" viewBox="0 0 119 112" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="19" y="16" width="80" height="80" rx="8" fill="#F1F5F9"/>
    <path d="M77.5 52L59.5 70L51.5 62" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="35" y="32" width="48" height="48" rx="4" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4"/>
    <path d="M59 48V64" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
    <path d="M51 56H67" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const NewPurchaseOrderPage = ({ onNavigateBack }) => {
  const [primaryDetailsExpanded, setPrimaryDetailsExpanded] = useState(true);
  const [poItemsExpanded, setPoItemsExpanded] = useState(true);
  const [vendorExpanded, setVendorExpanded] = useState(true);
  const [deliveryAddressExpanded, setDeliveryAddressExpanded] = useState(true);
  const [billingAddressExpanded, setBillingAddressExpanded] = useState(true);
  const [attachmentsExpanded, setAttachmentsExpanded] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    poTitle: '',
    vendor: 'SS Shingle Supplier',
    deliveryMethod: "Direct Shipment to Job's site",
    deliveryTime: 'Anytime',
    referenceNumber: '',
    requiredBy: '',
    paymentTerm: 'Monthly',
    template: 'ABC Supply',
    remarks: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col w-full h-screen bg-[#F1F5F9]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Top Header Bar */}
      <div className="h-[49px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-[21px]">
        {/* Left side - Company Logo & New button */}
        <div className="flex items-center gap-[7px]">
          <img src={COMPANY_LOGO} alt="Company Logo" className="h-[30px]" />
          <button className="flex items-center gap-[7px] px-[14px] py-[14px] rounded-[5.25px] hover:bg-gray-50">
            <span className="text-[12.6px] font-medium text-[#334155]">New</span>
            <IconChevronDown size={13} className="text-[#334155]" />
          </button>
        </div>
        
        {/* Center - Search */}
        <div className="flex-1 flex justify-center max-w-[392px] mx-auto">
          <div className="relative w-full">
            <IconSearch size={17.5} className="absolute left-[10.5px] top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search"
              className="w-full h-[36px] pl-[36px] pr-[12px] bg-white border border-[#CBD5E1] rounded-[5.25px] text-[14px] text-[#334155] placeholder-[#94A3B8] focus:outline-none focus:border-[#3B82F6]"
            />
          </div>
        </div>
        
        {/* Right side - Icons */}
        <div className="flex items-center gap-0">
          <button className="relative p-[7px] rounded-full hover:bg-gray-50">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5C15 5.53043 14.7893 6.03914 14.4142 6.41421C14.0391 6.78929 13.5304 7 13 7H11C10.4696 7 9.96086 6.78929 9.58579 6.41421C9.21071 6.03914 9 5.53043 9 5Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="absolute top-0 right-0 flex items-center justify-center min-w-[14px] h-[14px] px-[3.5px] bg-[#4F46E5] rounded-full">
              <span className="text-[8.8px] font-medium text-[#EEF2FF]">32</span>
            </div>
          </button>
          <button className="p-[7px] rounded-full hover:bg-gray-50">
            <IconMessage size={24} className="text-[#64748B]" />
          </button>
          <button className="relative p-[7px] rounded-full hover:bg-gray-50">
            <IconUsers size={24} className="text-[#64748B]" />
            <div className="absolute top-0 right-0 flex items-center justify-center min-w-[14px] h-[14px] px-[3.5px] bg-[#4F46E5] rounded-full">
              <span className="text-[8.8px] font-medium text-[#EEF2FF]">25</span>
            </div>
          </button>
          <button className="relative p-[7px] rounded-full hover:bg-gray-50">
            <IconBell size={24} className="text-[#64748B]" />
            <div className="absolute top-0 right-0 flex items-center justify-center min-w-[14px] h-[14px] px-[3.5px] bg-[#4F46E5] rounded-full">
              <span className="text-[8.8px] font-medium text-[#EEF2FF]">7</span>
            </div>
          </button>
          <button className="p-[2.5px] rounded-full hover:bg-gray-50">
            <div className="w-[35px] h-[35px] bg-[#E2E8F0] rounded-full flex items-center justify-center">
              <span className="text-[28px] text-[#475569] uppercase">M</span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Breadcrumb & Action Bar */}
      <div className="h-[49px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-[21px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-0">
          <button 
            onClick={onNavigateBack}
            className="text-[15.8px] text-[#334155] hover:text-[#1E293B]"
          >
            Purchase Orders
          </button>
          <div className="pl-[14px] flex items-center">
            <ChevronRightIcon />
            <div className="pl-[14px] py-[6px]">
              <span className="text-[15.8px] font-medium text-[#334155]">New Purchase Order</span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-[14px]">
          <button className="flex items-center gap-[7px] px-[15px] py-[5.43px] bg-white border border-[#CBD5E1] rounded-[5.25px] hover:bg-gray-50">
            <SaveIcon />
            <span className="text-[12.6px] font-medium text-[#334155]">Save as Draft</span>
          </button>
          <div className="flex">
            <button className="flex items-center gap-[7px] px-[14px] py-[5.8px] bg-[#E44A19] rounded-l-[5.25px] border-r border-white hover:bg-[#D94315]">
              <SendIcon />
              <span className="text-[12.6px] font-medium text-white">Save & Submit</span>
            </button>
            <button className="px-[7px] py-[9.45px] bg-[#E44A19] border border-[#E44A19] rounded-r-[5.25px] hover:bg-[#D94315]">
              <IconChevronDown size={13} className="text-white" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Content */}
        <div className="flex-1 overflow-auto p-[10.5px]">
          <div className="flex flex-col gap-[10.5px]">
            {/* Primary Details Section */}
            <div className="bg-white border border-[#E2E8F0] rounded-[7px]">
              {/* Header */}
              <button 
                onClick={() => setPrimaryDetailsExpanded(!primaryDetailsExpanded)}
                className="w-full h-[49px] flex items-center justify-between px-[14px] border-b border-[#E2E8F0] rounded-t-[7px]"
              >
                <div className="flex items-center gap-[10.5px]">
                  <PrimaryDetailsIcon />
                  <span className="text-[14px] font-semibold text-[#334155]">Primary Details</span>
                </div>
                {primaryDetailsExpanded ? (
                  <IconChevronUp size={16} className="text-[#1E293B]" />
                ) : (
                  <IconChevronDown size={16} className="text-[#1E293B]" />
                )}
              </button>
              
              {primaryDetailsExpanded && (
                <div className="flex flex-col gap-[14px]">
                  {/* Warning Banner */}
                  <div className="bg-[#FEFCE8] px-[21px] py-[14px] flex items-center justify-between">
                    <div className="flex items-center gap-[7px]">
                      <IconAlertTriangle size={17.5} className="text-[#C2410C]" />
                      <span className="text-[14px] tracking-[0.25px]">
                        <span className="font-semibold text-[#C2410C]">SS Shingle Supplier </span>
                        <span className="text-[#C2410C]">has 1 open Purchase Order(s). </span>
                        <span className="text-[#3B82F6] underline cursor-pointer">View</span>
                      </span>
                    </div>
                    <button className="text-[#C2410C] hover:text-[#9A3412]">
                      <IconX size={17.5} />
                    </button>
                  </div>
                  
                  {/* Form Fields */}
                  <div className="px-[14px] pb-[21px]">
                    {/* PO Title */}
                    <div className="mb-[14px]">
                      <label className="flex gap-[1.75px] text-[12.6px] font-medium tracking-[0.25px] mb-[3.5px]">
                        <span className="text-[#334155]">PO Title </span>
                        <span className="text-[#E74C3C]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter PO Title"
                        value={formData.poTitle}
                        onChange={(e) => handleInputChange('poTitle', e.target.value)}
                        className="w-full max-w-[735px] h-[39px] px-[11.5px] bg-white border border-[#CBD5E1] rounded-[5.25px] shadow-sm text-[12.6px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#3B82F6]"
                      />
                    </div>
                    
                    {/* Row 1: Vendor, Delivery Method, Delivery Time */}
                    <div className="grid grid-cols-3 gap-[14px] mb-[14px]">
                      {/* Vendor */}
                      <div>
                        <label className="flex gap-[1.75px] text-[12.6px] font-medium tracking-[0.25px] mb-[3.5px]">
                          <span className="text-[#334155]">Vendor </span>
                          <span className="text-[#E74C3C]">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.vendor}
                            onChange={(e) => handleInputChange('vendor', e.target.value)}
                            className="w-full h-[39px] px-[11.5px] pr-[40px] bg-white border border-[#CBD5E1] rounded-[5.25px] text-[12.6px] text-[#1E293B] focus:outline-none focus:border-[#3B82F6]"
                          />
                          <button className="absolute right-[10.5px] top-1/2 -translate-y-1/2">
                            <IconX size={16} className="text-[#64748B]" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Delivery Method */}
                      <div>
                        <label className="flex gap-[1.75px] text-[12.6px] font-medium tracking-[0.25px] mb-[3.5px]">
                          <span className="text-[#334155]">Delivery Method</span>
                          <span className="text-red-500"> *</span>
                        </label>
                        <div className="relative">
                          <select
                            value={formData.deliveryMethod}
                            onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                            className="w-full h-[38.5px] px-[15px] pr-[35px] bg-white border border-[#E4E4E7] rounded-[5.25px] text-[12.6px] text-[#1E293B] focus:outline-none focus:border-[#3B82F6] appearance-none cursor-pointer"
                          >
                            <option>Direct Shipment to Job's site</option>
                            <option>Pick up from store</option>
                            <option>Delivery to warehouse</option>
                          </select>
                          <IconChevronDown size={14} className="absolute right-[15px] top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                        </div>
                      </div>
                      
                      {/* Delivery Time */}
                      <div>
                        <label className="text-[12.6px] font-medium text-[#334155] tracking-[0.25px] mb-[3.5px] block">
                          Delivery Time
                        </label>
                        <div className="relative">
                          <select
                            value={formData.deliveryTime}
                            onChange={(e) => handleInputChange('deliveryTime', e.target.value)}
                            className="w-full h-[38.5px] px-[15px] pr-[35px] bg-white border border-[#E4E4E7] rounded-[5.25px] text-[12.6px] text-[#1E293B] focus:outline-none focus:border-[#3B82F6] appearance-none cursor-pointer"
                          >
                            <option>Anytime</option>
                            <option>Morning</option>
                            <option>Afternoon</option>
                            <option>Evening</option>
                          </select>
                          <IconChevronDown size={14} className="absolute right-[15px] top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Row 2: Reference Number, Required By, Payment Term */}
                    <div className="grid grid-cols-3 gap-[14px] mb-[14px]">
                      {/* Reference Number */}
                      <div>
                        <label className="text-[12.6px] font-medium text-[#334155] tracking-[0.25px] mb-[3.5px] block">
                          Reference Number
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Reference Number"
                          value={formData.referenceNumber}
                          onChange={(e) => handleInputChange('referenceNumber', e.target.value)}
                          className="w-full h-[39px] px-[11.5px] bg-white border border-[#CBD5E1] rounded-[5.25px] shadow-sm text-[12.6px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#3B82F6]"
                        />
                      </div>
                      
                      {/* Required By */}
                      <div>
                        <label className="flex gap-[1.75px] text-[12.6px] font-medium tracking-[0.25px] mb-[3.5px]">
                          <span className="text-[#334155]">Required By </span>
                          <span className="text-[#E74C3C]">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Required Date"
                          value={formData.requiredBy}
                          onChange={(e) => handleInputChange('requiredBy', e.target.value)}
                          className="w-full h-[39px] px-[11.5px] bg-white border border-[#CBD5E1] rounded-[5.25px] text-[12.6px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#3B82F6]"
                        />
                      </div>
                      
                      {/* Payment Term */}
                      <div>
                        <label className="text-[12.6px] font-medium text-[#334155] tracking-[0.25px] mb-[3.5px] block">
                          Payment Term
                        </label>
                        <div className="relative">
                          <select
                            value={formData.paymentTerm}
                            onChange={(e) => handleInputChange('paymentTerm', e.target.value)}
                            className="w-full h-[38.5px] px-[15px] pr-[35px] bg-white border border-[#E4E4E7] rounded-[5.25px] text-[12.6px] text-[#1E293B] focus:outline-none focus:border-[#3B82F6] appearance-none cursor-pointer"
                          >
                            <option>Monthly</option>
                            <option>Net 30</option>
                            <option>Net 60</option>
                            <option>On Delivery</option>
                          </select>
                          <IconChevronDown size={14} className="absolute right-[15px] top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Template */}
                    <div className="mb-[14px] max-w-[320px]">
                      <label className="text-[12.6px] font-medium text-[#334155] tracking-[0.25px] mb-[3.5px] block">
                        Template
                      </label>
                      <div className="relative">
                        <select
                          value={formData.template}
                          onChange={(e) => handleInputChange('template', e.target.value)}
                          className="w-full h-[38.5px] px-[15px] pr-[35px] bg-white border border-[#E4E4E7] rounded-[5.25px] text-[12.6px] text-[#1E293B] focus:outline-none focus:border-[#3B82F6] appearance-none cursor-pointer"
                        >
                          <option>ABC Supply</option>
                          <option>SRS</option>
                          <option>Custom</option>
                        </select>
                        <IconChevronDown size={14} className="absolute right-[15px] top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                      </div>
                    </div>
                    
                    {/* Remarks */}
                    <div>
                      <label className="text-[12.6px] font-medium text-[#334155] tracking-[0.25px] mb-[3.5px] block">
                        Remarks
                      </label>
                      <div className="border-2 border-[#EEE] rounded-[10px] overflow-hidden">
                        {/* Rich Text Editor Content Area */}
                        <div className="min-h-[120px] p-[12px] bg-white">
                          <textarea
                            value={formData.remarks}
                            onChange={(e) => handleInputChange('remarks', e.target.value)}
                            className="w-full h-full min-h-[100px] text-[14px] text-[#334155] resize-none focus:outline-none"
                            placeholder=""
                          />
                        </div>
                        {/* Toolbar */}
                        <div className="bg-white border-t border-[#E3E3E3] px-[7px] py-[4px] flex items-center flex-wrap">
                          <div className="flex items-center border-r border-transparent pr-[1px]">
                            <button className="w-[34px] h-[28px] flex items-center justify-center rounded-[3px] hover:bg-gray-100">
                              <IconArrowBackUp size={24} className="text-[#64748B]" />
                            </button>
                            <button className="w-[34px] h-[28px] flex items-center justify-center rounded-[3px] hover:bg-gray-100">
                              <IconArrowForwardUp size={24} className="text-[#64748B]" />
                            </button>
                          </div>
                          <div className="flex items-center border-r border-transparent pr-[1px] pl-[7px]">
                            <button className="w-[34px] h-[28px] flex items-center justify-center rounded-[3px] hover:bg-gray-100">
                              <IconBold size={24} className="text-[#64748B]" />
                            </button>
                            <button className="w-[34px] h-[28px] flex items-center justify-center rounded-[3px] hover:bg-gray-100">
                              <IconItalic size={24} className="text-[#64748B]" />
                            </button>
                            <button className="flex items-center h-[28px] rounded-[3px] hover:bg-gray-100 px-[4px]">
                              <IconHighlight size={24} className="text-[#64748B]" />
                              <IconChevronDown size={10} className="text-[#64748B]" />
                            </button>
                            <button className="w-[34px] h-[28px] flex items-center justify-center rounded-[3px] hover:bg-gray-100">
                              <IconList size={24} className="text-[#64748B]" />
                            </button>
                            <button className="w-[34px] h-[28px] flex items-center justify-center rounded-[3px] hover:bg-gray-100">
                              <IconListNumbers size={24} className="text-[#64748B]" />
                            </button>
                          </div>
                          <div className="flex items-center pl-[7px]">
                            <button className="w-[34px] h-[28px] flex items-center justify-center rounded-[3px] hover:bg-gray-100">
                              <IconClearFormatting size={24} className="text-[#64748B]" />
                            </button>
                            <button className="flex items-center h-[28px] px-[4px] bg-[#F7F7F7] rounded-[3px] hover:bg-gray-200">
                              <span className="px-[4px] text-[14px] text-[#222F3E] w-[98px] overflow-hidden">Paragraph</span>
                              <IconChevronDown size={10} className="text-[#64748B]" />
                            </button>
                            <button className="flex items-center h-[28px] rounded-[3px] hover:bg-gray-100 px-[4px]">
                              <IconTable size={24} className="text-[#64748B]" />
                              <IconChevronDown size={10} className="text-[#64748B]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Association(s) Section */}
            <div className="bg-white border border-[#E2E8F0] rounded-[7px]">
              <div className="h-[42px] flex items-center px-[21px]">
                <span className="text-[15.8px] font-semibold text-[#334155]">Association(s)</span>
              </div>
              <div className="border-t border-[#E2E8F0] px-[21px] py-[21px]">
                <button className="h-[28px] px-[8.75px] bg-[#D0E9FB] rounded-full flex items-center gap-[3.5px]">
                  <IconPlus size={15.5} className="text-[#005AA3]" />
                  <span className="text-[12.6px] font-semibold text-[#005AA3]">Add</span>
                </button>
              </div>
            </div>
            
            {/* PO Items Section */}
            <div className="bg-white border border-[#E2E8F0] rounded-[7px]">
              {/* Header */}
              <button 
                onClick={() => setPoItemsExpanded(!poItemsExpanded)}
                className="w-full h-[49px] flex items-center justify-between px-[14px] border-b border-[#E2E8F0] rounded-t-[7px]"
              >
                <div className="flex items-center gap-[10.5px]">
                  <POItemsIcon />
                  <span className="text-[14px] font-semibold text-[#334155]">PO Items</span>
                </div>
                {poItemsExpanded ? (
                  <IconChevronUp size={16} className="text-[#1E293B]" />
                ) : (
                  <IconChevronDown size={16} className="text-[#1E293B]" />
                )}
              </button>
              
              {poItemsExpanded && (
                <div className="p-[21px] flex flex-col items-center">
                  <NoPartsFoundSvg />
                  <p className="text-[14px] text-[#1E293B] tracking-[0.25px] py-[3.5px]">
                    Start adding parts for the purchase order
                  </p>
                  <div className="pt-[10.5px]">
                    <button className="flex items-center gap-[7px] px-[15px] py-[2.27px] bg-white border border-[#CBD5E1] rounded-[5.25px] hover:bg-gray-50">
                      <IconPlus size={16} className="text-[#334155]" />
                      <span className="text-[12.6px] font-medium text-[#334155] tracking-[0.25px]">Add</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="w-[343.75px] overflow-auto p-[10.5px] pl-0">
          <div className="flex flex-col gap-0">
            {/* Vendor Section */}
            <div className="bg-white border-b border-[#E2E8F0]">
              {/* Header */}
              <button 
                onClick={() => setVendorExpanded(!vendorExpanded)}
                className="w-full h-[49px] flex items-center justify-between px-[14px] border-b border-[#E2E8F0]"
              >
                <div className="flex items-center gap-[10.5px]">
                  <VendorIcon />
                  <span className="text-[14px] font-semibold text-[#334155]">Vendor</span>
                </div>
                {vendorExpanded ? (
                  <IconChevronUp size={16} className="text-[#1E293B]" />
                ) : (
                  <IconChevronDown size={16} className="text-[#1E293B]" />
                )}
              </button>
              
              {vendorExpanded && (
                <div className="flex flex-col gap-[7px] pb-[10.5px]">
                  {/* Vendor Info */}
                  <div className="px-[14px] py-[10.5px] flex items-start justify-between">
                    <div className="flex items-center gap-[14px]">
                      <div className="w-[42px] h-[42px] bg-[#E2E8F0] rounded-[3.5px] flex items-center justify-center">
                        <span className="text-[14px] text-[#475569] uppercase">S</span>
                      </div>
                      <div className="flex flex-col gap-[1.75px]">
                        <span className="text-[14px] font-semibold text-[#1E293B] tracking-[0.25px]">SS Shingle Supplier</span>
                        <span className="text-[12.6px] text-[#1E293B] tracking-[0.25px]">ssshing@mail.com</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-[14px] pb-[3px]">
                      <button className="hover:opacity-70">
                        <IconMail size={21} className="text-[#64748B]" />
                      </button>
                      <button className="hover:opacity-70">
                        <IconPhone size={21} className="text-[#64748B]" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div className="px-[14px] flex items-start gap-[17.5px]">
                    <div className="w-[24.5px] h-[24.5px] bg-[#E2E8F0] rounded-full flex items-center justify-center flex-shrink-0">
                      <IconMapPin size={16} className="text-[#64748B]" />
                    </div>
                    <span className="text-[12.6px] text-[#1E293B] tracking-[0.25px] leading-[21px]">
                      ABC Supply Co. Inc., Market Street ,<br />Garland , Texas
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Delivery Address Section */}
            <div className="bg-white border-b border-[#E2E8F0]">
              {/* Header */}
              <button 
                onClick={() => setDeliveryAddressExpanded(!deliveryAddressExpanded)}
                className="w-full h-[49px] flex items-center justify-between px-[14px] border-b border-[#E2E8F0]"
              >
                <div className="flex items-center gap-[10.5px]">
                  <DeliveryAddressIcon />
                  <span className="text-[14px] font-semibold text-[#334155]">
                    Delivery Address <span className="text-red-500">*</span>
                  </span>
                </div>
                {deliveryAddressExpanded ? (
                  <IconChevronUp size={16} className="text-[#1E293B]" />
                ) : (
                  <IconChevronDown size={16} className="text-[#1E293B]" />
                )}
              </button>
              
              {deliveryAddressExpanded && (
                <div className="flex flex-col items-center p-[21px]">
                  <ServiceAddressPlaceholderSvg />
                  <div className="pt-[21px]">
                    <button className="flex items-center gap-[7px] px-[15px] py-[2.27px] bg-white border border-[#CBD5E1] rounded-[5.25px] hover:bg-gray-50">
                      <IconPlus size={16} className="text-[#334155]" />
                      <span className="text-[12.6px] font-medium text-[#334155] tracking-[0.25px]">Add Delivery Address</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Billing Address Section */}
            <div className="bg-white border-b border-[#E2E8F0]">
              {/* Header */}
              <button 
                onClick={() => setBillingAddressExpanded(!billingAddressExpanded)}
                className="w-full h-[49px] flex items-center justify-between px-[14px] border-b border-[#E2E8F0]"
              >
                <div className="flex items-center gap-[10.5px]">
                  <DeliveryAddressIcon />
                  <span className="text-[14px] font-semibold text-[#334155]">
                    Billing Address <span className="text-red-500">*</span>
                  </span>
                </div>
                <div className="flex items-center gap-0">
                  <button className="p-[3.5px] rounded-full hover:bg-gray-100">
                    <IconPencil size={17.5} className="text-[#64748B]" />
                  </button>
                  <button className="p-[3.5px] rounded-full hover:bg-gray-100">
                    <IconTrash size={17.5} className="text-[#64748B]" />
                  </button>
                  {billingAddressExpanded ? (
                    <IconChevronUp size={16} className="text-[#1E293B]" />
                  ) : (
                    <IconChevronDown size={16} className="text-[#1E293B]" />
                  )}
                </div>
              </button>
              
              {billingAddressExpanded && (
                <div className="p-[10.5px] flex flex-col gap-[10.49px]">
                  <img 
                    src={LOCATION_PREVIEW} 
                    alt="Map" 
                    className="w-full h-[120.7px] object-cover rounded"
                  />
                  <p className="text-[12.6px] text-[#1E293B] tracking-[0.25px] leading-[20px]">
                    ABC Supply Co. Inc., Market Street, Garland,<br />Texas, 75041
                  </p>
                </div>
              )}
            </div>
            
            {/* Attachments Section */}
            <div className="bg-white border-b border-[#E2E8F0]">
              {/* Header */}
              <button 
                onClick={() => setAttachmentsExpanded(!attachmentsExpanded)}
                className="w-full h-[49px] flex items-center justify-between px-[14px] border-b border-[#E2E8F0]"
              >
                <div className="flex items-center gap-[10.5px]">
                  <AttachmentsIcon />
                  <span className="text-[14px] font-semibold text-[#334155]">Attachments</span>
                </div>
                {attachmentsExpanded ? (
                  <IconChevronUp size={16} className="text-[#1E293B]" />
                ) : (
                  <IconChevronDown size={16} className="text-[#1E293B]" />
                )}
              </button>
              
              {attachmentsExpanded && (
                <div className="p-[21px] flex flex-col items-center">
                  <AttachmentPlaceholderSvg />
                  <div className="pt-[14px]">
                    <button className="flex items-center gap-[7px] px-[15px] py-[11.5px] h-[31.5px] bg-white border border-[#CBD5E1] rounded-[5.25px] hover:bg-gray-50">
                      <IconPlus size={16} className="text-[#334155]" />
                      <span className="text-[12.6px] font-medium text-[#334155] tracking-[0.25px]">Add Attachment</span>
                    </button>
                  </div>
                  <div className="pt-[7px] text-center">
                    <p className="text-[12.6px] text-[#334155] tracking-[0.25px] leading-[25.2px]">
                      Add any relevant files and attachments to<br />this Purchase Order
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPurchaseOrderPage;
