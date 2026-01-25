import React, { useState } from 'react';
import {
  IconChevronRight,
  IconChevronDown,
  IconChevronUp,
  IconHome,
  IconRefresh,
  IconQrcode,
  IconPaperclip,
  IconPlus,
  IconPalette,
  IconCheck,
  IconX,
} from '@tabler/icons-react';

// Product image placeholder - 3D cube/box icon matching Figma design
const productImagePlaceholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none"%3E%3Crect width="70" height="70" rx="7" fill="%23E8F4FD"/%3E%3C!-- 3D Cube --%3E%3Cpath d="M35 18L52 28V48L35 58L18 48V28L35 18Z" fill="%23B3DDFF" stroke="%2390CAF9" stroke-width="1"/%3E%3Cpath d="M35 18L52 28L35 38L18 28L35 18Z" fill="%23DBEAFE"/%3E%3Cpath d="M35 38V58L18 48V28L35 38Z" fill="%2393C5FD"/%3E%3Cpath d="M35 38V58L52 48V28L35 38Z" fill="%23B3DDFF"/%3E%3C/svg%3E';

// No attachments placeholder - matches Figma design (stacked documents with + button)
const noAttachmentsPlaceholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="140" height="132" viewBox="0 0 140 132" fill="none"%3E%3C!-- Back document --%3E%3Crect x="30" y="8" width="80" height="95" rx="6" fill="%23E2E8F0" /%3E%3C!-- Middle document --%3E%3Crect x="25" y="15" width="80" height="95" rx="6" fill="%23EEF2F6" /%3E%3C!-- Front document --%3E%3Crect x="20" y="22" width="80" height="95" rx="6" fill="%23F8FAFC" stroke="%23E2E8F0" stroke-width="1"/%3E%3C!-- Document lines --%3E%3Crect x="32" y="38" width="45" height="4" rx="2" fill="%23CBD5E1" /%3E%3Crect x="32" y="50" width="56" height="4" rx="2" fill="%23E2E8F0" /%3E%3Crect x="32" y="62" width="40" height="4" rx="2" fill="%23E2E8F0" /%3E%3Crect x="32" y="74" width="50" height="4" rx="2" fill="%23E2E8F0" /%3E%3Crect x="32" y="86" width="35" height="4" rx="2" fill="%23E2E8F0" /%3E%3C!-- Plus button circle --%3E%3Ccircle cx="100" cy="105" r="18" fill="%2394A3B8" /%3E%3C!-- Plus icon --%3E%3Cpath d="M100 97v16M92 105h16" stroke="white" stroke-width="2.5" stroke-linecap="round" /%3E%3C/svg%3E';

// Option Preview Modal for Product Details
function OptionPreviewModal({ isOpen, onClose, option }) {
  if (!isOpen || !option) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-[12px] w-[360px] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="h-[48px] px-[16px] flex items-center justify-between border-b border-[#E2E8F0]">
          <span className="text-[14px] font-medium text-[#334155]">{option.name}</span>
          <button
            onClick={onClose}
            className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#F1F5F9] transition-colors"
          >
            <IconX size={18} stroke={1.5} className="text-[#64748B]" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="p-[20px]">
          <div className="flex justify-center">
            {option.imageUrl ? (
              <img 
                src={option.imageUrl} 
                alt={option.name}
                className="w-[280px] h-[280px] object-cover rounded-[8px] border border-[#E2E8F0]"
              />
            ) : option.color ? (
              <div 
                className="w-[280px] h-[280px] rounded-[8px] border-2 border-[#E2E8F0]"
                style={{ backgroundColor: option.color }}
              />
            ) : (
              <div className="w-[280px] h-[280px] rounded-[8px] bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center">
                <span className="text-[48px] font-medium text-[#94A3B8]">
                  {option.name?.charAt(0)?.toUpperCase() || '?'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-[20px] pb-[20px]">
          <button
            onClick={onClose}
            className="w-full h-[40px] border border-[#E2E8F0] rounded-[6px] text-[14px] font-medium text-[#334155] hover:bg-[#F8FAFC] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductDetailsPage({ product, onBack }) {
  const [activeTab, setActiveTab] = useState('details');
  const [attachmentsExpanded, setAttachmentsExpanded] = useState(true);
  const [previewOption, setPreviewOption] = useState(null);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[#64748B]">No product selected</p>
      </div>
    );
  }

  // Get description based on product
  const getProductDescription = () => {
    if (product.category === 'Shingles') {
      if (product.subCategory === 'Asphalt Shingles') {
        return 'Premium architectural asphalt shingles with enhanced durability and weather resistance. Provides excellent protection against wind, rain, and UV damage. Limited lifetime warranty included.';
      }
      if (product.subCategory === 'Metal Shingles') {
        return 'High-quality metal roofing panels with superior longevity and energy efficiency. Resistant to fire, rot, and insects. Available in multiple profiles and finishes.';
      }
      if (product.subCategory === 'Underlayments') {
        return 'Synthetic roofing underlayment providing a secondary water barrier beneath shingles. Lightweight, tear-resistant, and easy to install.';
      }
      return 'Quality roofing shingles for residential and commercial applications.';
    }
    if (product.category === 'Fasteners') {
      return 'Professional-grade roofing fasteners designed for secure installation and long-lasting performance in all weather conditions.';
    }
    if (product.category === 'Labor' && product.subCategory === 'Delivery Charges') {
      return 'Material delivery service to job site. Price varies based on distance from warehouse. Includes unloading and placement at ground level.';
    }
    if (product.category === 'Labor' && product.subCategory === 'Travel Expenses') {
      return 'Travel expense charge for jobs outside standard service area. Covers fuel, vehicle wear, and crew travel time.';
    }
    if (product.category === 'Services') {
      return 'Professional roofing service performed by certified technicians. Includes inspection, assessment, and detailed report.';
    }
    return product.specification || 'Professional roofing product/service for quality installations.';
  };

  // Extended product data for details display
  const productDetails = {
    availability: 'Available',
    type: product.type === 'SERVICE' ? 'Service' : 'Parts',
    category: product.category,
    subCategory: product.subCategory,
    unitOfMeasurement: product.quantity?.split(' ')[1] || 'Each',
    unitPurchasePrice: product.unitPrice,
    unitSellingPrice: product.unitPrice,
    billable: 'Yes',
    considerForProfitability: 'Yes',
    createdOn: product.createdOn,
    taxPreference: 'Taxable',
    description: getProductDescription(),
    // Options (Color/Variant Picker) - always show for demo
    options: [
      { id: 1, name: 'Charcoal', imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect width="40" height="40" rx="4" fill="%2336454F"/%3E%3C/svg%3E', available: true },
      { id: 2, name: 'Weathered Wood', imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect width="40" height="40" rx="4" fill="%238B7355"/%3E%3Crect x="5" y="8" width="30" height="3" rx="1" fill="%23A08060" opacity="0.6"/%3E%3Crect x="5" y="16" width="30" height="3" rx="1" fill="%23A08060" opacity="0.4"/%3E%3Crect x="5" y="24" width="30" height="3" rx="1" fill="%23A08060" opacity="0.6"/%3E%3Crect x="5" y="32" width="30" height="3" rx="1" fill="%23A08060" opacity="0.4"/%3E%3C/svg%3E', available: true },
      { id: 3, name: 'Onyx Black', imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect width="40" height="40" rx="4" fill="%23181818"/%3E%3Cellipse cx="20" cy="20" rx="12" ry="8" fill="%23282828"/%3E%3C/svg%3E', available: false },
      { id: 4, name: 'Slate Gray', imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect width="40" height="40" rx="4" fill="%23708090"/%3E%3C/svg%3E', available: true },
      { id: 5, name: 'Barkwood', imageUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Crect width="40" height="40" rx="4" fill="%234A3728"/%3E%3Crect x="3" y="10" width="34" height="4" rx="2" fill="%235D4A3A" opacity="0.5"/%3E%3Crect x="3" y="20" width="34" height="4" rx="2" fill="%235D4A3A" opacity="0.3"/%3E%3Crect x="3" y="30" width="34" height="4" rx="2" fill="%235D4A3A" opacity="0.5"/%3E%3C/svg%3E', available: true },
    ],
    customerSelectionEnabled: true,
    // Other details (custom fields) - roofing specific
    coverage: product.category === 'Shingles' ? '33.3 sq ft/bundle' : '---',
    measurement: product.category === 'Shingles' ? 'Per Square (100 sq ft)' : '---',
    unitOfPurchase: product.category === 'Shingles' ? '3 bundles' : '---',
    leadTime: product.category === 'Shingles' ? '3-5 days' : '---',
    downPayment: '---',
    mandatoryPart: product.category === 'Shingles' ? 'Yes' : '---',
    wastePercentage: product.category === 'Shingles' ? '10%' : '---',
  };

  return (
    <div className="flex flex-col h-full bg-[#F1F5F9]">
      {/* Breadcrumb Header */}
      <div className="h-[49px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-[21px]">
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="text-[15.8px] text-[#334155] font-normal hover:underline"
          >
            Parts & Services
          </button>
          <IconChevronRight size={21} className="text-[#334155] mx-2" stroke={1.5} />
          <span className="text-[15.8px] text-[#334155] font-medium">
            {product.partNo} {product.name}
          </span>
        </div>
        
        {/* More Actions Button */}
        <div className="flex items-center">
          <button className="h-[40px] px-[15px] flex items-center gap-[7px] border border-[#CBD5E1] rounded-[5.25px] text-[12.6px] font-medium text-[#334155] hover:bg-[#F8FAFC] transition-colors">
            More Actions
            <IconChevronDown size={13} className="text-[#334155]" stroke={2} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Product Info & Navigation */}
        <div className="w-[336px] min-w-[336px] bg-white border-r border-[#E2E8F0] shadow-sm overflow-y-auto">
          {/* Product Header */}
          <div className="border-b border-[#E2E8F0]">
            {/* Product Image & Title */}
            <div className="p-[14px] flex items-start">
              <div className="w-[70px] h-[70px] rounded-[7px] bg-[#E2E8F0] flex items-center justify-center overflow-hidden flex-shrink-0">
                <img 
                  src={productImagePlaceholder} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-[10.5px] flex-1 min-w-0">
                <h2 className="text-[17.5px] font-bold text-[#1E293B] leading-[26.25px] break-words">
                  {product.name}
                </h2>
                <p className="text-[12.6px] text-[#334155] leading-[18.9px] font-normal">
                  {product.partNo}
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="p-[14px] flex items-center justify-center gap-[79px]">
              <div className="flex flex-col items-center">
                <button className="w-[38px] h-[38px] rounded-[10.5px] bg-[#EFF2F5] flex items-center justify-center hover:bg-[#E2E8F0] transition-colors">
                  <IconRefresh size={24} className="text-[#64748B]" stroke={1.5} />
                </button>
                <span className="mt-[6.25px] text-[11.4px] text-[#1E293B] font-normal text-center">
                  Update Stock
                </span>
              </div>
              <div className="flex flex-col items-center">
                <button className="w-[38px] h-[38px] rounded-[10.5px] bg-[#FBE9E7] flex items-center justify-center hover:bg-[#FFCCBC] transition-colors">
                  <IconQrcode size={24} className="text-[#E44A19]" stroke={1.5} />
                </button>
                <span className="mt-[6.25px] text-[11.4px] text-[#1E293B] font-normal text-center">
                  QR Code
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="pt-[21px] px-[14px]">
            <div className="relative">
              {/* Active tab background */}
              {activeTab === 'details' && (
                <div className="absolute top-0 left-0 right-0 h-[49px] bg-[#E8F4FD] border border-[#B3DDFF] rounded-[7px]" />
              )}
              
              <div className="relative flex flex-col gap-[10.5px]">
                {/* Details Tab */}
                <button 
                  onClick={() => setActiveTab('details')}
                  className={`h-[49px] px-[17.5px] flex items-center gap-[7px] rounded-[7px] transition-colors ${
                    activeTab === 'details' 
                      ? 'text-[#005AA3]' 
                      : 'text-[#334155] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <IconHome size={24} className={activeTab === 'details' ? 'text-[#005AA3]' : 'text-[#64748B]'} stroke={1.5} />
                  <span className={`text-[14px] ${activeTab === 'details' ? 'font-semibold' : 'font-normal'}`}>
                    Details
                  </span>
                </button>

                {/* Activity Tab */}
                <button 
                  onClick={() => setActiveTab('activity')}
                  className={`h-[49px] px-[17.5px] flex items-center gap-[7px] rounded-[7px] transition-colors ${
                    activeTab === 'activity' 
                      ? 'bg-[#E8F4FD] border border-[#B3DDFF] text-[#005AA3]' 
                      : 'text-[#334155] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={activeTab === 'activity' ? 'text-[#005AA3]' : 'text-[#64748B]'}>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className={`text-[14px] ${activeTab === 'activity' ? 'font-semibold' : 'font-normal'}`}>
                    Activity
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel - Detail Cards */}
        <div className="flex-1 overflow-y-auto p-[14px]">
          <div className="flex flex-col gap-[21px]">
            
            {/* Primary Details Card */}
            <div className="bg-white rounded-[7px] shadow-sm overflow-hidden">
              <div className="px-[21px] pt-[14px]">
                <h3 className="text-[15.8px] font-semibold text-[#475569] leading-[24.5px]">
                  Primary Details
                </h3>
              </div>
              <div className="border-t border-[#E2E8F0] mt-[14px] px-[21px] py-[21px]">
                <div className="grid grid-cols-3 gap-x-[28px] gap-y-[35px]">
                  {/* Availability */}
                  <div className="flex flex-col gap-[7px]">
                    <span className="text-[12.6px] font-medium text-[#0F172A] leading-[21px]">Availability</span>
                    <div>
                      <span className="inline-flex px-[9.75px] py-[2.75px] bg-[#DCFCE7] border border-[#166534] rounded-[3.5px] text-[12.6px] font-medium text-[#166534] capitalize">
                        {productDetails.availability.toLowerCase()}
                      </span>
                    </div>
                  </div>

                  {/* Type */}
                  <div className="flex flex-col gap-[7px]">
                    <span className="text-[12.6px] font-medium text-[#0F172A] leading-[21px]">Type</span>
                    <span className="text-[14px] font-normal text-[#334155] leading-[21px]">{productDetails.type}</span>
                  </div>

                  {/* Category - matching listing page style */}
                  <div className="flex flex-col gap-[7px]">
                    <span className="text-[12.6px] font-medium text-[#0F172A] leading-[21px]">Category</span>
                    {productDetails.subCategory ? (
                      <div className="flex items-center gap-1">
                        <span className="text-[14px] text-[#64748B]">{productDetails.category}</span>
                        <IconChevronRight size={12} className="text-[#94A3B8]" stroke={2} />
                        <span className="text-[14px] text-[#334155]">{productDetails.subCategory}</span>
                      </div>
                    ) : (
                      <span className="text-[14px] text-[#334155]">{productDetails.category}</span>
                    )}
                  </div>

                  {/* Unit of Measurement */}
                  <div className="flex flex-col gap-[7px]">
                    <span className="text-[12.6px] font-medium text-[#0F172A] leading-[21px]">Unit of Measurement</span>
                    <span className="text-[14px] font-normal text-[#334155] leading-[21px]">{productDetails.unitOfMeasurement}</span>
                  </div>

                  {/* Unit Purchase Price/Unit Cost */}
                  <div className="flex flex-col gap-[7px]">
                    <span className="text-[12.6px] font-medium text-[#0F172A] leading-[21px]">Unit Purchase Price/Unit Cost</span>
                    <span className="text-[14px] font-normal text-[#334155] leading-[21px]">{productDetails.unitPurchasePrice}</span>
                  </div>

                  {/* Unit Selling Price */}
                  <div className="flex flex-col gap-[7px]">
                    <span className="text-[12.6px] font-medium text-[#0F172A] leading-[21px]">Unit Selling Price</span>
                    <span className="text-[14px] font-normal text-[#334155] leading-[21px]">{productDetails.unitSellingPrice}</span>
                  </div>

                  {/* Billable */}
                  <div className="flex flex-col gap-[7px]">
                    <span className="text-[12.6px] font-medium text-[#0F172A] leading-[21px]">Billable</span>
                    <span className="text-[14px] font-normal text-[#334155] leading-[21px]">{productDetails.billable}</span>
                  </div>

                  {/* Consider for Profitability */}
                  <div className="flex flex-col gap-[7px]">
                    <span className="text-[12.6px] font-medium text-[#0F172A] leading-[21px]">Consider for Profitability</span>
                    <span className="text-[14px] font-normal text-[#334155] leading-[21px]">{productDetails.considerForProfitability}</span>
                  </div>

                  {/* Billable (second) */}
                  <div className="flex flex-col gap-[7px]">
                    <span className="text-[12.6px] font-medium text-[#0F172A] leading-[21px]">Billable</span>
                    <span className="text-[14px] font-normal text-[#334155] leading-[21px]">{productDetails.billable}</span>
                  </div>

                  {/* Created On */}
                  <div className="flex flex-col gap-[7px]">
                    <span className="text-[12.6px] font-medium text-[#0F172A] leading-[21px]">Created On</span>
                    <span className="text-[14px] font-normal text-[#334155] leading-[21px]">{productDetails.createdOn}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Details Card */}
            <div className="bg-white rounded-[7px] shadow-sm overflow-hidden">
              <div className="px-[21px] pt-[14px]">
                <h3 className="text-[15.8px] font-semibold text-[#475569] leading-[24.5px]">
                  Tax Details
                </h3>
              </div>
              <div className="border-t border-[#E2E8F0] mt-[14px] px-[21px] py-[21px]">
                <div className="flex flex-col gap-[7px]">
                  <span className="text-[12.6px] font-medium text-[#0F172A] leading-[21px]">Tax Preference</span>
                  <span className="text-[14px] font-normal text-[#334155] leading-[21px]">{productDetails.taxPreference}</span>
                </div>
              </div>
            </div>

            {/* Options Card */}
            {productDetails.options && productDetails.options.length > 0 && (
              <div className="bg-white rounded-[7px] shadow-sm overflow-hidden">
                <div className="px-[21px] pt-[14px] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconPalette size={18} className="text-[#64748B]" stroke={1.5} />
                    <h3 className="text-[15.8px] font-semibold text-[#475569] leading-[24.5px]">
                      Options ({productDetails.options.length})
                    </h3>
                  </div>
                  {productDetails.customerSelectionEnabled && (
                    <span className="text-[12px] text-[#2563EB] bg-[#EFF6FF] px-2 py-1 rounded">
                      Customer Selection Enabled
                    </span>
                  )}
                </div>
                <div className="border-t border-[#E2E8F0] mt-[14px]">
                  {/* Options Table */}
                  <div className="divide-y divide-[#E2E8F0]">
                    {/* Table Header */}
                    <div className="grid grid-cols-[48px_1fr_100px] gap-3 px-[21px] py-2.5 bg-[#F8FAFC]">
                      <div className="text-[11px] font-medium text-[#64748B] uppercase tracking-wide">Image</div>
                      <div className="text-[11px] font-medium text-[#64748B] uppercase tracking-wide">Name</div>
                      <div className="text-[11px] font-medium text-[#64748B] uppercase tracking-wide">Available</div>
                    </div>
                    {/* Table Body */}
                    {productDetails.options.map((option) => (
                      <div 
                        key={option.id}
                        className="grid grid-cols-[48px_1fr_100px] gap-3 px-[21px] py-3 items-center hover:bg-[#FAFBFC] transition-colors"
                      >
                        {/* Image - Clickable for Preview */}
                        <div className="flex items-center">
                          <button
                            onClick={() => setPreviewOption(option)}
                            className="group relative"
                            title="Click to preview"
                          >
                            {option.imageUrl ? (
                              <div className="w-[40px] h-[40px] rounded-md border border-[#E2E8F0] overflow-hidden group-hover:ring-2 group-hover:ring-[#3B82F6] transition-all">
                                <img src={option.imageUrl} alt={option.name} className="w-full h-full object-cover" />
                              </div>
                            ) : (
                              <div className="w-[40px] h-[40px] rounded-md bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center group-hover:ring-2 group-hover:ring-[#3B82F6] transition-all">
                                <span className="text-[12px] font-medium text-[#94A3B8]">
                                  {option.name?.charAt(0)?.toUpperCase() || '?'}
                                </span>
                              </div>
                            )}
                            {/* Expand icon on hover */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2">
                                <path d="M6 1H1v5M15 1h-5M1 10v5h5M10 15h5v-5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          </button>
                        </div>
                        {/* Name */}
                        <div className="text-[14px] text-[#1E293B]">{option.name}</div>
                        {/* Available */}
                        <div className="flex items-center">
                          {option.available ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#DCFCE7] text-[#166534] text-[12px] font-medium rounded">
                              <IconCheck size={12} stroke={2.5} />
                              Yes
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#FEE2E2] text-[#991B1B] text-[12px] font-medium rounded">
                              <IconX size={12} stroke={2.5} />
                              No
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Service Description Card */}
            <div className="bg-white rounded-[7px] shadow-sm overflow-hidden">
              <div className="px-[21px] py-[14px] flex items-center">
                <h3 className="text-[15.8px] font-semibold text-[#475569] leading-[24.5px] flex-1">
                  {product.type === 'SERVICE' ? 'Service Description' : 'Product Description'}
                </h3>
              </div>
              <div className="border-t border-[#E2E8F0] px-[21px] pt-[18.5px] pb-[28px]">
                <p className="text-[14px] font-normal text-[#1E293B] leading-[21px]">
                  {productDetails.description}
                </p>
              </div>
            </div>

            {/* Other Details Card */}
            <div className="bg-white rounded-[7px] shadow-sm border border-[#E2E8F0] overflow-hidden">
              <div className="px-[21px] pt-[14px]">
                <h3 className="text-[15.8px] font-semibold text-[#475569] leading-[24.5px]">
                  Other Details
                </h3>
              </div>
              <div className="border-t border-[#E2E8F0] mt-[14px] p-[7px]">
                <div className="grid grid-cols-3">
                  {/* Coverage */}
                  <div className="p-[14px] flex flex-col gap-[7px]">
                    <span className="text-[12.6px] font-medium text-[#0F172A] leading-[21px]">Coverage</span>
                    <span className="text-[14px] font-normal text-black leading-[21px]">{productDetails.coverage}</span>
                  </div>

                  {/* Measurement */}
                  <div className="p-[14px] flex flex-col gap-[7px]">
                    <span className="text-[12.6px] font-medium text-[#0F172A] leading-[21px]">Measurement</span>
                    <span className="text-[14px] font-normal text-black leading-[21px]">{productDetails.measurement}</span>
                  </div>

                  {/* Unit of Purchase */}
                  <div className="p-[14px] flex flex-col gap-[7px]">
                    <span className="text-[12.6px] font-medium text-[#0F172A] leading-[21px]">Unit of Purchase</span>
                    <span className="text-[14px] font-normal text-black leading-[21px]">{productDetails.unitOfPurchase}</span>
                  </div>

                  {/* Lead Time (Days) */}
                  <div className="p-[14px] flex flex-col gap-[7px]">
                    <span className="text-[12.6px] font-medium text-[#0F172A] leading-[21px]">Lead Time (Days)</span>
                    <span className="text-[14px] font-normal text-black leading-[21px]">{productDetails.leadTime}</span>
                  </div>

                  {/* Down Payment */}
                  <div className="p-[14px] flex flex-col gap-[7px]">
                    <span className="text-[12.6px] font-medium text-[#0F172A] leading-[21px]">Down Payment</span>
                    <span className="text-[14px] font-normal text-black leading-[21px]">{productDetails.downPayment}</span>
                  </div>

                  {/* Mandatory Part */}
                  <div className="p-[14px] flex flex-col gap-[7px]">
                    <span className="text-[12.6px] font-medium text-[#0F172A] leading-[21px]">Mandatory Part</span>
                    <span className="text-[14px] font-normal text-black leading-[21px]">{productDetails.mandatoryPart}</span>
                  </div>

                  {/* Waste % */}
                  <div className="p-[14px] flex flex-col gap-[7px]">
                    <span className="text-[12.6px] font-medium text-[#0F172A] leading-[21px]">Waste %</span>
                    <span className="text-[14px] font-normal text-black leading-[21px]">{productDetails.wastePercentage}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Attachments Sidebar */}
        <div className="w-[343px] min-w-[343px] bg-white border-l border-[#E2E8F0] flex">
          {/* Main Attachments Area */}
          <div className="flex-1 overflow-y-auto">
            {/* Attachments Header */}
            <div 
              className="h-[45.5px] border-b border-[#E2E8F0] flex items-center px-[7px] cursor-pointer hover:bg-[#F8FAFC]"
              onClick={() => setAttachmentsExpanded(!attachmentsExpanded)}
            >
              <div className="flex items-center flex-1 overflow-hidden pr-[16px]">
                <div className="w-[24px] h-[21px] mr-[7px] flex items-center justify-center">
                  <IconPaperclip size={21} className="text-[#64748B]" stroke={1.5} />
                </div>
                <span className="text-[13px] font-medium text-[#1E293B]">Attachments</span>
                <span className="text-[13px] font-medium text-[#1E293B] ml-[3.5px]">(0)</span>
                <div className="flex-1 flex justify-end">
                  <div className="p-[3.5px]">
                    {attachmentsExpanded ? (
                      <IconChevronUp size={17.5} className="text-[#1E293B]" stroke={2} />
                    ) : (
                      <IconChevronDown size={17.5} className="text-[#1E293B]" stroke={2} />
                    )}
                  </div>
                </div>
              </div>
              <div className="ml-2 flex items-center">
                <button className="w-[12px] h-[12px] flex items-center justify-center text-[#1E293B]">
                  <IconChevronUp size={12} stroke={2} />
                </button>
              </div>
            </div>

            {/* Attachments Content */}
            {attachmentsExpanded && (
              <div className="bg-[#F8FAFC] min-h-[280px] flex items-center justify-center p-[7px]">
                <div className="flex flex-col items-center">
                  <div className="w-[140px] h-[132px] flex items-center justify-center">
                    <img 
                      src={noAttachmentsPlaceholder} 
                      alt="No attachments" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="mt-[14px] text-[12.6px] font-medium text-[#64748B] tracking-[0.25px]">
                    No Attachments Found
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right Icon Strip */}
          <div className="w-[49px] border-l border-[#E2E8F0] bg-white py-[3.5px] px-[7px]">
            <div className="flex flex-col items-center py-[7px]">
              <button className="w-[31.5px] h-[31.5px] bg-[#FBE9E7] rounded-[7px] flex items-center justify-center hover:bg-[#FFCCBC] transition-colors">
                <IconPaperclip size={21} className="text-[#E44A19]" stroke={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Option Preview Modal */}
      <OptionPreviewModal
        isOpen={!!previewOption}
        onClose={() => setPreviewOption(null)}
        option={previewOption}
      />
    </div>
  );
}

export default ProductDetailsPage;
