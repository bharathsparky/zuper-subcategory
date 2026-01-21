import React, { Fragment } from 'react';
import { Dialog, Transition, Listbox } from '@headlessui/react';
import { IconX, IconSearch, IconChevronDown, IconCheck } from '@tabler/icons-react';

// ============================================
// Button Component
// ============================================

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-[#E44A19] text-white hover:bg-[#D03D10] focus:ring-[#E44A19] disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'bg-white text-[#1E293B] border border-[#E2E8F0] hover:bg-[#F8FAFC] focus:ring-[#94A3B8]',
    ghost: 'text-[#64748B] hover:bg-[#F1F5F9] focus:ring-[#94A3B8]',
    danger: 'bg-[#DC2626] text-white hover:bg-[#B91C1C] focus:ring-[#DC2626]',
  };
  
  const sizes = {
    sm: 'h-[32px] px-3 text-[13px]',
    md: 'h-[36px] px-4 text-[13px]',
    lg: 'h-[40px] px-5 text-[14px]',
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

// ============================================
// Input Component
// ============================================

export function Input({ 
  className = '', 
  size = 'md',
  ...props 
}) {
  const sizes = {
    sm: 'h-[32px] px-3 text-[13px]',
    md: 'h-[40px] px-4 text-[14px]',
    lg: 'h-[44px] px-4 text-[14px]',
  };

  return (
    <input
      className={`
        w-full border border-[#E2E8F0] rounded-lg text-[#1E293B] placeholder-[#94A3B8]
        bg-white focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]
        ${sizes[size]} ${className}
      `}
      {...props}
    />
  );
}

// ============================================
// Textarea Component
// ============================================

export function Textarea({ 
  className = '', 
  rows = 3,
  ...props 
}) {
  return (
    <textarea
      rows={rows}
      className={`
        w-full px-4 py-3 border border-[#E2E8F0] rounded-lg text-[14px] text-[#1E293B] 
        placeholder-[#94A3B8] bg-white focus:outline-none focus:border-[#3B82F6] 
        focus:ring-1 focus:ring-[#3B82F6] resize-none
        ${className}
      `}
      {...props}
    />
  );
}

// ============================================
// Label Component
// ============================================

export function Label({ 
  children, 
  required = false, 
  className = '',
  ...props 
}) {
  return (
    <label 
      className={`text-[13px] font-medium text-[#475569] ${className}`}
      {...props}
    >
      {children}
      {required && <span className="text-[#DC2626] ml-0.5">*</span>}
    </label>
  );
}

// ============================================
// SearchInput Component
// ============================================

export function SearchInput({ 
  className = '', 
  placeholder = 'Search...',
  icon, // Destructure to prevent passing to input
  value,
  onChange,
  ...props 
}) {
  return (
    <div className={`relative ${className}`}>
      <IconSearch 
        size={15} 
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" 
        stroke={2} 
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-[32px] pl-9 pr-3 text-[13px] text-[#1E293B] placeholder-[#94A3B8] border border-[#E2E8F0] rounded-lg bg-white focus:outline-none focus:border-[#94A3B8]"
        {...props}
      />
    </div>
  );
}

// ============================================
// Modal Component
// ============================================

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  maxWidth = 'max-w-[480px]'
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        {/* Modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`w-full ${maxWidth} bg-white rounded-xl shadow-xl`}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0]">
                  <Dialog.Title className="text-[16px] font-semibold text-[#1E293B]">
                    {title}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="p-1 text-[#94A3B8] hover:text-[#64748B] hover:bg-[#F1F5F9] rounded transition-colors"
                  >
                    <IconX size={18} stroke={2} />
                  </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5">
                  {children}
                </div>

                {/* Footer */}
                {footer && (
                  <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC] rounded-b-xl">
                    {footer}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

// ============================================
// Dropdown Component (for page size etc.)
// ============================================

export function Dropdown({ 
  value, 
  options = [], 
  onChange,
  className = ''
}) {
  const selected = options.find(o => o.value === value) || options[0];
  
  return (
    <Listbox value={value} onChange={onChange}>
      <div className={`relative ${className}`}>
        <Listbox.Button className="h-[26px] min-w-[50px] px-2 bg-white border border-[#E2E8F0] rounded text-[12px] text-[#1E293B] flex items-center gap-1 hover:border-[#CBD5E1] transition-colors">
          <span>{selected?.label || value}</span>
          <IconChevronDown size={12} className="text-[#94A3B8]" stroke={2.5} />
        </Listbox.Button>
        
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute bottom-full mb-1 w-full bg-white border border-[#E2E8F0] rounded shadow-lg z-10 py-1">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ active, selected }) => `
                  px-2 py-1.5 cursor-pointer text-[12px] flex items-center justify-between
                  ${active ? 'bg-[#F8FAFC]' : ''}
                  ${selected ? 'text-[#1E293B] font-medium' : 'text-[#475569]'}
                `}
              >
                {({ selected }) => (
                  <>
                    <span>{option.label}</span>
                    {selected && <IconCheck size={12} className="text-[#2563EB]" stroke={2.5} />}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
