import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import WorkspaceSidebar from './components/WorkspaceSidebar'
import CategorySettings from './components/CategorySettings'
import ProductsPage from './components/ProductsPage'
import ProductDetailsPage from './components/ProductDetailsPage'
import NewPartServicePage from './components/NewPartServicePage'
import JobDetailsPage from './components/JobDetailsPage'
import JobChecklistPage from './components/JobChecklistPage'
import ReportsPage from './components/ReportsPage'
import MobileCategoryPage from './components/MobileCategoryPage'

function App() {
  // Check if we're on the /mobile route
  const [isMobileRoute, setIsMobileRoute] = useState(() => {
    const path = window.location.pathname
    return path === '/mobile' || path === '/mobile/'
  })
  
  // 'workspace' = Products listing, 'settings' = Category Settings, 'product-details' = Product details, 'new-part-service' = New Part/Service form, 'job-details' = Job Details, 'job-checklist' = Job Checklist, 'reports' = Reports
  const [currentView, setCurrentView] = useState('settings')
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname
      setIsMobileRoute(path === '/mobile' || path === '/mobile/')
    }
    window.addEventListener('popstate', checkRoute)
    return () => window.removeEventListener('popstate', checkRoute)
  }, [])

  // If on mobile route, render the mobile page
  if (isMobileRoute) {
    return <MobileCategoryPage />
  }

  const navigateToWorkspace = () => {
    setSelectedProduct(null)
    setCurrentView('workspace')
  }
  const navigateToSettings = () => setCurrentView('settings')
  const navigateToProductDetails = (product) => {
    setSelectedProduct(product)
    setCurrentView('product-details')
  }
  const navigateToNewPartService = () => setCurrentView('new-part-service')
  const navigateToJobDetails = () => setCurrentView('job-details')
  const navigateToJobChecklist = () => setCurrentView('job-checklist')
  const navigateToReports = () => setCurrentView('reports')

  if (currentView === 'workspace' || currentView === 'product-details' || currentView === 'new-part-service' || currentView === 'job-details' || currentView === 'reports') {
    // Workspace view: Full-height sidebar on left, header + content on right
    return (
      <div className="flex h-screen overflow-hidden">
        {/* Full-height sidebar */}
        <WorkspaceSidebar 
          onNavigateToSettings={navigateToSettings} 
          onNavigateToJobDetails={navigateToJobDetails}
          onNavigateToWorkspace={navigateToWorkspace}
          onNavigateToReports={navigateToReports}
          currentView={currentView}
        />
        
        {/* Right side: Header + Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header currentView={currentView} onNavigateToSettings={navigateToSettings} />
<main className="flex-1 overflow-hidden bg-white">
                {currentView === 'reports' ? (
                  <ReportsPage 
                    onBack={navigateToWorkspace}
                  />
                ) : currentView === 'job-details' ? (
                  <JobDetailsPage 
                    onBack={navigateToWorkspace}
                  />
                ) : currentView === 'new-part-service' ? (
              <NewPartServicePage 
                onCancel={navigateToWorkspace}
                onSave={(data) => {
                  console.log('Saving new part/service:', data);
                  navigateToWorkspace();
                }}
              />
            ) : currentView === 'product-details' && selectedProduct ? (
              <ProductDetailsPage 
                product={selectedProduct} 
                onBack={navigateToWorkspace}
              />
            ) : (
              <ProductsPage 
                onNavigateToSettings={navigateToSettings}
                onProductClick={navigateToProductDetails}
                onNewPartService={navigateToNewPartService}
              />
            )}
          </main>
        </div>
      </div>
    )
  }

  // Job Checklist view: Full screen page
  if (currentView === 'job-checklist') {
    return (
      <div 
        className="flex flex-col h-screen overflow-hidden"
        style={{ backgroundImage: "linear-gradient(90deg, rgb(241, 245, 249) 0%, rgb(241, 245, 249) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}
      >
        <Header currentView={currentView} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar onNavigateToWorkspace={navigateToWorkspace} onNavigateToJobChecklist={navigateToJobChecklist} onNavigateToSettings={navigateToSettings} currentView={currentView} />
          <main className="flex-1 overflow-hidden bg-white">
            <JobChecklistPage onBack={navigateToSettings} />
          </main>
        </div>
      </div>
    )
  }

  // Settings view: Header spans full width, sidebar below header
  return (
    <div 
      className="flex flex-col h-screen overflow-hidden"
      style={{ backgroundImage: "linear-gradient(90deg, rgb(241, 245, 249) 0%, rgb(241, 245, 249) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}
    >
      <Header currentView={currentView} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onNavigateToWorkspace={navigateToWorkspace} onNavigateToJobChecklist={navigateToJobChecklist} onNavigateToSettings={navigateToSettings} currentView={currentView} />
        <main className="flex-1 overflow-hidden bg-white">
          <CategorySettings />
        </main>
      </div>
    </div>
  )
}

export default App
