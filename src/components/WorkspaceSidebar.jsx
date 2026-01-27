import React from 'react';

// Import the proper Zuper logo from Figma
import zuperLogo from '../assets/6718db1f1d1ce90fa5eb49c325d04010b62ca586.png';

// Exact icons from Figma in the correct order
const SIDEBAR_ICONS = {
  dashboard: '/assets/ff53d79ffe711fa695e68689108935503985b39a.svg',     // Bar chart
  home: '/assets/edfda2fe658cd06dc9e19a637bf308d02b37407c.svg',          // Clipboard/tasks
  jobs: '/assets/cb2a469e3a3141c6016f917a7efd93af2c0a7b20.svg',          // Wrench/tools
  briefcase: '/assets/82461995dcd739b9b9d26ec647d851985411984f.svg',     // Briefcase
  users: '/assets/b675dda18660dcdffa0e6fd71af0cca7ca1f09f5.svg',         // Users group
  calendar: '/assets/0226d0b44f615ad327ef4aba80ef9c16a907ce30.svg',      // Calendar
  clock: '/assets/7a73713e6658b58aaf05d7bcbac8837e7b416587.svg',         // Clock
  cart: '/assets/745ae9f0d97e782397683f51a12a8b5702b04d68.svg',          // Shopping cart
  tag: '/assets/47c16ff20cc87937757170e3791f8a3fa7489ae4.svg',           // Tag
  map: '/assets/9bbde7241f805f664bca9cebafc271a49705d761.svg',           // Map
  table: '/assets/b1a07fd1434bb585a253c64fe20609f13d5476cc.svg',         // Calculator/grid
  pieChart: '/assets/3cee8f55d167c7fe7ab30fe9d74062b60e93495f.svg',      // Pie chart
  workflow: '/assets/2a3ecbca85046a0001b6c2adc3b4f4222dd78038.svg',      // Workflow
  settings: '/assets/7d3028ae7e60ed9e08b2f08d2949cd683b395bc4.svg',      // Settings/gear
};

// Sidebar items in exact order from Figma (matching the screenshot exactly)
const sidebarItems = [
  { id: 'dashboard', icon: SIDEBAR_ICONS.dashboard, label: 'Dashboard' },
  { id: 'home', icon: SIDEBAR_ICONS.home, label: 'Home' },
  { id: 'jobs', icon: SIDEBAR_ICONS.jobs, label: 'Jobs' },
  { id: 'briefcase', icon: SIDEBAR_ICONS.briefcase, label: 'Briefcase' },
  { id: 'users', icon: SIDEBAR_ICONS.users, label: 'Users' },
  { id: 'calendar', icon: SIDEBAR_ICONS.calendar, label: 'Calendar' },
  { id: 'clock', icon: SIDEBAR_ICONS.clock, label: 'Timesheets' },
  { id: 'cart', icon: SIDEBAR_ICONS.cart, label: 'Cart' },
  { id: 'tag', icon: SIDEBAR_ICONS.tag, label: 'Parts & Services' },
  { id: 'map', icon: SIDEBAR_ICONS.map, label: 'Routes' },
  { id: 'table', icon: SIDEBAR_ICONS.table, label: 'Table' },
  { id: 'pieChart', icon: SIDEBAR_ICONS.pieChart, label: 'Analytics' },
  { id: 'workflow', icon: SIDEBAR_ICONS.workflow, label: 'Workflow' },
];

function WorkspaceSidebar({ onNavigateToSettings, onNavigateToJobDetails, onNavigateToWorkspace, onNavigateToReports, onNavigateToJobsListing, onNavigateToNewQuote, currentView }) {
  // Determine which item should be active based on current view
  const getActiveItemId = () => {
    if (currentView === 'jobs-listing') return 'jobs';
    if (currentView === 'job-details') return 'briefcase';
    if (currentView === 'reports') return 'pieChart';
    if (currentView === 'new-quote') return 'table';
    if (currentView === 'workspace' || currentView === 'product-details' || currentView === 'new-part-service') return 'tag';
    return 'tag';
  };
  
  const activeItemId = getActiveItemId();
  
  return (
    <aside className="w-[65px] min-w-[65px] bg-[#12344D] flex flex-col h-full">
      {/* Zuper Logo - height 70px, logo 35x35, centered */}
      <div className="h-[70px] flex items-center justify-center">
        <img 
          src={zuperLogo} 
          alt="Zuper" 
          className="w-[35px] h-[35px] object-contain"
        />
      </div>

      {/* Navigation Icons - each item is 45px tall with icon area */}
      <nav className="flex-1 flex flex-col items-center">
        {sidebarItems.map((item) => {
          const isActive = item.id === activeItemId;
          const handleClick = () => {
            if (item.id === 'jobs' && onNavigateToJobsListing) {
              onNavigateToJobsListing();
            } else if (item.id === 'briefcase' && onNavigateToJobDetails) {
              onNavigateToJobDetails();
            } else if (item.id === 'tag' && onNavigateToWorkspace) {
              onNavigateToWorkspace();
            } else if (item.id === 'pieChart' && onNavigateToReports) {
              onNavigateToReports();
            } else if (item.id === 'table' && onNavigateToNewQuote) {
              onNavigateToNewQuote();
            }
          };
          return (
            <div 
              key={item.id} 
              className="w-full h-[45px] flex items-center justify-center px-[13.5px]"
            >
              <button
                onClick={handleClick}
                className={`
                  w-[38px] h-[40px] flex items-center justify-center rounded transition-colors
                  ${isActive 
                    ? 'bg-[#E44A19]' 
                    : 'hover:bg-[#1E4A6D]'
                  }
                `}
                title={item.label}
              >
                <div className={`w-[22px] h-[24px] flex items-center justify-center ${isActive ? '' : 'opacity-60'}`}>
                  <img 
                    src={item.icon} 
                    alt={item.label}
                    className="w-full h-full object-contain"
                    style={{ 
                      filter: isActive ? 'brightness(0) invert(1)' : 'brightness(0) invert(1)'
                    }}
                  />
                </div>
              </button>
            </div>
          );
        })}
      </nav>

      {/* Settings at bottom */}
      <div className="pb-4 flex flex-col items-center">
        <div className="w-full h-[45px] flex items-center justify-center px-[13.5px]">
          <button
            className="w-[38px] h-[40px] flex items-center justify-center rounded hover:bg-[#1E4A6D] transition-colors"
            title="Settings"
            onClick={onNavigateToSettings}
          >
            <div className="w-[22px] h-[24px] flex items-center justify-center opacity-60">
              <img 
                src={SIDEBAR_ICONS.settings} 
                alt="Settings"
                className="w-full h-full object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default WorkspaceSidebar;
