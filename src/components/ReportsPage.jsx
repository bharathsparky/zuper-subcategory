import React, { useState } from 'react';
import {
  IconChevronRight,
  IconChevronDown,
  IconSearch,
  IconGripVertical,
  IconAlertTriangle,
  IconX,
  IconMenu2,
  IconLayoutGrid,
  IconFilter,
} from '@tabler/icons-react';

// Grid icon for fields
const GridIcon = () => (
  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2H6V6H2V2Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 2H15V6H11V2Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 11H6V15H2V11Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 11H15V15H11V11Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Filter icon
const FilterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.25 4.5H15.75" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.5 9H13.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.75 13.5H11.25" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Text field icon
const TextFieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="14" height="14" rx="2" stroke="#64748B" strokeWidth="1.5"/>
    <path d="M5 9H13" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// Drag and drop illustration
const DragDropIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="24" height="24" rx="4" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4"/>
    <circle cx="16" cy="12" r="2" fill="#CBD5E1"/>
    <circle cx="16" cy="20" r="2" fill="#CBD5E1"/>
  </svg>
);

// Sample report data
const REPORT_DATA = [
  { createdAt: '07/15/2020 20:10:03', updatedAt: '08/09/2024 15:18:11', markupType: 'No Value', markupValue: 'No Value' },
  { createdAt: '07/16/2020 12:40:08', updatedAt: '08/09/2024 15:18:11', markupType: 'No Value', markupValue: 'No Value' },
  { createdAt: '07/16/2020 12:40:08', updatedAt: '08/09/2024 15:18:11', markupType: 'No Value', markupValue: 'No Value' },
  { createdAt: '07/16/2020 12:40:08', updatedAt: '08/09/2024 15:18:11', markupType: 'No Value', markupValue: 'No Value' },
  { createdAt: '07/16/2020 12:40:08', updatedAt: '08/09/2024 15:18:11', markupType: 'No Value', markupValue: 'No Value' },
  { createdAt: '07/16/2020 12:40:08', updatedAt: '08/09/2024 15:18:11', markupType: 'No Value', markupValue: 'No Value' },
  { createdAt: '07/16/2020 12:40:08', updatedAt: '08/09/2024 15:18:11', markupType: 'No Value', markupValue: 'No Value' },
  { createdAt: '07/16/2020 16:44:58', updatedAt: '08/09/2024 15:18:11', markupType: 'No Value', markupValue: 'No Value' },
  { createdAt: '07/16/2020 16:44:58', updatedAt: '08/09/2024 15:18:11', markupType: 'No Value', markupValue: 'No Value' },
  { createdAt: '07/16/2020 16:44:58', updatedAt: '08/09/2024 15:18:11', markupType: 'No Value', markupValue: 'No Value' },
  { createdAt: '07/16/2020 16:44:58', updatedAt: '08/09/2024 15:18:11', markupType: 'No Value', markupValue: 'No Value' },
  { createdAt: '07/16/2020 16:44:58', updatedAt: '08/09/2024 15:18:11', markupType: 'No Value', markupValue: 'No Value' },
  { createdAt: '07/23/2020 13:34:31', updatedAt: '08/09/2024 15:18:11', markupType: 'No Value', markupValue: 'No Value' },
  { createdAt: '07/24/2020 10:43:14', updatedAt: '08/09/2024 15:18:11', markupType: 'No Value', markupValue: 'No Value' },
];

// Selected columns for the report
const SELECTED_COLUMNS = [
  { id: 'productType', name: 'Product Type', icon: 'text' },
  { id: 'description', name: 'Description', icon: 'text' },
  { id: 'brand', name: 'Brand', icon: 'text' },
  { id: 'specification', name: 'Specification', icon: 'text' },
  { id: 'quantity', name: 'Quantity', icon: 'number' },
  { id: 'uom', name: 'uom', icon: 'text' },
  { id: 'minQuantity', name: 'Min Quantity', icon: 'number' },
  { id: 'currency', name: 'Currency', icon: 'text' },
  { id: 'price', name: 'Price', icon: 'currency' },
  { id: 'purchasePrice', name: 'Purchase Price', icon: 'currency' },
  { id: 'hasCustomTax', name: 'Has CustomTax', icon: 'boolean' },
  { id: 'taxName', name: 'Tax Name', icon: 'text' },
  { id: 'taxRate', name: 'Tax Rate', icon: 'text' },
  { id: 'isAvailable', name: 'Is Available', icon: 'boolean' },
  { id: 'createdByName', name: 'Created By - Name', icon: 'text' },
  { id: 'createdAt', name: 'Created At', icon: 'date' },
  { id: 'updatedAt', name: 'Updated At', icon: 'date' },
  { id: 'markupType', name: 'Markup Type', icon: 'text' },
  { id: 'markupValue', name: 'Markup Value', icon: 'text' },
  { id: 'categoryName', name: 'Category Name', icon: 'text' },
];

// Default fields for module
const DEFAULT_FIELDS = [
  { id: 'prefix', name: 'Prefix' },
  { id: 'productNo', name: 'Product No' },
  { id: 'productBarcode', name: 'Product Barcode' },
  { id: 'brand', name: 'Brand' },
  { id: 'specification', name: 'Specification' },
  { id: 'uom', name: 'uom' },
  { id: 'productName', name: 'Product Name' },
  { id: 'description', name: 'Description' },
  { id: 'productType', name: 'Product Type' },
  { id: 'pricingLevel', name: 'Pricing Level' },
  { id: 'productManualLink', name: 'Product Manual Link' },
  { id: 'trackQuantity', name: 'Track Quantity' },
  { id: 'lowStock', name: 'Low Stock' },
  { id: 'quantity', name: 'Quantity' },
  { id: 'minQuantity', name: 'Min Quantity' },
  { id: 'currency', name: 'Currency' },
  { id: 'price', name: 'Price' },
  { id: 'purchasePrice', name: 'Purchase Price' },
];

const CUSTOM_FIELDS = [
  { id: 'singleLineNumber', name: 'Single Line - Number' },
  { id: 'multiplier', name: 'Multiplier' },
  { id: 'oct3', name: 'Oct 3' },
  { id: 'upload', name: 'Upload' },
  { id: 'conditionalField1', name: 'Conditional Field fo...' },
  { id: 'conditionalField2', name: 'Conditional Field fo...' },
  { id: 'conditionalField3', name: 'Conditional field for...' },
  { id: 'formulaField', name: 'Formula Field for Fl...' },
];

// Field Structure for Report Builder
// Product Category fields - will show the category the product belongs to 
// (whether it's a parent category or a subcategory - products belong to one category)
const PRODUCT_CATEGORY_FIELDS = [
  { id: 'categoryUID', name: 'Category UID' },
  { id: 'categoryName', name: 'Category Name' },
  { id: 'categoryDescription', name: 'Category Description' },
  { id: 'categoryCreatedAt', name: 'Created At' },
];

const LOCATION_FIELDS = [
  { id: 'locationUID', name: 'Location UID' },
  { id: 'locationName', name: 'Location Name' },
  { id: 'address', name: 'Address' },
  { id: 'city', name: 'City' },
  { id: 'state', name: 'State' },
  { id: 'zipCode', name: 'Zip Code' },
  { id: 'locationCreatedAt', name: 'Created At' },
];

// Column Field Item Component
function ColumnFieldItem({ name, onRemove }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-[4px] px-[13px] py-[10px] flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-[10.5px]">
        <IconGripVertical className="w-[18px] h-[18px] text-[#94A3B8] cursor-grab" />
        <div className="flex items-center gap-[7px]">
          <TextFieldIcon />
          <span className="text-[14px] font-normal text-[#1E293B]">{name}</span>
        </div>
      </div>
      <button onClick={onRemove} className="p-1 hover:bg-[#F1F5F9] rounded">
        <IconX className="w-[20px] h-[20px] text-[#94A3B8]" />
      </button>
    </div>
  );
}

// Module Field Item Component
function ModuleFieldItem({ name }) {
  return (
    <div className="flex items-center gap-[7px] px-[7px] py-[7px] hover:bg-[#F8FAFC] rounded-[4px] cursor-pointer">
      <TextFieldIcon />
      <span className="text-[14px] font-normal text-[#334155]">{name}</span>
    </div>
  );
}

// Folder/Category icon for expandable sections
const FolderIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.25 5.25V12.75C2.25 13.1478 2.40804 13.5294 2.68934 13.8107C2.97064 14.092 3.35218 14.25 3.75 14.25H14.25C14.6478 14.25 15.0294 14.092 15.3107 13.8107C15.592 13.5294 15.75 13.1478 15.75 12.75V6.75C15.75 6.35218 15.592 5.97064 15.3107 5.68934C15.0294 5.40804 14.6478 5.25 14.25 5.25H9L7.5 3.75H3.75C3.35218 3.75 2.97064 3.90804 2.68934 4.18934C2.40804 4.47064 2.25 4.85218 2.25 5.25Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Recursive Nested Subcategory Item
function NestedSubcategoryItem({ item, level = 0, expandedItems, toggleExpand }) {
  const hasSubCategories = item.subCategories && item.subCategories.length > 0;
  const hasFields = item.fields && item.fields.length > 0;
  const isExpandable = hasSubCategories || hasFields;
  const isExpanded = expandedItems[item.id];
  const paddingLeft = 7 + (level * 17);

  return (
    <div>
      <button 
        onClick={() => isExpandable && toggleExpand(item.id)}
        className="w-full flex items-center gap-[7px] py-[7px] hover:bg-[#F8FAFC] rounded-[4px]"
        style={{ paddingLeft: `${paddingLeft}px`, paddingRight: '7px' }}
      >
        {isExpandable ? <FolderIcon /> : <TextFieldIcon />}
        <span className="text-[14px] font-normal text-[#334155] flex-1 text-left">{item.name}</span>
        {isExpandable && (
          isExpanded ? (
            <IconChevronDown className="w-[12px] h-[12px] text-[#64748B]" />
          ) : (
            <IconChevronRight className="w-[12px] h-[12px] text-[#64748B]" />
          )
        )}
      </button>
      
      {isExpanded && isExpandable && (
        <div className="mt-[2px] space-y-[2px]">
          {/* Show fields for this subcategory */}
          {item.fields && item.fields.map((field) => (
            <div 
              key={field.id}
              className="flex items-center gap-[7px] py-[7px] hover:bg-[#F8FAFC] rounded-[4px] cursor-pointer"
              style={{ paddingLeft: `${paddingLeft + 17}px`, paddingRight: '7px' }}
            >
              <TextFieldIcon />
              <span className="text-[14px] font-normal text-[#334155]">{field.name}</span>
            </div>
          ))}
          
          {/* Recursively render nested subcategories */}
          {hasSubCategories && item.subCategories.map((subCat) => (
            <NestedSubcategoryItem 
              key={subCat.id} 
              item={subCat} 
              level={level + 1}
              expandedItems={expandedItems}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Hierarchical Expandable Section with Subcategories
function HierarchicalExpandableSection({ title, hierarchy, isExpanded, onToggle, expandedItems, toggleExpand }) {
  return (
    <div>
      <button 
        onClick={onToggle}
        className="w-full flex items-center gap-[7px] px-[7px] py-[7px] hover:bg-[#F8FAFC] rounded-[4px]"
      >
        <FolderIcon />
        <span className="text-[14px] font-normal text-[#334155] flex-1 text-left">{title}</span>
        {isExpanded ? (
          <IconChevronDown className="w-[12px] h-[12px] text-[#64748B]" />
        ) : (
          <IconChevronRight className="w-[12px] h-[12px] text-[#64748B]" />
        )}
      </button>
      {isExpanded && (
        <div className="ml-[17px] mt-[2px] space-y-[2px]">
          {/* Main level fields */}
          {hierarchy.fields && hierarchy.fields.map((field) => (
            <ModuleFieldItem key={field.id} name={field.name} />
          ))}
          
          {/* Subcategories */}
          {hierarchy.subCategories && hierarchy.subCategories.map((subCat) => (
            <NestedSubcategoryItem 
              key={subCat.id} 
              item={subCat}
              level={0}
              expandedItems={expandedItems}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Simple Expandable Section (for non-hierarchical items)
function ExpandableSection({ title, isExpanded, onToggle, children }) {
  return (
    <div>
      <button 
        onClick={onToggle}
        className="w-full flex items-center gap-[7px] px-[7px] py-[7px] hover:bg-[#F8FAFC] rounded-[4px]"
      >
        <FolderIcon />
        <span className="text-[14px] font-normal text-[#334155] flex-1 text-left">{title}</span>
        {isExpanded ? (
          <IconChevronDown className="w-[12px] h-[12px] text-[#64748B]" />
        ) : (
          <IconChevronRight className="w-[12px] h-[12px] text-[#64748B]" />
        )}
      </button>
      {isExpanded && (
        <div className="ml-[17px] mt-[2px] space-y-[2px]">
          {children}
        </div>
      )}
    </div>
  );
}

function ReportsPage({ onBack }) {
  const [activeTab, setActiveTab] = useState('fields');
  const [reportName, setReportName] = useState('Product Master Report...');
  const [selectedModule, setSelectedModule] = useState('Product');
  const [expandedProductCategory, setExpandedProductCategory] = useState(true);
  const [expandedLocation, setExpandedLocation] = useState(false);
  const [fieldsSearch, setFieldsSearch] = useState('');
  const [moduleSearch, setModuleSearch] = useState('');

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Secondary Header - Report Navigation */}
      <div className="h-[49px] border-b border-[#E2E8F0] flex items-center justify-between px-[14px]">
        {/* Left side - Breadcrumb and Report Info */}
        <div className="flex items-center gap-[0px]">
          {/* Reports text */}
          <span className="text-[16px] font-semibold text-[#1E293B]">Reports</span>
          
          {/* Chevron separator */}
          <div className="flex items-center justify-center w-[35px]">
            <IconChevronRight className="w-[21px] h-[21px] text-[#94A3B8]" />
          </div>
          
          {/* My Reports dropdown */}
          <div className="flex items-center gap-[7px] px-[10px] py-[4px] border border-[#E2E8F0] rounded-[4px] bg-white cursor-pointer hover:bg-[#F8FAFC]">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.25 14.25V3.75C2.25 3.15326 2.48705 2.58097 2.90901 2.15901C3.33097 1.73705 3.90326 1.5 4.5 1.5H13.5C14.0967 1.5 14.669 1.73705 15.091 2.15901C15.5129 2.58097 15.75 3.15326 15.75 3.75V14.25C15.75 14.8467 15.5129 15.419 15.091 15.841C14.669 16.2629 14.0967 16.5 13.5 16.5H4.5C3.90326 16.5 3.33097 16.2629 2.90901 15.841C2.48705 15.419 2.25 14.8467 2.25 14.25Z" stroke="#E44A19" strokeWidth="1.5"/>
              <path d="M5.25 6H12.75" stroke="#E44A19" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M5.25 9H12.75" stroke="#E44A19" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M5.25 12H9.75" stroke="#E44A19" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-[14px] font-normal text-[#1E293B]">My Reports</span>
            <IconChevronDown className="w-[10px] h-[5px] text-[#64748B]" />
          </div>
          
          {/* Report Name Input */}
          <div className="ml-[14px]">
            <input
              type="text"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              className="w-[175px] h-[31.5px] px-[13px] border-b border-[#E2E8F0] text-[14px] font-normal text-[#1E293B] bg-transparent focus:outline-none focus:border-[#E44A19]"
            />
          </div>
          
          {/* Unsaved changes badge */}
          <div className="ml-[14px] flex items-center gap-[7px] px-[10px] py-[4px] bg-[#FFF7ED] border border-[#FDBA74] rounded-[4px]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 5.25V7.875" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="7" cy="10.0625" r="0.4375" fill="#EA580C"/>
              <path d="M1.3125 10.9375L5.6875 2.625C5.8435 2.32031 6.07656 2.06303 6.36383 1.87936C6.6511 1.69568 6.98186 1.59229 7.32175 1.57944C7.66164 1.5666 7.99888 1.64476 8.29842 1.80605C8.59797 1.96733 8.84919 2.20609 9.02719 2.49719L13.125 9.625C13.3125 9.91875 13.4123 10.2584 13.4132 10.6054C13.4142 10.9524 13.3163 11.2926 13.1304 11.5873C12.9445 11.882 12.6782 12.1198 12.3627 12.2744C12.0472 12.4289 11.6949 12.4943 11.3438 12.4625H3.0625C2.71875 12.4583 2.38125 12.3646 2.08125 12.1896C1.78125 12.0146 1.52812 11.7635 1.34375 11.4594C1.15938 11.1552 1.05 10.8073 1.025 10.4479C0.999998 10.0885 1.06094 9.72813 1.20312 9.40001" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[13px] font-medium text-[#EA580C]">Unsaved changes</span>
          </div>
        </div>
        
        {/* Right side - Actions */}
        <div className="flex items-center gap-[0px]">
          <button className="h-[31.5px] px-[15px] text-[14px] font-medium text-[#64748B] hover:text-[#1E293B] transition-colors">
            Cancel
          </button>
          <button className="ml-[12px] h-[31.5px] px-[14px] bg-[#E44A19] text-white text-[14px] font-medium rounded-[4px] hover:bg-[#D43F10] transition-colors">
            Save Changes
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Report Preview */}
        <div className="flex-1 p-[14px] overflow-auto">
          {/* Preview Header */}
          <div className="mb-[7px]">
            <h2 className="text-[16px] font-semibold text-[#1E293B]">Report Preview (50)</h2>
          </div>
          
          {/* Info Message */}
          <div className="flex items-start gap-[7px] mb-[24px]">
            <IconAlertTriangle className="w-[17.5px] h-[17.5px] text-[#EA580C] flex-shrink-0 mt-[2px]" />
            <p className="text-[14px] font-normal text-[#64748B] leading-[21px]">
              In this Builder mode, a maximum of 50 records will be displayed and aggregation will be done on preview. Run the report to view all the Records
            </p>
          </div>
          
          {/* Data Table */}
          <div className="border border-[#E2E8F0] rounded-[4px] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F8FAFC]">
                  <th className="h-[36px] px-[18px] text-left text-[14px] font-semibold text-[#1E293B] border-b border-[#E2E8F0]">Created At</th>
                  <th className="h-[36px] px-[18px] text-left text-[14px] font-semibold text-[#1E293B] border-b border-[#E2E8F0]">Updated At</th>
                  <th className="h-[36px] px-[18px] text-left text-[14px] font-semibold text-[#1E293B] border-b border-[#E2E8F0]">Markup Type</th>
                  <th className="h-[36px] px-[18px] text-left text-[14px] font-semibold text-[#1E293B] border-b border-[#E2E8F0]">Markup Value</th>
                </tr>
              </thead>
              <tbody>
                {REPORT_DATA.map((row, index) => (
                  <tr key={index} className="hover:bg-[#F8FAFC]">
                    <td className="h-[44px] px-[18px] text-[14px] font-normal text-[#334155] border-b border-[#E2E8F0]">{row.createdAt}</td>
                    <td className="h-[44px] px-[18px] text-[14px] font-normal text-[#334155] border-b border-[#E2E8F0]">{row.updatedAt}</td>
                    <td className="h-[44px] px-[18px] text-[14px] font-normal text-[#64748B] border-b border-[#E2E8F0]">{row.markupType}</td>
                    <td className="h-[44px] px-[18px] text-[14px] font-normal text-[#64748B] border-b border-[#E2E8F0]">{row.markupValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Middle Panel - Fields/Filters */}
        <div className="w-[300px] border-l border-[#E2E8F0] flex flex-col bg-white">
          {/* Tabs */}
          <div className="h-[50px] flex border-b border-[#E2E8F0]">
            <button
              onClick={() => setActiveTab('fields')}
              className={`flex-1 flex items-center justify-center gap-[7px] ${activeTab === 'fields' ? 'border-b-2 border-[#E44A19]' : ''}`}
            >
              <GridIcon />
              <span className={`text-[14px] font-medium ${activeTab === 'fields' ? 'text-[#1E293B]' : 'text-[#64748B]'}`}>Fields</span>
            </button>
            <button
              onClick={() => setActiveTab('filters')}
              className={`flex-1 flex items-center justify-center gap-[7px] ${activeTab === 'filters' ? 'border-b-2 border-[#E44A19]' : ''}`}
            >
              <FilterIcon />
              <span className={`text-[14px] font-medium ${activeTab === 'filters' ? 'text-[#1E293B]' : 'text-[#64748B]'}`}>Filters</span>
            </button>
          </div>

          {/* Fields Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Fields Counter */}
            <div className="flex items-center justify-between px-[12px] py-[10px]">
              <span className="text-[14px] font-semibold text-[#1E293B]">Fields</span>
              <span className="text-[13px] font-medium text-[#64748B] bg-[#F1F5F9] px-[10.5px] py-[3.5px] rounded-[4px]">20 / 30</span>
            </div>

            {/* Search Fields */}
            <div className="px-[12px] pb-[12px]">
              <div className="relative">
                <IconSearch className="absolute left-[10.5px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#94A3B8]" />
                <input
                  type="text"
                  placeholder="Search fields"
                  value={fieldsSearch}
                  onChange={(e) => setFieldsSearch(e.target.value)}
                  className="w-full h-[34px] pl-[36px] pr-[10px] border border-[#E2E8F0] rounded-[4px] text-[13px] font-normal text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#94A3B8] bg-white"
                />
              </div>
            </div>

            {/* Row Groups Section */}
            <div className="px-[12px] py-[12px] border-t border-[#E2E8F0]">
              <div className="flex items-center justify-between mb-[8px]">
                <span className="text-[14px] font-semibold text-[#1E293B]">Row Groups</span>
                <div className="flex items-center gap-[7px] bg-[#F1F5F9] px-[7px] py-[4.5px] rounded-[4px]">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.25 6.375L8.5 10.625L12.75 6.375" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-[13px] font-medium text-[#64748B]">0 / 4</span>
                </div>
              </div>
              
              {/* Drag & Drop Area */}
              <div className="border border-dashed border-[#CBD5E1] rounded-[4px] py-[12.5px] flex flex-col items-center justify-center">
                <DragDropIcon />
                <span className="text-[13px] font-normal text-[#64748B] mt-[7px]">Drag & Drop a field here for Grouping</span>
              </div>
            </div>

            {/* Columns Section */}
            <div className="px-[12px] py-[12px] border-t border-[#E2E8F0]">
              <span className="text-[14px] font-semibold text-[#1E293B] block mb-[8px]">Columns</span>
              
              {/* Column Fields List */}
              <div className="space-y-[8.75px]">
                {SELECTED_COLUMNS.slice(0, 10).map((column) => (
                  <ColumnFieldItem 
                    key={column.id} 
                    name={column.name} 
                    onRemove={() => {}}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Resize Handle */}
        <div className="w-[12px] bg-[#F1F5F9] cursor-col-resize hover:bg-[#E2E8F0] transition-colors" />

        {/* Right Panel - Select Module */}
        <div className="w-[260px] border-l border-[#E2E8F0] flex flex-col bg-white overflow-hidden">
          {/* Module Header */}
          <div className="px-[12px] py-[12px] border-b border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-[8px]">
              <span className="text-[13px] font-medium text-[#64748B]">Select Module</span>
              <button className="text-[13px] font-medium text-[#2563EB] hover:underline">Edit</button>
            </div>
            
            {/* Module Dropdown */}
            <button className="w-full h-[32px] px-[10px] flex items-center justify-between border border-[#E2E8F0] rounded-[4px] bg-white hover:bg-[#F8FAFC]">
              <span className="text-[13px] font-normal text-[#1E293B]">{selectedModule}</span>
              <IconChevronDown className="w-[14px] h-[14px] text-[#64748B]" />
            </button>
          </div>

          {/* Search Fields */}
          <div className="px-[12px] py-[12px]">
            <div className="relative">
              <IconSearch className="absolute left-[10.5px] top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search fields"
                value={moduleSearch}
                onChange={(e) => setModuleSearch(e.target.value)}
                className="w-full h-[34px] pl-[36px] pr-[10px] border border-[#E2E8F0] rounded-[4px] text-[13px] font-normal text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#94A3B8] bg-white"
              />
            </div>
          </div>

          {/* Fields List */}
          <div className="flex-1 overflow-y-auto px-[12px] pb-[12px]">
            {/* Default Fields */}
            <div className="mb-[14px]">
              <span className="text-[14px] font-semibold text-[#1E293B] block mb-[7px]">Default</span>
              <div className="space-y-[1px]">
                {DEFAULT_FIELDS.slice(0, 10).map((field) => (
                  <ModuleFieldItem key={field.id} name={field.name} />
                ))}
              </div>
            </div>

            {/* Product Category - shows the category the product belongs to (parent or sub) */}
            <ExpandableSection 
              title="Product Category" 
              isExpanded={expandedProductCategory}
              onToggle={() => setExpandedProductCategory(!expandedProductCategory)}
            >
              {PRODUCT_CATEGORY_FIELDS.map((field) => (
                <ModuleFieldItem key={field.id} name={field.name} />
              ))}
            </ExpandableSection>

            {/* Location */}
            <div className="mt-[7px]">
              <ExpandableSection 
                title="Location" 
                isExpanded={expandedLocation}
                onToggle={() => setExpandedLocation(!expandedLocation)}
              >
                {LOCATION_FIELDS.map((field) => (
                  <ModuleFieldItem key={field.id} name={field.name} />
                ))}
              </ExpandableSection>
            </div>

            {/* More default fields */}
            <div className="mt-[7px] space-y-[1px]">
              <ModuleFieldItem name="Created At" />
              <ModuleFieldItem name="Updated At" />
            </div>

            {/* Custom Fields */}
            <div className="mt-[14px]">
              <span className="text-[14px] font-semibold text-[#1E293B] block mb-[7px]">Custom</span>
              <div className="space-y-[1px]">
                {CUSTOM_FIELDS.map((field) => (
                  <ModuleFieldItem key={field.id} name={field.name} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
