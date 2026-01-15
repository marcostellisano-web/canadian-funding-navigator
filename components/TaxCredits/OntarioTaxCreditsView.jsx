import React, { useState } from 'react';
import TaxCreditInfoCard from './TaxCreditInfoCard';

export default function OntarioTaxCreditsView() {
  const [viewMode, setViewMode] = useState('both'); // 'both', 'ofttc', 'opstc'

  const ofttcData = {
    title: 'Ontario Film & Television Tax Credit (OFTTC)',
    rate: '35% of Ontario labour expenditures',
    requirements: [
      'Minimum 75% of goods and services must be spent on Ontario expenditures',
      'Minimum 95% of post-production costs must be incurred in Ontario'
    ],
    regionalBonus: {
      description: '• Productions shot entirely outside the Greater Toronto Area, or with at least 85% of Ontario location days outside the GTA can qualify for this bonus',
      bonus: '+10% bonus',
      detail: '(total 45% on all eligible Ontario labour expenditures)'
    },
    website: 'https://www.ontariocreates.ca/tax-incentives/ofttc',
    regionalBonusLink: 'https://www.ontariocreates.ca/regional-bonus-locations'
  };

  const opstcData = {
    title: 'Ontario Production Services Tax Credit (OPSTC)',
    rate: '21.5% of all qualifying production expenditures',
    requirements: [
      'Available if a project does not qualify for the OFTTC',
      'Regional bonus does not apply to this credit'
    ],
    episodeMinimums: [
      'Episodes with running time less than 30 minutes: minimum $100,000 per episode',
      'Episodes with running time of 30 minutes or more: minimum $200,000 per episode'
    ],
    website: 'https://www.ontariocreates.ca/our-sectors/film-tv/business-initiatives/ontario-production-services-tax-credit-opstc'
  };

  return (
    <div className="space-y-6">
      {/* Header with View Toggle */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Ontario Tax Credits</h2>
          <p className="text-sm text-gray-500 mt-1">Two distinct tax credit programs available</p>
        </div>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('both')}
            className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
              viewMode === 'both'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Both
          </button>
          <button
            onClick={() => setViewMode('ofttc')}
            className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
              viewMode === 'ofttc'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            OFTTC
          </button>
          <button
            onClick={() => setViewMode('opstc')}
            className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
              viewMode === 'opstc'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            OPSTC
          </button>
        </div>
      </div>

      {/* Tax Credits Display */}
      <div className={`grid ${viewMode === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-6`}>
        {(viewMode === 'both' || viewMode === 'ofttc') && (
          <TaxCreditInfoCard {...ofttcData} />
        )}
        {(viewMode === 'both' || viewMode === 'opstc') && (
          <TaxCreditInfoCard {...opstcData} />
        )}
      </div>
    </div>
  );
}
