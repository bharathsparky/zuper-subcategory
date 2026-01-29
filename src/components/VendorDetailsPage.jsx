import React, { useState } from 'react';
import { 
  IconPhone, 
  IconMail, 
  IconPlus, 
  IconNotes, 
  IconHome, 
  IconPackage, 
  IconFileInvoice, 
  IconMessage, 
  IconActivity,
  IconSearch,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
  IconChevronDown,
  IconBuildingBank,
  IconPaperclip,
  IconChevronRight as IconBreadcrumbArrow
} from '@tabler/icons-react';

// Mock data for products
const MOCK_PRODUCTS = [
  { id: 1, sku: '#12345 - PLACEHOLDER', category: 'Sidewall SWA', image: null },
  { id: 2, sku: '#ASP.SHI.24109 - IKO - Architectural - Cambridg...', category: 'Shingles SHI', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop' },
  { id: 3, sku: '#ASP.SHI.40918 - IKO - Architectural - Cambridg...', category: 'Shingles SHI', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop' },
  { id: 4, sku: '#ASP.SHI.74824 - IKO - Architectural - Cambridg...', category: 'Shingles SHI', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop' },
  { id: 5, sku: '#ASP.SHI.95785 - IKO - Architectural - Cambridg...', category: 'Shingles SHI', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop' },
  { id: 6, sku: '#ASP.SHI.48522 - IKO - Architectural - Cambridg...', category: 'Shingles SHI', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop' },
  { id: 7, sku: '#ASP.SHI.73459 - IKO - Architectural - Cambridg...', category: 'Shingles SHI', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop' },
  { id: 8, sku: '#ASP.SHI.86264 - IKO - Architectural - Cambridg...', category: 'Shingles SHI', image: null },
  { id: 9, sku: '#ASP.SHI.31413 - IKO - Architectural - Cambridge...', category: 'Shingles SHI', image: null },
  { id: 10, sku: '#ASP.SHI.74281 - IKO - Architectural - Cambridg...', category: 'Shingles SHI', image: null },
];

// Vendor data
const VENDOR_DATA = {
  id: '22',
  name: 'SRS',
  status: 'Active',
  address: '2318 North 23rd Street, Wilmington, North Carolina, United States, 28405',
};

function VendorDetailsPage({ onBack }) {
  const [activeTab, setActiveTab] = useState('product-catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 17;

  const navItems = [
    { id: 'details', label: 'Details', icon: IconHome, count: null },
    { id: 'product-catalog', label: 'Product Catalog', icon: IconPackage, count: 161 },
    { id: 'purchase-orders', label: 'Purchase Orders', icon: IconFileInvoice, count: 17 },
    { id: 'notes', label: 'Notes', icon: IconMessage, count: null },
    { id: 'activity', label: 'Activity', icon: IconActivity, count: null },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Breadcrumb Header */}
      <div className="h-[49px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-[21px]">
        <div className="flex items-center gap-[14px]">
          <span className="text-[14px] text-[#64748B]">Vendors</span>
          <IconBreadcrumbArrow size={21} className="text-[#94A3B8]" />
          <span className="text-[14px] text-[#1E293B] font-medium">22 - SRS</span>
        </div>
        <button className="px-[15px] py-[7px] border border-[#E2E8F0] rounded-[4px] text-[14px] text-[#64748B] hover:bg-[#F8FAFC] transition-colors flex items-center gap-[7px]">
          More Actions
          <IconChevronDown size={13} className="text-[#64748B]" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Vendor Info */}
        <div className="w-[336px] bg-white border-r border-[#E2E8F0] flex flex-col">
          {/* Vendor Header */}
          <div className="p-[24px] border-b border-[#E2E8F0]">
            {/* ID and Status */}
            <div className="flex items-center justify-between mb-[14px]">
              <span className="text-[21px] font-semibold text-[#1E293B]">{VENDOR_DATA.id}</span>
              <span className="px-[10px] py-[4px] bg-[#DCFCE7] text-[#16A34A] text-[13px] font-medium rounded-[4px]">
                {VENDOR_DATA.status}
              </span>
            </div>
            
            {/* Vendor Name */}
            <h2 className="text-[18px] font-semibold text-[#1E293B] text-center mb-[7px]">{VENDOR_DATA.name}</h2>
            
            {/* Address */}
            <p className="text-[13px] text-[#64748B] text-center leading-[1.5]">{VENDOR_DATA.address}</p>
          </div>

          {/* Quick Actions */}
          <div className="p-[14px] border-b border-[#E2E8F0]">
            <div className="flex justify-center gap-[24px]">
              <button className="flex flex-col items-center gap-[6px] group">
                <div className="w-[38px] h-[38px] rounded-full bg-[#EFF6FF] flex items-center justify-center group-hover:bg-[#DBEAFE] transition-colors">
                  <IconPhone size={20} className="text-[#3B82F6]" />
                </div>
                <span className="text-[12px] text-[#64748B]">Call</span>
              </button>
              <button className="flex flex-col items-center gap-[6px] group">
                <div className="w-[38px] h-[38px] rounded-full bg-[#EFF6FF] flex items-center justify-center group-hover:bg-[#DBEAFE] transition-colors">
                  <IconMail size={20} className="text-[#3B82F6]" />
                </div>
                <span className="text-[12px] text-[#64748B]">Mail</span>
              </button>
              <button className="flex flex-col items-center gap-[6px] group">
                <div className="w-[38px] h-[38px] rounded-full bg-[#EFF6FF] flex items-center justify-center group-hover:bg-[#DBEAFE] transition-colors">
                  <IconPlus size={20} className="text-[#3B82F6]" />
                </div>
                <span className="text-[12px] text-[#64748B]">New PO</span>
              </button>
              <button className="flex flex-col items-center gap-[6px] group">
                <div className="w-[38px] h-[38px] rounded-full bg-[#EFF6FF] flex items-center justify-center group-hover:bg-[#DBEAFE] transition-colors">
                  <IconNotes size={20} className="text-[#3B82F6]" />
                </div>
                <span className="text-[12px] text-[#64748B]">Add Note</span>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-[14px]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-[17px] py-[14px] rounded-[4px] mb-[3.5px] transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#EFF6FF] text-[#3B82F6]'
                    : 'text-[#64748B] hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center gap-[7px]">
                  <item.icon size={20} stroke={1.5} />
                  <span className="text-[14px] font-medium">{item.label}</span>
                </div>
                {item.count !== null && (
                  <span className={`text-[13px] px-[7px] py-[3px] rounded-[4px] ${
                    activeTab === item.id
                      ? 'bg-[#DBEAFE] text-[#3B82F6]'
                      : 'bg-[#F1F5F9] text-[#64748B]'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content - Product Catalog */}
        <div className="flex-1 p-[14px] overflow-auto">
          <div className="bg-white rounded-[4px] shadow-sm h-full">
            {/* Table Header */}
            <div className="p-[14px] flex items-center justify-between">
              {/* Search */}
              <div className="relative">
                <IconSearch size={14} className="absolute left-[10px] top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="text"
                  placeholder="Search by Product na..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[180px] h-[35px] pl-[32px] pr-[14px] border border-[#E2E8F0] rounded-[4px] text-[13px] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              {/* Pagination and Add Button */}
              <div className="flex items-center gap-[14px]">
                <div className="flex items-center gap-[7px]">
                  <span className="text-[13px] text-[#64748B]">Page {currentPage} of {totalPages}</span>
                  <div className="flex items-center">
                    <button 
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="w-[35px] h-[35px] flex items-center justify-center hover:bg-[#F8FAFC] rounded-[4px] disabled:opacity-40"
                    >
                      <IconChevronsLeft size={20} className="text-[#64748B]" />
                    </button>
                    <button 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="w-[35px] h-[35px] flex items-center justify-center hover:bg-[#F8FAFC] rounded-[4px] disabled:opacity-40"
                    >
                      <IconChevronLeft size={20} className="text-[#64748B]" />
                    </button>
                    <button 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="w-[35px] h-[35px] flex items-center justify-center hover:bg-[#F8FAFC] rounded-[4px] disabled:opacity-40"
                    >
                      <IconChevronRight size={20} className="text-[#64748B]" />
                    </button>
                    <button 
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="w-[35px] h-[35px] flex items-center justify-center hover:bg-[#F8FAFC] rounded-[4px] disabled:opacity-40"
                    >
                      <IconChevronsRight size={20} className="text-[#64748B]" />
                    </button>
                  </div>
                </div>
                <button className="h-[31px] px-[14px] bg-[#E44A19] text-white rounded-[4px] text-[13px] font-medium flex items-center gap-[7px] hover:bg-[#D43D12] transition-colors">
                  <IconPlus size={13} />
                  Add
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-auto">
              {/* Table Header Row */}
              <div className="border-y border-[#E2E8F0] px-[35px] py-[10px] flex items-center">
                <div className="w-[45%] text-[12px] font-medium text-[#64748B] uppercase tracking-wider">Item</div>
                <div className="w-[35%] text-[12px] font-medium text-[#64748B] uppercase tracking-wider">Category</div>
                <div className="w-[20%] text-[12px] font-medium text-[#64748B] uppercase tracking-wider text-center">Actions</div>
              </div>

              {/* Table Body */}
              {MOCK_PRODUCTS.map((product) => (
                <div 
                  key={product.id}
                  className="px-[14px] py-[7px] flex items-center border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors"
                >
                  <div className="w-[45%] flex items-center gap-[14px] pl-[21px]">
                    {/* Product Image */}
                    <div className="w-[42px] h-[42px] rounded-[4px] bg-[#F1F5F9] overflow-hidden flex-shrink-0">
                      {product.image ? (
                        <img src={product.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <IconPackage size={20} className="text-[#94A3B8]" />
                        </div>
                      )}
                    </div>
                    {/* Product SKU */}
                    <span className="text-[14px] text-[#3B82F6] truncate">{product.sku}</span>
                  </div>
                  <div className="w-[35%] text-[14px] text-[#64748B]">{product.category}</div>
                  <div className="w-[20%] flex items-center justify-center gap-[14px]">
                    <button className="p-[7px] hover:bg-[#F1F5F9] rounded-[4px] transition-colors">
                      <IconDotsVertical size={18} className="text-[#94A3B8]" />
                    </button>
                    <button className="p-[7px] hover:bg-[#F1F5F9] rounded-[4px] transition-colors">
                      <IconChevronDown size={18} className="text-[#94A3B8]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[343px] bg-white border-l border-[#E2E8F0] flex">
          {/* Sidebar Content */}
          <div className="flex-1 p-[7px]">
            {/* Bank Details Section */}
            <div className="mb-[7px]">
              <button className="w-full flex items-center justify-between p-[7px] hover:bg-[#F8FAFC] rounded-[4px] transition-colors">
                <div className="flex items-center gap-[7px]">
                  <IconBuildingBank size={21} className="text-[#64748B]" />
                  <span className="text-[14px] font-medium text-[#1E293B]">Bank Details</span>
                </div>
                <IconChevronDown size={12} className="text-[#94A3B8] rotate-180" />
              </button>
              
              {/* Bank Details Empty State */}
              <div className="py-[21px] flex flex-col items-center">
                {/* Illustration */}
                <div className="w-[168px] h-[186px] mb-[14px]">
                  <svg viewBox="0 0 168 187" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <rect x="34" y="60" width="100" height="80" rx="4" fill="#F1F5F9"/>
                    <rect x="44" y="75" width="80" height="8" rx="2" fill="#E2E8F0"/>
                    <rect x="44" y="91" width="60" height="8" rx="2" fill="#E2E8F0"/>
                    <rect x="44" y="107" width="40" height="8" rx="2" fill="#E2E8F0"/>
                    <circle cx="134" cy="50" r="20" fill="#DBEAFE"/>
                    <path d="M134 42V58M126 50H142" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <button className="px-[14px] py-[7px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#64748B] hover:bg-[#F8FAFC] transition-colors flex items-center gap-[7px]">
                  <IconPlus size={14} />
                  Add Bank Details
                </button>
              </div>
            </div>

            {/* Attachments Section */}
            <div>
              <button className="w-full flex items-center justify-between p-[7px] hover:bg-[#F8FAFC] rounded-[4px] transition-colors">
                <div className="flex items-center gap-[7px]">
                  <IconPaperclip size={21} className="text-[#64748B]" />
                  <span className="text-[14px] font-medium text-[#1E293B]">Attachments</span>
                  <span className="text-[13px] text-[#94A3B8]">(0)</span>
                </div>
                <div className="flex items-center gap-[7px]">
                  <button className="p-[3.5px] hover:bg-[#F1F5F9] rounded transition-colors">
                    <IconPlus size={18} className="text-[#94A3B8]" />
                  </button>
                  <IconChevronDown size={12} className="text-[#94A3B8]" />
                </div>
              </button>
            </div>
          </div>

          {/* Sidebar Icon Strip */}
          <div className="w-[49px] border-l border-[#E2E8F0] py-[3.5px]">
            <div className="flex flex-col items-center gap-[3.5px]">
              <button className="w-[31px] h-[31px] rounded-[4px] bg-[#F1F5F9] flex items-center justify-center">
                <IconBuildingBank size={18} className="text-[#64748B]" />
              </button>
              <button className="w-[31px] h-[31px] rounded-[4px] hover:bg-[#F8FAFC] flex items-center justify-center transition-colors">
                <IconPaperclip size={18} className="text-[#94A3B8]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorDetailsPage;
