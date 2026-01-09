import React, { useState, useEffect } from 'react';
import { Search, Download, MessageSquare, Calendar, Loader2, X } from 'lucide-react';
import fundingSources from '../data/fundingSources';

export default function Home() {
  const [selectedFunding, setSelectedFunding] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = 'Canadian Film & TV Funding Guide';
  }, []);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const filteredSources = fundingSources.filter(source =>
    source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    source.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    source.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalDeadlines = fundingSources.flatMap(s => s.upcomingDeadlines || []).length;
  const upcomingDeadlines = fundingSources.flatMap(s => s.upcomingDeadlines || [])
    .filter(d => {
      const daysUntil = Math.ceil((new Date(d.date) - new Date()) / (1000 * 60 * 60 * 24));
      return daysUntil >= 0 && daysUntil <= 30;
    }).length;

  const handleFundingSelect = (source) => {
    setSelectedFunding(source);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generatePDF = () => {
    if (!selectedFunding) return;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${selectedFunding.name}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 60px; line-height: 1.8; max-width: 800px; margin: 0 auto; }
            h1 { font-size: 24px; margin-bottom: 4px; font-weight: 600; }
            .org { color: #666; font-size: 14px; margin-bottom: 40px; }
            h2 { font-size: 14px; margin-top: 40px; margin-bottom: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #999; }
            p { margin-bottom: 16px; line-height: 1.6; }
          </style>
        </head>
        <body>
          <h1>${selectedFunding.name}</h1>
          <div class="org">${selectedFunding.organization}</div>
          
          <h2>Description</h2>
          <p>${selectedFunding.description}</p>
          
          ${selectedFunding.eligibility ? `
            <h2>Requirements</h2>
            <p>${selectedFunding.eligibility}</p>
          ` : ''}
          
          <h2>Funding</h2>
          <p>${selectedFunding.fundingRange}</p>
          
          <h2>Deadlines</h2>
          <p>${selectedFunding.deadlines}</p>
          
          ${selectedFunding.keyPoints.length > 0 ? `
            <h2>Key Points</h2>
            ${selectedFunding.keyPoints.map(point => `<p>• ${point}</p>`).join('')}
          ` : ''}
          
          <h2>Website</h2>
          <p><a href="${selectedFunding.website}">${selectedFunding.name}</a></p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage = { role: 'user', content: userInput };
    setChatMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const fundingContext = fundingSources.map(f => 
        `${f.name} (${f.organization}): ${f.description} Requirements: ${f.eligibility} Funding: ${f.fundingRange} Deadlines: ${f.deadlines}`
      ).join('\n\n');

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || '',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            ...chatMessages,
            userMessage
          ].map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          system: `You are a helpful assistant specializing in Canadian film and television funding programs. You have access to the following funding sources:\n\n${fundingContext}\n\nHelp users find the right funding programs for their projects. Be specific, helpful, and provide clear recommendations. If asked about requirements, deadlines, or funding amounts, refer to the specific programs above.`
        })
      });

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.content[0].text
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
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="inline-block px-3 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full mb-4">
            🇨🇦 Canadian Funding
          </div>
          <h1 className="text-3xl font-semibold mb-3 text-gray-900">
            Film & TV Funding Guide
          </h1>
          <p className="text-gray-500 text-base max-w-2xl">
            Explore funding opportunities and get AI-powered guidance for your project
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex gap-8 mb-8 border-b border-gray-100">
          <button
            onClick={() => setActiveTab('browse')}
            className={`pb-3 text-sm font-medium transition-all relative ${
              activeTab === 'browse'
                ? 'text-gray-900'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Programs
            {activeTab === 'browse' && (
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
            onClick={() => setActiveTab('chat')}
            className={`pb-3 text-sm font-medium transition-all relative ${
              activeTab === 'chat'
                ? 'text-gray-900'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Ask AI
            {activeTab === 'chat' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
            )}
          </button>
        </div>

        {activeTab === 'browse' && (
          <div>
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search programs by name, type, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            {!selectedFunding ? (
              <div className="grid gap-4">
                {filteredSources.map(source => (
                  <div
                    key={source.id}
                    onClick={() => handleFundingSelect(source)}
                    className="p-6 border border-gray-100 rounded-lg hover:border-red-200 hover:shadow-sm transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors mb-1">
                          {source.name}
                        </h3>
                        <p className="text-xs text-gray-500">{source.organization}</p>
                      </div>
                      <div className="text-gray-400 group-hover:text-red-600 transition-colors">
                        →
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {source.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {source.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                {filteredSources.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    <p>No programs match your search</p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setSelectedFunding(null)}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
                >
                  ← Back to all programs
                </button>

                <div className="space-y-8">
                  <div className="flex justify-between items-start pb-6 border-b border-gray-100">
                    <div>
                      <h2 className="text-2xl font-semibold mb-2">
                        {selectedFunding.name}
                      </h2>
                      <p className="text-sm text-gray-500 mb-3">
                        {selectedFunding.organization}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedFunding.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={generatePDF}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
                    >
                      <Download size={16} />
                      PDF
                    </button>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedFunding.description}</p>
                  </div>

                  {selectedFunding.eligibility && (
                    <div>
                      <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Requirements</h3>
                      <p className="text-gray-700 leading-relaxed">{selectedFunding.eligibility}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Funding</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedFunding.fundingRange}</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Deadlines</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedFunding.deadlines}</p>
                  </div>

                  {selectedFunding.keyPoints.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Key Points</h3>
                      <div className="space-y-3">
                        {selectedFunding.keyPoints.map((point, idx) => (
                          <p key={idx} className="text-gray-700 leading-relaxed">
                            • {point}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Website</h3>
                    <a
                      href={selectedFunding.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 hover:text-red-700 underline"
                    >
                      {selectedFunding.name} →
                    </a>
                  </div>
                        </div>
                        </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'calendar' && (
          <div>
            <div className="space-y-3">
              {fundingSources.flatMap(source => 
                (source.upcomingDeadlines || []).map(deadline => ({
                  ...deadline,
                  program: source.name,
                  organization: source.organization,
                  id: source.id
                }))
              )
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((deadline, idx) => {
                const deadlineDate = new Date(deadline.date);
                const today = new Date();
                const daysUntil = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
                const isPast = daysUntil < 0;
                const isUrgent = daysUntil >= 0 && daysUntil <= 7;
                const isUpcoming = daysUntil > 7 && daysUntil <= 30;
                
                return (
                  <div 
                    key={idx} 
                    className={`flex items-center justify-between p-5 rounded-lg border transition-all ${
                      isPast ? 'bg-gray-50 border-gray-100 opacity-50' : 
                      isUrgent ? 'bg-red-50 border-red-200' : 
                      isUpcoming ? 'bg-amber-50 border-amber-200' :
                      'bg-white border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <div className="text-center w-16">
                        <div className={`text-2xl font-semibold ${
                          isPast ? 'text-gray-400' : 
                          isUrgent ? 'text-red-600' : 
                          'text-gray-900'
                        }`}>
                          {deadlineDate.getDate()}
                        </div>
                        <div className="text-xs text-gray-500 uppercase font-medium">
                          {monthNames[deadlineDate.getMonth()].substring(0, 3)}
                        </div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">{deadline.program}</div>
                        <div className="text-sm text-gray-500">{deadline.description}</div>
                      </div>
                    </div>
                    {!isPast && (
                      <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                        isUrgent ? 'bg-red-100 text-red-700' : 
                        isUpcoming ? 'bg-amber-100 text-amber-700' :
                        'text-gray-500'
                      }`}>
                        {daysUntil === 0 ? 'Today' : 
                         daysUntil === 1 ? 'Tomorrow' : 
                         `${daysUntil} days`}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {fundingSources.flatMap(s => s.upcomingDeadlines || []).length === 0 && (
              <div className="text-center py-20 text-gray-300">
                <Calendar size={48} className="mx-auto mb-4 opacity-30" />
                <p>No upcoming deadlines</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'chat' && (
          <div>
            <div className="border border-gray-200 rounded-lg h-96 overflow-y-auto p-6 mb-4 bg-gray-50">
              {chatMessages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <MessageSquare size={48} className="mx-auto mb-4 opacity-30" />
                    <p className="mb-2">Ask a question about funding programs</p>
                    <p className="text-sm text-gray-400">Try: Which programs are best for documentaries?</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-xs text-gray-400 uppercase tracking-wider">
                        {msg.role === 'user' ? 'You' : 'Assistant'}
                      </div>
                      <p className="text-gray-700 leading-relaxed">{msg.content}</p>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-gray-400">
                      <Loader2 className="animate-spin" size={16} />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !isLoading) {
                    handleChatSubmit(e);
                  }
                }}
                placeholder="Ask about funding programs..."
                className="flex-1 p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 transition-all"
                disabled={isLoading}
              />
              <button
                onClick={handleChatSubmit}
                disabled={isLoading}
                className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-40 text-sm font-medium"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
