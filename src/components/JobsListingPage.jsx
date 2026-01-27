import React, { useState } from 'react';
import {
  IconSearch,
  IconFilter,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconPlus,
  IconRefresh,
  IconColumns,
  IconList,
  IconLayoutGrid,
  IconDotsVertical,
  IconCalendar,
  IconUpload,
  IconExternalLink,
  IconMessage,
} from '@tabler/icons-react';

// Sample jobs data
const JOBS_DATA = [
  {
    id: 'PT3789',
    hasAlert: true,
    title: 'John abc',
    contact: 'John abc',
    usersAssigned: 'No Users / Teams Assigned',
    category: 'IT Services',
    serviceAddress: '17 street ave, Metuchen...',
    status: 'Scheduled',
  },
  {
    id: 'PT3788',
    hasAlert: true,
    title: 'Test john abc',
    contact: 'John abc',
    usersAssigned: 'No Users / Teams Assigned',
    category: 'Repair',
    serviceAddress: '86 -ave st, Metuchen...',
    status: 'Scheduled',
  },
  {
    id: 'PT3787',
    hasAlert: true,
    title: 'Shane Carey',
    contact: 'Shane Carey',
    usersAssigned: 'No Users / Teams Assigned',
    category: 'Roofing',
    serviceAddress: '2226 North 1960 We...',
    status: 'Scheduled',
  },
  {
    id: 'PT3786',
    hasAlert: false,
    hasComment: true,
    commentCount: 1,
    title: '140 Avenue South',
    contact: 'John Tracy',
    usersAssigned: 'No Users / Teams Assigned',
    category: 'Repair',
    serviceAddress: 'Sammamish High Sc...',
    status: 'Scheduled',
  },
  {
    id: 'PT3785',
    hasAlert: false,
    title: '418 98th Avenue NE',
    contact: 'Admin abc',
    usersAssigned: 'No Users / Teams Assigned',
    category: 'Repair',
    serviceAddress: '418 98th Avenue Nor...',
    status: 'Scheduled',
  },
  {
    id: 'PT3784',
    hasAlert: false,
    title: '10620 NE 8th Street',
    contact: 'Admin abc',
    usersAssigned: 'No Users / Teams Assigned',
    category: 'Repair',
    serviceAddress: '10620 Northeast 8th ...',
    status: 'Scheduled',
  },
  {
    id: 'PT3783',
    hasAlert: false,
    title: '9750 Northeast 26th...',
    contact: 'Admin abc',
    usersAssigned: 'No Users / Teams Assigned',
    category: 'Repair',
    serviceAddress: '9750 Northeast 26th ...',
    status: 'Scheduled',
  },
  {
    id: 'PT3782',
    hasAlert: false,
    title: '8829 Southeast 36th...',
    contact: 'Admin abc',
    usersAssigned: 'No Users / Teams Assigned',
    category: 'Repair',
    serviceAddress: '8829 Southeast 36th...',
    status: 'Scheduled',
  },
  {
    id: 'PT3781',
    hasAlert: false,
    title: 'Demo Job',
    contact: 'Admin abc',
    usersAssigned: 'No Users / Teams Assigned',
    category: 'Repair',
    serviceAddress: 'Sammamish High Sc...',
    status: 'Scheduled',
  },
  {
    id: 'PT3780',
    hasAlert: false,
    title: 'Demo Job',
    contact: 'Admin abc',
    usersAssigned: 'No Users / Teams Assigned',
    category: 'Repair',
    serviceAddress: 'Sammamish High Sc...',
    status: 'Scheduled',
  },
  {
    id: 'PT3779',
    hasAlert: false,
    title: 'Demo Job',
    contact: 'Admin abc',
    usersAssigned: 'No Users / Teams Assigned',
    category: 'Repair',
    serviceAddress: 'Sammamish High Sc...',
    status: 'Scheduled',
  },
  {
    id: 'PT3778',
    hasAlert: false,
    title: 'Demo Job',
    contact: 'Admin abc',
    usersAssigned: 'No Users / Teams Assigned',
    category: 'Repair',
    serviceAddress: 'Sammamish High Sc...',
    status: 'Scheduled',
  },
  {
    id: 'PT3777',
    hasAlert: false,
    title: 'Demo Job',
    contact: 'Admin abc',
    usersAssigned: 'No Users / Teams Assigned',
    category: 'Repair',
    serviceAddress: 'Sammamish High Sc...',
    status: 'Scheduled',
  },
  {
    id: 'PT3776',
    hasAlert: false,
    title: 'Demo Job',
    contact: 'Admin abc',
    usersAssigned: 'No Users / Teams Assigned',
    category: 'Repair',
    serviceAddress: 'Sammamish High Sc...',
    status: 'Scheduled',
  },
  {
    id: 'PT3775',
    hasAlert: false,
    title: 'Demo Job',
    contact: 'Admin abc',
    usersAssigned: 'No Users / Teams Assigned',
    category: 'Repair',
    serviceAddress: 'Sammamish High Sc...',
    status: 'Scheduled',
  },
];

// Status badge component
function StatusBadge({ status }) {
  const getStatusStyles = () => {
    switch (status) {
      case 'Scheduled':
        return 'bg-[#10B981] text-white';
      case 'In Progress':
        return 'bg-[#3B82F6] text-white';
      case 'Completed':
        return 'bg-[#6B7280] text-white';
      case 'Cancelled':
        return 'bg-[#EF4444] text-white';
      default:
        return 'bg-[#10B981] text-white';
    }
  };

  return (
    <span className={`px-[10px] py-[4px] text-[12px] font-medium rounded-[4px] ${getStatusStyles()}`}>
      {status}
    </span>
  );
}

// Filter button component
function FilterButton({ children, hasDropdown = false, isActive = false }) {
  return (
    <button
      className={`h-[36px] px-[12px] flex items-center gap-[6px] border rounded-[6px] text-[13px] font-medium transition-colors ${
        isActive
          ? 'border-[#E2E8F0] bg-white text-[#334155]'
          : 'border-[#E2E8F0] bg-white text-[#64748B] hover:bg-[#F8FAFC]'
      }`}
    >
      {children}
      {hasDropdown && <IconChevronDown size={14} stroke={2} className="text-[#94A3B8]" />}
    </button>
  );
}

function JobsListingPage({ onJobClick }) {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  const totalJobs = 1508;
  const totalPages = 101;

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedJobs(JOBS_DATA.map(job => job.id));
    } else {
      setSelectedJobs([]);
    }
  };

  const handleSelectJob = (jobId) => {
    if (selectedJobs.includes(jobId)) {
      setSelectedJobs(selectedJobs.filter(id => id !== jobId));
    } else {
      setSelectedJobs([...selectedJobs, jobId]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Page Header */}
      <div className="px-[24px] py-[16px] border-b border-[#E2E8F0]">
        <div className="flex items-center justify-between">
          {/* Title with count */}
          <div className="flex items-center gap-[10px]">
            <h1 className="text-[22px] font-semibold text-[#1E293B]">Jobs</h1>
            <span className="px-[8px] py-[2px] bg-[#DBEAFE] text-[#2563EB] text-[12px] font-medium rounded-[4px]">
              {totalJobs}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-[10px]">
            <button className="h-[40px] px-[16px] flex items-center gap-[8px] border border-[#E2E8F0] rounded-[6px] text-[14px] font-medium text-[#334155] bg-white hover:bg-[#F8FAFC] transition-colors">
              <IconRefresh size={18} stroke={1.5} className="text-[#64748B]" />
              Manage Recurring Jobs
            </button>
            <button className="h-[40px] px-[16px] flex items-center gap-[8px] bg-[#10B981] rounded-[6px] text-[14px] font-medium text-white hover:bg-[#059669] transition-colors">
              <IconPlus size={18} stroke={2} />
              New Job
            </button>
          </div>
        </div>
      </div>

      {/* Filters Row */}
      <div className="px-[24px] py-[12px] border-b border-[#E2E8F0] flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          {/* All Jobs Dropdown */}
          <button className="h-[36px] px-[12px] flex items-center gap-[6px] border border-[#E2E8F0] rounded-[6px] text-[13px] font-medium text-[#334155] bg-white hover:bg-[#F8FAFC]">
            All Jobs
            <IconChevronDown size={14} stroke={2} className="text-[#94A3B8]" />
          </button>

          {/* Filter Button */}
          <button className="h-[36px] px-[12px] flex items-center gap-[6px] border border-[#E2E8F0] rounded-[6px] text-[13px] font-medium text-[#64748B] bg-white hover:bg-[#F8FAFC]">
            <IconFilter size={16} stroke={1.5} />
            Filter
          </button>

          {/* Job Category */}
          <FilterButton hasDropdown>
            <IconLayoutGrid size={16} stroke={1.5} className="text-[#64748B]" />
            Job Category
          </FilterButton>

          {/* Scheduled Date Range */}
          <FilterButton hasDropdown>
            <IconCalendar size={16} stroke={1.5} className="text-[#64748B]" />
            Scheduled Date Ra...
          </FilterButton>

          {/* Job Priority */}
          <FilterButton hasDropdown>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#64748B]">
              <path d="M8 2L10 6H14L11 9L12 14L8 11L4 14L5 9L2 6H6L8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Job Priority
          </FilterButton>
        </div>

        <div className="flex items-center gap-[10px]">
          {/* Search */}
          <div className="w-[180px] h-[36px] flex items-center gap-[8px] px-[10px] border border-[#E2E8F0] rounded-[6px] bg-white">
            <IconSearch size={16} stroke={1.5} className="text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 text-[13px] text-[#334155] placeholder-[#94A3B8] outline-none bg-transparent"
            />
          </div>

          {/* Columns */}
          <button className="h-[36px] px-[12px] flex items-center gap-[6px] border border-[#E2E8F0] rounded-[6px] text-[13px] font-medium text-[#64748B] bg-white hover:bg-[#F8FAFC]">
            <IconColumns size={16} stroke={1.5} />
            Columns
          </button>

          {/* View Toggle */}
          <div className="flex items-center border border-[#E2E8F0] rounded-[6px] overflow-hidden">
            <button
              onClick={() => setViewMode('list')}
              className={`w-[36px] h-[34px] flex items-center justify-center transition-colors ${
                viewMode === 'list' ? 'bg-[#F1F5F9] text-[#334155]' : 'bg-white text-[#94A3B8] hover:bg-[#F8FAFC]'
              }`}
            >
              <IconList size={18} stroke={1.5} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`w-[36px] h-[34px] flex items-center justify-center border-l border-[#E2E8F0] transition-colors ${
                viewMode === 'grid' ? 'bg-[#F1F5F9] text-[#334155]' : 'bg-white text-[#94A3B8] hover:bg-[#F8FAFC]'
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="5" height="5" rx="1" />
                <rect x="11" y="2" width="5" height="5" rx="1" />
                <rect x="2" y="11" width="5" height="5" rx="1" />
                <rect x="11" y="11" width="5" height="5" rx="1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="bg-white sticky top-0 z-10">
            <tr className="border-b border-[#E2E8F0]">
              <th className="w-[48px] text-left px-[16px] py-[12px]">
                <input
                  type="checkbox"
                  checked={selectedJobs.length === JOBS_DATA.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-[16px] h-[16px] rounded border-[#CBD5E1] text-[#10B981] focus:ring-[#10B981] cursor-pointer"
                />
              </th>
              <th className="text-left px-[12px] py-[12px]">
                <div className="flex items-center gap-[4px] text-[12px] font-medium text-[#64748B]">
                  Work Order Nu...
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#94A3B8]">
                    <path d="M6 2.5V9.5M6 2.5L3 5.5M6 2.5L9 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </th>
              <th className="text-left px-[12px] py-[12px]">
                <div className="flex items-center gap-[4px] text-[12px] font-medium text-[#64748B]">
                  Job Title
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#94A3B8]">
                    <path d="M6 2.5V9.5M6 2.5L3 5.5M6 2.5L9 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </th>
              <th className="text-left px-[12px] py-[12px] text-[12px] font-medium text-[#64748B]">
                Contact
              </th>
              <th className="text-left px-[12px] py-[12px] text-[12px] font-medium text-[#64748B]">
                Users / Teams Assi...
              </th>
              <th className="text-left px-[12px] py-[12px] text-[12px] font-medium text-[#64748B]">
                Category
              </th>
              <th className="text-left px-[12px] py-[12px] text-[12px] font-medium text-[#64748B]">
                Service Address
              </th>
              <th className="text-left px-[12px] py-[12px] text-[12px] font-medium text-[#64748B]">
                Status
              </th>
              <th className="w-[48px]"></th>
            </tr>
          </thead>
          <tbody>
            {JOBS_DATA.map((job) => (
              <tr
                key={job.id}
                className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] cursor-pointer transition-colors"
                onClick={() => onJobClick && onJobClick(job)}
              >
                <td className="px-[16px] py-[14px]" onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedJobs.includes(job.id)}
                    onChange={() => handleSelectJob(job.id)}
                    className="w-[16px] h-[16px] rounded border-[#CBD5E1] text-[#10B981] focus:ring-[#10B981] cursor-pointer"
                  />
                </td>
                <td className="px-[12px] py-[14px]">
                  <div className="flex items-center gap-[8px]">
                    <span className="text-[14px] text-[#1E293B]">{job.id}</span>
                    {job.hasAlert && (
                      <span className="text-[#F97316]">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M8 5V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          <circle cx="8" cy="11" r="0.5" fill="currentColor"/>
                        </svg>
                      </span>
                    )}
                    <IconExternalLink size={14} stroke={1.5} className="text-[#94A3B8]" />
                    {job.hasComment && (
                      <div className="flex items-center gap-[2px] text-[#94A3B8]">
                        <IconMessage size={14} stroke={1.5} />
                        <span className="text-[11px]">{job.commentCount}</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-[12px] py-[14px] text-[14px] text-[#1E293B]">
                  {job.title}
                </td>
                <td className="px-[12px] py-[14px] text-[14px] text-[#1E293B]">
                  {job.contact}
                </td>
                <td className="px-[12px] py-[14px] text-[14px] text-[#94A3B8]">
                  {job.usersAssigned}
                </td>
                <td className="px-[12px] py-[14px] text-[14px] text-[#1E293B]">
                  {job.category}
                </td>
                <td className="px-[12px] py-[14px] text-[14px] text-[#1E293B]">
                  {job.serviceAddress}
                </td>
                <td className="px-[12px] py-[14px]">
                  <StatusBadge status={job.status} />
                </td>
                <td className="px-[12px] py-[14px]" onClick={(e) => e.stopPropagation()}>
                  <button className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#F1F5F9] text-[#64748B]">
                    <IconDotsVertical size={16} stroke={2} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-[24px] py-[12px] border-t border-[#E2E8F0] flex items-center justify-between bg-white">
        <div className="flex items-center gap-[8px]">
          <span className="text-[13px] text-[#64748B]">Rows per page</span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="h-[32px] px-[8px] border border-[#E2E8F0] rounded-[4px] text-[13px] text-[#334155] bg-white cursor-pointer outline-none focus:border-[#3B82F6]"
          >
            <option value={15}>15</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="flex items-center gap-[16px]">
          <span className="text-[13px] text-[#64748B]">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-[4px]">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#F1F5F9] text-[#64748B] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <IconChevronsLeft size={16} stroke={2} />
            </button>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#F1F5F9] text-[#64748B] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <IconChevronLeft size={16} stroke={2} />
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#F1F5F9] text-[#64748B] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <IconChevronRight size={16} stroke={2} />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#F1F5F9] text-[#64748B] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <IconChevronsRight size={16} stroke={2} />
            </button>
          </div>
          <button className="h-[32px] px-[12px] flex items-center gap-[6px] border border-[#E2E8F0] rounded-[4px] text-[13px] font-medium text-[#64748B] bg-white hover:bg-[#F8FAFC]">
            <IconUpload size={14} stroke={2} />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobsListingPage;
