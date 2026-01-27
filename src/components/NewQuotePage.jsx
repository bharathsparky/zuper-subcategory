import React, { useState } from 'react';
import { 
  IconChevronDown, 
  IconChevronUp, 
  IconPlus, 
  IconDeviceFloppy,
  IconSend,
  IconSettings,
  IconBold,
  IconItalic,
  IconList,
  IconListNumbers,
  IconClearFormatting,
  IconTable,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconHighlight,
  IconChevronRight,
} from '@tabler/icons-react';

// Empty state illustrations
const PartsEmptyIcon = () => (
  <svg width="147" height="112" viewBox="0 0 147 112" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="73.5" cy="56" r="50" fill="#F1F5F9"/>
    <rect x="43" y="36" width="60" height="45" rx="4" fill="white" stroke="#CBD5E1" strokeWidth="2"/>
    <rect x="50" y="48" width="30" height="4" rx="2" fill="#CBD5E1"/>
    <rect x="50" y="58" width="40" height="4" rx="2" fill="#E2E8F0"/>
    <rect x="50" y="68" width="25" height="4" rx="2" fill="#E2E8F0"/>
    <circle cx="103" cy="76" r="18" fill="#E44A19" fillOpacity="0.1"/>
    <path d="M103 68V84M95 76H111" stroke="#E44A19" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const AttachmentEmptyIcon = () => (
  <svg width="119" height="112" viewBox="0 0 119 112" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="59.5" cy="56" r="50" fill="#F1F5F9"/>
    <rect x="34" y="26" width="50" height="65" rx="4" fill="white" stroke="#CBD5E1" strokeWidth="2"/>
    <rect x="42" y="40" width="25" height="3" rx="1.5" fill="#CBD5E1"/>
    <rect x="42" y="48" width="35" height="3" rx="1.5" fill="#E2E8F0"/>
    <rect x="42" y="56" width="20" height="3" rx="1.5" fill="#E2E8F0"/>
    <rect x="42" y="68" width="30" height="3" rx="1.5" fill="#E2E8F0"/>
    <rect x="42" y="76" width="25" height="3" rx="1.5" fill="#E2E8F0"/>
    <circle cx="84" cy="81" r="15" fill="#E2E8F0"/>
    <path d="M84 74V88M77 81H91" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

function NewQuotePage({ onBack, onSaveAndSend }) {
  const [isAddressExpanded, setIsAddressExpanded] = useState(false);
  const [isQuoteDetailsExpanded, setIsQuoteDetailsExpanded] = useState(true);
  const [isOtherDetailsExpanded, setIsOtherDetailsExpanded] = useState(true);
  const [isTestExpanded, setIsTestExpanded] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    prefix: '10000',
    quoteTitle: '',
    referenceNumber: '',
    quoteDate: '01/27/2026',
    expiryDate: '01/28/2026',
    quoteTemplate: 'Estimate - 1',
    tradeType: '',
    assignTo: null,
    tags: '',
    description: '',
  });

  // Sample users for assignment (single select)
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  
  const availableUsers = [
    { id: 1, name: 'Marcus Chen', initials: 'MC', team: 'Seattle', avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: 2, name: 'Olivia Rodriguez', initials: 'OR', team: 'Seattle', avatar: 'https://i.pravatar.cc/150?img=5' },
    { id: 3, name: 'Ethan Nakamura', initials: 'EN', team: 'Seattle', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: 4, name: 'Sophia Patel', initials: 'SP', team: 'Seattle', avatar: 'https://i.pravatar.cc/150?img=9' },
    { id: 5, name: 'Liam O\'Connor', initials: 'LO', team: 'Seattle', avatar: 'https://i.pravatar.cc/150?img=8' },
    { id: 6, name: 'Emma Thompson', initials: 'ET', team: 'Seattle', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 7, name: 'Noah Williams', initials: 'NW', team: 'Seattle', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 8, name: 'Ava Martinez', initials: 'AM', team: 'Seattle', avatar: 'https://i.pravatar.cc/150?img=10' },
    { id: 9, name: 'Jackson Lee', initials: 'JL', team: 'Seattle', avatar: 'https://i.pravatar.cc/150?img=7' },
    { id: 10, name: 'Isabella Kim', initials: 'IK', team: 'Seattle', avatar: 'https://i.pravatar.cc/150?img=4' },
  ];

  const filteredUsers = availableUsers.filter(user => 
    user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    user.team.toLowerCase().includes(userSearchQuery.toLowerCase())
  );

  const selectUser = (user) => {
    setFormData({
      ...formData,
      assignTo: user
    });
    setAssignModalOpen(false);
    setUserSearchQuery('');
  };

  const clearAssignee = () => {
    setFormData({
      ...formData,
      assignTo: null
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC]">
      {/* Breadcrumb Header */}
      <div className="h-[49px] bg-white border-b border-[#E2E8F0] flex items-center justify-between px-[21px]">
        <div className="flex items-center gap-[14px]">
          <button 
            onClick={onBack}
            className="text-[14px] text-[#64748B] hover:text-[#334155] transition-colors"
          >
            Quotes
          </button>
          <IconChevronRight size={16} stroke={1.5} className="text-[#94A3B8]" />
          <span className="text-[14px] font-medium text-[#1E293B]">New Quote</span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-[10px]">
          <button className="h-[32px] px-[15px] flex items-center gap-[7px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] hover:bg-[#F8FAFC] transition-colors">
            <IconDeviceFloppy size={16} stroke={1.5} />
            <span>Save as Draft</span>
          </button>
          <div className="flex">
            <button 
              onClick={onSaveAndSend}
              className="h-[32px] px-[14px] flex items-center gap-[7px] bg-[#E44A19] text-white rounded-l-[4px] text-[13px] font-medium hover:bg-[#D43D0F] transition-colors"
            >
              <IconSend size={13} stroke={2} />
              <span>Save & Send</span>
            </button>
            <button className="h-[32px] w-[28px] flex items-center justify-center bg-[#E44A19] text-white rounded-r-[4px] border-l border-[#D43D0F] hover:bg-[#D43D0F] transition-colors">
              <IconChevronDown size={13} stroke={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[1003px] py-[14px] px-[14px]">
          {/* Customer Information Section */}
          <div className="bg-white rounded-[4px] border border-[#E2E8F0] mb-[14px]">
            <div className="h-[42px] flex items-center px-[21px] border-b border-[#E2E8F0]">
              <h3 className="text-[14px] font-semibold text-[#1E293B]">Customer Information</h3>
            </div>
            <div className="p-[21px] grid grid-cols-3 gap-[21px]">
              <div>
                <label className="block text-[13px] text-[#64748B] mb-[8px]">Choose Organization</label>
                <input
                  type="text"
                  placeholder="Choose Organization"
                  className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#94A3B8] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6]"
                />
              </div>
              <div>
                <label className="block text-[13px] text-[#64748B] mb-[8px]">Choose Customer</label>
                <input
                  type="text"
                  placeholder="Click to Choose Customer"
                  className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#94A3B8] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6]"
                />
              </div>
              <div>
                <label className="block text-[13px] text-[#64748B] mb-[8px]">Choose Property</label>
                <input
                  type="text"
                  placeholder="Choose Property"
                  className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#94A3B8] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6]"
                />
              </div>
            </div>
          </div>

          {/* Association(s) Section */}
          <div className="bg-white rounded-[4px] border border-[#E2E8F0] mb-[14px]">
            <div className="h-[42px] flex items-center px-[21px] border-b border-[#E2E8F0]">
              <h3 className="text-[14px] font-semibold text-[#1E293B]">Association(s)</h3>
            </div>
            <div className="p-[21px]">
              <button className="h-[28px] px-[9px] flex items-center gap-[4px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#64748B] hover:bg-[#F8FAFC] transition-colors">
                <IconPlus size={14} stroke={2} />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Address Section (Collapsible) */}
          <div className="bg-white rounded-[4px] border border-[#E2E8F0] mb-[14px]">
            <button
              onClick={() => setIsAddressExpanded(!isAddressExpanded)}
              className="w-full h-[42px] flex items-center justify-between px-[21px]"
            >
              <h3 className="text-[14px] font-semibold text-[#1E293B]">Address</h3>
              {isAddressExpanded ? (
                <IconChevronUp size={16} stroke={2} className="text-[#64748B]" />
              ) : (
                <IconChevronDown size={16} stroke={2} className="text-[#64748B]" />
              )}
            </button>
            {isAddressExpanded && (
              <div className="p-[21px] border-t border-[#E2E8F0]">
                {/* Address fields would go here */}
                <p className="text-[13px] text-[#94A3B8]">Address fields...</p>
              </div>
            )}
          </div>

          {/* Quote Details Section (Collapsible) */}
          <div className="bg-white rounded-[4px] border border-[#E2E8F0] mb-[14px]">
            <button
              onClick={() => setIsQuoteDetailsExpanded(!isQuoteDetailsExpanded)}
              className="w-full h-[42px] flex items-center justify-between px-[21px]"
            >
              <h3 className="text-[14px] font-semibold text-[#1E293B]">Quote Details</h3>
              {isQuoteDetailsExpanded ? (
                <IconChevronUp size={16} stroke={2} className="text-[#64748B]" />
              ) : (
                <IconChevronDown size={16} stroke={2} className="text-[#64748B]" />
              )}
            </button>
            {isQuoteDetailsExpanded && (
              <div className="p-[21px] border-t border-[#E2E8F0]">
                {/* Row 1 */}
                <div className="grid grid-cols-3 gap-[21px] mb-[21px]">
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Prefix</label>
                    <input
                      type="text"
                      value={formData.prefix}
                      onChange={(e) => setFormData({...formData, prefix: e.target.value})}
                      className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Quote Title</label>
                    <input
                      type="text"
                      placeholder="Enter Quote Title"
                      value={formData.quoteTitle}
                      onChange={(e) => setFormData({...formData, quoteTitle: e.target.value})}
                      className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Reference Number</label>
                    <input
                      type="text"
                      placeholder="Enter Reference Number"
                      value={formData.referenceNumber}
                      onChange={(e) => setFormData({...formData, referenceNumber: e.target.value})}
                      className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6]"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-3 gap-[21px] mb-[21px]">
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">
                      Quote Date <span className="text-[#EF4444]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.quoteDate}
                      onChange={(e) => setFormData({...formData, quoteDate: e.target.value})}
                      className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">
                      Expiry Date <span className="text-[#EF4444]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                      className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">
                      Quote Template <span className="text-[#EF4444]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={formData.quoteTemplate}
                        onChange={(e) => setFormData({...formData, quoteTemplate: e.target.value})}
                        className="w-full h-[38px] px-[12px] pr-[32px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6] appearance-none bg-white"
                      >
                        <option value="Estimate - 1">Estimate - 1</option>
                        <option value="Estimate - 2">Estimate - 2</option>
                        <option value="Quote - 1">Quote - 1</option>
                      </select>
                      <IconChevronDown size={14} stroke={2} className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Trade Type & Assign To Row */}
                <div className="grid grid-cols-2 gap-[21px] mb-[21px]">
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Trade Type</label>
                    <div className="relative">
                      <select
                        value={formData.tradeType}
                        onChange={(e) => setFormData({...formData, tradeType: e.target.value})}
                        className="w-full h-[38px] px-[12px] pr-[32px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#94A3B8] outline-none focus:border-[#3B82F6] appearance-none bg-white"
                      >
                        <option value="">Choose Trade Type</option>
                        <option value="Roofing">Roofing</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Electrical">Electrical</option>
                      </select>
                      <IconChevronDown size={14} stroke={2} className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                    </div>
                  </div>
                  
                  {/* Quote Sold By */}
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">
                      Quote Sold By
                    </label>
                    <button
                      type="button"
                      onClick={() => setAssignModalOpen(true)}
                      className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] cursor-pointer flex items-center justify-between gap-[8px] hover:border-[#CBD5E1] transition-colors bg-white text-left"
                    >
                      {formData.assignTo ? (
                        <div className="flex items-center gap-[8px] flex-1">
                          <img 
                            src={formData.assignTo.avatar} 
                            alt={formData.assignTo.name}
                            className="w-[24px] h-[24px] rounded-full object-cover"
                          />
                          <span className="text-[13px] text-[#334155]">{formData.assignTo.name}</span>
                          <button 
                            onClick={(e) => { e.stopPropagation(); clearAssignee(); }}
                            className="ml-auto text-[#94A3B8] hover:text-[#64748B]"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="18" y1="6" x2="6" y2="18"/>
                              <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <span className="text-[13px] text-[#94A3B8]">Select a user</span>
                      )}
                      <IconChevronDown size={14} stroke={2} className="text-[#64748B] flex-shrink-0" />
                    </button>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-[21px]">
                  <label className="block text-[13px] text-[#64748B] mb-[8px]">Tags</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter Tags"
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                      className="w-full h-[38px] px-[12px] pr-[32px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6]"
                    />
                    <IconChevronDown size={14} stroke={2} className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-[13px] text-[#64748B] mb-[8px]">Description</label>
                  <div className="border border-[#E2E8F0] rounded-[4px] overflow-hidden">
                    <div className="h-[158px] p-[12px]">
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full h-full resize-none outline-none text-[13px] text-[#334155] placeholder-[#94A3B8]"
                        placeholder=""
                      />
                    </div>
                    {/* Rich Text Toolbar */}
                    <div className="h-[48px] border-t border-[#E2E8F0] flex items-center px-[7px] bg-white">
                      <div className="flex items-center">
                        <button className="w-[34px] h-[28px] flex items-center justify-center hover:bg-[#F1F5F9] rounded transition-colors">
                          <IconArrowBackUp size={18} stroke={1.5} className="text-[#64748B]" />
                        </button>
                        <button className="w-[34px] h-[28px] flex items-center justify-center hover:bg-[#F1F5F9] rounded transition-colors">
                          <IconArrowForwardUp size={18} stroke={1.5} className="text-[#64748B]" />
                        </button>
                      </div>
                      <div className="w-[1px] h-[20px] bg-[#E2E8F0] mx-[7px]" />
                      <div className="flex items-center">
                        <button className="w-[34px] h-[28px] flex items-center justify-center hover:bg-[#F1F5F9] rounded transition-colors">
                          <IconBold size={18} stroke={1.5} className="text-[#64748B]" />
                        </button>
                        <button className="w-[34px] h-[28px] flex items-center justify-center hover:bg-[#F1F5F9] rounded transition-colors">
                          <IconItalic size={18} stroke={1.5} className="text-[#64748B]" />
                        </button>
                        <button className="w-[50px] h-[28px] flex items-center justify-center hover:bg-[#F1F5F9] rounded transition-colors">
                          <IconHighlight size={18} stroke={1.5} className="text-[#64748B]" />
                          <IconChevronDown size={10} stroke={2} className="text-[#64748B] ml-[2px]" />
                        </button>
                        <button className="w-[34px] h-[28px] flex items-center justify-center hover:bg-[#F1F5F9] rounded transition-colors">
                          <IconList size={18} stroke={1.5} className="text-[#64748B]" />
                        </button>
                        <button className="w-[34px] h-[28px] flex items-center justify-center hover:bg-[#F1F5F9] rounded transition-colors">
                          <IconListNumbers size={18} stroke={1.5} className="text-[#64748B]" />
                        </button>
                      </div>
                      <div className="w-[1px] h-[20px] bg-[#E2E8F0] mx-[7px]" />
                      <div className="flex items-center">
                        <button className="w-[34px] h-[28px] flex items-center justify-center hover:bg-[#F1F5F9] rounded transition-colors">
                          <IconClearFormatting size={18} stroke={1.5} className="text-[#64748B]" />
                        </button>
                        <button className="h-[28px] px-[8px] flex items-center gap-[4px] hover:bg-[#F1F5F9] rounded transition-colors">
                          <span className="text-[12px] text-[#64748B]">Paragraph</span>
                          <IconChevronDown size={10} stroke={2} className="text-[#64748B]" />
                        </button>
                        <button className="w-[48px] h-[28px] flex items-center justify-center hover:bg-[#F1F5F9] rounded transition-colors">
                          <IconTable size={18} stroke={1.5} className="text-[#64748B]" />
                          <IconChevronDown size={10} stroke={2} className="text-[#64748B] ml-[2px]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Parts & Services Section */}
          <div className="bg-white rounded-[4px] border border-[#E2E8F0] mb-[14px]">
            <div className="h-[46px] flex items-center justify-between px-[21px] border-b border-[#E2E8F0]">
              <div className="flex items-center gap-[14px]">
                <h3 className="text-[14px] font-semibold text-[#1E293B]">Parts & Services</h3>
                <span className="w-[28px] h-[26px] flex items-center justify-center bg-[#F1F5F9] rounded-full text-[12px] font-medium text-[#64748B]">0</span>
              </div>
              <div className="flex items-center gap-[10px]">
                <div className="relative">
                  <select className="h-[32px] px-[10px] pr-[32px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#94A3B8] outline-none focus:border-[#3B82F6] appearance-none bg-white">
                    <option value="">Select Pricelist</option>
                  </select>
                  <IconChevronDown size={14} stroke={2} className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
                </div>
                <button className="w-[29px] h-[32px] flex items-center justify-center border border-[#E2E8F0] rounded-[4px] hover:bg-[#F8FAFC] transition-colors">
                  <IconSettings size={14} stroke={1.5} className="text-[#64748B]" />
                </button>
                <button className="h-[32px] px-[15px] flex items-center gap-[7px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#64748B] hover:bg-[#F8FAFC] transition-colors">
                  <IconPlus size={14} stroke={2} />
                  <span>Add</span>
                </button>
              </div>
            </div>
            {/* Empty State */}
            <div className="py-[21px] flex flex-col items-center">
              <PartsEmptyIcon />
              <h4 className="mt-[21px] text-[16px] font-semibold text-[#1E293B]">Add Parts / Services</h4>
              <p className="mt-[4px] text-[13px] text-[#64748B]">Add any parts or services or any custom line item to this Quote</p>
            </div>
          </div>

          {/* Other Details Section */}
          <div className="bg-white rounded-[4px] border border-[#E2E8F0] mb-[14px]">
            <button
              onClick={() => setIsOtherDetailsExpanded(!isOtherDetailsExpanded)}
              className="w-full h-[49px] flex items-center px-[24px]"
            >
              <h3 className="text-[14px] font-semibold text-[#1E293B]">Other Details</h3>
            </button>
            {isOtherDetailsExpanded && (
              <div className="px-[24px] pb-[24px]">
                {/* Row 1 */}
                <div className="grid grid-cols-3 gap-[21px] mb-[21px]">
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Extra Amount</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for None</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for Number</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                </div>
                {/* Row 2 */}
                <div className="grid grid-cols-3 gap-[21px] mb-[21px]">
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for Mail</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for Phone No</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for Address</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                </div>
                {/* Row 3 */}
                <div className="grid grid-cols-3 gap-[21px]">
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for Regex</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Time - 30</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Date & Time - 45</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Test Section */}
          <div className="bg-white rounded-[4px] border border-[#E2E8F0] mb-[14px]">
            <button
              onClick={() => setIsTestExpanded(!isTestExpanded)}
              className="w-full h-[49px] flex items-center px-[24px]"
            >
              <h3 className="text-[14px] font-semibold text-[#1E293B]">Test</h3>
            </button>
            {isTestExpanded && (
              <div className="px-[24px] pb-[24px]">
                {/* Row 1 */}
                <div className="grid grid-cols-3 gap-[21px] mb-[21px]">
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Multi Selection</label>
                    <div className="flex flex-col gap-[10px]">
                      <label className="flex items-center gap-[7px] cursor-pointer">
                        <input type="checkbox" className="w-[14px] h-[14px] border-[#CBD5E1] rounded text-[#E44A19] focus:ring-[#E44A19]" />
                        <span className="text-[13px] text-[#334155]">option 1, 11</span>
                      </label>
                      <label className="flex items-center gap-[7px] cursor-pointer">
                        <input type="checkbox" className="w-[14px] h-[14px] border-[#CBD5E1] rounded text-[#E44A19] focus:ring-[#E44A19]" />
                        <span className="text-[13px] text-[#334155]">option 2, 22</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for None</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for Number</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                </div>
                {/* Row 2 */}
                <div className="grid grid-cols-3 gap-[21px] mb-[21px]">
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for Mail</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for Phone No</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for Address</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                </div>
                {/* Row 3 */}
                <div className="grid grid-cols-3 gap-[21px]">
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Single Line Text for Regex</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Time - 60</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#64748B] mb-[8px]">Date & Time - 5</label>
                    <input type="text" className="w-full h-[38px] px-[12px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] outline-none focus:border-[#3B82F6]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Attachments Section */}
          <div className="bg-white rounded-[4px] border border-[#E2E8F0]">
            <div className="h-[46px] flex items-center justify-between px-[21px] border-b border-[#E2E8F0]">
              <h3 className="text-[14px] font-semibold text-[#1E293B]">Attachments</h3>
              <button className="h-[32px] px-[15px] flex items-center gap-[7px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#64748B] hover:bg-[#F8FAFC] transition-colors">
                <IconPlus size={14} stroke={2} />
                <span>Add Attachments</span>
              </button>
            </div>
            {/* Empty State */}
            <div className="py-[21px] flex flex-col items-center">
              <AttachmentEmptyIcon />
              <h4 className="mt-[21px] text-[16px] font-semibold text-[#1E293B]">Add Attachments</h4>
              <p className="mt-[4px] text-[13px] text-[#64748B]">Add any relevant files and attachments to this Quote</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Assignment Side Sheet */}
      {assignModalOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => { setAssignModalOpen(false); setUserSearchQuery(''); }}
          />
          
          {/* Side Sheet */}
          <div className="fixed top-0 right-0 h-full w-[480px] bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
            {/* Header */}
            <div className="h-[60px] flex items-center justify-between px-[24px] border-b border-[#E2E8F0]">
              <h2 className="text-[18px] font-semibold text-[#1E293B]">Select User</h2>
              <button 
                onClick={() => { setAssignModalOpen(false); setUserSearchQuery(''); }}
                className="w-[36px] h-[36px] flex items-center justify-center rounded-full hover:bg-[#F1F5F9] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Search */}
            <div className="px-[24px] py-[16px] border-b border-[#E2E8F0]">
              <div className="relative">
                <svg className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[#94A3B8]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  className="w-full h-[44px] pl-[40px] pr-[12px] border border-[#E2E8F0] rounded-[6px] text-[14px] text-[#334155] placeholder-[#94A3B8] outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]"
                  autoFocus
                />
              </div>
            </div>

            {/* Users List */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-[24px] py-[10px] text-[12px] font-medium text-[#64748B] uppercase tracking-wide bg-[#F8FAFC] border-b border-[#E2E8F0]">
                Users ({filteredUsers.length})
              </div>
              {filteredUsers.map(user => (
                <div
                  key={user.id}
                  onClick={() => selectUser(user)}
                  className="flex items-center gap-[12px] px-[24px] py-[14px] cursor-pointer hover:bg-[#F8FAFC] border-b border-[#F1F5F9] transition-colors"
                >
                  {/* Avatar */}
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-[44px] h-[44px] rounded-full object-cover flex-shrink-0"
                  />
                  
                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-medium text-[#1E293B]">{user.name}</div>
                    <div className="text-[13px] text-[#64748B]">{user.team}</div>
                  </div>
                  
                  {/* Select Icon */}
                  <button className="w-[32px] h-[32px] flex items-center justify-center text-[#22C55E] hover:bg-[#F0FDF4] rounded transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="8.5" cy="7" r="4"/>
                      <line x1="20" y1="8" x2="20" y2="14"/>
                      <line x1="23" y1="11" x2="17" y2="11"/>
                    </svg>
                  </button>
                </div>
              ))}
              
              {filteredUsers.length === 0 && (
                <div className="py-[60px] text-center">
                  <div className="text-[14px] text-[#64748B]">No users found</div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="h-[68px] flex items-center justify-end gap-[12px] px-[24px] border-t border-[#E2E8F0] bg-white">
              <button 
                onClick={() => { setAssignModalOpen(false); setUserSearchQuery(''); }}
                className="h-[40px] px-[24px] border border-[#E2E8F0] rounded-[6px] text-[14px] font-medium text-[#64748B] bg-white hover:bg-[#F8FAFC] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NewQuotePage;
