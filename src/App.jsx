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
import JobsListingPage from './components/JobsListingPage'
import NewQuotePage from './components/NewQuotePage'
import QuoteDetailsPage from './components/QuoteDetailsPage'

function App() {
  // Check if we're on the /mobile or /listing route
  const [isMobileRoute, setIsMobileRoute] = useState(() => {
    const path = window.location.pathname
    return path === '/mobile' || path === '/mobile/'
  })
  
  const [isListingRoute, setIsListingRoute] = useState(() => {
    const path = window.location.pathname
    return path === '/listing' || path === '/listing/'
  })
  
  // 'workspace' = Products listing, 'settings' = Category Settings, 'product-details' = Product details, 'new-part-service' = New Part/Service form, 'job-details' = Job Details, 'job-checklist' = Job Checklist, 'reports' = Reports
  const [currentView, setCurrentView] = useState('settings')
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname
      setIsMobileRoute(path === '/mobile' || path === '/mobile/')
      setIsListingRoute(path === '/listing' || path === '/listing/')
    }
    window.addEventListener('popstate', checkRoute)
    return () => window.removeEventListener('popstate', checkRoute)
  }, [])

  // Navigation functions
  const navigateToWorkspace = () => {
    setSelectedProduct(null)
    setIsListingRoute(false)
    window.history.pushState({}, '', '/')
    setCurrentView('workspace')
  }
  const navigateToSettings = () => {
    setIsListingRoute(false)
    window.history.pushState({}, '', '/')
    setCurrentView('settings')
  }
  const navigateToProductDetails = (product) => {
    setSelectedProduct(product)
    setCurrentView('product-details')
  }
  const navigateToNewPartService = () => setCurrentView('new-part-service')
  const navigateToJobDetails = () => {
    setIsListingRoute(false)
    window.history.pushState({}, '', '/')
    setCurrentView('job-details')
  }
  const navigateToJobChecklist = () => setCurrentView('job-checklist')
  const navigateToReports = () => {
    setIsListingRoute(false)
    window.history.pushState({}, '', '/')
    setCurrentView('reports')
  }
  const navigateToJobsListing = () => {
    window.history.pushState({}, '', '/listing')
    setIsListingRoute(true)
  }
  const navigateToNewQuote = () => {
    setIsListingRoute(false)
    window.history.pushState({}, '', '/')
    setCurrentView('new-quote')
  }
  const navigateToQuoteDetails = () => {
    setIsListingRoute(false)
    window.history.pushState({}, '', '/')
    setCurrentView('quote-details')
  }

  // If on mobile route, render the mobile page
  if (isMobileRoute) {
    return <MobileCategoryPage />
  }

  // If on listing route, render the jobs listing page
  if (isListingRoute) {
    return (
      <div className="flex h-screen overflow-hidden">
        <WorkspaceSidebar 
          onNavigateToSettings={navigateToSettings} 
          onNavigateToJobDetails={navigateToJobDetails}
          onNavigateToWorkspace={navigateToWorkspace}
          onNavigateToReports={navigateToReports}
          onNavigateToJobsListing={navigateToJobsListing}
          onNavigateToNewQuote={navigateToNewQuote}
          currentView="jobs-listing"
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header currentView="jobs-listing" onNavigateToSettings={navigateToSettings} />
          <main className="flex-1 overflow-hidden bg-white">
            <JobsListingPage 
              onJobClick={(job) => {
                navigateToJobDetails()
              }}
            />
          </main>
        </div>
      </div>
    )
  }

  if (currentView === 'workspace' || currentView === 'product-details' || currentView === 'new-part-service' || currentView === 'job-details' || currentView === 'reports' || currentView === 'new-quote' || currentView === 'quote-details') {
    // Workspace view: Full-height sidebar on left, header + content on right
    return (
      <div className="flex h-screen overflow-hidden">
        {/* Full-height sidebar */}
        <WorkspaceSidebar 
          onNavigateToSettings={navigateToSettings} 
          onNavigateToJobDetails={navigateToJobDetails}
          onNavigateToWorkspace={navigateToWorkspace}
          onNavigateToReports={navigateToReports}
          onNavigateToJobsListing={navigateToJobsListing}
          onNavigateToNewQuote={navigateToNewQuote}
          currentView={currentView}
        />
        
        {/* Right side: Header + Content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header currentView={currentView} onNavigateToSettings={navigateToSettings} />
<main className="flex-1 overflow-hidden bg-white">
                {currentView === 'quote-details' ? (
                  <QuoteDetailsPage 
                    onBack={navigateToNewQuote}
                  />
                ) : currentView === 'new-quote' ? (
                  <NewQuotePage 
                    onBack={navigateToWorkspace}
                    onSaveAndSend={navigateToQuoteDetails}
                  />
                ) : currentView === 'reports' ? (
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
          <Sidebar onNavigateToWorkspace={navigateToWorkspace} onNavigateToJobChecklist={navigateToJobChecklist} onNavigateToSettings={navigateToSettings} onNavigateToNewQuote={navigateToNewQuote} currentView={currentView} />
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
        <Sidebar onNavigateToWorkspace={navigateToWorkspace} onNavigateToJobChecklist={navigateToJobChecklist} onNavigateToSettings={navigateToSettings} onNavigateToNewQuote={navigateToNewQuote} currentView={currentView} />
        <main className="flex-1 overflow-hidden bg-white">
          <CategorySettings />
        </main>
      </div>
    </div>
  )
}

export default App
