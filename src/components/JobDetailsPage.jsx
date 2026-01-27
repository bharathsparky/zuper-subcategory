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
  id: 'JOB-2025-1847',
  status: 'Booked',
  title: 'Roof Replacement - 2847 Oak Street',
  jobValue: '$18,450.00',
  startDate: '01/28/2025 07:00 AM',
  endDate: '01/30/2025 05:00 PM',
};

// Added line items (parts/services already added to the job)
const ADDED_LINE_ITEMS = [
  {
    id: 1,
    partId: 'SHG-001',
    itemCode: '#RF-SHG-001',
    name: 'GAF Timberline HDZ Shingles',
    description: '33.3 sq ft per bundle',
    image: null,
    unitCost: '$42.50',
    markup: '25%',
    taxPreference: 'Taxable',
    location: 'Main Warehouse',
    qty: '75',
    unit: 'Bundles',
    selectedOption: { name: 'Charcoal', color: '#374151' },
  },
  {
    id: 2,
    partId: 'UND-002',
    itemCode: '#RF-UND-002',
    name: 'Synthetic Underlayment',
    description: 'GAF FeltBuster 10 sq roll',
    image: null,
    unitCost: '$85.00',
    markup: '20%',
    taxPreference: 'Taxable',
    location: 'Main Warehouse',
    qty: '12',
    unit: 'Rolls',
    selectedOption: null,
  },
];

// Job costing summary
const JOB_COSTING = {
  profitMargin: 28,
  totalRevenue: '$18,450.00',
  cogs: '$13,284.00',
  profit: '$5,166.00',
  nonBillable: '$0.00',
  subTotal: '$17,500.00',
  total: '$18,450.00',
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
  { id: 'lineItems', label: 'Line Items', icon: IconTag, count: 2 },
  { id: 'measurements', label: 'Measurements', icon: IconReceipt },
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
    itemId: '#RF-SHG-001',
    name: 'GAF Timberline HDZ Shingles',
    availableQty: 150,
    unit: 'Bundles',
    category: 'Shingles',
    productType: 'Material',
    location: 'Main Warehouse',
    serialNo: 'N/A',
    unitCost: '42.50',
    markup: '25',
    unitSellingPrice: '53.13',
    hasOptions: true,
    options: [
      { id: 'opt-1', name: 'Charcoal', color: '#374151' },
      { id: 'opt-2', name: 'Weathered Wood', color: '#78716C' },
      { id: 'opt-3', name: 'Onyx Black', color: '#1F2937' },
      { id: 'opt-4', name: 'Slate Gray', color: '#64748B' },
      { id: 'opt-5', name: 'Barkwood', color: '#92400E' },
      { id: 'opt-6', name: 'Hickory', color: '#854D0E' },
      { id: 'opt-7', name: 'Pewter Gray', color: '#6B7280' },
      { id: 'opt-8', name: 'Shakewood', color: '#A16207' },
      { id: 'opt-9', name: 'Mission Brown', color: '#713F12' },
      { id: 'opt-10', name: 'Hunter Green', color: '#166534' },
      { id: 'opt-11', name: 'Patriot Red', color: '#991B1B' },
      { id: 'opt-12', name: 'Driftwood', color: '#9CA3AF' },
    ],
  },
  {
    id: 2,
    itemId: '#RF-UND-001',
    name: 'Synthetic Underlayment Roll',
    availableQty: 45,
    unit: 'Rolls',
    category: 'Underlayment',
    productType: 'Material',
    location: 'Main Warehouse',
    serialNo: 'N/A',
    unitCost: '85.00',
    markup: '20',
    unitSellingPrice: '102.00',
    hasOptions: false,
    options: [],
  },
  {
    id: 10,
    itemId: '#RF-UND-002',
    name: 'Synthetic Underlayment',
    availableQty: 30,
    unit: 'Rolls',
    category: 'Underlayment',
    productType: 'Material',
    location: 'Main Warehouse',
    serialNo: 'N/A',
    unitCost: '85.00',
    markup: '20',
    unitSellingPrice: '102.00',
    hasOptions: true,
    options: [
      { id: 'und-1', name: 'Standard Gray', color: '#6B7280' },
      { id: 'und-2', name: 'Premium Black', color: '#1F2937' },
      { id: 'und-3', name: 'High-Temp White', color: '#F3F4F6' },
      { id: 'und-4', name: 'Ice & Water Shield', color: '#3B82F6' },
    ],
  },
  {
    id: 3,
    itemId: '#RF-RDG-001',
    name: 'Ridge Cap Shingles',
    availableQty: 80,
    unit: 'Bundles',
    category: 'Shingles',
    productType: 'Material',
    location: 'Main Warehouse',
    serialNo: 'N/A',
    unitCost: '55.00',
    markup: '22',
    unitSellingPrice: '67.10',
    hasOptions: true,
    options: [
      { id: 'opt-1', name: 'Charcoal', color: '#374151' },
      { id: 'opt-2', name: 'Weathered Wood', color: '#78716C' },
      { id: 'opt-3', name: 'Onyx Black', color: '#1F2937' },
    ],
  },
  {
    id: 4,
    itemId: '#RF-DRP-001',
    name: 'Aluminum Drip Edge - 10ft',
    availableQty: 200,
    unit: 'Pieces',
    category: 'Flashing',
    productType: 'Material',
    location: 'Main Warehouse',
    serialNo: 'N/A',
    unitCost: '8.50',
    markup: '30',
    unitSellingPrice: '11.05',
    hasOptions: true,
    options: [
      { id: 'opt-1', name: 'White', color: '#F8FAFC' },
      { id: 'opt-2', name: 'Brown', color: '#78350F' },
      { id: 'opt-3', name: 'Black', color: '#1F2937' },
    ],
  },
  {
    id: 5,
    itemId: '#RF-LBR-001',
    name: 'Roof Installation Labor',
    availableQty: 1,
    unit: 'Per Square',
    category: 'Labor',
    productType: 'Service',
    location: 'N/A',
    serialNo: 'N/A',
    unitCost: '75.00',
    markup: '35',
    unitSellingPrice: '101.25',
    hasOptions: false,
    options: [],
  },
];

// Hierarchical Category Dropdown for Modal - with checkbox pattern
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
      // Show only the subcategory name
      const parts = value.split(' > ');
      return <span className="text-[14px] text-[#1E293B] truncate">{parts[1]}</span>;
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
                  {/* Parent Category Header with expand arrow and checkbox */}
                  <div className="flex items-center h-10 px-3 hover:bg-[#F8FAFC] transition-colors">
                    {/* Expand/Collapse Arrow */}
                    {hasSubCategories ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCategory(category.name);
                        }}
                        className="w-5 h-5 flex items-center justify-center mr-1"
                      >
                        <IconChevronDown 
                          size={14} 
                          stroke={2}
                          className={`text-[#64748B] transition-transform ${isExpanded ? '' : '-rotate-90'}`}
                        />
                      </button>
                    ) : (
                      <div className="w-6" />
                    )}
                    
                    {/* Checkbox for selecting parent category */}
                    <button
                      type="button"
                      onClick={() => handleSelect(category.name)}
                      className={`w-4 h-4 mr-2.5 rounded border flex items-center justify-center flex-shrink-0 ${
                        isParentSelected 
                          ? 'bg-[#2563EB] border-[#2563EB]' 
                          : 'border-[#CBD5E1] bg-white hover:border-[#94A3B8]'
                      }`}
                    >
                      {isParentSelected && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                    
                    {/* Category Name */}
                    <span 
                      className={`text-[13px] flex-1 cursor-pointer ${isParentSelected ? 'text-[#1E293B] font-medium' : 'text-[#1E293B]'}`}
                      onClick={() => handleSelect(category.name)}
                    >
                      {category.name}
                    </span>
                  </div>

                  {/* Sub-Categories (Expanded) */}
                  {hasSubCategories && isExpanded && (
                    <div className="bg-[#FAFBFC]">
                      {category.subCategories.map((sub) => {
                        const subValue = `${category.name} > ${sub}`;
                        const isSelected = value === subValue;

                        return (
                          <div
                            key={sub}
                            className="flex items-center h-9 pl-11 pr-3 hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                            onClick={() => handleSelect(subValue)}
                          >
                            {/* Checkbox for subcategory */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelect(subValue);
                              }}
                              className={`w-4 h-4 mr-2.5 rounded border flex items-center justify-center flex-shrink-0 ${
                                isSelected 
                                  ? 'bg-[#2563EB] border-[#2563EB]' 
                                  : 'border-[#CBD5E1] bg-white hover:border-[#94A3B8]'
                              }`}
                            >
                              {isSelected && (
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                            </button>
                            
                            <span className={`text-[13px] ${isSelected ? 'text-[#1E293B] font-medium' : 'text-[#64748B]'}`}>
                              {sub}
                            </span>
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

// Get available options for a product by matching item code
function getProductOptions(itemCode) {
  const product = LINE_ITEMS_DATA.find(p => p.itemId === itemCode);
  return product?.options || [];
}

// Option Preview Modal - for viewing option details larger
function OptionPreviewModal({ isOpen, onClose, option, onSelect, showSelectButton = true }) {
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
          {/* Large Preview */}
          <div className="flex justify-center">
            {option.image ? (
              <img 
                src={option.image} 
                alt={option.name}
                className="w-[280px] h-[280px] object-cover rounded-[8px] border border-[#E2E8F0]"
              />
            ) : (
              <div 
                className="w-[280px] h-[280px] rounded-[8px] border-2 border-[#E2E8F0]"
                style={{ backgroundColor: option.color }}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-[20px] pb-[20px] flex gap-[12px]">
          <button
            onClick={onClose}
            className={`h-[40px] border border-[#E2E8F0] rounded-[6px] text-[14px] font-medium text-[#334155] hover:bg-[#F8FAFC] transition-colors ${showSelectButton ? 'flex-1' : 'w-full'}`}
          >
            Close
          </button>
          {showSelectButton && onSelect && (
            <button
              onClick={() => {
                onSelect(option);
                onClose();
              }}
              className="flex-1 h-[40px] bg-[#2563EB] rounded-[6px] text-[14px] font-medium text-white hover:bg-[#1D4ED8] transition-colors"
            >
              Select
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Edit Line Item Modal Component
function EditLineItemModal({ isOpen, onClose, item, onSave }) {
  const [formData, setFormData] = useState({
    unitCost: '',
    markup: '',
    sellingPrice: '',
    quantity: '',
    taxPreference: 'Taxable',
    location: '',
    selectedOption: null,
    optionSearch: '',
    allowCustomerSelection: true,
    optionDropdownOpen: false,
  });
  const [previewOption, setPreviewOption] = useState(null);

  const availableOptions = item ? getProductOptions(item.itemCode) : [];
  const hasOptions = availableOptions.length > 0;

  // Initialize form data when item changes
  React.useEffect(() => {
    if (item) {
      setFormData({
        unitCost: item.unitCost?.replace('$', '') || '',
        markup: item.markup?.replace('%', '') || '',
        sellingPrice: '53.13',
        quantity: item.qty || '',
        taxPreference: item.taxPreference || 'Taxable',
        location: item.location || '',
        selectedOption: item.selectedOption || null,
        optionSearch: '',
        allowCustomerSelection: item.allowCustomerSelection !== false,
        optionDropdownOpen: false,
      });
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const handleOptionSelect = (option) => {
    setFormData(prev => ({ ...prev, selectedOption: option }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[8px] w-[600px] max-h-[90vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="h-[56px] px-[24px] flex items-center justify-between border-b border-[#E2E8F0] shrink-0">
          <h2 className="text-[18px] font-semibold text-[#1E293B]">Edit Line Item</h2>
          <button
            onClick={onClose}
            className="w-[32px] h-[32px] flex items-center justify-center rounded hover:bg-[#F1F5F9] transition-colors"
          >
            <IconX size={20} stroke={1.5} className="text-[#64748B]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-[24px]">
          {/* Product Info Header */}
          <div className="flex items-start gap-[16px] pb-[20px] border-b border-[#E2E8F0] mb-[20px]">
            <div className="w-[56px] h-[56px] bg-[#EFF6FF] rounded-[8px] flex items-center justify-center flex-shrink-0 border border-[#DBEAFE]">
              <IconPackage size={28} stroke={1.5} className="text-[#3B82F6]" />
            </div>
            <div className="flex-1">
              <span className="text-[13px] font-medium text-[#2563EB]">{item.itemCode}</span>
              <h3 className="text-[16px] font-semibold text-[#1E293B] mt-0.5">{item.name}</h3>
              {item.description && (
                <p className="text-[13px] text-[#64748B] mt-1">{item.description}</p>
              )}
            </div>
          </div>

          {/* Option Selector - Only show if product has options */}
          {hasOptions && (
            <div className="mb-[20px]">
              {/* Show Customer Selection only for second item (UND-002) - for proposal flow demo */}
              {/* First item (SHG-001) represents job edit flow without customer selection */}
              {/* Second item (UND-002) represents proposal edit flow with customer selection */}
              <div className={`grid gap-[16px] ${item?.itemCode === '#RF-UND-002' ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {/* Option Dropdown */}
                <div>
                  <label className="block text-[13px] font-medium text-[#334155] mb-[8px]">
                    Option <span className="text-[#94A3B8] font-normal">({availableOptions.length} available)</span>
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, optionDropdownOpen: !prev.optionDropdownOpen }))}
                      className="w-full h-[40px] flex items-center gap-[10px] px-[12px] border border-[#E2E8F0] rounded-[6px] bg-white hover:bg-[#F8FAFC] transition-colors"
                    >
                      {formData.selectedOption ? (
                        <>
                          {formData.selectedOption.image ? (
                            <img 
                              src={formData.selectedOption.image} 
                              alt={formData.selectedOption.name}
                              className="w-[24px] h-[24px] rounded-[4px] object-cover border border-[#E2E8F0] flex-shrink-0"
                            />
                          ) : formData.selectedOption.color ? (
                            <div 
                              className="w-[24px] h-[24px] rounded-[4px] border border-[#E2E8F0] flex-shrink-0"
                              style={{ backgroundColor: formData.selectedOption.color }}
                            />
                          ) : (
                            <div className="w-[24px] h-[24px] rounded-[4px] border border-[#E2E8F0] bg-[#F1F5F9] flex items-center justify-center flex-shrink-0">
                              <IconPhoto size={14} stroke={1.5} className="text-[#94A3B8]" />
                            </div>
                          )}
                          <span className="text-[14px] text-[#334155] truncate flex-1 text-left">{formData.selectedOption.name}</span>
                        </>
                      ) : (
                        <span className="text-[14px] text-[#94A3B8]">Select an option</span>
                      )}
                      <IconChevronDown size={16} stroke={1.5} className="text-[#94A3B8] flex-shrink-0" />
                    </button>

                    {formData.optionDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setFormData(prev => ({ ...prev, optionDropdownOpen: false }))} />
                        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-[#E2E8F0] rounded-[6px] shadow-lg z-50 max-h-[280px] overflow-hidden">
                          {/* Search in dropdown */}
                          {availableOptions.length > 6 && (
                            <div className="p-[8px] border-b border-[#E2E8F0]">
                              <div className="h-[32px] flex items-center gap-[8px] px-[10px] border border-[#E2E8F0] rounded-[4px] bg-[#F8FAFC]">
                                <IconSearch size={14} stroke={1.5} className="text-[#94A3B8]" />
                                <input
                                  type="text"
                                  placeholder="Search options..."
                                  value={formData.optionSearch || ''}
                                  onChange={(e) => setFormData(prev => ({ ...prev, optionSearch: e.target.value }))}
                                  className="flex-1 text-[13px] text-[#334155] placeholder-[#94A3B8] outline-none bg-transparent"
                                />
                              </div>
                            </div>
                          )}
                          
                          {/* Options list */}
                          <div className="max-h-[220px] overflow-y-auto py-[4px]">
                            {availableOptions
                              .filter(opt => 
                                !formData.optionSearch || 
                                opt.name.toLowerCase().includes((formData.optionSearch || '').toLowerCase())
                              )
                              .map((option) => (
                              <div
                                key={option.id}
                                className={`flex items-center gap-[10px] px-[12px] py-[8px] hover:bg-[#F8FAFC] transition-colors cursor-pointer ${
                                  formData.selectedOption?.id === option.id ? 'bg-[#EFF6FF]' : ''
                                }`}
                              >
                                {/* Preview button */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setPreviewOption(option);
                                  }}
                                  className="group relative flex-shrink-0"
                                  title="Click to preview"
                                >
                                  {option.image ? (
                                    <img 
                                      src={option.image} 
                                      alt={option.name}
                                      className="w-[32px] h-[32px] rounded-[4px] object-cover border border-[#E2E8F0] group-hover:ring-2 group-hover:ring-[#3B82F6]"
                                    />
                                  ) : option.color ? (
                                    <div 
                                      className="w-[32px] h-[32px] rounded-[4px] border border-[#E2E8F0] group-hover:ring-2 group-hover:ring-[#3B82F6] transition-all"
                                      style={{ backgroundColor: option.color }}
                                    />
                                  ) : (
                                    <div className="w-[32px] h-[32px] rounded-[4px] border border-[#E2E8F0] bg-[#F1F5F9] flex items-center justify-center group-hover:ring-2 group-hover:ring-[#3B82F6]">
                                      <IconPhoto size={16} stroke={1.5} className="text-[#94A3B8]" />
                                    </div>
                                  )}
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2">
                                      <path d="M6 1H1v5M15 1h-5M1 10v5h5M10 15h5v-5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </div>
                                </button>
                                
                                {/* Option name - click to select */}
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleOptionSelect(option);
                                    setFormData(prev => ({ ...prev, optionDropdownOpen: false }));
                                  }}
                                  className="flex-1 flex items-center justify-between text-left"
                                >
                                  <span className="text-[13px] text-[#334155]">{option.name}</span>
                                  {formData.selectedOption?.id === option.id && (
                                    <IconCheck size={16} stroke={2} className="text-[#2563EB]" />
                                  )}
                                </button>
                              </div>
                            ))}
                            
                            {/* No results */}
                            {formData.optionSearch && availableOptions.filter(opt => 
                              opt.name.toLowerCase().includes((formData.optionSearch || '').toLowerCase())
                            ).length === 0 && (
                              <div className="text-center py-[16px] text-[13px] text-[#94A3B8]">
                                No options match "{formData.optionSearch}"
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Allow Customer Selection Toggle - Only for proposal flow (second item demo) */}
                {item?.itemCode === '#RF-UND-002' && (
                  <div>
                    <label className="block text-[13px] font-medium text-[#334155] mb-[8px]">
                      Customer Selection
                    </label>
                    <div className="h-[40px] flex items-center justify-between px-[12px] bg-[#F8FAFC] rounded-[6px] border border-[#E2E8F0]">
                      <span className="text-[13px] text-[#64748B]">
                        {formData.allowCustomerSelection ? 'Enabled' : 'Disabled'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, allowCustomerSelection: !prev.allowCustomerSelection }))}
                        className={`relative w-[36px] h-[20px] rounded-full transition-colors duration-200 ${
                          formData.allowCustomerSelection ? 'bg-[#2563EB]' : 'bg-[#CBD5E1]'
                        }`}
                      >
                        <span 
                          className={`absolute top-[2px] w-[16px] h-[16px] bg-white rounded-full shadow-sm transition-transform duration-200 ${
                            formData.allowCustomerSelection ? 'left-[18px]' : 'left-[2px]'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-[16px]">
            {/* Unit Cost */}
            <div>
              <label className="block text-[13px] font-medium text-[#334155] mb-[8px]">
                Unit Cost (USD)
              </label>
              <div className="relative">
                <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[14px] text-[#64748B]">$</span>
                <input
                  type="text"
                  value={formData.unitCost}
                  onChange={(e) => setFormData(prev => ({ ...prev, unitCost: e.target.value }))}
                  className="w-full h-[40px] pl-[28px] pr-[12px] border border-[#E2E8F0] rounded-[6px] text-[14px] text-[#334155] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]"
                />
              </div>
            </div>

            {/* Markup */}
            <div>
              <label className="block text-[13px] font-medium text-[#334155] mb-[8px]">
                Markup
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.markup}
                  onChange={(e) => setFormData(prev => ({ ...prev, markup: e.target.value }))}
                  className="w-full h-[40px] px-[12px] pr-[32px] border border-[#E2E8F0] rounded-[6px] text-[14px] text-[#334155] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]"
                />
                <span className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[14px] text-[#64748B]">%</span>
              </div>
            </div>

            {/* Selling Price */}
            <div>
              <label className="block text-[13px] font-medium text-[#334155] mb-[8px]">
                Unit Selling Price (USD) <span className="text-[#EF4444]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[14px] text-[#64748B]">$</span>
                <input
                  type="text"
                  value={formData.sellingPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, sellingPrice: e.target.value }))}
                  className="w-full h-[40px] pl-[28px] pr-[12px] border border-[#E2E8F0] rounded-[6px] text-[14px] text-[#334155] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]"
                />
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-[13px] font-medium text-[#334155] mb-[8px]">
                Quantity <span className="text-[#EF4444]">*</span>
              </label>
              <input
                type="text"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                className="w-full h-[40px] px-[12px] border border-[#E2E8F0] rounded-[6px] text-[14px] text-[#334155] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]"
                placeholder="Enter quantity"
              />
            </div>

            {/* Tax Preference */}
            <div>
              <label className="block text-[13px] font-medium text-[#334155] mb-[8px]">
                Tax Preference
              </label>
              <select
                value={formData.taxPreference}
                onChange={(e) => setFormData(prev => ({ ...prev, taxPreference: e.target.value }))}
                className="w-full h-[40px] px-[12px] border border-[#E2E8F0] rounded-[6px] text-[14px] text-[#334155] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] bg-white cursor-pointer"
              >
                <option value="Taxable">Taxable</option>
                <option value="Non-Taxable">Non-Taxable</option>
                <option value="Exempt">Exempt</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-[13px] font-medium text-[#334155] mb-[8px]">
                Location
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full h-[40px] px-[12px] border border-[#E2E8F0] rounded-[6px] text-[14px] text-[#334155] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] bg-white cursor-pointer"
              >
                <option value="Main Warehouse">Main Warehouse</option>
                <option value="Secondary Warehouse">Secondary Warehouse</option>
                <option value="Job Site">Job Site</option>
              </select>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="h-[72px] px-[24px] flex items-center justify-end gap-[12px] border-t border-[#E2E8F0] shrink-0 bg-[#FAFBFC]">
          <button
            onClick={onClose}
            className="h-[40px] px-[20px] border border-[#E2E8F0] rounded-[6px] text-[14px] font-medium text-[#334155] hover:bg-[#F8FAFC] transition-colors bg-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave && onSave({ ...item, ...formData });
              onClose();
            }}
            className="h-[40px] px-[20px] bg-[#E44A19] rounded-[6px] text-[14px] font-medium text-white hover:bg-[#D13D0F] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Option Preview Modal */}
      <OptionPreviewModal
        isOpen={!!previewOption}
        onClose={() => setPreviewOption(null)}
        option={previewOption}
        onSelect={(option) => {
          handleOptionSelect(option);
          setPreviewOption(null);
        }}
      />
    </div>
  );
}

// Kebab Menu Dropdown Component
function LineItemKebabMenu({ onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#334155]"
      >
        <IconDotsVertical size={16} stroke={2} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-1 w-[140px] bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-50 py-1">
            <button
              onClick={() => {
                onEdit();
                setIsOpen(false);
              }}
              className="w-full h-[36px] px-[12px] flex items-center gap-[10px] hover:bg-[#F8FAFC] transition-colors text-left"
            >
              <IconPencil size={16} stroke={1.5} className="text-[#64748B]" />
              <span className="text-[13px] text-[#334155]">Edit</span>
            </button>
            <button
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
              className="w-full h-[36px] px-[12px] flex items-center gap-[10px] hover:bg-[#FEF2F2] transition-colors text-left"
            >
              <IconX size={16} stroke={1.5} className="text-[#EF4444]" />
              <span className="text-[13px] text-[#EF4444]">Delete</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// Option Selector for Picker - with preview support
function PickerOptionSelector({ options, selectedOption, onChange, onPreview }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!options || options.length === 0) {
    return <span className="text-[13px] text-[#94A3B8]">—</span>;
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="min-w-[140px] h-[36px] flex items-center gap-[8px] px-[10px] border border-[#E2E8F0] rounded-[4px] text-[13px] bg-white hover:bg-[#F8FAFC] transition-colors"
      >
        {selectedOption ? (
          <>
            <div 
              className="w-[16px] h-[16px] rounded-[3px] border border-[#E2E8F0] flex-shrink-0"
              style={{ backgroundColor: selectedOption.color }}
            />
            <span className="text-[#334155] truncate flex-1 text-left">{selectedOption.name}</span>
          </>
        ) : (
          <span className="text-[#94A3B8]">Select Option</span>
        )}
        <IconChevronDown size={14} stroke={1.5} className="text-[#94A3B8] flex-shrink-0" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1 w-[220px] bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-50 py-1 max-h-[240px] overflow-y-auto">
            {options.map((option) => (
              <div
                key={option.id}
                className={`flex items-center gap-[10px] px-[12px] py-[8px] hover:bg-[#F8FAFC] transition-colors ${
                  selectedOption?.id === option.id ? 'bg-[#EFF6FF]' : ''
                }`}
              >
                {/* Clickable color/image for preview */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreview(option);
                  }}
                  className="group relative"
                  title="Click to preview"
                >
                  {option.image ? (
                    <img 
                      src={option.image} 
                      alt={option.name}
                      className="w-[28px] h-[28px] rounded-[4px] object-cover border border-[#E2E8F0] group-hover:ring-2 group-hover:ring-[#3B82F6]"
                    />
                  ) : (
                    <div 
                      className="w-[28px] h-[28px] rounded-[4px] border border-[#E2E8F0] group-hover:ring-2 group-hover:ring-[#3B82F6] transition-all"
                      style={{ backgroundColor: option.color }}
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2">
                      <path d="M6 1H1v5M15 1h-5M1 10v5h5M10 15h5v-5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
                
                {/* Option name - click to select */}
                <button
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="flex-1 text-left flex items-center justify-between"
                >
                  <span className="text-[13px] text-[#334155]">{option.name}</span>
                  {selectedOption?.id === option.id && (
                    <IconCheck size={14} stroke={2} className="text-[#2563EB]" />
                  )}
                </button>
              </div>
            ))}
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
  const [selectedOptions, setSelectedOptions] = useState({});
  const [previewOption, setPreviewOption] = useState(null);
  const totalPages = 26;

  const handleOptionChange = (itemId, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [itemId]: option
    }));
  };

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
                <th className="w-[260px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">Item</th>
                <th className="w-[160px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">
                  Option
                </th>
                <th className="w-[70px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">Category</th>
                <th className="w-[70px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">Type</th>
                <th className="w-[100px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">Location</th>
                <th className="w-[90px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider leading-tight bg-white">
                  <div>Unit Cost</div>
                  <div>(USD)</div>
                </th>
                <th className="w-[80px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">Markup</th>
                <th className="w-[100px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider leading-tight bg-white">
                  <div>Selling Price</div>
                  <div>(USD) <span className="text-[#EF4444]">*</span></div>
                </th>
                <th className="w-[80px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">
                  Qty <span className="text-[#EF4444]">*</span>
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
                      <div className="w-[44px] h-[44px] bg-[#F1F5F9] rounded-[6px] flex items-center justify-center flex-shrink-0">
                        <IconPackage size={22} stroke={1.5} className="text-[#94A3B8]" />
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-[#1E293B]">
                          {item.itemId} - {item.name}
                        </div>
                        <div className="text-[12px] text-[#64748B]">
                          Available: {item.availableQty} {item.unit}
                        </div>
                      </div>
                    </div>
                  </td>
                  {/* Option Selector */}
                  <td className="px-[12px] py-[16px]">
                    {item.hasOptions ? (
                      <PickerOptionSelector
                        options={item.options}
                        selectedOption={selectedOptions[item.id]}
                        onChange={(option) => handleOptionChange(item.id, option)}
                        onPreview={(option) => setPreviewOption(option)}
                      />
                    ) : (
                      <span className="text-[13px] text-[#94A3B8]">—</span>
                    )}
                  </td>
                  <td className="px-[12px] py-[16px] text-[13px] text-[#64748B]">{item.category}</td>
                  <td className="px-[12px] py-[16px] text-[13px] text-[#64748B]">{item.productType}</td>
                  <td className="px-[12px] py-[16px] text-[13px] text-[#64748B]">{item.location}</td>
                  <td className="px-[12px] py-[16px]">
                    <input
                      type="text"
                      defaultValue={item.unitCost}
                      placeholder="0.00"
                      className="w-[70px] h-[36px] px-[10px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6] bg-white"
                    />
                  </td>
                  <td className="px-[12px] py-[16px]">
                    <div className="flex items-center gap-[4px]">
                      <input
                        type="text"
                        defaultValue={item.markup}
                        placeholder="0"
                        className="w-[45px] h-[36px] px-[8px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6] bg-white"
                      />
                      <span className="text-[13px] text-[#64748B]">%</span>
                    </div>
                  </td>
                  <td className="px-[12px] py-[16px]">
                    <input
                      type="text"
                      defaultValue={item.unitSellingPrice}
                      className="w-[70px] h-[36px] px-[10px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6] bg-white"
                    />
                  </td>
                  <td className="px-[12px] py-[16px]">
                    <input
                      type="text"
                      placeholder="0"
                      className="w-[55px] h-[36px] px-[8px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6] bg-white"
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

      {/* Option Preview Modal */}
      <OptionPreviewModal
        isOpen={!!previewOption}
        onClose={() => setPreviewOption(null)}
        option={previewOption}
        onSelect={null}
        showSelectButton={false}
      />
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
      className={`w-full h-[49px] px-[17.5px] flex items-center justify-between transition-colors rounded-[7px] ${
        isActive
          ? 'bg-[#E8F4FD] border border-[#B3DDFF]'
          : 'hover:bg-[#F8FAFC]'
      }`}
    >
      <div className="flex items-center gap-[7px]">
        <Icon size={24} stroke={1.5} className={isActive ? 'text-[#005AA3]' : 'text-[#64748B]'} />
        <span className={`text-[14px] ${isActive ? 'font-semibold text-[#005AA3]' : 'font-normal text-[#334155]'}`}>{item.label}</span>
      </div>
      {item.count !== undefined && (
        <span className={`min-w-[20px] h-[20px] px-[6px] flex items-center justify-center rounded-full text-[11px] font-medium ${
          isActive ? 'bg-[#005AA3] text-white' : 'bg-[#E2E8F0] text-[#64748B]'
        }`}>
          {item.count}
        </span>
      )}
    </button>
  );
}

function JobDetailsPage({ onBack }) {
  const [activeNav, setActiveNav] = useState('lineItems');
  const [activeTab, setActiveTab] = useState('navigation');
  const [expandedSections, setExpandedSections] = useState({});
  const [isLineItemPickerOpen, setIsLineItemPickerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [previewOption, setPreviewOption] = useState(null);

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };

  const handleDeleteItem = (item) => {
    console.log('Deleting item:', item);
    // In real app, would remove from state/API
  };

  const handleSaveItem = (updatedItem) => {
    console.log('Saving item:', updatedItem);
    // In real app, would update state/API
  };

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
              <span className="text-[14px] text-[#64748B] font-normal">#{JOB_DATA.id}</span>
              <span className={`px-[10px] py-[4px] text-[12.6px] font-medium rounded-[3.5px] capitalize ${
                JOB_DATA.status === 'Booked' 
                  ? 'bg-[#DBEAFE] border border-[#2563EB] text-[#2563EB]'
                  : 'bg-[rgba(2,184,117,0.15)] border border-[#02B875] text-[#02B875]'
              }`}>
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
              <span className={`text-[12.6px] font-normal ${JOB_DATA.jobValue ? 'text-[#02B875]' : 'text-[#EF4444]'}`}>
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
        <div className="flex-1 flex flex-col overflow-hidden bg-[#F8FAFC]">
          <div className="flex-1 p-[14px] overflow-y-auto">
            {/* Costing Summary Card */}
            <div className="bg-white border border-[#E2E8F0] rounded-[7px] mb-[14px]">
              <div className="px-[32px] py-[28px] flex items-center justify-between">
                {/* Left: Profit Margin Circle + Text */}
                <div className="flex items-center">
                  <div className="relative w-[72px] h-[72px] mr-[20px]">
                    <svg viewBox="0 0 72 72" className="w-full h-full -rotate-90">
                      <circle
                        cx="36"
                        cy="36"
                        r="30"
                        fill="none"
                        stroke="#FCE7F3"
                        strokeWidth="6"
                      />
                      <circle
                        cx="36"
                        cy="36"
                        r="30"
                        fill="none"
                        stroke="#EC4899"
                        strokeWidth="6"
                        strokeDasharray={`${Math.abs(JOB_COSTING.profitMargin) * 1.88} 188`}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-[13px] text-[#64748B]">Profit Margin</span>
                    <span className="text-[24px] font-semibold text-[#EF4444]">{JOB_COSTING.profitMargin}%</span>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="w-px h-[50px] bg-[#E2E8F0]" />
                
                {/* Total Revenue */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] text-[#64748B]">Total Revenue</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[#94A3B8]">
                      <path d="M8 7V11M8 5H8.01M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[24px] font-semibold text-[#1E293B]">{JOB_COSTING.totalRevenue}</span>
                </div>
                
                {/* Minus Sign */}
                <span className="text-[20px] text-[#CBD5E1]">−</span>
                
                {/* COGS */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] text-[#64748B]">COGS</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[#94A3B8]">
                      <path d="M8 7V11M8 5H8.01M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-[24px] font-semibold text-[#1E293B]">{JOB_COSTING.cogs}</span>
                </div>
                
                {/* Equals Sign */}
                <span className="text-[20px] text-[#CBD5E1]">=</span>
                
                {/* Profit */}
                <div className="flex flex-col">
                  <span className="text-[13px] text-[#64748B]">Profit</span>
                  <span className="text-[24px] font-semibold text-[#EF4444]">{JOB_COSTING.profit}</span>
                </div>
              </div>
              
              {/* View Costing Breakdown */}
              <div className="px-[32px] pb-[20px]">
                <button className="flex items-center gap-1.5 text-[13px] text-[#64748B] hover:text-[#334155]">
                  View Costing Breakdown
                  <IconChevronDown size={14} stroke={2} />
                </button>
              </div>
            </div>

            {/* Tabs - Pill style */}
            <div className="flex items-center gap-[8px] mb-[14px]">
              <button className="h-[38px] px-[18px] text-[14px] font-medium text-[#334155] bg-[#F1F5F9] border border-[#E2E8F0] rounded-[6px]">
                Parts & Services ({ADDED_LINE_ITEMS.length})
              </button>
              <button className="h-[38px] px-[18px] text-[14px] font-medium text-[#64748B] bg-white border border-[#E2E8F0] rounded-[6px] hover:text-[#334155] hover:bg-[#F8FAFC]">
                Labor (1)
              </button>
              <button className="h-[38px] px-[18px] text-[14px] font-medium text-[#64748B] bg-white border border-[#E2E8F0] rounded-[6px] hover:text-[#334155] hover:bg-[#F8FAFC]">
                Expenses
              </button>
            </div>

            {/* Line Items Table Card */}
            <div className="bg-white border border-[#E2E8F0] rounded-[7px] flex flex-col">
              {/* Part/Service Details Header */}
              <div className="h-[56px] px-[21px] flex items-center justify-between border-b border-[#E2E8F0]">
                <h3 className="text-[15px] font-semibold text-[#1E293B]">
                  Part/Service Details ({ADDED_LINE_ITEMS.length})
                </h3>
                <div className="flex items-center gap-[8px]">
                  <button className="w-[36px] h-[36px] flex items-center justify-center border border-[#E2E8F0] rounded-[6px] hover:bg-[#F8FAFC] transition-colors">
                    <IconSearch size={18} stroke={1.5} className="text-[#64748B]" />
                  </button>
                  <button className="h-[36px] px-[14px] flex items-center gap-[8px] border border-[#E2E8F0] rounded-[6px] text-[13px] font-medium text-[#334155] hover:bg-[#F8FAFC] transition-colors">
                    <IconReceipt size={16} stroke={1.5} className="text-[#64748B]" />
                    Request
                    <IconChevronDown size={14} stroke={2} className="text-[#64748B]" />
                  </button>
                  {/* Filter Chip */}
                  <div className="h-[36px] px-[12px] flex items-center gap-[8px] bg-white border border-[#E2E8F0] rounded-[6px] text-[13px] text-[#334155]">
                    MVP custome...
                    <button className="text-[#64748B] hover:text-[#EF4444]">
                      <IconX size={14} stroke={2} />
                    </button>
                    <IconChevronDown size={14} stroke={2} className="text-[#64748B]" />
                  </div>
                  <button 
                    onClick={() => setIsLineItemPickerOpen(true)}
                    className="h-[36px] px-[14px] flex items-center gap-[6px] border border-[#E2E8F0] rounded-[6px] text-[13px] font-medium text-[#334155] hover:bg-[#F8FAFC] transition-colors"
                  >
                    <IconPlus size={16} stroke={2} className="text-[#64748B]" />
                    Add
                  </button>
                  <button className="w-[36px] h-[36px] flex items-center justify-center border border-[#E2E8F0] rounded-[6px] hover:bg-[#F8FAFC] transition-colors">
                    <IconSettings size={18} stroke={1.5} className="text-[#64748B]" />
                  </button>
                </div>
              </div>
              
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] bg-white">
                      <th className="w-[48px] text-left px-[16px] py-[14px]">
                        <input type="checkbox" className="w-[16px] h-[16px] rounded border-[#CBD5E1]" />
                      </th>
                      <th className="w-[90px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Part ID</th>
                      <th className="min-w-[180px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Product / Service</th>
                      <th className="w-[140px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Option</th>
                      <th className="w-[100px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Unit Cost</th>
                      <th className="w-[80px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Markup</th>
                      <th className="w-[110px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Tax Pref.</th>
                      <th className="w-[100px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Location</th>
                      <th className="w-[80px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Qty</th>
                      <th className="w-[60px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {ADDED_LINE_ITEMS.map((item) => (
                      <tr key={item.id} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC]">
                        <td className="px-[16px] py-[16px]">
                          <input type="checkbox" className="w-[16px] h-[16px] rounded border-[#CBD5E1]" />
                        </td>
                        <td className="px-[12px] py-[16px] text-[13px] text-[#1E293B]">{item.partId}</td>
                        <td className="px-[12px] py-[16px]">
                          <div className="flex items-start gap-[10px]">
                            <div className="w-[40px] h-[40px] bg-[#EFF6FF] rounded-[6px] flex items-center justify-center flex-shrink-0 border border-[#DBEAFE]">
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1.5">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                <line x1="12" y1="22.08" x2="12" y2="12" />
                              </svg>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[12px] font-medium text-[#2563EB]">{item.itemCode}</span>
                              <span className="text-[13px] text-[#1E293B]">{item.name}</span>
                              {item.description && (
                                <span className="text-[11px] text-[#64748B]">{item.description}</span>
                              )}
                            </div>
                          </div>
                        </td>
                        {/* Selected Option Display - Clickable for Preview */}
                        <td className="px-[12px] py-[16px]">
                          {item.selectedOption ? (
                            <div className="flex items-center gap-[8px]">
                              <button
                                onClick={() => setPreviewOption(item.selectedOption)}
                                className="group relative"
                                title="Click to preview"
                              >
                                <div 
                                  className="w-[24px] h-[24px] rounded-[4px] border border-[#E2E8F0] flex-shrink-0 group-hover:ring-2 group-hover:ring-[#3B82F6] transition-all"
                                  style={{ backgroundColor: item.selectedOption.color }}
                                />
                                {/* Expand icon on hover */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity">
                                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2">
                                    <path d="M6 1H1v5M15 1h-5M1 10v5h5M10 15h5v-5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                              </button>
                              <span className="text-[13px] text-[#334155]">{item.selectedOption.name}</span>
                            </div>
                          ) : (
                            <span className="text-[13px] text-[#94A3B8]">—</span>
                          )}
                        </td>
                        <td className="px-[12px] py-[16px] text-[13px] text-[#1E293B]">{item.unitCost}</td>
                        <td className="px-[12px] py-[16px] text-[13px] text-[#64748B]">{item.markup}</td>
                        <td className="px-[12px] py-[16px] text-[13px] text-[#1E293B]">{item.taxPreference}</td>
                        <td className="px-[12px] py-[16px] text-[13px] text-[#64748B]">{item.location}</td>
                        <td className="px-[12px] py-[16px] text-[13px] text-[#1E293B]">{item.qty} {item.unit}</td>
                        <td className="px-[12px] py-[16px]">
                          <LineItemKebabMenu
                            onEdit={() => handleEditItem(item)}
                            onDelete={() => handleDeleteItem(item)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary Footer */}
              <div className="border-t border-[#E2E8F0] px-[21px] py-[16px] bg-[#FAFBFC]">
                <div className="flex flex-col items-end gap-[8px]">
                  <div className="flex items-center justify-between w-[220px]">
                    <span className="text-[13px] text-[#64748B]">Non-Billable</span>
                    <span className="text-[14px] text-[#1E293B]">{JOB_COSTING.nonBillable}</span>
                  </div>
                  <div className="flex items-center justify-between w-[220px]">
                    <span className="text-[13px] text-[#64748B]">Sub-Total</span>
                    <span className="text-[14px] text-[#1E293B]">{JOB_COSTING.subTotal}</span>
                  </div>
                  <div className="flex items-center justify-between w-[220px] pt-[8px] border-t border-[#E2E8F0]">
                    <span className="text-[14px] font-semibold text-[#1E293B]">Total</span>
                    <span className="text-[16px] font-semibold text-[#1E293B]">{JOB_COSTING.total}</span>
                  </div>
                </div>
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

      {/* Edit Line Item Modal */}
      <EditLineItemModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingItem(null);
        }}
        item={editingItem}
        onSave={handleSaveItem}
      />

      {/* Option Preview Modal (for viewing from table) */}
      <OptionPreviewModal
        isOpen={!!previewOption && !isEditModalOpen}
        onClose={() => setPreviewOption(null)}
        option={previewOption}
        showSelectButton={false}
      />
    </div>
  );
}

export default JobDetailsPage;
