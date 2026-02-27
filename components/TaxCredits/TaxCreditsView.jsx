import React, { useState } from 'react';
import FederalTaxCreditsView from './FederalTaxCreditsView';
import OntarioTaxCreditsView from './OntarioTaxCreditsView';
import BCTaxCreditsView from './BCTaxCreditsView';
import QuebecTaxCreditsView from './QuebecTaxCreditsView';
import AlbertaTaxCreditsView from './AlbertaTaxCreditsView';
import SaskatchewanTaxCreditsView from './SaskatchewanTaxCreditsView';
import ManitobaTaxCreditsView from './ManitobaTaxCreditsView';
import NovaScotiaTaxCreditsView from './NovaScotiaTaxCreditsView';
import NewfoundlandTaxCreditsView from './NewfoundlandTaxCreditsView';

export default function TaxCreditsView() {
  const [selectedProvince, setSelectedProvince] = useState(null);

  const provinces = [
    { id: 'ontario', name: 'Ontario', available: true, flag: '/flag-ontario.svg' },
    { id: 'bc', name: 'British Columbia', available: true, flag: '/flag-bc.svg' },
    { id: 'quebec', name: 'Quebec', available: true, flag: '/flag-quebec.svg' },
    { id: 'alberta', name: 'Alberta', available: true, flag: '/flag-alberta.svg' },
    { id: 'saskatchewan', name: 'Saskatchewan', available: true, flag: '/flag-saskatchewan.svg' },
    { id: 'manitoba', name: 'Manitoba', available: true, flag: '/flag-manitoba.svg' },
    { id: 'nova-scotia', name: 'Nova Scotia', available: true, flag: '/flag-nova-scotia.svg' },
    { id: 'newfoundland', name: 'Newfoundland & Labrador', available: true, flag: '/flag-newfoundland.svg' }
    // More provinces can be added here in the future
  ];

  if (selectedProvince) {
    return (
      <div>
        <button
          onClick={() => setSelectedProvince(null)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          ← Back to all tax credits
        </button>
        {selectedProvince === 'federal' && <FederalTaxCreditsView />}
        {selectedProvince === 'ontario' && <OntarioTaxCreditsView />}
        {selectedProvince === 'bc' && <BCTaxCreditsView />}
        {selectedProvince === 'quebec' && <QuebecTaxCreditsView />}
        {selectedProvince === 'alberta' && <AlbertaTaxCreditsView />}
        {selectedProvince === 'saskatchewan' && <SaskatchewanTaxCreditsView />}
        {selectedProvince === 'manitoba' && <ManitobaTaxCreditsView />}
        {selectedProvince === 'nova-scotia' && <NovaScotiaTaxCreditsView />}
        {selectedProvince === 'newfoundland' && <NewfoundlandTaxCreditsView />}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Federal Tax Credits */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Federal Tax Credits</h2>
        <p className="text-sm text-gray-500">Canada-wide federal film and video production tax credits</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        <button
          onClick={() => setSelectedProvince('federal')}
          className="p-3 md:p-6 border-2 rounded-lg text-left transition-all bg-white border-gray-200 hover:border-red-400 hover:shadow-md cursor-pointer group"
        >
          <img
            src="/flag-canada.svg"
            alt=""
            className="w-10 h-6 md:w-12 md:h-8 object-cover rounded shadow-sm border border-gray-200 mb-2 md:mb-3"
          />
          <h3 className="text-sm md:text-lg font-semibold mb-1 md:mb-2 text-gray-900 group-hover:text-red-600">
            Canada (Federal)
          </h3>
          <p className="text-xs md:text-sm text-gray-500">View tax credits →</p>
        </button>
      </div>

      {/* Provincial Tax Credits */}
      <div className="pt-2">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Provincial Tax Credits</h2>
        <p className="text-sm text-gray-500">Choose a province to view available tax credit programs</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {provinces.map((province) => (
          <button
            key={province.id}
            onClick={() => province.available && setSelectedProvince(province.id)}
            disabled={!province.available}
            className={`p-3 md:p-6 border-2 rounded-lg text-left transition-all ${
              province.available
                ? 'bg-white border-gray-200 hover:border-red-400 hover:shadow-md cursor-pointer group'
                : 'bg-white border-gray-100 opacity-50 cursor-not-allowed'
            }`}
          >
            {province.flag && (
              <img
                src={province.flag}
                alt=""
                className="w-10 h-6 md:w-12 md:h-8 object-cover rounded shadow-sm border border-gray-200 mb-2 md:mb-3"
              />
            )}
            <h3 className={`text-sm md:text-lg font-semibold mb-1 md:mb-2 ${
              province.available ? 'text-gray-900 group-hover:text-red-600' : 'text-gray-400'
            }`}>
              {province.name}
            </h3>
            <p className="text-xs md:text-sm text-gray-500">
              {province.available ? 'View tax credits →' : 'Coming soon'}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
