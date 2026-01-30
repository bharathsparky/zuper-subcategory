import React, { useState } from 'react';

// SVG Icons from Figma assets
const IconCall = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 4H9L11 9L8.5 10.5C9.571 12.671 11.329 14.429 13.5 15.5L15 13L20 15V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21C14.0993 20.763 10.4202 19.1065 7.65683 16.3432C4.8935 13.5798 3.23705 9.90074 3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4Z" stroke="#E44A19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconMail = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7C3 6.46957 3.21071 5.96086 3.58579 5.58579C3.96086 5.21071 4.46957 5 5 5H19C19.5304 5 20.0391 5.21071 20.4142 5.58579C20.7893 5.96086 21 6.46957 21 7V17C21 17.5304 20.7893 18.0391 20.4142 18.4142C20.0391 18.7893 19.5304 19 19 19H5C4.46957 19 3.96086 18.7893 3.58579 18.4142C3.21071 18.0391 3 17.5304 3 17V7Z" stroke="#E44A19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 7L12 13L21 7" stroke="#E44A19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconAddNote = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V7C19 6.46957 18.7893 5.96086 18.4142 5.58579C18.0391 5.21071 17.5304 5 17 5H15" stroke="#E44A19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 5C9 4.46957 9.21071 3.96086 9.58579 3.58579C9.96086 3.21071 10.4696 3 11 3H13C13.5304 3 14.0391 3.21071 14.4142 3.58579C14.7893 3.96086 15 4.46957 15 5C15 5.53043 14.7893 6.03914 14.4142 6.41421C14.0391 6.78929 13.5304 7 13 7H11C10.4696 7 9.96086 6.78929 9.58579 6.41421C9.21071 6.03914 9 5.53043 9 5Z" stroke="#E44A19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 11V17" stroke="#E44A19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 14H15" stroke="#E44A19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconHome = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12L3 12L12 3L21 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 12V19C5 19.5304 5.21071 20.0391 5.58579 20.4142C5.96086 20.7893 6.46957 21 7 21H17C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 21V15C9 14.4696 9.21071 13.9609 9.58579 13.5858C9.96086 13.2107 10.4696 13 11 13H13C13.5304 13 14.0391 13.2107 14.4142 13.5858C14.7893 13.9609 15 14.4696 15 15V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconTag = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.5 7.5H7.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 6V10.172C3 10.702 3.211 11.211 3.586 11.586L11 19C11.781 19.781 13.047 19.781 13.828 19L19 13.828C19.781 13.047 19.781 11.781 19 11L11.586 3.586C11.211 3.211 10.702 3 10.172 3H6C5.20435 3 4.44129 3.31607 3.87868 3.87868C3.31607 4.44129 3 5.20435 3 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconNotes = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 7H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 11H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 15H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconActivity = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.05 11C3.27151 8.6843 4.32251 6.51689 6.0131 4.89387C7.70369 3.27085 9.91437 2.30262 12.2372 2.16983C14.56 2.03704 16.8535 2.74917 18.6826 4.17043C20.5117 5.5917 21.7518 7.62684 22.1791 9.89755C22.6064 12.1683 22.191 14.5218 20.9986 16.5052C19.8061 18.4886 17.9111 19.9692 15.6795 20.6471C13.448 21.325 11.0338 21.1513 8.92127 20.1598C6.80877 19.1683 5.14363 17.4283 4.24 15.28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 15H7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


const IconSearch = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.41667 11.0833C8.994 11.0833 11.0833 8.994 11.0833 6.41667C11.0833 3.83934 8.994 1.75 6.41667 1.75C3.83934 1.75 1.75 3.83934 1.75 6.41667C1.75 8.994 3.83934 11.0833 6.41667 11.0833Z" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.25 12.25L9.71251 9.71252" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


const IconChevronRight = () => (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.875 15.75L13.125 10.5L7.875 5.25" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Product placeholder image 
const CUBES_IMG = "/assets/215fa8f6f3a5d20038675a5873b115157bef0738.png";
const SHEET_IMG = "/assets/21391a5058252761d7be9f7ebdb608fa43b4dcea.png";
const DRIP_EDGE_IMG = "/assets/252312fe6ce83c5828550ea6804fc22ccccacf43.png";

// Mock PO data
const PO_DATA = {
  id: '#582',
  title: 'PO for Job - #2021 - 102221 - Visit for Sesha',
  status: 'Vendor Accepted',
  assignee: 'Jegadheesh',
  items: [
    {
      id: 1,
      number: 1,
      name: 'GAF Timberline HDZ Shingles',
      vendorSku: 'GAF-HDZ-001',
      requiredQty: '25',
      unitPurchaseCost: '$42.99',
      remarks: '-',
      image: SHEET_IMG
    },
    {
      id: 2,
      number: 2,
      name: 'Aluminum Drip Edge 10ft',
      vendorSku: 'DRP-ALU-10',
      requiredQty: '50',
      unitPurchaseCost: '$8.50',
      remarks: '-',
      image: DRIP_EDGE_IMG
    },
    {
      id: 3,
      number: 3,
      name: 'Ice & Water Shield Underlayment',
      vendorSku: 'IWS-200',
      requiredQty: '10',
      unitPurchaseCost: '$145.00',
      remarks: '-',
      image: CUBES_IMG
    },
    {
      id: 4,
      number: 4,
      name: '1-1/4" Coil Roofing Nails',
      vendorSku: 'NL-COIL-125',
      requiredQty: '30',
      unitPurchaseCost: '$45.00',
      remarks: '-',
      image: CUBES_IMG
    }
  ],
  total: '$4,274.50'
};

// Subtle Checkmark Icon - Subtle green for received items
const SubtleCheckmark = ({ isVisible }) => (
  <div className={`w-[18px] h-[18px] rounded-full flex items-center justify-center transition-all duration-200 ${
    isVisible ? 'bg-[#10B981]' : 'border-2 border-[#E2E8F0]'
  }`}>
    {isVisible && (
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 3L4 7L2 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )}
  </div>
);

// Image Upload Icon
const IconUploadImage = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.25 8.75V11.0833C12.25 11.3928 12.1271 11.6895 11.9083 11.9083C11.6895 12.1271 11.3928 12.25 11.0833 12.25H2.91667C2.60725 12.25 2.3105 12.1271 2.09171 11.9083C1.87292 11.6895 1.75 11.3928 1.75 11.0833V8.75" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.91667 4.66667L7 1.75L4.08334 4.66667" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 1.75V8.75" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Image Preview Modal
const ImagePreviewModal = ({ isOpen, onClose, images, itemName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  if (!isOpen || !images || images.length === 0) return null;
  
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70" onClick={onClose}>
      <div className="relative max-w-[800px] max-h-[80vh] bg-white rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E2E8F0]">
          <span className="text-[13px] font-medium text-[#1E293B]">{itemName} - Proof of Receipt ({currentIndex + 1}/{images.length})</span>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded hover:bg-[#F1F5F9]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 3.5L3.5 10.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.5 3.5L10.5 10.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className="p-4 flex items-center justify-center bg-[#F8FAFC]">
          <img src={images[currentIndex]} alt="Proof" className="max-w-full max-h-[60vh] object-contain rounded" />
        </div>
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-2 py-3 border-t border-[#E2E8F0]">
            <button 
              onClick={() => setCurrentIndex(prev => prev > 0 ? prev - 1 : images.length - 1)}
              className="w-8 h-8 flex items-center justify-center rounded border border-[#E2E8F0] hover:bg-[#F1F5F9]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.75 10.5L5.25 7L8.75 3.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="flex gap-1.5">
              {images.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-[#E44A19]' : 'bg-[#CBD5E1]'}`}
                />
              ))}
            </div>
            <button 
              onClick={() => setCurrentIndex(prev => prev < images.length - 1 ? prev + 1 : 0)}
              className="w-8 h-8 flex items-center justify-center rounded border border-[#E2E8F0] hover:bg-[#F1F5F9]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.25 3.5L8.75 7L5.25 10.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Receive Items Modal Component - Enhanced UX
const ReceiveItemsModal = ({ isOpen, onClose, onSave, items }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [previewModal, setPreviewModal] = useState({ isOpen: false, images: [], itemName: '' });
  const [receiveItems, setReceiveItems] = useState(
    items.map(item => ({
      ...item,
      receivingQty: '0',
      vendorCost: item.unitPurchaseCost.replace('$', '').replace(',', ''),
      location: 'No Location',
      serialNo: '',
      remarks: '',
      proofImages: [], // Array to store proof of receipt images
      isReceived: false,
      justReceived: false // For animation
    }))
  );

  // Check if item is received (receiving qty matches or exceeds requested qty)
  const isItemReceived = (item) => {
    const requestedQty = parseInt(item.requiredQty.replace(/[^0-9]/g, '') || '0');
    const receivingQty = parseInt(item.receivingQty || '0');
    return receivingQty >= requestedQty && receivingQty > 0;
  };

  // Calculate progress
  const receivedCount = receiveItems.filter(isItemReceived).length;
  const totalCount = receiveItems.length;
  const progressPercent = totalCount > 0 ? Math.round((receivedCount / totalCount) * 100) : 0;
  const allItemsReceived = receivedCount === totalCount;
  
  // Check if any receiving data has been entered (any qty > 0)
  const hasAnyReceivingData = receiveItems.some(item => parseInt(item.receivingQty || '0') > 0);

  const handleReceivingQtyChange = (index, value) => {
    setReceiveItems(prev => {
      const updated = [...prev];
      updated[index].receivingQty = value;
      return updated;
    });
  };

  const handleRemarksChange = (index, value) => {
    setReceiveItems(prev => {
      const updated = [...prev];
      updated[index].remarks = value;
      return updated;
    });
  };

  const handleSerialNoChange = (index, value) => {
    setReceiveItems(prev => {
      const updated = [...prev];
      updated[index].serialNo = value;
      return updated;
    });
  };

  // Handle image upload for proof of receipt
  const handleImageUpload = (index, files) => {
    if (!files || files.length === 0) return;
    
    const newImages = Array.from(files).map(file => URL.createObjectURL(file));
    
    setReceiveItems(prev => {
      const updated = [...prev];
      updated[index].proofImages = [...(updated[index].proofImages || []), ...newImages];
      return updated;
    });
  };

  // Remove an uploaded image
  const handleRemoveImage = (itemIndex, imageIndex) => {
    setReceiveItems(prev => {
      const updated = [...prev];
      updated[itemIndex].proofImages = updated[itemIndex].proofImages.filter((_, idx) => idx !== imageIndex);
      return updated;
    });
  };

  // Open image preview
  const openImagePreview = (images, itemName) => {
    setPreviewModal({ isOpen: true, images, itemName });
  };

  // Toggle item selection
  const toggleItemSelection = (itemId) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // Toggle select all
  const toggleSelectAll = () => {
    const nonReceived = filteredItems.filter(item => !isItemReceived(item));
    if (selectedItems.size === nonReceived.length && nonReceived.length > 0) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(nonReceived.map(item => item.id)));
    }
  };

  // Receive selected items
  const handleReceiveSelected = () => {
    if (selectedItems.size === 0) return;
    
    setReceiveItems(prev => 
      prev.map(item => {
        if (selectedItems.has(item.id)) {
          return {
            ...item,
            receivingQty: item.requiredQty.replace(/[^0-9]/g, '') || '0',
            justReceived: true
          };
        }
        return item;
      })
    );
    
    // Clear animation flag after animation completes
    setTimeout(() => {
      setReceiveItems(prev => prev.map(item => ({ ...item, justReceived: false })));
    }, 600);
    
    // Clear selection
    setSelectedItems(new Set());
  };

  // Receive all items
  const handleReceiveAll = () => {
    setReceiveItems(prev => 
      prev.map(item => ({
        ...item,
        receivingQty: item.requiredQty.replace(/[^0-9]/g, '') || '0',
        justReceived: true
      }))
    );
    
    // Show success toast
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
    
    // Clear animation flag after animation completes
    setTimeout(() => {
      setReceiveItems(prev => prev.map(item => ({ ...item, justReceived: false })));
    }, 600);
  };

  const filteredItems = receiveItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.vendorSku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const nonReceivedItems = filteredItems.filter(item => !isItemReceived(item));
  const isAllSelected = nonReceivedItems.length > 0 && selectedItems.size === nonReceivedItems.length;
  const hasSelection = selectedItems.size > 0;
  const selectedNotReceivedCount = [...selectedItems].filter(id => {
    const item = receiveItems.find(i => i.id === id);
    return item && !isItemReceived(item);
  }).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-white rounded-[12px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] max-w-[1320px] w-[95%] max-h-[90vh] flex flex-col overflow-hidden animate-[slideUp_0.3s_ease-out]">
        
        {/* Info Toast - Subtle */}
        <div className={`fixed top-4 right-4 z-[60] transition-all duration-300 ${showSuccessToast ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
          <div className="bg-[#1E293B] text-white px-4 py-2.5 rounded-md shadow-lg flex items-center gap-2 text-[13px]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>All items received — click "Save & Close" to confirm</span>
          </div>
        </div>

        {/* Header - Clean and Simple */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
          <h2 className="text-[16px] font-semibold text-[#1E293B]">Receive Items</h2>
          <button
            onClick={onClose}
            className="w-[28px] h-[28px] flex items-center justify-center rounded hover:bg-[#F1F5F9] transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 3.5L3.5 10.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.5 3.5L10.5 10.5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Actions Bar */}
        <div className="px-6 py-3 flex items-center justify-between border-b border-[#E2E8F0]">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative w-[260px]">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#94A3B8]">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.41667 11.0833C8.994 11.0833 11.0833 8.994 11.0833 6.41667C11.0833 3.83934 8.994 1.75 6.41667 1.75C3.83934 1.75 1.75 3.83934 1.75 6.41667C1.75 8.994 3.83934 11.0833 6.41667 11.0833Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.25 12.25L9.71251 9.71252" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[36px] pl-9 pr-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-md text-[13px] text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:bg-white focus:border-[#94A3B8] transition-all"
              />
            </div>
            
            {/* Selection Info */}
            {hasSelection && (
              <div className="flex items-center gap-2 px-2.5 py-1 bg-[#F1F5F9] rounded-md text-[12px] text-[#64748B]">
                <span>{selectedItems.size} selected</span>
                <button 
                  onClick={() => setSelectedItems(new Set())}
                  className="text-[#94A3B8] hover:text-[#64748B] transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 3L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 3L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Receive Selected Button */}
            {hasSelection && selectedNotReceivedCount > 0 && (
              <button
                onClick={handleReceiveSelected}
                className="h-[34px] px-3 flex items-center gap-1.5 bg-white border border-[#E2E8F0] rounded-md text-[12px] font-medium text-[#475569] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.6667 3.5L5.25 9.91667L2.33334 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Receive Selected ({selectedNotReceivedCount})
              </button>
            )}
            
            {/* Receive All Button */}
            <button
              onClick={handleReceiveAll}
              disabled={allItemsReceived}
              className={`h-[34px] px-4 flex items-center gap-1.5 rounded-md text-[12px] font-medium transition-all ${
                allItemsReceived 
                  ? 'bg-[#F1F5F9] text-[#94A3B8] cursor-default' 
                  : 'bg-[#1E293B] text-white hover:bg-[#334155]'
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.6667 3.5L5.25 9.91667L2.33334 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {allItemsReceived ? 'All Received' : `Receive All (${totalCount - receivedCount})`}
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-[#F8FAFC] sticky top-0 z-10">
              <tr>
                {/* Checkbox Column */}
                <th className="w-[44px] px-3 py-2.5 border-b border-[#E2E8F0]">
                  {nonReceivedItems.length > 0 ? (
                    <label className="flex items-center justify-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                        className="w-[16px] h-[16px] rounded border-[#CBD5E1] text-[#475569] focus:ring-[#475569] focus:ring-offset-0 cursor-pointer"
                      />
                    </label>
                  ) : (
                    <div className="flex items-center justify-center">
                      <div className="w-[16px] h-[16px] rounded border border-[#E2E8F0] bg-[#F1F5F9]" />
                    </div>
                  )}
                </th>
                <th className="w-[220px] px-3 py-2.5 text-left text-[10px] font-semibold text-[#64748B] uppercase tracking-wide border-b border-[#E2E8F0]">Item</th>
                <th className="w-[110px] px-3 py-2.5 text-left text-[10px] font-semibold text-[#64748B] uppercase tracking-wide border-b border-[#E2E8F0]">Vendor SKU</th>
                <th className="w-[90px] px-3 py-2.5 text-center text-[10px] font-semibold text-[#64748B] uppercase tracking-wide border-b border-[#E2E8F0]">Ordered</th>
                <th className="w-[120px] px-3 py-2.5 text-left text-[10px] font-semibold text-[#64748B] uppercase tracking-wide border-b border-[#E2E8F0]">
                  Receiving <span className="text-[#94A3B8]">*</span>
                </th>
                <th className="w-[90px] px-3 py-2.5 text-left text-[10px] font-semibold text-[#64748B] uppercase tracking-wide border-b border-[#E2E8F0]">Cost</th>
                <th className="w-[130px] px-3 py-2.5 text-left text-[10px] font-semibold text-[#64748B] uppercase tracking-wide border-b border-[#E2E8F0]">Location</th>
                <th className="w-[120px] px-3 py-2.5 text-left text-[10px] font-semibold text-[#64748B] uppercase tracking-wide border-b border-[#E2E8F0]">Serial No</th>
                <th className="w-[130px] px-3 py-2.5 text-left text-[10px] font-semibold text-[#64748B] uppercase tracking-wide border-b border-[#E2E8F0]">Remarks</th>
                <th className="w-[140px] px-3 py-2.5 text-left text-[10px] font-semibold text-[#64748B] uppercase tracking-wide border-b border-[#E2E8F0]">Proof</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => {
                const received = isItemReceived(item);
                // Find the actual index in receiveItems array
                const actualIndex = receiveItems.findIndex(ri => ri.id === item.id);
                const isSelected = selectedItems.has(item.id);
                
                return (
                  <tr 
                    key={item.id} 
                    className={`transition-colors duration-200 ${
                      received 
                        ? 'bg-[#F8FAFC]' 
                        : isSelected 
                          ? 'bg-[#F1F5F9]' 
                          : 'bg-white hover:bg-[#FAFAFA]'
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="px-3 py-2.5 border-b border-[#E2E8F0]">
                      {received ? (
                        <div className="flex items-center justify-center">
                          <div className="w-[16px] h-[16px] rounded border border-[#E2E8F0] bg-[#F1F5F9]" />
                        </div>
                      ) : (
                        <label className="flex items-center justify-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleItemSelection(item.id)}
                            className="w-[16px] h-[16px] rounded border-[#CBD5E1] text-[#475569] focus:ring-[#475569] focus:ring-offset-0 cursor-pointer"
                          />
                        </label>
                      )}
                    </td>
                    
                    {/* Item with Status */}
                    <td className="px-3 py-2.5 border-b border-[#E2E8F0]">
                      <div className="flex items-center gap-2.5">
                        <div className="relative">
                          <div className={`w-[36px] h-[36px] rounded overflow-hidden flex-shrink-0 border transition-colors ${received ? 'border-[#10B981]' : 'border-[#E2E8F0]'}`}>
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {/* Received badge on image */}
                          {received && (
                            <div className="absolute -bottom-1 -right-1 w-[16px] h-[16px] bg-[#10B981] rounded-full flex items-center justify-center shadow-sm">
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 3L4 7L2 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-[12px] font-medium transition-colors ${received ? 'text-[#64748B]' : 'text-[#1E293B]'}`}>
                            {item.name}
                          </span>
                          {received && (
                            <span className="text-[10px] text-[#10B981] font-medium">Received</span>
                          )}
                        </div>
                      </div>
                    </td>
                    
                    {/* Vendor SKU */}
                    <td className="px-3 py-2.5 text-[11px] text-[#64748B] border-b border-[#E2E8F0]">
                      {item.vendorSku}
                    </td>
                    
                    {/* Requested Qty */}
                    <td className="px-3 py-2.5 text-center border-b border-[#E2E8F0]">
                      <span className="text-[12px] font-medium text-[#475569]">
                        {item.requiredQty}
                      </span>
                    </td>
                    
                    {/* Receiving Qty */}
                    <td className="px-3 py-2.5 border-b border-[#E2E8F0]">
                      <input
                        type="text"
                        value={item.receivingQty}
                        onChange={(e) => handleReceivingQtyChange(actualIndex, e.target.value)}
                        className={`w-full h-[32px] px-2.5 bg-white border rounded text-[12px] font-medium text-center transition-colors focus:outline-none ${
                          received 
                            ? 'border-[#94A3B8] text-[#64748B] bg-[#F8FAFC]' 
                            : 'border-[#E2E8F0] text-[#1E293B] focus:border-[#94A3B8]'
                        }`}
                      />
                    </td>
                    
                    {/* Vendor Cost */}
                    <td className="px-3 py-2.5 border-b border-[#E2E8F0]">
                      <span className="text-[11px] text-[#64748B]">${item.vendorCost}</span>
                    </td>
                    
                    {/* Location */}
                    <td className="px-3 py-2.5 border-b border-[#E2E8F0]">
                      <select className="w-full h-[32px] px-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded text-[11px] text-[#64748B] focus:outline-none focus:border-[#94A3B8] cursor-pointer">
                        <option>No Location</option>
                        <option>Warehouse A</option>
                        <option>Warehouse B</option>
                        <option>Job Site</option>
                      </select>
                    </td>
                    
                    {/* Serial No */}
                    <td className="px-3 py-2.5 border-b border-[#E2E8F0]">
                      <input
                        type="text"
                        placeholder="Serial #"
                        value={item.serialNo}
                        onChange={(e) => handleSerialNoChange(actualIndex, e.target.value)}
                        className="w-full h-[32px] px-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded text-[11px] text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#94A3B8]"
                      />
                    </td>
                    
                    {/* Remarks */}
                    <td className="px-3 py-2.5 border-b border-[#E2E8F0]">
                      <input
                        type="text"
                        placeholder="Notes..."
                        value={item.remarks}
                        onChange={(e) => handleRemarksChange(actualIndex, e.target.value)}
                        className="w-full h-[32px] px-2.5 bg-white border border-[#E2E8F0] rounded text-[11px] text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#94A3B8]"
                      />
                    </td>
                    
                    {/* Proof of Receipt */}
                    <td className="px-3 py-2.5 border-b border-[#E2E8F0]">
                      <div className="flex items-center gap-1.5">
                        {/* Show uploaded images */}
                        {item.proofImages && item.proofImages.length > 0 && (
                          <div className="flex items-center gap-1">
                            {item.proofImages.slice(0, 2).map((img, imgIdx) => (
                              <div 
                                key={imgIdx} 
                                className="relative w-[28px] h-[28px] rounded border border-[#E2E8F0] overflow-hidden cursor-pointer group"
                                onClick={() => openImagePreview(item.proofImages, item.name)}
                              >
                                <img src={img} alt="Proof" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                  <svg className="w-3 h-3 text-white opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.16667 7C1.16667 7 2.91667 2.91667 7 2.91667C11.0833 2.91667 12.8333 7 12.8333 7C12.8333 7 11.0833 11.0833 7 11.0833C2.91667 11.0833 1.16667 7 1.16667 7Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M7 8.75C7.9665 8.75 8.75 7.9665 8.75 7C8.75 6.0335 7.9665 5.25 7 5.25C6.0335 5.25 5.25 6.0335 5.25 7C5.25 7.9665 6.0335 8.75 7 8.75Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveImage(actualIndex, imgIdx);
                                  }}
                                  className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#EF4444] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 2L2 6M2 2L6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </button>
                              </div>
                            ))}
                            {item.proofImages.length > 2 && (
                              <button 
                                onClick={() => openImagePreview(item.proofImages, item.name)}
                                className="w-[28px] h-[28px] rounded border border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-center text-[9px] font-medium text-[#64748B] hover:bg-[#F1F5F9]"
                              >
                                +{item.proofImages.length - 2}
                              </button>
                            )}
                          </div>
                        )}
                        
                        {/* Upload button */}
                        <label className="relative cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => handleImageUpload(actualIndex, e.target.files)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <div className={`h-[28px] px-2 flex items-center gap-1 rounded border border-dashed transition-colors ${
                            item.proofImages && item.proofImages.length > 0 
                              ? 'border-[#CBD5E1] text-[#94A3B8] hover:border-[#94A3B8] hover:text-[#64748B]' 
                              : 'border-[#CBD5E1] text-[#64748B] hover:border-[#94A3B8] hover:bg-[#F8FAFC]'
                          }`}>
                            <IconUploadImage />
                            {(!item.proofImages || item.proofImages.length === 0) && (
                              <span className="text-[10px] font-medium">Upload</span>
                            )}
                          </div>
                        </label>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#E2E8F0]">
          {/* Progress Indicator */}
          <div className="flex items-center gap-3">
            {/* Circular Progress */}
            <div className="relative w-[36px] h-[36px]">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke={allItemsReceived ? "#10B981" : "#E44A19"}
                  strokeWidth="3"
                  strokeDasharray={`${progressPercent * 0.94} 100`}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              {allItemsReceived && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6667 3.5L5.25 9.91667L2.33334 7" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
            
            {/* Text */}
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-[#1E293B]">
                {receivedCount}/{totalCount} <span className="font-normal text-[#64748B]">items received</span>
              </span>
              {!allItemsReceived && (
                <span className="text-[11px] text-[#94A3B8]">
                  {totalCount - receivedCount} remaining
                </span>
              )}
              {allItemsReceived && (
                <span className="text-[11px] text-[#10B981] font-medium">
                  All items received!
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="h-[34px] px-4 bg-white border border-[#E2E8F0] rounded-md text-[12px] font-medium text-[#64748B] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave && onSave(receiveItems)}
              className={`h-[34px] px-5 rounded-md text-[12px] font-medium transition-colors ${
                hasAnyReceivingData
                  ? 'bg-[#E44A19] text-white hover:bg-[#D94315]'
                  : 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed'
              }`}
              disabled={!hasAnyReceivingData}
            >
              Save & Close
            </button>
          </div>
        </div>
      </div>
      
      {/* Image Preview Modal */}
      <ImagePreviewModal
        isOpen={previewModal.isOpen}
        onClose={() => setPreviewModal({ isOpen: false, images: [], itemName: '' })}
        images={previewModal.images}
        itemName={previewModal.itemName}
      />
    </div>
  );
};

export default function PurchaseOrderDetailsPage({ onBack }) {
  const [activeTab, setActiveTab] = useState('Navigation');
  const [activeNavItem, setActiveNavItem] = useState('PO Items');
  const [isReceiveItemsModalOpen, setIsReceiveItemsModalOpen] = useState(false);
  
  // Track received items with their fulfilled quantities
  const [receivedItemsData, setReceivedItemsData] = useState(
    PO_DATA.items.map(item => ({
      id: item.id,
      fulfilledQty: 0,
      location: 'No Location',
      serialNo: '',
      remarks: ''
    }))
  );

  // Handler for when items are saved from the modal
  const handleSaveReceivedItems = (receivedItems) => {
    setReceivedItemsData(receivedItems.map(item => ({
      id: item.id,
      fulfilledQty: parseInt(item.receivingQty || '0'),
      location: item.location,
      serialNo: item.serialNo,
      remarks: item.remarks
    })));
    setIsReceiveItemsModalOpen(false);
  };

  // Get fulfilled qty for an item
  const getFulfilledQty = (itemId) => {
    const receivedItem = receivedItemsData.find(r => r.id === itemId);
    return receivedItem ? receivedItem.fulfilledQty : 0;
  };

  const navItems = [
    { id: 'Details', icon: IconHome, label: 'Details', count: null },
    { id: 'PO Items', icon: IconTag, label: 'PO Items', count: 4 },
    { id: 'Notes', icon: IconNotes, label: 'Notes', count: null },
    { id: 'Activity', icon: IconActivity, label: 'Activity', count: null }
  ];

  return (
    <div className="flex flex-col h-full bg-[#F1F5F9]">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-[#E2E8F0] h-[49px] flex items-center px-[21px] justify-between">
        <div className="flex items-center gap-[14px]">
          <button 
            onClick={onBack}
            className="text-[15.8px] font-normal text-[#334155] hover:text-[#1E293B]"
          >
            Purchase Orders
          </button>
          <IconChevronRight />
          <span className="text-[15.8px] font-medium text-[#334155] max-w-[420px] truncate">
            {PO_DATA.id} - {PO_DATA.title}
          </span>
        </div>
        <div className="flex items-center gap-[14px]">
          {/* Receive Items Button */}
          <button 
            onClick={() => setIsReceiveItemsModalOpen(true)}
            className="h-[34px] px-[15px] flex items-center gap-[7px] bg-white border border-[#E44A19] rounded-[5px] text-[12.6px] font-medium text-[#E44A19] hover:bg-[#FEF2F2] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10V12.6667C2 13.0203 2.14048 13.3594 2.39052 13.6095C2.64057 13.8595 2.97971 14 3.33333 14H12.6667C13.0203 14 13.3594 13.8595 13.6095 13.6095C13.8595 13.3594 14 13.0203 14 12.6667V10" stroke="#E44A19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.66667 6.66667L8 10L11.3333 6.66667" stroke="#E44A19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 10V2" stroke="#E44A19" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Receive Items
          </button>
          
          {/* Print/Share Button */}
          <button className="h-[34px] px-[15px] flex items-center gap-[7px] bg-white border border-[#CBD5E1] rounded-[5px] text-[12.6px] font-medium text-[#334155] hover:bg-[#F8FAFC] transition-colors">
            Print/Share
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform scale-y-[-1]">
              <path d="M3.25 4.875L6.5 8.125L9.75 4.875" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          {/* More Actions Button */}
          <button className="h-[34px] px-[15px] flex items-center gap-[7px] bg-white border border-[#CBD5E1] rounded-[5px] text-[12.6px] font-medium text-[#334155] hover:bg-[#F8FAFC] transition-colors">
            More Actions
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform scale-y-[-1]">
              <path d="M3.25 4.875L6.5 8.125L9.75 4.875" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-[336px] bg-white border-r border-[#E2E8F0] flex flex-col shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] overflow-y-auto">
          {/* PO Header Info */}
          <div className="border-b border-[#E2E8F0] px-[24px] py-[21px]">
            {/* ID and Status */}
            <div className="flex items-center justify-between mb-[14px]">
              <span className="text-[14px] font-normal text-[#475569]">{PO_DATA.id}</span>
              <div className="bg-[rgba(40,161,56,0.15)] border border-[#28A138] rounded-[3.5px] px-[10px] py-[3px]">
                <span className="text-[12.6px] font-medium text-[#28A138]">{PO_DATA.status}</span>
              </div>
            </div>
            
            {/* Title */}
            <div className="text-center mb-[7px]">
              <h2 className="text-[17.5px] font-bold text-[#1E293B] leading-[26.25px]">
                PO for Job - #2021 - 102221 -<br/>Visit for Sesha
              </h2>
            </div>
            
            {/* Assignee */}
            <div className="text-center">
              <span className="text-[12.6px] font-normal text-[#697D95]">{PO_DATA.assignee}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-[60px] py-[17.5px] border-b border-[#E2E8F0]">
            <div className="flex flex-col items-center gap-[6px]">
              <div className="w-[38px] h-[38px] bg-[#FBE9E7] rounded-[10.5px] flex items-center justify-center">
                <IconCall />
              </div>
              <span className="text-[11.4px] font-normal text-[#1E293B]">Call</span>
            </div>
            <div className="flex flex-col items-center gap-[6px]">
              <div className="w-[38px] h-[38px] bg-[#FBE9E7] rounded-[10.5px] flex items-center justify-center">
                <IconMail />
              </div>
              <span className="text-[11.4px] font-normal text-[#1E293B]">Mail</span>
            </div>
            <div className="flex flex-col items-center gap-[6px]">
              <div className="w-[38px] h-[38px] bg-[#FBE9E7] rounded-[10.5px] flex items-center justify-center">
                <IconAddNote />
              </div>
              <span className="text-[11.4px] font-normal text-[#1E293B]">Add Note</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center py-[21px]">
            <div className="flex items-center">
              <button 
                onClick={() => setActiveTab('Navigation')}
                className={`px-[16px] h-[42px] text-[14px] font-medium relative ${
                  activeTab === 'Navigation' ? 'text-[#334155]' : 'text-[#64748B]'
                }`}
              >
                Navigation
                {activeTab === 'Navigation' && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E44A19]" />
                )}
              </button>
              <button 
                onClick={() => setActiveTab('Status History')}
                className={`px-[16px] h-[42px] text-[14px] font-medium ml-[21px] ${
                  activeTab === 'Status History' ? 'text-[#334155]' : 'text-[#64748B]'
                }`}
              >
                Status History
                {activeTab === 'Status History' && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E44A19]" />
                )}
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="px-[14px] pb-[10.5px]">
            <div className="flex flex-col gap-[10.5px]">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNavItem === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveNavItem(item.id)}
                    className={`h-[49px] px-[7px] flex items-center justify-between rounded-[7px] ${
                      isActive ? 'bg-[#E8F4FD] border border-[#B3DDFF]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-[7px]">
                      <div className={`w-[24px] h-[24px] flex items-center justify-center ${
                        isActive ? 'text-[#005AA3]' : 'text-[#334155]'
                      }`}>
                        <Icon />
                      </div>
                      <span className={`text-[14px] ${
                        isActive ? 'font-semibold text-[#005AA3]' : 'font-normal text-[#334155]'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                    {item.count !== null && (
                      <div className={`min-w-[28px] h-[24.5px] rounded-full flex items-center justify-center px-[10px] ${
                        isActive ? 'bg-[rgba(0,90,163,0.15)]' : 'bg-[#F1F5F9]'
                      }`}>
                        <span className={`text-[11.4px] font-medium ${
                          isActive ? 'text-[#005AA3]' : 'text-[#64748B]'
                        }`}>
                          {item.count}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-[21px]">
          <div className="bg-white border border-[#E2E8F0] rounded-[7px]">
            {/* Table Header */}
            <div className="flex items-center justify-between px-[21px] py-[17.5px]">
              <h3 className="text-[15.8px] font-semibold text-[#475569]">
                PO Items ({PO_DATA.items.length})
              </h3>
              <button className="w-[31.5px] h-[31.5px] bg-white border border-[#CBD5E1] rounded-[5px] flex items-center justify-center hover:bg-[#F8FAFC] transition-colors">
                <IconSearch />
              </button>
            </div>

            {/* Table */}
            <div className="border-t border-[#E2E8F0]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[663px]">
                  <thead className="bg-[#F8FAFC] sticky top-0">
                    <tr>
                      <th className="w-[56px] px-[14px] py-[13px] text-left text-[12.6px] font-medium text-[#475569] border-b border-[#E2E8F0]">#</th>
                      <th className="min-w-[250px] w-[250px] px-[21px] py-[13px] text-left text-[12.6px] font-medium text-[#475569] border-b border-[#E2E8F0]">Item</th>
                      <th className="min-w-[150px] w-[150px] px-[21px] py-[13px] text-left text-[12.6px] font-medium text-[#475569] border-b border-[#E2E8F0]">Vendor SKU / ID</th>
                      <th className="min-w-[120px] w-[120px] px-[21px] py-[13px] text-left text-[12.6px] font-medium text-[#475569] border-b border-[#E2E8F0]">Required Qty</th>
                      <th className="min-w-[120px] w-[120px] px-[21px] py-[13px] text-left text-[12.6px] font-medium text-[#475569] border-b border-[#E2E8F0]">Fulfilled Qty</th>
                      <th className="min-w-[160px] w-[160px] px-[21px] py-[13px] text-left text-[12.6px] font-medium text-[#475569] border-b border-[#E2E8F0]">Unit Purchase Cost</th>
                      <th className="min-w-[200px] w-[200px] px-[21px] py-[13px] text-left text-[12.6px] font-medium text-[#475569] border-b border-[#E2E8F0]">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PO_DATA.items.map((item) => {
                      const fulfilledQty = getFulfilledQty(item.id);
                      const requiredQty = parseInt(item.requiredQty);
                      const isFullyFulfilled = fulfilledQty >= requiredQty;
                      const isPartiallyFulfilled = fulfilledQty > 0 && fulfilledQty < requiredQty;
                      
                      return (
                        <tr key={item.id} className="bg-white">
                          <td className="w-[56px] px-[14px] py-[34px] text-[12.6px] font-normal text-[#334155] tracking-[0.225px] border-b border-[#E2E8F0]">
                            {item.number}
                          </td>
                          <td className="min-w-[250px] w-[250px] px-[21px] py-[12px] border-b border-[#E2E8F0]">
                            <div className="flex items-center gap-[10.5px]">
                              <div className={`w-[42px] h-[42px] border rounded-[7px] overflow-hidden flex-shrink-0 ${
                                isFullyFulfilled ? 'border-[#10B981]' : isPartiallyFulfilled ? 'border-[#F59E0B]' : 'border-[#E2E8F0]'
                              }`}>
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[12.6px] font-medium text-[#334155] tracking-[0.225px]">
                                  {item.name}
                                </span>
                                {isFullyFulfilled && (
                                  <span className="text-[10px] font-medium text-[#10B981] flex items-center gap-1 mt-0.5">
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M8 3L4 7L2 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Received
                                  </span>
                                )}
                                {isPartiallyFulfilled && (
                                  <span className="text-[10px] font-medium text-[#F59E0B] flex items-center gap-1 mt-0.5">
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M5 1V5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                      <circle cx="5" cy="8" r="0.75" fill="currentColor"/>
                                    </svg>
                                    Partial
                                  </span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="min-w-[150px] w-[150px] px-[21px] py-[34px] text-[12.6px] font-normal text-[#334155] tracking-[0.225px] border-b border-[#E2E8F0]">
                            {item.vendorSku}
                          </td>
                          <td className="min-w-[120px] w-[120px] px-[21px] py-[34px] text-[12.6px] font-normal text-[#334155] tracking-[0.225px] border-b border-[#E2E8F0]">
                            {item.requiredQty}
                          </td>
                          <td className="min-w-[120px] w-[120px] px-[21px] py-[34px] border-b border-[#E2E8F0]">
                            <span className={`text-[12.6px] font-medium tracking-[0.225px] ${
                              isFullyFulfilled ? 'text-[#10B981]' : isPartiallyFulfilled ? 'text-[#F59E0B]' : 'text-[#94A3B8]'
                            }`}>
                              {fulfilledQty}
                            </span>
                          </td>
                          <td className="min-w-[160px] w-[160px] px-[21px] py-[34px] text-[12.6px] font-normal text-[#334155] tracking-[0.225px] border-b border-[#E2E8F0]">
                            {item.unitPurchaseCost}
                          </td>
                          <td className="min-w-[200px] w-[200px] px-[21px] py-[34px] text-[12.6px] font-normal text-[#334155] tracking-[0.225px] border-b border-[#E2E8F0]">
                            {item.remarks}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Total Row */}
              <div className="flex items-center justify-end px-[21px] py-[14px]">
                <span className="text-[14px] font-bold text-[#475569] mr-[56px]">Total</span>
                <span className="text-[14px] font-bold text-[#475569] w-[165px]">{PO_DATA.total}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Receive Items Modal */}
      <ReceiveItemsModal
        isOpen={isReceiveItemsModalOpen}
        onClose={() => setIsReceiveItemsModalOpen(false)}
        onSave={handleSaveReceivedItems}
        items={PO_DATA.items}
      />
    </div>
  );
}
