import React, { useState, useRef, useEffect } from 'react';
import {
  IconArrowLeft,
  IconSettings,
  IconGripVertical,
  IconSearch,
  IconPencil,
  IconCopy,
  IconTrash,
  IconX,
  IconChevronDown,
  IconChevronRight,
  IconPlus,
  IconCheck,
} from '@tabler/icons-react';

// Category hierarchy data
const CATEGORY_HIERARCHY = [
  {
    name: 'Digital Watchess',
    subCategories: ['Smart Watches', 'Fitness Trackers', 'Hybrid Watches']
  },
  {
    name: 'GAME',
    subCategories: ['Console Games', 'PC Games', 'Mobile Games']
  },
  {
    name: 'boAt Smart Watches',
    subCategories: []
  },
  {
    name: 'Civil Items',
    subCategories: ['Construction Materials', 'Tools', 'Safety Equipment']
  },
  {
    name: 'DRESS',
    subCategories: ['Casual', 'Formal', 'Party Wear']
  },
  {
    name: 'Test',
    subCategories: []
  },
  {
    name: 'Miscellaneous',
    subCategories: ['Office Supplies', 'Cleaning', 'Other Items']
  },
  {
    name: 'Other',
    subCategories: []
  },
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

// Category Dropdown Component with Search and Hierarchical SubCategories
function CategoryDropdown({ isOpen, onClose, selectedCategories, onCategoryToggle }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const toggleCategory = (category) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  // Filter categories based on search
  const filteredCategories = CATEGORY_HIERARCHY.filter(category => {
    const matchesParent = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesChild = category.subCategories.some(sub => 
      sub.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesParent || matchesChild;
  });

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className="absolute bottom-full left-0 mb-1 w-[320px] bg-white border border-[#E2E8F0] rounded-[6px] shadow-lg z-50 max-h-[350px] overflow-hidden flex flex-col"
    >
      {/* Search Input */}
      <div className="p-[8px] border-b border-[#E2E8F0]">
        <div className="relative flex items-center">
          <IconSearch size={16} stroke={1.5} className="absolute left-[10px] text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-[36px] pl-[34px] pr-[10px] border border-[#CBD5E1] rounded-[6px] text-[14px] text-[#1E293B] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6] bg-white"
            autoFocus
          />
        </div>
      </div>

      {/* Categories List */}
      <div className="flex-1 overflow-y-auto">
        {filteredCategories.map((category) => {
          const hasSubCategories = category.subCategories.length > 0;
          const isExpanded = expandedCategories.has(category.name);
          const isParentSelected = selectedCategories.includes(category.name);
          
          // Check if any subcategory matches search
          const matchingSubCategories = category.subCategories.filter(sub =>
            sub.toLowerCase().includes(searchTerm.toLowerCase())
          );
          const showAllSubs = searchTerm === '' ? category.subCategories : matchingSubCategories;

          return (
            <div key={category.name}>
              {/* Parent Category */}
              <div
                onClick={() => {
                  if (hasSubCategories) {
                    toggleCategory(category.name);
                  } else {
                    onCategoryToggle(category.name);
                  }
                }}
                className={`flex items-center h-[40px] px-[12px] cursor-pointer hover:bg-[#F8FAFC] transition-colors ${
                  isParentSelected && !hasSubCategories ? 'bg-[#EFF6FF]' : ''
                }`}
              >
                {hasSubCategories ? (
                  <IconChevronDown 
                    size={16} 
                    stroke={2}
                    className={`mr-[8px] text-[#64748B] transition-transform ${isExpanded ? '' : '-rotate-90'}`}
                  />
                ) : (
                  <div className="w-[24px]" />
                )}
                
                <span className={`flex-1 text-[14px] ${
                  isParentSelected && !hasSubCategories ? 'text-[#2563EB] font-medium' : 'text-[#1E293B]'
                }`}>
                  {category.name}
                </span>
                
                {!hasSubCategories && isParentSelected && (
                  <IconCheck size={16} className="text-[#22C55E]" stroke={2} />
                )}
              </div>

              {/* Sub-Categories */}
              {hasSubCategories && isExpanded && (
                <div className="bg-[#FAFBFC]">
                  {/* All [Category] option */}
                  <div
                    onClick={() => onCategoryToggle(category.name)}
                    className={`flex items-center h-[36px] pl-[40px] pr-[12px] cursor-pointer hover:bg-[#F1F5F9] transition-colors ${
                      isParentSelected ? 'bg-[#EFF6FF]' : ''
                    }`}
                  >
                    <span className={`flex-1 text-[13px] font-medium ${
                      isParentSelected ? 'text-[#2563EB]' : 'text-[#1E293B]'
                    }`}>
                      All {category.name}
                    </span>
                    {isParentSelected && (
                      <IconCheck size={14} className="text-[#22C55E]" stroke={2} />
                    )}
                  </div>
                  
                  {/* Individual sub-categories */}
                  {showAllSubs.map((sub) => {
                    const subValue = `${category.name} > ${sub}`;
                    const isSelected = selectedCategories.includes(subValue);

                    return (
                      <div
                        key={sub}
                        onClick={() => onCategoryToggle(subValue)}
                        className={`flex items-center h-[36px] pl-[40px] pr-[12px] cursor-pointer hover:bg-[#F1F5F9] transition-colors ${
                          isSelected ? 'bg-[#EFF6FF]' : ''
                        }`}
                      >
                        <span className={`flex-1 text-[13px] ${
                          isSelected ? 'text-[#2563EB] font-medium' : 'text-[#1E293B]'
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
        
        {filteredCategories.length === 0 && (
          <div className="flex items-center justify-center h-[60px] text-[14px] text-[#64748B]">
            No categories found
          </div>
        )}
      </div>
    </div>
  );
}

// Lookup icon component
const LookupIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.75 15.75L12.4875 12.4875" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Toggle Switch Component
function ToggleSwitch({ enabled, onChange }) {
  return (
    <button
      onClick={() => onChange?.(!enabled)}
      className={`relative w-[38.5px] h-[21px] rounded-full transition-colors ${
        enabled ? 'bg-[#0172CB]' : 'bg-[#E2E8F0]'
      }`}
    >
      <div
        className={`absolute top-[1.75px] w-[17.5px] h-[17.5px] bg-white border border-[#CBD5E1] rounded-full transition-transform ${
          enabled ? 'left-[19px]' : 'left-[2px]'
        }`}
      />
    </button>
  );
}

// Form Input Component
function FormInput({ label, required, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-[12.6px] font-medium text-[#334155] leading-[21px]">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <div className="mt-[3.5px]">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full h-[35px] px-[8px] bg-white border border-[#CBD5E1] rounded-[5.25px] text-[12.6px] text-[#1E293B] placeholder-[#94A3B8] outline-none focus:border-[#0172CB]"
        />
      </div>
    </div>
  );
}

// Form Select Component
function FormSelect({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col w-full">
      <label className="text-[12.6px] font-medium text-[#334155] leading-[21px]">
        {label}
      </label>
      <div className="mt-[3.5px]">
        <div className="relative">
          <select
            value={value}
            onChange={onChange}
            className="w-full h-[38.5px] px-[15px] pr-[35px] bg-white border border-[#E4E4E7] rounded-[5.25px] text-[12.6px] font-medium text-[#252A31] appearance-none outline-none focus:border-[#0172CB] cursor-pointer"
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <IconChevronDown
            size={14}
            stroke={1.5}
            className="absolute right-[15px] top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}

// Checklist Field Item Component
function ChecklistFieldItem({ label, icon, isSelected, onClick, onEdit, onCopy, onDelete }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-[7px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] cursor-pointer ${
        isSelected ? 'border-2 border-[#0172CB]' : 'border border-[#E2E8F0]'
      }`}
    >
      <div className="flex items-start p-[2px]">
        {/* Drag Handle */}
        <div className="border-r border-[#E2E8F0] h-[59.5px] flex items-center px-[3.5px]">
          <div className="w-[32px] h-full flex items-center justify-center p-[3.5px]">
            <IconGripVertical size={18} stroke={1.5} className="text-[#94A3B8]" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-between pl-[17.5px] pr-[17.5px] py-[17.5px]">
          <div className="flex items-start gap-[3.5px]">
            <div className="pt-[3.5px]">
              {icon}
            </div>
            <span className="text-[14px] font-medium text-[#1E293B] leading-[21px]">{label}</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-[7px]">
            <button
              onClick={(e) => { e.stopPropagation(); onEdit?.(); }}
              className="w-[24.5px] h-[24.5px] flex items-center justify-center bg-[rgba(1,114,203,0.1)] rounded-[5.25px]"
            >
              <IconPencil size={18} stroke={1.5} className="text-[#0172CB]" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onCopy?.(); }}
              className="w-[24.5px] h-[24.5px] flex items-center justify-center hover:bg-[#F1F5F9] rounded-[5.25px]"
            >
              <IconCopy size={18} stroke={1.5} className="text-[#64748B]" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete?.(); }}
              className="w-[24.5px] h-[24.5px] flex items-center justify-center hover:bg-[#F1F5F9] rounded-[5.25px]"
            >
              <IconTrash size={18} stroke={1.5} className="text-[#64748B]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function JobChecklistPage({ onBack, categoryName = "Closed (Proper Category)" }) {
  const [selectedField, setSelectedField] = useState('lookup');
  const [showEditPanel, setShowEditPanel] = useState(true);
  
  // Form state
  const [fieldName, setFieldName] = useState('Lookup');
  const [description, setDescription] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [isRequired, setIsRequired] = useState(false);
  const [copyToCustomField, setCopyToCustomField] = useState(false);
  const [lookupModule, setLookupModule] = useState('products');
  const [hideToTechnician, setHideToTechnician] = useState(false);
  
  // Category dropdown state
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const removeCategory = (category) => {
    setSelectedCategories(prev => prev.filter(c => c !== category));
  };

  return (
    <div className="flex flex-col h-full bg-[#F1F5F9]">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] flex items-center justify-between px-[10.5px] pr-[21px] py-[10.5px]">
        <div className="flex items-center">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="w-[28px] h-[28px] flex items-center justify-center rounded-full hover:bg-[#F1F5F9]"
          >
            <IconArrowLeft size={21} stroke={1.5} className="text-[#64748B]" />
          </button>

          {/* Title */}
          <div className="pl-[10.5px] flex items-center gap-[3.5px]">
            <h1 className="text-[17.5px] font-semibold text-[#0F172A] tracking-[-0.437px]">
              Job Checklist <span className="lowercase">for </span>{categoryName}
            </h1>
            <button className="w-[28px] h-[28px] flex items-center justify-center rounded-full hover:bg-[#F1F5F9]">
              <IconSettings size={18} stroke={1.5} className="text-[#64748B]" />
            </button>
          </div>
        </div>

        {/* Clone Checklist Button */}
        <button className="h-[31.5px] px-[15px] flex items-center gap-[7px] border border-[#CBD5E1] rounded-[5.25px] hover:bg-[#F8FAFC]">
          <IconCopy size={14} stroke={1.5} className="text-[#94A3B8]" />
          <span className="text-[12.6px] font-medium text-[#94A3B8]">Clone Checklist</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Center Content Area */}
        <div className="flex-1 flex flex-col items-center overflow-auto py-[56px] px-[170px]">
          {/* Dashed Container */}
          <div className="w-full max-w-[700px] border border-dashed border-[#94A3B8] rounded-[5.25px] p-[18.5px]">
            {/* Field Item */}
            <ChecklistFieldItem
              label="Lookup"
              icon={<LookupIcon />}
              isSelected={selectedField === 'lookup'}
              onClick={() => {
                setSelectedField('lookup');
                setShowEditPanel(true);
              }}
              onEdit={() => setShowEditPanel(true)}
            />
          </div>
        </div>

        {/* Right Panel - Edit Form */}
        {showEditPanel && (
          <div className="w-[392px] min-w-[392px] bg-white border-l border-[#E2E8F0] flex flex-col overflow-hidden">
            {/* Panel Header */}
            <div className="h-[42px] px-[14px] flex items-center justify-between border-b border-[#E2E8F0]">
              <span className="text-[14px] font-medium text-[#1E293B]">Edit Lookup</span>
              <button
                onClick={() => setShowEditPanel(false)}
                className="w-[28px] h-[28px] flex items-center justify-center rounded-full hover:bg-[#F1F5F9]"
              >
                <IconX size={14} stroke={1.5} className="text-[#64748B]" />
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Information Section */}
              <div className="p-[10.5px]">
                <div className="text-[14px] font-medium text-[#94A3B8] leading-[21px]">
                  Information
                </div>
                
                <div className="mt-[10.5px] flex flex-col gap-[17.5px]">
                  <FormInput
                    label="Field Name"
                    required
                    value={fieldName}
                    onChange={(e) => setFieldName(e.target.value)}
                    placeholder="Enter field name"
                  />
                  
                  <FormInput
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="description"
                  />
                  
                  <FormInput
                    label="Placeholder"
                    value={placeholder}
                    onChange={(e) => setPlaceholder(e.target.value)}
                    placeholder="placeholder"
                  />
                </div>
              </div>

              {/* Configuration Section */}
              <div className="border-t border-[#E2E8F0] px-[10.5px] py-[11.5px]">
                <div className="text-[14px] font-medium text-[#94A3B8] leading-[21px]">
                  Configuration
                </div>
                
                <div className="mt-[10.5px] flex flex-col gap-[17.5px]">
                  {/* Mark as Required Field */}
                  <div className="flex items-center justify-between">
                    <span className="text-[12.6px] font-medium text-[#334155] leading-[21px]">
                      Mark as Required Field
                    </span>
                    <ToggleSwitch enabled={isRequired} onChange={setIsRequired} />
                  </div>

                  {/* Copy to Custom Field */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[12.6px] font-medium text-[#334155] leading-[21px]">
                        Copy to Custom Field
                      </div>
                      <div className="text-[12.6px] font-normal text-[#697D95] leading-[21px]">
                        Copy the field value to a custom field
                      </div>
                    </div>
                    <ToggleSwitch enabled={copyToCustomField} onChange={setCopyToCustomField} />
                  </div>

                  {/* LookUp Module */}
                  <div>
                    <FormSelect
                      label="LookUp Module"
                      value={lookupModule}
                      onChange={(e) => setLookupModule(e.target.value)}
                      options={[
                        { value: 'products', label: 'Products' },
                        { value: 'customers', label: 'Customers' },
                        { value: 'properties', label: 'Properties' },
                        { value: 'assets', label: 'Assets' },
                      ]}
                    />

                    {/* Product Categories */}
                    <div className="mt-[7px] bg-[#F8FAFC] border border-[#F1F5F9] rounded-[5.25px] p-[8px]">
                      <div className="text-[12.6px] font-normal text-[#1E293B] leading-[21px]">
                        Product Categories
                      </div>
                      
                      <div className="mt-[7px] bg-white border border-[#E2E8F0] rounded-[3.5px] px-[8px] py-[10px] min-h-[45px]">
                        {selectedCategories.length === 0 ? (
                          <div className="text-[12.6px] font-normal text-[#64748B] text-center leading-[21px] py-[5px]">
                            No categories selected
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-[6px]">
                            {selectedCategories.map((category) => (
                              <div
                                key={category}
                                className="flex items-center gap-[4px] h-[26px] px-[8px] bg-[#EFF6FF] border border-[#BFDBFE] rounded-[4px]"
                              >
                                <span className="text-[12px] font-medium text-[#2563EB]">
                                  {category.includes(' > ') ? category.split(' > ')[1] : category}
                                </span>
                                <button
                                  onClick={() => removeCategory(category)}
                                  className="w-[14px] h-[14px] flex items-center justify-center rounded-full hover:bg-[#DBEAFE]"
                                >
                                  <IconX size={10} stroke={2} className="text-[#2563EB]" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="relative">
                        <button 
                          onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                          className="mt-[7px] flex items-center gap-[7px] px-[7px] py-[3.5px] rounded-[5.25px] hover:bg-[#F1F5F9]"
                        >
                          <span className="text-[12.6px] font-normal text-[#3B82F6]">Add Category</span>
                          <IconChevronDown 
                            size={16} 
                            stroke={1.5} 
                            className={`text-[#3B82F6] transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} 
                          />
                        </button>
                        
                        <CategoryDropdown
                          isOpen={showCategoryDropdown}
                          onClose={() => setShowCategoryDropdown(false)}
                          selectedCategories={selectedCategories}
                          onCategoryToggle={handleCategoryToggle}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visibility Section */}
              <div className="border-t border-[#E2E8F0] px-[10.5px] py-[11.5px]">
                <div className="text-[14px] font-medium text-[#94A3B8] leading-[21px]">
                  Visibility
                </div>
                
                <div className="mt-[10.5px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[12.6px] font-medium text-[#334155] leading-[21px]">
                      Hide to FE / Technician
                    </span>
                    <ToggleSwitch enabled={hideToTechnician} onChange={setHideToTechnician} />
                  </div>
                </div>
              </div>
            </div>

            {/* Panel Footer */}
            <div className="border-t border-[#E2E8F0] px-[10.5px] py-[11.5px] flex items-center justify-end gap-[14px]">
              <button
                onClick={() => setShowEditPanel(false)}
                className="h-[31.5px] px-[15px] flex items-center justify-center border border-[#CBD5E1] rounded-[5.25px] text-[12.6px] font-medium text-[#334155] hover:bg-[#F8FAFC]"
              >
                Cancel
              </button>
              <button className="h-[31.5px] px-[14px] flex items-center justify-center bg-[#E44A19] rounded-[5.25px] text-[12.6px] font-medium text-white hover:bg-[#D13D0F]">
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobChecklistPage;
