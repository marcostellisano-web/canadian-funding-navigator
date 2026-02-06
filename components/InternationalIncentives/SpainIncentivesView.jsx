import React, { useState } from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function SpainIncentivesView() {
  const [viewMode, setViewMode] = useState('both');

  const spainFlag = '/flag-spain.svg';

  const foreignData = {
    title: 'Tax Incentive for Foreign Productions',
    rate: '30% on first €1M + 25% above',
    flag: spainFlag,
    requirements: [
      'Minimum spend of €1M in Spain',
      'Available for feature films, TV series, and animation',
      'Must be produced by a foreign production company with a Spanish service producer',
      'Cap of €20M per production'
    ],
    bonuses: [
      {
        title: 'Canary Islands Bonus',
        bonus: '50% on first €1M + 45% above',
        description: 'Significantly enhanced rates for productions filming in the Canary Islands, one of the highest incentives in Europe'
      }
    ],
    website: 'https://www.spainfilmcommission.org/en/incentives'
  };

  const domesticData = {
    title: 'Spanish Domestic Production Tax Credit',
    rate: '30% on first €1M + 25% above',
    flag: spainFlag,
    requirements: [
      'Must be produced by a Spanish tax-resident company',
      'Available for feature films, short films, TV series, and animation',
      'Must obtain a cultural certificate from the ICAA',
      'Minimum 50% of the production must take place in Spain'
    ],
    bonuses: [
      {
        title: 'Canary Islands Domestic Bonus',
        bonus: '50% on first €1M + 45% above',
        description: 'Enhanced rates available for domestic productions in the Canary Islands'
      }
    ],
    website: 'https://www.spainfilmcommission.org/en/incentives'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Spain Incentives</h2>
          <p className="text-sm text-gray-500 mt-1">Tax incentives with enhanced Canary Islands rates</p>
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
              onClick={() => setViewMode('foreign')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === 'foreign' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Foreign
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
        {(viewMode === 'both' || viewMode === 'foreign') && (
          <TaxCreditInfoCard {...foreignData} />
        )}
        {(viewMode === 'both' || viewMode === 'domestic') && (
          <TaxCreditInfoCard {...domesticData} />
        )}
      </div>
    </div>
  );
}
