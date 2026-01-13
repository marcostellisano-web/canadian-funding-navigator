import React, { useState, useEffect } from 'react';
import { Search, Download, MessageSquare, Calendar, Loader2, X, Settings, Edit, Trash2, Plus, Save } from 'lucide-react';

export default function Home() {
  const [programs, setPrograms] = useState([]);
  const [selectedFunding, setSelectedFunding] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingProgram, setEditingProgram] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'CMF',
    organization: '',
    description: '',
    eligibility: '',
    fundingRange: '',
    deadlines: '',
    website: '',
    tags: '',
    keyPoints: '',
    upcomingDeadlines: ''
  });

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

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const filteredSources = programs.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = categoryFilter === 'all' || source.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Group programs by category
  const groupedSources = filteredSources.reduce((acc, source) => {
    const category = source.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(source);
    return acc;
  }, {});

  // Define category order
  const categoryOrder = ['CMF', 'Canadian Tax Credits', 'Other'];

  const totalDeadlines = programs.flatMap(s => s.upcomingDeadlines || []).length;
  const upcomingDeadlines = programs.flatMap(s => s.upcomingDeadlines || [])
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

  const handleDeleteProgram = async (id) => {
    if (!confirm('Are you sure you want to delete this program?')) return;

    try {
      const response = await fetch(`/api/programs/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await fetchPrograms();
        alert('Program deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting program:', error);
      alert('Failed to delete program');
    }
  };

  const handleEditProgram = (program) => {
    setEditingProgram(program);
    setIsAddingNew(false);
    setFormData({
      name: program.name,
      category: program.category,
      organization: program.organization,
      description: program.description,
      eligibility: program.eligibility,
      fundingRange: program.fundingRange,
      deadlines: program.deadlines,
      website: program.website,
      tags: program.tags.join(', '),
      keyPoints: program.keyPoints.join('\n'),
      upcomingDeadlines: JSON.stringify(program.upcomingDeadlines, null, 2)
    });
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingProgram(null);
    setFormData({
      name: '',
      category: 'CMF',
      organization: '',
      description: '',
      eligibility: '',
      fundingRange: '',
      deadlines: '',
      website: '',
      tags: '',
      keyPoints: '',
      upcomingDeadlines: '[]'
    });
  };

  const handleCancelEdit = () => {
    setEditingProgram(null);
    setIsAddingNew(false);
  };

  const handleSaveProgram = async (e) => {
    e.preventDefault();

    try {
      // Validate and parse upcomingDeadlines JSON
      let upcomingDeadlines = [];
      if (formData.upcomingDeadlines && formData.upcomingDeadlines.trim()) {
        try {
          upcomingDeadlines = JSON.parse(formData.upcomingDeadlines);
          if (!Array.isArray(upcomingDeadlines)) {
            alert('Upcoming Deadlines must be an array. Example: [{"date": "2025-05-22", "description": "Spring Intake"}]');
            return;
          }
        } catch (jsonError) {
          alert('Invalid JSON format for Upcoming Deadlines.\n\nError: ' + jsonError.message + '\n\nPlease use the format shown in the example below the field.');
          return;
        }
      }

      const programData = {
        name: formData.name,
        category: formData.category,
        organization: formData.organization,
        description: formData.description,
        eligibility: formData.eligibility,
        fundingRange: formData.fundingRange,
        deadlines: formData.deadlines,
        website: formData.website,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
        keyPoints: formData.keyPoints.split('\n').map(t => t.trim()).filter(t => t),
        upcomingDeadlines: upcomingDeadlines
      };

      let response;
      if (editingProgram) {
        response = await fetch(`/api/programs/${editingProgram.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(programData)
        });
      } else {
        response = await fetch('/api/programs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(programData)
        });
      }

      if (response.ok) {
        await fetchPrograms();
        handleCancelEdit();
        alert(editingProgram ? 'Program updated successfully' : 'Program created successfully');
      } else {
        const errorData = await response.json().catch(() => ({}));
        let errorMessage = errorData.error || `Failed to save program (Status: ${response.status})`;
        if (errorData.details) {
          errorMessage += `\nDetails: ${errorData.details}`;
        }
        if (errorData.code) {
          errorMessage += `\nError code: ${errorData.code}`;
        }
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error saving program:', error);
      alert('Failed to save program: ' + error.message);
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
        </div>
      </header>

      {/* Hero Section */}
      <div className="border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-sm max-w-2xl font-['Radnika_Next',sans-serif]">
            <span className="text-[#ff5757] font-semibold">Navigate Canadian film & TV funding</span> with AI-powered guidance for your project.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
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

        {activeTab === 'browse' && (
          <div>
            <div className="mb-8 space-y-4">
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

              <div className="flex gap-3">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    categoryFilter === 'all'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All Programs
                </button>
                <button
                  onClick={() => setCategoryFilter('CMF')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    categoryFilter === 'CMF'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  CMF
                </button>
                <button
                  onClick={() => setCategoryFilter('Canadian Tax Credits')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    categoryFilter === 'Canadian Tax Credits'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Canadian Tax Credits
                </button>
              </div>
            </div>

            {!selectedFunding ? (
              <div className="space-y-8">
                {categoryOrder.map(categoryName => {
                  const categorySources = groupedSources[categoryName] || [];
                  if (categorySources.length === 0) return null;

                  return (
                    <div key={categoryName}>
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                        {categoryName}
                      </h2>
                      <div className="grid gap-4">
                        {categorySources.map(source => (
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
                      </div>
                    </div>
                  );
                })}
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
            )}
          </div>
        )}

        {activeTab === 'calendar' && (
          <div>
            <div className="space-y-3">
              {programs.flatMap(source => 
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

            {programs.flatMap(s => s.upcomingDeadlines || []).length === 0 && (
              <div className="text-center py-20 text-gray-300">
                <Calendar size={48} className="mx-auto mb-4 opacity-30" />
                <p>No upcoming deadlines</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'admin' && showAdmin && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Manage Programs</h2>
              {!isAddingNew && !editingProgram && (
                <button
                  onClick={handleAddNew}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  <Plus size={16} />
                  Add New Program
                </button>
              )}
            </div>

            {(isAddingNew || editingProgram) ? (
              <form onSubmit={handleSaveProgram} className="space-y-6 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingProgram ? 'Edit Program' : 'Add New Program'}
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Program Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
                  >
                    <option value="CMF">CMF</option>
                    <option value="Canadian Tax Credits">Canadian Tax Credits</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Eligibility / Requirements
                  </label>
                  <textarea
                    rows={2}
                    value={formData.eligibility}
                    onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Funding Range *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fundingRange}
                    onChange={(e) => setFormData({ ...formData, fundingRange: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deadlines *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.deadlines}
                    onChange={(e) => setFormData({ ...formData, deadlines: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
                    placeholder="e.g., May and September intake periods"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
                    placeholder="Documentary, English, Quebec"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Points (one per line)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.keyPoints}
                    onChange={(e) => setFormData({ ...formData, keyPoints: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
                    placeholder="Enter each key point on a new line"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upcoming Deadlines (JSON format)
                  </label>
                  <p className="text-xs text-gray-500 mb-2">
                    Format: Array of objects with "date" (YYYY-MM-DD) and "description" fields
                  </p>
                  <textarea
                    rows={6}
                    value={formData.upcomingDeadlines}
                    onChange={(e) => setFormData({ ...formData, upcomingDeadlines: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100 font-mono text-sm"
                    placeholder={`Example:
[
  { "date": "2025-05-22", "description": "Spring Intake Period" },
  { "date": "2025-09-15", "description": "Fall Intake Period" }
]

For no deadlines, use: []`}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    <Save size={16} />
                    {editingProgram ? 'Update Program' : 'Create Program'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-3">
                {programs.map(program => (
                  <div
                    key={program.id}
                    className="p-5 border border-gray-200 rounded-lg hover:border-gray-300 transition-all bg-white"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{program.name}</h3>
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            {program.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{program.organization}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{program.description}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEditProgram(program)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Edit program"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteProgram(program.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete program"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {programs.length === 0 && (
                  <div className="text-center py-12 text-gray-400">
                    <Settings size={48} className="mx-auto mb-4 opacity-30" />
                    <p>No programs yet</p>
                    <p className="text-sm mt-2">Click "Add New Program" to get started</p>
                  </div>
                )}
              </div>
            )}
          </div>
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
