import React, { useState, useMemo, Fragment } from 'react';
import { Transition, Menu } from '@headlessui/react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  IconSearch, 
  IconHome, 
  IconChevronRight, 
  IconChevronDown,
  IconPlus, 
  IconGripVertical, 
  IconPencil, 
  IconTrash,
  IconChevronLeft,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
  IconCheck,
  IconX,
  IconArrowRight,
  IconCornerDownRight,
  IconFilter,
  IconInfoCircle,
  IconAlertTriangle
} from '@tabler/icons-react';
import { 
  Modal, 
  Button, 
  Input, 
  Textarea, 
  Label, 
  SearchInput,
  Dropdown
} from './ui';

// ============================================
// Sample Data
// ============================================

const initialCategories = [
  { 
    id: 1, 
    name: 'Roofing', 
    description: 'Roofing services and repairs',
    visibility: { technicians: true, customerPortal: true },
    tradeType: { id: 4, name: 'Roofing' },
    subCategories: [
      { id: 101, name: 'Installation', description: 'New roof installation services', visibility: { technicians: true, customerPortal: true } },
      { id: 102, name: 'Repair', description: 'Roof repair and patching', visibility: { technicians: true, customerPortal: true } },
      { id: 103, name: 'Inspection', description: 'Roof inspection services', visibility: { technicians: true, customerPortal: false } },
    ]
  },
  { 
    id: 2, 
    name: 'Plumbing', 
    description: 'Plumbing services and installations',
    visibility: { technicians: true, customerPortal: true },
    tradeType: { id: 1, name: 'Plumbing' },
    subCategories: []
  },
  { 
    id: 3, 
    name: 'Electrical', 
    description: 'Electrical services and wiring',
    visibility: { technicians: true, customerPortal: false },
    tradeType: { id: 6, name: 'Electrical' },
    subCategories: [
      { id: 301, name: 'Installation', description: 'New electrical installations', visibility: { technicians: true, customerPortal: false } },
      { id: 302, name: 'Maintenance', description: 'Electrical system maintenance', visibility: { technicians: true, customerPortal: false } },
    ]
  },
  { 
    id: 4, 
    name: 'HVAC', 
    description: 'Heating, ventilation, and air conditioning',
    visibility: { technicians: true, customerPortal: true },
    tradeType: { id: 8, name: 'HVAC' },
    subCategories: []
  },
  { 
    id: 5, 
    name: 'Landscaping', 
    description: 'Lawn care and landscaping services',
    visibility: { technicians: true, customerPortal: true },
    tradeType: { id: 5, name: 'Exteriors' },
    subCategories: []
  },
  { 
    id: 6, 
    name: 'General Labor', 
    description: 'General labor and handyman services',
    visibility: { technicians: false, customerPortal: true },
    tradeType: { id: 9, name: 'Other' },
    subCategories: [
      { id: 601, name: 'Hourly Labor', description: 'Standard hourly labor charges', visibility: { technicians: false, customerPortal: true } },
      { id: 602, name: 'Emergency Services', description: 'After-hours emergency services', visibility: { technicians: false, customerPortal: true } },
      { id: 603, name: 'Consultation', description: 'Professional consultation services', visibility: { technicians: true, customerPortal: true } },
    ]
  },
  { 
    id: 7, 
    name: 'Internal Costs', 
    description: 'Internal cost tracking (hidden from customers)',
    visibility: { technicians: false, customerPortal: false },
    tradeType: { id: 9, name: 'Other' },
    subCategories: []
  },
  { 
    id: 8, 
    name: 'Painting', 
    description: 'Interior and exterior painting services',
    visibility: { technicians: true, customerPortal: true },
    tradeType: { id: 7, name: 'Interiors' },
    subCategories: []
  },
];

const PAGE_SIZE_OPTIONS = [
  { value: 10, label: '10' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
];

// ============================================
// Row Actions Menu
// ============================================

function RowActionsMenu({ onEdit, onDelete, onAddSubCategory, isParent = true }) {
  return (
    <Menu as="div" className="relative">
      <Menu.Button className="p-1.5 text-[#94A3B8] hover:text-[#64748B] hover:bg-[#F1F5F9] rounded transition-colors">
        <IconDotsVertical size={16} stroke={2} />
      </Menu.Button>
      
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-1 w-44 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-20 py-1">
          {isParent && (
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onAddSubCategory}
                  className={`w-full px-3 py-2 text-left text-[13px] flex items-center gap-2.5 ${
                    active ? 'bg-[#F8FAFC]' : ''
                  } text-[#1E293B]`}
                >
                  <IconPlus size={15} className="text-[#64748B] w-[15px] h-[15px] min-w-[15px] min-h-[15px]" stroke={2} />
                  Add Sub-Category
                </button>
              )}
            </Menu.Item>
          )}
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={onEdit}
                className={`w-full px-3 py-2 text-left text-[13px] flex items-center gap-2.5 ${
                  active ? 'bg-[#F8FAFC]' : ''
                } text-[#1E293B]`}
              >
                <IconPencil size={15} className="text-[#64748B]" stroke={2} />
                Edit
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={onDelete}
                className={`w-full px-3 py-2 text-left text-[13px] flex items-center gap-2.5 ${
                  active ? 'bg-[#FEF2F2]' : ''
                } text-[#DC2626]`}
              >
                <IconTrash size={15} stroke={2} />
                Delete
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

// ============================================
// Category Row Component
// ============================================

// Highlight matching text helper
function HighlightText({ text, searchTerm }) {
  if (!searchTerm || !text) return text;
  
  const term = searchTerm.toLowerCase();
  const index = text.toLowerCase().indexOf(term);
  
  if (index === -1) return text;
  
  return (
    <>
      {text.slice(0, index)}
      <mark className="bg-[#FEF9C3] text-[#1E293B] px-0.5 rounded">{text.slice(index, index + searchTerm.length)}</mark>
      {text.slice(index + searchTerm.length)}
    </>
  );
}

function SortableCategoryRow({ 
  category, 
  isExpanded, 
  onToggleExpand, 
  onEdit, 
  onDelete,
  onAddSubCategory,
  isSubCategory = false,
  searchTerm = '',
  isSearchMatch = false,
  isDragDisabled = false,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: category.id,
    disabled: isDragDisabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto',
  };

  const hasSubCategories = !isSubCategory && category.subCategories?.length > 0;
  const isParent = !isSubCategory;
  
  return (
    <div 
      ref={setNodeRef}
      style={style}
      className={`
        grid grid-cols-[28px_24px_48px_1fr_36px_36px] h-[52px] border-b border-[#E2E8F0] 
        hover:bg-[#FAFBFC] transition-colors group
        ${isSubCategory ? 'bg-[#FAFBFC]' : 'bg-white'}
        ${isSearchMatch ? 'bg-[#FFFBEB]' : ''}
        ${isDragging ? 'shadow-lg bg-white ring-2 ring-[#2563EB]/20' : ''}
      `}
    >
      {/* Drag handle - always available */}
      <div className={`flex items-center justify-center ${isSubCategory ? 'pl-4' : ''}`}>
        <button
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          className={`p-1 rounded transition-all ${
            isDragDisabled 
              ? 'opacity-0 cursor-default' 
              : 'opacity-0 group-hover:opacity-100 cursor-grab active:cursor-grabbing hover:bg-[#F1F5F9]'
          }`}
          disabled={isDragDisabled}
        >
          <IconGripVertical 
            size={14} 
            className="text-[#94A3B8]"
            stroke={2} 
          />
        </button>
      </div>

      {/* Expand/Collapse - only for parents with children */}
      <div className="flex items-center justify-center">
        {hasSubCategories ? (
          <button 
            onClick={onToggleExpand}
            className="p-0.5 hover:bg-[#F1F5F9] rounded transition-colors"
          >
            <IconChevronRight 
              size={16} 
              className={`text-[#64748B] transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} 
              stroke={2} 
            />
          </button>
        ) : null}
      </div>
      
      {/* Category Image */}
      <div className="flex items-center justify-center">
        {category.image ? (
          <div className="w-[36px] h-[36px] rounded-md border border-[#E2E8F0] overflow-hidden">
            <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-[36px] h-[36px] rounded-md bg-[#F1F5F9] flex items-center justify-center">
            <span className="text-[12px] font-medium text-[#94A3B8]">
              {category.name?.charAt(0)?.toUpperCase() || '?'}
            </span>
          </div>
        )}
      </div>
      
      {/* Category Name & Description */}
      <div className={`flex items-center min-w-0 pl-3 ${isSubCategory ? 'pl-5' : ''}`}>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-[13px] font-medium truncate ${isSubCategory ? 'text-[#475569]' : 'text-[#1E293B]'}`}>
              <HighlightText text={category.name} searchTerm={searchTerm} />
            </span>
            {hasSubCategories && (
              <span className="text-[11px] text-[#94A3B8] flex-shrink-0">
                ({category.subCategories.length})
              </span>
            )}
          </div>
          {category.description && (
            <span className="text-[12px] text-[#94A3B8] truncate block">
              <HighlightText text={category.description} searchTerm={searchTerm} />
            </span>
          )}
        </div>
      </div>
      
      {/* Add Sub-Category button - only for parent categories */}
      <div className="flex items-center justify-center">
        {isParent && (
          <button 
            onClick={onAddSubCategory}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#EFF6FF] text-[#94A3B8] hover:text-[#2563EB] transition-colors"
            title="Add sub-category"
          >
            <IconPlus size={16} stroke={2} className="w-4 h-4 min-w-[16px] min-h-[16px]" />
          </button>
        )}
      </div>
      
      {/* Actions Menu */}
      <div className="flex items-center justify-center">
        <RowActionsMenu 
          onEdit={onEdit}
          onDelete={onDelete}
          onAddSubCategory={onAddSubCategory}
          isParent={isParent}
        />
      </div>
    </div>
  );
}

// ============================================
// Add Sub-Category Row
// ============================================

function AddSubCategoryRow({ onClick }) {
  return (
    <div className="h-[44px] bg-[#F8FAFC] border-b border-[#E2E8F0] border-dashed flex items-center pl-[72px]">
      <button 
        onClick={onClick}
        className="flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium text-[#2563EB] hover:bg-[#EFF6FF] rounded-md transition-colors"
      >
        <IconPlus size={15} stroke={2.5} className="w-[15px] h-[15px] min-w-[15px] min-h-[15px]" />
        <span>Add sub-category</span>
      </button>
    </div>
  );
}

// ============================================
// Category Modal (Create/Edit)
// ============================================

// Trade Types data
const TRADE_TYPES = [
  { id: 1, name: 'Plumbing' },
  { id: 2, name: 'Gutters' },
  { id: 3, name: 'Siding' },
  { id: 4, name: 'Roofing' },
  { id: 5, name: 'Exteriors' },
  { id: 6, name: 'Electrical' },
  { id: 7, name: 'Interiors' },
  { id: 8, name: 'HVAC' },
  { id: 9, name: 'Other' },
];

function CategoryModal({ 
  isOpen, 
  onClose, 
  onSave, 
  mode = 'create', // 'create' | 'edit'
  parentCategory = null, // For sub-category creation - the parent category
  initialData = null,
  allCategories = [] // All categories for parent selection in edit mode
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedTradeTypes, setSelectedTradeTypes] = useState([]);
  const [tradeTypeDropdownOpen, setTradeTypeDropdownOpen] = useState(false);
  const [tradeTypeSearch, setTradeTypeSearch] = useState('');
  const [selectedParentId, setSelectedParentId] = useState(null);
  const [parentDropdownOpen, setParentDropdownOpen] = useState(false);
  const [parentCategorySearch, setParentCategorySearch] = useState('');
  const [parentTradeTypeFilter, setParentTradeTypeFilter] = useState('all');

  // Reset form when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setName(initialData?.name || '');
      setDescription(initialData?.description || '');
      setImagePreview(initialData?.image || null);
      setSelectedTradeTypes(initialData?.tradeTypes || []);
      setSelectedParentId(initialData?.parentId || null);
      setTradeTypeSearch('');
      setTradeTypeDropdownOpen(false);
      setParentDropdownOpen(false);
      setParentCategorySearch('');
      setParentTradeTypeFilter('all');
    }
  }, [isOpen, initialData]);

  const handleSave = () => {
    if (name.trim()) {
      onSave({
        name: name.trim(),
        description: description.trim(),
        parentId: mode === 'edit' ? selectedParentId : (parentCategory?.id || null),
        image: imagePreview,
        tradeTypes: selectedTradeTypes,
        // For edit mode, track if parent changed
        originalParentId: initialData?.parentId || null,
      });
      onClose();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const toggleTradeType = (tradeType) => {
    setSelectedTradeTypes(prev => {
      const isSelected = prev.some(t => t.id === tradeType.id);
      if (isSelected) {
        return prev.filter(t => t.id !== tradeType.id);
      } else {
        return [...prev, tradeType];
      }
    });
  };

  const removeTradeType = (tradeTypeId) => {
    setSelectedTradeTypes(prev => prev.filter(t => t.id !== tradeTypeId));
  };

  const filteredTradeTypes = TRADE_TYPES.filter(t => 
    t.name.toLowerCase().includes(tradeTypeSearch.toLowerCase())
  );

  const isSubCategory = parentCategory !== null;

  // Determine title based on mode and type
  const getTitle = () => {
    if (mode === 'edit') {
      return initialData?.isSubCategory ? 'Edit Sub-Category' : 'Edit Category';
    }
    if (isSubCategory) {
      return `New Sub-Category for ${parentCategory.name}`;
    }
    return 'New Category';
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={getTitle()}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSave}
            disabled={!name.trim()}
          >
            {mode === 'edit' ? 'Save' : 'Create'}
          </Button>
        </>
      }
    >
      <div className="space-y-5">
        {/* Show parent context in edit mode if it's a sub-category - more subtle */}
        {mode === 'edit' && initialData?.isSubCategory && (
          <div className="flex items-center gap-1.5 text-[12px] text-[#64748B]">
            <span>Sub-category of</span>
            <span className="font-medium text-[#475569]">{initialData.parentName}</span>
          </div>
        )}

        {/* Category Image */}
        <div>
          <Label className="mb-2 block">Image</Label>
          <div className="flex items-start gap-4">
            {imagePreview ? (
              <div className="relative w-[80px] h-[80px] rounded-lg border border-[#E2E8F0] overflow-hidden group">
                <img 
                  src={imagePreview} 
                  alt="Category" 
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={removeImage}
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <IconTrash size={20} className="text-white" />
                </button>
              </div>
            ) : (
              <label className="w-[80px] h-[80px] rounded-lg border-2 border-dashed border-[#CBD5E1] flex flex-col items-center justify-center cursor-pointer hover:border-[#94A3B8] hover:bg-[#F8FAFC] transition-colors">
                <IconPlus size={20} className="text-[#94A3B8] w-5 h-5 min-w-[20px] min-h-[20px]" />
                <span className="text-[10px] text-[#94A3B8] mt-1">Upload</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="hidden" 
                />
              </label>
            )}
            <div className="flex-1">
              <p className="text-[12px] text-[#64748B]">
                Upload an image for this {isSubCategory ? 'sub-category' : 'category'}. This will be displayed in the mobile app for easy visual identification.
              </p>
              <p className="text-[11px] text-[#94A3B8] mt-1">
                Recommended: 200x200px, PNG or JPG
              </p>
            </div>
          </div>
        </div>

        {/* Category Name */}
        <div>
          <Label required className="mb-2 block">Name</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={isSubCategory ? 'e.g., Installation, Repair, Materials' : 'e.g., Roofing, Plumbing, Electrical'}
          />
        </div>

        {/* Description */}
        <div>
          <Label className="mb-2 block">Description</Label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional description..."
            rows={3}
          />
        </div>

        {/* Trade Type - Picker for categories, Read-only for sub-categories */}
        <div>
          <Label className="mb-2 block">Trade Type</Label>
          {isSubCategory || (mode === 'edit' && selectedParentId) ? (
            // Read-only display for sub-categories - shows inherited trade types from parent
            <div className="min-h-[42px] px-3 py-2 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] flex items-center flex-wrap gap-2">
              {(() => {
                const effectiveParent = selectedParentId 
                  ? allCategories.find(c => c.id === selectedParentId)
                  : parentCategory;
                const tradeType = effectiveParent?.tradeType;
                return tradeType ? (
                  <span className="text-[13px] text-[#1E293B] bg-white px-2 py-1 rounded border border-[#E2E8F0]">
                    {tradeType.name}
                  </span>
                ) : (
                  <span className="text-[13px] text-[#94A3B8]">Inherited from parent</span>
                );
              })()}
            </div>
          ) : (
            // Trade Type multi-select picker for categories
            <div className="relative">
              {/* Selected Trade Types display with dropdown trigger */}
              <div 
                className="min-h-[42px] px-3 py-2 border border-[#E2E8F0] rounded-lg bg-white cursor-pointer flex items-center flex-wrap gap-2"
                onClick={() => setTradeTypeDropdownOpen(!tradeTypeDropdownOpen)}
              >
                {selectedTradeTypes.length === 0 ? (
                  <span className="text-[13px] text-[#94A3B8]">Choose Trade Type(s)</span>
                ) : (
                  selectedTradeTypes.map(trade => (
                    <span 
                      key={trade.id}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-[#EFF6FF] text-[#2563EB] rounded text-[12px] font-medium"
                    >
                      {trade.name}
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeTradeType(trade.id); }}
                        className="hover:bg-[#DBEAFE] rounded-full p-0.5"
                      >
                        <IconX size={12} stroke={2} />
                      </button>
                    </span>
                  ))
                )}
                <IconChevronDown 
                  size={16} 
                  className={`ml-auto text-[#94A3B8] transition-transform flex-shrink-0 ${tradeTypeDropdownOpen ? 'rotate-180' : ''}`} 
                />
              </div>
              
              {/* Dropdown */}
              {tradeTypeDropdownOpen && (
                <div className="absolute z-10 left-0 right-0 mt-1 bg-white border border-[#E2E8F0] rounded-lg shadow-lg max-h-[240px] overflow-hidden">
                  {/* Search */}
                  <div className="p-2 border-b border-[#E2E8F0]">
                    <input
                      type="text"
                      placeholder="Search"
                      value={tradeTypeSearch}
                      onChange={(e) => setTradeTypeSearch(e.target.value)}
                      className="w-full h-[32px] px-3 text-[13px] text-[#64748B] placeholder-[#94A3B8] border border-[#E2E8F0] rounded bg-white focus:outline-none focus:border-[#94A3B8]"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  
                  {/* Options - multi-select with checkboxes */}
                  <div className="max-h-[180px] overflow-y-auto">
                    {filteredTradeTypes.map(trade => {
                      const isSelected = selectedTradeTypes.some(t => t.id === trade.id);
                      return (
                        <div
                          key={trade.id}
                          className="px-3 py-2.5 hover:bg-[#F8FAFC] cursor-pointer flex items-center gap-3"
                          onClick={(e) => { e.stopPropagation(); toggleTradeType(trade); }}
                        >
                          {/* Checkbox */}
                          <div className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'bg-[#2563EB] border-[#2563EB]' : 'border-[#CBD5E1]'
                          }`}>
                            {isSelected && (
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <span className="text-[13px] text-[#1E293B]">{trade.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Parent Category - Only shown in edit mode */}
        {mode === 'edit' && (
          <div>
            <Label className="mb-2 block">Parent Category</Label>
            <div className="relative">
              <div 
                className="min-h-[42px] px-3 py-2 border border-[#E2E8F0] rounded-lg bg-white cursor-pointer flex items-center justify-between"
                onClick={() => setParentDropdownOpen(!parentDropdownOpen)}
              >
                <span className={`text-[13px] ${selectedParentId ? 'text-[#1E293B]' : 'text-[#94A3B8]'}`}>
                  {selectedParentId 
                    ? allCategories.find(c => c.id === selectedParentId)?.name || 'Select parent...'
                    : 'None (Top-level category)'
                  }
                </span>
                <IconChevronDown 
                  size={16} 
                  className={`text-[#94A3B8] transition-transform flex-shrink-0 ${parentDropdownOpen ? 'rotate-180' : ''}`} 
                />
              </div>
              
              {/* Parent Category Dropdown */}
              {parentDropdownOpen && (
                <div className="absolute z-10 left-0 right-0 mt-1 bg-white border border-[#E2E8F0] rounded-lg shadow-lg max-h-[340px] overflow-hidden">
                  {/* Search + Filter */}
                  <div className="p-2 border-b border-[#E2E8F0]">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <IconSearch 
                          size={14} 
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" 
                          stroke={2} 
                        />
                        <input
                          type="text"
                          placeholder="Search..."
                          value={parentCategorySearch}
                          onChange={(e) => setParentCategorySearch(e.target.value)}
                          className="w-full h-[32px] pl-8 pr-3 text-[13px] text-[#1E293B] placeholder-[#94A3B8] border border-[#E2E8F0] rounded bg-white focus:outline-none focus:border-[#94A3B8]"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      
                      {/* Trade Type Filter - Native Select */}
                      <div className="relative flex items-center">
                        <IconFilter size={14} className="absolute left-2 text-[#94A3B8] pointer-events-none" stroke={2} />
                        <select
                          value={parentTradeTypeFilter}
                          onChange={(e) => { e.stopPropagation(); setParentTradeTypeFilter(e.target.value); }}
                          onClick={(e) => e.stopPropagation()}
                          className={`h-[32px] pl-7 pr-6 text-[12px] border rounded appearance-none cursor-pointer focus:outline-none ${
                            parentTradeTypeFilter !== 'all' 
                              ? 'border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]' 
                              : 'border-[#E2E8F0] text-[#64748B] bg-white hover:border-[#94A3B8]'
                          }`}
                        >
                          <option value="all">All Types</option>
                          {TRADE_TYPES.map(t => (
                            <option key={t.id} value={t.name}>{t.name}</option>
                          ))}
                        </select>
                        <IconChevronDown size={12} className="absolute right-2 text-[#94A3B8] pointer-events-none" stroke={2} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="max-h-[260px] overflow-y-auto">
                    {/* None option - make it top-level (hide when trade type filter active) */}
                    {parentTradeTypeFilter === 'all' && (!parentCategorySearch || 'none top-level'.includes(parentCategorySearch.toLowerCase())) && (
                      <div
                        className={`px-3 py-2.5 hover:bg-[#F8FAFC] cursor-pointer flex items-center justify-between ${
                          selectedParentId === null ? 'bg-[#EFF6FF]' : ''
                        }`}
                        onClick={(e) => { e.stopPropagation(); setSelectedParentId(null); setParentDropdownOpen(false); setParentCategorySearch(''); setParentTradeTypeFilter('all'); }}
                      >
                        <span className="text-[13px] text-[#1E293B]">None (Top-level category)</span>
                        {selectedParentId === null && <IconCheck size={16} className="text-[#2563EB]" stroke={2} />}
                      </div>
                    )}
                    
                    {parentTradeTypeFilter === 'all' && (!parentCategorySearch || 'none top-level'.includes(parentCategorySearch.toLowerCase())) && (
                      <div className="border-t border-[#E2E8F0]" />
                    )}
                    
                    {/* Available parent categories */}
                    {(() => {
                      const filteredCategories = allCategories.filter(cat => {
                        // Exclude self
                        if (cat.id === initialData?.id) return false;
                        // Exclude own children (if this is a parent being edited)
                        if (initialData?.subCategories?.some(sub => sub.id === cat.id)) return false;
                        // Trade type filter
                        if (parentTradeTypeFilter !== 'all') {
                          if (cat.tradeType?.name !== parentTradeTypeFilter) return false;
                        }
                        // Search filter
                        if (parentCategorySearch) {
                          const searchLower = parentCategorySearch.toLowerCase();
                          return cat.name.toLowerCase().includes(searchLower);
                        }
                        return true;
                      });
                      
                      if (filteredCategories.length === 0 && (parentCategorySearch || parentTradeTypeFilter !== 'all')) {
                        return (
                          <div className="px-3 py-4 text-center text-[13px] text-[#94A3B8]">
                            No categories found
                            {parentTradeTypeFilter !== 'all' && (
                              <button
                                type="button"
                                className="block mx-auto mt-1 text-[#2563EB] hover:underline"
                                onClick={(e) => { e.stopPropagation(); setParentTradeTypeFilter('all'); }}
                              >
                                Clear filter
                              </button>
                            )}
                          </div>
                        );
                      }
                      
                      return filteredCategories.map(cat => (
                        <div
                          key={cat.id}
                          className={`px-3 py-2.5 hover:bg-[#F8FAFC] cursor-pointer flex items-center justify-between ${
                            selectedParentId === cat.id ? 'bg-[#EFF6FF]' : ''
                          }`}
                          onClick={(e) => { e.stopPropagation(); setSelectedParentId(cat.id); setParentDropdownOpen(false); setParentCategorySearch(''); setParentTradeTypeFilter('all'); }}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] text-[#1E293B]">{cat.name}</span>
                            {cat.tradeType && (
                              <span className="text-[10px] px-1.5 py-0.5 bg-[#F1F5F9] text-[#64748B] rounded">
                                {cat.tradeType.name}
                              </span>
                            )}
                          </div>
                          {selectedParentId === cat.id && <IconCheck size={16} className="text-[#2563EB]" stroke={2} />}
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              )}
            </div>
            
            {/* Warnings */}
            {selectedParentId && (() => {
              const newParent = allCategories.find(c => c.id === selectedParentId);
              const willChangeTradeType = initialData?.tradeType?.id !== newParent?.tradeType?.id;
              const hasSubCategories = initialData?.subCategories?.length > 0;
              const subCategoryCount = initialData?.subCategories?.length || 0;
              
              return (
                <div className="mt-2 space-y-2">
                  {/* Sub-categories will move warning */}
                  {hasSubCategories && (
                    <div className="p-2 bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg flex items-start gap-2">
                      <IconInfoCircle size={16} className="text-[#2563EB] flex-shrink-0 mt-0.5" stroke={2} />
                      <p className="text-[12px] text-[#1E40AF]">
                        {subCategoryCount} sub-categor{subCategoryCount === 1 ? 'y' : 'ies'} will also move with this category.
                      </p>
                    </div>
                  )}
                  
                  {/* Trade type change warning */}
                  {willChangeTradeType && (
                    <div className="p-2 bg-[#FFFBEB] border border-[#FCD34D] rounded-lg flex items-start gap-2">
                      <IconAlertTriangle size={16} className="text-[#D97706] flex-shrink-0 mt-0.5" stroke={2} />
                      <p className="text-[12px] text-[#92400E]">
                        Trade type will change from <strong>{initialData?.tradeType?.name || 'none'}</strong> to <strong>{newParent?.tradeType?.name || 'none'}</strong>
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </Modal>
  );
}

// ============================================
// Delete Confirmation Modal
// ============================================

function DeleteConfirmModal({ isOpen, onClose, onConfirm, category, hasSubCategories }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Category"
      maxWidth="max-w-[420px]"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={onConfirm}
            className="bg-[#DC2626] hover:bg-[#B91C1C] focus:ring-[#DC2626]"
          >
            Delete
          </Button>
        </>
      }
    >
      <div className="space-y-3">
        <p className="text-[14px] text-[#475569]">
          Are you sure you want to delete <strong>"{category?.name}"</strong>?
        </p>
        
        {hasSubCategories && (
          <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg p-3 text-[13px] text-[#991B1B]">
            This will also delete {category?.subCategories?.length} sub-categories.
          </div>
        )}
        
        <p className="text-[12px] text-[#94A3B8]">
          This action cannot be undone.
        </p>
      </div>
    </Modal>
  );
}

// ============================================
// Convert/Change Parent Modal
// ============================================

function MoveCategoryModal({ isOpen, onClose, onMove, category, categories }) {
  const [selectedTargetId, setSelectedTargetId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTradeTypeFilter, setSelectedTradeTypeFilter] = useState(null);

  // Reset state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setSelectedTargetId(null);
      setSearchTerm('');
      setSelectedTradeTypeFilter(null);
    }
  }, [isOpen]);

  // Get current category's trade type (single)
  const currentTradeType = useMemo(() => {
    if (!category) return null;
    
    if (category.isSubCategory) {
      // Sub-categories inherit from parent
      const parent = categories.find(cat => cat.id === category.parentId);
      return parent?.tradeType || null;
    }
    return category.tradeType || null;
  }, [category, categories]);

  // Determine available targets based on whether it's a parent or sub-category
  const availableTargets = useMemo(() => {
    if (!category) return [];
    
    if (category.isSubCategory) {
      // For sub-categories: can move to any other parent or promote to top-level
      return categories
        .filter(cat => cat.id !== category.parentId) // Exclude current parent
        .map(cat => ({
          id: cat.id,
          name: cat.name,
          type: 'parent',
          subCount: cat.subCategories?.length || 0,
          tradeType: cat.tradeType || null
        }));
    } else {
      // For parent categories: can only move as sub-category under another parent
      return categories
        .filter(cat => cat.id !== category.id) // Exclude self
        .map(cat => ({
          id: cat.id,
          name: cat.name,
          type: 'parent',
          subCount: cat.subCategories?.length || 0,
          tradeType: cat.tradeType || null
        }));
    }
  }, [category, categories]);

  // Get unique trade types for filter
  const uniqueTradeTypes = useMemo(() => {
    const tradeTypeMap = new Map();
    availableTargets.forEach(target => {
      if (target.tradeType) {
        tradeTypeMap.set(target.tradeType.id, target.tradeType);
      }
    });
    return Array.from(tradeTypeMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [availableTargets]);

  // Filter targets based on search and trade type
  const filteredTargets = useMemo(() => {
    let filtered = availableTargets;
    
    // Apply trade type filter
    if (selectedTradeTypeFilter) {
      filtered = filtered.filter(target => 
        target.tradeType?.id === selectedTradeTypeFilter
      );
    }
    
    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(target => 
        target.name.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  }, [availableTargets, searchTerm, selectedTradeTypeFilter]);

  // Get selected target details
  const selectedTarget = useMemo(() => {
    if (!selectedTargetId || selectedTargetId === 'top-level') return null;
    return availableTargets.find(t => t.id === selectedTargetId);
  }, [selectedTargetId, availableTargets]);

  // Check if trade type is different
  const hasTradeTypeMismatch = useMemo(() => {
    if (!selectedTarget || !currentTradeType) return false;
    if (!selectedTarget.tradeType) return true; // Target has no trade type
    return selectedTarget.tradeType.id !== currentTradeType.id;
  }, [selectedTarget, currentTradeType]);

  const handleMove = () => {
    if (selectedTargetId !== null) {
      onMove(selectedTargetId);
    }
  };

  const isSubCategory = category?.isSubCategory;
  const hasSubCategories = !isSubCategory && category?.subCategories?.length > 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isSubCategory ? "Change Parent" : "Set as Subcategory"}
      maxWidth="max-w-[520px]"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleMove}
            disabled={selectedTargetId === null}
          >
            {isSubCategory ? 'Change' : 'Convert'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {/* Info */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3">
          <p className="text-[13px] text-[#475569]">
            {isSubCategory ? 'Change parent of' : 'Set'} <strong className="text-[#1E293B]">"{category?.name}"</strong>
            {isSubCategory ? '' : ' as a subcategory'}
          </p>
          {currentTradeType && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] text-[#64748B]">Trade Type:</span>
              <span className="text-[11px] px-2 py-0.5 bg-[#E0E7FF] text-[#4338CA] rounded font-medium">
                {currentTradeType.name}
              </span>
            </div>
          )}
          {hasSubCategories && (
            <p className="text-[12px] text-[#94A3B8] mt-1">
              This will also include {category?.subCategories?.length} sub-categories.
            </p>
          )}
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <IconSearch 
              size={15} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" 
              stroke={2} 
            />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-[36px] pl-9 pr-3 text-[13px] text-[#1E293B] placeholder-[#94A3B8] border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:border-[#94A3B8]"
            />
          </div>
          
          {/* Trade Type Filter Dropdown */}
          {uniqueTradeTypes.length > 1 && (
            <Menu as="div" className="relative">
              <Menu.Button className={`h-[36px] px-3 flex items-center gap-2 border rounded-lg text-[13px] transition-colors ${
                selectedTradeTypeFilter 
                  ? 'border-[#2563EB] bg-[#EFF6FF] text-[#2563EB]' 
                  : 'border-[#E2E8F0] bg-white text-[#64748B] hover:bg-[#F8FAFC]'
              }`}>
                <IconFilter size={16} stroke={2} />
                <span className="max-w-[100px] truncate">
                  {selectedTradeTypeFilter 
                    ? uniqueTradeTypes.find(t => t.id === selectedTradeTypeFilter)?.name 
                    : 'All Types'}
                </span>
                <IconChevronDown size={14} stroke={2} />
              </Menu.Button>
              
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-1 w-48 bg-white border border-[#E2E8F0] rounded-lg shadow-lg z-20 py-1 max-h-[240px] overflow-y-auto">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setSelectedTradeTypeFilter(null)}
                        className={`w-full px-3 py-2 text-left text-[13px] flex items-center justify-between ${
                          active ? 'bg-[#F8FAFC]' : ''
                        } ${selectedTradeTypeFilter === null ? 'text-[#2563EB] font-medium' : 'text-[#1E293B]'}`}
                      >
                        All Types
                        {selectedTradeTypeFilter === null && <IconCheck size={16} className="text-[#2563EB]" stroke={2} />}
                      </button>
                    )}
                  </Menu.Item>
                  <div className="border-t border-[#E2E8F0] my-1" />
                  {uniqueTradeTypes.map(tradeType => (
                    <Menu.Item key={tradeType.id}>
                      {({ active }) => (
                        <button
                          onClick={() => setSelectedTradeTypeFilter(tradeType.id)}
                          className={`w-full px-3 py-2 text-left text-[13px] flex items-center justify-between ${
                            active ? 'bg-[#F8FAFC]' : ''
                          } ${selectedTradeTypeFilter === tradeType.id ? 'text-[#2563EB] font-medium' : 'text-[#1E293B]'}`}
                        >
                          {tradeType.name}
                          {selectedTradeTypeFilter === tradeType.id && <IconCheck size={16} className="text-[#2563EB]" stroke={2} />}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>

        {/* Target Selection */}
        <div className="border border-[#E2E8F0] rounded-lg overflow-hidden max-h-[280px] overflow-y-auto">
          {/* Make Top-Level option (only for sub-categories) */}
          {isSubCategory && (
            <div
              onClick={() => setSelectedTargetId('top-level')}
              className={`px-4 py-3 cursor-pointer flex items-center gap-3 border-b border-[#E2E8F0] transition-colors ${
                selectedTargetId === 'top-level' 
                  ? 'bg-[#EFF6FF] border-l-2 border-l-[#2563EB]' 
                  : 'hover:bg-[#F8FAFC]'
              }`}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                selectedTargetId === 'top-level' ? 'border-[#2563EB]' : 'border-[#CBD5E1]'
              }`}>
                {selectedTargetId === 'top-level' && (
                  <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
                )}
              </div>
              <div>
                <span className="text-[13px] font-medium text-[#1E293B]">Make Top-Level Category</span>
                <p className="text-[11px] text-[#94A3B8]">Promote to a standalone category (you can set trade type later)</p>
              </div>
            </div>
          )}

          {/* Category Targets */}
          {filteredTargets.length === 0 ? (
            <div className="px-4 py-6 text-center text-[13px] text-[#94A3B8]">
              No categories found
            </div>
          ) : (
            filteredTargets.map(target => (
              <div
                key={target.id}
                onClick={() => setSelectedTargetId(target.id)}
                className={`px-4 py-3 cursor-pointer flex items-center gap-3 border-b border-[#E2E8F0] last:border-b-0 transition-colors ${
                  selectedTargetId === target.id 
                    ? 'bg-[#EFF6FF] border-l-2 border-l-[#2563EB]' 
                    : 'hover:bg-[#F8FAFC]'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selectedTargetId === target.id ? 'border-[#2563EB]' : 'border-[#CBD5E1]'
                }`}>
                  {selectedTargetId === target.id && (
                    <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[13px] font-medium text-[#1E293B] truncate">{target.name}</span>
                    {target.tradeType && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-[#F1F5F9] text-[#64748B] rounded font-medium">
                        {target.tradeType.name}
                      </span>
                    )}
                    {target.subCount > 0 && (
                      <span className="text-[10px] text-[#94A3B8] flex-shrink-0">
                        ({target.subCount} sub)
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5">
                    {isSubCategory ? 'Set as new parent category' : 'Will become subcategory under this'}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Trade Type Inheritance Warning */}
        {hasTradeTypeMismatch && selectedTarget && (
          <div className="bg-[#FEF3C7] border border-[#FCD34D] rounded-lg p-3 text-[12px] text-[#92400E]">
            <strong>Trade Type Change:</strong> Will inherit trade type from new parent.
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[11px]">Current:</span>
              <span className="font-medium">{currentTradeType?.name || 'None'}</span>
              <IconArrowRight size={14} className="text-[#D97706]" />
              <span className="text-[11px]">New:</span>
              <span className="font-medium">{selectedTarget.tradeType?.name || 'None'}</span>
            </div>
          </div>
        )}

        {/* Warning for parent categories with sub-categories */}
        {hasSubCategories && selectedTargetId && !hasTradeTypeMismatch && (
          <div className="bg-[#FEF3C7] border border-[#FCD34D] rounded-lg p-3 text-[12px] text-[#92400E]">
            <strong>Note:</strong> This will also include {category?.subCategories?.length} sub-categories under the new parent.
          </div>
        )}

        {/* Combined warning when both conditions are true */}
        {hasSubCategories && selectedTargetId && hasTradeTypeMismatch && (
          <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg p-3 text-[12px] text-[#991B1B]">
            <strong>Note:</strong> This will also include {category?.subCategories?.length} sub-categories. All will inherit the new trade type.
          </div>
        )}
      </div>
    </Modal>
  );
}

// ============================================
// Main Component
// ============================================

function CategorySettings() {
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPage, setGoToPage] = useState('1');
  const [pageSize, setPageSize] = useState(10);
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMoveModalOpen, setIsMoveModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedParentForSubCategory, setSelectedParentForSubCategory] = useState(null);
  
  const totalPages = Math.ceil(categories.length / pageSize);

  // DnD sensors - only activate drag with the handle
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end for parent categories
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setCategories((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Handle drag end for sub-categories within a parent
  const handleSubCategoryDragEnd = (parentId) => (event) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setCategories((items) => 
        items.map((cat) => {
          if (cat.id === parentId) {
            const oldIndex = cat.subCategories.findIndex((sub) => sub.id === active.id);
            const newIndex = cat.subCategories.findIndex((sub) => sub.id === over.id);
            return {
              ...cat,
              subCategories: arrayMove(cat.subCategories, oldIndex, newIndex),
            };
          }
          return cat;
        })
      );
    }
  };

  // Count total items
  const totalItemsCount = useMemo(() => {
    return categories.reduce((count, cat) => {
      return count + 1 + (cat.subCategories?.length || 0);
    }, 0);
  }, [categories]);

  // Check if any category has sub-categories
  const hasAnyCategoriesWithSubs = useMemo(() => {
    return categories.some(cat => cat.subCategories?.length > 0);
  }, [categories]);

  // Check expand state
  const allExpanded = useMemo(() => {
    const catsWithSubs = categories.filter(c => c.subCategories?.length > 0);
    return catsWithSubs.length > 0 && catsWithSubs.every(c => expandedCategories.has(c.id));
  }, [categories, expandedCategories]);

  // Filter categories and track which items match
  const { filteredCategories, matchingSubCategoryIds, hasSearchResults } = useMemo(() => {
    if (!searchTerm.trim()) {
      return { 
        filteredCategories: categories, 
        matchingSubCategoryIds: new Set(),
        hasSearchResults: false 
      };
    }
    
    const term = searchTerm.toLowerCase();
    const matchingSubIds = new Set();
    
    const filtered = categories.filter(cat => {
      const parentMatches = cat.name.toLowerCase().includes(term) || 
                           cat.description?.toLowerCase().includes(term);
      
      // Check sub-categories
      const matchingSubs = cat.subCategories?.filter(sub => 
        sub.name.toLowerCase().includes(term) ||
        sub.description?.toLowerCase().includes(term)
      ) || [];
      
      // Track matching sub-category IDs
      matchingSubs.forEach(sub => matchingSubIds.add(sub.id));
      
      // Include parent if it matches OR if any sub-category matches
      return parentMatches || matchingSubs.length > 0;
    });
    
    return { 
      filteredCategories: filtered, 
      matchingSubCategoryIds: matchingSubIds,
      hasSearchResults: true 
    };
  }, [categories, searchTerm]);

  // Auto-expand categories with matching sub-categories when searching
  React.useEffect(() => {
    if (searchTerm.trim() && matchingSubCategoryIds.size > 0) {
      // Find parents of matching sub-categories and expand them
      const parentsToExpand = categories
        .filter(cat => cat.subCategories?.some(sub => matchingSubCategoryIds.has(sub.id)))
        .map(cat => cat.id);
      
      setExpandedCategories(new Set(parentsToExpand));
    }
  }, [searchTerm, matchingSubCategoryIds, categories]);

  // Toggle expand
  const toggleExpand = (categoryId) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  // Expand/Collapse All
  const toggleExpandAll = () => {
    if (allExpanded) {
      setExpandedCategories(new Set());
    } else {
      const allIds = categories.filter(c => c.subCategories?.length > 0).map(c => c.id);
      setExpandedCategories(new Set(allIds));
    }
  };

  // Create new category (unified flow)
  const handleCreateCategory = (data) => {
    const { parentId, ...categoryData } = data;
    
    if (parentId) {
      // Creating a sub-category
      const newSubId = Date.now();
      setCategories(categories.map(cat => {
        if (cat.id === parentId) {
          return {
            ...cat,
            subCategories: [...(cat.subCategories || []), { id: newSubId, ...categoryData }]
          };
        }
        return cat;
      }));
      // Auto-expand the parent
      setExpandedCategories(prev => new Set([...prev, parentId]));
    } else {
      // Creating a top-level category
      const newId = Math.max(...categories.map(c => c.id), 0) + 1;
      setCategories([...categories, { id: newId, ...categoryData, subCategories: [] }]);
    }
  };

  // Edit category
  const handleEditCategory = (data) => {
    if (!selectedCategory) return;
    
    const { parentId, originalParentId, ...categoryData } = data;
    const parentChanged = parentId !== originalParentId;
    
    if (parentChanged) {
      // Parent changed - need to move the category
      let categoryToMove;
      let updatedCategories = [...categories];
      
      if (selectedCategory.isSubCategory) {
        // Remove from old parent
        updatedCategories = updatedCategories.map(cat => {
          if (cat.id === originalParentId) {
            const subToMove = cat.subCategories.find(sub => sub.id === selectedCategory.id);
            categoryToMove = { ...subToMove, ...categoryData };
            return {
              ...cat,
              subCategories: cat.subCategories.filter(sub => sub.id !== selectedCategory.id)
            };
          }
          return cat;
        });
      } else {
        // Remove from top-level
        categoryToMove = { ...updatedCategories.find(c => c.id === selectedCategory.id), ...categoryData };
        updatedCategories = updatedCategories.filter(c => c.id !== selectedCategory.id);
      }
      
      if (parentId === null) {
        // Moving to top-level
        const newParentCategory = {
          ...categoryToMove,
          subCategories: categoryToMove.subCategories || []
        };
        updatedCategories.push(newParentCategory);
      } else {
        // Moving under a new parent
        updatedCategories = updatedCategories.map(cat => {
          if (cat.id === parentId) {
            return {
              ...cat,
              subCategories: [...(cat.subCategories || []), { ...categoryToMove, subCategories: undefined }]
            };
          }
          return cat;
        });
        // Auto-expand the new parent
        setExpandedCategories(prev => new Set([...prev, parentId]));
      }
      
      setCategories(updatedCategories);
    } else {
      // No parent change - simple edit
      if (selectedCategory.isSubCategory) {
        setCategories(categories.map(cat => {
          if (cat.id === selectedCategory.parentId) {
            return {
              ...cat,
              subCategories: cat.subCategories.map(sub => 
                sub.id === selectedCategory.id ? { ...sub, ...categoryData } : sub
              )
            };
          }
          return cat;
        }));
      } else {
        setCategories(categories.map(cat => 
          cat.id === selectedCategory.id ? { ...cat, ...categoryData } : cat
        ));
      }
    }
  };

  // Delete category
  const handleDeleteCategory = () => {
    if (!selectedCategory) return;
    
    if (selectedCategory.isSubCategory) {
      setCategories(categories.map(cat => {
        if (cat.id === selectedCategory.parentId) {
          return {
            ...cat,
            subCategories: cat.subCategories.filter(sub => sub.id !== selectedCategory.id)
          };
        }
        return cat;
      }));
    } else {
      setCategories(categories.filter(cat => cat.id !== selectedCategory.id));
    }
    
    setIsDeleteModalOpen(false);
    setSelectedCategory(null);
  };

  // Move category
  const handleMoveCategory = (targetId) => {
    if (!selectedCategory) return;

    if (selectedCategory.isSubCategory) {
      // Moving a sub-category
      const sourceParentId = selectedCategory.parentId;
      const subCategoryToMove = categories
        .find(cat => cat.id === sourceParentId)
        ?.subCategories?.find(sub => sub.id === selectedCategory.id);

      if (!subCategoryToMove) return;

      if (targetId === 'top-level') {
        // Promote sub-category to top-level
        setCategories(prev => {
          // Remove from source parent
          const updated = prev.map(cat => {
            if (cat.id === sourceParentId) {
              return {
                ...cat,
                subCategories: cat.subCategories.filter(sub => sub.id !== selectedCategory.id)
              };
            }
            return cat;
          });
          // Add as new top-level category
          const newTopLevelId = Math.max(...updated.map(c => c.id), 0) + 1;
          return [...updated, {
            id: newTopLevelId,
            name: subCategoryToMove.name,
            description: subCategoryToMove.description,
            visibility: subCategoryToMove.visibility,
            subCategories: []
          }];
        });
      } else {
        // Move to different parent
        setCategories(prev => prev.map(cat => {
          if (cat.id === sourceParentId) {
            // Remove from source
            return {
              ...cat,
              subCategories: cat.subCategories.filter(sub => sub.id !== selectedCategory.id)
            };
          }
          if (cat.id === targetId) {
            // Add to target
            return {
              ...cat,
              subCategories: [...(cat.subCategories || []), {
                ...subCategoryToMove,
                id: Date.now() // New ID for the moved sub-category
              }]
            };
          }
          return cat;
        }));
        // Auto-expand target
        setExpandedCategories(prev => new Set([...prev, targetId]));
      }
    } else {
      // Moving a parent category as sub-category under another
      const categoryToMove = categories.find(cat => cat.id === selectedCategory.id);
      if (!categoryToMove) return;

      setCategories(prev => {
        // Remove from top level
        const remaining = prev.filter(cat => cat.id !== selectedCategory.id);
        // Add as sub-category to target
        return remaining.map(cat => {
          if (cat.id === targetId) {
            // Convert parent to sub-category (keeping its sub-categories as nested)
            const newSubCategory = {
              id: Date.now(),
              name: categoryToMove.name,
              description: categoryToMove.description,
              visibility: categoryToMove.visibility,
              // Note: If the moved parent had sub-categories, they become nested under the new sub-category
              // For simplicity, we merge them into the target's sub-categories
            };
            
            // If the moved category had sub-categories, add them too
            const additionalSubs = categoryToMove.subCategories?.map((sub, idx) => ({
              ...sub,
              id: Date.now() + idx + 1
            })) || [];

            return {
              ...cat,
              subCategories: [...(cat.subCategories || []), newSubCategory, ...additionalSubs]
            };
          }
          return cat;
        });
      });
      // Auto-expand target
      setExpandedCategories(prev => new Set([...prev, targetId]));
    }

    setIsMoveModalOpen(false);
    setSelectedCategory(null);
  };

  // Open move modal
  const openMoveModal = (category, isSubCategory = false, parentId = null) => {
    setSelectedCategory({ ...category, isSubCategory, parentId });
    setIsMoveModalOpen(true);
  };

  // Open create modal for new category
  const openCreateModal = () => {
    setSelectedParentForSubCategory(null);
    setIsCreateModalOpen(true);
  };

  // Open create modal for sub-category
  const openAddSubCategoryModal = (parentCategory) => {
    setSelectedParentForSubCategory(parentCategory);
    setIsCreateModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (category, isSubCategory = false, parentId = null, parentName = null, parentTradeType = null) => {
    setSelectedCategory({ ...category, isSubCategory, parentId, parentName, parentTradeType });
    setIsEditModalOpen(true);
  };

  // Open delete modal
  const openDeleteModal = (category, isSubCategory = false, parentId = null) => {
    setSelectedCategory({ ...category, isSubCategory, parentId });
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Breadcrumb */}
      <div className="px-5 py-3 flex items-center gap-2 text-[13px]">
        <IconHome size={16} className="text-[#94A3B8]" stroke={2} />
        <IconChevronRight size={14} className="text-[#CBD5E1]" stroke={2} />
        <span className="text-[#64748B]">Parts & Services Settings</span>
        <IconChevronRight size={14} className="text-[#CBD5E1]" stroke={2} />
        <span className="text-[#1E293B] font-semibold">Category Settings</span>
      </div>

      {/* Header */}
      <div className="px-5 py-3 flex items-center justify-between border-b border-[#E2E8F0]">
        <div className="flex items-center gap-4">
          <h1 className="text-[15px] font-semibold text-[#1E293B]">
            Categories
            <span className="ml-2 text-[13px] font-normal text-[#64748B]">{totalItemsCount}</span>
          </h1>
          
          {hasAnyCategoriesWithSubs && (
            <button
              onClick={toggleExpandAll}
              className="text-[12px] text-[#64748B] hover:text-[#1E293B] transition-colors"
            >
              {allExpanded ? 'Collapse all' : 'Expand all'}
            </button>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative w-[180px]">
            <IconSearch 
              size={15} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" 
              stroke={2} 
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-[32px] pl-9 pr-3 text-[13px] text-[#1E293B] placeholder-[#94A3B8] border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:border-[#94A3B8]"
            />
          </div>
          
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => openCreateModal()}
            className="gap-1.5"
          >
            <IconPlus size={14} stroke={2.5} className="w-3.5 h-3.5 min-w-[14px] min-h-[14px]" />
            New Category
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Table Header */}
        <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] grid grid-cols-[28px_24px_48px_1fr_36px_36px] h-[36px] min-h-[36px] px-5">
          <div></div>
          <div></div>
          <div className="flex items-center text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Image</div>
          <div className="flex items-center text-[11px] font-semibold text-[#64748B] uppercase tracking-wider pl-3">Name</div>
          <div></div>
          <div></div>
        </div>

        {/* Table Body */}
        <div className="flex-1 overflow-auto px-5">
          {filteredCategories.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-12 h-12 bg-[#F1F5F9] rounded-full flex items-center justify-center mb-3">
                <IconSearch size={20} className="text-[#94A3B8]" stroke={1.5} />
              </div>
              <p className="text-[14px] text-[#64748B]">
                {searchTerm ? 'No categories found' : 'No categories yet'}
              </p>
              {!searchTerm && (
                <button 
                  onClick={() => openCreateModal()}
                  className="mt-2 text-[13px] text-[#2563EB] hover:underline"
                >
                  Create your first category
                </button>
              )}
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={filteredCategories.map(c => c.id)}
                strategy={verticalListSortingStrategy}
              >
                {filteredCategories.map((category) => {
                  const parentMatches = searchTerm && (
                    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    category.description?.toLowerCase().includes(searchTerm.toLowerCase())
                  );
                  
                  return (
                    <Fragment key={category.id}>
                      {/* Parent Row */}
                      <SortableCategoryRow
                        category={category}
                        isExpanded={expandedCategories.has(category.id)}
                        onToggleExpand={() => toggleExpand(category.id)}
                        onEdit={() => openEditModal(category)}
                        onDelete={() => openDeleteModal(category)}
                        onAddSubCategory={() => openAddSubCategoryModal(category)}
                        searchTerm={searchTerm}
                        isSearchMatch={parentMatches}
                        isDragDisabled={!!searchTerm}
                      />
                      
                      {/* Sub-Categories */}
                      <Transition
                        show={expandedCategories.has(category.id)}
                        enter="transition-all duration-200 ease-out"
                        enterFrom="opacity-0 max-h-0"
                        enterTo="opacity-100 max-h-[1000px]"
                        leave="transition-all duration-150 ease-in"
                        leaveFrom="opacity-100 max-h-[1000px]"
                        leaveTo="opacity-0 max-h-0"
                      >
                        <div className="overflow-hidden">
                          <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleSubCategoryDragEnd(category.id)}
                          >
                            <SortableContext
                              items={category.subCategories?.map(s => s.id) || []}
                              strategy={verticalListSortingStrategy}
                            >
                              {category.subCategories?.map((subCategory) => (
                                <SortableCategoryRow
                                  key={subCategory.id}
                                  category={subCategory}
                                  isSubCategory={true}
                                  onEdit={() => openEditModal(subCategory, true, category.id, category.name, category.tradeType)}
                                  onDelete={() => openDeleteModal(subCategory, true, category.id)}
                                  searchTerm={searchTerm}
                                  isSearchMatch={matchingSubCategoryIds.has(subCategory.id)}
                                  isDragDisabled={!!searchTerm}
                                />
                              ))}
                            </SortableContext>
                          </DndContext>
                          {/* Add sub-category link - hide when searching */}
                          {!searchTerm && <AddSubCategoryRow onClick={() => openAddSubCategoryModal(category)} />}
                        </div>
                      </Transition>
                    </Fragment>
                  );
                })}
              </SortableContext>
            </DndContext>
          )}
        </div>

        {/* Pagination */}
        <div className="h-[44px] min-h-[44px] bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between px-5">
          <div className="flex items-center gap-2 text-[12px] text-[#64748B]">
            <span>Rows per page</span>
            <Dropdown
              value={pageSize}
              options={PAGE_SIZE_OPTIONS}
              onChange={setPageSize}
            />
          </div>

          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-1 text-[#94A3B8] disabled:opacity-30 hover:text-[#64748B] transition-colors"
            >
              <IconChevronsLeft size={16} stroke={2} />
            </button>
            
            <button 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-1 text-[#94A3B8] disabled:opacity-30 hover:text-[#64748B] transition-colors"
            >
              <IconChevronLeft size={16} stroke={2} />
            </button>

            <span className="text-[12px] text-[#1E293B] px-3">
              {currentPage} / {totalPages || 1}
            </span>

            <button 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1 text-[#94A3B8] disabled:opacity-30 hover:text-[#64748B] transition-colors"
            >
              <IconChevronRight size={16} stroke={2} />
            </button>
            
            <button 
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1 text-[#94A3B8] disabled:opacity-30 hover:text-[#64748B] transition-colors"
            >
              <IconChevronsRight size={16} stroke={2} />
            </button>
          </div>

          <div className="flex items-center gap-2 text-[12px] text-[#64748B]">
            <span>Go to</span>
            <input
              type="text"
              value={goToPage}
              onChange={(e) => setGoToPage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const page = parseInt(goToPage);
                  if (page >= 1 && page <= totalPages) {
                    setCurrentPage(page);
                  }
                }
              }}
              className="w-[36px] h-[26px] px-2 bg-white border border-[#E2E8F0] rounded text-[12px] text-[#1E293B] focus:outline-none focus:border-[#94A3B8] text-center"
            />
          </div>
        </div>
      </div>

      {/* Create Category / Sub-Category Modal */}
      <CategoryModal 
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setSelectedParentForSubCategory(null);
        }}
        onSave={handleCreateCategory}
        mode="create"
        parentCategory={selectedParentForSubCategory}
      />

      {/* Edit Modal */}
      <CategoryModal 
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCategory(null);
        }}
        onSave={handleEditCategory}
        mode="edit"
        initialData={selectedCategory}
        parentCategory={selectedCategory?.isSubCategory ? {
          id: selectedCategory.parentId,
          name: selectedCategory.parentName,
          tradeType: selectedCategory.parentTradeType
        } : null}
        allCategories={categories}
      />

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedCategory(null);
        }}
        onConfirm={handleDeleteCategory}
        category={selectedCategory}
        hasSubCategories={!selectedCategory?.isSubCategory && selectedCategory?.subCategories?.length > 0}
      />

      {/* Move Modal */}
      <MoveCategoryModal
        isOpen={isMoveModalOpen}
        onClose={() => {
          setIsMoveModalOpen(false);
          setSelectedCategory(null);
        }}
        onMove={handleMoveCategory}
        category={selectedCategory}
        categories={categories}
      />
    </div>
  );
}

export default CategorySettings;
