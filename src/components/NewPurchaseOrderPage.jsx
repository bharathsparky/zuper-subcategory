import React, { useState } from 'react';
import {
  IconChevronDown,
  IconChevronUp,
  IconX,
  IconPlus,
  IconAlertTriangle,
  IconBold,
  IconItalic,
  IconList,
  IconListNumbers,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconHighlight,
  IconClearFormatting,
  IconTable,
  IconMail,
  IconPhone,
  IconMapPin,
  IconPencil,
  IconTrash,
  IconPaperclip,
  IconFileDescription,
  IconPackage,
  IconTruck,
  IconClipboardList,
  IconNotes,
  IconSearch,
  IconDotsVertical,
} from '@tabler/icons-react';

// Asset paths from Figma
const LOCATION_PREVIEW = '/assets/5e8b95356d01faaee0e40c41704ee724c45dd548.png';

// Vendor Catalog Data - Items with SKUs and Options
const VENDOR_CATALOG_DATA = [
  {
    id: 1,
    partId: '#MQ67DFR1',
    partName: 'LG Refrigeration Compressors',
    category: 'Compressors',
    type: 'Part',
    image: 'https://picsum.photos/seed/compressor/44/44',
    skus: [
      {
        id: 'sku1',
        vendorSku: '121',
        unitCost: 7550,
        remarks: '',
        options: [] // No options for this SKU
      },
      {
        id: 'sku2',
        vendorSku: '1213',
        unitCost: 7550,
        remarks: '',
        options: []
      },
      {
        id: 'sku3',
        vendorSku: '123',
        unitCost: 7550,
        remarks: '',
        options: []
      }
    ]
  },
  {
    id: 2,
    partId: '#ABC123',
    partName: 'HK Vision RE120',
    category: 'HVAC',
    type: 'Part',
    image: 'https://picsum.photos/seed/hvac/44/44',
    skus: [
      {
        id: 'sku4',
        vendorSku: 'HK-STD',
        unitCost: 2500,
        remarks: 'Standard model',
        options: [
          { id: 'opt1', name: '120V', color: '#3B82F6', available: true },
          { id: 'opt2', name: '240V', color: '#10B981', available: true },
          { id: 'opt3', name: '480V', color: '#F59E0B', available: true },
        ]
      },
      {
        id: 'sku5',
        vendorSku: 'HK-PRO',
        unitCost: 3200,
        remarks: 'Professional model',
        options: [
          { id: 'opt4', name: '120V Pro', color: '#3B82F6', available: true },
          { id: 'opt5', name: '240V Pro', color: '#10B981', available: true },
        ]
      }
    ]
  },
  {
    id: 3,
    partId: '#ABC124',
    partName: 'Pipe V Connector',
    category: 'Plumbing',
    type: 'Part',
    image: 'https://picsum.photos/seed/pipe/44/44',
    skus: [
      {
        id: 'sku6',
        vendorSku: 'PVC-1',
        unitCost: 45,
        remarks: '',
        options: []
      }
    ]
  },
  {
    id: 4,
    partId: '#ASP.SHI.24109',
    partName: 'IKO Architectural - Cambridge',
    category: 'Shingles',
    type: 'Product',
    image: 'https://picsum.photos/seed/shingle/44/44',
    skus: [
      {
        id: 'sku7',
        vendorSku: 'IKOCAMB-STD',
        unitCost: 32.67,
        remarks: 'Standard colors',
        options: [
          { id: 'opt6', name: 'Charcoal', color: '#36454F', available: true },
          { id: 'opt7', name: 'Weathered Wood', color: '#A0826D', available: true },
          { id: 'opt8', name: 'Dual Black', color: '#1a1a1a', available: true },
          { id: 'opt9', name: 'Barkwood', color: '#6B4423', available: true },
        ]
      },
      {
        id: 'sku8',
        vendorSku: 'IKOCAMB-PREM',
        unitCost: 35.00,
        remarks: 'Premium colors',
        options: [
          { id: 'opt10', name: 'Desert Tan', color: '#C4A77D', available: true },
          { id: 'opt11', name: 'Slate', color: '#708090', available: true },
          { id: 'opt12', name: 'Driftwood', color: '#B8A082', available: true },
        ]
      }
    ]
  },
];

// PO Line Item Picker Modal Component
function POLineItemPickerModal({ isOpen, onClose, onAddItems, vendorName = 'SS Shingle Supplier' }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedParts, setExpandedParts] = useState({});
  // lineItems: array of { partId, skuId, vendorSku, unitCost, optionId, optionName, optionColor, quantity, remarks }
  const [lineItems, setLineItems] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  // Get a unique key for a line item
  const getLineItemKey = (partId, skuId, optionId, index) => `${partId}_${skuId}_${optionId || 'no-opt'}_${index}`;

  // Toggle part expansion
  const togglePartExpanded = (partId) => {
    setExpandedParts(prev => ({ ...prev, [partId]: !prev[partId] }));
  };

  // Check if a line item exists
  const findLineItemIndex = (partId, skuId, optionId = null) => {
    return lineItems.findIndex(item => 
      item.partId === partId && 
      item.skuId === skuId && 
      (optionId === null ? !item.optionId : item.optionId === optionId)
    );
  };

  // Check if SKU row is checked (for SKUs without options)
  const isSkuChecked = (partId, skuId, hasOptions) => {
    if (hasOptions) return false;
    return lineItems.some(item => item.partId === partId && item.skuId === skuId);
  };

  // Check if any line item exists for a SKU
  const hasAnyLineItemForSku = (partId, skuId) => {
    return lineItems.some(item => item.partId === partId && item.skuId === skuId);
  };

  // Get line items for a specific SKU
  const getLineItemsForSku = (partId, skuId) => {
    return lineItems.filter(item => item.partId === partId && item.skuId === skuId);
  };

  // Handle checkbox toggle for SKUs without options
  const handleSkuCheckToggle = (part, sku, checked) => {
    if (checked) {
      // Add new line item
      setLineItems(prev => [...prev, {
        partId: part.id,
        partNumber: part.partId,
        partName: part.partName,
        image: part.image,
        skuId: sku.id,
        vendorSku: sku.vendorSku,
        unitCost: sku.unitCost,
        optionId: null,
        optionName: null,
        optionColor: null,
        quantity: '',
        remarks: ''
      }]);
    } else {
      // Remove line item
      setLineItems(prev => prev.filter(item => !(item.partId === part.id && item.skuId === sku.id)));
    }
  };

  // Handle option selection from dropdown
  const handleOptionSelect = (part, sku, option, lineItemIndex = -1) => {
    if (lineItemIndex >= 0) {
      // Update existing line item's option
      setLineItems(prev => prev.map((item, idx) => 
        idx === lineItemIndex ? { ...item, optionId: option.id, optionName: option.name, optionColor: option.color } : item
      ));
    } else {
      // Find if there's already a line item without option selected
      const existingIdx = lineItems.findIndex(item => 
        item.partId === part.id && item.skuId === sku.id && !item.optionId
      );
      
      if (existingIdx >= 0) {
        // Update the existing placeholder
        setLineItems(prev => prev.map((item, idx) => 
          idx === existingIdx ? { ...item, optionId: option.id, optionName: option.name, optionColor: option.color } : item
        ));
      } else {
        // Create new line item with option
        setLineItems(prev => [...prev, {
          partId: part.id,
          partNumber: part.partId,
          partName: part.partName,
          image: part.image,
          skuId: sku.id,
          vendorSku: sku.vendorSku,
          unitCost: sku.unitCost,
          optionId: option.id,
          optionName: option.name,
          optionColor: option.color,
          quantity: '',
          remarks: ''
        }]);
      }
    }
    // Clear validation errors
    clearValidationError(part.id, sku.id);
  };

  // Add another color/option for the same SKU
  const addAnotherOption = (part, sku) => {
    setLineItems(prev => [...prev, {
      partId: part.id,
      partNumber: part.partId,
      partName: part.partName,
      image: part.image,
      skuId: sku.id,
      vendorSku: sku.vendorSku,
      unitCost: sku.unitCost,
      optionId: null,
      optionName: null,
      optionColor: null,
      quantity: '',
      remarks: ''
    }]);
  };

  // Remove a line item by index
  const removeLineItem = (index) => {
    setLineItems(prev => prev.filter((_, idx) => idx !== index));
  };

  // Update line item quantity
  const updateQuantity = (index, quantity) => {
    setLineItems(prev => prev.map((item, idx) => 
      idx === index ? { ...item, quantity } : item
    ));
    // Clear validation error
    const item = lineItems[index];
    if (item) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`qty_${index}`];
        return newErrors;
      });
    }
  };

  // Update line item remarks
  const updateRemarks = (index, remarks) => {
    setLineItems(prev => prev.map((item, idx) => 
      idx === index ? { ...item, remarks } : item
    ));
  };

  // Clear validation error for a SKU
  const clearValidationError = (partId, skuId) => {
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach(key => {
        if (key.includes(`${partId}_${skuId}`)) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });
  };

  // Get available options not yet used for this SKU
  const getAvailableOptionsForSku = (part, sku, excludeIndex = -1) => {
    const usedOptionIds = lineItems
      .filter((item, idx) => item.partId === part.id && item.skuId === sku.id && idx !== excludeIndex && item.optionId)
      .map(item => item.optionId);
    return (sku.options || []).filter(opt => opt.available && !usedOptionIds.includes(opt.id));
  };

  // Check if can add another option
  const canAddAnotherOption = (part, sku) => {
    const availableOpts = getAvailableOptionsForSku(part, sku);
    return availableOpts.length > 0;
  };

  // Handle form submission
  const handleAddItems = () => {
    const errors = {};
    
    // Validate all line items
    lineItems.forEach((item, index) => {
      // Check quantity
      if (!item.quantity || parseFloat(item.quantity) <= 0) {
        errors[`qty_${index}`] = 'Required';
      }
      // Check option if SKU has options
      const part = VENDOR_CATALOG_DATA.find(p => p.id === item.partId);
      const sku = part?.skus.find(s => s.id === item.skuId);
      if (sku && sku.options && sku.options.length > 0 && !item.optionId) {
        errors[`opt_${index}`] = 'Select an option';
      }
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Pass items to parent
    onAddItems && onAddItems(lineItems);
    handleClose();
  };

  // Handle modal close
  const handleClose = () => {
    setSearchTerm('');
    setExpandedParts({});
    setLineItems([]);
    setValidationErrors({});
    onClose();
  };

  // Count selected items
  const selectedCount = lineItems.length;

  if (!isOpen) return null;

  // Filter parts by search
  const filteredParts = VENDOR_CATALOG_DATA.filter(part =>
    part.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    part.partId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[8px] w-[95vw] max-w-[1100px] max-h-[90vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="h-[56px] px-[24px] flex items-center justify-between border-b border-[#E2E8F0] shrink-0">
          <h2 className="text-[18px] font-semibold text-[#1E293B]">{vendorName} Catalogue</h2>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full">
            <IconX size={20} className="text-[#64748B]" />
          </button>
        </div>

        {/* Search */}
        <div className="px-[24px] py-[16px] border-b border-[#E2E8F0] shrink-0">
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
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto min-h-0">
          {filteredParts.map(part => (
            <div key={part.id} className="border-b border-[#E2E8F0]">
              {/* Part Header Row */}
              <button
                onClick={() => togglePartExpanded(part.id)}
                className="w-full px-[24px] py-[16px] flex items-center justify-between hover:bg-[#F8FAFC] transition-colors"
              >
                <div className="flex items-center gap-[12px]">
                  <div className="w-[44px] h-[44px] bg-[#F1F5F9] rounded-[6px] flex items-center justify-center overflow-hidden">
                    {part.image ? (
                      <img src={part.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <IconPackage size={22} stroke={1.5} className="text-[#94A3B8]" />
                    )}
                  </div>
                  <span className="text-[14px] font-medium text-[#1E293B]">
                    {part.partId} - {part.partName}
                  </span>
                </div>
                {expandedParts[part.id] ? (
                  <IconChevronUp size={20} className="text-[#64748B]" />
                ) : (
                  <IconChevronDown size={20} className="text-[#64748B]" />
                )}
              </button>

              {/* Expanded SKU Table */}
              {expandedParts[part.id] && (
                <div className="px-[24px] pb-[16px]">
                  {/* Table Header */}
                  <div className="grid grid-cols-[40px_1fr_120px_180px_120px_1fr] gap-[8px] px-[12px] py-[10px] bg-[#F8FAFC] rounded-t-[6px] border border-[#E2E8F0] border-b-0">
                    <div></div>
                    <div className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Vendor SKU / ID</div>
                    <div className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Unit Purchase Cost</div>
                    <div className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Option</div>
                    <div className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                      Required Qty <span className="text-red-500">*</span>
                    </div>
                    <div className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Remarks</div>
                  </div>

                  {/* SKU Rows */}
                  {part.skus.map(sku => {
                    const hasOptions = sku.options && sku.options.length > 0;
                    const skuLineItems = getLineItemsForSku(part.id, sku.id);
                    const canAddMore = hasOptions && canAddAnotherOption(part, sku);
                    
                    return (
                      <div key={sku.id} className="border border-[#E2E8F0] border-t-0">
                        {/* Main SKU Row or Line Item Rows */}
                        {hasOptions ? (
                          // For SKUs with options, show each line item as a row
                          <>
                            {skuLineItems.length === 0 ? (
                              // No line items yet - show placeholder row
                              <div className="grid grid-cols-[40px_1fr_120px_180px_120px_1fr] gap-[8px] px-[12px] py-[12px] items-center hover:bg-[#FAFAFA]">
                                <div></div>
                                <div className="text-[13px] text-[#1E293B]">{sku.vendorSku}</div>
                                <div className="text-[13px] text-[#1E293B]">
                                  <div className="flex items-center gap-[4px] px-[8px] py-[6px] bg-[#F1F5F9] rounded-[4px] w-fit">
                                    <span className="text-[12px] text-[#64748B]">USD</span>
                                    <span className="text-[13px] text-[#1E293B]">{sku.unitCost}</span>
                                  </div>
                                </div>
                                <div>
                                  <select
                                    className="w-full h-[36px] px-[10px] pr-[28px] bg-white border border-[#E2E8F0] rounded-[6px] text-[13px] text-[#1E293B] focus:outline-none focus:border-[#3B82F6] appearance-none cursor-pointer"
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
                                    onChange={(e) => {
                                      const option = sku.options.find(o => o.id === e.target.value);
                                      if (option) handleOptionSelect(part, sku, option);
                                    }}
                                    value=""
                                  >
                                    <option value="">Select option</option>
                                    {getAvailableOptionsForSku(part, sku).map(opt => (
                                      <option key={opt.id} value={opt.id}>{opt.name}</option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <input
                                    type="text"
                                    placeholder="Ex: 10"
                                    className="w-full h-[36px] px-[10px] bg-white border border-[#E2E8F0] rounded-[6px] text-[13px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#3B82F6]"
                                    disabled
                                  />
                                </div>
                                <div>
                                  <input
                                    type="text"
                                    placeholder="Remarks"
                                    className="w-full h-[36px] px-[10px] bg-white border border-[#E2E8F0] rounded-[6px] text-[13px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#3B82F6]"
                                    disabled
                                  />
                                </div>
                              </div>
                            ) : (
                              // Show each line item row
                              skuLineItems.map((lineItem, idx) => {
                                const lineItemGlobalIndex = lineItems.findIndex(li => li === lineItem);
                                const hasQtyError = validationErrors[`qty_${lineItemGlobalIndex}`];
                                const hasOptError = validationErrors[`opt_${lineItemGlobalIndex}`];
                                
                                return (
                                  <div key={`${lineItem.skuId}_${lineItem.optionId || idx}`} className="grid grid-cols-[40px_1fr_120px_180px_120px_1fr_40px] gap-[8px] px-[12px] py-[12px] items-center hover:bg-[#FAFAFA]">
                                    <div className="flex items-center justify-center">
                                      <input
                                        type="checkbox"
                                        checked={true}
                                        onChange={() => removeLineItem(lineItemGlobalIndex)}
                                        className="w-[16px] h-[16px] rounded border-[#CBD5E1] text-[#E44A19] focus:ring-[#E44A19] cursor-pointer"
                                      />
                                    </div>
                                    <div className="text-[13px] text-[#1E293B]">{sku.vendorSku}</div>
                                    <div className="text-[13px] text-[#1E293B]">
                                      <div className="flex items-center gap-[4px] px-[8px] py-[6px] bg-[#F1F5F9] rounded-[4px] w-fit">
                                        <span className="text-[12px] text-[#64748B]">USD</span>
                                        <span className="text-[13px] text-[#1E293B]">{sku.unitCost}</span>
                                      </div>
                                    </div>
                                    <div>
                                      <select
                                        className={`w-full h-[36px] px-[10px] pr-[28px] bg-white border rounded-[6px] text-[13px] text-[#1E293B] focus:outline-none appearance-none cursor-pointer ${hasOptError ? 'border-red-500' : 'border-[#E2E8F0] focus:border-[#3B82F6]'}`}
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
                                        value={lineItem.optionId || ''}
                                        onChange={(e) => {
                                          const option = sku.options.find(o => o.id === e.target.value);
                                          if (option) {
                                            setLineItems(prev => prev.map((item, i) => 
                                              i === lineItemGlobalIndex ? { ...item, optionId: option.id, optionName: option.name, optionColor: option.color } : item
                                            ));
                                            setValidationErrors(prev => {
                                              const newErrors = { ...prev };
                                              delete newErrors[`opt_${lineItemGlobalIndex}`];
                                              return newErrors;
                                            });
                                          }
                                        }}
                                      >
                                        <option value="">Select option</option>
                                        {/* Show current option + available options */}
                                        {sku.options.filter(opt => opt.available && (opt.id === lineItem.optionId || !skuLineItems.some(li => li !== lineItem && li.optionId === opt.id))).map(opt => (
                                          <option key={opt.id} value={opt.id}>{opt.name}</option>
                                        ))}
                                      </select>
                                    </div>
                                    <div>
                                      <input
                                        type="text"
                                        placeholder="Ex: 10"
                                        value={lineItem.quantity}
                                        onChange={(e) => updateQuantity(lineItemGlobalIndex, e.target.value)}
                                        className={`w-full h-[36px] px-[10px] bg-white border rounded-[6px] text-[13px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none ${hasQtyError ? 'border-red-500' : 'border-[#E2E8F0] focus:border-[#3B82F6]'}`}
                                      />
                                    </div>
                                    <div>
                                      <input
                                        type="text"
                                        placeholder="Remarks"
                                        value={lineItem.remarks}
                                        onChange={(e) => updateRemarks(lineItemGlobalIndex, e.target.value)}
                                        className="w-full h-[36px] px-[10px] bg-white border border-[#E2E8F0] rounded-[6px] text-[13px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#3B82F6]"
                                      />
                                    </div>
                                    <div className="flex items-center justify-center">
                                      <button
                                        onClick={() => removeLineItem(lineItemGlobalIndex)}
                                        className="p-1 hover:bg-gray-100 rounded"
                                      >
                                        <IconTrash size={16} className="text-[#94A3B8]" />
                                      </button>
                                    </div>
                                  </div>
                                );
                              })
                            )}
                            
                            {/* Add another color button */}
                            {canAddMore && skuLineItems.length > 0 && (
                              <div className="px-[52px] py-[8px] border-t border-dashed border-[#E2E8F0]">
                                <button
                                  onClick={() => addAnotherOption(part, sku)}
                                  className="text-[13px] text-[#3B82F6] hover:text-[#2563EB] flex items-center gap-[4px]"
                                >
                                  <IconPlus size={14} />
                                  Add another option for this SKU
                                </button>
                              </div>
                            )}
                          </>
                        ) : (
                          // For SKUs without options - simple checkbox row
                          (() => {
                            const lineItemIdx = lineItems.findIndex(li => li.partId === part.id && li.skuId === sku.id);
                            const lineItem = lineItemIdx >= 0 ? lineItems[lineItemIdx] : null;
                            const hasQtyError = lineItemIdx >= 0 && validationErrors[`qty_${lineItemIdx}`];
                            
                            return (
                              <div className="grid grid-cols-[40px_1fr_120px_180px_120px_1fr] gap-[8px] px-[12px] py-[12px] items-center hover:bg-[#FAFAFA]">
                                <div className="flex items-center justify-center">
                                  <input
                                    type="checkbox"
                                    checked={!!lineItem}
                                    onChange={(e) => handleSkuCheckToggle(part, sku, e.target.checked)}
                                    className="w-[16px] h-[16px] rounded border-[#CBD5E1] text-[#E44A19] focus:ring-[#E44A19] cursor-pointer"
                                  />
                                </div>
                                <div className="text-[13px] text-[#1E293B]">{sku.vendorSku}</div>
                                <div className="text-[13px] text-[#1E293B]">
                                  <div className="flex items-center gap-[4px] px-[8px] py-[6px] bg-[#F1F5F9] rounded-[4px] w-fit">
                                    <span className="text-[12px] text-[#64748B]">USD</span>
                                    <span className="text-[13px] text-[#1E293B]">{sku.unitCost}</span>
                                  </div>
                                </div>
                                <div className="text-[13px] text-[#94A3B8]">—</div>
                                <div>
                                  <input
                                    type="text"
                                    placeholder="Ex: 10"
                                    value={lineItem?.quantity || ''}
                                    onChange={(e) => lineItemIdx >= 0 && updateQuantity(lineItemIdx, e.target.value)}
                                    disabled={!lineItem}
                                    className={`w-full h-[36px] px-[10px] bg-white border rounded-[6px] text-[13px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none ${!lineItem ? 'bg-[#F8FAFC] cursor-not-allowed' : ''} ${hasQtyError ? 'border-red-500' : 'border-[#E2E8F0] focus:border-[#3B82F6]'}`}
                                  />
                                </div>
                                <div>
                                  <input
                                    type="text"
                                    placeholder="Remarks"
                                    value={lineItem?.remarks || ''}
                                    onChange={(e) => lineItemIdx >= 0 && updateRemarks(lineItemIdx, e.target.value)}
                                    disabled={!lineItem}
                                    className={`w-full h-[36px] px-[10px] bg-white border border-[#E2E8F0] rounded-[6px] text-[13px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#3B82F6] ${!lineItem ? 'bg-[#F8FAFC] cursor-not-allowed' : ''}`}
                                  />
                                </div>
                              </div>
                            );
                          })()
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="h-[64px] px-[24px] flex items-center justify-between border-t border-[#E2E8F0] shrink-0 bg-white">
          <div className="flex items-center gap-[8px]">
            <span className="text-[14px] font-medium text-[#3B82F6]">{selectedCount} Item(s) Selected</span>
            <IconArrowForwardUp size={16} className="text-[#3B82F6] rotate-90" style={{ transform: 'rotate(45deg)' }} />
          </div>
          <div className="flex items-center gap-[12px]">
            <button
              onClick={handleClose}
              className="h-[36px] px-[16px] bg-white border border-[#CBD5E1] rounded-[6px] text-[14px] font-medium text-[#334155] hover:bg-[#F8FAFC] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddItems}
              disabled={selectedCount === 0}
              className="h-[36px] px-[16px] bg-[#E44A19] rounded-[6px] text-[14px] font-medium text-white hover:bg-[#D94315] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// SVG Icons from Figma
const ChevronRightIcon = () => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.875 15.75L13.125 10.5L7.875 5.25" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SaveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H10.6667L14 5.33333V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.3333 14V9.33333H4.66667V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.66667 2V5.33333H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SendIcon = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.375 1.625L5.6875 7.3125" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.375 1.625L7.8125 11.375L5.6875 7.3125L1.625 5.1875L11.375 1.625Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PrimaryDetailsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.75 1.5H2.25C1.83579 1.5 1.5 1.83579 1.5 2.25V6.75C1.5 7.16421 1.83579 7.5 2.25 7.5H6.75C7.16421 7.5 7.5 7.16421 7.5 6.75V2.25C7.5 1.83579 7.16421 1.5 6.75 1.5Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.75 1.5H11.25C10.8358 1.5 10.5 1.83579 10.5 2.25V6.75C10.5 7.16421 10.8358 7.5 11.25 7.5H15.75C16.1642 7.5 16.5 7.16421 16.5 6.75V2.25C16.5 1.83579 16.1642 1.5 15.75 1.5Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.75 10.5H2.25C1.83579 10.5 1.5 10.8358 1.5 11.25V15.75C1.5 16.1642 1.83579 16.5 2.25 16.5H6.75C7.16421 16.5 7.5 16.1642 7.5 15.75V11.25C7.5 10.8358 7.16421 10.5 6.75 10.5Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.75 10.5H11.25C10.8358 10.5 10.5 10.8358 10.5 11.25V15.75C10.5 16.1642 10.8358 16.5 11.25 16.5H15.75C16.1642 16.5 16.5 16.1642 16.5 15.75V11.25C16.5 10.8358 16.1642 10.5 15.75 10.5Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const VendorIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 15.75V14.25C12 13.4544 11.6839 12.6913 11.1213 12.1287C10.5587 11.5661 9.79565 11.25 9 11.25H3.75C2.95435 11.25 2.19129 11.5661 1.62868 12.1287C1.06607 12.6913 0.75 13.4544 0.75 14.25V15.75" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.375 8.25C8.03185 8.25 9.375 6.90685 9.375 5.25C9.375 3.59315 8.03185 2.25 6.375 2.25C4.71815 2.25 3.375 3.59315 3.375 5.25C3.375 6.90685 4.71815 8.25 6.375 8.25Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.25 15.75V14.25C17.2495 13.5853 17.0283 12.9396 16.621 12.4143C16.2138 11.889 15.6436 11.5137 15 11.3475" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.375 2.3475C13.0205 2.51266 13.5926 2.88794 14.0011 3.41411C14.4096 3.94028 14.6314 4.58753 14.6314 5.25375C14.6314 5.91997 14.4096 6.56722 14.0011 7.09339C13.5926 7.61956 13.0205 7.99484 12.375 8.16" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DeliveryAddressIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.75 7.5C15.75 12.75 9 17.25 9 17.25C9 17.25 2.25 12.75 2.25 7.5C2.25 5.70979 2.96116 3.9929 4.22703 2.72703C5.4929 1.46116 7.20979 0.75 9 0.75C10.7902 0.75 12.5071 1.46116 13.773 2.72703C15.0388 3.9929 15.75 5.70979 15.75 7.5Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const POItemsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.75 12V6C15.7497 5.73689 15.6803 5.47848 15.5487 5.25096C15.4172 5.02344 15.2282 4.83488 15 4.704L9.75 1.704C9.52197 1.57284 9.26326 1.50391 9 1.50391C8.73674 1.50391 8.47803 1.57284 8.25 1.704L3 4.704C2.77183 4.83488 2.58285 5.02344 2.45127 5.25096C2.31969 5.47848 2.25027 5.73689 2.25 6V12C2.25027 12.2631 2.31969 12.5215 2.45127 12.749C2.58285 12.9766 2.77183 13.1651 3 13.296L8.25 16.296C8.47803 16.4272 8.73674 16.4961 9 16.4961C9.26326 16.4961 9.52197 16.4272 9.75 16.296L15 13.296C15.2282 13.1651 15.4172 12.9766 15.5487 12.749C15.6803 12.5215 15.7497 12.2631 15.75 12Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.4525 5.22L9 9.0075L15.5475 5.22" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 16.56V9" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AttachmentsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.0225 8.30252L8.7975 14.5275C8.10597 15.219 7.16634 15.6074 6.18675 15.6074C5.20716 15.6074 4.26753 15.219 3.576 14.5275C2.88447 13.836 2.49609 12.8963 2.49609 11.9168C2.49609 10.9372 2.88447 9.99753 3.576 9.306L9.801 3.081C10.2623 2.61974 10.8871 2.36042 11.538 2.36042C12.1889 2.36042 12.8137 2.61974 13.275 3.081C13.7363 3.54226 13.9956 4.16709 13.9956 4.818C13.9956 5.46891 13.7363 6.09374 13.275 6.555L7.0425 12.78C6.81188 13.0106 6.49946 13.1403 6.174 13.1403C5.84854 13.1403 5.53612 13.0106 5.3055 12.78C5.07488 12.5494 4.94522 12.237 4.94522 11.9115C4.94522 11.586 5.07488 11.2736 5.3055 11.043L11.0205 5.33552" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Figma assets for placeholder illustrations
const NO_PARTS_FOUND_SVG = '/assets/b0ce5152600488fbb3eaae7160f16ad08fd4db7b.svg';
const SERVICE_ADDRESS_PLACEHOLDER_SVG = '/assets/a3e4f039c6cedc946b5963bc8bfb1ff07266d844.svg';
const ATTACHMENT_PLACEHOLDER_SVG = '/assets/013866c89a0e6b228e4b3ec894f98ff85d971fbd.svg';

const NewPurchaseOrderPage = ({ onNavigateBack }) => {
  const [primaryDetailsExpanded, setPrimaryDetailsExpanded] = useState(true);
  const [poItemsExpanded, setPoItemsExpanded] = useState(true);
  const [vendorExpanded, setVendorExpanded] = useState(true);
  const [deliveryAddressExpanded, setDeliveryAddressExpanded] = useState(true);
  const [billingAddressExpanded, setBillingAddressExpanded] = useState(true);
  const [attachmentsExpanded, setAttachmentsExpanded] = useState(true);
  
  // Modal state
  const [isLineItemPickerOpen, setIsLineItemPickerOpen] = useState(false);
  
  // PO Items state
  const [poItems, setPoItems] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    poTitle: '',
    vendor: 'SS Shingle Supplier',
    deliveryMethod: "Direct Shipment to Job's site",
    deliveryTime: 'Anytime',
    referenceNumber: '',
    requiredBy: '',
    paymentTerm: 'Monthly',
    template: 'ABC Supply',
    remarks: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  // Handle adding items from modal
  const handleAddItems = (items) => {
    setPoItems(prev => [...prev, ...items]);
  };
  
  // Handle removing a PO item
  const handleRemovePoItem = (index) => {
    setPoItems(prev => prev.filter((_, i) => i !== index));
  };
  
  // Calculate totals
  const calculateTotal = () => {
    return poItems.reduce((sum, item) => sum + (item.unitCost * parseFloat(item.quantity || 0)), 0);
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#F1F5F9]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Breadcrumb & Action Bar */}
      <div className="h-[49px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-[21px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-0">
          <button 
            onClick={onNavigateBack}
            className="text-[15.8px] text-[#334155] hover:text-[#1E293B]"
          >
            Purchase Orders
          </button>
          <div className="pl-[14px] flex items-center">
            <ChevronRightIcon />
            <div className="pl-[14px] py-[6px]">
              <span className="text-[15.8px] font-medium text-[#334155]">New Purchase Order</span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-[14px]">
          <button className="flex items-center gap-[7px] px-[15px] py-[5.43px] bg-white border border-[#CBD5E1] rounded-[5.25px] hover:bg-gray-50">
            <SaveIcon />
            <span className="text-[12.6px] font-medium text-[#334155]">Save as Draft</span>
          </button>
          <div className="flex">
            <button className="flex items-center gap-[7px] px-[14px] py-[5.8px] bg-[#E44A19] rounded-l-[5.25px] border-r border-white hover:bg-[#D94315]">
              <SendIcon />
              <span className="text-[12.6px] font-medium text-white">Save & Submit</span>
            </button>
            <button className="px-[7px] py-[9.45px] bg-[#E44A19] border border-[#E44A19] rounded-r-[5.25px] hover:bg-[#D94315]">
              <IconChevronDown size={13} className="text-white" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Content */}
        <div className="flex-1 overflow-auto p-[10.5px]">
          <div className="flex flex-col gap-[10.5px]">
            {/* Primary Details Section */}
            <div className="bg-white border border-[#E2E8F0] rounded-[7px]">
              {/* Header */}
              <button 
                onClick={() => setPrimaryDetailsExpanded(!primaryDetailsExpanded)}
                className="w-full h-[49px] flex items-center justify-between px-[14px] border-b border-[#E2E8F0] rounded-t-[7px]"
              >
                <div className="flex items-center gap-[10.5px]">
                  <PrimaryDetailsIcon />
                  <span className="text-[14px] font-semibold text-[#334155]">Primary Details</span>
                </div>
                {primaryDetailsExpanded ? (
                  <IconChevronUp size={16} className="text-[#1E293B]" />
                ) : (
                  <IconChevronDown size={16} className="text-[#1E293B]" />
                )}
              </button>
              
              {primaryDetailsExpanded && (
                <div className="flex flex-col gap-[14px]">
                  {/* Warning Banner */}
                  <div className="bg-[#FEFCE8] px-[21px] py-[14px] flex items-center justify-between">
                    <div className="flex items-center gap-[7px]">
                      <IconAlertTriangle size={17.5} className="text-[#C2410C]" />
                      <span className="text-[14px] tracking-[0.25px]">
                        <span className="font-semibold text-[#C2410C]">SS Shingle Supplier </span>
                        <span className="text-[#C2410C]">has 1 open Purchase Order(s). </span>
                        <span className="text-[#3B82F6] underline cursor-pointer">View</span>
                      </span>
                    </div>
                    <button className="text-[#C2410C] hover:text-[#9A3412]">
                      <IconX size={17.5} />
                    </button>
                  </div>
                  
                  {/* Form Fields */}
                  <div className="px-[14px] pb-[21px]">
                    {/* PO Title */}
                    <div className="mb-[14px]">
                      <label className="flex gap-[1.75px] text-[12.6px] font-medium tracking-[0.25px] mb-[3.5px]">
                        <span className="text-[#334155]">PO Title </span>
                        <span className="text-[#E74C3C]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter PO Title"
                        value={formData.poTitle}
                        onChange={(e) => handleInputChange('poTitle', e.target.value)}
                        className="w-full max-w-[735px] h-[39px] px-[11.5px] bg-white border border-[#CBD5E1] rounded-[5.25px] shadow-sm text-[12.6px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#3B82F6]"
                      />
                    </div>
                    
                    {/* Row 1: Vendor, Delivery Method, Delivery Time */}
                    <div className="grid grid-cols-3 gap-[14px] mb-[14px]">
                      {/* Vendor */}
                      <div>
                        <label className="flex gap-[1.75px] text-[12.6px] font-medium tracking-[0.25px] mb-[3.5px]">
                          <span className="text-[#334155]">Vendor </span>
                          <span className="text-[#E74C3C]">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.vendor}
                            onChange={(e) => handleInputChange('vendor', e.target.value)}
                            className="w-full h-[39px] px-[11.5px] pr-[40px] bg-white border border-[#CBD5E1] rounded-[5.25px] text-[12.6px] text-[#1E293B] focus:outline-none focus:border-[#3B82F6]"
                          />
                          <button className="absolute right-[10.5px] top-1/2 -translate-y-1/2">
                            <IconX size={16} className="text-[#64748B]" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Delivery Method */}
                      <div>
                        <label className="flex gap-[1.75px] text-[12.6px] font-medium tracking-[0.25px] mb-[3.5px]">
                          <span className="text-[#334155]">Delivery Method</span>
                          <span className="text-red-500"> *</span>
                        </label>
                        <div className="relative">
                          <select
                            value={formData.deliveryMethod}
                            onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                            className="w-full h-[38.5px] px-[15px] pr-[35px] bg-white border border-[#E4E4E7] rounded-[5.25px] text-[12.6px] text-[#1E293B] focus:outline-none focus:border-[#3B82F6] appearance-none cursor-pointer"
                          >
                            <option>Direct Shipment to Job's site</option>
                            <option>Pick up from store</option>
                            <option>Delivery to warehouse</option>
                          </select>
                          <IconChevronDown size={14} className="absolute right-[15px] top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                        </div>
                      </div>
                      
                      {/* Delivery Time */}
                      <div>
                        <label className="text-[12.6px] font-medium text-[#334155] tracking-[0.25px] mb-[3.5px] block">
                          Delivery Time
                        </label>
                        <div className="relative">
                          <select
                            value={formData.deliveryTime}
                            onChange={(e) => handleInputChange('deliveryTime', e.target.value)}
                            className="w-full h-[38.5px] px-[15px] pr-[35px] bg-white border border-[#E4E4E7] rounded-[5.25px] text-[12.6px] text-[#1E293B] focus:outline-none focus:border-[#3B82F6] appearance-none cursor-pointer"
                          >
                            <option>Anytime</option>
                            <option>Morning</option>
                            <option>Afternoon</option>
                            <option>Evening</option>
                          </select>
                          <IconChevronDown size={14} className="absolute right-[15px] top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Row 2: Reference Number, Required By, Payment Term */}
                    <div className="grid grid-cols-3 gap-[14px] mb-[14px]">
                      {/* Reference Number */}
                      <div>
                        <label className="text-[12.6px] font-medium text-[#334155] tracking-[0.25px] mb-[3.5px] block">
                          Reference Number
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Reference Number"
                          value={formData.referenceNumber}
                          onChange={(e) => handleInputChange('referenceNumber', e.target.value)}
                          className="w-full h-[39px] px-[11.5px] bg-white border border-[#CBD5E1] rounded-[5.25px] shadow-sm text-[12.6px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#3B82F6]"
                        />
                      </div>
                      
                      {/* Required By */}
                      <div>
                        <label className="flex gap-[1.75px] text-[12.6px] font-medium tracking-[0.25px] mb-[3.5px]">
                          <span className="text-[#334155]">Required By </span>
                          <span className="text-[#E74C3C]">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Required Date"
                          value={formData.requiredBy}
                          onChange={(e) => handleInputChange('requiredBy', e.target.value)}
                          className="w-full h-[39px] px-[11.5px] bg-white border border-[#CBD5E1] rounded-[5.25px] text-[12.6px] text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#3B82F6]"
                        />
                      </div>
                      
                      {/* Payment Term */}
                      <div>
                        <label className="text-[12.6px] font-medium text-[#334155] tracking-[0.25px] mb-[3.5px] block">
                          Payment Term
                        </label>
                        <div className="relative">
                          <select
                            value={formData.paymentTerm}
                            onChange={(e) => handleInputChange('paymentTerm', e.target.value)}
                            className="w-full h-[38.5px] px-[15px] pr-[35px] bg-white border border-[#E4E4E7] rounded-[5.25px] text-[12.6px] text-[#1E293B] focus:outline-none focus:border-[#3B82F6] appearance-none cursor-pointer"
                          >
                            <option>Monthly</option>
                            <option>Net 30</option>
                            <option>Net 60</option>
                            <option>On Delivery</option>
                          </select>
                          <IconChevronDown size={14} className="absolute right-[15px] top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Template */}
                    <div className="mb-[14px] max-w-[320px]">
                      <label className="text-[12.6px] font-medium text-[#334155] tracking-[0.25px] mb-[3.5px] block">
                        Template
                      </label>
                      <div className="relative">
                        <select
                          value={formData.template}
                          onChange={(e) => handleInputChange('template', e.target.value)}
                          className="w-full h-[38.5px] px-[15px] pr-[35px] bg-white border border-[#E4E4E7] rounded-[5.25px] text-[12.6px] text-[#1E293B] focus:outline-none focus:border-[#3B82F6] appearance-none cursor-pointer"
                        >
                          <option>ABC Supply</option>
                          <option>SRS</option>
                          <option>Custom</option>
                        </select>
                        <IconChevronDown size={14} className="absolute right-[15px] top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                      </div>
                    </div>
                    
                    {/* Remarks */}
                    <div>
                      <label className="text-[12.6px] font-medium text-[#334155] tracking-[0.25px] mb-[3.5px] block">
                        Remarks
                      </label>
                      <div className="border-2 border-[#EEE] rounded-[10px] overflow-hidden">
                        {/* Rich Text Editor Content Area */}
                        <div className="min-h-[120px] p-[12px] bg-white">
                          <textarea
                            value={formData.remarks}
                            onChange={(e) => handleInputChange('remarks', e.target.value)}
                            className="w-full h-full min-h-[100px] text-[14px] text-[#334155] resize-none focus:outline-none"
                            placeholder=""
                          />
                        </div>
                        {/* Toolbar */}
                        <div className="bg-white border-t border-[#E3E3E3] px-[7px] py-[4px] flex items-center flex-wrap">
                          <div className="flex items-center border-r border-transparent pr-[1px]">
                            <button className="w-[34px] h-[28px] flex items-center justify-center rounded-[3px] hover:bg-gray-100">
                              <IconArrowBackUp size={24} className="text-[#64748B]" />
                            </button>
                            <button className="w-[34px] h-[28px] flex items-center justify-center rounded-[3px] hover:bg-gray-100">
                              <IconArrowForwardUp size={24} className="text-[#64748B]" />
                            </button>
                          </div>
                          <div className="flex items-center border-r border-transparent pr-[1px] pl-[7px]">
                            <button className="w-[34px] h-[28px] flex items-center justify-center rounded-[3px] hover:bg-gray-100">
                              <IconBold size={24} className="text-[#64748B]" />
                            </button>
                            <button className="w-[34px] h-[28px] flex items-center justify-center rounded-[3px] hover:bg-gray-100">
                              <IconItalic size={24} className="text-[#64748B]" />
                            </button>
                            <button className="flex items-center h-[28px] rounded-[3px] hover:bg-gray-100 px-[4px]">
                              <IconHighlight size={24} className="text-[#64748B]" />
                              <IconChevronDown size={10} className="text-[#64748B]" />
                            </button>
                            <button className="w-[34px] h-[28px] flex items-center justify-center rounded-[3px] hover:bg-gray-100">
                              <IconList size={24} className="text-[#64748B]" />
                            </button>
                            <button className="w-[34px] h-[28px] flex items-center justify-center rounded-[3px] hover:bg-gray-100">
                              <IconListNumbers size={24} className="text-[#64748B]" />
                            </button>
                          </div>
                          <div className="flex items-center pl-[7px]">
                            <button className="w-[34px] h-[28px] flex items-center justify-center rounded-[3px] hover:bg-gray-100">
                              <IconClearFormatting size={24} className="text-[#64748B]" />
                            </button>
                            <button className="flex items-center h-[28px] px-[4px] bg-[#F7F7F7] rounded-[3px] hover:bg-gray-200">
                              <span className="px-[4px] text-[14px] text-[#222F3E] w-[98px] overflow-hidden">Paragraph</span>
                              <IconChevronDown size={10} className="text-[#64748B]" />
                            </button>
                            <button className="flex items-center h-[28px] rounded-[3px] hover:bg-gray-100 px-[4px]">
                              <IconTable size={24} className="text-[#64748B]" />
                              <IconChevronDown size={10} className="text-[#64748B]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Association(s) Section */}
            <div className="bg-white border border-[#E2E8F0] rounded-[7px]">
              <div className="h-[42px] flex items-center px-[21px]">
                <span className="text-[15.8px] font-semibold text-[#334155]">Association(s)</span>
              </div>
              <div className="border-t border-[#E2E8F0] px-[21px] py-[21px]">
                <button className="h-[28px] px-[8.75px] bg-[#D0E9FB] rounded-full flex items-center gap-[3.5px]">
                  <IconPlus size={15.5} className="text-[#005AA3]" />
                  <span className="text-[12.6px] font-semibold text-[#005AA3]">Add</span>
                </button>
              </div>
            </div>
            
            {/* PO Items Section */}
            <div className="bg-white border border-[#E2E8F0] rounded-[7px]">
              {/* Header */}
              <div className="h-[49px] flex items-center justify-between px-[14px] border-b border-[#E2E8F0] rounded-t-[7px]">
                <div className="flex items-center gap-[10.5px]">
                  <POItemsIcon />
                  <span className="text-[14px] font-semibold text-[#334155]">PO Items</span>
                </div>
                <div className="flex items-center gap-[10px]">
                  {poItems.length > 0 && (
                    <button 
                      onClick={() => setIsLineItemPickerOpen(true)}
                      className="flex items-center gap-[5px] px-[12px] py-[5px] bg-white border border-[#CBD5E1] rounded-[5px] hover:bg-gray-50"
                    >
                      <IconPlus size={14} className="text-[#334155]" />
                      <span className="text-[12px] font-medium text-[#334155]">Add</span>
                    </button>
                  )}
                  <button 
                    onClick={() => setPoItemsExpanded(!poItemsExpanded)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    {poItemsExpanded ? (
                      <IconChevronUp size={16} className="text-[#1E293B]" />
                    ) : (
                      <IconChevronDown size={16} className="text-[#1E293B]" />
                    )}
                  </button>
                </div>
              </div>
              
              {poItemsExpanded && (
                <>
                  {poItems.length === 0 ? (
                    <div className="p-[21px] flex flex-col items-center">
                      <img src={NO_PARTS_FOUND_SVG} alt="No parts found" className="h-[112px]" />
                      <p className="text-[14px] text-[#1E293B] tracking-[0.25px] py-[3.5px]">
                        Start adding parts for the purchase order
                      </p>
                      <div className="pt-[10.5px]">
                        <button 
                          onClick={() => setIsLineItemPickerOpen(true)}
                          className="flex items-center gap-[7px] px-[15px] py-[2.27px] bg-white border border-[#CBD5E1] rounded-[5.25px] hover:bg-gray-50"
                        >
                          <IconPlus size={16} className="text-[#334155]" />
                          <span className="text-[12.6px] font-medium text-[#334155] tracking-[0.25px]">Add</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      {/* PO Items Table */}
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-[#E2E8F0]">
                              <th className="text-left px-[14px] py-[12px] text-[12px] font-medium text-[#64748B] w-[40px]">#</th>
                              <th className="text-left px-[14px] py-[12px] text-[12px] font-medium text-[#64748B]">Item</th>
                              <th className="text-left px-[14px] py-[12px] text-[12px] font-medium text-[#64748B] w-[140px]">Vendor SKU / ID</th>
                              <th className="text-left px-[14px] py-[12px] text-[12px] font-medium text-[#64748B] w-[150px]">Unit Purchase Cost</th>
                              <th className="text-left px-[14px] py-[12px] text-[12px] font-medium text-[#64748B] w-[120px]">Required Qty</th>
                              <th className="text-left px-[14px] py-[12px] text-[12px] font-medium text-[#64748B] w-[100px]">Remarks</th>
                              <th className="text-center px-[14px] py-[12px] text-[12px] font-medium text-[#64748B] w-[80px]">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {poItems.map((item, index) => (
                              <tr key={index} className="border-b border-[#E2E8F0] hover:bg-[#FAFAFA]">
                                <td className="px-[14px] py-[16px] text-[14px] text-[#1E293B]">{index + 1}</td>
                                <td className="px-[14px] py-[16px]">
                                  <div className="flex items-center gap-[12px]">
                                    <div className="w-[44px] h-[44px] bg-[#F1F5F9] rounded-[6px] flex items-center justify-center flex-shrink-0 overflow-hidden">
                                      {item.image ? (
                                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                                      ) : (
                                        <IconPackage size={22} stroke={1.5} className="text-[#94A3B8]" />
                                      )}
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-[14px] font-medium text-[#1E293B]">
                                        {item.partNumber} - {item.partName}
                                      </span>
                                      {item.optionName && (
                                        <div className="flex items-center gap-[6px] mt-[2px]">
                                          <span className="text-[12px] text-[#64748B]">Option:</span>
                                          <div className="flex items-center gap-[4px]">
                                            <div 
                                              className="w-[12px] h-[12px] rounded-[2px] border border-[#E2E8F0]"
                                              style={{ backgroundColor: item.optionColor }}
                                            />
                                            <span className="text-[12px] text-[#1E293B]">{item.optionName}</span>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-[14px] py-[16px] text-[14px] text-[#1E293B]">{item.vendorSku}</td>
                                <td className="px-[14px] py-[16px] text-[14px] text-[#1E293B]">
                                  ${item.unitCost.toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
                                </td>
                                <td className="px-[14px] py-[16px] text-[14px] text-[#1E293B]">{item.quantity}</td>
                                <td className="px-[14px] py-[16px] text-[14px] text-[#64748B]">{item.remarks || '-'}</td>
                                <td className="px-[14px] py-[16px] text-center">
                                  <button 
                                    onClick={() => handleRemovePoItem(index)}
                                    className="p-[6px] hover:bg-gray-100 rounded-full inline-flex items-center justify-center"
                                  >
                                    <IconDotsVertical size={18} className="text-[#64748B]" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colSpan="4" className="px-[14px] py-[16px] text-right">
                                <span className="text-[14px] font-semibold text-[#1E293B]">Total</span>
                              </td>
                              <td colSpan="3" className="px-[14px] py-[16px]">
                                <span className="text-[16px] font-semibold text-[#1E293B]">
                                  ${calculateTotal().toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
                                </span>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Right Sidebar */}
        <div className="w-[343.75px] overflow-auto p-[10.5px] pl-0">
          <div className="flex flex-col gap-0">
            {/* Vendor Section */}
            <div className="bg-white border-b border-[#E2E8F0]">
              {/* Header */}
              <button 
                onClick={() => setVendorExpanded(!vendorExpanded)}
                className="w-full h-[49px] flex items-center justify-between px-[14px] border-b border-[#E2E8F0]"
              >
                <div className="flex items-center gap-[10.5px]">
                  <VendorIcon />
                  <span className="text-[14px] font-semibold text-[#334155]">Vendor</span>
                </div>
                {vendorExpanded ? (
                  <IconChevronUp size={16} className="text-[#1E293B]" />
                ) : (
                  <IconChevronDown size={16} className="text-[#1E293B]" />
                )}
              </button>
              
              {vendorExpanded && (
                <div className="flex flex-col gap-[7px] pb-[10.5px]">
                  {/* Vendor Info */}
                  <div className="px-[14px] py-[10.5px] flex items-start justify-between">
                    <div className="flex items-center gap-[14px]">
                      <div className="w-[42px] h-[42px] bg-[#E2E8F0] rounded-[3.5px] flex items-center justify-center">
                        <span className="text-[14px] text-[#475569] uppercase">S</span>
                      </div>
                      <div className="flex flex-col gap-[1.75px]">
                        <span className="text-[14px] font-semibold text-[#1E293B] tracking-[0.25px]">SS Shingle Supplier</span>
                        <span className="text-[12.6px] text-[#1E293B] tracking-[0.25px]">ssshing@mail.com</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-[14px] pb-[3px]">
                      <button className="hover:opacity-70">
                        <IconMail size={21} className="text-[#64748B]" />
                      </button>
                      <button className="hover:opacity-70">
                        <IconPhone size={21} className="text-[#64748B]" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div className="px-[14px] flex items-start gap-[17.5px]">
                    <div className="w-[24.5px] h-[24.5px] bg-[#E2E8F0] rounded-full flex items-center justify-center flex-shrink-0">
                      <IconMapPin size={16} className="text-[#64748B]" />
                    </div>
                    <span className="text-[12.6px] text-[#1E293B] tracking-[0.25px] leading-[21px]">
                      ABC Supply Co. Inc., Market Street ,<br />Garland , Texas
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Delivery Address Section */}
            <div className="bg-white border-b border-[#E2E8F0]">
              {/* Header */}
              <button 
                onClick={() => setDeliveryAddressExpanded(!deliveryAddressExpanded)}
                className="w-full h-[49px] flex items-center justify-between px-[14px] border-b border-[#E2E8F0]"
              >
                <div className="flex items-center gap-[10.5px]">
                  <DeliveryAddressIcon />
                  <span className="text-[14px] font-semibold text-[#334155]">
                    Delivery Address <span className="text-red-500">*</span>
                  </span>
                </div>
                {deliveryAddressExpanded ? (
                  <IconChevronUp size={16} className="text-[#1E293B]" />
                ) : (
                  <IconChevronDown size={16} className="text-[#1E293B]" />
                )}
              </button>
              
              {deliveryAddressExpanded && (
                <div className="flex flex-col items-center p-[21px]">
                  <img src={SERVICE_ADDRESS_PLACEHOLDER_SVG} alt="Add delivery address" className="h-[176.84px] w-[168px]" />
                  <div className="pt-[21px]">
                    <button className="flex items-center gap-[7px] px-[15px] py-[2.27px] bg-white border border-[#CBD5E1] rounded-[5.25px] hover:bg-gray-50">
                      <IconPlus size={16} className="text-[#334155]" />
                      <span className="text-[12.6px] font-medium text-[#334155] tracking-[0.25px]">Add Delivery Address</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Billing Address Section */}
            <div className="bg-white border-b border-[#E2E8F0]">
              {/* Header */}
              <button 
                onClick={() => setBillingAddressExpanded(!billingAddressExpanded)}
                className="w-full h-[49px] flex items-center justify-between px-[14px] border-b border-[#E2E8F0]"
              >
                <div className="flex items-center gap-[10.5px]">
                  <DeliveryAddressIcon />
                  <span className="text-[14px] font-semibold text-[#334155]">
                    Billing Address <span className="text-red-500">*</span>
                  </span>
                </div>
                <div className="flex items-center gap-0">
                  <button className="p-[3.5px] rounded-full hover:bg-gray-100">
                    <IconPencil size={17.5} className="text-[#64748B]" />
                  </button>
                  <button className="p-[3.5px] rounded-full hover:bg-gray-100">
                    <IconTrash size={17.5} className="text-[#64748B]" />
                  </button>
                  {billingAddressExpanded ? (
                    <IconChevronUp size={16} className="text-[#1E293B]" />
                  ) : (
                    <IconChevronDown size={16} className="text-[#1E293B]" />
                  )}
                </div>
              </button>
              
              {billingAddressExpanded && (
                <div className="p-[10.5px] flex flex-col gap-[10.49px]">
                  <img 
                    src={LOCATION_PREVIEW} 
                    alt="Map" 
                    className="w-full h-[120.7px] object-cover rounded"
                  />
                  <p className="text-[12.6px] text-[#1E293B] tracking-[0.25px] leading-[20px]">
                    ABC Supply Co. Inc., Market Street, Garland,<br />Texas, 75041
                  </p>
                </div>
              )}
            </div>
            
            {/* Attachments Section */}
            <div className="bg-white border-b border-[#E2E8F0]">
              {/* Header */}
              <button 
                onClick={() => setAttachmentsExpanded(!attachmentsExpanded)}
                className="w-full h-[49px] flex items-center justify-between px-[14px] border-b border-[#E2E8F0]"
              >
                <div className="flex items-center gap-[10.5px]">
                  <AttachmentsIcon />
                  <span className="text-[14px] font-semibold text-[#334155]">Attachments</span>
                </div>
                {attachmentsExpanded ? (
                  <IconChevronUp size={16} className="text-[#1E293B]" />
                ) : (
                  <IconChevronDown size={16} className="text-[#1E293B]" />
                )}
              </button>
              
              {attachmentsExpanded && (
                <div className="p-[21px] flex flex-col items-center">
                  <img src={ATTACHMENT_PLACEHOLDER_SVG} alt="Add attachment" className="h-[112px]" />
                  <div className="pt-[14px]">
                    <button className="flex items-center gap-[7px] px-[15px] py-[11.5px] h-[31.5px] bg-white border border-[#CBD5E1] rounded-[5.25px] hover:bg-gray-50">
                      <IconPlus size={16} className="text-[#334155]" />
                      <span className="text-[12.6px] font-medium text-[#334155] tracking-[0.25px]">Add Attachment</span>
                    </button>
                  </div>
                  <div className="pt-[7px] text-center">
                    <p className="text-[12.6px] text-[#334155] tracking-[0.25px] leading-[25.2px]">
                      Add any relevant files and attachments to<br />this Purchase Order
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* PO Line Item Picker Modal */}
      <POLineItemPickerModal
        isOpen={isLineItemPickerOpen}
        onClose={() => setIsLineItemPickerOpen(false)}
        onAddItems={handleAddItems}
        vendorName={formData.vendor}
      />
    </div>
  );
};

export default NewPurchaseOrderPage;
