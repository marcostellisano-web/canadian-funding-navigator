import React, { useState } from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function FranceIncentivesView() {
  const [viewMode, setViewMode] = useState('both');

  const franceFlag = '/flag-france.svg';

  const ticData = {
    title: 'Tax Rebate for International Production (TRIP)',
    rate: '30% of qualifying French expenditure',
    flag: franceFlag,
    requirements: [
      'Minimum spend of €250,000 in France',
      'Must pass a cultural test administered by the CNC',
      'Available to foreign productions shooting or doing post-production in France',
      'Cap of €30M per project'
    ],
    bonuses: [
      {
        title: 'VFX Bonus',
        bonus: '40% on VFX expenditure',
        description: 'Enhanced rate applies when VFX spend in France exceeds €2M'
      }
    ],
    website: 'https://www.cnc.fr/professionnels/aides-et-financements/cinema/production/credit-dimpot-international--cinema-et-audiovisuel_191578'
  };

  const domesticData = {
    title: 'Crédit d\'Impôt Cinéma (Domestic Tax Credit)',
    rate: '25% of total production expenditure',
    flag: franceFlag,
    requirements: [
      'Available for French-initiated productions and co-productions',
      'Must be produced by a French production company',
      'Film must be made primarily in the French language',
      'Cap of €25M per project'
    ],
    website: 'https://www.cnc.fr/professionnels/aides-et-financements/cinema/production'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">France Incentives</h2>
          <p className="text-sm text-gray-500 mt-1">International and domestic production tax credits</p>
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
              onClick={() => setViewMode('trip')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === 'trip' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              TRIP
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
        {(viewMode === 'both' || viewMode === 'trip') && (
          <TaxCreditInfoCard {...ticData} />
        )}
        {(viewMode === 'both' || viewMode === 'domestic') && (
          <TaxCreditInfoCard {...domesticData} />
        )}
      </div>
    </div>
  );
}
