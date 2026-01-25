import React, { useState, useMemo } from 'react';
import {
  IconSearch,
  IconChevronDown,
  IconFilter,
  IconLayoutColumns,
  IconDots,
  IconDownload,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconPlus,
  IconApps,
  IconArrowUp,
  IconArrowDown,
  IconChevronRight as IconBreadcrumb,
  IconX,
  IconCirclePlus,
  IconCheck,
} from '@tabler/icons-react';

// Sample data with sub-category support - Roofing Products & Services
const sampleProducts = [
  // Shingles - Main roofing products
  { id: 1, name: 'GAF Timberline HDZ Shingles', partNo: 'SHG001', createdOn: '09/02/2025 02:44 AM', type: 'PARTS', category: 'Shingles', subCategory: 'Asphalt Shingles', brand: 'GAF', specification: 'Lifetime Warranty', quantity: '25 Bundle(s)', unitPrice: '$42.99', createdBy: 'Eric Taylor' },
  { id: 2, name: 'Owens Corning Duration Shingles', partNo: 'SHG002', createdOn: '09/02/2025 02:44 AM', type: 'PARTS', category: 'Shingles', subCategory: 'Asphalt Shingles', brand: 'Owens Corning', specification: 'SureNail Technology', quantity: '18 Bundle(s)', unitPrice: '$45.99', createdBy: 'Eric Taylor' },
  { id: 3, name: 'CertainTeed Landmark Pro', partNo: 'SHG003', createdOn: '09/02/2025 02:44 AM', type: 'PARTS', category: 'Shingles', subCategory: 'Asphalt Shingles', brand: 'CertainTeed', specification: 'Max Def Colors', quantity: '12 Bundle(s)', unitPrice: '$48.50', createdBy: 'Eric Taylor' },
  { id: 4, name: 'Standing Seam Metal Panel 16"', partNo: 'MTL001', createdOn: '09/02/2025 02:45 AM', type: 'PARTS', category: 'Shingles', subCategory: 'Metal Shingles', brand: 'Fabral', specification: '26 Gauge Steel', quantity: '0 Panel(s)', unitPrice: '$125.00', createdBy: 'Eric Taylor' },
  { id: 5, name: 'GAF FeltBuster Underlayment', partNo: 'UND001', createdOn: '09/02/2025 02:45 AM', type: 'PARTS', category: 'Shingles', subCategory: 'Underlayments', brand: 'GAF', specification: '4 sq per roll', quantity: '15 Roll(s)', unitPrice: '$89.99', createdBy: 'Eric Taylor' },
  { id: 6, name: 'Ice & Water Shield', partNo: 'UND002', createdOn: '09/02/2025 02:45 AM', type: 'PARTS', category: 'Shingles', subCategory: 'Underlayments', brand: 'Grace', specification: '2 sq per roll', quantity: '8 Roll(s)', unitPrice: '$145.00', createdBy: 'Eric Taylor' },
  // Fasteners
  { id: 7, name: '1-1/4" Coil Roofing Nails', partNo: 'NL001', createdOn: '09/02/2025 02:45 AM', type: 'PARTS', category: 'Fasteners', subCategory: 'Nails', brand: 'Grip-Rite', specification: 'Electro-Galvanized', quantity: '30 Box(es)', unitPrice: '$45.00', createdBy: 'Eric Taylor' },
  { id: 8, name: '7/16" Crown Staples 1-1/2"', partNo: 'ST001', createdOn: '09/02/2025 02:45 AM', type: 'PARTS', category: 'Fasteners', subCategory: 'Staples', brand: 'Bostitch', specification: 'Galvanized', quantity: '20 Box(es)', unitPrice: '$38.50', createdBy: 'Eric Taylor' },
  { id: 9, name: 'Geocel Tripolymer Sealant', partNo: 'SL001', createdOn: '09/02/2025 02:45 AM', type: 'PARTS', category: 'Fasteners', subCategory: 'Sealants & Adhesives', brand: 'Geocel', specification: 'Clear, 10.3 oz', quantity: '48 Tube(s)', unitPrice: '$8.99', createdBy: 'Eric Taylor' },
  { id: 10, name: 'Black Jack Roof Cement', partNo: 'SL002', createdOn: '09/02/2025 02:45 AM', type: 'PARTS', category: 'Fasteners', subCategory: 'Sealants & Adhesives', brand: 'Black Jack', specification: '10.1 oz tube', quantity: '24 Tube(s)', unitPrice: '$4.49', createdBy: 'Eric Taylor' },
  // Ventilation
  { id: 11, name: 'Ridge Vent 4ft Section', partNo: 'VNT001', createdOn: '09/02/2025 02:45 AM', type: 'PARTS', category: 'Ventilation', subCategory: null, brand: 'Air Vent', specification: 'Shingle-Over', quantity: '50 Each', unitPrice: '$18.75', createdBy: 'Eric Taylor' },
  { id: 12, name: 'Turbine Vent 12"', partNo: 'VNT002', createdOn: '09/02/2025 02:45 AM', type: 'PARTS', category: 'Ventilation', subCategory: null, brand: 'Lomanco', specification: 'Galvanized', quantity: '12 Each', unitPrice: '$42.00', createdBy: 'Eric Taylor' },
  // Labor - Services
  { id: 13, name: 'Roof Installation Labor', partNo: 'LBR001', createdOn: '09/02/2025 02:45 AM', type: 'SERVICE', category: 'Labor', subCategory: 'Installation', brand: '', specification: 'Per Square', quantity: '1 Square(s)', unitPrice: '$75.00', createdBy: 'Eric Taylor' },
  { id: 14, name: 'Tear-Off & Disposal', partNo: 'LBR002', createdOn: '09/02/2025 02:45 AM', type: 'SERVICE', category: 'Labor', subCategory: 'Installation', brand: '', specification: 'Per Square', quantity: '1 Square(s)', unitPrice: '$45.00', createdBy: 'Eric Taylor' },
  { id: 15, name: 'Materials Delivery 0-15 mi.', partNo: 'DEL001', createdOn: '09/02/2025 02:45 AM', type: 'SERVICE', category: 'Labor', subCategory: 'Delivery Charges', brand: '', specification: '', quantity: '1 Trip', unitPrice: '$125.00', createdBy: 'Eric Taylor' },
  { id: 16, name: 'Roof Inspection Service', partNo: 'SRV001', createdOn: '09/02/2025 02:45 AM', type: 'SERVICE', category: 'Services', subCategory: null, brand: '', specification: 'Detailed Report', quantity: '1 Each', unitPrice: '$250.00', createdBy: 'Eric Taylor' },
  { id: 17, name: 'Emergency Leak Repair', partNo: 'SRV002', createdOn: '09/02/2025 02:45 AM', type: 'SERVICE', category: 'Services', subCategory: null, brand: '', specification: '24/7 Available', quantity: '1 Each', unitPrice: '$375.00', createdBy: 'Eric Taylor' },
  { id: 18, name: 'Gutter Cleaning Service', partNo: 'SRV003', createdOn: '09/02/2025 02:45 AM', type: 'SERVICE', category: 'Services', subCategory: null, brand: '', specification: 'Up to 200 LF', quantity: '1 Each', unitPrice: '$175.00', createdBy: 'Eric Taylor' },
];

// Filter type options
const FILTER_TYPES = [
  { value: 'category', label: 'Product Category' },
  { value: 'type', label: 'Type' },
  { value: 'brand', label: 'Brand' },
  { value: 'createdBy', label: 'Created By' },
];

// Condition options
const CONDITION_OPTIONS = [
  { value: 'contains', label: 'Contains' },
  { value: 'equals', label: 'Equals' },
  { value: 'notContains', label: 'Does not contain' },
  { value: 'notEquals', label: 'Does not equal' },
];

// Helper to get full category path for display and sorting
const getCategoryPath = (product) => {
  if (product.subCategory) {
    return `${product.category} > ${product.subCategory}`;
  }
  return product.category;
};

// Helper to render category cell - shows only subcategory name (or category if no subcategory)
const CategoryCell = ({ product }) => {
  // Show subcategory name if it exists, otherwise show the category name
  const displayName = product.subCategory || product.category;
  
  return (
    <span 
      className="text-[#1E293B] truncate block" 
      title={product.subCategory ? `${product.category} > ${product.subCategory}` : product.category}
    >
      {displayName}
    </span>
  );
};

// Hierarchical Category Selector Component - with checkbox pattern
function CategoryValueSelector({ 
  categoryOptions, 
  selectedValues, 
  onSelectValue,
  isOpen,
  onClose 
}) {
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

  if (!isOpen) return null;

  const categories = Array.from(categoryOptions.entries());

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-10 max-h-[320px] overflow-y-auto">
      {categories.map(([category, subCategories]) => {
        const hasSubCategories = subCategories.size > 0;
        const isExpanded = expandedCategories.has(category);
        const subCategoryArray = Array.from(subCategories);
        const isParentSelected = selectedValues.includes(category);

        return (
          <div key={category} className="border-b border-[#F1F5F9] last:border-b-0">
            {/* Parent Category Header with expand arrow and checkbox */}
            <div className="flex items-center h-10 px-3 hover:bg-[#F8FAFC] transition-colors">
              {/* Expand/Collapse Arrow */}
              {hasSubCategories ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCategory(category);
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
                onClick={() => !isParentSelected && onSelectValue(category)}
                disabled={isParentSelected}
                className={`w-4 h-4 mr-2.5 rounded border flex items-center justify-center flex-shrink-0 ${
                  isParentSelected 
                    ? 'bg-[#2563EB] border-[#2563EB] cursor-not-allowed' 
                    : 'border-[#CBD5E1] bg-white hover:border-[#94A3B8] cursor-pointer'
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
                className={`text-[13px] flex-1 ${isParentSelected ? 'text-[#1E293B] font-medium' : 'text-[#1E293B]'}`}
                onClick={() => !isParentSelected && onSelectValue(category)}
              >
                {category}
              </span>
            </div>

            {/* Sub-Categories (Expanded) - no "All" option */}
            {hasSubCategories && isExpanded && (
              <div className="bg-[#FAFBFC]">
                {subCategoryArray.map((sub) => {
                  const subValue = `${category} > ${sub}`;
                  const isSelected = selectedValues.includes(subValue);

                  return (
                    <div
                      key={sub}
                      className="flex items-center h-9 pl-11 pr-3 hover:bg-[#F1F5F9] transition-colors"
                    >
                      {/* Checkbox for subcategory */}
                      <button
                        type="button"
                        onClick={() => !isSelected && onSelectValue(subValue)}
                        disabled={isSelected}
                        className={`w-4 h-4 mr-2.5 rounded border flex items-center justify-center flex-shrink-0 ${
                          isSelected 
                            ? 'bg-[#2563EB] border-[#2563EB] cursor-not-allowed' 
                            : 'border-[#CBD5E1] bg-white hover:border-[#94A3B8] cursor-pointer'
                        }`}
                      >
                        {isSelected && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>
                      
                      <span 
                        className={`text-[13px] flex-1 cursor-pointer ${isSelected ? 'text-[#1E293B] font-medium' : 'text-[#64748B]'}`}
                        onClick={() => !isSelected && onSelectValue(subValue)}
                      >
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

      {/* No sub-categories message if all are flat */}
      {categories.every(([_, subs]) => subs.size === 0) && (
        <div className="px-4 py-3 text-[13px] text-[#94A3B8] text-center">
          No sub-categories available
        </div>
      )}
    </div>
  );
}

// Filter Panel Component
function FilterPanel({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange, 
  categoryOptions 
}) {
  const [pendingFilter, setPendingFilter] = useState({
    type: 'category',
    condition: 'contains',
    values: []
  });
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showConditionDropdown, setShowConditionDropdown] = useState(false);
  const [showValueDropdown, setShowValueDropdown] = useState(false);

  // Get available values based on filter type (for non-category types)
  const getAvailableValues = (filterType) => {
    if (filterType === 'type') {
      return [
        { value: 'SERVICE', label: 'SERVICE' },
        { value: 'PARTS', label: 'PARTS' },
      ];
    }
    if (filterType === 'brand') {
      const brands = [...new Set(sampleProducts.map(p => p.brand).filter(Boolean))];
      return brands.map(b => ({ value: b, label: b }));
    }
    if (filterType === 'createdBy') {
      const creators = [...new Set(sampleProducts.map(p => p.createdBy))];
      return creators.map(c => ({ value: c, label: c }));
    }
    return [];
  };

  const handleAddValue = (value) => {
    if (!pendingFilter.values.includes(value)) {
      setPendingFilter({
        ...pendingFilter,
        values: [...pendingFilter.values, value]
      });
    }
    setShowValueDropdown(false);
  };

  const handleRemoveValue = (value) => {
    setPendingFilter({
      ...pendingFilter,
      values: pendingFilter.values.filter(v => v !== value)
    });
  };

  const handleAddFilter = () => {
    if (pendingFilter.values.length > 0) {
      onFiltersChange([...filters, { ...pendingFilter, id: Date.now() }]);
      setPendingFilter({
        type: 'category',
        condition: 'contains',
        values: []
      });
    }
  };

  const handleRemoveFilter = (filterId) => {
    onFiltersChange(filters.filter(f => f.id !== filterId));
  };

  const handleRemoveFilterValue = (filterId, value) => {
    onFiltersChange(filters.map(f => {
      if (f.id === filterId) {
        const newValues = f.values.filter(v => v !== value);
        return { ...f, values: newValues };
      }
      return f;
    }).filter(f => f.values.length > 0));
  };

  const availableValues = getAvailableValues(pendingFilter.type);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/10 z-40"
        onClick={onClose}
      />
      
      {/* Filter Panel */}
      <div className="fixed top-0 right-0 h-full w-[340px] bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="h-[56px] px-5 flex items-center justify-between border-b border-[#E2E8F0]">
          <span className="text-[15px] font-semibold text-[#1E293B]">Parts & Services Filters</span>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-[#F1F5F9] rounded-md transition-colors"
          >
            <IconX size={20} className="text-[#64748B]" stroke={2} />
          </button>
        </div>

        {/* Filter Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Existing Filters */}
          {filters.map((filter) => (
            <div key={filter.id} className="mb-5 pb-5 border-b border-[#E2E8F0]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[13px] font-medium text-[#334155]">
                  {FILTER_TYPES.find(t => t.value === filter.type)?.label}
                </span>
                <button 
                  onClick={() => handleRemoveFilter(filter.id)}
                  className="text-[#94A3B8] hover:text-[#64748B]"
                >
                  <IconX size={16} stroke={2} />
                </button>
              </div>
              <div className="text-[13px] text-[#64748B] mb-2">
                {CONDITION_OPTIONS.find(c => c.value === filter.condition)?.label}
              </div>
              <div className="flex flex-wrap gap-2">
                {filter.values.map((value) => (
                  <div 
                    key={value}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F1F5F9] border border-[#E2E8F0] rounded text-[13px] text-[#334155]"
                  >
                    <span className="truncate max-w-[150px]">{value.split(' > ').pop()}</span>
                    <button 
                      onClick={() => handleRemoveFilterValue(filter.id, value)}
                      className="text-[#E44A19] hover:text-[#D03D10] flex-shrink-0"
                    >
                      <IconX size={14} stroke={2} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* New Filter Builder */}
          <div className="space-y-4">
            {/* Filter Type Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                className="w-full h-[40px] px-3 flex items-center justify-between border border-[#E2E8F0] rounded-md text-[13px] text-[#334155] hover:border-[#94A3B8] transition-colors"
              >
                {FILTER_TYPES.find(t => t.value === pendingFilter.type)?.label || 'Select filter type'}
                <IconChevronDown size={16} className="text-[#64748B]" stroke={2} />
              </button>
              {showTypeDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-10 py-1">
                  {FILTER_TYPES.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => {
                        setPendingFilter({ ...pendingFilter, type: type.value, values: [] });
                        setShowTypeDropdown(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-[13px] hover:bg-[#F8FAFC] ${
                        pendingFilter.type === type.value ? 'bg-[#DBEAFE] text-[#2563EB] font-medium' : 'text-[#334155]'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Condition Dropdown */}
            <div className="relative">
              <div
                onClick={() => setShowConditionDropdown(!showConditionDropdown)}
                className="w-full h-[40px] px-3 flex items-center justify-between border border-[#E2E8F0] rounded-md text-[13px] text-[#334155] hover:border-[#94A3B8] transition-colors cursor-pointer"
              >
                {CONDITION_OPTIONS.find(c => c.value === pendingFilter.condition)?.label}
                <div className="flex items-center gap-2">
                  <span 
                    onClick={(e) => {
                      e.stopPropagation();
                      setPendingFilter({ ...pendingFilter, condition: 'contains', values: [] });
                    }}
                    className="text-[#E44A19] hover:text-[#D03D10] cursor-pointer"
                  >
                    <IconX size={14} stroke={2} />
                  </span>
                  <IconChevronDown size={16} className="text-[#64748B]" stroke={2} />
                </div>
              </div>
              {showConditionDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-10 py-1">
                  {CONDITION_OPTIONS.map((condition) => (
                    <button
                      key={condition.value}
                      onClick={() => {
                        setPendingFilter({ ...pendingFilter, condition: condition.value });
                        setShowConditionDropdown(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-[13px] hover:bg-[#F8FAFC] ${
                        pendingFilter.condition === condition.value ? 'bg-[#DBEAFE] text-[#2563EB] font-medium' : 'text-[#334155]'
                      }`}
                    >
                      {condition.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Values */}
            {pendingFilter.values.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md">
                {pendingFilter.values.map((value) => (
                  <div 
                    key={value}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E2E8F0] rounded text-[13px] text-[#334155]"
                  >
                    <span className="truncate max-w-[120px]">{value.split(' > ').pop()}</span>
                    <button 
                      onClick={() => handleRemoveValue(value)}
                      className="text-[#E44A19] hover:text-[#D03D10] flex-shrink-0"
                    >
                      <IconX size={14} stroke={2} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Value Selector - Hierarchical for Category, Flat for others */}
            <div className="relative">
              <button
                onClick={() => setShowValueDropdown(!showValueDropdown)}
                className="w-full h-[40px] px-3 flex items-center justify-between border border-[#E2E8F0] rounded-md text-[13px] text-[#94A3B8] hover:border-[#94A3B8] transition-colors"
              >
                Select value...
                <IconChevronDown size={16} className="text-[#64748B]" stroke={2} />
              </button>
              
              {/* Category Type - Use Hierarchical Selector */}
              {pendingFilter.type === 'category' && (
                <CategoryValueSelector
                  categoryOptions={categoryOptions}
                  selectedValues={pendingFilter.values}
                  onSelectValue={handleAddValue}
                  isOpen={showValueDropdown}
                  onClose={() => setShowValueDropdown(false)}
                />
              )}

              {/* Other Types - Use Flat List */}
              {pendingFilter.type !== 'category' && showValueDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-10 py-1 max-h-[250px] overflow-y-auto">
                  {availableValues.map((option) => {
                    const isSelected = pendingFilter.values.includes(option.value);
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleAddValue(option.value)}
                        disabled={isSelected}
                        className={`w-full px-3 py-2 text-left text-[13px] hover:bg-[#F8FAFC] ${
                          isSelected ? 'bg-[#F1F5F9] text-[#94A3B8]' : 'text-[#334155]'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Add Button */}
            <button
              onClick={handleAddFilter}
              disabled={pendingFilter.values.length === 0}
              className="h-[36px] px-5 bg-[#E44A19] text-white rounded-md text-[13px] font-medium hover:bg-[#D03D10] disabled:bg-[#94A3B8] disabled:cursor-not-allowed transition-colors"
            >
              Add
            </button>
          </div>

          {/* Add Filter Link */}
          <button className="flex items-center gap-2 mt-6 text-[#22C55E] hover:text-[#16A34A] text-[13px] font-medium">
            <IconCirclePlus size={18} stroke={2} />
            Add Filter
          </button>
        </div>
      </div>

      {/* Close dropdowns when clicking outside */}
      {(showTypeDropdown || showConditionDropdown || showValueDropdown) && (
        <div 
          className="fixed inset-0 z-45"
          onClick={() => {
            setShowTypeDropdown(false);
            setShowConditionDropdown(false);
            setShowValueDropdown(false);
          }}
        />
      )}
    </>
  );
}

function ProductsPage({ onNavigateToSettings, onProductClick, onNewPartService }) {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  
  const totalPages = 9;
  const totalItems = 128;

  // Get unique categories for filter dropdown (hierarchical)
  const categoryOptions = useMemo(() => {
    const categories = new Map();
    sampleProducts.forEach(product => {
      if (!categories.has(product.category)) {
        categories.set(product.category, new Set());
      }
      if (product.subCategory) {
        categories.get(product.category).add(product.subCategory);
      }
    });
    return categories;
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...sampleProducts];
    
    // Apply search filter (searches name, partNo, category, subCategory)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.partNo.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.subCategory && product.subCategory.toLowerCase().includes(query)) ||
        product.brand.toLowerCase().includes(query)
      );
    }
    
    // Apply category dropdown filter
    if (categoryFilter !== 'all') {
      if (categoryFilter.includes(' > ')) {
        // Filter by specific sub-category
        const [parent, sub] = categoryFilter.split(' > ');
        result = result.filter(p => p.category === parent && p.subCategory === sub);
      } else {
        // Filter by parent category (includes all its sub-categories)
        result = result.filter(p => p.category === categoryFilter);
      }
    }

    // Apply active filters from filter panel
    activeFilters.forEach(filter => {
      if (filter.values.length === 0) return;

      result = result.filter(product => {
        let fieldValue = '';
        
        if (filter.type === 'category') {
          fieldValue = getCategoryPath(product);
        } else if (filter.type === 'type') {
          fieldValue = product.type;
        } else if (filter.type === 'brand') {
          fieldValue = product.brand;
        } else if (filter.type === 'createdBy') {
          fieldValue = product.createdBy;
        }

        const matchesAny = filter.values.some(filterValue => {
          if (filter.condition === 'contains') {
            // For category, check if it contains the value or starts with it (for parent categories)
            if (filter.type === 'category') {
              return fieldValue === filterValue || 
                     fieldValue.startsWith(filterValue + ' > ') ||
                     fieldValue.includes(filterValue);
            }
            return fieldValue.toLowerCase().includes(filterValue.toLowerCase());
          }
          if (filter.condition === 'equals') {
            return fieldValue === filterValue;
          }
          if (filter.condition === 'notContains') {
            if (filter.type === 'category') {
              return !fieldValue.includes(filterValue);
            }
            return !fieldValue.toLowerCase().includes(filterValue.toLowerCase());
          }
          if (filter.condition === 'notEquals') {
            return fieldValue !== filterValue;
          }
          return true;
        });

        return matchesAny;
      });
    });
    
    // Apply sorting
    result.sort((a, b) => {
      let aValue, bValue;
      
      if (sortConfig.key === 'category') {
        // Sort by full category path
        aValue = getCategoryPath(a);
        bValue = getCategoryPath(b);
      } else {
        aValue = a[sortConfig.key];
        bValue = b[sortConfig.key];
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    
    return result;
  }, [searchQuery, categoryFilter, sortConfig, activeFilters]);

  const toggleSelectAll = () => {
    if (selectedRows.size === filteredProducts.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(filteredProducts.map(p => p.id)));
    }
  };

  const toggleSelectRow = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <IconArrowUp size={14} className="text-[#CBD5E1]" stroke={1.5} />;
    }
    return sortConfig.direction === 'asc' 
      ? <IconArrowUp size={14} className="text-[#64748B]" stroke={1.5} />
      : <IconArrowDown size={14} className="text-[#64748B]" stroke={1.5} />;
  };

  // Export function that includes hierarchical category data
  const handleExport = () => {
    const headers = ['ID', 'Name', 'Part/Service No', 'Created On', 'Type', 'Category', 'Sub-Category', 'Category Path', 'Brand', 'Specification', 'Quantity', 'Unit Price', 'Created By'];
    const rows = filteredProducts.map(p => [
      p.id,
      p.name,
      p.partNo,
      p.createdOn,
      p.type,
      p.category,
      p.subCategory || '',
      getCategoryPath(p),
      p.brand,
      p.specification,
      p.quantity,
      p.unitPrice,
      p.createdBy
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'parts_services_export.csv';
    link.click();
  };

  // Count active filters
  const activeFilterCount = activeFilters.reduce((count, f) => count + f.values.length, 0);

  return (
    <div className="flex-1 flex flex-col bg-white h-full overflow-hidden">
      {/* Breadcrumb / Title Row - matches Figma height 49px */}
      <div className="h-[49px] border-b border-[#E2E8F0] flex items-center justify-between px-5">
        <div className="flex items-center gap-2">
          <span className="text-[14px] font-semibold text-[#1E293B]">Parts & Services</span>
          <span className="px-2 py-0.5 bg-[#F1F5F9] text-[#64748B] text-[12px] font-medium rounded">
            {filteredProducts.length}
          </span>
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button className="h-[31.5px] px-4 flex items-center gap-2 border border-[#E2E8F0] rounded-md text-[13px] font-medium text-[#334155] hover:bg-[#F8FAFC] transition-colors">
            <IconApps size={16} stroke={1.5} />
            Manage Groups
          </button>
          <button 
            onClick={onNewPartService}
            className="h-[31.5px] px-4 flex items-center gap-1.5 bg-[#E44A19] text-white rounded-md text-[13px] font-medium hover:bg-[#D03D10] transition-colors"
          >
            <IconPlus size={16} stroke={2} />
            New Part/Service
          </button>
        </div>
      </div>

      {/* Filters Row - matches Figma height 52.5px */}
      <div className="h-[52.5px] border-b border-[#E2E8F0] flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          {/* Category Dropdown with hierarchical options */}
          <div className="relative">
            <button 
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="h-[31.5px] px-3 flex items-center gap-2 border border-[#E2E8F0] rounded-md text-[13px] font-medium text-[#334155] hover:bg-[#F8FAFC] transition-colors"
            >
              {categoryFilter === 'all' 
                ? 'All Parts & Services' 
                : categoryFilter.includes(' > ') 
                  ? categoryFilter.split(' > ')[1] 
                  : categoryFilter}
              <IconChevronDown size={14} className="text-[#64748B]" stroke={2} />
            </button>
            
            {showCategoryDropdown && (
              <div className="absolute top-full left-0 mt-1 w-[280px] bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-20 py-1 max-h-[300px] overflow-y-auto">
                <button
                  onClick={() => { setCategoryFilter('all'); setShowCategoryDropdown(false); }}
                  className={`w-full px-3 py-2 text-left text-[13px] hover:bg-[#F8FAFC] ${categoryFilter === 'all' ? 'bg-[#DBEAFE] text-[#2563EB] font-medium' : 'text-[#334155]'}`}
                >
                  All Parts & Services
                </button>
                <div className="border-t border-[#E2E8F0] my-1" />
                {Array.from(categoryOptions.entries()).map(([category, subCategories]) => (
                  <div key={category}>
                    <button
                      onClick={() => { setCategoryFilter(category); setShowCategoryDropdown(false); }}
                      className={`w-full px-3 py-2 text-left text-[13px] hover:bg-[#F8FAFC] font-medium ${categoryFilter === category ? 'bg-[#DBEAFE] text-[#2563EB]' : 'text-[#334155]'}`}
                    >
                      {category}
                    </button>
                    {Array.from(subCategories).map(sub => (
                      <button
                        key={`${category}-${sub}`}
                        onClick={() => { setCategoryFilter(`${category} > ${sub}`); setShowCategoryDropdown(false); }}
                        className={`w-full px-3 py-2 pl-6 text-left text-[13px] hover:bg-[#F8FAFC] ${categoryFilter === `${category} > ${sub}` ? 'bg-[#DBEAFE] text-[#2563EB] font-medium' : 'text-[#64748B]'}`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Filter button */}
          <button 
            onClick={() => setShowFilterPanel(true)}
            className={`h-[31.5px] px-3 flex items-center gap-2 border rounded-md text-[13px] font-medium transition-colors ${
              activeFilterCount > 0 
                ? 'border-[#2563EB] bg-[#DBEAFE] text-[#2563EB]' 
                : 'border-[#E2E8F0] text-[#334155] hover:bg-[#F8FAFC]'
            }`}
          >
            <IconFilter size={18} stroke={1.5} />
            Filter
            {activeFilterCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-[#2563EB] text-white text-[11px] rounded-full min-w-[18px] text-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Search - matching Figma 210.19px width, 31.5px height */}
          <div className="relative">
            <IconSearch size={16} className="absolute left-[10.5px] top-1/2 -translate-y-1/2 text-[#94A3B8]" stroke={1.5} />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[210px] h-[31.5px] pl-[32.5px] pr-3 border border-[#E2E8F0] rounded-md text-[13px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#94A3B8] bg-white"
            />
          </div>
          
          {/* Columns button */}
          <button className="h-[31.5px] px-3 flex items-center gap-2 border border-[#E2E8F0] rounded-md text-[13px] font-medium text-[#334155] hover:bg-[#F8FAFC] transition-colors">
            <IconLayoutColumns size={14} stroke={1.5} />
            Columns
          </button>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showCategoryDropdown && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setShowCategoryDropdown(false)}
        />
      )}

      {/* Filter Panel */}
      <FilterPanel
        isOpen={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        filters={activeFilters}
        onFiltersChange={setActiveFilters}
        categoryOptions={categoryOptions}
      />

      {/* Table Container - matching Figma structure */}
      <div className="flex-1 overflow-auto border-b border-[#E2E8F0]">
        <table className="w-full min-w-[1400px] border-collapse">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-[#E2E8F0] h-[38.5px]">
              {/* Checkbox column - 35px */}
              <th className="w-[35px] text-left pl-[10.5px]">
                <input
                  type="checkbox"
                  checked={selectedRows.size === filteredProducts.length && filteredProducts.length > 0}
                  onChange={toggleSelectAll}
                  className="w-[14px] h-[14px] rounded border-[#CBD5E1] bg-white text-[#2563EB] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#2563EB]"
                />
              </th>
              {/* ID column - 80px with sort */}
              <th className="w-[80px] text-left px-[10.5px] border-r border-[#E2E8F0]">
                <button 
                  onClick={() => handleSort('id')}
                  className="flex items-center gap-1 text-[13px] font-medium text-[#64748B] hover:text-[#334155]"
                >
                  ID
                  <SortIcon columnKey="id" />
                </button>
              </th>
              {/* Name column - 180px with sort */}
              <th className="w-[180px] text-left px-[10.5px] border-r border-[#E2E8F0]">
                <button 
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 text-[13px] font-medium text-[#64748B] hover:text-[#334155]"
                >
                  Name
                  <SortIcon columnKey="name" />
                </button>
              </th>
              {/* Part / Service No column - 120px with sort */}
              <th className="w-[120px] text-left px-[10.5px] border-r border-[#E2E8F0]">
                <button 
                  onClick={() => handleSort('partNo')}
                  className="flex items-center gap-1 text-[13px] font-medium text-[#64748B] hover:text-[#334155]"
                >
                  Part / Service No
                  <SortIcon columnKey="partNo" />
                </button>
              </th>
              {/* Created On column - 150px with sort */}
              <th className="w-[150px] text-left px-[10.5px] border-r border-[#E2E8F0]">
                <button 
                  onClick={() => handleSort('createdOn')}
                  className="flex items-center gap-1 text-[13px] font-medium text-[#64748B] hover:text-[#334155]"
                >
                  Created On
                  <SortIcon columnKey="createdOn" />
                </button>
              </th>
              {/* Type column - 100px no sort */}
              <th className="w-[100px] text-left px-[10.5px] border-r border-[#E2E8F0] text-[13px] font-medium text-[#64748B]">
                Type
              </th>
              {/* Category column - 200px with sort (widened for hierarchy) */}
              <th className="w-[200px] text-left px-[10.5px] border-r border-[#E2E8F0]">
                <button 
                  onClick={() => handleSort('category')}
                  className="flex items-center gap-1 text-[13px] font-medium text-[#64748B] hover:text-[#334155]"
                >
                  Category
                  <SortIcon columnKey="category" />
                </button>
              </th>
              {/* Brand column - 140px no sort */}
              <th className="w-[140px] text-left px-[10.5px] border-r border-[#E2E8F0] text-[13px] font-medium text-[#64748B]">
                Brand
              </th>
              {/* Specification column - 140px no sort */}
              <th className="w-[140px] text-left px-[10.5px] border-r border-[#E2E8F0] text-[13px] font-medium text-[#64748B]">
                Specification
              </th>
              {/* Quantity column - 100px with sort */}
              <th className="w-[100px] text-left px-[10.5px] border-r border-[#E2E8F0]">
                <button 
                  onClick={() => handleSort('quantity')}
                  className="flex items-center gap-1 text-[13px] font-medium text-[#64748B] hover:text-[#334155]"
                >
                  Quantity
                  <SortIcon columnKey="quantity" />
                </button>
              </th>
              {/* Unit Price column - 100px no sort */}
              <th className="w-[100px] text-left px-[10.5px] border-r border-[#E2E8F0] text-[13px] font-medium text-[#64748B]">
                Unit Price
              </th>
              {/* Created By column - 120px no sort */}
              <th className="w-[120px] text-left px-[10.5px] border-r border-[#E2E8F0] text-[13px] font-medium text-[#64748B]">
                Created By
              </th>
              {/* Actions column - 66px */}
              <th className="w-[66px]"></th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr 
                key={product.id} 
                onClick={() => onProductClick?.(product)}
                className="group border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors h-[43.4px] cursor-pointer"
              >
                <td className="pl-[10.5px]" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedRows.has(product.id)}
                    onChange={() => toggleSelectRow(product.id)}
                    className="w-[14px] h-[14px] rounded border-[#CBD5E1] bg-white text-[#2563EB] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#2563EB]"
                  />
                </td>
                <td className="px-[10.5px] text-[13px] text-[#1E293B] whitespace-nowrap">{product.id}</td>
                <td className="px-[10.5px] text-[13px] font-medium text-[#1E293B] group-hover:text-[#2563EB] group-hover:underline max-w-[180px] truncate transition-colors" title={product.name}>{product.name}</td>
                <td className="px-[10.5px] text-[13px] text-[#1E293B] whitespace-nowrap">{product.partNo}</td>
                <td className="px-[10.5px] text-[13px] text-[#1E293B] whitespace-nowrap">{product.createdOn}</td>
                <td className="px-[10.5px] text-[13px] text-[#1E293B] whitespace-nowrap">{product.type}</td>
                <td className="px-[10.5px] text-[13px] max-w-[200px] overflow-hidden">
                  <CategoryCell product={product} />
                </td>
                <td className="px-[10.5px] text-[13px] text-[#1E293B] max-w-[140px] truncate" title={product.brand}>{product.brand}</td>
                <td className="px-[10.5px] text-[13px] text-[#1E293B] max-w-[140px] truncate" title={product.specification}>{product.specification}</td>
                <td className="px-[10.5px] text-[13px] text-[#1E293B] whitespace-nowrap">{product.quantity}</td>
                <td className="px-[10.5px] text-[13px] text-[#1E293B] whitespace-nowrap">{product.unitPrice}</td>
                <td className="px-[10.5px] text-[13px] text-[#1E293B] whitespace-nowrap">{product.createdBy}</td>
                <td className="px-[10.5px]" onClick={(e) => e.stopPropagation()}>
                  <button className="w-[30px] h-[30px] flex items-center justify-center hover:bg-[#F1F5F9] rounded transition-colors">
                    <IconDots size={16} className="text-[#64748B]" stroke={2} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination - matches Figma height 56px */}
      <div className="h-[56px] min-h-[56px] flex items-center justify-between px-[10.5px] bg-white">
        {/* Rows per page */}
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-[#64748B]">Rows per page</span>
          <button className="h-[31.5px] w-[62px] px-[11.5px] flex items-center justify-between border border-[#E2E8F0] rounded-md text-[13px] font-medium text-[#334155] hover:bg-[#F8FAFC]">
            {pageSize}
            <IconChevronDown size={14} className="text-[#64748B]" stroke={2} />
          </button>
        </div>

        {/* Center: Page info and navigation */}
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-[#1E293B]">
            Page {currentPage} of {totalPages}
          </span>
          
          <div className="flex items-center gap-1">
            <button 
              className="w-[31.5px] h-[31.5px] flex items-center justify-center border border-[#E2E8F0] rounded-md text-[#94A3B8] hover:bg-[#F8FAFC] disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={currentPage === 1}
            >
              <IconChevronsLeft size={16} stroke={1.5} />
            </button>
            <button 
              className="w-[31.5px] h-[31.5px] flex items-center justify-center border border-[#E2E8F0] rounded-md text-[#94A3B8] hover:bg-[#F8FAFC] disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={currentPage === 1}
            >
              <IconChevronLeft size={16} stroke={1.5} />
            </button>
            <button 
              className="w-[31.5px] h-[31.5px] flex items-center justify-center border border-[#E2E8F0] rounded-md text-[#94A3B8] hover:bg-[#F8FAFC] disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={currentPage === totalPages}
            >
              <IconChevronRight size={16} stroke={1.5} />
            </button>
            <button 
              className="w-[31.5px] h-[31.5px] flex items-center justify-center border border-[#E2E8F0] rounded-md text-[#94A3B8] hover:bg-[#F8FAFC] disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={currentPage === totalPages}
            >
              <IconChevronsRight size={16} stroke={1.5} />
            </button>
          </div>
        </div>

        {/* Export button */}
        <button 
          onClick={handleExport}
          className="h-[31.5px] px-3 flex items-center gap-2 border border-[#E2E8F0] rounded-md text-[13px] font-medium text-[#334155] hover:bg-[#F8FAFC]"
        >
          <IconDownload size={14} stroke={1.5} />
          Export
        </button>
      </div>
    </div>
  );
}

export default ProductsPage;
