import React from 'react';

const stripCMFPrefix = (name) => name.replace(/^CMF\s+/, '');

export default function CMFProgramsList({
  programs,
  onProgramSelect
}) {
  const cmfPrograms = programs.filter(source => source.category === 'CMF');

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cmfPrograms.map(source => (
          <div
            key={source.id}
            onClick={() => onProgramSelect(source)}
            className="bg-white p-6 border-2 border-gray-200 rounded-lg hover:border-red-400 hover:shadow-md transition-all cursor-pointer group"
          >
            <img
              src="/cmf-logo-icon.svg"
              alt=""
              className="w-10 h-10 object-contain mb-3"
            />
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors mb-1">
                  {stripCMFPrefix(source.name)}
                </h3>
                <span className="inline-block px-2 py-0.5 bg-red-50 text-red-700 text-xs rounded font-medium">CMF</span>
              </div>
              <div className="text-gray-400 group-hover:text-red-600 transition-colors">
                →
              </div>
            </div>
            {source.tileDescription && (
              <p className="text-sm text-gray-500">{source.tileDescription}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
