import React, { useState, useEffect } from 'react';

// Import modular components
import FundingEstimator from '../components/FundingEstimator/FundingEstimator';
import TaxCreditsView from '../components/TaxCredits/TaxCreditsView';
import CMFProgramsView from '../components/CMFPrograms/CMFProgramsView';
import IntakeDatesView from '../components/IntakeDates/IntakeDatesView';
import AdminPanel from '../components/Admin/AdminPanel';
import InternationalIncentivesView from '../components/InternationalIncentives/InternationalIncentivesView';

export default function Home() {
  const [programs, setPrograms] = useState([]);
  const [activeTab, setActiveTab] = useState('tax-credits');
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    document.title = 'Canadian Film & TV Funding Guide';
    fetchPrograms();

    // Check for admin URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const adminParam = urlParams.get('admin');
    if (adminParam === 'cfn2026') {
      setShowAdmin(true);
    }
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch('/api/programs');
      const data = await response.json();
      setPrograms(data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Wealthsimple-style Top Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/logo.svg"
              alt="Canadian Funding Guide"
              className="h-60"
            />
          </div>
          <div className="hidden lg:block">
            <p className="text-base font-['Inter',sans-serif] text-right">
              <span className="text-[#ff5757] font-semibold">Navigate film & TV funding in Canada and abroad.</span>
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8 mb-8 border-b border-gray-100">
          <button
            onClick={() => setActiveTab('tax-credits')}
            className={`pb-3 text-sm font-medium transition-all relative ${
              activeTab === 'tax-credits'
                ? 'text-gray-900'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Canadian Tax Credits
            {activeTab === 'tax-credits' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('cmf')}
            className={`pb-3 text-sm font-medium transition-all relative ${
              activeTab === 'cmf'
                ? 'text-gray-900'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            CMF Programs
            {activeTab === 'cmf' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`pb-3 text-sm font-medium transition-all relative ${
              activeTab === 'calendar'
                ? 'text-gray-900'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Intake Dates
            {activeTab === 'calendar' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('estimator')}
            className={`pb-3 text-sm font-medium transition-all relative ${
              activeTab === 'estimator'
                ? 'text-gray-900'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Funding Estimator
            {activeTab === 'estimator' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('international')}
            className={`pb-3 text-sm font-medium transition-all relative ${
              activeTab === 'international'
                ? 'text-gray-900'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            International Incentives
            {activeTab === 'international' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
          {showAdmin && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`pb-3 text-sm font-medium transition-all relative ${
                activeTab === 'admin'
                  ? 'text-gray-900'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Admin
              {activeTab === 'admin' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
              )}
            </button>
          )}
        </div>

        {/* Render active tab content */}
        {activeTab === 'tax-credits' && <TaxCreditsView />}
        {activeTab === 'cmf' && <CMFProgramsView programs={programs} />}
        {activeTab === 'calendar' && <IntakeDatesView programs={programs} />}
        {activeTab === 'estimator' && <FundingEstimator />}
        {activeTab === 'international' && <InternationalIncentivesView />}
        {activeTab === 'admin' && showAdmin && (
          <AdminPanel programs={programs} onRefresh={fetchPrograms} />
        )}
      </div>

      <footer className="border-t border-gray-200 mt-12 py-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-base font-semibold text-gray-700">
            Built and maintained by Marco Stellisano
          </p>
          <p className="text-sm text-gray-500 mt-1">
            For questions or feedback, please contact:{' '}
            <a href="mailto:mstellisano@cineflix.com" className="text-red-600 hover:underline">
              mstellisano@cineflix.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
