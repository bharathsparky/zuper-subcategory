import React, { useState, useRef, useEffect } from 'react';
import {
  IconChevronRight,
  IconChevronDown,
  IconChevronLeft,
  IconPlus,
  IconX,
  IconDeviceFloppy,
  IconSend,
  IconClipboardList,
  IconPaperclip,
  IconCalendar,
  IconSearch,
  IconTrash,
  IconPalette,
} from '@tabler/icons-react';

// Collapsible Section Component
function CollapsibleSection({ title, icon: Icon, defaultExpanded = true, children }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full h-[49px] px-[21px] flex items-center gap-[10px] hover:bg-[#F8FAFC] transition-colors"
      >
        {Icon && <Icon size={18} className="text-[#64748B]" stroke={1.5} />}
        <span className="text-[15px] font-semibold text-[#1E293B]">{title}</span>
        <IconChevronDown
          size={14}
          stroke={2}
          className={`text-[#64748B] ml-auto transition-transform ${isExpanded ? '' : '-rotate-90'}`}
        />
      </button>
      {isExpanded && (
        <div className="px-[21px] pb-[21px] border-t border-[#E2E8F0]">
          {children}
        </div>
      )}
    </div>
  );
}

// Form Input Component
function FormInput({ label, placeholder, required, type = 'text', value, onChange }) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="text-[13px] font-medium text-[#334155]">
        {label}
        {required && <span className="text-[#EF4444] ml-0.5">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="h-[42px] px-[14px] border border-[#E2E8F0] rounded-[6px] text-[14px] text-[#1E293B] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/20 transition-colors bg-white"
      />
    </div>
  );
}

// Form Select Component
function FormSelect({ label, placeholder, required, options = [], value, onChange }) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="text-[13px] font-medium text-[#334155]">
        {label}
        {required && <span className="text-[#EF4444] ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full h-[42px] px-[14px] pr-[36px] border border-[#E2E8F0] rounded-[6px] text-[14px] text-[#1E293B] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/20 transition-colors appearance-none bg-white cursor-pointer"
        >
          <option value="" disabled className="text-[#94A3B8]">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <IconChevronDown 
          size={16} 
          className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" 
        />
      </div>
    </div>
  );
}

// Searchable User Select Component
function UserSelect({ label, required, value, onClear }) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="text-[13px] font-medium text-[#334155]">
        {label}
        {required && <span className="text-[#EF4444] ml-0.5">*</span>}
      </label>
      <div className="relative">
        <div className="h-[42px] px-[14px] pr-[60px] border border-[#E2E8F0] rounded-[6px] flex items-center bg-white">
          <span className="text-[14px] text-[#1E293B]">{value || 'Select user'}</span>
        </div>
        <div className="absolute right-[8px] top-1/2 -translate-y-1/2 flex items-center gap-1">
          {value && (
            <button 
              onClick={onClear}
              className="p-1 text-[#EF4444] hover:bg-[#FEF2F2] rounded transition-colors"
            >
              <IconX size={16} />
            </button>
          )}
          <div className="w-[24px] h-[24px] bg-[#334155] rounded flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="7" r="4"/>
              <path d="M5 21v-2a7 7 0 0 1 14 0v2"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// Form Textarea Component
function FormTextarea({ label, placeholder, rows = 3, value, onChange }) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="text-[13px] font-medium text-[#334155]">{label}</label>
      <textarea
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange}
        className="px-[14px] py-[12px] border border-[#E2E8F0] rounded-[6px] text-[14px] text-[#1E293B] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/20 transition-colors resize-none bg-white"
      />
    </div>
  );
}

// Date Picker Component
function DatePicker({ label, required, placeholder = 'Pick Date' }) {
  return (
    <div className="flex flex-col gap-[6px]">
      <label className="text-[13px] font-medium text-[#334155]">
        {label}
        {required && <span className="text-[#EF4444] ml-0.5">*</span>}
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full h-[42px] px-[14px] pr-[42px] border border-[#E2E8F0] rounded-[6px] text-[14px] text-[#1E293B] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/20 transition-colors bg-white"
        />
        <IconCalendar 
          size={18} 
          className="absolute right-[14px] top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" 
        />
      </div>
    </div>
  );
}

// Asset paths from Figma
const NO_PARTS_FOUND_SVG = '/assets/fd4f85bcbb8069d3467ffa73ef4ec4565fd14797.svg';
const ATTACHMENT_PLACEHOLDER_SVG = '/assets/c20d710f29392b86b5a2a911024866818be14442.svg';

// Sample Parts/Products Data with Options
const SAMPLE_PARTS = [
  {
    id: 'ZP-45345',
    name: 'Drip edge',
    fullName: '#ZP - 45345 - Drip edge',
    type: 'Product',
    unit: 'Unit',
    image: '/assets/5026cf2c9a0c2720f69b527063b4d19998f3320f.svg',
    options: [
      { id: 'opt-1', name: 'White', color: '#FFFFFF', image: null },
      { id: 'opt-2', name: 'Brown', color: '#8B4513', image: null },
      { id: 'opt-3', name: 'Black', color: '#1A1A1A', image: null },
    ],
    optionLabel: 'Colors',
  },
  {
    id: 'ZP-49',
    name: 'FastTrack',
    fullName: '#ZP - 49 - FastTrack',
    type: 'Part',
    unit: 'Each',
    image: null,
    options: [],
    optionLabel: null,
  },
  {
    id: '001-P0543',
    name: 'Mini generator',
    fullName: '#001 - P0543 - Mini generator',
    type: 'Part',
    unit: 'Each',
    image: '/assets/54dcdb986bcc128a44c97e02bc274d84443e5b01.svg',
    options: [
      { id: 'opt-1', name: 'Red', color: '#DC2626', image: null },
      { id: 'opt-2', name: 'Blue', color: '#2563EB', image: null },
    ],
    optionLabel: 'Variants',
  },
  {
    id: 'Part869745-632154578',
    name: 'Test spec oil fuel random wording length',
    fullName: '#Part869745-632154578 - Test spec oil fuel random wording length',
    type: 'Product',
    unit: 'Each',
    image: null,
    options: [],
    optionLabel: null,
  },
  {
    id: 'SC002',
    name: 'Repair of Plumbing Defects',
    fullName: '#SC002 - Repair of Plumbing Defects',
    type: 'Product',
    unit: 'Each',
    image: null,
    options: [],
    optionLabel: null,
  },
  {
    id: 'SHG001',
    name: 'GAF Timberline HDZ Shingles',
    fullName: '#SHG001 - GAF Timberline HDZ Shingles',
    type: 'Part',
    unit: 'Bundle(s)',
    image: '/assets/5026cf2c9a0c2720f69b527063b4d19998f3320f.svg',
    options: [
      { id: 'opt-1', name: 'Charcoal', color: '#374151', image: null },
      { id: 'opt-2', name: 'Weathered Wood', color: '#A16207', image: null },
      { id: 'opt-3', name: 'Pewter Gray', color: '#6B7280', image: null },
      { id: 'opt-4', name: 'Slate', color: '#475569', image: null },
    ],
    optionLabel: 'Colors',
  },
];

// Product Image Placeholder
function ProductImagePlaceholder() {
  return (
    <div className="w-[42px] h-[42px] bg-[#F1F5F9] rounded-[4px] flex items-center justify-center">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="3.27,6.96 12,12.01 20.73,6.96" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="12" y1="22.08" x2="12" y2="12" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// Option Selector Component for Modal
function OptionSelector({ options, selectedOption, onSelect, optionLabel }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!options || options.length === 0) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-[32px] px-[10px] flex items-center gap-[6px] border border-[#E2E8F0] rounded-[4px] bg-white hover:bg-[#F8FAFC] transition-colors text-[12px]"
      >
        {selectedOption ? (
          <>
            {selectedOption.color && (
              <div 
                className="w-[14px] h-[14px] rounded-[2px] border border-[#E2E8F0]"
                style={{ backgroundColor: selectedOption.color }}
              />
            )}
            <span className="text-[#334155] max-w-[80px] truncate">{selectedOption.name}</span>
          </>
        ) : (
          <>
            <IconPalette size={14} className="text-[#64748B]" />
            <span className="text-[#94A3B8]">{optionLabel || 'Select'}</span>
          </>
        )}
        <IconChevronDown size={12} className="text-[#64748B]" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-[160px] bg-white border border-[#E2E8F0] rounded-[6px] shadow-lg z-50 py-1 max-h-[200px] overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className={`w-full px-[10px] py-[8px] flex items-center gap-[8px] hover:bg-[#F8FAFC] transition-colors ${
                selectedOption?.id === option.id ? 'bg-[#EFF6FF]' : ''
              }`}
            >
              {option.color && (
                <div 
                  className="w-[18px] h-[18px] rounded-[3px] border border-[#E2E8F0] flex-shrink-0"
                  style={{ backgroundColor: option.color }}
                />
              )}
              <span className="text-[13px] text-[#334155] truncate">{option.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Parts Selection Modal - supports multiple options per product
function PartsSelectionModal({ isOpen, onClose, onAddParts, existingParts = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [productType, setProductType] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // Selections: array of { uniqueKey, part, selectedOption, quantity }
  const [selections, setSelections] = useState([]);
  const itemsPerPage = 5;

  // Filter parts based on search and filters
  const filteredParts = SAMPLE_PARTS.filter(part => {
    const matchesSearch = searchQuery === '' || 
      part.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = productType === '' || part.type === productType;
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredParts.length / itemsPerPage);
  const paginatedParts = filteredParts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Generate unique key for a selection
  const generateKey = (partId, optionId) => {
    return optionId ? `${partId}-${optionId}` : partId;
  };

  // Check if a part has any selection (for checkbox state)
  const hasSelection = (partId) => {
    return selections.some(s => s.part.id === partId);
  };

  // Get all selections for a specific part
  const getPartSelections = (partId) => {
    return selections.filter(s => s.part.id === partId);
  };

  // Add initial selection for a part (when checkbox is checked)
  const handleSelectPart = (part, checked) => {
    if (checked) {
      const defaultOption = part.options.length > 0 ? part.options[0] : null;
      const uniqueKey = generateKey(part.id, defaultOption?.id);
      setSelections(prev => [...prev, {
        uniqueKey,
        part,
        selectedOption: defaultOption,
        quantity: '',
      }]);
    } else {
      // Remove all selections for this part
      setSelections(prev => prev.filter(s => s.part.id !== part.id));
    }
  };

  // Add another option selection for the same part
  const handleAddAnotherOption = (part) => {
    const currentSelections = getPartSelections(part.id);
    const usedOptionIds = currentSelections.map(s => s.selectedOption?.id).filter(Boolean);
    const availableOptions = part.options.filter(opt => !usedOptionIds.includes(opt.id));
    
    if (availableOptions.length > 0) {
      const nextOption = availableOptions[0];
      const uniqueKey = generateKey(part.id, nextOption.id);
      setSelections(prev => [...prev, {
        uniqueKey,
        part,
        selectedOption: nextOption,
        quantity: '',
      }]);
    }
  };

  // Remove a specific selection
  const handleRemoveSelection = (uniqueKey) => {
    setSelections(prev => prev.filter(s => s.uniqueKey !== uniqueKey));
  };

  // Update quantity for a specific selection
  const handleQuantityChange = (uniqueKey, quantity) => {
    setSelections(prev => prev.map(s => 
      s.uniqueKey === uniqueKey ? { ...s, quantity } : s
    ));
  };

  // Update option for a specific selection
  const handleOptionChange = (uniqueKey, option, part) => {
    const newUniqueKey = generateKey(part.id, option.id);
    setSelections(prev => prev.map(s => 
      s.uniqueKey === uniqueKey ? { ...s, uniqueKey: newUniqueKey, selectedOption: option } : s
    ));
  };

  const handleAdd = () => {
    const itemsToAdd = selections
      .filter(s => s.quantity)
      .map(s => ({
        ...s.part,
        uniqueKey: s.uniqueKey,
        selectedOption: s.selectedOption,
        quantity: s.quantity,
      }));
    if (itemsToAdd.length > 0) {
      onAddParts(itemsToAdd);
    }
    setSelections([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[8px] w-[95vw] max-w-[1224px] max-h-[90vh] flex flex-col shadow-xl">
        {/* Modal Header */}
        <div className="h-[56px] px-[21px] flex items-center border-b border-[#E2E8F0] shrink-0">
          <h2 className="text-[16px] font-semibold text-[#1E293B]">
            Select Parts/Products to be added to the Material Request
          </h2>
        </div>

        {/* Filters Row */}
        <div className="px-[21px] py-[14px] flex items-center gap-[14px] border-b border-[#E2E8F0]">
          {/* Search Input */}
          <div className="relative flex-1 max-w-[280px]">
            <IconSearch size={16} className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search Item"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[38px] pl-[36px] pr-[14px] border border-[#E2E8F0] rounded-[6px] text-[14px] text-[#1E293B] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/20"
            />
          </div>

          {/* Product Type Filter */}
          <div className="relative w-[180px]">
            <select
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              className="w-full h-[38px] px-[12px] pr-[32px] border border-[#E2E8F0] rounded-[6px] text-[14px] text-[#64748B] outline-none focus:border-[#3B82F6] appearance-none bg-white"
            >
              <option value="">Product Type</option>
              <option value="Product">Product</option>
              <option value="Part">Part</option>
            </select>
            <IconChevronDown size={14} className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
          </div>

          {/* Category Filter */}
          <div className="relative w-[180px]">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-[38px] px-[12px] pr-[32px] border border-[#E2E8F0] rounded-[6px] text-[14px] text-[#64748B] outline-none focus:border-[#3B82F6] appearance-none bg-white"
            >
              <option value="">Category</option>
              <option value="roofing">Roofing</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
            </select>
            <IconChevronDown size={14} className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
          </div>

          {/* Pagination */}
          <div className="ml-auto flex items-center gap-[8px]">
            <span className="text-[13px] text-[#64748B]">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-[32px] h-[32px] flex items-center justify-center rounded hover:bg-[#F1F5F9] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <IconChevronLeft size={18} className="text-[#64748B]" />
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="w-[32px] h-[32px] flex items-center justify-center rounded hover:bg-[#F1F5F9] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <IconChevronRight size={18} className="text-[#64748B]" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto px-[21px] py-[14px]">
          <div className="border border-[#E2E8F0] rounded-[6px] overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-[50px_1fr_120px_180px_160px_60px] bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <div className="px-[16px] py-[12px]"></div>
              <div className="px-[12px] py-[12px]">
                <span className="text-[11px] font-medium text-[#64748B] uppercase tracking-wide">Item</span>
              </div>
              <div className="px-[12px] py-[12px]">
                <span className="text-[11px] font-medium text-[#64748B] uppercase tracking-wide">Type</span>
              </div>
              <div className="px-[12px] py-[12px]">
                <span className="text-[11px] font-medium text-[#64748B] uppercase tracking-wide">Option</span>
              </div>
              <div className="px-[12px] py-[12px]">
                <span className="text-[11px] font-medium text-[#64748B] uppercase tracking-wide">Required Quantity</span>
                <span className="text-[#EF4444] ml-0.5">*</span>
              </div>
              <div className="px-[12px] py-[12px]"></div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-[#E2E8F0]">
              {paginatedParts.map((part) => {
                const partSelections = getPartSelections(part.id);
                const isSelected = partSelections.length > 0;
                const usedOptionIds = partSelections.map(s => s.selectedOption?.id).filter(Boolean);
                const canAddMore = part.options.length > 0 && usedOptionIds.length < part.options.length;

                return (
                  <div key={part.id} className={`${isSelected ? 'bg-[#F0F9FF]' : ''}`}>
                    {/* Main row */}
                    <div className={`grid grid-cols-[50px_1fr_120px_180px_160px_60px] items-center ${!isSelected && 'hover:bg-[#F8FAFC]'}`}>
                      {/* Checkbox */}
                      <div className="px-[16px] py-[16px]">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleSelectPart(part, e.target.checked)}
                          className="w-[16px] h-[16px] rounded border-[#CBD5E1] text-[#3B82F6] focus:ring-[#3B82F6] cursor-pointer"
                        />
                      </div>

                      {/* Item */}
                      <div className="px-[12px] py-[16px] flex items-center gap-[12px]">
                        <ProductImagePlaceholder />
                        <span className="text-[14px] font-medium text-[#1E293B]">{part.fullName}</span>
                      </div>

                      {/* Type */}
                      <div className="px-[12px] py-[16px]">
                        <span className="text-[13px] text-[#64748B] capitalize">{part.type}</span>
                      </div>

                      {/* Option - First selection or placeholder */}
                      <div className="px-[12px] py-[16px]">
                        {part.options.length > 0 ? (
                          partSelections.length > 0 ? (
                            <OptionSelector
                              options={part.options.filter(opt => !usedOptionIds.includes(opt.id) || opt.id === partSelections[0].selectedOption?.id)}
                              selectedOption={partSelections[0].selectedOption}
                              onSelect={(option) => handleOptionChange(partSelections[0].uniqueKey, option, part)}
                              optionLabel={part.optionLabel}
                            />
                          ) : (
                            <button
                              onClick={() => handleSelectPart(part, true)}
                              className="h-[32px] px-[10px] flex items-center gap-[6px] border border-dashed border-[#CBD5E1] rounded-[4px] bg-white hover:bg-[#F8FAFC] hover:border-[#94A3B8] transition-colors text-[12px]"
                            >
                              <IconPalette size={14} className="text-[#94A3B8]" />
                              <span className="text-[#94A3B8]">{part.optionLabel || 'Select'}</span>
                            </button>
                          )
                        ) : (
                          <span className="text-[12px] text-[#94A3B8]">—</span>
                        )}
                      </div>

                      {/* Quantity - First selection */}
                      <div className="px-[12px] py-[16px]">
                        <div className="flex items-center">
                          <input
                            type="number"
                            placeholder="Eg: 20"
                            value={partSelections[0]?.quantity || ''}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (!isSelected) {
                                // Auto-select the part with the entered quantity
                                const defaultOption = part.options.length > 0 ? part.options[0] : null;
                                const uniqueKey = defaultOption ? `${part.id}-${defaultOption.id}` : part.id;
                                setSelections(prev => [...prev, {
                                  uniqueKey,
                                  part,
                                  selectedOption: defaultOption,
                                  quantity: value,
                                }]);
                              } else {
                                handleQuantityChange(partSelections[0].uniqueKey, value);
                              }
                            }}
                            className="w-[80px] h-[36px] px-[10px] border border-[#E2E8F0] rounded-l-[4px] text-[13px] text-[#1E293B] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6] focus:z-10"
                          />
                          <div className="h-[36px] px-[10px] bg-[#F8FAFC] border border-l-0 border-[#E2E8F0] rounded-r-[4px] flex items-center">
                            <span className="text-[12px] text-[#64748B]">{part.unit}</span>
                          </div>
                        </div>
                      </div>

                      {/* Add more options button */}
                      <div className="px-[12px] py-[16px]">
                        {canAddMore && isSelected && (
                          <button
                            onClick={() => handleAddAnotherOption(part)}
                            className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#3B82F6] hover:bg-[#2563EB] text-white transition-colors"
                            title="Add another option"
                          >
                            <IconPlus size={16} stroke={2} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Additional option rows */}
                    {partSelections.slice(1).map((selection, index) => (
                      <div 
                        key={selection.uniqueKey} 
                        className="grid grid-cols-[50px_1fr_120px_180px_160px_60px] items-center border-t border-[#E2E8F0] bg-[#F0F9FF]/50"
                      >
                        <div className="px-[16px] py-[12px]"></div>
                        <div className="px-[12px] py-[12px] flex items-center gap-[12px] pl-[66px]">
                          <span className="text-[13px] text-[#64748B]">↳ Same product, different option</span>
                        </div>
                        <div className="px-[12px] py-[12px]"></div>
                        <div className="px-[12px] py-[12px]">
                          <OptionSelector
                            options={part.options.filter(opt => !usedOptionIds.includes(opt.id) || opt.id === selection.selectedOption?.id)}
                            selectedOption={selection.selectedOption}
                            onSelect={(option) => handleOptionChange(selection.uniqueKey, option, part)}
                            optionLabel={part.optionLabel}
                          />
                        </div>
                        <div className="px-[12px] py-[12px]">
                          <div className="flex items-center">
                            <input
                              type="number"
                              placeholder="Eg: 20"
                              value={selection.quantity}
                              onChange={(e) => handleQuantityChange(selection.uniqueKey, e.target.value)}
                              className="w-[80px] h-[36px] px-[10px] border border-[#E2E8F0] rounded-l-[4px] text-[13px] text-[#1E293B] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6] focus:z-10"
                            />
                            <div className="h-[36px] px-[10px] bg-[#F8FAFC] border border-l-0 border-[#E2E8F0] rounded-r-[4px] flex items-center">
                              <span className="text-[12px] text-[#64748B]">{part.unit}</span>
                            </div>
                          </div>
                        </div>
                        <div className="px-[12px] py-[12px]">
                          <button
                            onClick={() => handleRemoveSelection(selection.uniqueKey)}
                            className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#FEF2F2] text-[#94A3B8] hover:text-[#EF4444] transition-colors"
                            title="Remove this option"
                          >
                            <IconX size={16} stroke={2} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}

              {paginatedParts.length === 0 && (
                <div className="py-[40px] flex flex-col items-center justify-center">
                  <p className="text-[14px] text-[#64748B]">No parts found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="h-[64px] px-[21px] flex items-center justify-end gap-[12px] border-t border-[#E2E8F0] shrink-0">
          <button
            onClick={onClose}
            className="h-[38px] px-[20px] border border-[#E2E8F0] rounded-[6px] text-[14px] font-medium text-[#334155] bg-white hover:bg-[#F8FAFC] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="h-[38px] px-[20px] bg-[#E44A19] rounded-[6px] text-[14px] font-medium text-white hover:bg-[#D13D0F] transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

// Empty State Illustration for Parts
function PartsEmptyStateIcon() {
  return (
    <img 
      src={NO_PARTS_FOUND_SVG} 
      alt="No parts found" 
      className="w-[146px] h-[112px]"
    />
  );
}

// Empty State Illustration for Attachments/Job
function DocumentEmptyStateIcon() {
  return (
    <img 
      src={ATTACHMENT_PLACEHOLDER_SVG} 
      alt="Attachment placeholder" 
      className="w-[119px] h-[112px]"
    />
  );
}

// Main Component
function NewMaterialRequestPage({ onBack }) {
  const [formData, setFormData] = useState({
    title: '',
    requestedBy: 'Ajith S',
    requiredBy: '',
    deliveryMethod: 'direct-shipment',
    priority: 'low',
    remarks: '',
  });
  const [showPartsModal, setShowPartsModal] = useState(false);
  const [addedParts, setAddedParts] = useState([]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddParts = (parts) => {
    setAddedParts(prev => {
      const existingKeys = prev.map(p => p.uniqueKey);
      const newParts = parts.filter(p => !existingKeys.includes(p.uniqueKey));
      return [...prev, ...newParts];
    });
  };

  const handleRemovePart = (uniqueKey) => {
    setAddedParts(prev => prev.filter(p => p.uniqueKey !== uniqueKey));
  };

  const handleUpdatePartQuantity = (uniqueKey, quantity) => {
    setAddedParts(prev => prev.map(p => 
      p.uniqueKey === uniqueKey ? { ...p, quantity } : p
    ));
  };

  return (
    <div className="flex flex-col h-full bg-[#F1F5F9]">
      {/* Breadcrumb Header */}
      <div className="h-[56px] px-[21px] flex items-center justify-between bg-white border-b border-[#E2E8F0] shrink-0">
        <div className="flex items-center gap-[8px]">
          <button 
            onClick={onBack}
            className="text-[14px] text-[#64748B] hover:text-[#334155] transition-colors"
          >
            Material Requests
          </button>
          <IconChevronRight size={16} className="text-[#94A3B8]" />
          <span className="text-[14px] font-medium text-[#1E293B]">New Material Request</span>
        </div>
        
        <div className="flex items-center gap-[12px]">
          <button className="h-[38px] px-[16px] flex items-center gap-[8px] border border-[#E2E8F0] rounded-[6px] text-[14px] font-medium text-[#334155] bg-white hover:bg-[#F8FAFC] transition-colors">
            <IconDeviceFloppy size={18} stroke={1.5} />
            Save as Draft
          </button>
          <button className="h-[38px] px-[16px] flex items-center gap-[8px] bg-[#E44A19] rounded-[6px] text-[14px] font-medium text-white hover:bg-[#D13D0F] transition-colors">
            <IconSend size={18} stroke={1.5} />
            Save & Submit
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-[21px]">
          <div className="max-w-[900px] space-y-[14px]">
            {/* Primary Details Section */}
            <CollapsibleSection title="Primary Details" icon={IconClipboardList}>
              <div className="pt-[14px] space-y-[14px]">
                {/* Row 1: Title and Requested By */}
                <div className="grid grid-cols-2 gap-[14px]">
                  <FormInput
                    label="Material Request Title"
                    placeholder="Request Title"
                    required
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                  />
                  <UserSelect
                    label="Requested By"
                    required
                    value={formData.requestedBy}
                    onClear={() => handleChange('requestedBy', '')}
                  />
                </div>

                {/* Row 2: Required By, Delivery Method, Priority */}
                <div className="grid grid-cols-3 gap-[14px]">
                  <DatePicker
                    label="Required By"
                    required
                    placeholder="Pick Date"
                  />
                  <FormSelect
                    label="Delivery Method"
                    placeholder="Select"
                    required
                    options={[
                      { value: 'direct-shipment', label: "Direct Shipment to Job's site" },
                      { value: 'warehouse', label: 'Ship to Warehouse' },
                      { value: 'pickup', label: 'Customer Pickup' },
                    ]}
                    value={formData.deliveryMethod}
                    onChange={(e) => handleChange('deliveryMethod', e.target.value)}
                  />
                  <FormSelect
                    label="Priority"
                    placeholder="Select"
                    options={[
                      { value: 'low', label: 'Low' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'high', label: 'High' },
                      { value: 'urgent', label: 'Urgent' },
                    ]}
                    value={formData.priority}
                    onChange={(e) => handleChange('priority', e.target.value)}
                  />
                </div>

                {/* Row 3: Remarks */}
                <FormTextarea
                  label="Remarks"
                  placeholder="Enter remarks"
                  rows={3}
                  value={formData.remarks}
                  onChange={(e) => handleChange('remarks', e.target.value)}
                />
              </div>
            </CollapsibleSection>

            {/* Parts & Products Section */}
            <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden">
              <div className="h-[49px] px-[21px] flex items-center justify-between">
                <span className="text-[15px] font-semibold text-[#1E293B]">
                  Parts & Products {addedParts.length > 0 && <span className="text-[#64748B] font-normal">({addedParts.length})</span>}
                </span>
                {addedParts.length > 0 && (
                  <button 
                    onClick={() => setShowPartsModal(true)}
                    className="h-[32px] px-[12px] flex items-center gap-[6px] border border-[#E2E8F0] rounded-[5px] text-[13px] font-medium text-[#334155] bg-white hover:bg-[#F8FAFC] transition-colors"
                  >
                    <IconPlus size={14} stroke={2} />
                    Add
                  </button>
                )}
              </div>
              
              {addedParts.length === 0 ? (
                <div className="py-[40px] flex flex-col items-center justify-center border-t border-[#E2E8F0]">
                  <PartsEmptyStateIcon />
                  <h3 className="mt-[16px] text-[16px] font-semibold text-[#1E293B]">Add Parts</h3>
                  <p className="mt-[4px] text-[13px] text-[#64748B]">Start adding parts to the Material Request</p>
                  <button 
                    onClick={() => setShowPartsModal(true)}
                    className="mt-[16px] h-[38px] px-[16px] flex items-center gap-[8px] border border-[#E2E8F0] rounded-[6px] text-[14px] font-medium text-[#334155] bg-white hover:bg-[#F8FAFC] transition-colors"
                  >
                    <IconPlus size={16} stroke={2} />
                    Add
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  {/* Table Header */}
                  <div className="grid grid-cols-[50px_1fr_120px_180px_60px] bg-[#F8FAFC] border-t border-b border-[#E2E8F0] min-w-[700px]">
                    <div className="px-[16px] py-[12px]">
                      <span className="text-[11px] font-medium text-[#64748B] uppercase tracking-wide">#</span>
                    </div>
                    <div className="px-[12px] py-[12px]">
                      <span className="text-[11px] font-medium text-[#64748B] uppercase tracking-wide">Item</span>
                    </div>
                    <div className="px-[12px] py-[12px]">
                      <span className="text-[11px] font-medium text-[#64748B] uppercase tracking-wide">Type</span>
                    </div>
                    <div className="px-[12px] py-[12px]">
                      <span className="text-[11px] font-medium text-[#64748B] uppercase tracking-wide">Required Quantity</span>
                    </div>
                    <div className="px-[12px] py-[12px]">
                      <span className="text-[11px] font-medium text-[#64748B] uppercase tracking-wide">Action</span>
                    </div>
                  </div>

                  {/* Table Body */}
                  <div className="divide-y divide-[#E2E8F0] min-w-[700px]">
                    {addedParts.map((part, index) => (
                      <div key={part.uniqueKey} className="grid grid-cols-[50px_1fr_120px_180px_60px] items-center hover:bg-[#F8FAFC]">
                        {/* Row Number */}
                        <div className="px-[16px] py-[16px]">
                          <span className="text-[14px] text-[#64748B]">{index + 1}</span>
                        </div>

                        {/* Item */}
                        <div className="px-[12px] py-[16px] flex items-center gap-[12px]">
                          <ProductImagePlaceholder />
                          <div className="flex flex-col min-w-0">
                            <span className="text-[14px] font-medium text-[#1E293B]">
                              {part.id} - {part.name}
                              {part.selectedOption && (
                                <span className="text-[#64748B] font-normal"> ({part.selectedOption.name})</span>
                              )}
                            </span>
                          </div>
                        </div>

                        {/* Type */}
                        <div className="px-[12px] py-[16px]">
                          <span className="text-[14px] text-[#64748B] capitalize">{part.type}</span>
                        </div>

                        {/* Required Quantity */}
                        <div className="px-[12px] py-[16px]">
                          <div className="flex items-center">
                            <input
                              type="number"
                              value={part.quantity}
                              onChange={(e) => handleUpdatePartQuantity(part.uniqueKey, e.target.value)}
                              className="w-[70px] h-[36px] px-[10px] border border-[#E2E8F0] rounded-l-[4px] text-[14px] text-[#1E293B] outline-none focus:border-[#3B82F6] bg-white"
                            />
                            <div className="h-[36px] px-[12px] bg-[#F1F5F9] border border-l-0 border-[#E2E8F0] rounded-r-[4px] flex items-center">
                              <span className="text-[13px] text-[#64748B]">{part.unit}</span>
                            </div>
                          </div>
                        </div>

                        {/* Delete Action */}
                        <div className="px-[12px] py-[16px] flex justify-center">
                          <button
                            onClick={() => handleRemovePart(part.uniqueKey)}
                            className="w-[32px] h-[32px] flex items-center justify-center rounded hover:bg-[#FEF2F2] text-[#EF4444] hover:text-[#DC2626] transition-colors"
                          >
                            <IconTrash size={18} stroke={1.5} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Parts Selection Modal */}
            <PartsSelectionModal
              isOpen={showPartsModal}
              onClose={() => setShowPartsModal(false)}
              onAddParts={handleAddParts}
            />

            {/* Other Details Section */}
            <CollapsibleSection title="Other Details" defaultExpanded={true}>
              <div className="pt-[14px] space-y-[14px]">
                {/* Row 1 */}
                <div className="grid grid-cols-3 gap-[14px]">
                  <FormInput label="Single Line Text" placeholder="" />
                  <FormInput label="Single Line Text 1" placeholder="" />
                  <FormInput label="Single Line Text for None" placeholder="" />
                </div>
                {/* Row 2 */}
                <div className="grid grid-cols-3 gap-[14px]">
                  <FormInput label="Single Line Text for Number" placeholder="" type="number" />
                  <FormInput label="Single Line Text Mail" placeholder="" type="email" />
                  <FormInput label="Single Line Text for Phone No" placeholder="" type="tel" />
                </div>
                {/* Row 3 */}
                <div className="grid grid-cols-3 gap-[14px]">
                  <FormInput label="Single Line Text for Address" placeholder="" />
                  <FormInput label="Single Line Text for Regex" placeholder="" />
                  <FormInput label="Time - 45" placeholder="" />
                </div>
                {/* Row 4 */}
                <div className="grid grid-cols-3 gap-[14px]">
                  <FormInput label="Date & Time - 60" placeholder="" />
                </div>
              </div>
            </CollapsibleSection>

            {/* Test Section */}
            <CollapsibleSection title="Test" defaultExpanded={true}>
              <div className="pt-[14px]">
                <div className="grid grid-cols-3 gap-[14px]">
                  <FormInput label="Time - 15" placeholder="" />
                  <FormInput label="Date & Time - 45" placeholder="" />
                </div>
              </div>
            </CollapsibleSection>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[280px] min-w-[280px] border-l border-[#E2E8F0] bg-white overflow-y-auto">
          {/* Associate Job / Quote Section */}
          <div className="border-b border-[#E2E8F0]">
            <div className="h-[49px] px-[16px] flex items-center gap-[10px]">
              <IconClipboardList size={18} className="text-[#64748B]" stroke={1.5} />
              <span className="text-[14px] font-semibold text-[#1E293B]">Associate Job / Quote</span>
              <span className="text-[#EF4444] ml-0.5">*</span>
            </div>
            <div className="px-[16px] pb-[20px] flex flex-col items-center">
              <DocumentEmptyStateIcon />
              <button className="mt-[12px] h-[36px] px-[14px] flex items-center gap-[6px] border border-[#E2E8F0] rounded-[6px] text-[13px] font-medium text-[#334155] bg-white hover:bg-[#F8FAFC] transition-colors">
                <IconPlus size={14} stroke={2} />
                Add Job / Quote
              </button>
            </div>
          </div>

          {/* Attachments Section */}
          <div>
            <div className="h-[49px] px-[16px] flex items-center gap-[10px]">
              <IconPaperclip size={18} className="text-[#64748B]" stroke={1.5} />
              <span className="text-[14px] font-semibold text-[#1E293B]">Attachments</span>
            </div>
            <div className="px-[16px] pb-[20px] flex flex-col items-center">
              <DocumentEmptyStateIcon />
              <button className="mt-[12px] h-[36px] px-[14px] flex items-center gap-[6px] border border-[#E2E8F0] rounded-[6px] text-[13px] font-medium text-[#334155] bg-white hover:bg-[#F8FAFC] transition-colors">
                <IconPlus size={14} stroke={2} />
                Add Attachment
              </button>
              <p className="mt-[12px] text-[12px] text-[#64748B] text-center px-[8px]">
                Add any relevant files and attachments to this Material Request
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewMaterialRequestPage;
