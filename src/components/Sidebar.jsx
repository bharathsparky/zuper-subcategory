import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  HomeIcon,
  Squares2X2Icon,
  ClipboardDocumentListIcon,
  PhoneIcon,
  BriefcaseIcon,
  UsersIcon,
  BuildingOffice2Icon,
  CalendarIcon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
  ShoppingBagIcon,
  CircleStackIcon,
  ShieldCheckIcon,
  WalletIcon,
  Squares2X2Icon as AppsIcon,
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const moduleItems = [
  { id: 'projects', label: 'Projects', icon: ClipboardDocumentListIcon },
  { id: 'requests', label: 'Requests', icon: PhoneIcon },
  { id: 'jobs', label: 'Jobs', icon: BriefcaseIcon },
  { id: 'customers', label: 'Customers/Contacts', icon: UsersIcon },
  { id: 'properties', label: 'Properties', icon: BuildingOffice2Icon },
  { id: 'timesheets', label: 'Timesheets', icon: CalendarIcon },
  { id: 'parts', label: 'Parts & Services', icon: BuildingStorefrontIcon, active: true },
  { id: 'quotes', label: 'Quotes & Invoices', icon: DocumentTextIcon },
  { id: 'purchasing', label: 'Purchasing', icon: ShoppingBagIcon },
];

function Sidebar({ onNavigateToWorkspace, onNavigateToJobChecklist, onNavigateToSettings, onNavigateToNewQuote, currentView }) {
  const [modulesExpanded, setModulesExpanded] = useState(true);
  const [dataAdminExpanded, setDataAdminExpanded] = useState(false);

  return (
    <aside className="w-[240px] min-w-[240px] bg-[#F8FAFC] border-r border-[#E2E8F0] flex flex-col h-full text-[13px] font-medium">
      {/* Back to Workspace */}
      <div className="h-12 flex items-center px-5">
        <button 
          onClick={onNavigateToWorkspace}
          className="flex items-center font-semibold text-[#1E293B] hover:text-[#0F172A] transition-colors"
        >
          <ChevronLeftIcon className="w-4 h-4 text-[#64748B]" strokeWidth={2.5} />
          <span className="ml-1">Back to Workspace</span>
        </button>
      </div>

      {/* Search */}
      <div className="px-4 pb-4">
        <div className="relative bg-white border border-[#E2E8F0] rounded-md h-10 flex items-center">
          <MagnifyingGlassIcon className="absolute left-3 w-4 h-4 text-[#94A3B8]" strokeWidth={2.5} />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-full pl-10 pr-3 text-[13px] font-medium text-[#1E293B] placeholder-[#94A3B8] focus:outline-none bg-transparent rounded-md"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3">
        {/* Home */}
        <a href="#" className="flex items-center h-9 px-3 gap-3 text-[#64748B] hover:bg-white rounded-md">
          <HomeIcon className="w-5 h-5 text-[#64748B] flex-shrink-0" strokeWidth={2} />
          <span>Home</span>
        </a>

        {/* Modules Section */}
        <button 
          onClick={() => setModulesExpanded(!modulesExpanded)}
          className="w-full flex items-center justify-between h-9 px-3 text-[#64748B] hover:bg-white rounded-md"
        >
          <div className="flex items-center gap-3">
            <Squares2X2Icon className="w-5 h-5 text-[#64748B] flex-shrink-0" strokeWidth={2} />
            <span>Modules</span>
          </div>
          <ChevronUpIcon 
            className={`w-4 h-4 text-[#94A3B8] flex-shrink-0 transition-transform ${modulesExpanded ? '' : 'rotate-180'}`} 
            strokeWidth={2.5} 
          />
        </button>

        {/* Module Items */}
        {modulesExpanded && (
          <div className="mt-0.5">
            {moduleItems.map((item) => {
              const Icon = item.icon;
              const isJobsActive = item.id === 'jobs' && currentView === 'job-checklist';
              const isPartsActive = item.id === 'parts' && currentView === 'settings';
              
              const handleClick = (e) => {
                e.preventDefault();
                if (item.id === 'jobs' && onNavigateToJobChecklist) {
                  onNavigateToJobChecklist();
                } else if (item.id === 'parts' && onNavigateToSettings) {
                  onNavigateToSettings();
                } else if (item.id === 'quotes' && onNavigateToNewQuote) {
                  onNavigateToNewQuote();
                }
              };
              
              if (isJobsActive || isPartsActive) {
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={handleClick}
                    className="w-full flex items-center h-9 pl-9 pr-3 gap-3 bg-[#DBEAFE] text-[#2563EB] font-semibold rounded-r-md mr-3 text-left"
                  >
                    <Icon className="w-5 h-5 text-[#2563EB] flex-shrink-0" strokeWidth={2} />
                    <span>{item.label}</span>
                  </button>
                );
              }
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={handleClick}
                  className="w-full flex items-center h-9 pl-9 pr-3 gap-3 text-[#64748B] hover:bg-white rounded-md text-left"
                >
                  <Icon className="w-5 h-5 text-[#64748B] flex-shrink-0" strokeWidth={2} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Spacer */}
        <div className="h-4"></div>

        {/* Data Administration */}
        <button 
          onClick={() => setDataAdminExpanded(!dataAdminExpanded)}
          className="w-full flex items-center justify-between h-9 px-3 text-[#64748B] hover:bg-white rounded-md"
        >
          <div className="flex items-center gap-3">
            <CircleStackIcon className="w-5 h-5 text-[#64748B] flex-shrink-0" strokeWidth={2} />
            <span className="whitespace-nowrap">Data Administration</span>
          </div>
          <ChevronDownIcon 
            className={`w-4 h-4 text-[#94A3B8] flex-shrink-0 transition-transform ${dataAdminExpanded ? 'rotate-180' : ''}`} 
            strokeWidth={2.5} 
          />
        </button>

        {/* Security */}
        <a href="#" className="flex items-center h-9 px-3 gap-3 text-[#64748B] hover:bg-white rounded-md">
          <ShieldCheckIcon className="w-5 h-5 text-[#64748B] flex-shrink-0" strokeWidth={2} />
          <span>Security</span>
        </a>
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-2">
        {/* Zuper Pay */}
        <a href="#" className="flex items-center h-9 px-3 gap-3 text-[#64748B] hover:bg-white rounded-md">
          <WalletIcon className="w-5 h-5 text-[#64748B] flex-shrink-0" strokeWidth={2} />
          <span>Zuper Pay</span>
        </a>
        
        {/* App Store */}
        <a href="#" className="flex items-center h-9 px-3 gap-3 text-[#64748B] hover:bg-white rounded-md">
          <AppsIcon className="w-5 h-5 text-[#64748B] flex-shrink-0" strokeWidth={2} />
          <span>App Store</span>
        </a>
        
        {/* Support */}
        <a href="#" className="flex items-center h-9 px-3 gap-3 text-[#64748B] hover:bg-white rounded-md">
          <QuestionMarkCircleIcon className="w-5 h-5 text-[#64748B] flex-shrink-0" strokeWidth={2} />
          <span>Support</span>
        </a>

        {/* User Profile */}
        <div className="mt-2 pt-3 pb-2 border-t border-[#E2E8F0]">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#E2E8F0] flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-semibold text-[#64748B]">E</span>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#1E293B] truncate">Eric Taylor</div>
                <div className="text-[11px] font-normal text-[#64748B] truncate">shamilee.v@zuper.co</div>
              </div>
            </div>
            <button className="p-1.5 hover:bg-white rounded flex-shrink-0 ml-2">
              <ArrowRightOnRectangleIcon className="w-5 h-5 text-[#64748B]" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
