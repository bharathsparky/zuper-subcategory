import React, { useState } from 'react';
import { 
  IconX, 
  IconChevronRight, 
  IconChevronLeft,
  IconSearch,
  IconCheck,
  IconChevronDown,
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
  IconInfoCircle
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
function CategoryCard({ category, image, isSelected, onClick, subCount }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col rounded-xl overflow-hidden border ${
        isSelected ? 'border-[#F97316]' : 'border-[#3D4349]'
      }`}
    >
      <div className="h-24 bg-[#3D4955] flex items-center justify-center relative">
        {image ? (
          <img src={image} alt={category} className="w-full h-full object-cover" />
        ) : (
          <IconPhoto size={32} className="text-[#5B9BD5]" />
        )}
        {subCount > 0 && (
          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[11px] px-1.5 py-0.5 rounded flex items-center gap-0.5">
            <span>{subCount}</span>
            <IconChevronRight size={12} />
          </div>
        )}
      </div>
      <div className="py-3 px-2 bg-[#2D3339] text-center">
        <span className="text-white text-sm">{category}</span>
      </div>
    </button>
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

// Category Grid Picker (for Add Products) - Multi-select subcategories
function CategoryGridPicker({ isOpen, onClose, onSelect, selectedCategory, selectedSubCategories = [] }) {
  const [viewingCategory, setViewingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tempSelectedSubs, setTempSelectedSubs] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  
  // Initialize temp selection only when entering subcategory view
  React.useEffect(() => {
    if (viewingCategory) {
      const category = CATEGORIES.find(c => c.id === viewingCategory);
      if (selectedCategory === category?.name) {
        setTempSelectedSubs([...selectedSubCategories]);
        setSelectAll(selectedSubCategories.length === 0);
      } else {
        setTempSelectedSubs([]);
        setSelectAll(false);
      }
    }
  }, [viewingCategory]); // Only trigger when viewingCategory changes
  
  if (!isOpen) return null;

  const filteredCategories = CATEGORIES.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSubCategory = (subName) => {
    setSelectAll(false);
    setTempSelectedSubs(prev => 
      prev.includes(subName) 
        ? prev.filter(s => s !== subName)
        : [...prev, subName]
    );
  };

  const handleSelectAll = () => {
    setSelectAll(true);
    setTempSelectedSubs([]);
  };

  const handleApply = (categoryName) => {
    onSelect(categoryName, selectAll ? [] : tempSelectedSubs);
    setViewingCategory(null);
    onClose();
  };

  // Subcategory view with multi-select
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

        {/* Subcategory List with Checkboxes */}
        <div className="flex-1 overflow-y-auto">
          {/* All option */}
          <button
            onClick={handleSelectAll}
            className="w-full px-4 py-4 flex items-center gap-4 border-b border-[#2D3339] hover:bg-[#2D3339]"
          >
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
              selectAll ? 'bg-[#F97316] border-[#F97316]' : 'border-[#4B5563]'
            }`}>
              {selectAll && <IconCheck size={14} className="text-white" />}
            </div>
            <span className="text-white flex-1 text-left">All {category?.name}</span>
          </button>

          {/* Subcategory items */}
          {category?.subCategories.map(sub => {
            const isSelected = tempSelectedSubs.includes(sub.name);
            return (
              <button
                key={sub.id}
                onClick={() => toggleSubCategory(sub.name)}
                className="w-full px-4 py-4 flex items-center gap-4 border-b border-[#2D3339] hover:bg-[#2D3339]"
              >
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  isSelected ? 'bg-[#F97316] border-[#F97316]' : 'border-[#4B5563]'
                }`}>
                  {isSelected && <IconCheck size={14} className="text-white" />}
                </div>
                <span className="text-white flex-1 text-left">{sub.name}</span>
              </button>
            );
          })}
        </div>

        {/* Apply Button */}
        <div className="px-4 py-4 border-t border-[#2D3339]">
          <button 
            onClick={() => handleApply(category.name)}
            className="w-full bg-[#F97316] text-white font-medium py-3.5 rounded-lg"
          >
            Apply {tempSelectedSubs.length > 0 ? `(${tempSelectedSubs.length} selected)` : ''}
          </button>
        </div>
      </div>
    );
  }

  // Main category grid
  return (
    <div className="fixed inset-0 z-50 bg-[#1A1D21] text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#2D3339]">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-1">
            <IconX size={24} className="text-white" />
          </button>
          <h1 className="text-lg font-semibold">Select a category</h1>
        </div>
        <button className="p-1">
          <IconSearch size={24} className="text-white" />
        </button>
      </div>

      {/* Category Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredCategories.map(category => (
            <CategoryCard
              key={category.id}
              category={category.name}
              image={CATEGORY_IMAGES[category.name]}
              isSelected={selectedCategory === category.name}
              subCount={category.subCategories.length}
              onClick={() => {
                if (category.subCategories.length > 0) {
                  setViewingCategory(category.id);
                } else {
                  onSelect(category.name, null);
                  onClose();
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Add Products Screen
function AddProductsScreen({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'selected'
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]); // Multi-select
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

  const handleCategorySelect = (category, subCategories) => {
    setSelectedCategory(category);
    setSelectedSubCategories(subCategories || []);
  };

  const getCategoryDisplay = () => {
    if (!selectedCategory) return 'All Categories';
    if (selectedSubCategories.length > 0) {
      if (selectedSubCategories.length === 1) return selectedSubCategories[0];
      return `${selectedSubCategories.length} selected`;
    }
    return selectedCategory;
  };

  // Filter products
  const filteredProducts = SAMPLE_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    // Multi-select: if no subcategories selected, show all; otherwise filter by selected
    const matchesSubCategory = selectedSubCategories.length === 0 || 
                               selectedSubCategories.includes(product.subCategory);
    return matchesSearch && matchesCategory && matchesSubCategory;
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
        onSelect={handleCategorySelect}
        selectedCategory={selectedCategory}
        selectedSubCategories={selectedSubCategories}
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
  const [showAddProducts, setShowAddProducts] = useState(false);
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
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white text-xl font-semibold">Parts & Services</h1>
          <button 
            onClick={() => setShowAddProducts(true)}
            className="bg-[#F97316] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <IconPlus size={18} />
            Add Products
          </button>
        </div>
        
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

      {/* Add Products Screen */}
      <AddProductsScreen
        isOpen={showAddProducts}
        onClose={() => setShowAddProducts(false)}
      />
    </div>
  );
}
