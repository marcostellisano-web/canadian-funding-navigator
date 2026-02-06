import React, { useState } from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function NewZealandIncentivesView() {
  const [viewMode, setViewMode] = useState('both');

  const nzFlag = '/flag-new-zealand.svg';

  const nzsipData = {
    title: 'New Zealand Screen Production Grant – International (NZSPG-I)',
    rate: '20% of qualifying NZ spend',
    flag: nzFlag,
    requirements: [
      'Minimum qualifying NZ production expenditure (QNZPE) of NZD $15M',
      'Available for large-budget international feature films and TV series',
      'Must demonstrate significant economic benefit to New Zealand',
      'Administered by the New Zealand Film Commission'
    ],
    bonuses: [
      {
        title: 'Additional 5% Uplift',
        bonus: '25% total rebate',
        description: 'An additional 5% grant may be available for productions that provide significant economic benefits to New Zealand beyond the standard criteria'
      }
    ],
    website: 'https://www.nzfilm.co.nz/incentives/nzspg-international'
  };

  const domesticData = {
    title: 'New Zealand Screen Production Grant – Domestic (NZSPG-NZ)',
    rate: '40% of qualifying NZ spend',
    flag: nzFlag,
    requirements: [
      'Must be a New Zealand production with significant NZ content',
      'Producer must be a New Zealand tax resident',
      'Available for feature film, TV, documentary, and animation',
      'Must have New Zealand cultural content as determined by the NZFC'
    ],
    website: 'https://www.nzfilm.co.nz/incentives/nzspg-nz'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">New Zealand Incentives</h2>
          <p className="text-sm text-gray-500 mt-1">Screen production grants for international and domestic projects</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('both')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === 'both' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Both
            </button>
            <button
              onClick={() => setViewMode('international')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === 'international' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              International
            </button>
            <button
              onClick={() => setViewMode('domestic')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === 'domestic' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Domestic
            </button>
          </div>
        </div>
      </div>

      <div className={`grid ${viewMode === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-6`}>
        {(viewMode === 'both' || viewMode === 'international') && (
          <TaxCreditInfoCard {...nzsipData} />
        )}
        {(viewMode === 'both' || viewMode === 'domestic') && (
          <TaxCreditInfoCard {...domesticData} />
        )}
      </div>
    </div>
  );
}
