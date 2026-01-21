import React from 'react';
import { IconSearch, IconChevronDown, IconSpeakerphone, IconMessageCircle, IconBell } from '@tabler/icons-react';

// Company logo from Figma export - matching dimensions 43.59x30
const companyLogo = '/assets/65aedfd9b381d1d1d75cc9d1df14b2e921d61c7f.png';

function Header({ currentView }) {
  return (
    <header className="h-[48px] min-h-[48px] border-b border-[#E2E8F0] flex items-center px-5 bg-white">
      {/* Left section - Logo and New dropdown */}
      <div className="flex items-center gap-2">
        {/* Company Logo - 43.59x30 from Figma */}
        <div className="h-[30px] flex items-center">
          <img src={companyLogo} alt="Company Logo" className="h-full w-auto" />
        </div>
        
        {/* New dropdown - matching Figma 75.73x48 button area */}
        <button className="h-[48px] flex items-center gap-1 px-3 hover:bg-[#F1F5F9] transition-colors">
          <span className="text-[15px] font-semibold text-[#1E293B]">New</span>
          <IconChevronDown size={13} className="text-[#64748B]" stroke={2.5} />
        </button>
      </div>

      {/* Center section - Search bar (392x33 from Figma) */}
      <div className="flex-1 flex justify-center px-6">
        <div className="w-[392px] relative">
          <IconSearch size={17.5} className="absolute left-[10.5px] top-1/2 -translate-y-1/2 text-[#94A3B8]" stroke={1.5} />
          <input
            type="text"
            placeholder="Search"
            className="w-full h-[33px] pl-[36px] pr-3 text-[14px] text-[#1E293B] placeholder-[#94A3B8] border border-[#E2E8F0] rounded-md focus:outline-none focus:border-[#94A3B8] bg-white"
          />
        </div>
      </div>

      {/* Right section - Action buttons (40x40 each from Figma) */}
      <div className="flex items-center">
        {/* Broadcast/Megaphone icon */}
        <button className="w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-[#F1F5F9] transition-colors">
          <IconSpeakerphone size={24} className="text-[#64748B]" stroke={1.5} />
        </button>
        
        {/* Chat/Message icon */}
        <button className="w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-[#F1F5F9] transition-colors">
          <IconMessageCircle size={24} className="text-[#64748B]" stroke={1.5} />
        </button>
        
        {/* Bell/Notification icon */}
        <button className="w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-[#F1F5F9] transition-colors">
          <IconBell size={24} className="text-[#64748B]" stroke={1.5} />
        </button>
        
        {/* Profile avatar - 35x35 from Figma */}
        <div className="w-[40px] h-[40px] flex items-center justify-center">
          <div className="w-[35px] h-[35px] rounded-full bg-[#E2E8F0] flex items-center justify-center">
            <span className="text-[15px] font-semibold text-[#64748B]">E</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
