import React, { useState } from 'react';
import Head from 'next/head';
import { Search, Download, MessageSquare, Calendar, Loader2 } from 'lucide-react';

const fundingSources = [
  {
    id: 'cmf-anglophone-minority',
    name: 'CMF Anglophone Minority Incentive',
    organization: 'CMF',
    description: 'The Official Language Minority Community Production Funding, ensures that Canadians have access to English-language content reflecting Anglophone culture in the province of Quebec',
    eligibility: 'In order to qualify for the 25% maximum above, the production must use English as the original language of production for the majority of its development and production slate.',
    fundingRange: 'The maximum contribution shall be the lesser of 25% of the Project\'s Eligible Costs or $900,000.',
    deadlines: 'May and September intake periods',
    website: 'https://cmf-fmc.ca/program/official-language-minority-communities-olmc-production-funding/',
    keyPoints: [
      'The initial CMF contribution to the Eligible Project will be in the form of a Licence Fee Top-Up.',
      'Triggering Commitment Threshold: 40% of Eligible Costs or $100,000 per hour, whichever is less (English Documentary Programming).'
    ],
    upcomingDeadlines: [
      { date: '2025-05-22', description: 'Spring Intake Period' },
      { date: '2025-09-23', description: 'Fall Intake Period' }
    ]
  },
  {
    id: 'cmf-broadcaster-envelope',
    name: 'CMF Broadcaster Envelope Program',
    organization: 'CMF',
    description: 'The CMF will contribute to Eligible Projects through English and French Broadcaster Envelope Allocations, which are allotments of CMF Program funds made to Canadian Broadcasters with a track record of supporting Canadian programming.',
    eligibility: 'Canadian Broadcasters may decide what proportion of their Broadcaster Envelope Allocation to allot to an Eligible Project up to the limit of the funds allocated to them.',
    fundingRange: 'The initial CMF contribution to the Eligible Project will be in the form of a Licence Fee Top-Up, up to a maximum of 20% of the Project\'s Eligible Costs.',
    deadlines: 'May and October intake periods',
    website: 'https://cmf-fmc.ca/program/broadcaster-envelope-program-english-and-french/',
    keyPoints: [
      'CMF contribution amounts in excess of this 20% maximum will be in the form of an Equity Investment up to the maximum amount.',
      'Triggering Commitment Threshold: 40% of Eligible Costs or $100,000 per hour, whichever is less (English Documentary Programming).'
    ],
    upcomingDeadlines: [
      { date: '2025-05-01', description: 'Spring Intake Period' },
      { date: '2025-10-17', description: 'Fall Intake Period' }
    ]
  },
  {
    id: 'cmf-distributor',
    name: 'CMF Distributor Program',
    organization: 'CMF',
    description: 'The Distributor Program is a pilot initiative designed to offer more flexibility to Applicants by allowing financial contributions from Eligible Canadian Distributors to trigger Eligible Projects without the requirement of a Canadian Broadcaster.',
    eligibility: '',
    fundingRange: 'The CMF contribution to the Eligible Project will be in the form of a Licence Fee Top-Up up to a maximum percentage of 20% of the Project\'s Eligible Costs.',
    deadlines: 'August intake period',
    website: 'https://cmf-fmc.ca/program/distributor-program/',
    keyPoints: [
      'CMF contribution amounts in excess of the above will be in the form of an Equity Investment up to the maximum amount of 49%.',
      'Triggering Commitment Threshold: 15% of Eligible Costs'
    ],
    upcomingDeadlines: [
      { date: '2025-08-19', description: 'Annual Intake Period' }
    ]
  },
  {
    id: 'cmf-pov',
    name: 'CMF POV Program',
    organization: 'CMF',
    description: 'The CMF contributes to Eligible Projects in this Program under a selective process where the CMF evaluates applications according to an Evaluation Grid.',
    eligibility: 'Eligible Projects in this Program must be English- or French-language one-off Auteur Point of View/Creative Documentaries.',
    fundingRange: 'The initial CMF contribution to the Eligible Project will be in the form of a Licence Fee Top-Up, up to a maximum of 20% of the Project\'s Eligible Costs.',
    deadlines: 'May intake period',
    website: 'https://cmf-fmc.ca/program/pov-program/',
    keyPoints: [
      'The CMF\'s Maximum Contribution in this Program is the lesser of 49% of the Project\'s Eligible Costs or $400,000.',
      'CMF contribution amounts in excess of this 20% maximum will be in the form of an Equity Investment up to the maximum amount.',
      'Triggering Commitment Threshold: 15% of Eligible Costs'
    ],
    upcomingDeadlines: [
      { date: '2025-05-01', description: 'Annual Intake Period' }
    ]
  },
  {
    id: 'cmf-regional-bonus',
    name: 'CMF Regional Bonus Program',
    organization: 'CMF',
    description: 'Regional Production Funding supports the CMF\'s mandate in encouraging linear content funding to the production of Projects across all of Canada.',
    eligibility: '',
    fundingRange: 'The maximum contribution shall be the lesser of 15% of the Project\'s Eligible Costs or $1,00,000.',
    deadlines: 'May and September intake periods',
    website: 'https://cmf-fmc.ca/program/regional-production-funding/',
    keyPoints: [
      'The initial CMF contribution to the Eligible Project will be in the form of a Licence Fee Top-Up.',
      'Triggering Commitment Threshold: 40% of Eligible Costs or $100,000 per hour, whichever is less (English Documentary Programming).'
    ],
    upcomingDeadlines: [
      { date: '2025-05-13', description: 'Spring Intake Period' },
      { date: '2025-09-23', description: 'Fall Intake Period' }
    ]
  }
];

export default function Home() {
  const [selectedFunding, setSelectedFunding] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('browse');

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const handleFundingSelect = (e) => {
    const selected = fundingSources.find(f => f.id === e.target.value);
    setSelectedFunding(selected);
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
    <>
      <Head>
        <title>Canadian Film & TV Funding Guide</title>
        <meta name="description" content="Explore Canadian film and television funding opportunities with AI-powered guidance" />
      </Head>
      
      <div className="min-h-screen bg-white">
        <div className="border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-6 py-12">
            <h1 className="text-2xl font-semibold mb-2">
              Canadian Film & TV Funding Guide
            </h1>
            <p className="text-gray-500 text-sm">
              Explore funding opportunities and get AI-powered guidance for your project
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="flex gap-8 mb-12 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('browse')}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === 'browse'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Programs
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === 'calendar'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Deadlines
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === 'chat'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Ask AI
            </button>
          </div>

          {activeTab === 'browse' && (
            <div>
              <div className="mb-12">
                <select
                  onChange={handleFundingSelect}
                  className="w-full p-4 border border-gray-200 rounded text-base focus:outline-none focus:border-gray-400 bg-white"
                  defaultValue=""
                >
                  <option value="" disabled>Select a program</option>
                  {fundingSources.map(source => (
                    <option key={source.id} value={source.id}>
                      {source.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedFunding && (
                <div className="space-y-12">
                  <div className="flex justify-between items-start pb-8 border-b border-gray-200">
                    <div>
                      <h2 className="text-xl font-semibold mb-1">
                        {selectedFunding.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {selectedFunding.organization}
                      </p>
                    </div>
                    <button
                      onClick={generatePDF}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
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

                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Funding</h3>
                      <p className="text-gray-700 leading-relaxed">{selectedFunding.fundingRange}</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Deadlines</h3>
                      <p className="text-gray-700 leading-relaxed">{selectedFunding.deadlines}</p>
                    </div>
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
                      className="text-gray-700 hover:text-black underline"
                    >
                      {selectedFunding.name}
                    </a>
                  </div>
                </div>
              )}

              {!selectedFunding && (
                <div className="text-center py-20 text-gray-300">
                  <p>Select a program to view details</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'calendar' && (
            <div>
              <div className="space-y-4">
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
                  
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-center justify-between py-4 border-b border-gray-100 ${isPast ? 'opacity-40' : ''}`}
                    >
                      <div className="flex items-center gap-6">
                        <div className="text-center w-16">
                          <div className="text-2xl font-semibold">
                            {deadlineDate.getDate()}
                          </div>
                          <div className="text-xs text-gray-400 uppercase">
                            {monthNames[deadlineDate.getMonth()].substring(0, 3)}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium mb-1">{deadline.program}</div>
                          <div className="text-sm text-gray-500">{deadline.description}</div>
                        </div>
                      </div>
                      {!isPast && (
                        <div className="text-sm text-gray-400">
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
                  <p>No upcoming deadlines</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'chat' && (
            <div>
              <div className="border border-gray-200 rounded h-96 overflow-y-auto p-6 mb-4">
                {chatMessages.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-300">
                    <p>Ask a question about funding programs</p>
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
                  className="flex-1 p-4 border border-gray-200 rounded focus:outline-none focus:border-gray-400"
                  disabled={isLoading}
                />
                <button
                  onClick={handleChatSubmit}
                  disabled={isLoading}
                  className="px-8 py-4 bg-black text-white rounded hover:bg-gray-800 transition-colors disabled:opacity-40 text-sm font-medium"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
