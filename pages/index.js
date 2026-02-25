import React, { useState, useEffect } from 'react';
import { MessageSquare, Loader2 } from 'lucide-react';

// Import modular components
import FundingEstimator from '../components/FundingEstimator/FundingEstimator';
import TaxCreditsView from '../components/TaxCredits/TaxCreditsView';
import CMFProgramsView from '../components/CMFPrograms/CMFProgramsView';
import IntakeDatesView from '../components/IntakeDates/IntakeDatesView';
import AdminPanel from '../components/Admin/AdminPanel';
import InternationalIncentivesView from '../components/InternationalIncentives/InternationalIncentivesView';

export default function Home() {
  const [programs, setPrograms] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage = { role: 'user', content: userInput };
    setChatMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const fundingContext = programs.map(f =>
        `${f.name} (${f.organization}): ${f.description} Requirements: ${f.eligibility} Funding: ${f.fundingRange} Deadlines: ${f.deadlines}`
      ).join('\n\n');

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatMessages, userMessage].map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
          fundingContext,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      const assistantMessage = {
        role: 'assistant',
        content: data.content,
      };

      setChatMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      setChatMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Wealthsimple-style Top Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/logo.svg"
              alt="Canadian Funding Guide"
              className="h-60"
            />
          </div>
          <div className="hidden lg:block">
            <p className="text-base font-['Inter',sans-serif] text-right">
              <span className="text-[#ff5757] font-semibold">Navigate Canadian film & TV funding</span> with AI-powered guidance for your project.
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
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

          {/* Ask AI Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 200px)' }}>
                <div className="p-4 border-b border-gray-200 bg-white">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={18} className="text-red-600" />
                    <h3 className="font-semibold text-gray-900">Ask AI</h3>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Get AI-powered guidance</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {chatMessages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
                        <p className="text-sm mb-2">Ask about funding programs</p>
                        <p className="text-xs text-gray-400">Try: Which programs are best for documentaries?</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatMessages.map((msg, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="text-xs text-gray-400 uppercase tracking-wider">
                            {msg.role === 'user' ? 'You' : 'Assistant'}
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{msg.content}</p>
                        </div>
                      ))}
                      {isLoading && (
                        <div className="flex items-center gap-2 text-gray-400">
                          <Loader2 className="animate-spin" size={14} />
                          <span className="text-xs">Thinking...</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !isLoading) {
                          handleChatSubmit(e);
                        }
                      }}
                      placeholder="Ask a question..."
                      className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all"
                      disabled={isLoading}
                    />
                    <button
                      onClick={handleChatSubmit}
                      disabled={isLoading}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-40 text-sm font-medium"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
