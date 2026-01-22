import React, { useState, useMemo } from 'react';
import {
  IconChevronRight,
  IconChevronDown,
  IconPlus,
  IconClipboardList,
  IconReceipt,
  IconUsers,
  IconSettings,
  IconMapPin,
  IconPaperclip,
  IconCheck,
} from '@tabler/icons-react';

// Hierarchical category data structure
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

// Collapsible Section Component
function CollapsibleSection({ title, icon: Icon, defaultExpanded = true, children, headerRight }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full h-[49px] px-[14px] flex items-center justify-between hover:bg-[#F8FAFC] transition-colors"
      >
        <div className="flex items-center gap-[10.5px]">
          {Icon && <Icon size={17.5} className="text-[#64748B]" stroke={1.5} />}
          <span className="text-[15px] font-semibold text-[#334155]">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          {headerRight}
          <IconChevronDown
            size={14}
            stroke={2}
            className={`text-[#64748B] transition-transform ${isExpanded ? '' : '-rotate-90'}`}
          />
        </div>
      </button>
      {isExpanded && (
        <div className="px-[14px] pb-[21px] border-t border-[#E2E8F0]">
          {children}
        </div>
      )}
    </div>
  );
}

// Form Input Component
function FormInput({ label, required, placeholder, type = 'text', prefix, suffix, value, onChange }) {
  return (
    <div className="flex flex-col gap-[3.5px]">
      <label className="text-[13px] font-normal text-[#334155]">
        {label} {required && <span className="text-[#E44A19]">*</span>}
      </label>
      <div className="flex">
        {prefix && (
          <div className="h-[38px] px-[11.5px] flex items-center bg-[#F8FAFC] border border-r-0 border-[#E2E8F0] rounded-l-[5px] text-[13px] text-[#334155]">
            {prefix}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`h-[38px] flex-1 px-[11.5px] border border-[#E2E8F0] text-[13px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#94A3B8] bg-white ${
            prefix ? 'rounded-r-[5px]' : suffix ? 'rounded-l-[5px] border-r-0' : 'rounded-[5px]'
          }`}
        />
        {suffix && (
          <div className="h-[38px] px-[11.5px] flex items-center bg-[#F8FAFC] border border-l-0 border-[#E2E8F0] rounded-r-[5px] text-[13px] text-[#334155]">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
}

// Form Select Component
function FormSelect({ label, required, placeholder, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-[3.5px] relative">
      <label className="text-[13px] font-normal text-[#334155]">
        {label} {required && <span className="text-[#E44A19]">*</span>}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-[38px] px-[10px] flex items-center justify-between border border-[#E2E8F0] rounded-[5px] text-[13px] text-left hover:border-[#94A3B8] transition-colors bg-white"
      >
        <span className={value ? 'text-[#1E293B]' : 'text-[#94A3B8]'}>
          {value || placeholder}
        </span>
        <IconChevronDown size={14} stroke={2} className="text-[#64748B]" />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-20 py-1 max-h-[200px] overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange?.(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-[13px] hover:bg-[#F8FAFC] ${
                  value === option.value ? 'bg-[#DBEAFE] text-[#2563EB] font-medium' : 'text-[#334155]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Hierarchical Category Select Component with checkbox at parent level
function HierarchicalCategorySelect({ label, required, placeholder, value, onChange }) {
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

  // Get display value - show only the subcategory name when a subcategory is selected
  const getDisplayValue = () => {
    if (!value) return null;
    if (value.includes(' > ')) {
      // Show only the subcategory name
      const parts = value.split(' > ');
      return <span className="text-[#1E293B]">{parts[1]}</span>;
    }
    return <span className="text-[#1E293B]">{value}</span>;
  };

  return (
    <div className="flex flex-col gap-[3.5px] relative">
      <label className="text-[13px] font-normal text-[#334155]">
        {label} {required && <span className="text-[#E44A19]">*</span>}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-[38px] px-[10px] flex items-center justify-between border border-[#E2E8F0] rounded-[5px] text-[13px] text-left hover:border-[#94A3B8] transition-colors bg-white"
      >
        {value ? getDisplayValue() : <span className="text-[#94A3B8]">{placeholder}</span>}
        <IconChevronDown size={14} stroke={2} className="text-[#64748B]" />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-20 max-h-[320px] overflow-y-auto">
            {CATEGORY_HIERARCHY.map((category) => {
              const hasSubCategories = category.subCategories.length > 0;
              const isExpanded = expandedCategories.has(category.name);
              const isParentSelected = value === category.name;

              return (
                <div key={category.name} className="border-b border-[#F1F5F9] last:border-b-0">
                  {/* Parent Category Header with expand arrow and checkbox */}
                  <div className="flex items-center h-10 px-3 hover:bg-[#F8FAFC] transition-colors">
                    {/* Expand/Collapse Arrow - only for categories with subcategories */}
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

// Form File Input Component
function FormFileInput({ label }) {
  return (
    <div className="flex flex-col gap-[3.5px]">
      <label className="text-[13px] font-normal text-[#334155]">{label}</label>
      <div className="h-[38px] flex items-center border border-[#E2E8F0] rounded-[5px] overflow-hidden bg-white">
        <button
          type="button"
          className="h-[26px] mx-[8px] px-[10px] bg-white border border-[#CBD5E1] rounded text-[13px] text-[#334155] hover:bg-[#F8FAFC] transition-colors whitespace-nowrap"
        >
          Choose file
        </button>
        <span className="text-[13px] text-[#94A3B8] truncate pr-[10px]">No file chosen</span>
      </div>
    </div>
  );
}

// Rich Text Editor Component (simplified)
function RichTextEditor({ label }) {
  return (
    <div className="flex flex-col gap-[3.5px]">
      <label className="text-[13px] font-normal text-[#334155]">{label}</label>
      <div className="border border-[#E2E8F0] rounded-[5px] overflow-hidden bg-white">
        <div className="h-[158px] p-[14px] bg-white">
          <textarea
            placeholder="Enter description..."
            className="w-full h-full resize-none text-[13px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none bg-white"
          />
        </div>
        <div className="h-[48px] border-t border-[#E2E8F0] bg-[#FAFBFC] flex items-center px-2">
          {/* Toolbar buttons */}
          <div className="flex items-center gap-1 border-r border-[#E2E8F0] pr-2 mr-2">
            <button className="w-[34px] h-[28px] flex items-center justify-center hover:bg-[#E2E8F0] rounded">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                <path d="M3 7v6h6M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
              </svg>
            </button>
            <button className="w-[34px] h-[28px] flex items-center justify-center hover:bg-[#E2E8F0] rounded">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                <path d="M21 7v6h-6M3 17a9 9 0 009-9 9 9 0 016 2.3l3 2.7" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-1 border-r border-[#E2E8F0] pr-2 mr-2">
            <button className="w-[34px] h-[28px] flex items-center justify-center hover:bg-[#E2E8F0] rounded font-bold text-[#64748B]">
              B
            </button>
            <button className="w-[34px] h-[28px] flex items-center justify-center hover:bg-[#E2E8F0] rounded italic text-[#64748B]">
              I
            </button>
            <button className="w-[34px] h-[28px] flex items-center justify-center hover:bg-[#E2E8F0] rounded">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>
            </button>
            <button className="w-[34px] h-[28px] flex items-center justify-center hover:bg-[#E2E8F0] rounded">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <circle cx="4" cy="6" r="1" fill="#64748B" />
                <circle cx="4" cy="12" r="1" fill="#64748B" />
                <circle cx="4" cy="18" r="1" fill="#64748B" />
              </svg>
            </button>
            <button className="w-[34px] h-[28px] flex items-center justify-center hover:bg-[#E2E8F0] rounded">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                <line x1="10" y1="6" x2="21" y2="6" />
                <line x1="10" y1="12" x2="21" y2="12" />
                <line x1="10" y1="18" x2="21" y2="18" />
                <text x="3" y="8" fontSize="8" fill="#64748B">1</text>
                <text x="3" y="14" fontSize="8" fill="#64748B">2</text>
                <text x="3" y="20" fontSize="8" fill="#64748B">3</text>
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-[34px] h-[28px] flex items-center justify-center hover:bg-[#E2E8F0] rounded">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                <path d="M4 7V4h16v3M9 20h6M12 4v16" />
              </svg>
            </button>
            <button className="h-[28px] px-2 flex items-center gap-1 hover:bg-[#E2E8F0] rounded text-[12px] text-[#64748B]">
              Paragraph
              <IconChevronDown size={10} stroke={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// No data placeholder
function NoDataPlaceholder({ title, description, imageSrc }) {
  return (
    <div className="flex flex-col items-center py-[21px]">
      <div className="w-[150px] h-[112px] flex items-center justify-center mb-[10px]">
        <svg width="120" height="90" viewBox="0 0 120 90" fill="none">
          <rect x="20" y="10" width="80" height="60" rx="4" fill="#F1F5F9" stroke="#E2E8F0" />
          <rect x="30" y="25" width="40" height="4" rx="2" fill="#CBD5E1" />
          <rect x="30" y="35" width="60" height="4" rx="2" fill="#E2E8F0" />
          <rect x="30" y="45" width="50" height="4" rx="2" fill="#E2E8F0" />
          <circle cx="85" cy="65" r="15" fill="#F8FAFC" stroke="#E2E8F0" />
          <path d="M85 58v14M78 65h14" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <p className="text-[14px] font-medium text-[#334155] mb-[3.5px]">{title}</p>
      <p className="text-[13px] text-[#64748B] text-center">{description}</p>
    </div>
  );
}

function NewPartServicePage({ onCancel, onSave }) {
  const [formData, setFormData] = useState({
    type: 'Part',
    prefix: '',
    name: '',
    number: '',
    isBillable: 'Yes',
    considerForProfitability: 'Yes',
    image: null,
    category: '',
    brand: '',
    specification: '',
    unitOfMeasurement: '',
    availableQty: '0',
    minimumQty: '0',
    unitPurchasePrice: '',
    markup: '',
    unitSellingPrice: '',
    trackQuantity: 'Yes',
    manual: null,
    quantityFormula: '',
    description: '',
    taxPreference: 'Taxable',
    taxName: '',
    taxRate: '',
    trackSerialNumber: false,
    location: 'Warehouse',
    locationAvailableQty: '',
    locationMinimumQty: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave?.(formData);
  };

  return (
    <div className="flex flex-col h-full bg-[#F1F5F9]">
      {/* Header with Breadcrumb */}
      <div className="h-[49px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-[21px]">
        <div className="flex items-center">
          <button
            onClick={onCancel}
            className="text-[15px] text-[#334155] font-normal hover:underline"
          >
            Parts & Services
          </button>
          <IconChevronRight size={21} className="text-[#334155] mx-2" stroke={1.5} />
          <span className="text-[15px] text-[#334155] font-medium">New Part / Service</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-[7px]">
          <button
            onClick={onCancel}
            className="h-[31.5px] px-[15px] text-[13px] font-medium text-[#334155] hover:bg-[#F1F5F9] rounded-[5px] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="h-[31.5px] px-[14px] flex items-center bg-[#E44A19] text-white rounded-[5px] text-[13px] font-medium hover:bg-[#D03D10] transition-colors"
          >
            Save Part / Service
          </button>
        </div>
      </div>

      {/* Main Content - Three Column Layout */}
      <div className="flex-1 overflow-y-auto p-[14px]">
        <div className="flex gap-[14px]">
          {/* Left Column - Parts/Service Details */}
          <div className="w-[320px] min-w-[320px] flex-shrink-0">
            <CollapsibleSection title="Parts/Service Details" icon={IconClipboardList}>
              <div className="pt-[14px] space-y-[14px]">
                <FormSelect
                  label="Type"
                  required
                  placeholder="Select type"
                  options={[
                    { value: 'Part', label: 'Part' },
                    { value: 'Service', label: 'Service' },
                  ]}
                  value={formData.type}
                  onChange={(val) => handleChange('type', val)}
                />
                <FormInput
                  label="Prefix"
                  placeholder="Enter Prefix"
                  value={formData.prefix}
                  onChange={(e) => handleChange('prefix', e.target.value)}
                />
                <FormInput
                  label="Part Name"
                  required
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
                <FormInput
                  label="Part Number"
                  required
                  placeholder="Enter Number"
                  value={formData.number}
                  onChange={(e) => handleChange('number', e.target.value)}
                />
                <FormSelect
                  label="Is Billable"
                  required
                  placeholder="Select"
                  options={[
                    { value: 'Yes', label: 'Yes' },
                    { value: 'No', label: 'No' },
                  ]}
                  value={formData.isBillable}
                  onChange={(val) => handleChange('isBillable', val)}
                />
                <FormSelect
                  label="Consider for Profitability"
                  required
                  placeholder="Select"
                  options={[
                    { value: 'Yes', label: 'Yes' },
                    { value: 'No', label: 'No' },
                  ]}
                  value={formData.considerForProfitability}
                  onChange={(val) => handleChange('considerForProfitability', val)}
                />
                <FormFileInput label="Image" />
              </div>
            </CollapsibleSection>
          </div>

          {/* Middle Column - Primary Details, Tax, Vendors, Other, Location */}
          <div className="flex-1 min-w-0 space-y-[14px]">
            {/* Primary Details */}
            <CollapsibleSection title="Primary Details" icon={IconClipboardList}>
              <div className="pt-[14px]">
                {/* Row 1 */}
                <div className="grid grid-cols-3 gap-[14px] mb-[14px]">
                  <HierarchicalCategorySelect
                    label="Category"
                    required
                    placeholder="Choose a category"
                    value={formData.category}
                    onChange={(val) => handleChange('category', val)}
                  />
                  <FormInput
                    label="Brand"
                    placeholder="Enter Brand"
                    value={formData.brand}
                    onChange={(e) => handleChange('brand', e.target.value)}
                  />
                  <FormInput
                    label="Specification"
                    placeholder="Enter Specifications, if any"
                    value={formData.specification}
                    onChange={(e) => handleChange('specification', e.target.value)}
                  />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-3 gap-[14px] mb-[14px]">
                  <FormInput
                    label="Unit of Measurement"
                    placeholder="Enter Unit of Measurement"
                    value={formData.unitOfMeasurement}
                    onChange={(e) => handleChange('unitOfMeasurement', e.target.value)}
                  />
                  <FormInput
                    label="Available Qty"
                    placeholder="0"
                    type="number"
                    value={formData.availableQty}
                    onChange={(e) => handleChange('availableQty', e.target.value)}
                  />
                  <FormInput
                    label="Minimum Qty"
                    placeholder="0"
                    type="number"
                    value={formData.minimumQty}
                    onChange={(e) => handleChange('minimumQty', e.target.value)}
                  />
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-3 gap-[14px] mb-[14px]">
                  <FormInput
                    label="Unit Purchase Price/Unit Cost"
                    placeholder="Enter Purchase Price"
                    prefix="USD"
                    value={formData.unitPurchasePrice}
                    onChange={(e) => handleChange('unitPurchasePrice', e.target.value)}
                  />
                  <FormInput
                    label="Markup"
                    placeholder="Enter Markup"
                    suffix="%"
                    value={formData.markup}
                    onChange={(e) => handleChange('markup', e.target.value)}
                  />
                  <FormInput
                    label="Unit Selling Price"
                    required
                    placeholder="Enter Selling Price"
                    prefix="USD"
                    value={formData.unitSellingPrice}
                    onChange={(e) => handleChange('unitSellingPrice', e.target.value)}
                  />
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-3 gap-[14px] mb-[14px]">
                  <FormSelect
                    label="Track Quantity"
                    placeholder="Select"
                    options={[
                      { value: 'Yes', label: 'Yes' },
                      { value: 'No', label: 'No' },
                    ]}
                    value={formData.trackQuantity}
                    onChange={(val) => handleChange('trackQuantity', val)}
                  />
                  <FormFileInput label="Manual" />
                  <FormSelect
                    label="Quantity Formula"
                    placeholder="Choose Formula"
                    options={[
                      { value: 'formula1', label: 'Formula 1' },
                      { value: 'formula2', label: 'Formula 2' },
                    ]}
                    value={formData.quantityFormula}
                    onChange={(val) => handleChange('quantityFormula', val)}
                  />
                </div>

                {/* Description */}
                <RichTextEditor label="Description" />
              </div>
            </CollapsibleSection>

            {/* Tax Details */}
            <CollapsibleSection title="Tax Details" icon={IconReceipt}>
              <div className="pt-[14px]">
                <div className="grid grid-cols-3 gap-[14px]">
                  <FormSelect
                    label="Tax Preference"
                    placeholder="Select"
                    options={[
                      { value: 'Taxable', label: 'Taxable' },
                      { value: 'Non-Taxable', label: 'Non-Taxable' },
                      { value: 'Tax Exempt', label: 'Tax Exempt' },
                    ]}
                    value={formData.taxPreference}
                    onChange={(val) => handleChange('taxPreference', val)}
                  />
                  <FormInput
                    label="Tax Name"
                    placeholder="Enter Tax Name"
                    value={formData.taxName}
                    onChange={(e) => handleChange('taxName', e.target.value)}
                  />
                  <FormInput
                    label="Tax Rate"
                    placeholder="Enter Tax Rate"
                    value={formData.taxRate}
                    onChange={(e) => handleChange('taxRate', e.target.value)}
                  />
                </div>
              </div>
            </CollapsibleSection>

            {/* Vendors */}
            <CollapsibleSection
              title="Vendors"
              icon={IconUsers}
              headerRight={
                <button
                  type="button"
                  onClick={(e) => e.stopPropagation()}
                  className="h-[31.5px] px-[15px] flex items-center gap-[7px] border border-[#E2E8F0] text-[#334155] rounded-[5px] text-[13px] font-medium hover:bg-[#F8FAFC] transition-colors"
                >
                  <IconPlus size={12} stroke={2} />
                  Add
                </button>
              }
            >
              <NoDataPlaceholder
                title="No Vendors selected"
                description="Please click on Add to add a vendor"
              />
            </CollapsibleSection>

            {/* Other Details */}
            <CollapsibleSection title="Other Details" icon={IconSettings} defaultExpanded={false}>
              <div className="pt-[14px]">
                <p className="text-[13px] text-[#64748B]">Custom fields will appear here</p>
              </div>
            </CollapsibleSection>

            {/* Location Availability */}
            <CollapsibleSection title="Location Availability" icon={IconMapPin}>
              <div className="pt-[14px]">
                <div className="flex items-center gap-[7px] mb-[14px]">
                  <input
                    type="checkbox"
                    checked={formData.trackSerialNumber}
                    onChange={(e) => handleChange('trackSerialNumber', e.target.checked)}
                    className="w-[13px] h-[13px] rounded border-[#CBD5E1] text-[#2563EB] focus:ring-0"
                  />
                  <label className="text-[13px] text-[#334155]">Track Serial Number</label>
                </div>

                <div className="grid grid-cols-3 gap-[14px]">
                  <FormSelect
                    label="Location"
                    required
                    placeholder="Select location"
                    options={[
                      { value: 'Warehouse', label: 'Warehouse' },
                      { value: 'Store', label: 'Store' },
                      { value: 'Office', label: 'Office' },
                    ]}
                    value={formData.location}
                    onChange={(val) => handleChange('location', val)}
                  />
                  <FormInput
                    label="Available Qty"
                    required
                    placeholder="Enter Available Qty"
                    value={formData.locationAvailableQty}
                    onChange={(e) => handleChange('locationAvailableQty', e.target.value)}
                  />
                  <FormInput
                    label="Minimum Qty"
                    required
                    placeholder="Enter Minimum Qty"
                    value={formData.locationMinimumQty}
                    onChange={(e) => handleChange('locationMinimumQty', e.target.value)}
                  />
                </div>
              </div>
            </CollapsibleSection>
          </div>

          {/* Right Column - Attachments */}
          <div className="w-[320px] min-w-[320px] flex-shrink-0">
            <CollapsibleSection title="Attachments" icon={IconPaperclip}>
              <div className="pt-[21px]">
                <NoDataPlaceholder
                  title=""
                  description="Add any relevant files and attachments to this Part/Service"
                />
                <div className="flex justify-center mt-[14px]">
                  <button
                    type="button"
                    className="h-[31.5px] px-[15px] flex items-center gap-[7px] border border-[#E2E8F0] text-[#334155] rounded-[5px] text-[13px] font-medium hover:bg-[#F8FAFC] transition-colors"
                  >
                    <IconPlus size={12} stroke={2} />
                    Add Attachment
                  </button>
                </div>
              </div>
            </CollapsibleSection>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPartServicePage;
