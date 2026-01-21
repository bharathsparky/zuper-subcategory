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
} from '@tabler/icons-react';

// Product image placeholder - 3D cube/box icon matching Figma design
const productImagePlaceholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 70 70" fill="none"%3E%3Crect width="70" height="70" rx="7" fill="%23E8F4FD"/%3E%3C!-- 3D Cube --%3E%3Cpath d="M35 18L52 28V48L35 58L18 48V28L35 18Z" fill="%23B3DDFF" stroke="%2390CAF9" stroke-width="1"/%3E%3Cpath d="M35 18L52 28L35 38L18 28L35 18Z" fill="%23DBEAFE"/%3E%3Cpath d="M35 38V58L18 48V28L35 38Z" fill="%2393C5FD"/%3E%3Cpath d="M35 38V58L52 48V28L35 38Z" fill="%23B3DDFF"/%3E%3C/svg%3E';

// No attachments placeholder - matches Figma design (stacked documents with + button)
const noAttachmentsPlaceholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="140" height="132" viewBox="0 0 140 132" fill="none"%3E%3C!-- Back document --%3E%3Crect x="30" y="8" width="80" height="95" rx="6" fill="%23E2E8F0" /%3E%3C!-- Middle document --%3E%3Crect x="25" y="15" width="80" height="95" rx="6" fill="%23EEF2F6" /%3E%3C!-- Front document --%3E%3Crect x="20" y="22" width="80" height="95" rx="6" fill="%23F8FAFC" stroke="%23E2E8F0" stroke-width="1"/%3E%3C!-- Document lines --%3E%3Crect x="32" y="38" width="45" height="4" rx="2" fill="%23CBD5E1" /%3E%3Crect x="32" y="50" width="56" height="4" rx="2" fill="%23E2E8F0" /%3E%3Crect x="32" y="62" width="40" height="4" rx="2" fill="%23E2E8F0" /%3E%3Crect x="32" y="74" width="50" height="4" rx="2" fill="%23E2E8F0" /%3E%3Crect x="32" y="86" width="35" height="4" rx="2" fill="%23E2E8F0" /%3E%3C!-- Plus button circle --%3E%3Ccircle cx="100" cy="105" r="18" fill="%2394A3B8" /%3E%3C!-- Plus icon --%3E%3Cpath d="M100 97v16M92 105h16" stroke="white" stroke-width="2.5" stroke-linecap="round" /%3E%3C/svg%3E';

function ProductDetailsPage({ product, onBack }) {
  const [activeTab, setActiveTab] = useState('details');
  const [attachmentsExpanded, setAttachmentsExpanded] = useState(true);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[#64748B]">No product selected</p>
      </div>
    );
  }

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
    description: 'Cost to deliver materials to roof',
    // Other details (custom fields)
    coverage: '---',
    measurement: '---',
    unitOfPurchase: '30',
    leadTime: '---',
    downPayment: '---',
    mandatoryPart: '---',
    wastePercentage: '---',
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
    </div>
  );
}

export default ProductDetailsPage;
