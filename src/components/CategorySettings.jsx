import React, { useState, useMemo, Fragment } from 'react';
import { Transition, Menu } from '@headlessui/react';
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
  IconEye,
  IconEyeOff,
  IconDotsVertical
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
    name: 'Shingles', 
    description: 'Roofing shingles and materials',
    visibility: { technicians: true, customerPortal: true },
    subCategories: [
      { id: 101, name: 'Asphalt 3-Tab', description: 'Standard 3-tab asphalt shingles', visibility: { technicians: true, customerPortal: true } },
      { id: 102, name: 'Asphalt Architectural', description: 'Premium architectural shingles', visibility: { technicians: true, customerPortal: true } },
      { id: 103, name: 'Metal Standing Seam', description: 'Metal roofing panels', visibility: { technicians: true, customerPortal: false } },
    ]
  },
  { 
    id: 2, 
    name: 'Underlayments', 
    description: 'Protective underlayment materials',
    visibility: { technicians: true, customerPortal: true },
    subCategories: []
  },
  { 
    id: 3, 
    name: 'Fasteners', 
    description: 'Nails, screws, and fastening hardware',
    visibility: { technicians: true, customerPortal: false },
    subCategories: [
      { id: 301, name: 'Roofing Nails', description: 'Standard roofing nails', visibility: { technicians: true, customerPortal: false } },
      { id: 302, name: 'Screws', description: 'Metal and wood screws', visibility: { technicians: true, customerPortal: false } },
    ]
  },
  { 
    id: 4, 
    name: 'Flashing', 
    description: 'Metal flashing for waterproofing',
    visibility: { technicians: true, customerPortal: true },
    subCategories: []
  },
  { 
    id: 5, 
    name: 'Ventilation', 
    description: 'Roof vents and ventilation systems',
    visibility: { technicians: true, customerPortal: true },
    subCategories: []
  },
  { 
    id: 6, 
    name: 'Labor', 
    description: 'Service and labor charges',
    visibility: { technicians: false, customerPortal: true },
    subCategories: [
      { id: 601, name: 'Installation', description: 'Installation labor', visibility: { technicians: false, customerPortal: true } },
      { id: 602, name: 'Repair', description: 'Repair labor', visibility: { technicians: false, customerPortal: true } },
      { id: 603, name: 'Inspection', description: 'Inspection services', visibility: { technicians: true, customerPortal: true } },
    ]
  },
  { 
    id: 7, 
    name: 'Internal Costs', 
    description: 'Internal cost tracking (hidden from field)',
    visibility: { technicians: false, customerPortal: false },
    subCategories: []
  },
  { 
    id: 8, 
    name: 'Gutters', 
    description: 'Gutter systems and accessories',
    visibility: { technicians: true, customerPortal: true },
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
                  <IconPlus size={15} className="text-[#64748B]" stroke={2} />
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

function CategoryRow({ 
  category, 
  isExpanded, 
  onToggleExpand, 
  onEdit, 
  onDelete,
  onAddSubCategory,
  isSubCategory = false,
  searchTerm = '',
  isSearchMatch = false,
}) {
  const hasSubCategories = !isSubCategory && category.subCategories?.length > 0;
  const isRestricted = !category.visibility.technicians || !category.visibility.customerPortal;
  const isParent = !isSubCategory;
  
  return (
    <div 
      className={`
        grid grid-cols-[28px_24px_1fr_100px_36px_36px] h-[52px] border-b border-[#E2E8F0] 
        hover:bg-[#FAFBFC] transition-colors group
        ${isSubCategory ? 'bg-[#FAFBFC]' : 'bg-white'}
        ${isSearchMatch ? 'bg-[#FFFBEB]' : ''}
      `}
    >
      {/* Drag handle - always available */}
      <div className={`flex items-center justify-center ${isSubCategory ? 'pl-4' : ''}`}>
        <IconGripVertical 
          size={14} 
          className="text-[#CBD5E1] cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
          stroke={2} 
        />
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
      
      {/* Category Name & Description */}
      <div className={`flex items-center min-w-0 ${isSubCategory ? 'pl-2' : ''}`}>
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
      
      {/* Visibility Status */}
      <div className="flex items-center px-3">
        {isRestricted ? (
          <div className="flex items-center gap-1.5 text-[12px] text-[#94A3B8]">
            <IconEyeOff size={14} stroke={2} />
            <span>Restricted</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-[12px] text-[#64748B]">
            <IconEye size={14} stroke={2} />
            <span>Visible</span>
          </div>
        )}
      </div>
      
      {/* Add Sub-Category button - only for parent categories */}
      <div className="flex items-center justify-center">
        {isParent && (
          <button 
            onClick={onAddSubCategory}
            className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#EFF6FF] text-[#94A3B8] hover:text-[#2563EB] transition-colors"
            title="Add sub-category"
          >
            <IconPlus size={16} stroke={2} />
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
        <IconPlus size={15} stroke={2.5} />
        <span>Add sub-category</span>
      </button>
    </div>
  );
}

// ============================================
// Category Modal (Create/Edit)
// ============================================

function CategoryModal({ 
  isOpen, 
  onClose, 
  onSave, 
  mode = 'create', // 'create' | 'edit'
  parentCategory = null, // For sub-category creation - the parent category
  initialData = null 
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [technicianVisibility, setTechnicianVisibility] = useState(true);
  const [customerPortalVisibility, setCustomerPortalVisibility] = useState(true);

  // Reset form when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setName(initialData?.name || '');
      setDescription(initialData?.description || '');
      setTechnicianVisibility(initialData?.visibility?.technicians ?? true);
      setCustomerPortalVisibility(initialData?.visibility?.customerPortal ?? true);
    }
  }, [isOpen, initialData]);

  const handleSave = () => {
    if (name.trim()) {
      onSave({
        name: name.trim(),
        description: description.trim(),
        parentId: parentCategory?.id || null,
        visibility: {
          technicians: technicianVisibility,
          customerPortal: customerPortalVisibility,
        },
      });
      onClose();
    }
  };

  const isSubCategory = parentCategory !== null;

  // Determine title based on mode and type
  const getTitle = () => {
    if (mode === 'edit') {
      return initialData?.isSubCategory ? 'Edit Sub-Category' : 'Edit Category';
    }
    return isSubCategory ? 'New Sub-Category' : 'New Category';
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
        {/* Show parent context when creating sub-category */}
        {mode === 'create' && isSubCategory && (
          <div className="bg-[#F8FAFC] rounded-lg px-4 py-3">
            <span className="text-[12px] text-[#64748B]">Creating sub-category under </span>
            <span className="text-[13px] font-medium text-[#1E293B]">{parentCategory.name}</span>
          </div>
        )}

        {/* Show parent context in edit mode if it's a sub-category */}
        {mode === 'edit' && initialData?.isSubCategory && (
          <div className="bg-[#F8FAFC] rounded-lg px-4 py-3">
            <span className="text-[12px] text-[#64748B]">Sub-category of </span>
            <span className="text-[13px] font-medium text-[#1E293B]">{initialData.parentName}</span>
          </div>
        )}

        {/* Category Name */}
        <div>
          <Label required className="mb-2 block">Name</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={isSubCategory ? `e.g., Asphalt 3-Tab` : 'e.g., Shingles'}
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


        {/* Visibility Settings */}
        <div>
          <Label className="mb-3 block">Visibility</Label>
          <div className="border border-[#E2E8F0] rounded-lg divide-y divide-[#E2E8F0]">
            <div 
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-[#FAFBFC] transition-colors"
              onClick={() => setTechnicianVisibility(!technicianVisibility)}
            >
              <div>
                <span className="text-[13px] font-medium text-[#1E293B] block">Field Technicians</span>
                <span className="text-[12px] text-[#94A3B8]">Visible in mobile app</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={technicianVisibility}
                onClick={(e) => { e.stopPropagation(); setTechnicianVisibility(!technicianVisibility); }}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  technicianVisibility ? 'bg-[#2563EB]' : 'bg-[#E2E8F0]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    technicianVisibility ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div 
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-[#FAFBFC] transition-colors"
              onClick={() => setCustomerPortalVisibility(!customerPortalVisibility)}
            >
              <div>
                <span className="text-[13px] font-medium text-[#1E293B] block">Customer Portal</span>
                <span className="text-[12px] text-[#94A3B8]">Visible on estimates & invoices</span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={customerPortalVisibility}
                onClick={(e) => { e.stopPropagation(); setCustomerPortalVisibility(!customerPortalVisibility); }}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  customerPortalVisibility ? 'bg-[#2563EB]' : 'bg-[#E2E8F0]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    customerPortalVisibility ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedParentForSubCategory, setSelectedParentForSubCategory] = useState(null);
  
  const totalPages = Math.ceil(categories.length / pageSize);

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
    
    if (selectedCategory.isSubCategory) {
      setCategories(categories.map(cat => {
        if (cat.id === selectedCategory.parentId) {
          return {
            ...cat,
            subCategories: cat.subCategories.map(sub => 
              sub.id === selectedCategory.id ? { ...sub, ...data } : sub
            )
          };
        }
        return cat;
      }));
    } else {
      setCategories(categories.map(cat => 
        cat.id === selectedCategory.id ? { ...cat, ...data } : cat
      ));
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
  const openEditModal = (category, isSubCategory = false, parentId = null, parentName = null) => {
    setSelectedCategory({ ...category, isSubCategory, parentId, parentName });
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
            <IconPlus size={14} stroke={2.5} />
            New Category
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Table Header */}
        <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] grid grid-cols-[28px_24px_1fr_100px_36px_36px] h-[36px] min-h-[36px] px-5">
          <div></div>
          <div></div>
          <div className="flex items-center text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Name</div>
          <div className="flex items-center text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">Visibility</div>
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
            filteredCategories.map((category) => {
              const parentMatches = searchTerm && (
                category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.description?.toLowerCase().includes(searchTerm.toLowerCase())
              );
              
              return (
                <Fragment key={category.id}>
                  {/* Parent Row */}
                  <CategoryRow
                    category={category}
                    isExpanded={expandedCategories.has(category.id)}
                    onToggleExpand={() => toggleExpand(category.id)}
                    onEdit={() => openEditModal(category)}
                    onDelete={() => openDeleteModal(category)}
                    onAddSubCategory={() => openAddSubCategoryModal(category)}
                    searchTerm={searchTerm}
                    isSearchMatch={parentMatches}
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
                      {category.subCategories?.map((subCategory) => (
                        <CategoryRow
                          key={subCategory.id}
                          category={subCategory}
                          isSubCategory={true}
                          onEdit={() => openEditModal(subCategory, true, category.id, category.name)}
                          onDelete={() => openDeleteModal(subCategory, true, category.id)}
                          searchTerm={searchTerm}
                          isSearchMatch={matchingSubCategoryIds.has(subCategory.id)}
                        />
                      ))}
                      {/* Add sub-category link - hide when searching */}
                      {!searchTerm && <AddSubCategoryRow onClick={() => openAddSubCategoryModal(category)} />}
                    </div>
                  </Transition>
                </Fragment>
              );
            })
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
    </div>
  );
}

export default CategorySettings;
