import React, { useState, useRef, useEffect } from 'react';
import { 
  IconChevronDown, 
  IconChevronUp, 
  IconPlus, 
  IconDeviceFloppy,
  IconSend,
  IconSettings,
  IconBold,
  IconItalic,
  IconList,
  IconListNumbers,
  IconClearFormatting,
  IconTable,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconHighlight,
  IconChevronRight,
  IconChevronLeft,
  IconSearch,
  IconX,
  IconPackage,
  IconCheck,
} from '@tabler/icons-react';

// Searchable User Dropdown Component
const SearchableUserDropdown = ({ users, value, onChange, onClear, placeholder = "Select a user" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (user) => {
    onChange(user);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] cursor-pointer flex items-center justify-between gap-[8px] hover:border-[#CBD5E1] transition-colors bg-white text-left"
      >
        {value ? (
          <div className="flex items-center gap-[8px] flex-1 min-w-0">
            <img 
              src={value.avatar} 
              alt={value.name}
              className="w-[24px] h-[24px] rounded-full object-cover flex-shrink-0"
            />
            <span className="text-[13px] text-[#334155] truncate">{value.name}</span>
            <button 
              onClick={(e) => { e.stopPropagation(); onClear(); }}
              className="ml-auto text-[#94A3B8] hover:text-[#64748B] flex-shrink-0"
            >
              <IconX size={14} />
            </button>
          </div>
        ) : (
          <span className="text-[13px] text-[#94A3B8]">{placeholder}</span>
        )}
        <IconChevronDown 
          size={14} 
          stroke={2} 
          className={`text-[#64748B] flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 w-full bg-white border border-[#E2E8F0] rounded-[6px] shadow-lg z-50 overflow-hidden">
          {/* Search Input */}
          <div className="p-[8px] border-b border-[#E2E8F0]">
            <div className="relative">
              <IconSearch size={14} className="absolute left-[10px] top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[32px] pl-[32px] pr-[10px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6]"
              />
            </div>
          </div>

          {/* Users List */}
          <div className="max-h-[240px] overflow-y-auto">
            {filteredUsers.length === 0 ? (
              <div className="px-[12px] py-[16px] text-[13px] text-[#94A3B8] text-center">
                No users found
              </div>
            ) : (
              filteredUsers.map(user => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleSelect(user)}
                  className={`w-full px-[12px] py-[10px] flex items-center gap-[10px] hover:bg-[#F1F5F9] transition-colors text-left ${
                    value?.id === user.id ? 'bg-[#F8FAFC]' : ''
                  }`}
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-[32px] h-[32px] rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-[#1E293B] truncate">{user.name}</div>
                    <div className="text-[12px] text-[#64748B]">{user.team}</div>
                  </div>
                  {value?.id === user.id && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" className="flex-shrink-0">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Empty state illustrations
const PartsEmptyIcon = () => (
  <svg width="147" height="112" viewBox="0 0 147 112" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="73.5" cy="56" r="50" fill="#F1F5F9"/>
    <rect x="43" y="36" width="60" height="45" rx="4" fill="white" stroke="#CBD5E1" strokeWidth="2"/>
    <rect x="50" y="48" width="30" height="4" rx="2" fill="#CBD5E1"/>
    <rect x="50" y="58" width="40" height="4" rx="2" fill="#E2E8F0"/>
    <rect x="50" y="68" width="25" height="4" rx="2" fill="#E2E8F0"/>
    <circle cx="103" cy="76" r="18" fill="#E44A19" fillOpacity="0.1"/>
    <path d="M103 68V84M95 76H111" stroke="#E44A19" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Line Items Data for Quote
const QUOTE_LINE_ITEMS_DATA = [
  {
    id: 1,
    itemId: '#MQ67DFR1',
    name: 'LG Refrigeration Compressors',
    availableQty: 56,
    unit: 'Mtrs',
    minQty: 1,
    category: 'Labor',
    productType: 'Product',
    location: 'Redmond Warehouse (52)',
    unitCost: '7550',
    markup: '',
    unitSellingPrice: '7500',
    hasOptions: true,
    options: [
      { id: 'opt-1', name: 'Model A - Standard', color: '#3B82F6' },
      { id: 'opt-2', name: 'Model B - Premium', color: '#22C55E' },
      { id: 'opt-3', name: 'Model C - Industrial', color: '#F59E0B' },
      { id: 'opt-4', name: 'Model D - Heavy Duty', color: '#EF4444' },
    ],
  },
  {
    id: 2,
    itemId: '#ABC123',
    name: 'HK Vision RE120',
    availableQty: 98,
    unit: 'Units',
    minQty: null,
    category: 'Labor',
    productType: 'Product',
    location: null,
    unitCost: '150',
    markup: '',
    unitSellingPrice: '300',
    hasOptions: false,
    options: [],
  },
  {
    id: 3,
    itemId: '#ABC124',
    name: 'Pipe V Connector',
    availableQty: -2,
    unit: 'Units',
    minQty: 1,
    category: 'Tools',
    productType: 'Product',
    location: 'Redmond Warehouse (-2)',
    unitCost: '1080',
    markup: '',
    unitSellingPrice: '450',
    hasOptions: true,
    options: [
      { id: 'opt-1', name: 'Brass', color: '#D4A574' },
      { id: 'opt-2', name: 'Chrome', color: '#C0C0C0' },
      { id: 'opt-3', name: 'PVC White', color: '#F8FAFC' },
      { id: 'opt-4', name: 'Copper', color: '#B87333' },
    ],
  },
  {
    id: 4,
    itemId: '#3653',
    name: 'Plumbing',
    availableQty: 1,
    unit: 'Units',
    minQty: null,
    category: 'Fmcg',
    productType: 'Service',
    location: null,
    unitCost: '',
    markup: '',
    unitSellingPrice: '135',
    hasOptions: false,
    options: [],
  },
  {
    id: 5,
    itemId: '#12344',
    name: '12W Battery edited',
    availableQty: 98,
    unit: 'Units',
    minQty: 6,
    category: 'Labor',
    productType: 'Part',
    location: 'Redmond Warehouse (40)',
    unitCost: '66',
    markup: '',
    unitSellingPrice: '123',
    hasOptions: true,
    options: [
      { id: 'opt-1', name: '12V Standard', color: '#1F2937' },
      { id: 'opt-2', name: '12V Deep Cycle', color: '#166534' },
      { id: 'opt-3', name: '12V AGM', color: '#7C3AED' },
    ],
  },
];

// Option Selector for Quote Line Item Picker
function QuotePickerOptionSelector({ options, selectedOption, onChange }) {
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
          <div className="absolute top-full left-0 mt-1 w-[200px] bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-50 py-1 max-h-[240px] overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-[10px] px-[12px] py-[8px] hover:bg-[#F8FAFC] transition-colors text-left ${
                  selectedOption?.id === option.id ? 'bg-[#EFF6FF]' : ''
                }`}
              >
                <div 
                  className="w-[20px] h-[20px] rounded-[4px] border border-[#E2E8F0] flex-shrink-0"
                  style={{ backgroundColor: option.color }}
                />
                <span className="text-[13px] text-[#334155] flex-1">{option.name}</span>
                {selectedOption?.id === option.id && (
                  <IconCheck size={14} stroke={2} className="text-[#2563EB] flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Choose Line Item Modal Component for Quote
function ChooseLineItemModal({ isOpen, onClose, onAddProduct }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState({});
  const [itemValues, setItemValues] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const totalPages = 20;

  const handleCheckboxChange = (itemId) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleOptionChange = (itemId, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [itemId]: option
    }));
  };

  const handleValueChange = (itemId, field, value) => {
    setItemValues(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value
      }
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

          {/* Category Dropdown */}
          <div className="w-[140px] h-[40px] flex items-center justify-between px-[12px] border border-[#E2E8F0] rounded-[6px] bg-white cursor-pointer hover:bg-[#F8FAFC]">
            <span className="text-[14px] text-[#94A3B8]">Category</span>
            <IconChevronDown size={16} stroke={1.5} className="text-[#94A3B8]" />
          </div>

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
                <th className="text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">Item</th>
                <th className="w-[160px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">Option</th>
                <th className="w-[80px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">Category</th>
                <th className="w-[70px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">Type</th>
                <th className="w-[180px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">Location</th>
                <th className="w-[100px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider leading-tight bg-white">
                  <div>Unit Purchase</div>
                  <div>Price/Unit Cost (in USD)</div>
                </th>
                <th className="w-[80px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">Markup</th>
                <th className="w-[100px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider leading-tight bg-white">
                  <div>Unit Selling Price</div>
                  <div>(in USD) <span className="text-[#EF4444]">*</span></div>
                </th>
                <th className="w-[80px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">
                  Quantity <span className="text-[#EF4444]">*</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {QUOTE_LINE_ITEMS_DATA.map((item) => (
                <tr key={item.id} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC]">
                  {/* Checkbox */}
                  <td className="px-[16px] py-[16px]">
                    <input
                      type="checkbox"
                      checked={selectedItems[item.id] || false}
                      onChange={() => handleCheckboxChange(item.id)}
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
                          Available Qty: {item.availableQty} {item.unit}
                        </div>
                        {item.minQty && (
                          <div className="text-[12px] text-[#64748B]">
                            Minimum Qty: {item.minQty}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  {/* Option Selector */}
                  <td className="px-[12px] py-[16px]">
                    {item.hasOptions ? (
                      <QuotePickerOptionSelector
                        options={item.options}
                        selectedOption={selectedOptions[item.id]}
                        onChange={(option) => handleOptionChange(item.id, option)}
                      />
                    ) : (
                      <span className="text-[13px] text-[#94A3B8]">—</span>
                    )}
                  </td>
                  {/* Category */}
                  <td className="px-[12px] py-[16px] text-[13px] text-[#64748B]">{item.category}</td>
                  {/* Type */}
                  <td className="px-[12px] py-[16px] text-[13px] text-[#64748B]">{item.productType}</td>
                  {/* Location */}
                  <td className="px-[12px] py-[16px]">
                    {item.location ? (
                      <div className="relative">
                        <select 
                          className="w-full h-[36px] px-[10px] pr-[28px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6] appearance-none bg-white"
                          defaultValue={item.location}
                        >
                          <option>{item.location}</option>
                        </select>
                        <IconChevronDown size={14} className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                      </div>
                    ) : (
                      <span className="text-[13px] text-[#EF4444]">No Location Found!!</span>
                    )}
                  </td>
                  {/* Unit Cost */}
                  <td className="px-[12px] py-[16px]">
                    <input
                      type="text"
                      defaultValue={item.unitCost}
                      placeholder="Eg: 20"
                      className="w-[80px] h-[36px] px-[10px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6] bg-white"
                    />
                  </td>
                  {/* Markup */}
                  <td className="px-[12px] py-[16px]">
                    <div className="flex items-center gap-[4px]">
                      <input
                        type="text"
                        defaultValue={item.markup}
                        placeholder="Eg: 10"
                        className="w-[50px] h-[36px] px-[8px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6] bg-white"
                      />
                      <span className="text-[13px] text-[#64748B]">%</span>
                    </div>
                  </td>
                  {/* Unit Selling Price */}
                  <td className="px-[12px] py-[16px]">
                    <input
                      type="text"
                      defaultValue={item.unitSellingPrice}
                      className="w-[80px] h-[36px] px-[10px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6] bg-white"
                    />
                  </td>
                  {/* Quantity */}
                  <td className="px-[12px] py-[16px]">
                    <input
                      type="text"
                      placeholder="Eg: 20"
                      className="w-[70px] h-[36px] px-[8px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6] bg-white"
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

const AttachmentEmptyIcon = () => (
  <svg width="119" height="112" viewBox="0 0 119 112" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="59.5" cy="56" r="50" fill="#F1F5F9"/>
    <rect x="34" y="26" width="50" height="65" rx="4" fill="white" stroke="#CBD5E1" strokeWidth="2"/>
    <rect x="42" y="40" width="25" height="3" rx="1.5" fill="#CBD5E1"/>
    <rect x="42" y="48" width="35" height="3" rx="1.5" fill="#E2E8F0"/>
    <rect x="42" y="56" width="20" height="3" rx="1.5" fill="#E2E8F0"/>
    <rect x="42" y="68" width="30" height="3" rx="1.5" fill="#E2E8F0"/>
    <rect x="42" y="76" width="25" height="3" rx="1.5" fill="#E2E8F0"/>
    <circle cx="84" cy="81" r="15" fill="#E2E8F0"/>
    <path d="M84 74V88M77 81H91" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

function NewQuotePage({ onBack, onSaveAndSend }) {
  const [isAddressExpanded, setIsAddressExpanded] = useState(false);
  const [isQuoteDetailsExpanded, setIsQuoteDetailsExpanded] = useState(true);
  const [isOtherDetailsExpanded, setIsOtherDetailsExpanded] = useState(true);
  const [isTestExpanded, setIsTestExpanded] = useState(true);
  const [isLineItemPickerOpen, setIsLineItemPickerOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    prefix: '10000',
    quoteTitle: '',
    referenceNumber: '',
    quoteDate: '01/27/2026',
    expiryDate: '01/28/2026',
    quoteTemplate: 'Estimate - 1',
    tradeType: '',
    assignTo: null,
    tags: '',
    description: '',
  });

  // Sample users for assignment (single select)
  
  const availableUsers = [
    { id: 1, name: 'Marcus Chen', initials: 'MC', team: 'Seattle', avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: 2, name: 'Olivia Rodriguez', initials: 'OR', team: 'Seattle', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 3, name: 'Ethan Nakamura', initials: 'EN', team: 'Seattle', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: 4, name: 'Sophia Patel', initials: 'SP', team: 'Seattle', avatar: 'https://i.pravatar.cc/150?img=9' },
    { id: 5, name: 'Liam O\'Connor', initials: 'LO', team: 'Seattle', avatar: 'https://i.pravatar.cc/150?img=8' },
    { id: 6, name: 'Emma Thompson', initials: 'ET', team: 'Seattle', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 7, name: 'Noah Williams', initials: 'NW', team: 'Seattle', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 8, name: 'Ava Martinez', initials: 'AM', team: 'Seattle', avatar: 'https://i.pravatar.cc/150?img=10' },
    { id: 9, name: 'Jackson Lee', initials: 'JL', team: 'Seattle', avatar: 'https://i.pravatar.cc/150?img=7' },
    { id: 10, name: 'Isabella Kim', initials: 'IK', team: 'Seattle', avatar: 'https://i.pravatar.cc/150?img=4' },
  ];

  const selectUser = (user) => {
    setFormData({
      ...formData,
      assignTo: user
    });
  };

  const clearAssignee = () => {
    setFormData({
      ...formData,
      assignTo: null
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Breadcrumb Header */}
      <div className="h-[49px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-[21px]">
        <div className="flex items-center gap-[14px]">
          <button 
            onClick={onBack}
            className="text-[14px] text-[#64748B] hover:text-[#334155] transition-colors"
          >
            Quotes
          </button>
          <IconChevronRight size={16} stroke={1.5} className="text-[#94A3B8]" />
          <span className="text-[14px] font-medium text-[#1E293B]">New Quote</span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-[10px]">
          <button className="h-[32px] px-[15px] flex items-center gap-[7px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] hover:bg-[#F8FAFC] transition-colors">
            <IconDeviceFloppy size={16} stroke={1.5} />
            <span>Save as Draft</span>
          </button>
          <div className="flex">
            <button 
              onClick={onSaveAndSend}
              className="h-[32px] px-[14px] flex items-center gap-[7px] bg-[#E44A19] text-white rounded-l-[4px] text-[13px] font-medium hover:bg-[#D43D0F] transition-colors"
            >
              <IconSend size={13} stroke={2} />
              <span>Save & Send</span>
            </button>
            <button className="h-[32px] w-[28px] flex items-center justify-center bg-[#E44A19] text-white rounded-r-[4px] border-l border-[#D43D0F] hover:bg-[#D43D0F] transition-colors">
              <IconChevronDown size={13} stroke={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1003px] py-[14px] px-[14px]">
          {/* Customer Information Section */}
          <div className="bg-white rounded-[4px] border border-[#E2E8F0] mb-[14px]">
            <div className="h-[42px] flex items-center px-[21px] border-b border-[#E2E8F0]">
              <h3 className="text-[14px] font-semibold text-[#1E293B]">Customer Information</h3>
            </div>
            <div className="p-[21px] grid grid-cols-3 gap-[21px]">
              <div>
                <label className="block text-[13px] text-[#64748B] mb-[8px]">Choose Organization</label>
                <input
                  type="text"
                  placeholder="Choose Organization"
                  className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#94A3B8] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6]"
                />
              </div>
              <div>
                <label className="block text-[13px] text-[#64748B] mb-[8px]">Choose Customer</label>
                <input
                  type="text"
                  placeholder="Click to Choose Customer"
                  className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#94A3B8] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6]"
                />
              </div>
              <div>
                <label className="block text-[13px] text-[#64748B] mb-[8px]">Choose Property</label>
                <input
                  type="text"
                  placeholder="Choose Property"
                  className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#94A3B8] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6]"
                />
              </div>
            </div>
          </div>

          {/* Association(s) Section */}
          <div className="bg-white rounded-[4px] border border-[#E2E8F0] mb-[14px]">
            <div className="h-[42px] flex items-center px-[21px] border-b border-[#E2E8F0]">
              <h3 className="text-[14px] font-semibold text-[#1E293B]">Association(s)</h3>
            </div>
            <div className="p-[21px]">
              <button className="h-[28px] px-[9px] flex items-center gap-[4px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#64748B] hover:bg-[#F8FAFC] transition-colors">
                <IconPlus size={14} stroke={2} />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Address Section (Collapsible) */}
          <div className="bg-white rounded-[4px] border border-[#E2E8F0] mb-[14px]">
            <button
              onClick={() => setIsAddressExpanded(!isAddressExpanded)}
              className="w-full h-[42px] flex items-center justify-between px-[21px]"
            >
              <h3 className="text-[14px] font-semibold text-[#1E293B]">Address</h3>
              {isAddressExpanded ? (
                <IconChevronUp size={16} stroke={2} className="text-[#64748B]" />
              ) : (
                <IconChevronDown size={16} stroke={2} className="text-[#64748B]" />
              )}
            </button>
            {isAddressExpanded && (
              <div className="p-[21px] border-t border-[#E2E8F0]">
                {/* Address fields would go here */}
                <p className="text-[13px] text-[#94A3B8]">Address fields...</p>
              </div>
            )}
          </div>

          {/* Quote Details Section (Collapsible) */}
          <div className="bg-white rounded-[4px] border border-[#E2E8F0] mb-[14px]">
            <button
              onClick={() => setIsQuoteDetailsExpanded(!isQuoteDetailsExpanded)}
              className="w-full h-[42px] flex items-center justify-between px-[21px]"
            >
              <h3 className="text-[14px] font-semibold text-[#1E293B]">Quote Details</h3>
              {isQuoteDetailsExpanded ? (
                <IconChevronUp size={16} stroke={2} className="text-[#64748B]" />
              ) : (
                <IconChevronDown size={16} stroke={2} className="text-[#64748B]" />
              )}
            </button>
            {isQuoteDetailsExpanded && (
              <div className="p-[21px] border-t border-[#E2E8F0]">
                {/* Row 1 */}
                <div className="grid grid-cols-3 gap-[21px] mb-[21px]">
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Prefix</label>
                    <input
                      type="text"
                      value={formData.prefix}
                      onChange={(e) => setFormData({...formData, prefix: e.target.value})}
                      className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Quote Title</label>
                    <input
                      type="text"
                      placeholder="Enter Quote Title"
                      value={formData.quoteTitle}
                      onChange={(e) => setFormData({...formData, quoteTitle: e.target.value})}
                      className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Reference Number</label>
                    <input
                      type="text"
                      placeholder="Enter Reference Number"
                      value={formData.referenceNumber}
                      onChange={(e) => setFormData({...formData, referenceNumber: e.target.value})}
                      className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6]"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-3 gap-[21px] mb-[21px]">
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">
                      Quote Date <span className="text-[#EF4444]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.quoteDate}
                      onChange={(e) => setFormData({...formData, quoteDate: e.target.value})}
                      className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">
                      Expiry Date <span className="text-[#EF4444]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                      className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">
                      Quote Template <span className="text-[#EF4444]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.quoteTemplate}
                        onChange={(e) => setFormData({...formData, quoteTemplate: e.target.value})}
                        className="w-full h-[38px] px-[12px] pr-[32px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6] appearance-none bg-white"
                      >
                        <option value="Estimate - 1">Estimate - 1</option>
                        <option value="Estimate - 2">Estimate - 2</option>
                        <option value="Quote - 1">Quote - 1</option>
                      </select>
                      <IconChevronDown size={14} stroke={2} className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Trade Type & Assign To Row */}
                <div className="grid grid-cols-2 gap-[21px] mb-[21px]">
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Trade Type</label>
                    <div className="relative">
                      <select
                        value={formData.tradeType}
                        onChange={(e) => setFormData({...formData, tradeType: e.target.value})}
                        className="w-full h-[38px] px-[12px] pr-[32px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#94A3B8] outline-none focus:border-[#3B82F6] appearance-none bg-white"
                      >
                        <option value="">Choose Trade Type</option>
                        <option value="Roofing">Roofing</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Electrical">Electrical</option>
                      </select>
                      <IconChevronDown size={14} stroke={2} className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                    </div>
                  </div>
                  
                  {/* Quote Sold By */}
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">
                      Quote Sold By
                    </label>
                    <SearchableUserDropdown
                      users={availableUsers}
                      value={formData.assignTo}
                      onChange={selectUser}
                      onClear={clearAssignee}
                      placeholder="Select a user"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-[21px]">
                  <label className="block text-[13px] text-[#64748B] mb-[8px]">Tags</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter Tags"
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                      className="w-full h-[38px] px-[12px] pr-[32px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6]"
                    />
                    <IconChevronDown size={14} stroke={2} className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[13px] text-[#64748B] mb-[8px]">Description</label>
                  <div className="border border-[#E2E8F0] rounded-[4px] overflow-hidden">
                    <div className="h-[158px] p-[12px]">
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full h-full resize-none outline-none text-[13px] text-[#334155] placeholder-[#94A3B8]"
                        placeholder=""
                      />
                    </div>
                    {/* Rich Text Toolbar */}
                    <div className="h-[48px] border-t border-[#E2E8F0] flex items-center px-[7px] bg-white">
                      <div className="flex items-center">
                        <button className="w-[34px] h-[28px] flex items-center justify-center hover:bg-[#F1F5F9] rounded transition-colors">
                          <IconArrowBackUp size={18} stroke={1.5} className="text-[#64748B]" />
                        </button>
                        <button className="w-[34px] h-[28px] flex items-center justify-center hover:bg-[#F1F5F9] rounded transition-colors">
                          <IconArrowForwardUp size={18} stroke={1.5} className="text-[#64748B]" />
                        </button>
                      </div>
                      <div className="w-[1px] h-[20px] bg-[#E2E8F0] mx-[7px]" />
                      <div className="flex items-center">
                        <button className="w-[34px] h-[28px] flex items-center justify-center hover:bg-[#F1F5F9] rounded transition-colors">
                          <IconBold size={18} stroke={1.5} className="text-[#64748B]" />
                        </button>
                        <button className="w-[34px] h-[28px] flex items-center justify-center hover:bg-[#F1F5F9] rounded transition-colors">
                          <IconItalic size={18} stroke={1.5} className="text-[#64748B]" />
                        </button>
                        <button className="w-[50px] h-[28px] flex items-center justify-center hover:bg-[#F1F5F9] rounded transition-colors">
                          <IconHighlight size={18} stroke={1.5} className="text-[#64748B]" />
                          <IconChevronDown size={10} stroke={2} className="text-[#64748B] ml-[2px]" />
                        </button>
                        <button className="w-[34px] h-[28px] flex items-center justify-center hover:bg-[#F1F5F9] rounded transition-colors">
                          <IconList size={18} stroke={1.5} className="text-[#64748B]" />
                        </button>
                        <button className="w-[34px] h-[28px] flex items-center justify-center hover:bg-[#F1F5F9] rounded transition-colors">
                          <IconListNumbers size={18} stroke={1.5} className="text-[#64748B]" />
                        </button>
                      </div>
                      <div className="w-[1px] h-[20px] bg-[#E2E8F0] mx-[7px]" />
                      <div className="flex items-center">
                        <button className="w-[34px] h-[28px] flex items-center justify-center hover:bg-[#F1F5F9] rounded transition-colors">
                          <IconClearFormatting size={18} stroke={1.5} className="text-[#64748B]" />
                        </button>
                        <button className="h-[28px] px-[8px] flex items-center gap-[4px] hover:bg-[#F1F5F9] rounded transition-colors">
                          <span className="text-[12px] text-[#64748B]">Paragraph</span>
                          <IconChevronDown size={10} stroke={2} className="text-[#64748B]" />
                        </button>
                        <button className="w-[48px] h-[28px] flex items-center justify-center hover:bg-[#F1F5F9] rounded transition-colors">
                          <IconTable size={18} stroke={1.5} className="text-[#64748B]" />
                          <IconChevronDown size={10} stroke={2} className="text-[#64748B] ml-[2px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Parts & Services Section */}
          <div className="bg-white rounded-[4px] border border-[#E2E8F0] mb-[14px]">
            <div className="h-[46px] flex items-center justify-between px-[21px] border-b border-[#E2E8F0]">
              <div className="flex items-center gap-[14px]">
                <h3 className="text-[14px] font-semibold text-[#1E293B]">Parts & Services</h3>
                <span className="w-[28px] h-[26px] flex items-center justify-center bg-[#F1F5F9] rounded-full text-[12px] font-medium text-[#64748B]">0</span>
              </div>
              <div className="flex items-center gap-[10px]">
                <div className="relative">
                  <select className="h-[32px] px-[10px] pr-[32px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#94A3B8] outline-none focus:border-[#3B82F6] appearance-none bg-white">
                    <option value="">Select Pricelist</option>
                  </select>
                  <IconChevronDown size={14} stroke={2} className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                </div>
                <button className="w-[29px] h-[32px] flex items-center justify-center border border-[#E2E8F0] rounded-[4px] hover:bg-[#F8FAFC] transition-colors">
                  <IconSettings size={14} stroke={1.5} className="text-[#64748B]" />
                </button>
                <button 
                  onClick={() => setIsLineItemPickerOpen(true)}
                  className="h-[32px] px-[15px] flex items-center gap-[7px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#64748B] hover:bg-[#F8FAFC] transition-colors"
                >
                  <IconPlus size={14} stroke={2} />
                  <span>Add</span>
                </button>
              </div>
            </div>
            {/* Empty State */}
            <div className="py-[21px] flex flex-col items-center">
              <PartsEmptyIcon />
              <h4 className="mt-[21px] text-[16px] font-semibold text-[#1E293B]">Add Parts / Services</h4>
              <p className="mt-[4px] text-[13px] text-[#64748B]">Add any parts or services or any custom line item to this Quote</p>
            </div>
          </div>

          {/* Other Details Section */}
          <div className="bg-white rounded-[4px] border border-[#E2E8F0] mb-[14px]">
            <button
              onClick={() => setIsOtherDetailsExpanded(!isOtherDetailsExpanded)}
              className="w-full h-[49px] flex items-center px-[24px]"
            >
              <h3 className="text-[14px] font-semibold text-[#1E293B]">Other Details</h3>
            </button>
            {isOtherDetailsExpanded && (
              <div className="px-[24px] pb-[24px]">
                {/* Row 1 */}
                <div className="grid grid-cols-3 gap-[21px] mb-[21px]">
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Extra Amount</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for None</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for Number</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                </div>
                {/* Row 2 */}
                <div className="grid grid-cols-3 gap-[21px] mb-[21px]">
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for Mail</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for Phone No</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for Address</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                </div>
                {/* Row 3 */}
                <div className="grid grid-cols-3 gap-[21px]">
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for Regex</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Time - 30</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Date & Time - 45</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Test Section */}
          <div className="bg-white rounded-[4px] border border-[#E2E8F0] mb-[14px]">
            <button
              onClick={() => setIsTestExpanded(!isTestExpanded)}
              className="w-full h-[49px] flex items-center px-[24px]"
            >
              <h3 className="text-[14px] font-semibold text-[#1E293B]">Test</h3>
            </button>
            {isTestExpanded && (
              <div className="px-[24px] pb-[24px]">
                {/* Row 1 */}
                <div className="grid grid-cols-3 gap-[21px] mb-[21px]">
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Multi Selection</label>
                    <div className="flex flex-col gap-[10px]">
                      <label className="flex items-center gap-[7px] cursor-pointer">
                        <input type="checkbox" className="w-[14px] h-[14px] border-[#CBD5E1] rounded text-[#E44A19] focus:ring-[#E44A19]" />
                        <span className="text-[13px] text-[#334155]">option 1, 11</span>
                      </label>
                      <label className="flex items-center gap-[7px] cursor-pointer">
                        <input type="checkbox" className="w-[14px] h-[14px] border-[#CBD5E1] rounded text-[#E44A19] focus:ring-[#E44A19]" />
                        <span className="text-[13px] text-[#334155]">option 2, 22</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for None</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for Number</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                </div>
                {/* Row 2 */}
                <div className="grid grid-cols-3 gap-[21px] mb-[21px]">
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for Mail</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for Phone No</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for Address</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                </div>
                {/* Row 3 */}
                <div className="grid grid-cols-3 gap-[21px]">
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for Regex</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Time - 60</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Date & Time - 5</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Attachments Section */}
          <div className="bg-white rounded-[4px] border border-[#E2E8F0]">
            <div className="h-[46px] flex items-center justify-between px-[21px] border-b border-[#E2E8F0]">
              <h3 className="text-[14px] font-semibold text-[#1E293B]">Attachments</h3>
              <button className="h-[32px] px-[15px] flex items-center gap-[7px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#64748B] hover:bg-[#F8FAFC] transition-colors">
                <IconPlus size={14} stroke={2} />
                <span>Add Attachments</span>
              </button>
            </div>
            {/* Empty State */}
            <div className="py-[21px] flex flex-col items-center">
              <AttachmentEmptyIcon />
              <h4 className="mt-[21px] text-[16px] font-semibold text-[#1E293B]">Add Attachments</h4>
              <p className="mt-[4px] text-[13px] text-[#64748B]">Add any relevant files and attachments to this Quote</p>
            </div>
          </div>
        </div>
      </div>

      {/* Choose Line Item Modal */}
      <ChooseLineItemModal
        isOpen={isLineItemPickerOpen}
        onClose={() => setIsLineItemPickerOpen(false)}
        onAddProduct={() => {
          console.log('Adding products to quote...');
        }}
      />
    </div>
  );
}

export default NewQuotePage;
