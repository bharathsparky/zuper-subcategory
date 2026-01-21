import React, { useState } from 'react';
import {
  IconChevronRight,
  IconChevronDown,
  IconChevronLeft,
  IconPencil,
  IconCalendar,
  IconPlus,
  IconNote,
  IconHome,
  IconTag,
  IconNotes,
  IconActivity,
  IconMessage,
  IconPhoto,
  IconSearch,
  IconUsers,
  IconClock,
  IconUser,
  IconUserPlus,
  IconBuilding,
  IconFolderPlus,
  IconSubtask,
  IconFileText,
  IconReceipt,
  IconPackage,
  IconShoppingCart,
  IconPaperclip,
  IconSettings,
  IconArrowLeft,
  IconCheck,
  IconPrinter,
  IconDotsVertical,
  IconX,
} from '@tabler/icons-react';

// Sample job data
const JOB_DATA = {
  id: '2025119',
  status: 'New',
  title: 'Roof Inspection Proposal for Sam Elliott',
  jobValue: null,
  startDate: '09/09/2025 08:00 AM',
  endDate: '09/09/2025 10:00 AM',
};

// Sidebar accordion sections
const SIDEBAR_SECTIONS = [
  { id: 'users', label: 'Users/Teams Assigned', count: 0, icon: IconUsers, hasAdd: true },
  { id: 'timelog', label: 'Timelog Summary', count: 0, icon: IconClock, hasAdd: false },
  { id: 'customer', label: 'Customer', count: null, icon: IconUser, hasEdit: true },
  { id: 'secondary', label: 'Secondary Contacts', count: 0, icon: IconUserPlus, hasAdd: true },
  { id: 'property', label: 'Property', count: null, icon: IconBuilding, hasAdd: true },
  { id: 'project', label: 'Project', count: null, icon: IconFolderPlus, hasAdd: true },
  { id: 'childJobs', label: 'Child Jobs Associated', count: 0, icon: IconSubtask, hasAdd: true },
  { id: 'quotes', label: 'Quotes Associated', count: 0, icon: IconFileText, hasAdd: true },
  { id: 'invoices', label: 'Invoices Associated', count: 0, icon: IconReceipt, hasAdd: true },
  { id: 'materials', label: 'Material Requests', count: 0, icon: IconPackage, hasAdd: true },
  { id: 'purchaseOrders', label: 'Purchase Orders', count: 0, icon: IconShoppingCart, hasAdd: true },
  { id: 'attachments', label: 'Attachments', count: 0, icon: IconPaperclip, hasAdd: true },
  { id: 'workflow', label: 'Workflow Activity', count: 2, icon: IconSettings, hasAdd: false, hasWarning: true },
];

// Left panel navigation items
const NAV_ITEMS = [
  { id: 'details', label: 'Details', icon: IconHome },
  { id: 'lineItems', label: 'Line Items', icon: IconTag },
  { id: 'notes', label: 'Notes', icon: IconNotes },
  { id: 'activity', label: 'Activity', icon: IconActivity },
  { id: 'chat', label: 'Chat', icon: IconMessage },
  { id: 'gallery', label: 'Gallery', icon: IconPhoto },
];

// Category hierarchy for the dropdown
const CATEGORY_HIERARCHY = [
  {
    name: 'Labor',
    subCategories: ['Delivery Charges', 'Travel Expenses']
  },
  {
    name: 'Services',
    subCategories: []
  },
  {
    name: 'Internal Costs',
    subCategories: ['Finance Fees']
  },
  {
    name: 'Installation Supplies',
    subCategories: ['Handling Fees']
  },
  {
    name: 'Fasteners',
    subCategories: ['Staples', 'Sealants & Adhesives', 'Nails']
  },
  {
    name: 'Shingles',
    subCategories: ['Valley', 'Underlayments', 'Asphalt Shingles', 'Metal Shingles']
  },
  {
    name: 'Ventilation',
    subCategories: []
  },
  {
    name: 'Gutters',
    subCategories: []
  },
];

// Sample line items for the picker
const LINE_ITEMS_DATA = [
  {
    id: 1,
    itemId: '#DELIV74',
    name: 'Materials Delivery 01-10 mi.',
    availableQty: 1,
    unit: 'Deliveries',
    category: 'Servi...',
    productType: 'Serv...',
    location: 'No Location Found!!',
    serialNo: 'No Serial Number Found',
    unitCost: '110',
    markup: '',
    unitSellingPrice: '110',
  },
  {
    id: 2,
    itemId: '#88',
    name: 'Travel Expense 11-30 mi.',
    availableQty: 1,
    unit: 'Each',
    category: 'Servi...',
    productType: 'Serv...',
    location: 'No Location Found!!',
    serialNo: 'No Serial Number Found',
    unitCost: '',
    markup: '',
    unitSellingPrice: '500',
  },
  {
    id: 3,
    itemId: '#89',
    name: 'Travel Expense 31-50 mi.',
    availableQty: 1,
    unit: 'Each',
    category: 'Servi...',
    productType: 'Serv...',
    location: 'No Location Found!!',
    serialNo: 'No Serial Number Found',
    unitCost: '',
    markup: '',
    unitSellingPrice: '1000',
  },
  {
    id: 4,
    itemId: '#91',
    name: 'Travel Expense 51-70 mi.',
    availableQty: 1,
    unit: 'Each',
    category: 'Servi...',
    productType: 'Serv...',
    location: 'No Location Found!!',
    serialNo: 'No Serial Number Found',
    unitCost: '',
    markup: '',
    unitSellingPrice: '1500',
  },
  {
    id: 5,
    itemId: '#92',
    name: 'Travel Expense 71+ mi.',
    availableQty: 1,
    unit: 'Each',
    category: 'Servi...',
    productType: 'Serv...',
    location: 'No Location Found!!',
    serialNo: 'No Serial Number Found',
    unitCost: '',
    markup: '',
    unitSellingPrice: '2000',
  },
];

// Hierarchical Category Dropdown for Modal
function CategoryDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  const toggleCategory = (category) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const handleSelect = (selectedValue) => {
    onChange?.(selectedValue);
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    if (!value) return <span className="text-[#94A3B8]">Category</span>;
    if (value.includes(' > ')) {
      const parts = value.split(' > ');
      return (
        <span className="flex items-center gap-1 text-[14px] truncate">
          <span className="text-[#64748B] truncate">{parts[0]}</span>
          <IconChevronRight size={12} className="text-[#94A3B8] flex-shrink-0" stroke={2} />
          <span className="text-[#1E293B] truncate">{parts[1]}</span>
        </span>
      );
    }
    return <span className="text-[14px] text-[#1E293B] truncate">{value}</span>;
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="min-w-[180px] h-[40px] flex items-center justify-between gap-2 px-[12px] border border-[#E2E8F0] rounded-[6px] bg-white cursor-pointer hover:bg-[#F8FAFC] whitespace-nowrap"
      >
        {getDisplayValue()}
        <IconChevronDown size={16} stroke={1.5} className="text-[#94A3B8] flex-shrink-0" />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1 w-[280px] bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-30 max-h-[320px] overflow-y-auto">
            {/* Clear selection option */}
            {value && (
              <div
                onClick={() => handleSelect('')}
                className="h-9 px-3 flex items-center cursor-pointer hover:bg-[#F8FAFC] transition-colors border-b border-[#E2E8F0] text-[13px] text-[#94A3B8]"
              >
                Clear selection
              </div>
            )}
            
            {CATEGORY_HIERARCHY.map((category) => {
              const hasSubCategories = category.subCategories.length > 0;
              const isExpanded = expandedCategories.has(category.name);
              const isParentSelected = value === category.name;

              return (
                <div key={category.name} className="border-b border-[#F1F5F9] last:border-b-0">
                  {/* Parent Category Header */}
                  <div 
                    onClick={() => {
                      if (hasSubCategories) {
                        toggleCategory(category.name);
                      } else {
                        handleSelect(category.name);
                      }
                    }}
                    className={`flex items-center h-9 px-3 hover:bg-[#F8FAFC] transition-colors cursor-pointer ${
                      !hasSubCategories && isParentSelected ? 'bg-[#DBEAFE]' : ''
                    }`}
                  >
                    {hasSubCategories && (
                      <IconChevronDown 
                        size={14} 
                        stroke={2}
                        className={`mr-2 text-[#64748B] transition-transform ${isExpanded ? '' : '-rotate-90'}`}
                      />
                    )}
                    {!hasSubCategories && <div className="w-[22px]" />}
                    
                    <span className={`text-[13px] flex-1 ${
                      !hasSubCategories && isParentSelected ? 'text-[#2563EB] font-medium' : 'text-[#1E293B]'
                    }`}>
                      {category.name}
                    </span>
                    
                    {hasSubCategories && (
                      <span className="text-[11px] text-[#94A3B8]">
                        ({category.subCategories.length})
                      </span>
                    )}
                    
                    {!hasSubCategories && isParentSelected && (
                      <IconCheck size={14} className="text-[#22C55E]" stroke={2} />
                    )}
                  </div>

                  {/* Sub-Categories (Expanded) */}
                  {hasSubCategories && isExpanded && (
                    <div className="bg-[#FAFBFC]">
                      {/* "All [Category]" option */}
                      <div
                        onClick={() => handleSelect(category.name)}
                        className={`w-full h-8 pl-7 pr-3 flex items-center cursor-pointer hover:bg-[#F1F5F9] transition-colors border-b border-[#E2E8F0] ${
                          isParentSelected ? 'bg-[#DBEAFE]' : ''
                        }`}
                      >
                        <span className={`text-[13px] font-medium flex-1 ${
                          isParentSelected ? 'text-[#2563EB]' : 'text-[#1E293B]'
                        }`}>
                          All {category.name}
                        </span>
                        {isParentSelected && (
                          <IconCheck size={14} className="text-[#22C55E]" stroke={2} />
                        )}
                      </div>
                      
                      {/* Individual sub-categories */}
                      {category.subCategories.map((sub) => {
                        const subValue = `${category.name} > ${sub}`;
                        const isSelected = value === subValue;

                        return (
                          <div
                            key={sub}
                            onClick={() => handleSelect(subValue)}
                            className={`w-full h-8 pl-7 pr-3 flex items-center cursor-pointer hover:bg-[#F1F5F9] transition-colors ${
                              isSelected ? 'bg-[#DBEAFE]' : ''
                            }`}
                          >
                            <span className={`text-[13px] flex-1 ${
                              isSelected ? 'text-[#2563EB] font-medium' : 'text-[#334155]'
                            }`}>
                              {sub}
                            </span>
                            {isSelected && (
                              <IconCheck size={14} className="text-[#22C55E]" stroke={2} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// Choose Line Item Modal Component
function ChooseLineItemModal({ isOpen, onClose, onAddProduct }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const totalPages = 26;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[8px] w-[95vw] max-w-[1500px] max-h-[90vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="h-[56px] px-[24px] flex items-center justify-between border-b border-[#E2E8F0] shrink-0">
          <h2 className="text-[18px] font-semibold text-[#1E293B]">Choose Line Item</h2>
          <button
            onClick={onClose}
            className="w-[32px] h-[32px] flex items-center justify-center rounded hover:bg-[#F1F5F9] transition-colors"
          >
            <IconX size={20} stroke={1.5} className="text-[#64748B]" />
          </button>
        </div>

        {/* Filters */}
        <div className="px-[24px] py-[16px] flex items-center gap-[12px] border-b border-[#E2E8F0] shrink-0">
          {/* Search */}
          <div className="w-[200px] h-[40px] flex items-center gap-[8px] px-[12px] border border-[#E2E8F0] rounded-[6px] bg-white">
            <IconSearch size={18} stroke={1.5} className="text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search Item"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 text-[14px] text-[#334155] placeholder-[#94A3B8] outline-none bg-transparent"
            />
          </div>

          {/* Product Type Dropdown */}
          <div className="w-[140px] h-[40px] flex items-center justify-between px-[12px] border border-[#E2E8F0] rounded-[6px] bg-white cursor-pointer hover:bg-[#F8FAFC]">
            <span className="text-[14px] text-[#94A3B8]">Product Type</span>
            <IconChevronDown size={16} stroke={1.5} className="text-[#94A3B8]" />
          </div>

          {/* Category Dropdown - Hierarchical */}
          <CategoryDropdown 
            value={selectedCategory} 
            onChange={setSelectedCategory} 
          />

          {/* Location Dropdown */}
          <div className="w-[140px] h-[40px] flex items-center justify-between px-[12px] border border-[#E2E8F0] rounded-[6px] bg-white cursor-pointer hover:bg-[#F8FAFC]">
            <span className="text-[14px] text-[#94A3B8]">Location</span>
            <IconChevronDown size={16} stroke={1.5} className="text-[#94A3B8]" />
          </div>

          {/* Availability Dropdown */}
          <div className="w-[140px] h-[40px] flex items-center justify-between px-[12px] border border-[#E2E8F0] rounded-[6px] bg-white cursor-pointer hover:bg-[#F8FAFC]">
            <span className="text-[14px] text-[#94A3B8]">Availability</span>
            <IconChevronDown size={16} stroke={1.5} className="text-[#94A3B8]" />
          </div>

          {/* Pagination */}
          <div className="ml-auto flex items-center gap-[8px]">
            <span className="text-[14px] text-[#64748B]">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#F1F5F9] transition-colors disabled:opacity-50"
              disabled={currentPage === 1}
            >
              <IconChevronLeft size={16} stroke={1.5} className="text-[#64748B]" />
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#F1F5F9] transition-colors disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              <IconChevronRight size={16} stroke={1.5} className="text-[#64748B]" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto min-h-0">
          <table className="w-full border-collapse">
            <thead className="bg-white sticky top-0 z-10">
              <tr className="border-b border-[#E2E8F0]">
                <th className="w-[40px] text-left px-[16px] py-[14px] bg-white"></th>
                <th className="w-[280px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">Item</th>
                <th className="w-[70px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">Category</th>
                <th className="w-[70px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">Type</th>
                <th className="w-[70px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">Brand</th>
                <th className="w-[90px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">Specification</th>
                <th className="w-[100px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">Location</th>
                <th className="w-[110px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">Serial No</th>
                <th className="w-[100px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider leading-tight bg-white">
                  <div>Unit Purchase</div>
                  <div>Price/Unit Cost (In</div>
                  <div>USD)</div>
                </th>
                <th className="w-[100px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">Markup</th>
                <th className="w-[100px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider leading-tight bg-white">
                  <div>Unit Selling Price</div>
                  <div>(In USD) <span className="text-[#EF4444]">*</span></div>
                </th>
                <th className="w-[80px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">
                  Quantity <span className="text-[#EF4444]">*</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {LINE_ITEMS_DATA.map((item) => (
                <tr key={item.id} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC]">
                  {/* Checkbox */}
                  <td className="px-[16px] py-[16px]">
                    <input
                      type="checkbox"
                      className="w-[16px] h-[16px] rounded border-[#CBD5E1] text-[#E44A19] focus:ring-[#E44A19] cursor-pointer"
                    />
                  </td>
                  {/* Item with image */}
                  <td className="px-[12px] py-[16px]">
                    <div className="flex items-center gap-[12px]">
                      {/* Product Image Placeholder */}
                      <div className="w-[48px] h-[48px] bg-[#F1F5F9] rounded-[6px] flex items-center justify-center flex-shrink-0">
                        <IconPackage size={24} stroke={1.5} className="text-[#94A3B8]" />
                      </div>
                      <div>
                        <div className="text-[14px] font-medium text-[#1E293B]">
                          {item.itemId} - {item.name}
                        </div>
                        <div className="text-[12px] text-[#64748B]">
                          Available Qty: {item.availableQty} {item.unit}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-[12px] py-[16px] text-[14px] text-[#64748B]">{item.category}</td>
                  <td className="px-[12px] py-[16px] text-[14px] text-[#64748B]">{item.productType}</td>
                  <td className="px-[12px] py-[16px] text-[14px] text-[#64748B]"></td>
                  <td className="px-[12px] py-[16px] text-[14px] text-[#64748B]"></td>
                  <td className="px-[12px] py-[16px] text-[14px] text-[#64748B]">{item.location}</td>
                  <td className="px-[12px] py-[16px] text-[14px] text-[#64748B]">{item.serialNo}</td>
                  <td className="px-[12px] py-[16px]">
                    <input
                      type="text"
                      defaultValue={item.unitCost}
                      placeholder="Eg: 20"
                      className="w-[80px] h-[36px] px-[10px] border border-[#E2E8F0] rounded-[4px] text-[14px] text-[#334155] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6] bg-white"
                    />
                  </td>
                  <td className="px-[12px] py-[16px]">
                    <div className="flex items-center gap-[4px]">
                      <input
                        type="text"
                        placeholder="Eg: 10"
                        className="w-[50px] h-[36px] px-[8px] border border-[#E2E8F0] rounded-[4px] text-[14px] text-[#334155] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6] bg-white"
                      />
                      <button className="text-[#94A3B8] hover:text-[#64748B]">
                        <IconX size={14} stroke={1.5} />
                      </button>
                      <IconChevronDown size={14} stroke={1.5} className="text-[#94A3B8]" />
                    </div>
                  </td>
                  <td className="px-[12px] py-[16px]">
                    <input
                      type="text"
                      defaultValue={item.unitSellingPrice}
                      className="w-[80px] h-[36px] px-[10px] border border-[#E2E8F0] rounded-[4px] text-[14px] text-[#334155] outline-none focus:border-[#3B82F6] bg-white"
                    />
                  </td>
                  <td className="px-[12px] py-[16px]">
                    <input
                      type="text"
                      placeholder="Eg: 20"
                      className="w-[60px] h-[36px] px-[8px] border border-[#E2E8F0] rounded-[4px] text-[14px] text-[#334155] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6] bg-white"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="h-[64px] px-[24px] flex items-center justify-end gap-[12px] border-t border-[#E2E8F0] shrink-0 bg-white">
          <button
            onClick={onClose}
            className="h-[40px] px-[20px] border border-[#E2E8F0] rounded-[6px] text-[14px] font-medium text-[#334155] hover:bg-[#F8FAFC] transition-colors bg-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onAddProduct && onAddProduct();
              onClose();
            }}
            className="h-[40px] px-[20px] bg-[#E44A19] rounded-[6px] text-[14px] font-medium text-white hover:bg-[#D13D0F] transition-colors"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

// Empty state illustration for Part/Service Details - using exact Figma asset
const EmptyPartsIllustration = () => (
  <img 
    src="/assets/1f63dc34225a9db81673b16f62962c2c2f0425b3.svg" 
    alt="No parts found"
    className="w-[146px] h-[112px]"
  />
);

// Sidebar Section Accordion Component
function SidebarSection({ section, isExpanded, onToggle, isSelected }) {
  const Icon = section.icon;
  
  return (
    <div className="border-b border-[#E2E8F0] last:border-b-0">
      <button
        onClick={onToggle}
        className={`w-full h-[45.5px] px-[7px] flex items-center justify-between transition-colors ${
          isSelected ? '' : 'hover:bg-[#F8FAFC]'
        }`}
      >
        <div className="flex items-center gap-[10px]">
          <Icon size={18} stroke={1.5} className="text-[#64748B]" />
          <span className="text-[13px] font-normal text-[#334155]">{section.label}</span>
          {section.count !== null && (
            <span className="text-[13px] text-[#94A3B8] font-normal">({section.count})</span>
          )}
        </div>
        <div className="flex items-center gap-[8px]">
          {section.hasWarning && (
            <>
              <button className="w-[18px] h-[18px] flex items-center justify-center text-[#94A3B8] hover:text-[#64748B]">
                <IconClock size={14} stroke={1.5} />
              </button>
              <button className="w-[18px] h-[18px] flex items-center justify-center text-[#F97316] hover:text-[#EA580C]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 5V8.5M8 11H8.01M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </>
          )}
          {section.hasAdd && (
            <button className="w-[18px] h-[18px] flex items-center justify-center text-[#94A3B8] hover:text-[#64748B]">
              <IconPlus size={14} stroke={1.5} />
            </button>
          )}
          {section.hasEdit && (
            <button className="w-[18px] h-[18px] flex items-center justify-center text-[#94A3B8] hover:text-[#64748B]">
              <IconPencil size={14} stroke={1.5} />
            </button>
          )}
          <IconChevronDown
            size={14}
            stroke={2}
            className={`text-[#94A3B8] transition-transform ${isExpanded ? '' : '-rotate-90'}`}
          />
        </div>
      </button>
      {isExpanded && (
        <div className="px-[16px] pb-[14px]">
          <div className="text-[13px] text-[#94A3B8] py-[14px]">
            No data available
          </div>
        </div>
      )}
    </div>
  );
}

// Quick Action Button Component - exact Figma colors: bg #FBE9E7, icon coral/orange
function QuickActionButton({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-[6px] flex-1"
    >
      <div className="w-[38px] h-[38px] rounded-[10.5px] bg-[#FBE9E7] flex items-center justify-center hover:bg-[#F5DDD9] transition-colors">
        <Icon size={24} stroke={1.5} className="text-[#E86C5D]" />
      </div>
      <span className="text-[11px] text-[#1E293B] text-center leading-tight font-normal">{label}</span>
    </button>
  );
}

// Navigation Item Component - exact Figma: #E8F4FD bg, #B3DDFF border, #005AA3 text
function NavItem({ item, isActive, onClick }) {
  const Icon = item.icon;
  
  return (
    <button
      onClick={onClick}
      className={`w-full h-[49px] px-[17.5px] flex items-center gap-[7px] transition-colors rounded-[7px] ${
        isActive
          ? 'bg-[#E8F4FD] border border-[#B3DDFF]'
          : 'hover:bg-[#F8FAFC]'
      }`}
    >
      <Icon size={24} stroke={1.5} className={isActive ? 'text-[#005AA3]' : 'text-[#64748B]'} />
      <span className={`text-[14px] ${isActive ? 'font-semibold text-[#005AA3]' : 'font-normal text-[#334155]'}`}>{item.label}</span>
    </button>
  );
}

function JobDetailsPage({ onBack }) {
  const [activeNav, setActiveNav] = useState('lineItems');
  const [activeTab, setActiveTab] = useState('navigation');
  const [expandedSections, setExpandedSections] = useState({});
  const [isLineItemPickerOpen, setIsLineItemPickerOpen] = useState(false);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Breadcrumb Header */}
      <div className="h-[49px] border-b border-[#E2E8F0] flex items-center justify-between px-0">
        <div className="flex items-center h-full">
          <div className="flex items-center h-full border-r border-[#E2E8F0] px-[21px]">
            <button
              onClick={onBack}
              className="text-[14px] text-[#334155] font-normal hover:underline"
            >
              Jobs
            </button>
            <IconChevronRight size={21} stroke={1.5} className="text-[#94A3B8] mx-[7px]" />
            <span className="text-[14px] text-[#334155] font-normal">
              #{JOB_DATA.id} - {JOB_DATA.title}
            </span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-[7px] px-[21px]">
          <button className="h-[31.5px] px-[14px] flex items-center gap-[7px] border border-[#E2E8F0] rounded-[5px] text-[13px] font-medium text-[#334155] hover:bg-[#F8FAFC] transition-colors">
            Print/Share
            <IconChevronDown size={12} stroke={2} className="text-[#64748B]" />
          </button>
          <button className="h-[31.5px] px-[14px] flex items-center gap-[7px] border border-[#E2E8F0] rounded-[5px] text-[13px] font-medium text-[#334155] hover:bg-[#F8FAFC] transition-colors">
            More Actions
            <IconChevronDown size={12} stroke={2} className="text-[#64748B]" />
          </button>
        </div>
      </div>

      {/* Main Content - Three Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Job Info & Navigation */}
        <div className="w-[336px] min-w-[336px] border-r border-[#E2E8F0] flex flex-col overflow-hidden">
          {/* Job Header */}
          <div className="px-[10.5px] py-[28px] border-b border-[#E2E8F0]">
            {/* Job ID & Status - row layout */}
            <div className="flex items-center justify-between mb-[14px] px-[10.5px]">
              <span className="text-[14px] text-[#64748B] font-normal">#{JOB_DATA.id.slice(0, 4)} {JOB_DATA.id.slice(4)}</span>
              <span className="px-[10px] py-[4px] bg-[rgba(2,184,117,0.15)] border border-[#02B875] text-[#02B875] text-[12.6px] font-medium rounded-[3.5px] capitalize">
                {JOB_DATA.status}
              </span>
            </div>
            
            {/* Job Title - Centered, Bold */}
            <h2 className="text-[17.5px] font-bold text-[#1E293B] leading-[1.5] text-center mb-[7px] px-[11.8px]">
              {JOB_DATA.title}
            </h2>
            
            {/* Job Value - Centered */}
            <div className="flex items-center justify-center gap-[7px] mb-[0px]">
              <span className="text-[12.6px] text-[#1E293B] font-normal">Job Value:</span>
              <span className="text-[12.6px] text-[#EF4444] font-normal">
                {JOB_DATA.jobValue || 'Not Set'}
              </span>
            </div>
            
            {/* Date Range - Centered */}
            <div className="text-[12.6px] text-[#334155] text-center font-normal">
              {JOB_DATA.startDate} → {JOB_DATA.endDate}
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="px-0 py-[14px] border-b border-[#E2E8F0]">
            <div className="flex justify-center">
              <QuickActionButton icon={IconPencil} label="Update Status" />
              <QuickActionButton icon={IconCalendar} label="Reschedule" />
              <QuickActionButton icon={IconPlus} label="New" />
              <QuickActionButton icon={IconNote} label="Add Note" />
            </div>
          </div>
          
          {/* Tabs: Navigation / Status History */}
          <div className="h-[42px] border-b border-[#E2E8F0] flex bg-white">
            <button
              onClick={() => setActiveTab('navigation')}
              className={`flex-1 h-full flex items-center justify-center text-[14px] font-medium relative ${
                activeTab === 'navigation' ? 'text-[#334155]' : 'text-[#64748B]'
              }`}
            >
              Navigation
              {activeTab === 'navigation' && (
                <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#E44A19]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('statusHistory')}
              className={`flex-1 h-full flex items-center justify-center text-[14px] font-medium relative ml-[21px] ${
                activeTab === 'statusHistory' ? 'text-[#334155]' : 'text-[#64748B]'
              }`}
            >
              Status History
              {activeTab === 'statusHistory' && (
                <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#E44A19]" />
              )}
            </button>
          </div>
          
          {/* Navigation List */}
          <div className="flex-1 overflow-y-auto px-[14px] pt-[21px]">
            <div className="flex flex-col gap-[10.5px]">
              {NAV_ITEMS.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isActive={activeNav === item.id}
                  onClick={() => setActiveNav(item.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Middle Panel - Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          {/* Part/Service Details Section */}
          <div className="flex-1 p-[14px] overflow-y-auto">
            <div className="bg-white border border-[#E2E8F0] rounded-[7px] h-full flex flex-col">
              {/* Header */}
              <div className="h-[52.5px] px-[21px] flex items-center justify-between border-b border-[#E2E8F0]">
                <h3 className="text-[16px] font-semibold text-[#1E293B]">
                  Part/Service Details (0)
                </h3>
                <div className="flex items-center gap-[7px]">
                  <button className="w-[31.5px] h-[31.5px] flex items-center justify-center border border-[#E2E8F0] rounded-[5px] hover:bg-[#F8FAFC] transition-colors">
                    <IconSearch size={16} stroke={1.5} className="text-[#64748B]" />
                  </button>
                  <button 
                    onClick={() => setIsLineItemPickerOpen(true)}
                    className="h-[31.5px] px-[14px] flex items-center gap-[7px] border border-[#E2E8F0] rounded-[5px] text-[13px] font-medium text-[#334155] hover:bg-[#F8FAFC] transition-colors"
                  >
                    <IconPlus size={14} stroke={2} className="text-[#64748B]" />
                    Add
                  </button>
                </div>
              </div>
              
              {/* Empty State */}
              <div className="flex-1 flex flex-col items-center justify-center py-[42px]">
                <EmptyPartsIllustration />
                <h4 className="text-[18px] font-semibold text-[#334155] mt-[21px]">
                  Add Parts / Services
                </h4>
                <p className="text-[14px] text-[#64748B] mt-[7px]">
                  Add any Parts / Services to this job
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Accordions + Mini Icons */}
        <div className="flex overflow-hidden border-l border-[#E2E8F0]">
          {/* Accordion list */}
          <div className="w-[280px] min-w-[280px] flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <div className="py-[4px]">
                {SIDEBAR_SECTIONS.map((section) => (
                  <SidebarSection
                    key={section.id}
                    section={section}
                    isExpanded={expandedSections[section.id]}
                    onToggle={() => toggleSection(section.id)}
                    isSelected={section.id === 'property'}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Right mini sidebar with icons */}
          <div className="w-[48px] min-w-[48px] bg-white border-l border-[#E2E8F0] flex flex-col py-[3.5px]">
            {SIDEBAR_SECTIONS.slice(0, 13).map((section, index) => {
              const Icon = section.icon;
              const isPropertySelected = index === 4;
              return (
                <div
                  key={section.id}
                  className="px-[7px] py-[7px]"
                >
                  <button
                    className={`w-[31.5px] h-[31.5px] flex items-center justify-center transition-colors rounded-[7px] ${
                      isPropertySelected ? 'bg-[#FBE9E7]' : 'hover:bg-[#F1F5F9]'
                    }`}
                    title={section.label}
                  >
                    <Icon size={21} stroke={1.5} className="text-[#64748B]" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Choose Line Item Modal */}
      <ChooseLineItemModal
        isOpen={isLineItemPickerOpen}
        onClose={() => setIsLineItemPickerOpen(false)}
        onAddProduct={() => {
          console.log('Adding product...');
        }}
      />
    </div>
  );
}

export default JobDetailsPage;
