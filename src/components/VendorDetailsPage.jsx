import React, { useState } from 'react';
import { 
  IconPhone, 
  IconMail, 
  IconPlus, 
  IconFileText,
  IconHome, 
  IconTag, 
  IconShoppingCartCopy,
  IconClipboardText, 
  IconHistory,
  IconSearch,
  IconChevronLeft,
  IconChevronRight,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
  IconDotsVertical,
  IconChevronDown,
  IconChevronUp,
  IconBuildingBank,
  IconPaperclip,
  IconChevronRight as IconBreadcrumbArrow,
  IconBox,
  IconNotes,
  IconX,
  IconPackage,
  IconTrash,
  IconPencil
} from '@tabler/icons-react';

// Line Item Picker Data (simplified for vendor)
const LINE_ITEMS_DATA = [
  { 
    id: 1, 
    itemId: '#ZP - 45345', 
    name: 'Drip edge', 
    category: 'Material', 
    type: 'Product', 
    availableQty: 905, 
    unit: 'Unit', 
    minQty: 14, 
    unitCost: 15500, 
    image: 'https://picsum.photos/seed/drip/44/44',
    options: [
      { id: 'opt1', name: 'White', color: '#FFFFFF', available: true },
      { id: 'opt2', name: 'Brown', color: '#8B4513', available: true },
      { id: 'opt3', name: 'Black', color: '#1a1a1a', available: true },
      { id: 'opt4', name: 'Charcoal', color: '#36454F', available: true },
    ]
  },
  { 
    id: 2, 
    itemId: '#ZP - 49', 
    name: 'FastTrack', 
    category: 'Water', 
    type: 'Part', 
    availableQty: 61.99, 
    unit: '', 
    minQty: 1, 
    unitCost: 10000, 
    image: null,
    options: null // No options
  },
  { 
    id: 3, 
    itemId: '#001 - P0543', 
    name: 'Mini generator', 
    category: 'Boat Smart Watches', 
    type: 'Part', 
    availableQty: -3, 
    unit: '', 
    minQty: 101, 
    unitCost: 12, 
    image: 'https://picsum.photos/seed/generator/44/44',
    options: null // No options
  },
  { 
    id: 4, 
    itemId: '#Part869745-632154578', 
    name: 'Test spec oil fuel random wording length', 
    category: 'Material', 
    type: 'Product', 
    availableQty: 0, 
    unit: '', 
    minQty: null, 
    unitCost: 100, 
    image: null,
    options: null // No options
  },
  { 
    id: 5, 
    itemId: '#SC002', 
    name: 'IKO Cambridge Shingles', 
    category: 'Shingles', 
    type: 'Product', 
    availableQty: 11.36, 
    unit: '', 
    minQty: 4, 
    unitCost: 3267, 
    image: null,
    options: [
      { id: 'opt1', name: 'Charcoal', color: '#36454F', available: true },
      { id: 'opt2', name: 'Weathered Wood', color: '#A0826D', available: true },
      { id: 'opt3', name: 'Desert Tan', color: '#C4A77D', available: true },
      { id: 'opt4', name: 'Dual Black', color: '#1a1a1a', available: true },
      { id: 'opt5', name: 'Slate', color: '#708090', available: true },
      { id: 'opt6', name: 'Driftwood', color: '#B8A082', available: true },
      { id: 'opt7', name: 'Barkwood', color: '#6B4423', available: true },
      { id: 'opt8', name: 'Shakewood', color: '#8B7355', available: false }, // Unavailable globally
    ]
  },
  { 
    id: 6, 
    itemId: '#PT - 12', 
    name: 'sample', 
    category: 'General', 
    type: 'Product', 
    availableQty: 25, 
    unit: '', 
    minQty: null, 
    unitCost: 50, 
    image: null,
    options: null // No options
  },
];

// Line Item Picker Modal
function LineItemPickerModal({ isOpen, onClose, onAddProduct }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [step, setStep] = useState(1); // Step 1: Select items, Step 2: Enter details
  const [selectedItems, setSelectedItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  // itemDetails now contains skuEntries array, each with its own options
  // { itemId: { skuEntries: [{ id, vendorSku, unitPurchaseCost, remarks, optionIds }] } }
  const [itemDetails, setItemDetails] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const totalPages = 80;

  // Get available options for an item (only where available = true)
  const getAvailableOptions = (item) => {
    if (!item.options || item.options.length === 0) return [];
    return item.options.filter(opt => opt.available);
  };

  // Get options already assigned to other SKUs for this item
  const getAssignedOptionIds = (itemId, excludeSkuId = null) => {
    const details = itemDetails[itemId];
    if (!details || !details.skuEntries) return [];
    return details.skuEntries
      .filter(sku => sku.id !== excludeSkuId)
      .flatMap(sku => sku.optionIds || []);
  };

  // Get unassigned options for an item
  const getUnassignedOptions = (item, excludeSkuId = null) => {
    const availableOpts = getAvailableOptions(item);
    const assignedIds = getAssignedOptionIds(item.id, excludeSkuId);
    return availableOpts.filter(opt => !assignedIds.includes(opt.id));
  };

  const handleItemSelect = (item, checked) => {
    if (checked) {
      setSelectedItems(prev => [...prev, item]);
      // Initialize with one SKU entry, all options selected by default
      const availableOpts = getAvailableOptions(item);
      setItemDetails(prev => ({
        ...prev,
        [item.id]: {
          skuEntries: [{
            id: `sku_${Date.now()}`,
            vendorSku: '',
            unitPurchaseCost: item.unitCost.toString(),
            remarks: '',
            optionIds: availableOpts.map(opt => opt.id)
          }]
        }
      }));
      setExpandedItems(prev => ({ ...prev, [item.id]: true }));
    } else {
      setSelectedItems(prev => prev.filter(i => i.id !== item.id));
      setItemDetails(prev => {
        const newDetails = { ...prev };
        delete newDetails[item.id];
        return newDetails;
      });
      setExpandedItems(prev => {
        const newExpanded = { ...prev };
        delete newExpanded[item.id];
        return newExpanded;
      });
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[item.id];
        return newErrors;
      });
    }
  };

  // Add a new SKU entry for an item
  const addSkuEntry = (itemId, item) => {
    const unassignedOpts = getUnassignedOptions(item);
    if (unassignedOpts.length === 0) return; // No more options to assign
    
    setItemDetails(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        skuEntries: [
          ...(prev[itemId]?.skuEntries || []),
          {
            id: `sku_${Date.now()}`,
            vendorSku: '',
            unitPurchaseCost: item.unitCost.toString(),
            remarks: '',
            optionIds: [] // User must select options for new SKU
          }
        ]
      }
    }));
  };

  // Remove a SKU entry
  const removeSkuEntry = (itemId, skuId) => {
    setItemDetails(prev => {
      const entries = prev[itemId]?.skuEntries || [];
      if (entries.length <= 1) return prev; // Keep at least one SKU
      return {
        ...prev,
        [itemId]: {
          ...prev[itemId],
          skuEntries: entries.filter(sku => sku.id !== skuId)
        }
      };
    });
  };

  // Update SKU entry field
  const updateSkuEntry = (itemId, skuId, field, value) => {
    setItemDetails(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        skuEntries: (prev[itemId]?.skuEntries || []).map(sku =>
          sku.id === skuId ? { ...sku, [field]: value } : sku
        )
      }
    }));
    // Clear validation error
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[`${itemId}_${skuId}`];
      return newErrors;
    });
  };

  // Toggle option for a specific SKU
  const toggleSkuOption = (itemId, skuId, optionId) => {
    setItemDetails(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        skuEntries: (prev[itemId]?.skuEntries || []).map(sku => {
          if (sku.id !== skuId) return sku;
          const currentOptions = sku.optionIds || [];
          const isSelected = currentOptions.includes(optionId);
          return {
            ...sku,
            optionIds: isSelected
              ? currentOptions.filter(id => id !== optionId)
              : [...currentOptions, optionId]
          };
        })
      }
    }));
    // Clear validation error
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[`${itemId}_${skuId}`];
      return newErrors;
    });
  };

  // Select all unassigned options for a SKU
  const selectAllForSku = (itemId, skuId, item) => {
    const unassignedOpts = getUnassignedOptions(item, skuId);
    const currentSku = itemDetails[itemId]?.skuEntries?.find(s => s.id === skuId);
    const currentOptions = currentSku?.optionIds || [];
    
    // Add all unassigned options to this SKU
    const allOptionIds = [...new Set([...currentOptions, ...unassignedOpts.map(o => o.id)])];
    
    setItemDetails(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        skuEntries: (prev[itemId]?.skuEntries || []).map(sku =>
          sku.id === skuId ? { ...sku, optionIds: allOptionIds } : sku
        )
      }
    }));
  };

  // Clear all options for a SKU
  const clearAllForSku = (itemId, skuId) => {
    setItemDetails(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        skuEntries: (prev[itemId]?.skuEntries || []).map(sku =>
          sku.id === skuId ? { ...sku, optionIds: [] } : sku
        )
      }
    }));
  };

  // Legacy functions for backward compatibility (no longer used)
  const toggleOptionSelection = () => {};
  const selectAllOptions = () => {};
  const clearAllOptions = () => {};

  const handleRemoveItem = (itemId) => {
    setSelectedItems(prev => prev.filter(i => i.id !== itemId));
    setItemDetails(prev => {
      const newDetails = { ...prev };
      delete newDetails[itemId];
      return newDetails;
    });
    setExpandedItems(prev => {
      const newExpanded = { ...prev };
      delete newExpanded[itemId];
      return newExpanded;
    });
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      // Remove all validation errors for this item
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith(itemId)) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });
  };

  const toggleItemExpanded = (itemId) => {
    setExpandedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const handleNext = () => {
    if (selectedItems.length > 0) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
    setValidationErrors({});
  };

  const handleAddItem = () => {
    // Validate each SKU entry - ensure required fields and at least one option
    const errors = {};
    selectedItems.forEach(item => {
      const availableOpts = getAvailableOptions(item);
      const skuEntries = itemDetails[item.id]?.skuEntries || [];
      
      skuEntries.forEach(sku => {
        // Validate Vendor SKU is filled
        if (!sku.vendorSku.trim()) {
          errors[`${item.id}_${sku.id}_sku`] = 'Vendor SKU is required';
        }
        // Validate at least one option if item has options
        if (availableOpts.length > 0 && (!sku.optionIds || sku.optionIds.length === 0)) {
          errors[`${item.id}_${sku.id}_options`] = `Select at least one option for this SKU`;
        }
      });
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Pass itemDetails which now contains skuEntries with linked options
    onAddProduct && onAddProduct(selectedItems, itemDetails);
    onClose();
    // Reset state
    setStep(1);
    setSelectedItems([]);
    setItemDetails({});
    setExpandedItems({});
    setValidationErrors({});
  };

  const handleClose = () => {
    onClose();
    // Reset state
    setStep(1);
    setSelectedItems([]);
    setItemDetails({});
    setExpandedItems({});
    setValidationErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[8px] w-[95vw] max-w-[1100px] max-h-[90vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="h-[56px] px-[24px] flex items-center border-b border-[#E2E8F0] shrink-0">
          <h2 className="text-[18px] font-semibold text-[#1E293B]">Add Item</h2>
        </div>

        {step === 1 ? (
          <>
            {/* Step 1: Item Selection */}
            {/* Filters */}
            <div className="px-[24px] py-[16px] flex items-center gap-[12px] border-b border-[#E2E8F0] shrink-0">
              {/* Search */}
              <div className="w-[280px] h-[40px] flex items-center gap-[8px] px-[12px] border border-[#E2E8F0] rounded-[6px] bg-white">
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
              <div className="w-[180px] h-[40px] flex items-center justify-between px-[12px] border border-[#E2E8F0] rounded-[6px] bg-white cursor-pointer hover:bg-[#F8FAFC]">
                <span className="text-[14px] text-[#94A3B8]">Product Type</span>
                <IconChevronDown size={16} stroke={1.5} className="text-[#94A3B8]" />
              </div>

              {/* Category Dropdown */}
              <div className="w-[180px] h-[40px] flex items-center justify-between px-[12px] border border-[#E2E8F0] rounded-[6px] bg-white cursor-pointer hover:bg-[#F8FAFC]">
                <span className="text-[14px] text-[#94A3B8]">Category</span>
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
                    <th className="w-[150px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">Category</th>
                    <th className="w-[100px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">Type</th>
                    <th className="w-[200px] text-left px-[12px] py-[14px] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider bg-white">Unit Purchase Price/Unit Cost (in USD)</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {LINE_ITEMS_DATA.filter(item => 
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.itemId.toLowerCase().includes(searchTerm.toLowerCase())
                  ).map((item) => (
                    <tr key={item.id} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC]">
                      <td className="px-[16px] py-[16px]">
                        <input
                          type="checkbox"
                          checked={selectedItems.some(i => i.id === item.id)}
                          onChange={(e) => handleItemSelect(item, e.target.checked)}
                          className="w-[16px] h-[16px] rounded border-[#CBD5E1] text-[#E44A19] focus:ring-[#E44A19] cursor-pointer"
                        />
                      </td>
                      <td className="px-[12px] py-[16px]">
                        <div className="flex items-center gap-[12px]">
                          <div className="w-[44px] h-[44px] bg-[#F1F5F9] rounded-[6px] flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {item.image ? (
                              <img src={item.image} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <IconPackage size={22} stroke={1.5} className="text-[#94A3B8]" />
                            )}
                          </div>
                          <div>
                            <div className="text-[13px] font-medium text-[#1E293B]">
                              {item.itemId} - {item.name}
                            </div>
                            <div className="text-[12px] text-[#64748B]">
                              Available Qty: {item.availableQty}{item.unit ? ` ${item.unit}` : ''}
                            </div>
                            {item.minQty !== null && (
                              <div className="text-[12px] text-[#64748B]">
                                Minimum Qty: {item.minQty}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-[12px] py-[16px] text-[13px] text-[#1E293B]">{item.category}</td>
                      <td className="px-[12px] py-[16px] text-[13px] text-[#1E293B]">{item.type}</td>
                      <td className="px-[12px] py-[16px] text-[13px] text-[#1E293B]">{item.unitCost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="h-[64px] px-[24px] flex items-center justify-end gap-[12px] border-t border-[#E2E8F0] shrink-0 bg-white">
              <button
                onClick={handleClose}
                className="h-[40px] px-[20px] border border-[#E2E8F0] rounded-[6px] text-[14px] font-medium text-[#334155] hover:bg-[#F8FAFC] transition-colors bg-white"
              >
                Cancel
              </button>
              <button
                onClick={handleNext}
                disabled={selectedItems.length === 0}
                className="h-[40px] px-[20px] bg-[#E44A19] rounded-[6px] text-[14px] font-medium text-white hover:bg-[#D13D0F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Step 2: Enter Item Details */}
            <div className="flex-1 overflow-auto min-h-0 p-[24px]">
              <div className="space-y-[16px]">
                {selectedItems.map((item) => (
                  <div key={item.id} className="border border-[#E2E8F0] rounded-[8px] overflow-hidden">
                    {/* Item Header */}
                    <div className="px-[16px] py-[12px] flex items-center justify-between bg-white">
                      <div className="flex items-center gap-[12px]">
                        <div className="w-[44px] h-[44px] bg-[#F1F5F9] rounded-[6px] flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {item.image ? (
                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <IconPackage size={22} stroke={1.5} className="text-[#94A3B8]" />
                          )}
                        </div>
                        <span className="text-[14px] font-medium text-[#1E293B]">
                          {item.itemId} - {item.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-[8px]">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="w-[32px] h-[32px] flex items-center justify-center rounded hover:bg-[#FEF2F2] transition-colors"
                        >
                          <IconTrash size={18} stroke={1.5} className="text-[#EF4444]" />
                        </button>
                        <button
                          onClick={() => toggleItemExpanded(item.id)}
                          className="w-[32px] h-[32px] flex items-center justify-center rounded hover:bg-[#F1F5F9] transition-colors"
                        >
                          {expandedItems[item.id] ? (
                            <IconChevronUp size={18} stroke={1.5} className="text-[#64748B]" />
                          ) : (
                            <IconChevronDown size={18} stroke={1.5} className="text-[#64748B]" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Item Details Form - SKU Entries with linked Options */}
                    {expandedItems[item.id] && (
                      <div className="px-[16px] pb-[16px] bg-white">
                        {(() => {
                          const skuEntries = itemDetails[item.id]?.skuEntries || [];
                          const availableOpts = getAvailableOptions(item);
                          const hasOptions = availableOpts.length > 0;
                          
                          return (
                            <div className="space-y-[16px]">
                              {skuEntries.map((sku, skuIndex) => {
                                // Get options available for this SKU (not assigned to other SKUs)
                                const assignedToOtherSkus = getAssignedOptionIds(item.id, sku.id);
                                const availableForThisSku = availableOpts.filter(
                                  opt => !assignedToOtherSkus.includes(opt.id) || (sku.optionIds || []).includes(opt.id)
                                );
                                const selectedCount = (sku.optionIds || []).length;
                                
                                return (
                                  <div key={sku.id} className={`${skuIndex > 0 ? 'pt-[16px] border-t border-[#E2E8F0]' : ''}`}>
                                    {/* SKU Header for multiple SKUs */}
                                    {skuEntries.length > 1 && (
                                      <div className="flex items-center justify-between mb-[12px]">
                                        <span className="text-[13px] font-semibold text-[#475569]">
                                          SKU {skuIndex + 1}
                                        </span>
                                        <button
                                          onClick={() => removeSkuEntry(item.id, sku.id)}
                                          className="text-[12px] text-[#EF4444] hover:text-[#DC2626] font-medium transition-colors"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    )}
                                    
                                    {/* Labels Row */}
                                    <div className="grid grid-cols-3 gap-[16px] mb-[8px]">
                                      <div>
                                        <label className="text-[13px] font-medium text-[#334155]">
                                          Vendor SKU <span className="text-[#EF4444]">*</span>
                                        </label>
                                      </div>
                                      <div>
                                        <label className="text-[13px] font-medium text-[#334155]">
                                          Unit Purchase Cost <span className="text-[#EF4444]">*</span>
                                        </label>
                                      </div>
                                      <div>
                                        <label className="text-[13px] font-medium text-[#334155]">
                                          Remarks
                                        </label>
                                      </div>
                                    </div>

                                    {/* Input Fields Row */}
                                    <div className="grid grid-cols-3 gap-[16px]">
                                      <div>
                                        <input
                                          type="text"
                                          placeholder="Eg: IKOCAMB-STD"
                                          value={sku.vendorSku}
                                          onChange={(e) => updateSkuEntry(item.id, sku.id, 'vendorSku', e.target.value)}
                                          className={`w-full h-[40px] px-[12px] border rounded-[6px] text-[14px] text-[#334155] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6] ${
                                            validationErrors[`${item.id}_${sku.id}_sku`] ? 'border-[#EF4444]' : 'border-[#E2E8F0]'
                                          }`}
                                        />
                                        {validationErrors[`${item.id}_${sku.id}_sku`] && (
                                          <div className="mt-[4px] text-[12px] text-[#EF4444]">
                                            {validationErrors[`${item.id}_${sku.id}_sku`]}
                                          </div>
                                        )}
                                      </div>
                                      <div className="flex">
                                        <div className="h-[40px] px-[12px] flex items-center bg-[#F8FAFC] border border-r-0 border-[#E2E8F0] rounded-l-[6px] text-[14px] text-[#64748B]">
                                          USD
                                        </div>
                                        <input
                                          type="text"
                                          value={sku.unitPurchaseCost}
                                          onChange={(e) => updateSkuEntry(item.id, sku.id, 'unitPurchaseCost', e.target.value)}
                                          className="flex-1 h-[40px] px-[12px] border border-[#E2E8F0] rounded-r-[6px] text-[14px] text-[#334155] outline-none focus:border-[#3B82F6]"
                                        />
                                      </div>
                                      <div>
                                        <input
                                          type="text"
                                          placeholder="Notes..."
                                          value={sku.remarks}
                                          onChange={(e) => updateSkuEntry(item.id, sku.id, 'remarks', e.target.value)}
                                          className="w-full h-[40px] px-[12px] border border-[#E2E8F0] rounded-[6px] text-[14px] text-[#334155] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6]"
                                        />
                                      </div>
                                    </div>

                                    {/* Options Selection for this SKU - Only show for items with options */}
                                    {hasOptions && (
                                      <div className="mt-[16px]">
                                        {/* Options Header */}
                                        <div className="flex items-center justify-between mb-[10px]">
                                          <div className="flex items-center gap-[8px]">
                                            <span className="text-[13px] font-medium text-[#334155]">
                                              Options for this SKU
                                            </span>
                                            <span className="text-[12px] text-[#64748B]">
                                              ({selectedCount} of {availableForThisSku.length} selected)
                                            </span>
                                          </div>
                                          <div className="flex items-center gap-[12px]">
                                            <button
                                              onClick={() => selectAllForSku(item.id, sku.id, item)}
                                              className="text-[12px] text-[#3B82F6] hover:text-[#2563EB] font-medium transition-colors"
                                            >
                                              Select All
                                            </button>
                                            <button
                                              onClick={() => clearAllForSku(item.id, sku.id)}
                                              className="text-[12px] text-[#64748B] hover:text-[#334155] font-medium transition-colors"
                                            >
                                              Clear
                                            </button>
                                          </div>
                                        </div>

                                        {/* Options Grid - Compact with swatches and names */}
                                        <div className="flex flex-wrap gap-[8px]">
                                          {availableForThisSku.map((option) => {
                                            const isSelected = (sku.optionIds || []).includes(option.id);
                                            return (
                                              <div
                                                key={option.id}
                                                onClick={() => toggleSkuOption(item.id, sku.id, option.id)}
                                                className={`
                                                  flex items-center gap-[8px] px-[10px] py-[6px] rounded-[6px] border cursor-pointer transition-all
                                                  ${isSelected 
                                                    ? 'border-[#E44A19] bg-[#FEF7F5]' 
                                                    : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
                                                  }
                                                `}
                                              >
                                                <input
                                                  type="checkbox"
                                                  checked={isSelected}
                                                  onChange={() => {}}
                                                  className="w-[14px] h-[14px] rounded border-[#CBD5E1] text-[#E44A19] focus:ring-[#E44A19] cursor-pointer"
                                                />
                                                <div 
                                                  className="w-[20px] h-[20px] rounded-[4px] border border-[#E2E8F0] flex-shrink-0"
                                                  style={{ backgroundColor: option.color || '#CBD5E1' }}
                                                />
                                                <span className="text-[13px] text-[#334155] font-medium whitespace-nowrap">
                                                  {option.name}
                                                </span>
                                              </div>
                                            );
                                          })}
                                        </div>

                                        {/* Validation Error */}
                                        {validationErrors[`${item.id}_${sku.id}_options`] && (
                                          <div className="mt-[8px] text-[12px] text-[#EF4444]">
                                            {validationErrors[`${item.id}_${sku.id}_options`]}
                                          </div>
                                        )}
                                        
                                        {/* Show assigned options info if some are unavailable */}
                                        {assignedToOtherSkus.length > 0 && skuEntries.length > 1 && (
                                          <div className="mt-[8px] text-[11px] text-[#94A3B8]">
                                            {assignedToOtherSkus.length} option(s) already assigned to other SKUs
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                              
                              {/* Add SKU Button - Only show if there are unassigned options OR no options at all */}
                              {(() => {
                                const unassignedOpts = getUnassignedOptions(item);
                                const canAddSku = !hasOptions || unassignedOpts.length > 0;
                                
                                if (!canAddSku) return null;
                                
                                return (
                                  <div className="pt-[12px] border-t border-dashed border-[#E2E8F0]">
                                    <button 
                                      onClick={() => addSkuEntry(item.id, item)}
                                      className="flex items-center gap-[6px] text-[13px] font-medium text-[#3B82F6] hover:text-[#2563EB] transition-colors"
                                    >
                                      <IconPlus size={16} stroke={2} />
                                      Add another SKU
                                      {hasOptions && unassignedOpts.length > 0 && (
                                        <span className="text-[11px] text-[#94A3B8] ml-[4px]">
                                          ({unassignedOpts.length} options available)
                                        </span>
                                      )}
                                    </button>
                                  </div>
                                );
                              })()}
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="h-[64px] px-[24px] flex items-center justify-end gap-[12px] border-t border-[#E2E8F0] shrink-0 bg-white">
              <button
                onClick={handleClose}
                className="h-[40px] px-[20px] border border-[#E2E8F0] rounded-[6px] text-[14px] font-medium text-[#334155] hover:bg-[#F8FAFC] transition-colors bg-white"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                className="h-[40px] px-[20px] bg-[#E44A19] rounded-[6px] text-[14px] font-medium text-white hover:bg-[#D13D0F] transition-colors"
              >
                Add Item
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Product images - using placeholder shingle textures (dark gray/charcoal)
const SHINGLE_IMAGE = 'data:image/svg+xml,' + encodeURIComponent(`
<svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="42" height="42" fill="#4A4A4A"/>
  <rect x="0" y="0" width="14" height="10" fill="#3A3A3A"/>
  <rect x="14" y="0" width="14" height="10" fill="#454545"/>
  <rect x="28" y="0" width="14" height="10" fill="#3A3A3A"/>
  <rect x="7" y="10" width="14" height="10" fill="#454545"/>
  <rect x="21" y="10" width="14" height="10" fill="#3A3A3A"/>
  <rect x="35" y="10" width="7" height="10" fill="#454545"/>
  <rect x="0" y="20" width="14" height="10" fill="#3A3A3A"/>
  <rect x="14" y="20" width="14" height="10" fill="#454545"/>
  <rect x="28" y="20" width="14" height="10" fill="#3A3A3A"/>
  <rect x="7" y="30" width="14" height="12" fill="#454545"/>
  <rect x="21" y="30" width="14" height="12" fill="#3A3A3A"/>
</svg>
`);

// Shingle color options available in Part Master
const SHINGLE_OPTIONS = [
  { id: 'opt1', name: 'Charcoal', color: '#36454F', available: true },
  { id: 'opt2', name: 'Weathered Wood', color: '#A0826D', available: true },
  { id: 'opt3', name: 'Desert Tan', color: '#C4A77D', available: true },
  { id: 'opt4', name: 'Dual Black', color: '#1a1a1a', available: true },
  { id: 'opt5', name: 'Slate', color: '#708090', available: true },
  { id: 'opt6', name: 'Driftwood', color: '#B8A082', available: true },
  { id: 'opt7', name: 'Barkwood', color: '#6B4423', available: true },
  { id: 'opt8', name: 'Estate Gray', color: '#5A5A5A', available: true },
];

// Mock data for products - now using skuEntries with linked options
const MOCK_PRODUCTS = [
  { 
    id: 1, 
    sku: '#12345 - PLACEHOLDER', 
    category: 'Sidewall SWA', 
    image: null, 
    options: null,
    skuEntries: [
      { id: 'sku_1', vendorSku: 'PLACEHOLDER', unitCost: '$0.00', remarks: '---', optionIds: [] }
    ]
  },
  { 
    id: 2, 
    sku: '#ASP.SHI.24109 - IKO - Architectural - Cambridg...', 
    category: 'Shingles SHI', 
    image: SHINGLE_IMAGE,
    options: SHINGLE_OPTIONS,
    // Multiple SKUs with different price points and color groups
    skuEntries: [
      { 
        id: 'sku_2a', 
        vendorSku: 'IKOCAMB-STD', 
        unitCost: '$32.67', 
        remarks: 'Standard colors',
        optionIds: ['opt1', 'opt2', 'opt4', 'opt7'] // Charcoal, Weathered Wood, Dual Black, Barkwood
      },
      { 
        id: 'sku_2b', 
        vendorSku: 'IKOCAMB-PREM', 
        unitCost: '$35.00', 
        remarks: 'Premium colors',
        optionIds: ['opt3', 'opt5', 'opt6'] // Desert Tan, Slate, Driftwood
      }
    ]
  },
  { 
    id: 3, 
    sku: '#ASP.SHI.40918 - IKO - Architectural - Cambridg...', 
    category: 'Shingles SHI', 
    image: SHINGLE_IMAGE,
    options: SHINGLE_OPTIONS,
    // Single SKU with all colors
    skuEntries: [
      { 
        id: 'sku_3a', 
        vendorSku: 'IKOCABEN', 
        unitCost: '$32.67', 
        remarks: '---',
        optionIds: ['opt1', 'opt2', 'opt3', 'opt4', 'opt5', 'opt6', 'opt7', 'opt8'] // All 8 colors
      }
    ]
  },
  { id: 4, sku: '#ASP.SHI.74824 - IKO - Architectural - Cambridg...', category: 'Shingles SHI', image: SHINGLE_IMAGE, options: null, skuEntries: [{ id: 'sku_4', vendorSku: 'IKOCABEN', unitCost: '$32.67', remarks: '---', optionIds: [] }] },
  { id: 5, sku: '#ASP.SHI.95785 - IKO - Architectural - Cambridg...', category: 'Shingles SHI', image: SHINGLE_IMAGE, options: null, skuEntries: [{ id: 'sku_5', vendorSku: 'IKOCABEN', unitCost: '$32.67', remarks: '---', optionIds: [] }] },
  { id: 6, sku: '#ASP.SHI.48522 - IKO - Architectural - Cambridg...', category: 'Shingles SHI', image: SHINGLE_IMAGE, options: null, skuEntries: [{ id: 'sku_6', vendorSku: 'IKOCABEN', unitCost: '$32.67', remarks: '---', optionIds: [] }] },
  { id: 7, sku: '#ASP.SHI.73459 - IKO - Architectural - Cambridg...', category: 'Shingles SHI', image: SHINGLE_IMAGE, options: null, skuEntries: [{ id: 'sku_7', vendorSku: 'IKOCABEN', unitCost: '$32.67', remarks: '---', optionIds: [] }] },
  { id: 8, sku: '#ASP.SHI.86264 - IKO - Architectural - Cambridg...', category: 'Shingles SHI', image: null, options: null, skuEntries: [{ id: 'sku_8', vendorSku: 'IKOCABEN', unitCost: '$32.67', remarks: '---', optionIds: [] }] },
  { id: 9, sku: '#ASP.SHI.31413 - IKO - Architectural - Cambridge...', category: 'Shingles SHI', image: null, options: null, skuEntries: [{ id: 'sku_9', vendorSku: 'IKOCABEN', unitCost: '$32.67', remarks: '---', optionIds: [] }] },
  { id: 10, sku: '#ASP.SHI.74281 - IKO - Architectural - Cambridg...', category: 'Shingles SHI', image: null, options: null, skuEntries: [{ id: 'sku_10', vendorSku: 'IKOCABEN', unitCost: '$32.67', remarks: '---', optionIds: [] }] },
];

// Vendor data
const VENDOR_DATA = {
  id: '22',
  name: 'SRS',
  status: 'Active',
  address: '2318 North 23rd Street, Wilmington, North Carolina, United States, 28405',
};

// Edit Options Modal Component - Now works with SKU-specific options
function EditOptionsModal({ isOpen, onClose, product, onSave }) {
  const [selectedOptionIds, setSelectedOptionIds] = useState([]);
  const [validationError, setValidationError] = useState('');

  // Get the SKU being edited
  const editingSkuId = product?.editingSkuId;
  const editingSku = product?.skuEntries?.find(s => s.id === editingSkuId);
  
  // Get options assigned to OTHER SKUs (can't be selected for this SKU)
  const getOtherSkuOptionIds = () => {
    if (!product?.skuEntries || !editingSkuId) return [];
    return product.skuEntries
      .filter(s => s.id !== editingSkuId)
      .flatMap(s => s.optionIds || []);
  };

  // Initialize selected options when modal opens
  React.useEffect(() => {
    if (isOpen && product && editingSku) {
      setSelectedOptionIds(editingSku.optionIds || []);
      setValidationError('');
    }
  }, [isOpen, product, editingSku]);

  if (!isOpen || !product || !editingSku) return null;

  const availableOptions = (product.options || []).filter(opt => opt.available);
  const otherSkuOptionIds = getOtherSkuOptionIds();
  // Options available for this SKU (not assigned to other SKUs OR already in this SKU)
  const selectableOptions = availableOptions.filter(
    opt => !otherSkuOptionIds.includes(opt.id) || selectedOptionIds.includes(opt.id)
  );
  const selectedCount = selectedOptionIds.length;
  const totalCount = selectableOptions.length;

  const toggleOption = (optionId) => {
    setSelectedOptionIds(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      } else {
        return [...prev, optionId];
      }
    });
    setValidationError('');
  };

  const selectAll = () => {
    setSelectedOptionIds(selectableOptions.map(opt => opt.id));
    setValidationError('');
  };

  const clearAll = () => {
    setSelectedOptionIds([]);
  };

  const handleSave = () => {
    if (selectedOptionIds.length === 0) {
      setValidationError('Select at least one option');
      return;
    }
    onSave(product.id, editingSkuId, selectedOptionIds);
    onClose();
  };

  // Get product name from SKU
  const productName = product.sku.split(' - ').slice(1).join(' - ') || product.sku;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[8px] w-[95vw] max-w-[700px] max-h-[90vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="h-[56px] px-[24px] flex items-center justify-between border-b border-[#E2E8F0] shrink-0">
          <h2 className="text-[18px] font-semibold text-[#1E293B]">Edit Options</h2>
          <button
            onClick={onClose}
            className="w-[32px] h-[32px] flex items-center justify-center rounded hover:bg-[#F1F5F9] transition-colors"
          >
            <IconX size={20} stroke={1.5} className="text-[#64748B]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto min-h-0 p-[24px]">
          {/* Product & SKU Info */}
          <div className="mb-[16px] p-[12px] bg-[#F8FAFC] rounded-[6px]">
            <div className="text-[14px] font-medium text-[#1E293B] truncate mb-[4px]">{product.sku}</div>
            <div className="flex items-center gap-[8px] text-[13px]">
              <span className="text-[#64748B]">Editing options for SKU:</span>
              <span className="font-semibold text-[#334155]">{editingSku.vendorSku}</span>
              <span className="text-[#94A3B8]">({editingSku.unitCost})</span>
            </div>
          </div>

          {/* Options Header */}
          <div className="flex items-center justify-between mb-[16px]">
            <div className="flex items-center gap-[8px]">
              <span className="text-[13px] font-medium text-[#334155]">
                Select options for this SKU
              </span>
              <span className="text-[12px] text-[#64748B]">
                ({selectedCount} of {totalCount} selected)
              </span>
            </div>
          </div>

          {/* Info about other SKU assignments */}
          {otherSkuOptionIds.length > 0 && (
            <div className="mb-[12px] text-[12px] text-[#94A3B8]">
              {otherSkuOptionIds.length} option(s) assigned to other SKUs are not shown
            </div>
          )}

          {/* Options Grid */}
          <div className="grid grid-cols-4 gap-[12px] mb-[16px]">
            {selectableOptions.map((option) => {
              const isSelected = selectedOptionIds.includes(option.id);
              return (
                <div
                  key={option.id}
                  onClick={() => toggleOption(option.id)}
                  className={`
                    relative p-[12px] rounded-[8px] border cursor-pointer transition-all
                    ${isSelected 
                      ? 'border-[#E44A19] bg-[#FEF7F5]' 
                      : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
                    }
                  `}
                >
                  {/* Checkbox */}
                  <div className="absolute top-[8px] left-[8px]">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="w-[16px] h-[16px] rounded border-[#CBD5E1] text-[#E44A19] focus:ring-[#E44A19] cursor-pointer"
                    />
                  </div>
                  
                  {/* Option Color Swatch */}
                  <div 
                    className="w-[48px] h-[48px] mx-auto mb-[8px] rounded-[6px] overflow-hidden border border-[#E2E8F0]"
                    style={{ backgroundColor: option.color || '#CBD5E1' }}
                  />
                  
                  {/* Option Name */}
                  <div className="text-[12px] text-center text-[#334155] font-medium truncate">
                    {option.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-[16px]">
            <button
              onClick={selectAll}
              className="text-[13px] text-[#3B82F6] hover:text-[#2563EB] font-medium transition-colors"
            >
              Select All
            </button>
            <button
              onClick={clearAll}
              className="text-[13px] text-[#64748B] hover:text-[#334155] font-medium transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* Validation Error */}
          {validationError && (
            <div className="mt-[12px] text-[13px] text-[#EF4444]">
              {validationError}
            </div>
          )}
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
            onClick={handleSave}
            className="h-[40px] px-[20px] bg-[#E44A19] rounded-[6px] text-[14px] font-medium text-white hover:bg-[#D13D0F] transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

function VendorDetailsPage({ onBack }) {
  const [activeTab, setActiveTab] = useState('product-catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLineItemPickerOpen, setIsLineItemPickerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState([2]); // Default expanded row 2 like in Figma
  const [products, setProducts] = useState(MOCK_PRODUCTS); // State for products to enable editing
  const [editOptionsProduct, setEditOptionsProduct] = useState(null); // Product being edited
  const totalPages = 17;

  // Handle saving options from edit modal - now updates specific SKU's options
  const handleSaveOptions = (productId, skuId, selectedOptionIds) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== productId) return p;
      return {
        ...p,
        skuEntries: (p.skuEntries || []).map(sku =>
          sku.id === skuId ? { ...sku, optionIds: selectedOptionIds } : sku
        )
      };
    }));
  };
  
  const toggleRowExpand = (productId) => {
    setExpandedRows(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const navItems = [
    { id: 'details', label: 'Details', icon: IconHome, count: null },
    { id: 'product-catalog', label: 'Product Catalog', icon: IconTag, count: 161 },
    { id: 'purchase-orders', label: 'Purchase Orders', icon: IconShoppingCartCopy, count: 17 },
    { id: 'notes', label: 'Notes', icon: IconClipboardText, count: null },
    { id: 'activity', label: 'Activity', icon: IconHistory, count: null },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Breadcrumb Header */}
      <div className="h-[49px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-[21px]">
        <div className="flex items-center gap-[14px]">
          <span className="text-[14px] text-[#64748B]">Vendors</span>
          <IconBreadcrumbArrow size={21} className="text-[#94A3B8]" />
          <span className="text-[14px] text-[#1E293B] font-medium">22 - SRS</span>
        </div>
        <button className="px-[15px] py-[7px] border border-[#E2E8F0] rounded-[4px] text-[14px] text-[#64748B] hover:bg-[#F8FAFC] transition-colors flex items-center gap-[7px]">
          More Actions
          <IconChevronDown size={13} className="text-[#64748B]" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Vendor Info */}
        <div className="w-[336px] bg-white border-r border-[#E2E8F0] flex flex-col">
          {/* Vendor Header */}
          <div className="p-[24px] border-b border-[#E2E8F0]">
            {/* ID and Status */}
            <div className="flex items-center justify-between mb-[14px]">
              <span className="text-[21px] font-semibold text-[#1E293B]">{VENDOR_DATA.id}</span>
              <span className="px-[10px] py-[4px] bg-[#DCFCE7] text-[#16A34A] text-[13px] font-medium rounded-[4px]">
                {VENDOR_DATA.status}
              </span>
            </div>
            
            {/* Vendor Name */}
            <h2 className="text-[18px] font-semibold text-[#1E293B] text-center mb-[7px]">{VENDOR_DATA.name}</h2>
            
            {/* Address */}
            <p className="text-[13px] text-[#64748B] text-center leading-[1.5]">{VENDOR_DATA.address}</p>
          </div>

          {/* Quick Actions */}
          <div className="p-[14px] border-b border-[#E2E8F0]">
            <div className="flex justify-center gap-[24px]">
              <button className="flex flex-col items-center gap-[6px] group">
                <div className="w-[38px] h-[38px] rounded-full bg-[#FEF2F2] flex items-center justify-center group-hover:bg-[#FEE2E2] transition-colors">
                  <IconPhone size={20} className="text-[#EA580C]" />
                </div>
                <span className="text-[12px] text-[#64748B]">Call</span>
              </button>
              <button className="flex flex-col items-center gap-[6px] group">
                <div className="w-[38px] h-[38px] rounded-full bg-[#FEF2F2] flex items-center justify-center group-hover:bg-[#FEE2E2] transition-colors">
                  <IconMail size={20} className="text-[#EA580C]" />
                </div>
                <span className="text-[12px] text-[#64748B]">Mail</span>
              </button>
              <button className="flex flex-col items-center gap-[6px] group">
                <div className="w-[38px] h-[38px] rounded-full bg-[#FEF2F2] flex items-center justify-center group-hover:bg-[#FEE2E2] transition-colors">
                  <IconPlus size={20} className="text-[#EA580C]" />
                </div>
                <span className="text-[12px] text-[#64748B]">New PO</span>
              </button>
              <button className="flex flex-col items-center gap-[6px] group">
                <div className="w-[38px] h-[38px] rounded-full bg-[#FEF2F2] flex items-center justify-center group-hover:bg-[#FEE2E2] transition-colors">
                  <IconNotes size={20} className="text-[#EA580C]" />
                </div>
                <span className="text-[12px] text-[#64748B]">Add Note</span>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-[14px]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-[17px] py-[14px] rounded-[4px] mb-[3.5px] transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#EFF6FF] text-[#3B82F6]'
                    : 'text-[#64748B] hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center gap-[7px]">
                  <item.icon size={20} stroke={1.5} />
                  <span className="text-[14px] font-semibold">{item.label}</span>
                </div>
                {item.count !== null && (
                  <span className={`text-[13px] px-[7px] py-[3px] rounded-[4px] ${
                    activeTab === item.id
                      ? 'bg-[#DBEAFE] text-[#3B82F6]'
                      : 'bg-[#F1F5F9] text-[#64748B]'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content - Product Catalog */}
        <div className="flex-1 p-[14px] overflow-auto">
          <div className="bg-white rounded-[4px] shadow-sm h-full">
            {/* Table Header */}
            <div className="p-[14px] flex items-center justify-between">
              {/* Search */}
              <div className="relative">
                <IconSearch size={14} className="absolute left-[10px] top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="text"
                  placeholder="Search by Product na..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[180px] h-[35px] pl-[32px] pr-[14px] border border-[#E2E8F0] rounded-[4px] text-[13px] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              {/* Pagination and Add Button */}
              <div className="flex items-center gap-[14px]">
                <div className="flex items-center gap-[7px]">
                  <span className="text-[13px] text-[#64748B]">Page {currentPage} of {totalPages}</span>
                  <div className="flex items-center">
                    <button 
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      className="w-[35px] h-[35px] flex items-center justify-center hover:bg-[#F8FAFC] rounded-[4px] disabled:opacity-40"
                    >
                      <IconPlayerSkipBack size={18} className="text-[#64748B]" />
                    </button>
                    <button 
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="w-[35px] h-[35px] flex items-center justify-center hover:bg-[#F8FAFC] rounded-[4px] disabled:opacity-40"
                    >
                      <IconChevronLeft size={18} className="text-[#64748B]" />
                    </button>
                    <button 
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="w-[35px] h-[35px] flex items-center justify-center hover:bg-[#F8FAFC] rounded-[4px] disabled:opacity-40"
                    >
                      <IconChevronRight size={18} className="text-[#64748B]" />
                    </button>
                    <button 
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      className="w-[35px] h-[35px] flex items-center justify-center hover:bg-[#F8FAFC] rounded-[4px] disabled:opacity-40"
                    >
                      <IconPlayerSkipForward size={18} className="text-[#64748B]" />
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => setIsLineItemPickerOpen(true)}
                  className="h-[31px] px-[14px] bg-[#E44A19] text-white rounded-[4px] text-[13px] font-medium flex items-center gap-[7px] hover:bg-[#D43D12] transition-colors"
                >
                  <IconPlus size={13} />
                  Add
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-auto">
              {/* Table Header Row */}
              <div className="border-y border-[#E2E8F0] px-[35px] py-[10px] flex items-center">
                <div className="w-[45%] text-[12px] font-medium text-[#64748B]">Item</div>
                <div className="w-[35%] text-[12px] font-medium text-[#64748B]">Category</div>
                <div className="w-[20%] text-[12px] font-medium text-[#64748B] text-center">Actions</div>
              </div>

              {/* Table Body */}
              {products.map((product) => {
                const isExpanded = expandedRows.includes(product.id);
                const availableOptions = (product.options || []).filter(opt => opt.available);
                const hasOptions = availableOptions.length > 0;
                const skuEntries = product.skuEntries || [];
                const maxVisibleSwatches = 6;
                
                return (
                  <div key={product.id} className="border-b border-[#E2E8F0]">
                    <div 
                      className="px-[14px] py-[7px] flex items-center hover:bg-[#F8FAFC] transition-colors"
                    >
                      <div className="w-[45%] flex items-center gap-[14px] pl-[21px]">
                        {/* Product Image */}
                        <div className="w-[42px] h-[42px] rounded-[4px] bg-[#F1F5F9] overflow-hidden flex-shrink-0">
                          {product.image ? (
                            <img src={product.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <IconBox size={20} className="text-[#94A3B8]" />
                            </div>
                          )}
                        </div>
                        {/* Product SKU */}
                        <span className="text-[14px] text-[#1E293B] truncate">{product.sku}</span>
                      </div>
                      <div className="w-[35%] text-[14px] text-[#64748B]">{product.category}</div>
                      <div className="w-[20%] flex items-center justify-center gap-[14px]">
                        <button className="p-[7px] hover:bg-[#F1F5F9] rounded-[4px] transition-colors">
                          <IconDotsVertical size={18} className="text-[#94A3B8]" />
                        </button>
                        <button 
                          onClick={() => toggleRowExpand(product.id)}
                          className="p-[7px] hover:bg-[#F1F5F9] rounded-[4px] transition-colors"
                        >
                          <IconChevronDown 
                            size={18} 
                            className={`text-[#94A3B8] transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                          />
                        </button>
                      </div>
                    </div>
                    
                    {/* Expanded Details - SKU Groups with linked Options */}
                    {isExpanded && (
                      <div className="bg-white border-t border-[#E2E8F0]">
                        {/* Header Row */}
                        <div className="flex border-b border-[#E2E8F0] text-[13px] font-medium text-[#64748B]">
                          <div className="w-[25%] py-[10px] px-[14px] pl-[35px]">Vendor SKU</div>
                          <div className="w-[20%] py-[10px] px-[14px]">Price</div>
                          <div className="w-[20%] py-[10px] px-[14px]">Remarks</div>
                          <div className="w-[35%] py-[10px] px-[14px]">{hasOptions ? 'Options' : ''}</div>
                        </div>
                        
                        {/* SKU Entry Rows */}
                        {skuEntries.map((sku, skuIdx) => {
                          const skuOptions = hasOptions 
                            ? availableOptions.filter(opt => (sku.optionIds || []).includes(opt.id))
                            : [];
                          const visibleOptions = skuOptions.slice(0, maxVisibleSwatches);
                          const overflowCount = skuOptions.length - maxVisibleSwatches;
                          
                          return (
                            <div 
                              key={sku.id} 
                              className={`flex text-[13px] text-[#1E293B] ${skuIdx > 0 ? 'border-t border-dashed border-[#E2E8F0]' : ''} ${skuIdx % 2 === 1 ? 'bg-[#FAFAFA]' : ''}`}
                            >
                              <div className="w-[25%] py-[12px] px-[14px] pl-[35px] font-medium">
                                {sku.vendorSku}
                              </div>
                              <div className="w-[20%] py-[12px] px-[14px]">
                                {sku.unitCost}
                              </div>
                              <div className="w-[20%] py-[12px] px-[14px] text-[#64748B]">
                                {sku.remarks || '---'}
                              </div>
                              <div className="w-[35%] py-[10px] px-[14px] flex items-center">
                                {hasOptions && skuOptions.length > 0 && (
                                  <div className="flex items-center gap-[8px] flex-1">
                                    {/* Option Swatches with Names */}
                                    <div className="flex items-center gap-[6px] flex-wrap">
                                      {visibleOptions.map((option) => (
                                        <div
                                          key={option.id}
                                          className="relative group flex items-center gap-[4px] px-[6px] py-[3px] rounded-[4px] bg-[#F8FAFC] border border-[#E2E8F0]"
                                        >
                                          <div 
                                            className="w-[16px] h-[16px] rounded-[2px] border border-[#E2E8F0] flex-shrink-0"
                                            style={{ backgroundColor: option.color || '#CBD5E1' }}
                                          />
                                          <span className="text-[11px] text-[#475569] font-medium whitespace-nowrap">
                                            {option.name}
                                          </span>
                                        </div>
                                      ))}
                                      
                                      {/* Overflow indicator */}
                                      {overflowCount > 0 && (
                                        <div className="relative group">
                                          <div className="px-[6px] py-[3px] rounded-[4px] border border-[#E2E8F0] bg-[#F1F5F9] text-[11px] font-medium text-[#64748B] cursor-default">
                                            +{overflowCount} more
                                          </div>
                                          {/* Overflow Tooltip */}
                                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[6px] px-[8px] py-[6px] bg-[#1E293B] text-white text-[11px] rounded-[4px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 max-w-[200px]">
                                            {skuOptions.slice(maxVisibleSwatches).map(opt => opt.name).join(', ')}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1E293B]" />
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                    
                                    {/* Edit Button */}
                                    <button
                                      onClick={() => setEditOptionsProduct({ ...product, editingSkuId: sku.id })}
                                      className="w-[24px] h-[24px] flex items-center justify-center rounded-[4px] hover:bg-[#E2E8F0] transition-colors ml-auto flex-shrink-0"
                                      title="Edit options"
                                    >
                                      <IconPencil size={14} stroke={1.5} className="text-[#64748B]" />
                                    </button>
                                  </div>
                                )}
                                {hasOptions && skuOptions.length === 0 && (
                                  <span className="text-[12px] text-[#94A3B8] italic">No options selected</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                        
                        {/* Add SKU button for products with options */}
                        {hasOptions && (
                          <div className="py-[10px] px-[14px] pl-[35px] border-t border-dashed border-[#E2E8F0] bg-[#FAFAFA]">
                            <button 
                              onClick={() => {/* TODO: Add new SKU to existing product */}}
                              className="text-[12px] font-medium text-[#3B82F6] hover:text-[#2563EB] transition-colors flex items-center gap-[4px]"
                            >
                              <IconPlus size={14} stroke={2} />
                              Add another SKU
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[343px] bg-white border-l border-[#E2E8F0] flex">
          {/* Sidebar Content */}
          <div className="flex-1 p-[7px]">
            {/* Bank Details Section */}
            <div className="mb-[7px]">
              <button className="w-full flex items-center justify-between p-[7px] hover:bg-[#F8FAFC] rounded-[4px] transition-colors">
                <div className="flex items-center gap-[7px]">
                  <IconBuildingBank size={21} className="text-[#64748B]" />
                  <span className="text-[14px] font-medium text-[#1E293B]">Bank Details</span>
                </div>
                <IconChevronDown size={12} className="text-[#94A3B8] rotate-180" />
              </button>
              
              {/* Bank Details Empty State */}
              <div className="py-[21px] flex flex-col items-center">
                {/* Illustration - matching Figma */}
                <div className="w-[168px] h-[186px] mb-[14px] relative">
                  <svg viewBox="0 0 168 187" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    {/* Background card/document */}
                    <rect x="24" y="40" width="120" height="120" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1"/>
                    {/* Card lines */}
                    <rect x="40" y="60" width="88" height="8" rx="4" fill="#E2E8F0"/>
                    <rect x="40" y="76" width="70" height="8" rx="4" fill="#E2E8F0"/>
                    <rect x="40" y="92" width="50" height="8" rx="4" fill="#E2E8F0"/>
                    {/* Decorative dots */}
                    <circle cx="136" cy="28" r="4" fill="#E2E8F0"/>
                    <circle cx="148" cy="40" r="3" fill="#F1F5F9"/>
                    <circle cx="20" cy="140" r="3" fill="#F1F5F9"/>
                    {/* Plus button circle */}
                    <circle cx="128" cy="130" r="24" fill="#DBEAFE"/>
                    <path d="M128 120V140M118 130H138" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <button className="px-[14px] py-[7px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#64748B] hover:bg-[#F8FAFC] transition-colors flex items-center gap-[7px]">
                  <IconPlus size={16} className="text-[#64748B]" />
                  Add Bank Details
                </button>
              </div>
            </div>

            {/* Attachments Section */}
            <div>
              <button className="w-full flex items-center justify-between p-[7px] hover:bg-[#F8FAFC] rounded-[4px] transition-colors">
                <div className="flex items-center gap-[7px]">
                  <IconPaperclip size={21} className="text-[#64748B]" />
                  <span className="text-[14px] font-medium text-[#1E293B]">Attachments</span>
                  <span className="text-[13px] text-[#94A3B8]">(0)</span>
                </div>
                <div className="flex items-center gap-[7px]">
                  <button className="p-[3.5px] hover:bg-[#F1F5F9] rounded transition-colors">
                    <IconPlus size={18} className="text-[#94A3B8]" />
                  </button>
                  <IconChevronDown size={12} className="text-[#94A3B8]" />
                </div>
              </button>
            </div>
          </div>

          {/* Sidebar Icon Strip */}
          <div className="w-[49px] border-l border-[#E2E8F0] py-[3.5px]">
            <div className="flex flex-col items-center gap-[3.5px]">
              <button className="w-[31px] h-[31px] rounded-[4px] bg-[#F1F5F9] flex items-center justify-center">
                <IconBuildingBank size={18} className="text-[#64748B]" />
              </button>
              <button className="w-[31px] h-[31px] rounded-[4px] hover:bg-[#F8FAFC] flex items-center justify-center transition-colors">
                <IconPaperclip size={18} className="text-[#94A3B8]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Line Item Picker Modal */}
      <LineItemPickerModal
        isOpen={isLineItemPickerOpen}
        onClose={() => setIsLineItemPickerOpen(false)}
        onAddProduct={() => {
          console.log('Adding product to vendor...');
        }}
      />

      {/* Edit Options Modal */}
      <EditOptionsModal
        isOpen={!!editOptionsProduct}
        onClose={() => setEditOptionsProduct(null)}
        product={editOptionsProduct}
        onSave={handleSaveOptions}
      />
    </div>
  );
}

export default VendorDetailsPage;
