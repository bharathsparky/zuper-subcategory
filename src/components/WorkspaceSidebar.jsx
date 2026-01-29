import React, { useState, useRef, useEffect } from 'react';

// Import the proper Zuper logo from Figma
import zuperLogo from '../assets/6718db1f1d1ce90fa5eb49c325d04010b62ca586.png';

// Icons for cart submenu
import { IconUsers, IconClipboardList, IconShoppingCart } from '@tabler/icons-react';

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

// Cart submenu items
const CART_SUBMENU = [
  { id: 'vendors', label: 'Vendors', icon: IconUsers },
  { id: 'material-requests', label: 'Material Requests', icon: IconClipboardList, badge: 'Beta' },
  { id: 'purchase-orders', label: 'Purchase Orders', icon: IconShoppingCart, badge: 'Beta' },
];

function WorkspaceSidebar({ onNavigateToSettings, onNavigateToJobDetails, onNavigateToWorkspace, onNavigateToReports, onNavigateToJobsListing, onNavigateToNewQuote, onNavigateToVendorDetails, currentView }) {
  const [cartMenuOpen, setCartMenuOpen] = useState(false);
  const cartMenuRef = useRef(null);
  const cartButtonRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartMenuRef.current && 
        !cartMenuRef.current.contains(event.target) &&
        cartButtonRef.current &&
        !cartButtonRef.current.contains(event.target)
      ) {
        setCartMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Determine which item should be active based on current view
  const getActiveItemId = () => {
    if (currentView === 'jobs-listing') return 'jobs';
    if (currentView === 'job-details') return 'briefcase';
    if (currentView === 'reports') return 'pieChart';
    if (currentView === 'new-quote') return 'table';
    if (currentView === 'vendor-details') return 'cart';
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
          const isActive = item.id === activeItemId || (item.id === 'cart' && cartMenuOpen);
          const handleClick = () => {
            if (item.id === 'cart') {
              setCartMenuOpen(!cartMenuOpen);
              return;
            }
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
              className="w-full h-[45px] flex items-center justify-center px-[13.5px] relative"
            >
              <button
                ref={item.id === 'cart' ? cartButtonRef : null}
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
              
              {/* Cart Flyout Menu */}
              {item.id === 'cart' && cartMenuOpen && (
                <div 
                  ref={cartMenuRef}
                  className="absolute left-full top-0 ml-0 bg-[#12344D] rounded-r-lg shadow-xl z-50 py-2 min-w-[220px]"
                >
                  {CART_SUBMENU.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => {
                        setCartMenuOpen(false);
                        if (subItem.id === 'vendors' && onNavigateToVendorDetails) {
                          onNavigateToVendorDetails();
                        }
                      }}
                      className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#1E4A6D] transition-colors text-left"
                    >
                      <subItem.icon size={22} className="text-[#94A3B8]" stroke={1.5} />
                      <span className="text-[14px] text-white font-medium">{subItem.label}</span>
                      {subItem.badge && (
                        <span className="ml-auto px-2 py-0.5 bg-[#2563EB] text-white text-[11px] font-semibold rounded">
                          {subItem.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
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
