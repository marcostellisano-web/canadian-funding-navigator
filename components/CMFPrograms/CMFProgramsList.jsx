import React from 'react';
import { Search, X } from 'lucide-react';

const stripCMFPrefix = (name) => name.replace(/^CMF\s+/, '');

export default function CMFProgramsList({
  programs,
  searchQuery,
  setSearchQuery,
  onProgramSelect
}) {
  const filteredSources = programs.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch && source.category === 'CMF';
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

  return (
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
      </div>

      <div className="space-y-8">
        {categoryOrder.map(categoryName => {
          const categorySources = groupedSources[categoryName] || [];
          if (categorySources.length === 0) return null;

          return (
            <div key={categoryName}>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                {categoryName}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySources.map(source => (
                  <div
                    key={source.id}
                    onClick={() => onProgramSelect(source)}
                    className="bg-white p-6 border-2 border-gray-200 rounded-lg hover:border-red-400 hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors mb-1">
                          {stripCMFPrefix(source.name)}
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
    </div>
  );
}
