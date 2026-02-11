import React, { useState } from 'react';
import { 
  IconX, 
  IconChevronRight, 
  IconChevronLeft,
  IconSearch,
  IconCheck,
  IconChevronDown,
  IconChevronUp,
  IconAdjustmentsHorizontal,
  IconPlus,
  IconScan,
  IconBookmark,
  IconCategory,
  IconFilter,
  IconMapPin,
  IconPencil,
  IconTrash,
  IconPhoto,
  IconInfoCircle,
  IconDotsVertical,
  IconShare,
  IconQrcode,
  IconRefresh,
  IconCopy,
  IconPrinter,
  IconArchive,
  IconPalette
} from '@tabler/icons-react';

// Sample categories with subcategories
const CATEGORIES = [
  { 
    id: 1, 
    name: 'Roofing',
    subCategories: [
      { id: 101, name: 'Installation', image: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?w=400&h=240&fit=crop' },
      { id: 102, name: 'Repair', image: 'https://images.unsplash.com/photo-1635424710928-0544e8512eae?w=400&h=240&fit=crop' },
      { id: 103, name: 'Inspection', image: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?w=400&h=240&fit=crop' },
    ]
  },
  { 
    id: 2, 
    name: 'Plumbing',
    subCategories: [
      { id: 201, name: 'Pipe Repair', image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=240&fit=crop' },
      { id: 202, name: 'Drain Cleaning', image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=240&fit=crop' },
      { id: 203, name: 'Water Heater', image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=240&fit=crop' },
    ]
  },
  { 
    id: 3, 
    name: 'Electrical',
    subCategories: [
      { id: 301, name: 'Installation', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=240&fit=crop' },
      { id: 302, name: 'Maintenance', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=240&fit=crop' },
      { id: 303, name: 'Troubleshooting', image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=240&fit=crop' },
    ]
  },
  { id: 4, name: 'HVAC', subCategories: [] },
  { id: 5, name: 'Landscaping', subCategories: [] },
  { 
    id: 6, 
    name: 'General Labor',
    subCategories: [
      { id: 601, name: 'Hourly Labor', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=240&fit=crop' },
      { id: 602, name: 'Emergency Services', image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&h=240&fit=crop' },
      { id: 603, name: 'Consultation', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=240&fit=crop' },
    ]
  },
  { id: 7, name: 'Internal Costs', subCategories: [] },
  { id: 8, name: 'Painting', subCategories: [] },
  { id: 9, name: 'Tools', subCategories: [] },
  { id: 10, name: 'Spare Parts', subCategories: [] },
  { id: 11, name: 'FMCG', subCategories: [] },
  { id: 12, name: 'Manpower', subCategories: [] },
  { id: 13, name: 'On Demand Service', subCategories: [] },
  { id: 14, name: 'Consumable', subCategories: [] },
];

// Category images with appropriate visuals
const CATEGORY_IMAGES = {
  'Roofing': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=240&fit=crop&crop=top',
  'Plumbing': 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=240&fit=crop',
  'Electrical': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=240&fit=crop',
  'HVAC': 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=400&h=240&fit=crop',
  'Tools': 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=240&fit=crop',
  'Spare Parts': 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=240&fit=crop',
  'Landscaping': 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400&h=240&fit=crop',
  'Painting': 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=240&fit=crop',
  'General Labor': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=240&fit=crop',
  'Internal Costs': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=240&fit=crop',
  'FMCG': 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=240&fit=crop',
  'Manpower': 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=240&fit=crop',
  'On Demand Service': 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=240&fit=crop',
  'Consumable': 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=240&fit=crop',
};

// Sample parts data for the listing page - matching screenshot design
const SAMPLE_PARTS = [
  {
    id: 1,
    name: '10 mm Screw -',
    partId: '758323',
    sku: '758323',
    category: 'Manpower',
    subCategory: null,
    quantity: 128.00,
    unitPrice: '$120.00',
    sellingPrice: '$120.00',
    status: 'Unavailable',
    type: 'PART',
    location: 'Redmond Warehouse',
    unitOfMeasurement: 'Unit',
    description: null,
    createdOn: 'Jan 15, 2024',
    options: [],
    customerSelectionEnabled: false,
  },
  {
    id: 2,
    name: '10 mm screw',
    partId: '004',
    sku: '004',
    category: 'Tools',
    subCategory: null,
    quantity: 8.00,
    unitPrice: '$20.00',
    sellingPrice: '$20.00',
    status: 'Unavailable',
    type: 'PART',
    location: 'Main Warehouse',
    unitOfMeasurement: 'Unit',
    description: 'Description of the part',
    createdOn: 'Feb 10, 2024',
    options: [],
    customerSelectionEnabled: false,
  },
  {
    id: 3,
    name: '10001',
    partId: '10001',
    sku: '10001',
    category: 'Tools',
    subCategory: null,
    quantity: 1118.00,
    unitPrice: '$1,000.00',
    sellingPrice: '$1,000.00',
    status: 'In Stock',
    type: 'PART',
    location: 'Redmond Warehouse',
    unitOfMeasurement: 'Unit',
    description: null,
    createdOn: 'Mar 5, 2024',
    options: [],
    customerSelectionEnabled: false,
  },
  {
    id: 4,
    name: '12W Battery edited',
    partId: '12344',
    sku: '12344',
    category: 'Labor',
    subCategory: null,
    quantity: 98.00,
    unitPrice: '$123.00',
    sellingPrice: '$123.00',
    status: 'In Stock',
    type: 'PART',
    location: 'Main Warehouse',
    unitOfMeasurement: 'Unit',
    description: 'descrption',
    createdOn: 'Apr 12, 2024',
    options: [
      { id: 1, name: 'Charcoal', color: '#36454F', available: true },
      { id: 2, name: 'Weathered Wood', color: '#8B7355', available: true },
      { id: 3, name: 'Onyx Black', color: '#181818', available: false },
      { id: 4, name: 'Slate Gray', color: '#708090', available: true },
      { id: 5, name: 'Barkwood', color: '#4A3728', available: true },
    ],
    customerSelectionEnabled: true,
  },
  {
    id: 5,
    name: '5W Battery - Edited',
    partId: '12345',
    sku: '12345',
    category: 'Labor',
    subCategory: null,
    quantity: 45.00,
    unitPrice: '$85.00',
    sellingPrice: '$85.00',
    status: 'In Stock',
    type: 'PART',
    location: 'Redmond Warehouse',
    unitOfMeasurement: 'Unit',
    description: 'Battery description',
    createdOn: 'May 20, 2024',
    options: [],
    customerSelectionEnabled: false,
  },
];

// Sample products data with appropriate product images
const SAMPLE_PRODUCTS = [
  { 
    id: 1, 
    name: '10 mm Screw', 
    sku: '758323', 
    price: 120.00, 
    available: false,
    category: 'Roofing',
    subCategory: 'Installation',
    location: 'Redmond Warehouse',
    image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=200&h=200&fit=crop'
  },
  { 
    id: 2, 
    name: 'Metal Screws Pack', 
    sku: '004', 
    price: 20.00, 
    available: false,
    description: 'Stainless steel screws',
    category: 'Roofing',
    subCategory: 'Repair',
    location: 'Main Warehouse',
    image: 'https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=200&h=200&fit=crop'
  },
  { 
    id: 3, 
    name: 'Roofing Shingles', 
    sku: '10001', 
    price: 1000.00, 
    available: true,
    category: 'Roofing',
    subCategory: 'Installation',
    location: 'Redmond Warehouse',
    image: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?w=200&h=200&fit=crop'
  },
  { 
    id: 4, 
    name: '12V Battery Pack', 
    sku: '12344', 
    price: 123.00, 
    available: true,
    description: 'Rechargeable power unit',
    category: 'Electrical',
    subCategory: 'Installation',
    location: 'Main Warehouse',
    image: 'https://images.unsplash.com/photo-1609692814858-f7cd2f0afa4f?w=200&h=200&fit=crop'
  },
  { 
    id: 5, 
    name: 'Roofing Felt Roll', 
    sku: '55678', 
    price: 250.00, 
    available: true,
    category: 'Roofing',
    subCategory: 'Installation',
    location: 'Redmond Warehouse',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=200&h=200&fit=crop'
  },
  { 
    id: 6, 
    name: 'Roofing Nails Box', 
    sku: '33421', 
    price: 45.00, 
    available: true,
    category: 'Roofing',
    subCategory: 'Installation',
    location: 'Redmond Warehouse',
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=200&h=200&fit=crop'
  },
  { 
    id: 7, 
    name: 'Roof Sealant Tube', 
    sku: '88901', 
    price: 35.00, 
    available: true,
    description: 'Waterproof silicone sealant',
    category: 'Roofing',
    subCategory: 'Repair',
    location: 'Main Warehouse',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&h=200&fit=crop'
  },
  { 
    id: 8, 
    name: 'Wire Connector Kit', 
    sku: '44520', 
    price: 28.00, 
    available: true,
    category: 'Electrical',
    subCategory: 'Installation',
    location: 'Main Warehouse',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=200&h=200&fit=crop'
  },
];

// ========================================
// Add Products Flow Components
// ========================================

// Category Grid Card
function CategoryCard({ category, image, selected, onTap, subCount, onDrillDown }) {
  // Simple card: tap = toggle, drill-down badge = view subcategories
  const handleCardClick = (e) => {
    // Ignore clicks on the drill-down badge
    if (e.target.closest('[data-drilldown]')) return;
    onTap?.();
  };

  return (
    <div 
      onClick={handleCardClick}
      className={`flex flex-col rounded-xl overflow-hidden cursor-pointer transition-all ${
        selected ? 'ring-2 ring-[#F97316]' : 'border border-[#3D4349]'
      }`}
    >
      <div className="relative h-24 bg-[#3D4955] flex items-center justify-center">
        {image ? (
          <img src={image} alt={category} className="w-full h-full object-cover" />
        ) : (
          <IconPhoto size={32} className="text-[#5B9BD5]" />
        )}
        {/* Selected overlay + checkmark */}
        {selected && (
          <div className="absolute inset-0 bg-[#F97316]/25 flex items-center justify-center pointer-events-none">
            <div className="w-8 h-8 rounded-full bg-[#F97316] flex items-center justify-center">
              <IconCheck size={20} className="text-white" />
            </div>
          </div>
        )}
        {/* Subcategory count — subtle, always same style */}
        {subCount > 0 && onDrillDown && (
          <div
            data-drilldown
            onClick={(e) => { e.stopPropagation(); onDrillDown(); }}
            className="absolute bottom-1.5 right-1.5 bg-black/50 backdrop-blur-sm text-white text-[11px] px-2 py-1 rounded flex items-center gap-0.5 z-10 cursor-pointer active:bg-black/70"
          >
            <span>{subCount}</span>
            <IconChevronRight size={12} />
          </div>
        )}
      </div>
      <div className={`py-2.5 px-2 text-center ${selected ? 'bg-[#F97316]/10' : 'bg-[#2D3339]'}`}>
        <span className={`text-sm ${selected ? 'text-[#F97316] font-medium' : 'text-white'}`}>{category}</span>
      </div>
    </div>
  );
}

// Product Card in Add Products
function ProductCard({ product, onAdd, isAdded }) {
  return (
    <div className="bg-[#2D3339] rounded-xl p-4 mx-4 mb-3">
      <div className="flex gap-3">
        {/* Product Image */}
        <div className="w-16 h-16 bg-[#3D4955] rounded-lg flex items-center justify-center flex-shrink-0">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <div className="w-10 h-10 bg-[#5B9BD5] rounded flex items-center justify-center">
              <IconPhoto size={20} className="text-white" />
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-white font-medium text-sm truncate">{product.name}</h3>
              <p className="text-[#6B7280] text-xs">{product.sku}</p>
            </div>
            {!product.available && (
              <span className="bg-[#3D2A2A] text-[#F87171] text-xs px-2 py-1 rounded-full flex-shrink-0">
                Unavailable
              </span>
            )}
          </div>
          
          {product.description && (
            <div className="flex items-center gap-1.5 mt-2 text-[#6B7280] text-xs">
              <IconInfoCircle size={14} />
              <span>{product.description}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Price and Add Button */}
      <div className="flex items-center justify-between mt-3">
        <span className="text-[#F97316] font-semibold">${product.price.toFixed(2)}</span>
        <button 
          onClick={() => onAdd(product)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
            isAdded 
              ? 'bg-[#10B981] text-white' 
              : 'bg-[#3D4349] text-white hover:bg-[#4D5359]'
          }`}
        >
          {isAdded ? 'Added' : 'Add'}
          <IconPlus size={16} />
        </button>
      </div>
    </div>
  );
}

// Selected Product Card
function SelectedProductCard({ product, quantity, onEdit, onRemove }) {
  const total = product.price * quantity;
  
  return (
    <div className="bg-[#2D3339] rounded-xl p-4 mx-4 mb-3">
      <div className="flex gap-3">
        {/* Product Image */}
        <div className="w-16 h-16 bg-[#3D4955] rounded-lg flex items-center justify-center flex-shrink-0">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <div className="w-10 h-10 bg-[#5B9BD5] rounded flex items-center justify-center">
              <IconPhoto size={20} className="text-white" />
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-white font-medium text-sm">{product.name}</h3>
              <p className="text-[#6B7280] text-xs">{product.sku}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={onEdit} className="p-1.5 text-[#6B7280] hover:text-white">
                <IconPencil size={18} />
              </button>
              <button onClick={onRemove} className="p-1.5 text-[#F87171] hover:text-red-400">
                <IconTrash size={18} />
              </button>
            </div>
          </div>
          
          {/* Category & Location */}
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-2 text-[#6B7280] text-xs">
              <IconCategory size={14} />
              <span>{product.subCategory ? `${product.category} > ${product.subCategory}` : product.category}</span>
            </div>
            <div className="flex items-center gap-2 text-[#6B7280] text-xs">
              <IconMapPin size={14} />
              <span>{product.location}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quantity and Total */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#3D4349]">
        <span className="text-[#6B7280] text-sm">
          Qty: {quantity.toFixed(2)} X ${product.price.toFixed(2)}
        </span>
        <span className="text-[#F97316] font-semibold">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}

// Category Grid Picker — simplified for field technicians
// Tap card = select/deselect. Tap "3 ›" = drill into subcategories (simple checklist).
function CategoryGridPicker({ isOpen, onClose, onApply, initialSelections = {} }) {
  const [selections, setSelections] = useState({});
  const [viewingCategory, setViewingCategory] = useState(null);
  
  React.useEffect(() => {
    if (isOpen) {
      setSelections(initialSelections || {});
      setViewingCategory(null);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;

  const isSelected = (catName) => catName in selections;

  const toggleParent = (catName) => {
    setSelections(prev => {
      const next = { ...prev };
      if (catName in next) {
        delete next[catName];
      } else {
        next[catName] = []; // [] = all subs
      }
      return next;
    });
  };

  const toggleSub = (catName, subName) => {
    const cat = CATEGORIES.find(c => c.name === catName);
    if (!cat) return;
    const allSubs = cat.subCategories.map(s => s.name);

    setSelections(prev => {
      const next = { ...prev };
      let currentSubs = catName in next 
        ? (next[catName].length === 0 ? [...allSubs] : [...next[catName]])
        : [];

      if (currentSubs.includes(subName)) {
        currentSubs = currentSubs.filter(s => s !== subName);
        if (currentSubs.length === 0) {
          delete next[catName];
        } else {
          next[catName] = currentSubs;
        }
      } else {
        currentSubs.push(subName);
        next[catName] = currentSubs.length === allSubs.length ? [] : currentSubs;
      }
      return next;
    });
  };

  const isSubSelected = (catName, subName) => {
    if (!(catName in selections)) return false;
    const selected = selections[catName];
    return selected.length === 0 ? true : selected.includes(subName);
  };

  const isAllSubsSelected = (catName) => {
    if (!(catName in selections)) return false;
    return selections[catName].length === 0;
  };

  const selectedCount = Object.keys(selections).length;

  const handleApply = () => {
    onApply(selections);
    onClose();
  };

  // ── Subcategory checklist view ──
  if (viewingCategory) {
    const category = CATEGORIES.find(c => c.id === viewingCategory);
    const catName = category?.name;
    const allSubs = category?.subCategories || [];
    const allSelected = isAllSubsSelected(catName);
    
    return (
      <div className="fixed inset-0 z-50 bg-[#1A1D21] text-white flex flex-col">
        <div className="flex items-center gap-3 px-4 py-4 border-b border-[#2D3339]">
          <button onClick={() => setViewingCategory(null)} className="p-1">
            <IconChevronLeft size={24} className="text-white" />
          </button>
          <h1 className="text-lg font-semibold">{catName}</h1>
        </div>

        {/* Simple checklist */}
        <div className="flex-1 overflow-y-auto">
          {/* Select All row */}
          <button
            onClick={() => {
              if (allSelected) {
                setSelections(prev => { const next = { ...prev }; delete next[catName]; return next; });
              } else {
                setSelections(prev => ({ ...prev, [catName]: [] }));
              }
            }}
            className="w-full flex items-center justify-between px-5 py-4 border-b border-[#2D3339]"
          >
            <span className="text-white font-medium">All {catName}</span>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              allSelected ? 'bg-[#F97316]' : 'border-2 border-[#4B5563]'
            }`}>
              {allSelected && <IconCheck size={16} className="text-white" />}
            </div>
          </button>

          {/* Sub items */}
          {allSubs.map((sub) => {
            const checked = isSubSelected(catName, sub.name);
            return (
              <button
                key={sub.id}
                onClick={() => toggleSub(catName, sub.name)}
                className="w-full flex items-center justify-between px-5 py-4 border-b border-[#2D3339]/50"
              >
                <span className="text-[#D1D5DB]">{sub.name}</span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  checked ? 'bg-[#F97316]' : 'border-2 border-[#4B5563]'
                }`}>
                  {checked && <IconCheck size={16} className="text-white" />}
                </div>
              </button>
            );
          })}
        </div>

        <div className="px-4 py-4 border-t border-[#2D3339]">
          <button 
            onClick={() => setViewingCategory(null)}
            className="w-full bg-[#F97316] text-white font-medium py-3.5 rounded-lg"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  // ── Main category grid ──
  return (
    <div className="fixed inset-0 z-50 bg-[#1A1D21] text-white flex flex-col">
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#2D3339]">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-1">
            <IconX size={24} className="text-white" />
          </button>
          <h1 className="text-lg font-semibold">Select Categories</h1>
        </div>
        {selectedCount > 0 && (
          <button onClick={() => setSelections({})} className="text-[#F97316] text-sm font-medium">
            Clear
          </button>
        )}
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-3 gap-2.5">
          {CATEGORIES.map(category => (
            <CategoryCard
              key={category.id}
              category={category.name}
              image={CATEGORY_IMAGES[category.name]}
              selected={isSelected(category.name)}
              onTap={() => toggleParent(category.name)}
              subCount={category.subCategories.length}
              onDrillDown={category.subCategories.length > 0 ? () => setViewingCategory(category.id) : undefined}
            />
          ))}
        </div>
      </div>

      {/* Apply */}
      <div className="px-4 py-4 border-t border-[#2D3339]">
        <button onClick={handleApply} className="w-full bg-[#F97316] text-white font-medium py-3.5 rounded-lg">
          {selectedCount > 0 ? `Apply (${selectedCount})` : 'Show All'}
        </button>
      </div>
    </div>
  );
}

// Add Products Screen
function AddProductsScreen({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'selected'
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  // Multi-select: { "Roofing": ["Installation", "Repair"], "HVAC": [] }
  const [categorySelections, setCategorySelections] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  
  if (!isOpen) return null;

  const handleAddProduct = (product) => {
    if (!selectedProducts.find(p => p.product.id === product.id)) {
      setSelectedProducts([...selectedProducts, { product, quantity: 1 }]);
    }
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(p => p.product.id !== productId));
  };

  const isProductAdded = (productId) => {
    return selectedProducts.some(p => p.product.id === productId);
  };

  const handleCategoryApply = (newSelections) => {
    setCategorySelections(newSelections);
  };

  const getCategoryDisplay = () => {
    const keys = Object.keys(categorySelections);
    if (keys.length === 0) return 'All Categories';
    if (keys.length === 1) {
      const catName = keys[0];
      const subs = categorySelections[catName];
      if (subs.length === 0) return catName;
      if (subs.length === 1) return `${catName} › ${subs[0]}`;
      return `${catName} (${subs.length})`;
    }
    // Multiple parents
    let total = 0;
    for (const [catName, subs] of Object.entries(categorySelections)) {
      const cat = CATEGORIES.find(c => c.name === catName);
      if (!cat || cat.subCategories.length === 0) total += 1;
      else total += subs.length === 0 ? cat.subCategories.length : subs.length;
    }
    return `${total} selected`;
  };

  // Filter products based on multi-select map
  const hasFilters = Object.keys(categorySelections).length > 0;
  const filteredProducts = SAMPLE_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    if (!hasFilters) return matchesSearch;
    // Check if product's category is in selections
    if (!(product.category in categorySelections)) return false;
    const subs = categorySelections[product.category];
    // [] means all subs selected
    if (subs.length === 0) return matchesSearch;
    // Check specific subcategory
    return matchesSearch && subs.includes(product.subCategory);
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1D21] text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#2D3339]">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-1">
            <IconX size={24} className="text-white" />
          </button>
          <h1 className="text-lg font-semibold">Add products</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2">
            <IconBookmark size={22} className="text-white" />
          </button>
          <button className="p-2">
            <IconPlus size={22} className="text-white" />
          </button>
          <button className="p-2">
            <IconScan size={22} className="text-white" />
          </button>
        </div>
      </div>

      {activeTab === 'products' ? (
        <>
          {/* Search Bar */}
          <div className="px-4 py-3">
            <div className="relative">
              <IconSearch size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
              <input 
                type="text"
                placeholder="Search products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#2D3339] border border-[#3D4349] rounded-lg pl-10 pr-4 py-3 text-white placeholder-[#6B7280] text-sm"
              />
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex px-4 pb-3 gap-2">
            <button 
              onClick={() => setShowCategoryPicker(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#2D3339] border border-[#3D4349] rounded-lg"
            >
              <IconCategory size={18} className="text-[#6B7280]" />
              <span className="text-white text-sm">{getCategoryDisplay()}</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#2D3339] border border-[#3D4349] rounded-lg">
              <IconFilter size={18} className="text-[#6B7280]" />
              <span className="text-white text-sm">Any type</span>
            </button>
          </div>

          {/* Products List */}
          <div className="flex-1 overflow-y-auto pb-20">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={handleAddProduct}
                isAdded={isProductAdded(product.id)}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Selected Products */}
          <div className="flex-1 overflow-y-auto py-4 pb-24">
            {selectedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-[#6B7280]">
                <IconPhoto size={48} className="mb-2 opacity-50" />
                <p>No products selected</p>
              </div>
            ) : (
              selectedProducts.map(({ product, quantity }) => (
                <SelectedProductCard
                  key={product.id}
                  product={product}
                  quantity={quantity}
                  onEdit={() => {}}
                  onRemove={() => handleRemoveProduct(product.id)}
                />
              ))
            )}
          </div>

          {/* Update Button */}
          {selectedProducts.length > 0 && (
            <div className="absolute bottom-16 left-0 right-0 px-4 py-4 bg-[#1A1D21] border-t border-[#2D3339]">
              <button 
                onClick={onClose}
                className="w-full bg-[#F97316] text-white font-medium py-3.5 rounded-lg"
              >
                Update
              </button>
            </div>
          )}
        </>
      )}

      {/* Tab Bar */}
      <div className="absolute bottom-0 left-0 right-0 flex border-t border-[#2D3339] bg-[#1A1D21]">
        <button 
          onClick={() => setActiveTab('products')}
          className={`flex-1 py-4 text-center text-sm font-medium ${
            activeTab === 'products' ? 'text-white' : 'text-[#6B7280]'
          }`}
        >
          Products
        </button>
        <button 
          onClick={() => setActiveTab('selected')}
          className={`flex-1 py-4 text-center text-sm font-medium relative ${
            activeTab === 'selected' ? 'text-white' : 'text-[#6B7280]'
          }`}
        >
          Selected ({selectedProducts.length})
          {activeTab === 'selected' && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-[#F97316]" />
          )}
        </button>
      </div>

      {/* Category Grid Picker */}
      <CategoryGridPicker
        isOpen={showCategoryPicker}
        onClose={() => setShowCategoryPicker(false)}
        onApply={handleCategoryApply}
        initialSelections={categorySelections}
      />
    </div>
  );
}

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

// Multi-select Checkbox component
function MultiCheckbox({ checked, indeterminate, onChange, size = 22 }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onChange(!checked); }}
      className={`w-[${size}px] h-[${size}px] rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0 ${
        checked || indeterminate
          ? 'bg-[#F97316] border-[#F97316]'
          : 'border-[#4B5563] bg-transparent hover:border-[#6B7280]'
      }`}
      style={{ width: size, height: size }}
    >
      {checked && <IconCheck size={size - 8} className="text-white" strokeWidth={3} />}
      {!checked && indeterminate && (
        <div className="w-[10px] h-[2px] bg-white rounded-full" />
      )}
    </button>
  );
}

// Category Picker Screen (Full Screen - Multi-Select)
// selections shape: { "Roofing": ["Installation", "Repair"], "HVAC": [] }
// Key with empty array = entire parent selected (all subs or category itself)
// Key with sub-array = only those subs are selected
function CategoryPickerScreen({ 
  isOpen, 
  onClose, 
  onApply, 
  initialSelections = {}
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({}); // { categoryId: true/false }
  // Internal selections state — committed only on "Apply"
  const [selections, setSelections] = useState({});

  // Sync internal state when opened
  React.useEffect(() => {
    if (isOpen) {
      setSelections(initialSelections || {});
      setSearchTerm('');
      // Auto-expand categories that have selections
      const expanded = {};
      Object.keys(initialSelections || {}).forEach(catName => {
        const cat = CATEGORIES.find(c => c.name === catName);
        if (cat && cat.subCategories.length > 0) {
          expanded[cat.id] = true;
        }
      });
      setExpandedCategories(expanded);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;

  // ---- Selection helpers ----
  const isCategoryFullySelected = (category) => {
    if (!selections[category.name]) return false;
    if (category.subCategories.length === 0) return true; // no subs → selected
    // All subs selected?
    return selections[category.name].length === 0 || 
           selections[category.name].length === category.subCategories.length;
  };

  const isCategoryPartiallySelected = (category) => {
    if (!selections[category.name]) return false;
    if (category.subCategories.length === 0) return false;
    const subs = selections[category.name];
    return subs.length > 0 && subs.length < category.subCategories.length;
  };

  const isSubSelected = (categoryName, subName) => {
    if (!selections[categoryName]) return false;
    const subs = selections[categoryName];
    return subs.length === 0 || subs.includes(subName); // empty = all
  };

  const toggleCategory = (category) => {
    setSelections(prev => {
      const next = { ...prev };
      if (isCategoryFullySelected(category)) {
        // Deselect entirely
        delete next[category.name];
      } else {
        // Select all — use empty array to mean "all subs"
        next[category.name] = [];
      }
      return next;
    });
  };

  const toggleSubCategory = (category, subName) => {
    setSelections(prev => {
      const next = { ...prev };
      const currentSubs = next[category.name];
      
      if (!currentSubs) {
        // Category not selected at all — select just this sub
        next[category.name] = [subName];
      } else if (currentSubs.length === 0) {
        // All subs selected — remove this one (select all others)
        next[category.name] = category.subCategories
          .map(s => s.name)
          .filter(name => name !== subName);
        // If nothing left, remove category
        if (next[category.name].length === 0) {
          delete next[category.name];
        }
      } else if (currentSubs.includes(subName)) {
        // Remove this sub
        next[category.name] = currentSubs.filter(s => s !== subName);
        // If nothing left, remove category
        if (next[category.name].length === 0) {
          delete next[category.name];
        }
      } else {
        // Add this sub
        const updated = [...currentSubs, subName];
        // If all subs now selected, normalize to empty array
        if (updated.length === category.subCategories.length) {
          next[category.name] = [];
        } else {
          next[category.name] = updated;
        }
      }
      return next;
    });
  };

  const toggleExpandCategory = (categoryId) => {
    setExpandedCategories(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  const clearAll = () => {
    setSelections({});
  };

  const selectAll = () => {
    const all = {};
    CATEGORIES.forEach(cat => { all[cat.name] = []; });
    setSelections(all);
  };

  // Count total selections
  const getTotalSelectionCount = () => {
    let count = 0;
    Object.entries(selections).forEach(([catName, subs]) => {
      const cat = CATEGORIES.find(c => c.name === catName);
      if (!cat) return;
      if (cat.subCategories.length === 0) {
        count += 1;
      } else if (subs.length === 0) {
        count += cat.subCategories.length; // all subs
      } else {
        count += subs.length;
      }
    });
    return count;
  };

  // Build selection chips for display
  const getSelectionChips = () => {
    const chips = [];
    Object.entries(selections).forEach(([catName, subs]) => {
      const cat = CATEGORIES.find(c => c.name === catName);
      if (!cat) return;
      if (cat.subCategories.length === 0 || subs.length === 0) {
        // Whole category
        chips.push({ type: 'category', catName, label: catName });
      } else {
        // Individual subs
        subs.forEach(subName => {
          chips.push({ type: 'sub', catName, subName, label: `${catName} › ${subName}` });
        });
      }
    });
    return chips;
  };

  const removeChip = (chip) => {
    if (chip.type === 'category') {
      setSelections(prev => {
        const next = { ...prev };
        delete next[chip.catName];
        return next;
      });
    } else {
      const cat = CATEGORIES.find(c => c.name === chip.catName);
      if (cat) toggleSubCategory(cat, chip.subName);
    }
  };

  // Filter
  const lowerSearch = searchTerm.toLowerCase();
  const filteredCategories = CATEGORIES.filter(cat => {
    if (!searchTerm) return true;
    if (cat.name.toLowerCase().includes(lowerSearch)) return true;
    return cat.subCategories.some(s => s.name.toLowerCase().includes(lowerSearch));
  });

  const totalSelected = getTotalSelectionCount();
  const allSelected = Object.keys(selections).length === CATEGORIES.length &&
    CATEGORIES.every(c => isCategoryFullySelected(c));
  const chips = getSelectionChips();

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1D21] text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#2D3339]">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-1">
            <IconX size={24} className="text-white" />
          </button>
          <h1 className="text-lg font-semibold">Select Categories</h1>
        </div>
        {totalSelected > 0 && (
          <button onClick={clearAll} className="text-[#F97316] text-sm font-medium">
            Clear all
        </button>
        )}
      </div>

      {/* Search */}
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

      {/* Selection Chips */}
      {chips.length > 0 && (
        <div className="px-4 py-2.5 border-b border-[#2D3339] overflow-x-auto">
          <div className="flex items-center gap-2 min-w-max">
            {chips.map((chip, idx) => (
              <span 
                key={idx}
                className="inline-flex items-center gap-1.5 bg-[#F97316]/15 border border-[#F97316]/30 text-[#F97316] text-xs font-medium px-2.5 py-1.5 rounded-full whitespace-nowrap"
              >
                {chip.label}
                <button 
                  onClick={() => removeChip(chip)}
                  className="hover:bg-[#F97316]/20 rounded-full p-0.5"
                >
                  <IconX size={12} strokeWidth={3} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Category List */}
      <div className="flex-1 overflow-y-auto">
        {/* Select All */}
        {!searchTerm && (
        <button
            onClick={() => allSelected ? clearAll() : selectAll()}
            className="w-full px-4 py-3.5 flex items-center gap-3.5 border-b border-[#2D3339] hover:bg-[#2D3339]/60 transition-colors"
          >
            <MultiCheckbox
              checked={allSelected}
              indeterminate={!allSelected && totalSelected > 0}
              onChange={() => allSelected ? clearAll() : selectAll()}
            />
            <span className="text-white font-medium">Select All</span>
            <span className="text-[#6B7280] text-xs ml-auto">{CATEGORIES.length} categories</span>
          </button>
        )}

        {filteredCategories.map(category => {
          const isFullySelected = isCategoryFullySelected(category);
          const isPartial = isCategoryPartiallySelected(category);
          const hasSubs = category.subCategories.length > 0;
          const isExpanded = expandedCategories[category.id];
          // When searching, auto-expand categories with matching subs
          const searchExpanded = searchTerm && hasSubs && 
            category.subCategories.some(s => s.name.toLowerCase().includes(lowerSearch));

          const showSubs = hasSubs && (isExpanded || searchExpanded);

          return (
            <div key={category.id}>
              {/* Parent Category Row */}
              <div className="flex items-center border-b border-[#2D3339] hover:bg-[#2D3339]/60 transition-colors">
                {/* Checkbox area */}
                <div className="pl-4 pr-2 py-3.5 flex items-center">
                  <MultiCheckbox
                    checked={isFullySelected}
                    indeterminate={isPartial}
                    onChange={() => toggleCategory(category)}
                  />
          </div>

                {/* Category name — tapping here expands subs (or toggles if no subs) */}
          <button
            onClick={() => {
                    if (hasSubs) {
                      toggleExpandCategory(category.id);
              } else {
                      toggleCategory(category);
                    }
                  }}
                  className="flex-1 py-3.5 pr-2 flex items-center gap-2 text-left"
                >
                  <span className="text-white flex-1">{category.name}</span>
                  {hasSubs && (
                    <span className="text-[#6B7280] text-xs">
                      {selections[category.name] 
                        ? selections[category.name].length === 0 
                          ? `All (${category.subCategories.length})`
                          : `${selections[category.name].length}/${category.subCategories.length}`
                        : `${category.subCategories.length} sub`
                      }
                    </span>
                  )}
                </button>

                {/* Expand chevron for categories with subs */}
                {hasSubs && (
                  <button
                    onClick={() => toggleExpandCategory(category.id)}
                    className="pr-4 pl-2 py-3.5"
                  >
                    {showSubs 
                      ? <IconChevronDown size={20} className="text-[#6B7280]" />
                      : <IconChevronRight size={20} className="text-[#6B7280]" />
                    }
                  </button>
                )}
                {!hasSubs && <div className="pr-4" />}
            </div>

              {/* Subcategories (expanded inline) */}
              {showSubs && (
                <div className="bg-[#15181B]">
                  {category.subCategories
                    .filter(sub => !searchTerm || sub.name.toLowerCase().includes(lowerSearch) || category.name.toLowerCase().includes(lowerSearch))
                    .map(sub => {
                      const subChecked = isSubSelected(category.name, sub.name);
                      return (
                        <button
                          key={sub.id}
                          onClick={() => toggleSubCategory(category, sub.name)}
                          className="w-full flex items-center gap-3.5 pl-11 pr-4 py-3 border-b border-[#2D3339]/60 hover:bg-[#2D3339]/40 transition-colors"
                        >
                          <MultiCheckbox
                            checked={subChecked}
                            indeterminate={false}
                            onChange={() => toggleSubCategory(category, sub.name)}
                            size={20}
                          />
                          <span className="text-[#D1D5DB] text-sm">{sub.name}</span>
                        </button>
                      );
                    })
                  }
              </div>
            )}
            </div>
          );
        })}
      </div>

      {/* Apply Button */}
      <div className="px-4 py-4 border-t border-[#2D3339] bg-[#1A1D21]">
        <button 
          onClick={() => {
            onApply(selections);
            onClose();
          }}
          className="w-full bg-[#F97316] text-white font-medium py-3.5 rounded-lg transition-colors hover:bg-[#EA6C10]"
        >
          {totalSelected > 0 ? `Apply (${totalSelected} selected)` : 'Apply — No filter'}
          </button>
      </div>
    </div>
  );
}

// Mobile Part Details Page Component
function MobilePartDetailsPage({ part, onBack }) {
  const [activeTab, setActiveTab] = useState('details');
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    attachments: true,
    options: true,
  });

  if (!part) return null;

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Determine availability status
  const isOutOfStock = part.status !== 'In Stock' && part.status !== 'Available';

  return (
    <div className="fixed inset-0 z-50 bg-[#F8F9FA] flex flex-col">
      {/* Header - Light theme with "< Back" text */}
      <div className="flex items-center justify-between px-4 py-3 bg-white">
        <button onClick={onBack} className="flex items-center gap-1 text-[#1F2937]">
          <IconChevronLeft size={20} className="text-[#1F2937]" />
          <span className="text-sm font-medium">Back</span>
        </button>
        <button 
          onClick={() => setShowMoreActions(!showMoreActions)}
          className="p-1"
        >
          <IconDotsVertical size={20} className="text-[#6B7280]" />
        </button>
      </div>

      {/* More Actions Dropdown */}
      {showMoreActions && (
        <div className="absolute top-12 right-4 bg-white rounded-lg shadow-lg z-10 py-2 min-w-[180px] border border-gray-100">
          <button className="w-full px-4 py-3 flex items-center gap-3 text-[#1F2937] hover:bg-gray-50">
            <IconPencil size={18} className="text-[#6B7280]" />
            <span className="text-sm">Edit</span>
          </button>
          <button className="w-full px-4 py-3 flex items-center gap-3 text-[#1F2937] hover:bg-gray-50">
            <IconCopy size={18} className="text-[#6B7280]" />
            <span className="text-sm">Duplicate</span>
          </button>
          <button className="w-full px-4 py-3 flex items-center gap-3 text-[#1F2937] hover:bg-gray-50">
            <IconQrcode size={18} className="text-[#6B7280]" />
            <span className="text-sm">QR Code</span>
          </button>
          <button className="w-full px-4 py-3 flex items-center gap-3 text-[#1F2937] hover:bg-gray-50">
            <IconRefresh size={18} className="text-[#6B7280]" />
            <span className="text-sm">Update Stock</span>
          </button>
          <button className="w-full px-4 py-3 flex items-center gap-3 text-[#1F2937] hover:bg-gray-50">
            <IconPrinter size={18} className="text-[#6B7280]" />
            <span className="text-sm">Print</span>
          </button>
          <div className="border-t border-gray-100 my-1"></div>
          <button className="w-full px-4 py-3 flex items-center gap-3 text-[#EF4444] hover:bg-gray-50">
            <IconArchive size={18} />
            <span className="text-sm">Archive</span>
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Part Card with Image and Info - Light theme */}
        <div className="mx-4 mt-4 bg-white rounded-xl p-4 shadow-sm">
          <div className="flex gap-4 items-center">
            {/* Part Image Placeholder - Light blue background */}
            <div className="w-16 h-16 bg-[#E8F4FD] rounded-lg flex items-center justify-center flex-shrink-0">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                <path d="M20 8L32 15V29L20 36L8 29V15L20 8Z" fill="#B3DDFF" stroke="#90CAF9" strokeWidth="1"/>
                <path d="M20 8L32 15L20 22L8 15L20 8Z" fill="#DBEAFE"/>
                <path d="M20 22V36L8 29V15L20 22Z" fill="#93C5FD"/>
                <path d="M20 22V36L32 29V15L20 22Z" fill="#B3DDFF"/>
              </svg>
            </div>
            
            {/* Part Name and SKU */}
            <div className="flex-1">
              <h1 className="text-[#1F2937] font-semibold text-lg">{part.name}</h1>
              <p className="text-[#6B7280] text-sm mt-0.5">{part.partId}</p>
            </div>
          </div>
          
          {/* Action Buttons - 3 buttons like Figma */}
          <div className="flex gap-3 mt-5">
            <button className="flex flex-col items-center gap-2 flex-1">
              <div className="w-12 h-12 bg-[#FFF7ED] rounded-xl flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="text-[#6B7280] text-xs">Update stock</span>
            </button>
            <button className="flex flex-col items-center gap-2 flex-1">
              <div className="w-12 h-12 bg-[#FFF7ED] rounded-xl flex items-center justify-center">
                <IconQrcode size={22} className="text-[#EA580C]" />
              </div>
              <span className="text-[#6B7280] text-xs">Barcode</span>
            </button>
            <button className="flex flex-col items-center gap-2 flex-1">
              <div className="w-12 h-12 bg-[#FFF7ED] rounded-xl flex items-center justify-center">
                <IconPlus size={22} className="text-[#EA580C]" />
              </div>
              <span className="text-[#6B7280] text-xs">Add Note</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation - Light theme with 4 tabs */}
        <div className="flex mt-4 px-4 bg-white border-b border-gray-100">
          <button 
            onClick={() => setActiveTab('details')}
            className={`flex-1 py-3 text-center text-sm font-medium relative ${
              activeTab === 'details' ? 'text-[#1F2937]' : 'text-[#9CA3AF]'
            }`}
          >
            Details
            {activeTab === 'details' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-[#EA580C] rounded-full" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('location')}
            className={`flex-1 py-3 text-center text-sm font-medium relative ${
              activeTab === 'location' ? 'text-[#1F2937]' : 'text-[#9CA3AF]'
            }`}
          >
            Location
            {activeTab === 'location' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-[#EA580C] rounded-full" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('notes')}
            className={`flex-1 py-3 text-center text-sm font-medium relative ${
              activeTab === 'notes' ? 'text-[#1F2937]' : 'text-[#9CA3AF]'
            }`}
          >
            Notes
            {activeTab === 'notes' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-[#EA580C] rounded-full" />
            )}
          </button>
          <button 
            onClick={() => setActiveTab('activity')}
            className={`flex-1 py-3 text-center text-sm font-medium relative ${
              activeTab === 'activity' ? 'text-[#1F2937]' : 'text-[#9CA3AF]'
            }`}
          >
            Activity
            {activeTab === 'activity' && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-[#EA580C] rounded-full" />
            )}
          </button>
        </div>

        {/* Details Tab Content - Light theme */}
        {activeTab === 'details' && (
          <div className="bg-white">
            {/* Availability Row */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <span className="text-[#6B7280] text-sm">Availability</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                isOutOfStock 
                  ? 'bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA]' 
                  : 'bg-[#F0FDF4] text-[#22C55E] border border-[#BBF7D0]'
              }`}>
                {isOutOfStock ? 'Out of stock' : 'In Stock'}
              </span>
            </div>

            {/* Unit Selling Price Row */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <span className="text-[#6B7280] text-sm">Unit Selling Price</span>
              <span className="text-[#1F2937] text-sm font-medium">USD {part.sellingPrice?.replace('$', '') || '0'}</span>
            </div>

            {/* Category Row */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <span className="text-[#6B7280] text-sm">Category</span>
              <span className="text-[#1F2937] text-sm">{part.category}</span>
            </div>

            {/* Type Row */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <span className="text-[#6B7280] text-sm">Type</span>
              <span className="text-[#1F2937] text-sm">{part.type === 'SERVICE' ? 'Service' : 'Product'}</span>
            </div>

            {/* Available Quantity Row */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
              <span className="text-[#6B7280] text-sm">Available Quantity</span>
              <span className="text-[#1F2937] text-sm">{part.quantity !== null ? part.quantity : 0}</span>
            </div>

            {/* Options Section - Only show if part has options */}
            {part.options && part.options.length > 0 && (
              <div className="mt-3 mx-4">
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <button 
                    onClick={() => toggleSection('options')}
                    className="w-full px-4 py-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[#1F2937] text-sm font-medium">Options ({part.options.length})</span>
                      {part.customerSelectionEnabled && (
                        <span className="text-[10px] text-[#3B82F6] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
                          Customer Selection
                        </span>
                      )}
                    </div>
                    {expandedSections.options ? (
                      <IconChevronUp size={18} className="text-[#9CA3AF]" />
                    ) : (
                      <IconChevronDown size={18} className="text-[#9CA3AF]" />
                    )}
                  </button>
                  
                  {expandedSections.options && (
                    <div className="px-4 pb-4 border-t border-gray-100">
                      <div className="space-y-2 mt-3">
                        {part.options.map((option) => (
                          <div 
                            key={option.id}
                            className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-lg border border-gray-100"
                          >
                            {/* Option Color/Image */}
                            <div 
                              className="w-10 h-10 rounded-lg border-2 border-white shadow-sm flex-shrink-0"
                              style={{ backgroundColor: option.color || '#E5E7EB' }}
                            >
                              {!option.color && (
                                <div className="w-full h-full flex items-center justify-center">
                                  <span className="text-xs text-[#6B7280] font-medium">{option.name.charAt(0)}</span>
                                </div>
                              )}
                            </div>
                            
                            {/* Option Name */}
                            <div className="flex-1">
                              <p className="text-[#1F2937] text-sm font-medium">{option.name}</p>
                            </div>
                            
                            {/* Availability Badge */}
                            <div>
                              {option.available ? (
                                <span className="flex items-center gap-1 text-[#22C55E] text-xs font-medium">
                                  <IconCheck size={14} />
                                  Available
                                </span>
                              ) : (
                                <span className="flex items-center gap-1 text-[#EF4444] text-xs font-medium">
                                  <IconX size={14} />
                                  Unavailable
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Attachments Section - Light theme */}
            <div className="mt-3 mx-4">
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button 
                  onClick={() => toggleSection('attachments')}
                  className="w-full px-4 py-4 flex items-center justify-between"
                >
                  <span className="text-[#1F2937] text-sm font-medium">Attachments (0)</span>
                  {expandedSections.attachments ? (
                    <IconChevronUp size={18} className="text-[#9CA3AF]" />
                  ) : (
                    <IconChevronDown size={18} className="text-[#9CA3AF]" />
                  )}
                </button>
                
                {expandedSections.attachments && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <button className="mt-3 w-full py-3 border border-gray-200 rounded-lg text-[#1F2937] text-sm font-medium hover:bg-gray-50 transition-colors">
                      Add Attachment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Location Tab Content - Light theme */}
        {activeTab === 'location' && (
          <div className="bg-white p-4">
            <div className="bg-[#F9FAFB] rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FFF7ED] rounded-lg flex items-center justify-center">
                  <IconMapPin size={20} className="text-[#EA580C]" />
                </div>
                <div>
                  <p className="text-[#1F2937] text-sm font-medium">{part.location || 'No location assigned'}</p>
                  <p className="text-[#6B7280] text-xs mt-0.5">Primary Location</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notes Tab Content - Light theme */}
        {activeTab === 'notes' && (
          <div className="bg-white p-4">
            <div className="bg-[#F9FAFB] rounded-xl p-8 text-center border border-gray-100">
              <div className="w-12 h-12 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-3">
                <IconInfoCircle size={24} className="text-[#9CA3AF]" />
              </div>
              <p className="text-[#6B7280] text-sm">No notes added yet</p>
              <button className="mt-4 px-4 py-2 bg-[#EA580C] text-white text-sm font-medium rounded-lg hover:bg-[#DC2626] transition-colors">
                Add Note
              </button>
            </div>
          </div>
        )}

        {/* Activity Tab Content - Light theme */}
        {activeTab === 'activity' && (
          <div className="bg-white p-4">
            <div className="bg-[#F9FAFB] rounded-xl p-8 text-center border border-gray-100">
              <div className="w-12 h-12 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#9CA3AF]">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-[#6B7280] text-sm">No activity recorded yet</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation Bar - iOS style */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-8 py-2 pb-6 flex items-center justify-center">
        <div className="w-32 h-1 bg-[#1F2937] rounded-full"></div>
      </div>

      {/* Click outside to close more actions */}
      {showMoreActions && (
        <div 
          className="fixed inset-0 z-[5]" 
          onClick={() => setShowMoreActions(false)}
        />
      )}
    </div>
  );
}

// Main Mobile Page Component
export default function MobileCategoryPage() {
  const [showFilter, setShowFilter] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showAddProducts, setShowAddProducts] = useState(false);
  // Multi-select: { "Roofing": ["Installation", "Repair"], "HVAC": [] }
  // Empty array = all subs selected (or category itself if no subs)
  const [categorySelections, setCategorySelections] = useState({});
  const [selectedPart, setSelectedPart] = useState(null);

  const handleCategoryApply = (selections) => {
    setCategorySelections(selections);
  };

  const getDisplayCategory = () => {
    const keys = Object.keys(categorySelections);
    if (keys.length === 0) return null;
    if (keys.length === 1) {
      const catName = keys[0];
      const subs = categorySelections[catName];
      if (subs.length === 0) return catName;
      if (subs.length === 1) return `${catName} › ${subs[0]}`;
      return `${catName} (${subs.length})`;
    }
    // Count total
    let total = 0;
    keys.forEach(catName => {
      const cat = CATEGORIES.find(c => c.name === catName);
      const subs = categorySelections[catName];
      if (!cat || cat.subCategories.length === 0) total += 1;
      else if (subs.length === 0) total += cat.subCategories.length;
      else total += subs.length;
    });
    return `${keys.length} categories (${total})`;
  };

  const handlePartClick = (part) => {
    setSelectedPart(part);
  };

  const handleBackFromDetails = () => {
    setSelectedPart(null);
  };

  // If a part is selected, show the details page
  if (selectedPart) {
    return (
      <MobilePartDetailsPage 
        part={selectedPart} 
        onBack={handleBackFromDetails}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Mobile Header - Light theme matching screenshot */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {/* Left: Hamburger + Title with dropdown */}
          <div className="flex items-center gap-3">
            <button className="p-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1F2937" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <button className="flex items-center gap-1">
              <span className="text-[#1F2937] text-lg font-semibold">Parts & Services (...)</span>
              <IconChevronDown size={20} className="text-[#6B7280]" />
            </button>
          </div>
          
          {/* Right: Search + Filter icons */}
          <div className="flex items-center gap-2">
            <button className="p-2">
              <IconSearch size={22} className="text-[#1F2937]" />
            </button>
            <button 
              onClick={() => setShowFilter(true)}
              className="p-2"
            >
              <IconFilter size={22} className="text-[#1F2937]" />
            </button>
          </div>
        </div>
      </div>

      {/* Parts List - Light theme cards */}
      <div className="p-4 space-y-3 pb-24">
        {SAMPLE_PARTS.map(part => (
          <button 
            key={part.id} 
            onClick={() => handlePartClick(part)}
            className="w-full bg-white rounded-xl p-4 text-left shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex gap-3">
              {/* 3D Cube Icon */}
              <div className="w-14 h-14 bg-[#E8F4FD] rounded-lg flex items-center justify-center flex-shrink-0">
                <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                  <path d="M20 8L32 15V29L20 36L8 29V15L20 8Z" fill="#B3DDFF" stroke="#90CAF9" strokeWidth="1"/>
                  <path d="M20 8L32 15L20 22L8 15L20 8Z" fill="#DBEAFE"/>
                  <path d="M20 22V36L8 29V15L20 22Z" fill="#93C5FD"/>
                  <path d="M20 22V36L32 29V15L20 22Z" fill="#B3DDFF"/>
                </svg>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Name + Status badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#1F2937] font-semibold text-base truncate">{part.name}</h3>
                    <p className="text-[#9CA3AF] text-sm mt-0.5">{part.partId}</p>
                  </div>
                  {/* Unavailable badge - only show if unavailable */}
                  {part.status === 'Unavailable' && (
                    <span className="px-3 py-1 bg-[#FEF2F2] text-[#EF4444] text-xs font-medium rounded-full border border-[#FECACA] flex-shrink-0">
                      Unavailable
                    </span>
                  )}
                </div>
                
                {/* Description row - only if has description */}
                {part.description && (
                  <div className="flex items-center gap-2 mt-2">
                    <IconInfoCircle size={16} className="text-[#9CA3AF] flex-shrink-0" />
                    <span className="text-[#6B7280] text-sm truncate">{part.description}</span>
                  </div>
                )}
                
                {/* Category row */}
                <div className="flex items-center gap-2 mt-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                  </svg>
                  <span className="text-[#6B7280] text-sm">{part.category}</span>
                </div>
                
                {/* Bottom row: Qty + Price */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className="text-[#6B7280] text-sm">
                    Qty: <span className="text-[#1F2937] font-medium">{part.quantity !== null ? part.quantity.toFixed(2) : '-'}</span>
                  </span>
                  <span className="text-[#3B82F6] font-semibold text-base">{part.sellingPrice}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* FAB - Add Products */}
      <button
        onClick={() => setShowAddProducts(true)}
        className="fixed bottom-20 right-4 w-14 h-14 bg-[#F97316] rounded-full shadow-lg flex items-center justify-center z-30 active:scale-95 transition-transform"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* Bottom Navigation - Light theme iOS style */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-8 py-3 pb-6 flex items-center justify-around">
        <button className="p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <button className="w-6 h-6 rounded-full border-2 border-[#9CA3AF]"></button>
        <button>
          <IconChevronLeft size={24} className="text-[#9CA3AF]" />
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
        onApply={handleCategoryApply}
        initialSelections={categorySelections}
      />

      {/* Add Products Screen */}
      <AddProductsScreen
        isOpen={showAddProducts}
        onClose={() => setShowAddProducts(false)}
      />
    </div>
  );
}
