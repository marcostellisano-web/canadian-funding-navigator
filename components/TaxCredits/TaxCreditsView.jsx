import React, { useState } from 'react';
import OntarioTaxCreditsView from './OntarioTaxCreditsView';
import BCTaxCreditsView from './BCTaxCreditsView';
import QuebecTaxCreditsView from './QuebecTaxCreditsView';
import AlbertaTaxCreditsView from './AlbertaTaxCreditsView';

export default function TaxCreditsView() {
  const [selectedProvince, setSelectedProvince] = useState(null);

  const provinces = [
    { id: 'ontario', name: 'Ontario', available: true, flag: '/flag-ontario.svg' },
    { id: 'bc', name: 'British Columbia', available: true, flag: '/flag-bc.svg' },
    { id: 'quebec', name: 'Quebec', available: true, flag: '/flag-quebec.svg' },
    { id: 'alberta', name: 'Alberta', available: true, flag: '/flag-alberta.svg' }
    // More provinces can be added here in the future
  ];

  if (selectedProvince) {
    return (
      <div>
        <button
          onClick={() => setSelectedProvince(null)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          ← Back to provinces
        </button>
        {selectedProvince === 'ontario' && <OntarioTaxCreditsView />}
        {selectedProvince === 'bc' && <BCTaxCreditsView />}
        {selectedProvince === 'quebec' && <QuebecTaxCreditsView />}
        {selectedProvince === 'alberta' && <AlbertaTaxCreditsView />}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Select a Province</h2>
        <p className="text-sm text-gray-500">Choose a province to view available tax credit programs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {provinces.map((province) => (
          <button
            key={province.id}
            onClick={() => province.available && setSelectedProvince(province.id)}
            disabled={!province.available}
            className={`p-6 border-2 rounded-lg text-left transition-all ${
              province.available
                ? 'bg-white border-gray-200 hover:border-red-400 hover:shadow-md cursor-pointer group'
                : 'bg-white border-gray-100 opacity-50 cursor-not-allowed'
            }`}
          >
            {province.flag && (
              <img
                src={province.flag}
                alt=""
                className="w-12 h-8 object-cover rounded shadow-sm border border-gray-200 mb-3"
              />
            )}
            <h3 className={`text-lg font-semibold mb-2 ${
              province.available ? 'text-gray-900 group-hover:text-red-600' : 'text-gray-400'
            }`}>
              {province.name}
            </h3>
            <p className="text-sm text-gray-500">
              {province.available ? 'View tax credits →' : 'Coming soon'}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
