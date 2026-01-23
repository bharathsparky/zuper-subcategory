import React, { useState } from 'react';
import { 
  IconX, 
  IconChevronRight, 
  IconChevronLeft,
  IconSearch,
  IconCheck,
  IconChevronDown,
  IconAdjustmentsHorizontal
} from '@tabler/icons-react';

// Sample categories with subcategories
const CATEGORIES = [
  { 
    id: 1, 
    name: 'Roofing',
    subCategories: [
      { id: 101, name: 'Installation' },
      { id: 102, name: 'Repair' },
      { id: 103, name: 'Inspection' },
    ]
  },
  { 
    id: 2, 
    name: 'Plumbing',
    subCategories: [
      { id: 201, name: 'Pipe Repair' },
      { id: 202, name: 'Drain Cleaning' },
      { id: 203, name: 'Water Heater' },
    ]
  },
  { 
    id: 3, 
    name: 'Electrical',
    subCategories: [
      { id: 301, name: 'Installation' },
      { id: 302, name: 'Maintenance' },
      { id: 303, name: 'Troubleshooting' },
    ]
  },
  { id: 4, name: 'HVAC', subCategories: [] },
  { id: 5, name: 'Landscaping', subCategories: [] },
  { 
    id: 6, 
    name: 'General Labor',
    subCategories: [
      { id: 601, name: 'Hourly Labor' },
      { id: 602, name: 'Emergency Services' },
      { id: 603, name: 'Consultation' },
    ]
  },
  { id: 7, name: 'Internal Costs', subCategories: [] },
  { id: 8, name: 'Painting', subCategories: [] },
  { id: 9, name: 'Tools', subCategories: [] },
  { id: 10, name: 'Spare Parts', subCategories: [] },
  { id: 11, name: 'FMCG', subCategories: [] },
  { id: 12, name: 'Manpower', subCategories: [] },
];

// Mobile Filter Panel Component
function MobileFilterPanel({ isOpen, onClose, onOpenCategoryPicker, selectedCategory }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1D21] text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#2D3339]">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-1">
            <IconX size={24} className="text-white" />
          </button>
          <h1 className="text-lg font-semibold">Sort and filter</h1>
        </div>
        <button className="text-[#F97316] font-medium">Clear</button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {/* Sort by */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Sort by</h3>
          <div className="flex flex-wrap gap-2">
            {['Part/Service ID', 'Part/Service name', 'Part/Service No.', 'Quantity', 'Created date'].map((item, idx) => (
              <button 
                key={item}
                className={`px-3 py-1.5 rounded-full text-sm ${
                  idx === 0 ? 'bg-[#3B82F6]/20 text-[#93C5FD]' : 'bg-[#2D3339] text-white'
                }`}
              >
                {idx === 1 && <span className="mr-1">↑↓</span>}
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Keyword */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Keyword</h3>
          <input 
            type="text"
            placeholder="Search by ID/name/brand/specification"
            className="w-full bg-[#2D3339] border border-[#3D4349] rounded-lg px-4 py-3 text-white placeholder-[#6B7280] text-sm"
          />
        </div>

        {/* Product category */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Product category</h3>
          <button 
            onClick={onOpenCategoryPicker}
            className="w-full bg-[#2D3339] border border-[#3D4349] rounded-lg px-4 py-3 flex items-center justify-between"
          >
            <span className={selectedCategory ? 'text-white' : 'text-[#6B7280]'}>
              {selectedCategory || 'Any category'}
            </span>
            <IconChevronRight size={20} className="text-[#6B7280]" />
          </button>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Location</h3>
          <button className="w-full bg-[#2D3339] border border-[#3D4349] rounded-lg px-4 py-3 flex items-center justify-between">
            <span className="text-[#6B7280]">All locations</span>
            <IconChevronRight size={20} className="text-[#6B7280]" />
          </button>
        </div>

        {/* Product type */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Product type</h3>
          <button className="w-full bg-[#2D3339] border border-[#3D4349] rounded-lg px-4 py-3 flex items-center justify-between">
            <span className="text-[#6B7280]">Any type</span>
            <IconChevronDown size={20} className="text-[#6B7280]" />
          </button>
        </div>

        {/* Availability */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Availability</h3>
          <button className="w-full bg-[#2D3339] border border-[#3D4349] rounded-lg px-4 py-3 flex items-center justify-between">
            <span className="text-[#6B7280]">Any status</span>
            <IconChevronDown size={20} className="text-[#6B7280]" />
          </button>
        </div>

        {/* Brand */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Brand</h3>
          <input 
            type="text"
            placeholder="Enter brand"
            className="w-full bg-[#2D3339] border border-[#3D4349] rounded-lg px-4 py-3 text-white placeholder-[#6B7280] text-sm"
          />
        </div>

        {/* Specification */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Specification</h3>
          <input 
            type="text"
            placeholder="Enter specification"
            className="w-full bg-[#2D3339] border border-[#3D4349] rounded-lg px-4 py-3 text-white placeholder-[#6B7280] text-sm"
          />
        </div>
      </div>

      {/* Apply Button */}
      <div className="px-4 py-4 border-t border-[#2D3339]">
        <button 
          onClick={onClose}
          className="w-full bg-[#F97316] text-white font-medium py-3.5 rounded-lg"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

// Category Picker Screen (Full Screen)
function CategoryPickerScreen({ 
  isOpen, 
  onClose, 
  onSelect, 
  selectedCategory,
  selectedSubCategory 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingCategory, setViewingCategory] = useState(null); // For drill-down into subcategories
  
  if (!isOpen) return null;

  const filteredCategories = CATEGORIES.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Subcategory view
  if (viewingCategory) {
    const category = CATEGORIES.find(c => c.id === viewingCategory);
    return (
      <div className="fixed inset-0 z-50 bg-[#1A1D21] text-white flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#2D3339]">
          <div className="flex items-center gap-3">
            <button onClick={() => setViewingCategory(null)} className="p-1">
              <IconChevronLeft size={24} className="text-white" />
            </button>
            <h1 className="text-lg font-semibold">{category?.name}</h1>
          </div>
          <button onClick={onClose} className="p-1">
            <IconX size={24} className="text-white" />
          </button>
        </div>

        {/* Subcategory List */}
        <div className="flex-1 overflow-y-auto">
          {/* All option for parent category */}
          <button
            onClick={() => {
              onSelect(category.name, null);
              setViewingCategory(null);
              onClose();
            }}
            className="w-full px-4 py-4 flex items-center gap-4 border-b border-[#2D3339] hover:bg-[#2D3339]"
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedCategory === category.name && !selectedSubCategory
                ? 'border-[#F97316] bg-[#F97316]' 
                : 'border-[#4B5563]'
            }`}>
              {selectedCategory === category.name && !selectedSubCategory && (
                <IconCheck size={14} className="text-white" />
              )}
            </div>
            <span className="text-white">All {category.name}</span>
          </button>

          {category?.subCategories.map(sub => (
            <button
              key={sub.id}
              onClick={() => {
                onSelect(category.name, sub.name);
                setViewingCategory(null);
                onClose();
              }}
              className="w-full px-4 py-4 flex items-center gap-4 border-b border-[#2D3339] hover:bg-[#2D3339]"
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedSubCategory === sub.name 
                  ? 'border-[#F97316] bg-[#F97316]' 
                  : 'border-[#4B5563]'
              }`}>
                {selectedSubCategory === sub.name && (
                  <IconCheck size={14} className="text-white" />
                )}
              </div>
              <span className="text-white">{sub.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Main category list view
  return (
    <div className="fixed inset-0 z-50 bg-[#1A1D21] text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#2D3339]">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-1">
            <IconX size={24} className="text-white" />
          </button>
          <h1 className="text-lg font-semibold">Select an option</h1>
        </div>
        <button className="p-1">
          <IconSearch size={24} className="text-white" />
        </button>
      </div>

      {/* Search (shown when search icon is tapped - simplified for demo) */}
      {searchTerm !== null && (
        <div className="px-4 py-3 border-b border-[#2D3339]">
          <div className="relative">
            <IconSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input 
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#2D3339] border border-[#3D4349] rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-[#6B7280] text-sm"
            />
          </div>
        </div>
      )}

      {/* Category List */}
      <div className="flex-1 overflow-y-auto">
        {/* Any category option */}
        <button
          onClick={() => {
            onSelect(null, null);
            onClose();
          }}
          className="w-full px-4 py-4 flex items-center gap-4 border-b border-[#2D3339] hover:bg-[#2D3339]"
        >
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            !selectedCategory 
              ? 'border-[#F97316] bg-[#F97316]' 
              : 'border-[#4B5563]'
          }`}>
            {!selectedCategory && (
              <IconCheck size={14} className="text-white" />
            )}
          </div>
          <span className="text-white">Any category</span>
        </button>

        {filteredCategories.map(category => (
          <button
            key={category.id}
            onClick={() => {
              if (category.subCategories.length > 0) {
                setViewingCategory(category.id);
              } else {
                onSelect(category.name, null);
                onClose();
              }
            }}
            className="w-full px-4 py-4 flex items-center gap-4 border-b border-[#2D3339] hover:bg-[#2D3339]"
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedCategory === category.name 
                ? 'border-[#F97316] bg-[#F97316]' 
                : 'border-[#4B5563]'
            }`}>
              {selectedCategory === category.name && (
                <IconCheck size={14} className="text-white" />
              )}
            </div>
            <span className="text-white flex-1 text-left">{category.name}</span>
            {category.subCategories.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-[#6B7280] text-sm">
                  {category.subCategories.length} sub
                </span>
                <IconChevronRight size={20} className="text-[#6B7280]" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// Main Mobile Page Component
export default function MobileCategoryPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const handleCategorySelect = (category, subCategory) => {
    setSelectedCategory(category);
    setSelectedSubCategory(subCategory);
  };

  const getDisplayCategory = () => {
    if (!selectedCategory) return null;
    if (selectedSubCategory) return `${selectedCategory} > ${selectedSubCategory}`;
    return selectedCategory;
  };

  return (
    <div className="min-h-screen bg-[#1A1D21]">
      {/* Mobile Header */}
      <div className="bg-[#1A1D21] px-4 py-4 border-b border-[#2D3339]">
        <h1 className="text-white text-xl font-semibold mb-4">Parts & Services</h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <IconSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
          <input 
            type="text"
            placeholder="Search parts & services..."
            className="w-full bg-[#2D3339] border border-[#3D4349] rounded-lg pl-10 pr-4 py-3 text-white placeholder-[#6B7280] text-sm"
          />
        </div>

        {/* Filter Button */}
        <button 
          onClick={() => setShowFilter(true)}
          className="flex items-center gap-2 bg-[#2D3339] px-4 py-2.5 rounded-lg"
        >
          <IconAdjustmentsHorizontal size={18} className="text-[#6B7280]" />
          <span className="text-white text-sm">Filter</span>
          {selectedCategory && (
            <span className="bg-[#F97316] text-white text-xs px-2 py-0.5 rounded-full ml-2">1</span>
          )}
        </button>

        {/* Selected Category Chip */}
        {selectedCategory && (
          <div className="mt-3 flex items-center gap-2">
            <span className="bg-[#3B82F6]/20 text-[#93C5FD] text-sm px-3 py-1.5 rounded-full flex items-center gap-2">
              {getDisplayCategory()}
              <button 
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedSubCategory(null);
                }}
                className="hover:bg-[#3B82F6]/30 rounded-full p-0.5"
              >
                <IconX size={14} />
              </button>
            </span>
          </div>
        )}
      </div>

      {/* Demo Content */}
      <div className="p-4 space-y-3">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="bg-[#2D3339] rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white font-medium">Sample Part #{i}</h3>
                <p className="text-[#6B7280] text-sm mt-1">Part ID: PRT-00{i}</p>
              </div>
              <span className="text-[#10B981] text-sm">In Stock</span>
            </div>
            <div className="mt-3 flex items-center gap-4 text-sm">
              <span className="text-[#6B7280]">Category: <span className="text-white">Roofing</span></span>
              <span className="text-[#6B7280]">Qty: <span className="text-white">50</span></span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1A1D21] border-t border-[#2D3339] px-8 py-3 flex items-center justify-around">
        <button className="flex flex-col items-center gap-1">
          <div className="w-6 h-0.5 bg-white"></div>
          <div className="w-6 h-0.5 bg-white mt-1"></div>
          <div className="w-6 h-0.5 bg-white mt-1"></div>
        </button>
        <button className="w-6 h-6 rounded-full border-2 border-white"></button>
        <button>
          <IconChevronLeft size={24} className="text-white" />
        </button>
      </div>

      {/* Filter Panel */}
      <MobileFilterPanel 
        isOpen={showFilter}
        onClose={() => setShowFilter(false)}
        onOpenCategoryPicker={() => {
          setShowFilter(false);
          setShowCategoryPicker(true);
        }}
        selectedCategory={getDisplayCategory()}
      />

      {/* Category Picker */}
      <CategoryPickerScreen
        isOpen={showCategoryPicker}
        onClose={() => {
          setShowCategoryPicker(false);
          setShowFilter(true);
        }}
        onSelect={handleCategorySelect}
        selectedCategory={selectedCategory}
        selectedSubCategory={selectedSubCategory}
      />
    </div>
  );
}
