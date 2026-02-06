import React, { useState } from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function ItalyIncentivesView() {
  const [viewMode, setViewMode] = useState('both');

  const italyFlag = '/flag-italy.svg';

  const foreignData = {
    title: 'Tax Credit for Foreign Productions',
    rate: '40% of qualifying Italian expenditure',
    flag: italyFlag,
    requirements: [
      'Minimum spend of €200,000 in Italy (features) or €100,000 (TV)',
      'Must use Italian crew, facilities, or locations',
      'Application through the Italian Ministry of Culture (MiC)',
      'Cap of €20M per project'
    ],
    bonuses: [
      {
        title: 'Southern Italy Bonus',
        bonus: 'Additional incentives available',
        description: 'Productions filming in Southern Italy (Mezzogiorno) regions may access additional regional funds'
      }
    ],
    website: 'https://cinema.cultura.gov.it/en/'
  };

  const domesticData = {
    title: 'Tax Credit for Italian Productions',
    rate: '40% of production costs',
    flag: italyFlag,
    requirements: [
      'Must be produced by an Italian production company',
      'Must meet Italian cultural test requirements',
      'Available for feature films, TV series, documentaries, and animation',
      'Cap of €20M per project for films, €10M for TV'
    ],
    website: 'https://cinema.cultura.gov.it/en/'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Italy Incentives</h2>
          <p className="text-sm text-gray-500 mt-1">Tax credits for foreign and domestic productions</p>
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
