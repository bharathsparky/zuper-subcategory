import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  IconChevronRight,
  IconChevronDown,
  IconChevronUp,
  IconPlus,
  IconSearch,
  IconX,
  IconGripVertical,
  IconCopy,
  IconTrash,
  IconUpload,
  IconCalendar,
  IconInfoCircle,
  IconPencil,
  IconDotsVertical,
  IconChevronLeft,
  IconPhoto,
  IconCheck,
  IconAlertCircle,
  IconPackage,
  IconEyeOff,
  IconEye,
  IconStack2,
  IconCircleCheck,
  IconSettings,
} from '@tabler/icons-react'

// Asset paths from Figma
const OPTION_IMAGE_PLACEHOLDER = '/assets/1791f56de53e61486987d0d897fea1b223e36154.png'
const FINANCING_LOGO = '/assets/2b3ab2418352a83d92dc56006bb55ba6962725cd.png'
const SAMPLE_OPTION_IMAGE = '/assets/afb39177ea09cbec42ad9c86bc5c7f9c987fb8e0.png'
const ATTACHMENT_ILLUSTRATION = '/assets/c20d710f29392b86b5a2a911024866818be14442.svg'
const SHINGLE_IMG = '/assets/da033c78535aeeb20b5d502e78abe10a95591799.png'
const UNDERLAYMENT_IMG = '/assets/bf22eaf17541a0c18efd5e08e8af2ac6b2cdd606.png'

// ─── Collapsible Section ────────────────────────────────────────────
function CollapsibleSection({ title, children, defaultExpanded = true, headerRight, warningIcon }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-[4px] overflow-hidden">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full h-[42px] px-[21px] flex items-center justify-between hover:bg-[#F8FAFC] transition-colors"
      >
        <div className="flex items-center gap-[8px]">
          <span className="text-[14px] font-semibold text-[#1E293B] leading-[24px]">{title}</span>
        </div>
        <div className="flex items-center gap-[8px]">
          {warningIcon && (
            <IconAlertCircle size={17} stroke={1.5} className="text-[#F97316]" />
          )}
          {headerRight && <div onClick={(e) => e.stopPropagation()}>{headerRight}</div>}
          {isExpanded ? (
            <IconChevronUp size={16} stroke={2} className="text-[#64748B]" />
          ) : (
            <IconChevronDown size={16} stroke={2} className="text-[#64748B]" />
          )}
        </div>
      </button>
      {isExpanded && (
        <div className="border-t border-[#E2E8F0]">
          {children}
        </div>
      )}
    </div>
  )
}

// ─── Customer Information Section ───────────────────────────────────
function CustomerInformationSection() {
  return (
    <div className="px-[21px] py-[21px]">
      <div className="grid grid-cols-3 gap-[21px]">
        <div className="flex flex-col gap-[3.5px]">
          <label className="text-[13px] font-normal text-[#334155] leading-[19px]">Choose Organization</label>
          <div className="h-[38px] px-[11.5px] border border-[#E2E8F0] rounded-[4px] flex items-center">
            <span className="text-[13px] text-[#94A3B8] leading-[15px]">Choose Organization</span>
          </div>
        </div>
        <div className="flex flex-col gap-[3.5px]">
          <label className="text-[13px] font-normal text-[#334155] leading-[19px]">Choose Customer</label>
          <div className="h-[38px] px-[11.5px] border border-[#E2E8F0] rounded-[4px] flex items-center">
            <span className="text-[13px] text-[#94A3B8] leading-[15px]">Click to Choose Customer</span>
          </div>
        </div>
        <div className="flex flex-col gap-[3.5px]">
          <label className="text-[13px] font-normal text-[#334155] leading-[19px]">Choose Property</label>
          <div className="h-[38px] px-[11.5px] border border-[#E2E8F0] rounded-[4px] flex items-center">
            <span className="text-[13px] text-[#94A3B8] leading-[15px]">Choose Property</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Association Section ────────────────────────────────────────────
function AssociationSection() {
  return (
    <div className="px-[21px] py-[22px]">
      <button className="h-[28px] px-[8.75px] flex items-center gap-[3.5px] bg-[#F8FAFC] border border-[#E2E8F0] rounded-[4px] text-[13px] font-normal text-[#334155] hover:bg-[#F1F5F9] transition-colors">
        <IconPlus size={13} stroke={2} className="text-[#64748B]" />
        <span>Add</span>
      </button>
    </div>
  )
}

// ─── Custom Fields Grid ─────────────────────────────────────────────
function CustomFieldInput({ label, type = 'text', hasUpDown = false }) {
  return (
    <div className="flex flex-col gap-[3.5px]">
      <label className="text-[13px] font-normal text-[#334155] leading-[20px]">{label}</label>
      <div className="relative">
        <input
          type="text"
          className="w-full h-[38px] px-[11.5px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#1E293B] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6] transition-colors bg-white"
        />
        {hasUpDown && (
          <div className="absolute right-[11.5px] top-1/2 -translate-y-1/2 w-[15px] h-[15px] bg-[#E2E8F0] rounded-[2px]" />
        )}
      </div>
    </div>
  )
}

function MultiSelectionField({ label, options }) {
  return (
    <div className="flex flex-col gap-[7px]">
      <label className="text-[13px] font-normal text-[#334155] leading-[20px]">{label}</label>
      <div className="flex flex-col gap-[3.5px]">
        {options.map((opt, idx) => (
          <label key={idx} className="flex items-center gap-[7px] cursor-pointer">
            <input type="checkbox" className="w-[14px] h-[14px] rounded-[2px] border-[#CBD5E1] text-[#3B82F6] focus:ring-0" />
            <span className="text-[13px] text-[#334155] leading-[20px]">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

function OtherDetailsSection() {
  return (
    <div className="px-[24px] py-[14px] space-y-[21px]">
      <div className="grid grid-cols-3 gap-[21px]">
        <CustomFieldInput label="Extra Amount" />
        <CustomFieldInput label="Single Line Text for None" />
        <CustomFieldInput label="Single Line Text for Number" hasUpDown />
      </div>
      <div className="grid grid-cols-3 gap-[21px]">
        <CustomFieldInput label="Single Line Text for Mail" />
        <CustomFieldInput label="Single Line Text for Phone No" />
        <CustomFieldInput label="Single Line Text for Address" />
      </div>
      <div className="grid grid-cols-3 gap-[21px]">
        <CustomFieldInput label="Single Line Text for Regex" />
        <CustomFieldInput label="Time - 30" />
        <CustomFieldInput label="Date & Time - 45" />
      </div>
    </div>
  )
}

function TestSection() {
  return (
    <div className="px-[24px] py-[14px] space-y-[21px]">
      <div className="grid grid-cols-3 gap-[21px]">
        <MultiSelectionField label="Multi Selection" options={['option 1, 11', 'option 2, 22']} />
        <CustomFieldInput label="Single Line Text for None" />
        <CustomFieldInput label="Single Line Text for Number" hasUpDown />
      </div>
      <div className="grid grid-cols-3 gap-[21px]">
        <CustomFieldInput label="Single Line Text for Mail" />
        <CustomFieldInput label="Single Line Text for Phone No" />
        <CustomFieldInput label="Single Line Text for Address" />
      </div>
      <div className="grid grid-cols-3 gap-[21px]">
        <CustomFieldInput label="Single Line Text for Regex" />
        <CustomFieldInput label="Time - 60" />
        <CustomFieldInput label="Date & Time - 5" />
      </div>
    </div>
  )
}

// ─── Attachments Section ────────────────────────────────────────────
function AttachmentsSection() {
  return (
    <div className="py-[21px] flex flex-col items-center justify-center">
      <div className="w-full max-w-[1303px] px-[21px]">
        <img src={ATTACHMENT_ILLUSTRATION} alt="Attachments" className="mx-auto h-[112px] object-contain" />
      </div>
      <p className="text-[16px] font-semibold text-[#1E293B] mt-[10px] leading-[27px]">Add Attachments</p>
      <p className="text-[13px] text-[#64748B] mt-[3.5px] leading-[21px]">Add any relevant files and attachments to this Quote</p>
    </div>
  )
}

// ─── Edit Option Dialog ─────────────────────────────────────────────
// Sample line items data for the proposal line item picker (same structure as job/quote module)
const PROPOSAL_LINE_ITEMS_DATA = [
  {
    id: 1,
    itemId: '#RF-2041',
    name: 'GAF Timberline HDZ Shingles',
    availableQty: 56,
    unit: 'Sq',
    minQty: 1,
    category: 'Roofing',
    productType: 'Product',
    location: 'Main Warehouse (56)',
    unitCost: '95',
    markup: '',
    unitSellingPrice: '145',
    hasOptions: true,
    options: [
      { id: 'opt-1', name: 'Weathered Wood', color: '#8B7355' },
      { id: 'opt-2', name: 'Charcoal', color: '#4A4A4A' },
      { id: 'opt-3', name: 'Slate', color: '#708090' },
      { id: 'opt-4', name: 'Barkwood', color: '#6B4226' },
    ],
  },
  {
    id: 2,
    itemId: '#RF-3082',
    name: 'Synthetic Roof Underlayment',
    availableQty: 98,
    unit: 'Rolls',
    minQty: null,
    category: 'Roofing',
    productType: 'Product',
    location: null,
    unitCost: '85',
    markup: '',
    unitSellingPrice: '130',
    hasOptions: false,
    options: [],
  },
  {
    id: 3,
    itemId: '#RF-1157',
    name: 'Ridge Vent System',
    availableQty: 24,
    unit: 'LF',
    minQty: 1,
    category: 'Ventilation',
    productType: 'Product',
    location: 'Main Warehouse (24)',
    unitCost: '12',
    markup: '',
    unitSellingPrice: '22',
    hasOptions: true,
    options: [
      { id: 'opt-1', name: 'Aluminum', color: '#C0C0C0' },
      { id: 'opt-2', name: 'Galvanized Steel', color: '#8A8D8F' },
      { id: 'opt-3', name: 'Plastic (Black)', color: '#2D2D2D' },
      { id: 'opt-4', name: 'Copper', color: '#B87333' },
    ],
  },
  {
    id: 4,
    itemId: '#RF-5500',
    name: 'Roof Tear-Off & Disposal',
    availableQty: 1,
    unit: 'Job',
    minQty: null,
    category: 'Labor',
    productType: 'Service',
    location: null,
    unitCost: '',
    markup: '',
    unitSellingPrice: '1,800',
    hasOptions: false,
    options: [],
  },
  {
    id: 5,
    itemId: '#RF-4420',
    name: 'Drip Edge Flashing',
    availableQty: 120,
    unit: 'LF',
    minQty: 10,
    category: 'Flashing',
    productType: 'Part',
    location: 'Main Warehouse (120)',
    unitCost: '3',
    markup: '',
    unitSellingPrice: '6',
    hasOptions: true,
    options: [
      { id: 'opt-1', name: 'White', color: '#F8FAFC' },
      { id: 'opt-2', name: 'Brown', color: '#6B4226' },
      { id: 'opt-3', name: 'Black', color: '#1F2937' },
    ],
  },
]

// Option Selector for Proposal Line Item Picker
function ProposalPickerOptionSelector({ options, selectedOption, onChange }) {
  const [isOpen, setIsOpen] = useState(false)

  if (!options || options.length === 0) {
    return <span className="text-[13px] text-[#94A3B8]">—</span>
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
                  onChange(option)
                  setIsOpen(false)
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
  )
}

// Choose Line Item Modal for Proposal (same as job/quote module)
function ProposalChooseLineItemModal({ isOpen, onClose, onAddProducts }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedItems, setSelectedItems] = useState({})
  const [itemValues, setItemValues] = useState({})
  const [selectedOptions, setSelectedOptions] = useState({})
  const totalPages = 20

  const handleCheckboxChange = (itemId) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  const handleOptionChange = (itemId, option) => {
    setSelectedOptions(prev => ({
      ...prev,
      [itemId]: option
    }))
  }

  const handleValueChange = (itemId, field, value) => {
    setItemValues(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value
      }
    }))
  }

  const handleAdd = () => {
    // Collect all selected items and build line items
    const newItems = PROPOSAL_LINE_ITEMS_DATA
      .filter(item => selectedItems[item.id])
      .map(item => {
        const values = itemValues[item.id] || {}
        const selectedOption = selectedOptions[item.id] || null
        const qty = parseInt(values.quantity) || 1
        const unitCost = parseFloat(values.unitCost || item.unitCost) || 0
        const markup = parseFloat(values.markup) || 0
        const sellingPrice = parseFloat(values.unitSellingPrice || item.unitSellingPrice) || 0

        return {
          id: Date.now() + item.id,
          image: null,
          productId: item.itemId,
          name: item.name,
          description: `Available Qty: ${item.availableQty} ${item.unit}`,
          brand: item.category,
          specification: item.productType,
          location: item.location || '---',
          unitCost: `$${unitCost.toLocaleString('en-US', { minimumFractionDigits: 3 })}`,
          markup: markup > 0 ? `$${markup.toLocaleString('en-US', { minimumFractionDigits: 3 })}` : '-',
          priceQty: `${qty}`,
          priceAmount: `$${sellingPrice.toLocaleString('en-US', { minimumFractionDigits: 3 })}`,
          total: `$${(sellingPrice * qty).toLocaleString('en-US', { minimumFractionDigits: 3 })}`,
          hasOptions: item.hasOptions,
          options: item.options,
          selectedOption: selectedOption,
        }
      })

    if (onAddProducts) {
      onAddProducts(newItems)
    }
    // Reset state
    setSelectedItems({})
    setItemValues({})
    setSelectedOptions({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
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
              {PROPOSAL_LINE_ITEMS_DATA.map((item) => (
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
                      <ProposalPickerOptionSelector
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
                      onChange={(e) => handleValueChange(item.id, 'unitCost', e.target.value)}
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
                        onChange={(e) => handleValueChange(item.id, 'markup', e.target.value)}
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
                      onChange={(e) => handleValueChange(item.id, 'unitSellingPrice', e.target.value)}
                      className="w-[80px] h-[36px] px-[10px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6] bg-white"
                    />
                  </td>
                  {/* Quantity */}
                  <td className="px-[12px] py-[16px]">
                    <input
                      type="text"
                      onChange={(e) => handleValueChange(item.id, 'quantity', e.target.value)}
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
            onClick={handleAdd}
            className="h-[40px] px-[20px] bg-[#E44A19] rounded-[6px] text-[14px] font-medium text-white hover:bg-[#D13D0F] transition-colors"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  )
}

// Option selector for the EditOptionDialog table rows
function EditOptionTableSelector({ options, selectedOption, onPreview }) {
  if (!options || options.length === 0) {
    return <span className="text-[12.6px] text-[#94A3B8]">—</span>
  }

  return (
    <div className="flex items-center gap-[6px]">
      {selectedOption ? (
        <>
          <button
            onClick={() => onPreview && onPreview(selectedOption)}
            className="group relative"
            title="Click to preview"
          >
            <div
              className="w-[14px] h-[14px] rounded-[3px] border border-[#E2E8F0] flex-shrink-0 group-hover:ring-2 group-hover:ring-[#3B82F6] transition-all"
              style={{ backgroundColor: selectedOption.color }}
            />
            {/* Expand icon on hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-[3px] opacity-0 group-hover:opacity-100 transition-opacity">
              <svg width="8" height="8" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M6 1H1v5M15 1h-5M1 10v5h5M10 15h5v-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
          <span className="text-[12.6px] text-[#334155]">{selectedOption.name}</span>
        </>
      ) : (
        <span className="text-[12.6px] text-[#94A3B8]">—</span>
      )}
    </div>
  )
}

// ─── Option Preview Modal ───────────────────────────────────────────
function OptionPreviewModal({ isOpen, onClose, option }) {
  if (!isOpen || !option) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-[12px] w-[360px] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="h-[48px] px-[16px] flex items-center justify-between border-b border-[#E2E8F0]">
          <span className="text-[14px] font-medium text-[#334155]">{option.name}</span>
          <button
            onClick={onClose}
            className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#F1F5F9] transition-colors"
          >
            <IconX size={18} stroke={1.5} className="text-[#64748B]" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="p-[20px]">
          <div className="flex justify-center">
            {option.image ? (
              <img
                src={option.image}
                alt={option.name}
                className="w-[280px] h-[280px] object-cover rounded-[8px] border border-[#E2E8F0]"
              />
            ) : option.color ? (
              <div
                className="w-[280px] h-[280px] rounded-[8px] border-2 border-[#E2E8F0]"
                style={{ backgroundColor: option.color }}
              />
            ) : (
              <div className="w-[280px] h-[280px] rounded-[8px] border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] flex flex-col items-center justify-center gap-[12px]">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <div className="text-center">
                  <p className="text-[14px] font-medium text-[#64748B]">No Image</p>
                  <p className="text-[12px] text-[#94A3B8] mt-1">Image not uploaded for this option</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-[20px] pb-[20px]">
          <button
            onClick={onClose}
            className="w-full h-[40px] border border-[#E2E8F0] rounded-[6px] text-[14px] font-medium text-[#334155] hover:bg-[#F8FAFC] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Add Section Popover (just name input) ─────────────────────────
function AddSectionPopover({ onAdd, onClose }) {
  const [name, setName] = useState('')
  const popoverRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const handleSubmit = () => {
    if (!name.trim()) return
    onAdd(name.trim())
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div
        ref={popoverRef}
        className="relative bg-white rounded-[12px] shadow-[0px_8px_32px_rgba(0,0,0,0.16)] w-[380px] overflow-hidden"
      >
        <div className="px-[20px] pt-[20px] pb-[6px]">
          <h3 className="text-[15px] font-semibold text-[#1E293B]">Add Section</h3>
          <p className="text-[12px] text-[#64748B] mt-[2px]">Enter a name for the new section</p>
        </div>
        <div className="px-[20px] py-[12px]">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); if (e.key === 'Escape') onClose() }}
            placeholder="e.g. Roofing Materials, Labor, etc."
            autoFocus
            className="w-full h-[40px] px-[12px] border border-[#E2E8F0] rounded-[8px] text-[14px] text-[#1E293B] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 transition-all bg-white"
          />
        </div>
        <div className="px-[20px] pb-[16px] flex items-center justify-end gap-[8px]">
          <button
            onClick={onClose}
            className="h-[34px] px-[14px] border border-[#E2E8F0] rounded-[6px] text-[13px] font-medium text-[#334155] bg-white hover:bg-[#F8FAFC] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="h-[34px] px-[16px] bg-[#E44A19] rounded-[6px] text-[13px] font-medium text-white hover:bg-[#D03F14] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Section
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Toggle Switch Component ────────────────────────────────────────
function ToggleSwitch({ checked, onChange, size = 'default', disabled = false }) {
  const w = size === 'small' ? 'w-[38px]' : 'w-[44px]'
  const h = size === 'small' ? 'h-[22px]' : 'h-[24px]'
  const dotSize = size === 'small' ? 'w-[16px] h-[16px]' : 'w-[18px] h-[18px]'
  const dotOn = size === 'small' ? 'left-[19px]' : 'left-[23px]'
  return (
    <button
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`relative ${w} ${h} rounded-full transition-colors flex-shrink-0 ${
        disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
      } ${
        checked ? 'bg-[#E44A19]' : 'bg-[#CBD5E1]'
      }`}
    >
      <div className={`absolute top-[3px] ${dotSize} bg-white rounded-full shadow-sm transition-transform ${
        checked ? dotOn : 'left-[3px]'
      }`} />
    </button>
  )
}

// ─── Section Configuration Sheet (simplified) ───────────────────────
function SectionConfigSheet({ header, onUpdateDisplay, onUpdateSubtotal, onUpdateChildPrices, onUpdateName, onSave, onClose }) {
  const sectionDisplay = header.sectionDisplay || 'expanded'
  const showSubtotal = header.showSubtotal || false
  const showChildPrices = header.showChildPrices !== false

  const isExpanded = sectionDisplay === 'expanded'
  const isCollapsed = sectionDisplay === 'collapsed'
  const isHidden = sectionDisplay === 'hidden'

  return (
    <div className="fixed inset-0 z-[70]" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Sheet Panel - slides from right */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[400px] bg-white shadow-[0px_8px_32px_rgba(0,0,0,0.18)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sheet Header */}
        <div className="h-[56px] px-[21px] flex items-center justify-between border-b border-[#E2E8F0] flex-shrink-0">
          <h3 className="text-[16px] font-semibold text-[#1E293B]">Section Settings</h3>
          <button
            onClick={onClose}
            className="w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-[#F1F5F9] transition-colors"
          >
            <IconX size={18} stroke={2} className="text-[#64748B]" />
          </button>
        </div>

        {/* Sheet Content */}
        <div className="flex-1 overflow-y-auto p-[21px] space-y-[16px]">
          {/* Section Name */}
          <div className="space-y-[6px]">
            <label className="text-[13px] font-medium text-[#334155]">Section Name</label>
            <input
              type="text"
              value={header.name}
              onChange={(e) => onUpdateName?.(e.target.value)}
              placeholder="Enter section name"
              className="w-full h-[38px] px-[11px] border border-[#E2E8F0] rounded-[6px] text-[13px] text-[#1E293B] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/20 transition-colors bg-white"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-[#E2E8F0]" />

          {/* Simple Toggles */}
          <div className="space-y-[4px]">
            <h4 className="text-[14px] font-semibold text-[#1E293B] mb-[12px]">Display Settings</h4>

            {/* Show child items (expanded vs collapsed) */}
            <div className={`flex items-center justify-between py-[12px] px-[14px] rounded-[8px] transition-colors ${isHidden ? 'opacity-50' : 'hover:bg-[#F8FAFC]'}`}>
              <div className="flex items-center gap-[10px]">
                <IconEye size={18} stroke={1.8} className="text-[#64748B]" />
                <div>
                  <span className="text-[13px] font-medium text-[#1E293B]">Show child items</span>
                  <p className="text-[11px] text-[#94A3B8] mt-[1px]">Expand items under this section for customers</p>
                </div>
              </div>
              <ToggleSwitch
                checked={isExpanded}
                onChange={(val) => onUpdateDisplay(val ? 'expanded' : 'collapsed')}
                disabled={isHidden}
              />
            </div>

            {/* Show section total */}
            <div className={`flex items-center justify-between py-[12px] px-[14px] rounded-[8px] transition-colors ${isHidden ? 'opacity-50' : 'hover:bg-[#F8FAFC]'}`}>
              <div className="flex items-center gap-[10px]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                <div>
                  <span className="text-[13px] font-medium text-[#1E293B]">Show section total</span>
                  <p className="text-[11px] text-[#94A3B8] mt-[1px]">Display aggregate subtotal for this section</p>
                </div>
              </div>
              <ToggleSwitch
                checked={showSubtotal}
                onChange={(val) => onUpdateSubtotal(val)}
                disabled={isHidden}
              />
            </div>

            {/* Show child prices — always visible, disabled when collapsed or hidden */}
            <div className={`flex items-center justify-between py-[12px] px-[14px] rounded-[8px] transition-colors ${(isCollapsed || isHidden) ? 'opacity-50' : 'hover:bg-[#F8FAFC]'}`}>
              <div className="flex items-center gap-[10px]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                <div>
                  <span className="text-[13px] font-medium text-[#1E293B]">Show child prices</span>
                  <p className="text-[11px] text-[#94A3B8] mt-[1px]">
                    {isCollapsed ? 'Enable "Show child items" first' : 'Display individual price for each line item'}
                  </p>
                </div>
              </div>
              <ToggleSwitch
                checked={showChildPrices}
                onChange={(val) => onUpdateChildPrices(val)}
                disabled={isCollapsed || isHidden}
              />
            </div>

            {/* Divider */}
            <div className="border-t border-[#E2E8F0] my-[4px]" />

            {/* Hide from proposal */}
            <div className="flex items-center justify-between py-[12px] px-[14px] rounded-[8px] hover:bg-[#FEF2F2]/60 transition-colors">
              <div className="flex items-center gap-[10px]">
                <IconEyeOff size={18} stroke={1.8} className={isHidden ? 'text-[#DC2626]' : 'text-[#64748B]'} />
                <div>
                  <span className={`text-[13px] font-medium ${isHidden ? 'text-[#DC2626]' : 'text-[#1E293B]'}`}>Hide from proposal</span>
                  <p className="text-[11px] text-[#94A3B8] mt-[1px]">Completely hide this section from customer view</p>
                </div>
              </div>
              <ToggleSwitch
                checked={isHidden}
                onChange={(val) => {
                  if (val) {
                    onUpdateDisplay('hidden')
                  } else {
                    onUpdateDisplay('expanded')
                  }
                }}
              />
            </div>

            {/* Hidden Mode Warning */}
            {isHidden && (
              <div className="mx-[4px] border border-[#FECACA] bg-[#FEF2F2] rounded-[8px] p-[12px]">
                <div className="flex items-start gap-[8px]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-[1px]">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  <p className="text-[11px] text-[#991B1B] leading-[16px]">
                    Pricing across the entire proposal will be hidden. Only the final total will be visible.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sheet Footer */}
        <div className="border-t border-[#E2E8F0] px-[21px] py-[14px] flex items-center justify-end gap-[10px] flex-shrink-0">
          <button
            onClick={onClose}
            className="h-[36px] px-[16px] border border-[#E2E8F0] rounded-[6px] text-[13px] font-medium text-[#334155] bg-white hover:bg-[#F8FAFC] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={!header.name?.trim()}
            className="h-[36px] px-[20px] bg-[#E44A19] border border-[#E44A19] rounded-[6px] text-[13px] font-medium text-white hover:bg-[#D03F14] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Sortable Table Row for Drag & Drop ────────────────────────────────
function SortableTableRow({ id, children, className = '', style: extraStyle, ...rest }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : undefined,
    ...extraStyle,
  }

  return (
    <tr ref={setNodeRef} style={style} className={`${className} ${isDragging ? 'shadow-lg' : ''}`} {...attributes} {...rest}>
      {typeof children === 'function'
        ? children({ dragHandleRef: setActivatorNodeRef, dragHandleListeners: listeners, isDragging })
        : children}
    </tr>
  )
}

function EditOptionDialog({ option, onClose, onUpdate }) {
  const [packageName, setPackageName] = useState(option?.title || '')
  const [packageDescription, setPackageDescription] = useState(option?.description || '')
  const [profitMargin, setProfitMargin] = useState('-48.15')
  const [depositAmount, setDepositAmount] = useState('0')
  const [costBreakdownExpanded, setCostBreakdownExpanded] = useState(true)
  const [showAddMenu, setShowAddMenu] = useState(false)
  const [showLineItemPicker, setShowLineItemPicker] = useState(false)
  const [sectionConfigOpen, setSectionConfigOpen] = useState(false)
  const [headerBeingConfigured, setHeaderBeingConfigured] = useState(null)
  const [isAddingNewSection, setIsAddingNewSection] = useState(false)
  const [sectionKebabOpenId, setSectionKebabOpenId] = useState(null)
  const [uiCollapsedSections, setUiCollapsedSections] = useState(new Set()) // UI-only: tracks which sections are visually collapsed in the builder
  const [sectionAddMenuId, setSectionAddMenuId] = useState(null) // tracks which section's inline "+ Add" dropdown is open
  const [sectionAddMenuPos, setSectionAddMenuPos] = useState({ top: 0, left: 0 }) // position for fixed dropdown
  const [addToSectionId, setAddToSectionId] = useState(null) // tracks target section when opening line item picker from section
  const [previewOption, setPreviewOption] = useState(null) // option being previewed in modal
  const sectionKebabRef = useRef(null)
  const sectionAddMenuRef = useRef(null)
  const addMenuRef = useRef(null)

  // Stateful line items - initialized with sample data, updated when items are added from picker
  const [lineItems, setLineItems] = useState([
    {
      id: 1,
      type: 'header',
      name: 'Roofing Materials',
      sectionDisplay: 'expanded',
      sectionHidden: false,
      showSubtotal: true,
      showChildPrices: true,
    },
    {
      id: 2,
      type: 'item',
      image: SHINGLE_IMG,
      productId: '#RF-2041',
      name: 'GAF Timberline HDZ Shingles',
      description: 'Lifetime architectural shingles with LayerLock technology',
      brand: 'GAF',
      specification: 'Weathered Wood',
      location: 'Main Warehouse',
      unitCost: '$95.000',
      markup: '$50.000',
      priceQty: '24',
      priceAmount: '$145.000',
      total: '$3,480.000',
      hasOptions: true,
      options: [
        { id: 'opt-1', name: 'Weathered Wood', color: '#8B7355' },
        { id: 'opt-2', name: 'Charcoal', color: '#4A4A4A' },
        { id: 'opt-3', name: 'Slate', color: '#708090' },
      ],
      selectedOption: { id: 'opt-1', name: 'Weathered Wood', color: '#8B7355' },
    },
    {
      id: 3,
      type: 'item',
      image: UNDERLAYMENT_IMG,
      productId: '#RF-3082',
      name: 'Synthetic Roof Underlayment',
      description: 'High-performance synthetic underlayment for added protection',
      brand: 'CertainTeed',
      specification: '4ft x 250ft Roll',
      location: 'Main Warehouse',
      unitCost: '$85.000',
      markup: '$45.000',
      priceQty: '6',
      priceAmount: '$130.000',
      total: '$780.000',
      hasOptions: false,
      options: [],
      selectedOption: null,
    }
  ])

  // Show the add section name popover
  const handleStartAddSection = () => {
    setIsAddingNewSection(true)
  }

  // Create section with just a name — defaults: expanded, subtotal enabled
  const handleCreateSection = (name) => {
    const newSection = {
      id: Date.now(),
      type: 'header',
      name,
      sectionDisplay: 'expanded',
      sectionHidden: false,
      showSubtotal: true,
      showChildPrices: true,
    }
    setLineItems(prev => [...prev, newSection])
    setIsAddingNewSection(false)
  }

  // Handle adding products from the line item picker
  const handleAddProducts = (newItems) => {
    const itemsToAdd = newItems.map(item => ({ ...item, type: 'item' }))
    if (addToSectionId) {
      // Insert items after the last child of the target section
      setLineItems(prev => {
        const result = [...prev]
        // Find the section header index
        const sectionIdx = result.findIndex(li => li.id === addToSectionId)
        if (sectionIdx === -1) return [...prev, ...itemsToAdd]
        // Find the insertion point: after the last child belonging to this section
        let insertIdx = sectionIdx + 1
        while (insertIdx < result.length && result[insertIdx].type !== 'header') {
          insertIdx++
        }
        result.splice(insertIdx, 0, ...itemsToAdd)
        return result
      })
      setAddToSectionId(null)
    } else {
      setLineItems(prev => [...prev, ...itemsToAdd])
    }
  }

  // Toggle section UI collapse/expand via chevron click (builder view only, does NOT change customer-facing sectionDisplay)
  const handleToggleSectionCollapse = (itemId) => {
    setUiCollapsedSections(prev => {
      const next = new Set(prev)
      if (next.has(itemId)) {
        next.delete(itemId)
      } else {
        next.add(itemId)
      }
      return next
    })
  }

  // Open section configuration sheet
  const handleOpenSectionConfig = (item) => {
    setHeaderBeingConfigured({ ...item })
    setSectionConfigOpen(true)
  }

  // Update section display mode
  const updateSectionDisplay = (mode) => {
    setHeaderBeingConfigured(prev => {
      const updated = { ...prev, sectionDisplay: mode }
      if (mode === 'hidden') {
        // Hidden mode: toggles are disabled in UI, preserve values so they restore on unhide
        updated.sectionHidden = true
      } else if (mode === 'collapsed') {
        updated.sectionHidden = false
        // Collapsed: child prices not applicable (children are hidden), auto-disable
        updated.showChildPrices = false
      } else if (mode === 'expanded') {
        updated.sectionHidden = false
        // Expanded: if child prices were auto-disabled by collapsed, restore to true
        if (prev.sectionDisplay === 'collapsed' || prev.showChildPrices === undefined) {
          updated.showChildPrices = true
        }
      }
      return updated
    })
  }

  // Save section configuration (for existing sections)
  const handleSaveSectionConfig = () => {
    setLineItems(prev => prev.map(item =>
      item.id === headerBeingConfigured.id
        ? {
            ...item,
            name: headerBeingConfigured.name,
            sectionDisplay: headerBeingConfigured.sectionDisplay,
            sectionHidden: headerBeingConfigured.sectionHidden,
            showSubtotal: headerBeingConfigured.showSubtotal,
            showChildPrices: headerBeingConfigured.showChildPrices,
          }
        : item
    ))
    setSectionConfigOpen(false)
    setHeaderBeingConfigured(null)
    setIsAddingNewSection(false)
  }

  // Close add menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (addMenuRef.current && !addMenuRef.current.contains(e.target)) {
        setShowAddMenu(false)
      }
    }
    if (showAddMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showAddMenu])

  // Close section kebab on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sectionKebabRef.current && !sectionKebabRef.current.contains(e.target)) {
        setSectionKebabOpenId(null)
      }
    }
    if (sectionKebabOpenId !== null) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [sectionKebabOpenId])

  // Close section inline add menu on click outside
  useEffect(() => {
    if (sectionAddMenuId === null) return
    const handleClickOutside = (e) => {
      // Check if click is inside the dropdown menu itself
      if (sectionAddMenuRef.current && sectionAddMenuRef.current.contains(e.target)) return
      // Check if click is on the section add button (data attribute)
      if (e.target.closest('[data-section-add-btn]')) return
      setSectionAddMenuId(null)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [sectionAddMenuId])

  // Clone a section
  const handleCloneSection = (item) => {
    const cloned = {
      ...item,
      id: Date.now(),
      name: `${item.name} (Copy)`,
    }
    setLineItems(prev => {
      const idx = prev.findIndex(li => li.id === item.id)
      const updated = [...prev]
      updated.splice(idx + 1, 0, cloned)
      return updated
    })
    setSectionKebabOpenId(null)
  }

  // Remove a section
  const handleRemoveSection = (itemId) => {
    setLineItems(prev => prev.filter(li => li.id !== itemId))
    setSectionKebabOpenId(null)
  }

  // ── Drag & Drop Setup ───────────────────────────────────────────────
  const dndSensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )
  const [activeDragId, setActiveDragId] = useState(null)

  // Pre-compute section membership for rendering & DnD
  const sectionMap = useMemo(() => {
    let currentSectionId = null
    const map = []
    for (let i = 0; i < lineItems.length; i++) {
      if (lineItems[i].type === 'header') {
        currentSectionId = lineItems[i].id
        map.push({ item: lineItems[i], sectionId: null, isLastInSection: false })
      } else {
        map.push({ item: lineItems[i], sectionId: currentSectionId, isLastInSection: false })
      }
    }
    // Mark last child in each section group
    for (let i = map.length - 1; i >= 0; i--) {
      if (map[i].sectionId && map[i].item.type !== 'header') {
        const nextItem = map[i + 1]
        if (!nextItem || nextItem.item.type === 'header' || nextItem.sectionId !== map[i].sectionId) {
          map[i].isLastInSection = true
        }
      }
    }
    return map
  }, [lineItems])

  // IDs of visible items (exclude UI-collapsed children) for SortableContext
  const visibleItemIds = useMemo(() => {
    return sectionMap
      .filter(({ item, sectionId }) => {
        if (item.type !== 'header' && sectionId && uiCollapsedSections.has(sectionId)) return false
        return true
      })
      .map(({ item }) => item.id)
  }, [sectionMap, uiCollapsedSections])

  // Drag start handler
  const handleDragStart = useCallback((event) => {
    setActiveDragId(event.active.id)
    // Close any open menus
    setSectionAddMenuId(null)
    setSectionKebabOpenId(null)
    setShowAddMenu(false)
  }, [])

  // Drag end handler — supports reordering items and moving between/into sections
  const handleLineItemDragEnd = useCallback((event) => {
    setActiveDragId(null)
    const { active, over } = event
    if (!over || active.id === over.id) return

    setLineItems(prev => {
      const items = [...prev]
      const activeIdx = items.findIndex(i => i.id === active.id)
      const overIdx = items.findIndex(i => i.id === over.id)
      if (activeIdx === -1 || overIdx === -1) return prev

      const activeItem = items[activeIdx]

      if (activeItem.type === 'header') {
        // ── Dragging a Section Header: move header + all its children as a group ──
        let groupEnd = activeIdx + 1
        while (groupEnd < items.length && items[groupEnd].type !== 'header') {
          groupEnd++
        }
        // Extract the section group
        const sectionGroup = items.splice(activeIdx, groupEnd - activeIdx)

        // Find new position of the "over" item after splice
        const newOverIdx = items.findIndex(i => i.id === over.id)
        if (newOverIdx === -1) {
          // over item was part of our group (edge case) — append
          return [...items, ...sectionGroup]
        }

        // Determine insertion point
        const overItem = items[newOverIdx]
        if (overItem.type === 'header') {
          // Insert before this header
          items.splice(newOverIdx, 0, ...sectionGroup)
        } else {
          // Insert after this item
          items.splice(newOverIdx + 1, 0, ...sectionGroup)
        }
        return items
      } else {
        // ── Dragging a Regular Item: simple reorder ──
        return arrayMove(items, activeIdx, overIdx)
      }
    })
  }, [])

  const taxes = [
    { name: 'RT (10%)', amount: '$135.000' },
    { name: 'CGST as (24%)', amount: '$324.000' },
    { name: 'Elite Tax (27%)', amount: '$364.500' },
    { name: 'MMM (2%)', amount: '$27.000' }
  ]

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate({ ...option, title: packageName, description: packageDescription })
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="bg-white w-full h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-[#CBD5E1] flex items-center justify-between px-[17.5px] py-[10.5px] flex-shrink-0">
          <span className="text-[17.5px] font-semibold text-[rgba(30,41,59,0.87)] leading-[28px]">
            Edit Option - '{packageName || option?.title || 'Untitled'}'
          </span>
          <button
            onClick={onClose}
            className="w-[31.5px] h-[31.5px] flex items-center justify-center rounded-full hover:bg-[#F1F5F9] transition-colors"
          >
            <IconX size={15.5} stroke={2} className="text-[rgba(30,41,59,0.87)]" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Left Sidebar */}
          <div className="w-[360px] border-r border-[#CBD5E1] flex-shrink-0">
            <div className="p-[21px] flex flex-col gap-[10.5px]">
              {/* Package Name */}
              <div className="flex flex-col gap-[3.5px]">
                <label className="text-[12.6px] font-medium text-[#334155] leading-[18.9px]">
                  Package Name <span className="text-[#E74C3C]">*</span>
                </label>
                <input
                  type="text"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  className="w-full h-[42px] px-[11.5px] border border-[#CBD5E1] rounded-[5.25px] text-[12.6px] text-[#1E293B] outline-none focus:border-[#3B82F6] transition-colors shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
                />
              </div>
              {/* Package Description */}
              <div className="flex flex-col gap-[3.5px] pb-[5.5px]">
                <label className="text-[12.6px] font-medium text-[#334155] leading-[18.9px]">
                  Package Description
                </label>
                <textarea
                  value={packageDescription}
                  onChange={(e) => setPackageDescription(e.target.value)}
                  rows={2}
                  className="w-full px-[11.5px] py-[11.5px] border border-[#CBD5E1] rounded-[5.25px] text-[12px] text-[#1E293B] outline-none focus:border-[#3B82F6] transition-colors resize-none leading-[18px]"
                />
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 flex flex-col min-w-0 overflow-auto bg-white">
            {/* Parts & Services Header */}
            <div className="flex items-center justify-between px-[21px] py-[10.5px] flex-shrink-0">
              <span className="text-[15.8px] font-semibold text-[#1E293B] leading-[23.63px]">Parts & Services</span>
              <div className="flex items-center gap-0">
                {/* Settings Button */}
                <div className="h-[31.5px] flex items-center mr-[10.5px]">
                  <button className="h-[31.5px] w-[31.5px] flex items-center justify-center border border-[#CBD5E1] rounded-[5.25px] hover:bg-[#F8FAFC] transition-colors">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  </button>
                </div>
                {/* + Add Button with Dropdown */}
                <div className="relative" ref={addMenuRef}>
                  <button
                    onClick={() => setShowAddMenu(!showAddMenu)}
                    className="h-[31.5px] px-[15px] flex items-center gap-[7px] border border-[#CBD5E1] rounded-[5.25px] text-[12.6px] font-medium text-[#334155] bg-white hover:bg-[#F8FAFC] transition-colors"
                  >
                    <IconPlus size={13} stroke={2} className="text-[#334155]" />
                    Add
                  </button>
                  {showAddMenu && (
                    <div className="absolute right-0 top-full mt-[4px] w-[200px] bg-white border border-[#E2E8F0] rounded-[8px] shadow-[0px_4px_16px_rgba(0,0,0,0.12)] z-50 py-[6px]">
                      {[
                        { label: 'Line Item', id: 'line-item' },
                        { label: 'Bundle', id: 'bundle' },
                        { label: 'Section', id: 'section' },
                        { label: 'Item Group', id: 'item-group' },
                        { label: 'Custom Line Item', id: 'custom-line-item' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setShowAddMenu(false)
                            if (item.id === 'line-item') {
                              setAddToSectionId(null)
                              setShowLineItemPicker(true)
                            } else if (item.id === 'section') {
                              handleStartAddSection()
                            }
                          }}
                          className="w-full text-left px-[16px] py-[10px] text-[14px] text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="border-t border-[#E2E8F0] flex-shrink-0">
              <div className="overflow-x-auto">
              <DndContext
                sensors={dndSensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleLineItemDragEnd}
              >
                <table className="w-full min-w-[1080px]" style={{ borderCollapse: 'collapse' }}>
                  <thead>
                    <tr className="bg-[#F8FAFC]">
                      <th className="w-[41px] px-[14px] py-[17px] border-b border-[#E2E8F0] text-left">
                        <input type="checkbox" className="w-[13px] h-[13px] rounded-[2.5px] border-[#767676] cursor-pointer" />
                      </th>
                      <th className="w-[41px] px-[14px] py-[17px] border-b border-[#E2E8F0] text-left">
                        <span className="text-[12.6px] font-medium text-[#475569] leading-[18.9px]">#</span>
                      </th>
                      <th className="px-[14px] py-[17px] border-b border-[#E2E8F0] text-left min-w-[164px]">
                        <span className="text-[12.6px] font-medium text-[#475569] leading-[18.9px]">Product / Service</span>
                      </th>
                      <th className="px-[14px] py-[17px] border-b border-[#E2E8F0] text-left min-w-[140px]">
                        <span className="text-[12.6px] font-medium text-[#475569] leading-[18.9px]">Option</span>
                      </th>
                      <th className="px-[14px] py-[17px] border-b border-[#E2E8F0] text-left min-w-[123px]">
                        <span className="text-[12.6px] font-medium text-[#475569] leading-[18.9px]">Brand</span>
                      </th>
                      <th className="px-[14px] py-[17px] border-b border-[#E2E8F0] text-left min-w-[123px]">
                        <span className="text-[12.6px] font-medium text-[#475569] leading-[18.9px]">Specification</span>
                      </th>
                      <th className="px-[14px] py-[17px] border-b border-[#E2E8F0] text-left min-w-[123px]">
                        <span className="text-[12.6px] font-medium text-[#475569] leading-[18.9px]">Location</span>
                      </th>
                      <th className="px-[14px] py-[17px] border-b border-[#E2E8F0] text-left min-w-[82px]">
                        <span className="text-[12.6px] font-medium text-[#475569] leading-[18.9px]">Unit Cost</span>
                      </th>
                      <th className="px-[14px] py-[17px] border-b border-[#E2E8F0] text-left min-w-[82px]">
                        <span className="text-[12.6px] font-medium text-[#475569] leading-[18.9px]">Markup</span>
                      </th>
                      <th className="px-[14px] py-[17px] border-b border-[#E2E8F0] text-left min-w-[180px]">
                        <span className="text-[12.6px] font-medium text-[#475569] leading-[18.9px]">Price</span>
                      </th>
                      <th className="px-[14px] py-[17px] border-b border-[#E2E8F0] text-left min-w-[82px]">
                        <span className="text-[12.6px] font-medium text-[#475569] leading-[18.9px]">Total</span>
                      </th>
                      <th className="w-[72px] px-[14px] py-[17px] border-b border-[#E2E8F0] text-left sticky right-0 bg-[#F8FAFC]">
                        <span className="text-[12.6px] font-medium text-[#475569] leading-[18.9px]">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <SortableContext items={visibleItemIds} strategy={verticalListSortingStrategy}>
                  <tbody>
                    {sectionMap.map(({ item, sectionId, isLastInSection }, idx) => {
                      // Skip child items of UI-collapsed sections (builder view only)
                      if (item.type !== 'header' && sectionId && uiCollapsedSections.has(sectionId)) {
                        return null
                      }

                      // Section Header Row
                      if (item.type === 'header') {
                        const displayMode = item.sectionDisplay || 'expanded' // customer-facing config (badge)
                        const isDisplayCollapsed = displayMode === 'collapsed'
                        const isDisplayHidden = displayMode === 'hidden'
                        // UI-only collapse state (builder view toggle via chevron)
                        const isUiCollapsed = uiCollapsedSections.has(item.id)
                        // Check if this section has visible children in the builder
                        const hasChildren = !isUiCollapsed && sectionMap.some(s => s.sectionId === item.id && s.item.type !== 'header')

                        const sectionBg = isDisplayHidden ? 'bg-[#FEF2F2]/40' : isDisplayCollapsed ? 'bg-[#FFF7ED]/40' : 'bg-[#EFF6FF]'
                        const sectionBorderColor = isDisplayHidden ? 'border-l-[#FCA5A5]' : isDisplayCollapsed ? 'border-l-[#FDBA74]' : 'border-l-[#3B82F6]'
                        const sectionDragColor = isDisplayHidden ? '#DC2626' : isDisplayCollapsed ? '#C2410C' : '#3B82F6'
                        const sectionChevronColor = isDisplayHidden ? 'text-[#DC2626]' : isDisplayCollapsed ? 'text-[#C2410C]' : 'text-[#3B82F6]'

                        return (
                          <SortableTableRow key={item.id} id={item.id} className={sectionBg}>
                            {({ dragHandleRef, dragHandleListeners }) => (
                            <>
                            <td className={`px-[14px] py-[10px] ${hasChildren ? '' : 'border-b border-[#E2E8F0]'} align-middle border-l-[3px] ${sectionBorderColor}`}>
                              <input type="checkbox" className="w-[13px] h-[13px] rounded-[2.5px] border-[#767676] cursor-pointer" />
                            </td>
                            <td
                              ref={dragHandleRef}
                              {...dragHandleListeners}
                              className={`px-[14px] py-[10px] ${hasChildren ? '' : 'border-b border-[#E2E8F0]'} align-middle cursor-grab active:cursor-grabbing`}
                            >
                              <svg width="17.68" height="17.5" viewBox="0 0 24 24" fill="none" stroke={sectionDragColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="4" y1="6" x2="4" y2="6.01" />
                                <line x1="12" y1="6" x2="12" y2="6.01" />
                                <line x1="4" y1="12" x2="4" y2="12.01" />
                                <line x1="12" y1="12" x2="12" y2="12.01" />
                                <line x1="4" y1="18" x2="4" y2="18.01" />
                                <line x1="12" y1="18" x2="12" y2="18.01" />
                              </svg>
                            </td>
                            <td colSpan={9} className={`px-[14px] py-[10px] ${hasChildren ? '' : 'border-b border-[#E2E8F0]'} align-middle`}>
                              <div className="flex items-center gap-[10px]">
                                {/* Section Icon - clickable to toggle UI collapse/expand (builder view only, does NOT change customer-facing display mode) */}
                                <button
                                  onClick={() => handleToggleSectionCollapse(item.id)}
                                  className="w-[20px] h-[20px] flex items-center justify-center rounded hover:bg-black/5 transition-colors flex-shrink-0 cursor-pointer"
                                  title={isUiCollapsed ? 'Expand section items' : 'Collapse section items'}
                                >
                                  <IconChevronDown
                                    size={14}
                                    stroke={2}
                                    className={`${sectionChevronColor} transition-transform ${isUiCollapsed ? '-rotate-90' : ''}`}
                                  />
                                </button>

                                {/* Section Name */}
                                <input
                                  type="text"
                                  value={item.name}
                                  onChange={(e) => setLineItems(prev => prev.map(li =>
                                    li.id === item.id ? { ...li, name: e.target.value } : li
                                  ))}
                                  className="text-[13px] font-semibold text-[#1E293B] leading-[20px] bg-transparent outline-none border-none min-w-[100px] flex-shrink-0"
                                />

                                {/* Display Mode Badge (customer-facing config) */}
                                <div className="flex items-center gap-[6px]">
                                  <span
                                    title={
                                      isDisplayHidden
                                        ? 'Hidden: Section header is hidden from customer view. Items remain editable here.'
                                        : isDisplayCollapsed
                                        ? 'Collapsed: Only the section header is shown to customers. Child items are hidden.'
                                        : 'Expanded: Section header and all child items are visible to customers.'
                                    }
                                    className={`inline-flex items-center gap-1 px-[8px] py-[2px] rounded text-[10px] font-medium cursor-default ${
                                    isDisplayHidden
                                      ? 'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]'
                                      : isDisplayCollapsed
                                      ? 'bg-[#FFF7ED] text-[#C2410C] border border-[#FDBA74]'
                                      : 'bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]'
                                  }`}>
                                    {isDisplayHidden ? (
                                      <IconEyeOff className="w-3 h-3" />
                                    ) : isDisplayCollapsed ? (
                                      <IconStack2 className="w-3 h-3" />
                                    ) : (
                                      <IconEye className="w-3 h-3" />
                                    )}
                                    {displayMode === 'expanded' ? 'Expanded' : displayMode === 'collapsed' ? 'Collapsed' : 'Hidden'}
                                  </span>
                                </div>

                                {/* Inline + Add button for section */}
                                <div className="relative">
                                  <button
                                    data-section-add-btn="true"
                                    onMouseDown={(e) => e.stopPropagation()}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      const rect = e.currentTarget.getBoundingClientRect()
                                      setSectionAddMenuPos({ top: rect.bottom + 4, left: rect.left })
                                      setSectionAddMenuId(prev => prev === item.id ? null : item.id)
                                    }}
                                    className="h-[26px] px-[10px] flex items-center gap-[5px] border border-[#CBD5E1] rounded-[5px] text-[11px] font-medium text-[#334155] bg-white hover:bg-[#F8FAFC] transition-colors"
                                  >
                                    <IconPlus size={11} stroke={2.5} className="text-[#334155]" />
                                    Add
                                  </button>
                                </div>
                              </div>

                              {/* Subtotal display when showSubtotal is enabled (expanded or collapsed) */}
                              {item.showSubtotal && !isDisplayHidden && (() => {
                                // Compute section subtotal from child items
                                const childItems = sectionMap.filter(s => s.sectionId === item.id && s.item.type !== 'header')
                                const subtotal = childItems.reduce((sum, { item: child }) => {
                                  const val = parseFloat((child.total || '').replace(/[^0-9.-]/g, ''))
                                  return sum + (isNaN(val) ? 0 : val)
                                }, 0)
                                return (
                                  <div className="mt-[6px] ml-[38px] text-[12px] text-[#64748B]">
                                    Section Total: <span className="font-semibold text-[#1E293B]">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 3 })}</span>
                                  </div>
                                )
                              })()}
                            </td>
                            <td className={`w-[90px] px-[8px] py-[10px] ${hasChildren ? '' : 'border-b border-[#E2E8F0]'} align-middle sticky right-0 ${sectionBg}`}>
                              <div className="flex items-center gap-[2px] justify-end">
                                {/* Gear icon — opens config directly */}
                                <button
                                  onClick={() => handleOpenSectionConfig(item)}
                                  className="w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-white/80 transition-colors"
                                  title="Section settings"
                                >
                                  <IconSettings size={15} stroke={2} className="text-[#64748B]" />
                                </button>
                                {/* Kebab menu */}
                                <div className="relative" ref={sectionKebabOpenId === item.id ? sectionKebabRef : null}>
                                  <button
                                    onClick={() => setSectionKebabOpenId(sectionKebabOpenId === item.id ? null : item.id)}
                                    className="w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-white/80 transition-colors"
                                  >
                                    <IconDotsVertical size={15.5} stroke={2} className="text-[rgba(30,41,59,0.87)]" />
                                  </button>
                                  {sectionKebabOpenId === item.id && (
                                    <div className="absolute right-0 top-full mt-[4px] w-[160px] bg-white border border-[#E2E8F0] rounded-[8px] shadow-lg z-50 py-[4px] overflow-hidden">
                                      <button
                                        onClick={() => handleCloneSection(item)}
                                        className="w-full text-left px-[14px] py-[9px] text-[13px] text-[#1E293B] hover:bg-[#F8FAFC] transition-colors flex items-center gap-[8px]"
                                      >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                                        Clone
                                      </button>
                                      <div className="my-[2px] mx-[10px] border-t border-[#E2E8F0]" />
                                      <button
                                        onClick={() => handleRemoveSection(item.id)}
                                        className="w-full text-left px-[14px] py-[9px] text-[13px] text-[#DC2626] hover:bg-[#FEF2F2] transition-colors flex items-center gap-[8px]"
                                      >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                                        Remove
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            </>
                            )}
                          </SortableTableRow>
                        )
                      }

                      // Regular Item Row — check if it belongs to a section
                      const isGrouped = !!sectionId
                      const borderBottom = isLastInSection ? 'border-b-[2px] border-b-[#CBD5E1]' : 'border-b border-[#E2E8F0]'

                      // Look up parent section's display mode for color coding
                      const parentSection = isGrouped ? lineItems.find(li => li.id === sectionId) : null
                      const parentDisplayMode = parentSection?.sectionDisplay || 'expanded'
                      const parentIsHidden = parentDisplayMode === 'hidden'
                      const parentIsCollapsed = parentDisplayMode === 'collapsed'

                      const rowBg = isGrouped
                        ? parentIsHidden ? 'bg-[#FEF2F2]/20' : parentIsCollapsed ? 'bg-[#FFF7ED]/20' : 'bg-[#FAFBFF]'
                        : 'bg-white'
                      const stickyBg = rowBg
                      const childBorderColor = isGrouped
                        ? parentIsHidden ? 'border-l-[#FCA5A5]' : parentIsCollapsed ? 'border-l-[#FDBA74]' : 'border-l-[#3B82F6]'
                        : ''

                      return (
                      <SortableTableRow key={item.id} id={item.id} className={rowBg}>
                        {({ dragHandleRef, dragHandleListeners }) => (
                        <>
                        <td className={`px-[14px] py-[14px] ${borderBottom} align-middle ${isGrouped ? `border-l-[3px] ${childBorderColor}` : ''}`}>
                          <input type="checkbox" className="w-[13px] h-[13px] rounded-[2.5px] border-[#767676] cursor-pointer" />
                        </td>
                        <td
                          ref={dragHandleRef}
                          {...dragHandleListeners}
                          className={`px-[14px] py-[14px] ${borderBottom} align-middle cursor-grab active:cursor-grabbing`}
                        >
                          {isGrouped ? (
                            <div className="flex items-center">
                              <div className={`w-[2px] h-[14px] rounded-full mr-[8px] ${parentIsHidden ? 'bg-[#FCA5A5]' : parentIsCollapsed ? 'bg-[#FDBA74]' : 'bg-[#CBD5E1]'}`} />
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="4" y1="6" x2="4" y2="6.01" />
                                <line x1="12" y1="6" x2="12" y2="6.01" />
                                <line x1="4" y1="12" x2="4" y2="12.01" />
                                <line x1="12" y1="12" x2="12" y2="12.01" />
                                <line x1="4" y1="18" x2="4" y2="18.01" />
                                <line x1="12" y1="18" x2="12" y2="18.01" />
                              </svg>
                            </div>
                          ) : (
                            <svg width="17.68" height="17.5" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="4" y1="6" x2="4" y2="6.01" />
                              <line x1="12" y1="6" x2="12" y2="6.01" />
                              <line x1="4" y1="12" x2="4" y2="12.01" />
                              <line x1="12" y1="12" x2="12" y2="12.01" />
                              <line x1="4" y1="18" x2="4" y2="18.01" />
                              <line x1="12" y1="18" x2="12" y2="18.01" />
                            </svg>
                          )}
                        </td>
                        <td className={`px-[14px] py-[14px] ${borderBottom} align-top`}>
                          <div className="flex items-start gap-[10.5px]">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-[49px] h-[49px] rounded-[3.5px] border border-[#E2E8F0] object-cover flex-shrink-0" />
                            ) : (
                              <div className="w-[49px] h-[49px] rounded-[3.5px] border border-[#E2E8F0] bg-[#F1F5F9] flex items-center justify-center flex-shrink-0">
                                <IconPackage size={22} stroke={1.5} className="text-[#94A3B8]" />
                              </div>
                            )}
                            <div className="flex flex-col">
                              <div className="flex items-center gap-[5px]">
                                <span className="text-[12.6px] font-medium text-[#1E293B] leading-[18.9px]">
                                  {item.productId}<br />- {item.name}
                                </span>
                                {isGrouped && parentIsHidden && (
                                  <span className="inline-flex items-center text-[#DC2626]/50" title="Hidden from customer view">
                                    <IconEyeOff size={11} stroke={1.5} />
                                  </span>
                                )}
                                {isGrouped && parentIsCollapsed && (
                                  <span className="inline-flex items-center text-[#C2410C]/50" title="Inside collapsed section — customer sees only the header">
                                    <IconEyeOff size={11} stroke={1.5} />
                                  </span>
                                )}
                              </div>
                              <span className="text-[11.4px] text-[#64748B] leading-[17px] mt-[3.5px] line-clamp-2">{item.description}</span>
                            </div>
                          </div>
                        </td>
                        <td className={`px-[14px] py-[14px] ${borderBottom} align-middle`}>
                          {item.hasOptions && item.options?.length > 0 ? (
                            <EditOptionTableSelector
                              options={item.options}
                              selectedOption={item.selectedOption}
                              onPreview={(opt) => setPreviewOption(opt)}
                            />
                          ) : item.selectedOption ? (
                            <div className="flex items-center gap-[6px]">
                              <button
                                onClick={() => setPreviewOption(item.selectedOption)}
                                className="group relative"
                                title="Click to preview"
                              >
                                <div
                                  className="w-[14px] h-[14px] rounded-[3px] border border-[#E2E8F0] flex-shrink-0 group-hover:ring-2 group-hover:ring-[#3B82F6] transition-all"
                                  style={{ backgroundColor: item.selectedOption.color }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-[3px] opacity-0 group-hover:opacity-100 transition-opacity">
                                  <svg width="8" height="8" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.5">
                                    <path d="M6 1H1v5M15 1h-5M1 10v5h5M10 15h5v-5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                              </button>
                              <span className="text-[12.6px] text-[#334155]">{item.selectedOption.name}</span>
                            </div>
                          ) : (
                            <span className="text-[12.6px] text-[#94A3B8]">—</span>
                          )}
                        </td>
                        <td className={`px-[14px] py-[14px] ${borderBottom} align-middle`}>
                          <span className="text-[12.6px] font-medium text-[#1E293B] leading-[18.9px]">{item.brand}</span>
                        </td>
                        <td className={`px-[14px] py-[14px] ${borderBottom} align-middle`}>
                          <span className="text-[12.6px] font-medium text-[#1E293B] leading-[18.9px]">{item.specification}</span>
                        </td>
                        <td className={`px-[14px] py-[14px] ${borderBottom} align-middle`}>
                          <span className="text-[12.6px] text-[#1E293B] leading-[18.9px]">{item.location}</span>
                        </td>
                        <td className={`px-[14px] py-[14px] ${borderBottom} align-middle`}>
                          <span className="text-[12.6px] text-[#1E293B] leading-[18.9px]">{item.unitCost}</span>
                        </td>
                        <td className={`px-[14px] py-[14px] ${borderBottom} align-middle`}>
                          <span className="text-[12.6px] text-[#1E293B] leading-[18.9px]">{item.markup}</span>
                        </td>
                        <td className={`px-[14px] py-[14px] ${borderBottom} align-middle`}>
                          <div className="flex items-center gap-0">
                            <span className="text-[12.6px] text-[#1E293B] leading-[18.9px]">{item.priceQty}</span>
                            <span className="mx-[7px]">
                              <svg width="12.73" height="13" viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </span>
                            <span className="text-[12.6px] text-[#1E293B] leading-[18.9px]">{item.priceAmount}</span>
                          </div>
                        </td>
                        <td className={`px-[14px] py-[14px] ${borderBottom} align-middle`}>
                          <span className="text-[12.6px] text-[#1E293B] leading-[18.9px]">{item.total}</span>
                        </td>
                        <td className={`w-[72px] px-[14px] py-[14px] ${borderBottom} align-middle sticky right-0 ${stickyBg}`}>
                          <button className="w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-[#F1F5F9] transition-colors">
                            <IconDotsVertical size={15.5} stroke={2} className="text-[rgba(30,41,59,0.87)]" />
                          </button>
                        </td>
                        </>
                        )}
                      </SortableTableRow>
                      )
                    })}
                  </tbody>
                  </SortableContext>
                </table>
              </DndContext>
              </div>
            </div>

            {/* Below Table Content */}
            <div className="relative flex-shrink-0">
              {/* Profit Margin + Summary Row */}
              <div className="flex">
                {/* Left: Profit Margin */}
                <div className="w-[630px] px-[21px] py-[28px] flex-shrink-0">
                  <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-[14px] p-[14px]">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-[28px]">
                      <div className="flex items-center gap-[7px]">
                        <svg width="15.91" height="15.5" viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
                          <polyline points="17,6 23,6 23,12" />
                        </svg>
                        <span className="text-[14px] font-semibold text-[#1E293B] leading-[21px]">Profit Margin</span>
                        <svg width="15.92" height="15.51" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-[1.75px]">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="16" x2="12" y2="12" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                      </div>
                      <div className="flex items-center border border-[#EF4444] rounded-[3.5px] bg-white px-[1px] py-[6.25px]">
                        <input
                          type="text"
                          value={profitMargin}
                          onChange={(e) => setProfitMargin(e.target.value)}
                          className="w-[58px] text-center text-[15px] font-medium text-[#111827] outline-none leading-[22.5px] bg-transparent pl-[3.5px]"
                        />
                        <span className="text-[14px] text-[#6B7280] px-[7px] leading-[21px]">%</span>
                      </div>
                    </div>

                    {/* Slider */}
                    <div className="relative mb-[17.5px]">
                      <div className="w-full h-[6px] bg-[#D1D5DB] rounded-[3px] relative">
                        <div className="absolute left-0 top-0 h-full bg-[#EF4444] rounded-[3px]" style={{ width: '0.5%' }} />
                      </div>
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-0">
                        <div className="w-[22px] h-[22px] bg-white border-[3px] border-[#EF4444] rounded-[11px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]" />
                      </div>
                    </div>

                    {/* Range Labels */}
                    <div className="flex items-center justify-between mb-[7px]">
                      <span className="text-[12.6px] font-semibold text-[#334155] leading-[18.9px]">0%</span>
                      <span className="text-[12.6px] font-semibold text-[#334155] leading-[18.9px]">99%</span>
                    </div>

                    {/* Warning */}
                    <p className="text-[10.5px] text-[#EF4444] leading-[15.75px]">
                      The Profit Margin selected is below the allowed limit of 0%. Please adjust accordingly.
                    </p>
                  </div>
                </div>

                {/* Right: Summary */}
                <div className="flex-1 pt-[14px] pr-[21px]">
                  {/* Sub-Total */}
                  <div className="flex items-start justify-end">
                    <div className="w-[170px] px-[1px] pt-[14px] pb-[3.5px]">
                      <span className="text-[12.6px] font-semibold text-[#1E293B] leading-[18.9px]">Sub-Total</span>
                    </div>
                    <div className="w-[88px] px-[1px] pt-[14px] pb-[3.5px]">
                      <span className="text-[12.6px] text-[#1E293B] leading-[18.9px]">$1,350.000</span>
                    </div>
                    <div className="w-[70px]" />
                  </div>

                  {/* Tax rows */}
                  {taxes.map((tax, idx) => (
                    <div key={idx} className="flex items-start justify-end">
                      <div className="w-[170px] px-[1px] py-[11px]">
                        <span className="text-[12.6px] font-semibold text-[#1E293B] leading-[18.9px]">{tax.name}</span>
                      </div>
                      <div className="w-[88px] px-[1px] py-[11px]">
                        <span className="text-[12.6px] text-[#1E293B] leading-[18.9px]">{tax.amount}</span>
                      </div>
                      <div className="w-[70px] flex items-center justify-center py-[3.5px]">
                        <button className="w-[35px] h-[35px] flex items-center justify-center rounded-full hover:bg-[#FEE2E2] transition-colors">
                          <svg width="15.91" height="15.5" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add Fee */}
                  <div className="flex items-start justify-end">
                    <div className="w-[170px] px-[1px] py-[1px]">
                      <button className="text-[12.6px] text-[#4F46E5] underline leading-[18.9px] hover:text-[#4338CA]">Add Fee?</button>
                    </div>
                    <div className="w-[88px]" />
                    <div className="w-[70px]" />
                  </div>

                  {/* Total & Deposit */}
                  <div className="flex items-start justify-end mt-[14px]">
                    <div className="w-[170px] px-[1px] flex flex-col gap-[7px] pt-[22px] pb-[22px]">
                      <span className="text-[12.6px] font-semibold text-[#1E293B] leading-[18.9px]">Total</span>
                      <span className="text-[12.6px] font-semibold text-[#1E293B] leading-[18.9px]">Deposit</span>
                    </div>
                    <div className="w-[158px] px-[1px] flex flex-col gap-[7px] pt-[21px] pb-[3.5px]">
                      <span className="text-[12.6px] text-[#1E293B] leading-[18.9px]">$2,200.500</span>
                      <div className="flex items-stretch">
                        <div className="bg-[#E2E8F0] border border-[#CBD5E1] border-r-0 rounded-l-[5.25px] px-[8px] flex items-center">
                          <span className="text-[11.4px] text-[#0F172A] leading-[17px]">USD</span>
                        </div>
                        <input
                          type="text"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          className="flex-1 border border-[#CBD5E1] rounded-r-[7px] px-[9.75px] py-[9.75px] text-[12.6px] text-[#0F172A] outline-none focus:border-[#3B82F6] transition-colors leading-[18.9px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cost & Profit Breakdown */}
              <div className="mx-[21px] mb-[21px] border border-[#E2E8F0] rounded-[10.5px] bg-white">
                <button
                  onClick={() => setCostBreakdownExpanded(!costBreakdownExpanded)}
                  className="w-full px-[21px] py-[14px] flex items-center justify-between hover:bg-[#F8FAFC] transition-colors rounded-t-[10.5px]"
                >
                  <span className="text-[14px] font-semibold text-[#0F172A] leading-[21px]">Cost & Profit Breakdown</span>
                  {costBreakdownExpanded ? (
                    <IconChevronUp size={17.5} stroke={2} className="text-[#64748B]" />
                  ) : (
                    <IconChevronDown size={17.5} stroke={2} className="text-[#64748B]" />
                  )}
                </button>
                {costBreakdownExpanded && (
                  <>
                    <div className="border-t border-[#E2E8F0]" />
                    <div className="px-[21px] py-[21px]">
                      <div className="flex items-center gap-[14px]">
                        {/* Material */}
                        <div className="flex-1 flex items-center gap-[10.5px]">
                          <div className="w-[31.5px] h-[31.5px] bg-[#EFF6FF] rounded-[7px] flex items-center justify-center">
                            <svg width="17.5" height="17.5" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            </svg>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[12.6px] text-[#64748B] leading-[18.9px]">Material</span>
                            <span className="text-[14px] font-bold text-[#0F172A] leading-[21px]">$2,000.000</span>
                          </div>
                        </div>
                        <div className="w-[1px] h-[35px] bg-[#E2E8F0]" />
                        {/* Labor */}
                        <div className="flex-1 flex items-center gap-[10.5px]">
                          <div className="w-[31.5px] h-[31.5px] bg-[#F0FDF4] rounded-[7px] flex items-center justify-center">
                            <svg width="17.5" height="17.5" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                            </svg>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[12.6px] text-[#64748B] leading-[18.9px]">Labor</span>
                            <span className="text-[14px] font-bold text-[#0F172A] leading-[21px]">$0.000</span>
                          </div>
                        </div>
                        <div className="w-[1px] h-[35px] bg-[#E2E8F0]" />
                        {/* COGS */}
                        <div className="flex-1 flex items-center gap-[10.5px]">
                          <div className="w-[31.5px] h-[31.5px] bg-[#FAF5FF] rounded-[7px] flex items-center justify-center">
                            <svg width="17.5" height="17.5" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                            </svg>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[12.6px] text-[#64748B] leading-[18.9px]">COGS</span>
                            <span className="text-[14px] font-bold text-[#0F172A] leading-[21px]">$2,000.000</span>
                          </div>
                        </div>
                        <div className="w-[1px] h-[35px] bg-[#E2E8F0]" />
                        {/* Quote Total */}
                        <div className="flex-1 flex items-center gap-[10.5px]">
                          <div className="w-[31.5px] h-[31.5px] bg-[#EFF6FF] rounded-[7px] flex items-center justify-center">
                            <svg width="17.5" height="17.5" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="12" y1="1" x2="12" y2="23" />
                              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[12.6px] text-[#64748B] leading-[18.9px]">Quote Total</span>
                            <span className="text-[14px] font-bold text-[#0F172A] leading-[21px]">$1,350.000</span>
                          </div>
                        </div>
                        <div className="w-[1px] h-[35px] bg-[#E2E8F0]" />
                        {/* Profit */}
                        <div className="flex-1 flex items-center gap-[10.5px]">
                          <div className="w-[31.5px] h-[31.5px] bg-[#FEF2F2] rounded-[7px] flex items-center justify-center">
                            <svg width="17.5" height="17.5" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="23,18 13.5,8.5 8.5,13.5 1,6" />
                              <polyline points="17,18 23,18 23,12" />
                            </svg>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[12.6px] text-[#64748B] leading-[18.9px]">Profit</span>
                            <span className="text-[14px] font-bold text-[#DC2626] leading-[21px]">-$650.000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#CBD5E1] flex items-center justify-end px-[21px] py-[14px] gap-[14px] flex-shrink-0">
          <button
            onClick={onClose}
            className="h-[35px] px-[15px] flex items-center justify-center border border-[#CBD5E1] rounded-[5.25px] text-[12.6px] font-medium text-[#334155] bg-white hover:bg-[#F8FAFC] transition-colors shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="h-[35px] px-[22px] flex items-center justify-center bg-[#E44A19] border border-[#E44A19] rounded-[5.25px] text-[12.6px] font-medium text-white hover:bg-[#D03F14] transition-colors shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
          >
            Update
          </button>
        </div>
      </div>

      {/* Section Inline Add Dropdown (fixed position to avoid overflow clipping) */}
      {sectionAddMenuId && (
        <div
          ref={sectionAddMenuRef}
          className="fixed w-[200px] bg-white border border-[#E2E8F0] rounded-[8px] shadow-[0px_4px_16px_rgba(0,0,0,0.12)] z-[60] py-[6px]"
          style={{ top: sectionAddMenuPos.top, left: sectionAddMenuPos.left }}
        >
          {[
            { label: 'Line Item', id: 'line-item' },
            { label: 'Bundle', id: 'bundle' },
            { label: 'Item Group', id: 'item-group' },
            { label: 'Custom Line Item', id: 'custom-line-item' },
          ].map((menuItem) => (
            <button
              key={menuItem.id}
              onClick={() => {
                const targetSectionId = sectionAddMenuId
                setSectionAddMenuId(null)
                if (menuItem.id === 'line-item') {
                  setAddToSectionId(targetSectionId)
                  setShowLineItemPicker(true)
                }
                // Other item types can be handled here
              }}
              className="w-full text-left px-[16px] py-[10px] text-[14px] text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
            >
              {menuItem.label}
            </button>
          ))}
        </div>
      )}

      {/* Line Item Picker Modal */}
      <ProposalChooseLineItemModal
        isOpen={showLineItemPicker}
        onClose={() => setShowLineItemPicker(false)}
        onAddProducts={handleAddProducts}
      />

      {/* Section Configuration Sheet (also used for adding new sections) */}
      {/* Option Preview Modal */}
      <OptionPreviewModal
        isOpen={!!previewOption}
        onClose={() => setPreviewOption(null)}
        option={previewOption}
      />

      {/* Add Section Name Popover */}
      {isAddingNewSection && (
        <AddSectionPopover
          onAdd={handleCreateSection}
          onClose={() => setIsAddingNewSection(false)}
        />
      )}

      {/* Section Config Sheet (for existing sections) */}
      {sectionConfigOpen && headerBeingConfigured && (
        <SectionConfigSheet
          header={headerBeingConfigured}
          onUpdateDisplay={updateSectionDisplay}
          onUpdateName={(name) => setHeaderBeingConfigured(prev => ({ ...prev, name }))}
          onUpdateSubtotal={(checked) => setHeaderBeingConfigured(prev => ({ ...prev, showSubtotal: checked }))}
          onUpdateChildPrices={(checked) => setHeaderBeingConfigured(prev => ({ ...prev, showChildPrices: checked }))}
          onSave={handleSaveSectionConfig}
          onClose={() => { setSectionConfigOpen(false); setHeaderBeingConfigured(null) }}
        />
      )}
    </div>
  )
}

// ─── Line Item Row ──────────────────────────────────────────────────
function LineItemRow({ name, quantity, unitPrice, total, isFirst }) {
  return (
    <div className={`px-[10.5px] py-[12.25px] flex items-start justify-between ${!isFirst ? 'border-t border-[#E2E8F0]' : ''}`}>
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-[13px] font-medium text-[#334155] leading-[19px]">{name}</span>
        <span className="text-[13px] text-[#64748B] leading-[19px]">Qty {quantity} @ {unitPrice} Each</span>
      </div>
      <div className="text-right flex-shrink-0">
        <span className="text-[13px] font-medium text-[#334155] leading-[19px]">{total}</span>
      </div>
    </div>
  )
}

// ─── Proposal Option Card ───────────────────────────────────────────
function ProposalOptionCard({ option, index, onUpdate, onDelete, onDuplicate, onEditItems }) {
  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        onUpdate(index, { ...option, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }


  return (
    <div className="min-w-[420px] w-[420px] bg-white border border-[#E2E8F0] rounded-[4px] flex flex-col">
      {/* Card Header: Drag Handle + Actions */}
      <div className="h-[49px] flex items-center justify-between px-[14px]">
        <div className="w-[24px]" />
        <IconGripVertical size={18} stroke={1.5} className="text-[#CBD5E1] cursor-grab" />
        <div className="flex items-center gap-[10.5px]">
          <button
            onClick={() => onDuplicate(index)}
            className="w-[28.72px] h-[31.5px] flex items-center justify-center border border-[#E2E8F0] rounded-[4px] hover:bg-[#F8FAFC] transition-colors"
            title="Duplicate"
          >
            <IconCopy size={13} stroke={1.5} className="text-[#64748B]" />
          </button>
          <button
            onClick={() => onDelete(index)}
            className="w-[28.73px] h-[31.5px] flex items-center justify-center border border-[#E2E8F0] rounded-[4px] hover:bg-[#FEE2E2] transition-colors"
            title="Delete"
          >
            <IconTrash size={13} stroke={1.5} className="text-[#64748B]" />
          </button>
        </div>
      </div>

      {/* Image Area */}
      <div className="px-[14px]">
        <div
          className="relative h-[175px] bg-[#F8FAFC] rounded-[4px] flex flex-col items-center justify-center cursor-pointer hover:bg-[#F1F5F9] transition-colors overflow-hidden"
          onClick={() => fileInputRef.current?.click()}
        >
          {option.image ? (
            <img src={option.image} alt={option.title} className="w-full h-full object-cover" />
          ) : (
            <>
              <img src={OPTION_IMAGE_PLACEHOLDER} alt="Upload" className="w-[112px] h-[91px] opacity-60" />
              <span className="text-[13px] text-[#3B82F6] mt-[0px] leading-[19px]">Click to Upload Image</span>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Title Input */}
      <div className="px-[14px] pt-[10.5px]">
        <input
          type="text"
          placeholder="Enter title"
          value={option.title}
          onChange={(e) => onUpdate(index, { ...option, title: e.target.value })}
          className="w-full h-[38px] px-[11.5px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#1E293B] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6] transition-colors leading-[15px]"
        />
      </div>

      {/* Description Textarea */}
      <div className="px-[14px] pt-[10.5px]">
        <textarea
          placeholder="Enter description"
          value={option.description}
          onChange={(e) => onUpdate(index, { ...option, description: e.target.value })}
          rows={2}
          className="w-full px-[11.5px] py-[11.5px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#64748B] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6] transition-colors resize-none leading-[18px]"
        />
      </div>

      {/* Line Items Section */}
      <div className="px-[14px] pt-[10.5px]">
        <div className="border border-[#E2E8F0] rounded-[4px] overflow-hidden">
          {/* Page Header */}
          <div
            className="h-[35px] px-[7px] flex items-center justify-between bg-[#F8FAFC] border-b border-dashed border-[#CBD5E1]"
          >
            <span className="text-[13px] font-medium text-[#334155] leading-[21px]">{option.lineItemsPage}</span>
            <div className="flex items-center gap-[7px]">
              <button
                onClick={() => onEditItems && onEditItems(index)}
                className="w-[24.68px] h-[24.5px] flex items-center justify-center hover:bg-white/50 rounded transition-colors"
                title="Edit Items"
              >
                <IconPencil size={14} stroke={1.5} className="text-[#64748B]" />
              </button>
              <button className="w-[24.68px] h-[24.5px] flex items-center justify-center hover:bg-white/50 rounded transition-colors">
                <IconTrash size={14} stroke={1.5} className="text-[#64748B]" />
              </button>
            </div>
          </div>

          {/* Line Items */}
          <div>
            {option.subHeader && (
              <div className="px-[10.5px] pt-[12.25px] pb-[0px]">
                <span className="text-[14px] font-semibold text-[#1E293B] leading-[24px]">{option.subHeader}</span>
              </div>
            )}
            {option.lineItems.map((item, idx) => (
              <LineItemRow
                key={idx}
                name={item.name}
                quantity={item.quantity}
                unitPrice={item.unitPrice}
                total={item.total}
                isFirst={idx === 0 && !option.subHeader}
              />
            ))}
          </div>

          {/* More Items Link */}
          {option.moreItemsCount > 0 && (
            <div className="px-[10.5px] py-[10.5px] border-t border-[#E2E8F0]">
              <button className="text-[13px] text-[#3B82F6] font-medium leading-[21px] hover:underline">
                + {option.moreItemsCount} More Items
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Financing Section */}
      <div className="px-[14px] pt-[10.5px]">
        <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-[4px] p-[11px] flex items-center gap-[11px]">
          <img src={FINANCING_LOGO} alt="Financing" className="w-[45.5px] h-[45.5px] rounded-[4px] flex-shrink-0" />
          <p className="text-[12px] text-[#3B82F6] leading-[19px]">
            Pick a customer to view the financing options available for this proposal Option
          </p>
        </div>
      </div>

      {/* Total */}
      <div className="px-[14px] py-[14px] flex justify-end items-baseline gap-[4px]">
        <span className="text-[18px] font-bold text-[#1E293B] leading-[27px]">{option.total}</span>
        <span className="text-[13px] text-[#64748B] leading-[21px]">Total</span>
      </div>
    </div>
  )
}

// ─── Options Section ────────────────────────────────────────────────
function OptionsSection({ options, onOptionsChange, onEditItems }) {
  const scrollContainerRef = useRef(null)

  const handleAddOption = () => {
    const newOption = {
      id: Date.now(),
      title: '',
      description: '',
      image: null,
      lineItemsPage: 'Roof Estimate',
      subHeader: null,
      lineItems: [
        { name: 'New Roofing Item', quantity: 1, unitPrice: '$100.000', total: '$100.000' }
      ],
      moreItemsCount: 0,
      total: '$100.000'
    }
    onOptionsChange([...options, newOption])
  }

  const handleUpdateOption = (index, updatedOption) => {
    const newOptions = [...options]
    newOptions[index] = updatedOption
    onOptionsChange(newOptions)
  }

  const handleDeleteOption = (index) => {
    if (options.length > 1) {
      onOptionsChange(options.filter((_, i) => i !== index))
    }
  }

  const handleDuplicateOption = (index) => {
    const dup = {
      ...options[index],
      id: Date.now(),
      title: options[index].title ? `${options[index].title} (Copy)` : ''
    }
    const newOptions = [...options]
    newOptions.splice(index + 1, 0, dup)
    onOptionsChange(newOptions)
  }

  return (
    <div className="p-[14px]">
      {/* Options Cards Row */}
      <div
        ref={scrollContainerRef}
        className="flex gap-[17.5px] overflow-x-auto pb-[14px]"
        style={{ scrollbarWidth: 'thin' }}
      >
        {options.map((option, index) => (
          <ProposalOptionCard
            key={option.id}
            option={option}
            index={index}
            onUpdate={handleUpdateOption}
            onDelete={handleDeleteOption}
            onDuplicate={handleDuplicateOption}
            onEditItems={onEditItems}
          />
        ))}

        {/* "+ Add Option" side button */}
        <div className="flex items-center min-w-[104.73px] flex-shrink-0">
          <div className="flex items-center gap-0">
            <div className="w-[87.5px] h-[2px] bg-[#E2E8F0]" />
            <button
              onClick={handleAddOption}
              className="h-[31.5px] px-[8px] flex items-center gap-[7px] border border-[#E2E8F0] rounded-[4px] text-[13px] font-normal text-[#334155] bg-white hover:bg-[#F8FAFC] transition-colors whitespace-nowrap"
            >
              <IconPlus size={13} stroke={2} className="text-[#64748B]" />
              Add Option
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Save Icon ──────────────────────────────────────────────────────
function SaveIcon({ className }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
      <polyline points="17,21 17,13 7,13 7,21" />
      <polyline points="7,3 7,8 15,8" />
    </svg>
  )
}

// ─── Send Icon ──────────────────────────────────────────────────────
function SendIcon({ className }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22,2 15,22 11,13 2,9" />
    </svg>
  )
}

// ─── Main Component ─────────────────────────────────────────────────
export default function NewProposalPage({ onBack }) {
  const [editingOptionIndex, setEditingOptionIndex] = useState(null)

  const handleEditItems = (index) => {
    setEditingOptionIndex(index)
  }

  const handleEditOptionUpdate = (updatedOption) => {
    setOptions(prev => {
      const newOptions = [...prev]
      newOptions[editingOptionIndex] = updatedOption
      return newOptions
    })
  }

  const [options, setOptions] = useState([
    {
      id: 1,
      title: 'Premium Roof',
      description: 'Complete tear-off & replacement with GAF lifetime warranty shingles, premium underlayment, and new ridge vents.',
      image: SAMPLE_OPTION_IMAGE,
      lineItemsPage: 'Roof Estimate A',
      subHeader: null,
      lineItems: [
        { name: 'GAF Timberline HDZ Shingles', quantity: 24, unitPrice: '$145.000', total: '$3,480.000' },
        { name: 'Synthetic Roof Underlayment', quantity: 6, unitPrice: '$130.000', total: '$780.000' }
      ],
      moreItemsCount: 0,
      total: '$8,960.000'
    },
    {
      id: 2,
      title: 'Standard Roof',
      description: 'Full roof replacement with 3-tab shingles, standard felt underlayment, and basic ventilation.',
      image: null,
      lineItemsPage: 'Roof Estimate B',
      subHeader: null,
      lineItems: [
        { name: '3-Tab Asphalt Shingles', quantity: 24, unitPrice: '$85.000', total: '$2,040.000' },
        { name: 'Felt Underlayment (15 lb)', quantity: 6, unitPrice: '$45.000', total: '$270.000' },
        { name: 'Roof Tear-Off & Disposal', quantity: 1, unitPrice: '$1,800.000', total: '$1,800.000' }
      ],
      moreItemsCount: 1,
      total: '$5,310.000'
    },
    {
      id: 3,
      title: 'Roof Repair Only',
      description: 'Targeted repair of damaged areas — patch shingles, seal flashing, and fix leaks.',
      image: null,
      lineItemsPage: 'Repair Estimate',
      subHeader: 'Repairs',
      lineItems: [
        { name: 'Shingle Patch & Seal', quantity: 1, unitPrice: '$650.000', total: '$650.000' },
        { name: 'Flashing Repair', quantity: 3, unitPrice: '$120.000', total: '$360.000' }
      ],
      moreItemsCount: 2,
      total: '$1,860.000'
    }
  ])

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Header Bar */}
      <div className="h-[49px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-[21px]">
        <div className="flex items-center gap-[0px]">
          <div className="flex items-center gap-[0px]">
            <span className="text-[14px] text-[#64748B] leading-[24px] cursor-pointer hover:text-[#334155]" onClick={onBack}>Quotes</span>
          </div>
          <div className="flex items-center gap-[0px] ml-[14px]">
            <IconChevronRight size={21} stroke={1.5} className="text-[#CBD5E1]" />
            <span className="text-[14px] font-semibold text-[#1E293B] leading-[24px] ml-[14px]">New Proposal</span>
          </div>
        </div>
        <div className="flex items-center gap-[14px]">
          <button className="h-[31.5px] px-[15px] flex items-center gap-[7px] border border-[#E2E8F0] rounded-[4px] text-[13px] font-medium text-[#334155] bg-white hover:bg-[#F8FAFC] transition-colors">
            <SaveIcon className="text-[#64748B]" />
            Save as Draft
          </button>
          <button className="h-[31.5px] px-[14px] flex items-center gap-[7px] bg-[#F97316] text-white rounded-[4px] text-[13px] font-medium hover:bg-[#EA580C] transition-colors">
            <SendIcon className="text-white" />
            Save & Send
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-[14px]">
        <div className="space-y-[14px]">
          {/* Customer Information */}
          <CollapsibleSection title="Customer Information" defaultExpanded={true}>
            <CustomerInformationSection />
          </CollapsibleSection>

          {/* Association(s) */}
          <CollapsibleSection title="Association(s)" defaultExpanded={true}>
            <AssociationSection />
          </CollapsibleSection>

          {/* Address - collapsed */}
          <CollapsibleSection title="Address" defaultExpanded={false} />

          {/* Proposal Details - collapsed with warning */}
          <CollapsibleSection title="Proposal Details" defaultExpanded={false} warningIcon />

          {/* Options */}
          <div className="bg-white border border-[#E2E8F0] rounded-[4px] overflow-hidden">
            {/* Options Header */}
            <div className="h-[52.5px] px-[21px] flex items-center justify-between">
              <span className="text-[16px] font-semibold text-[#1E293B] leading-[24px]">Options</span>
              <div className="flex items-center gap-[0px]">
                {/* Select Pricelist */}
                <div className="h-[31.5px] w-[210px] border border-[#E2E8F0] rounded-[4px] flex items-center px-[11px]">
                  <span className="text-[13px] text-[#94A3B8] leading-[20px] flex-1">Select Pricelist</span>
                  <IconChevronDown size={14} stroke={2} className="text-[#64748B]" />
                </div>
                {/* Add Option Button */}
                <button
                  onClick={() => {
                    const newOption = {
                      id: Date.now(),
                      title: '',
                      description: '',
                      image: null,
                      lineItemsPage: 'Roof Estimate',
                      subHeader: null,
                      lineItems: [{ name: 'New Roofing Item', quantity: 1, unitPrice: '$100.000', total: '$100.000' }],
                      moreItemsCount: 0,
                      total: '$100.000'
                    }
                    setOptions(prev => [...prev, newOption])
                  }}
                  className="h-[31.5px] px-[8px] ml-[10.5px] flex items-center gap-[7px] border border-[#E2E8F0] rounded-[4px] text-[13px] font-normal text-[#334155] bg-white hover:bg-[#F8FAFC] transition-colors"
                >
                  <IconPlus size={13} stroke={2} className="text-[#64748B]" />
                  Add Option
                </button>
              </div>
            </div>

            {/* Options Cards */}
            <OptionsSection options={options} onOptionsChange={setOptions} onEditItems={handleEditItems} />
          </div>

          {/* Other Details */}
          <div className="bg-white border border-[#E2E8F0] rounded-[4px] overflow-hidden">
            <div className="h-[49px] px-[24px] flex items-center">
              <span className="text-[14px] font-semibold text-[#1E293B] leading-[21px]">Other Details</span>
            </div>
            <div className="border-t border-[#E2E8F0]" />
            <OtherDetailsSection />
          </div>

          {/* Test */}
          <div className="bg-white border border-[#E2E8F0] rounded-[4px] overflow-hidden">
            <div className="h-[49px] px-[24px] flex items-center">
              <span className="text-[14px] font-semibold text-[#1E293B] leading-[21px]">Test</span>
            </div>
            <div className="border-t border-[#E2E8F0]" />
            <TestSection />
          </div>

          {/* Attachments */}
          <div className="bg-white border border-[#E2E8F0] rounded-[4px] overflow-hidden">
            <div className="h-[46.5px] px-[21px] flex items-center justify-between">
              <span className="text-[14px] font-semibold text-[#1E293B] leading-[24px]">Attachments</span>
              <button className="h-[31.5px] px-[15px] flex items-center gap-[7px] border border-[#E2E8F0] rounded-[4px] text-[13px] font-normal text-[#334155] bg-white hover:bg-[#F8FAFC] transition-colors">
                <IconPlus size={13} stroke={2} className="text-[#64748B]" />
                Add Attachments
              </button>
            </div>
            <div className="border-t border-[#E2E8F0]" />
            <AttachmentsSection />
          </div>
        </div>
      </div>

      {/* Edit Option Dialog */}
      {editingOptionIndex !== null && (
        <EditOptionDialog
          option={options[editingOptionIndex]}
          onClose={() => setEditingOptionIndex(null)}
          onUpdate={handleEditOptionUpdate}
        />
      )}
    </div>
  )
}
