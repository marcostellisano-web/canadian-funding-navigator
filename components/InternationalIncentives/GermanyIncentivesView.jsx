import React, { useState } from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function GermanyIncentivesView() {
  const [viewMode, setViewMode] = useState('both');

  const germanyFlag = '/flag-germany.svg';

  const dfffData = {
    title: 'German Federal Film Fund (DFFF)',
    rate: '20% cash rebate on German spend',
    flag: germanyFlag,
    requirements: [
      'Minimum German spend of €200,000 (features) or €100,000 per episode (TV)',
      'Must pass a cultural test with minimum 48 of 100 points',
      'Available for feature films, documentaries, and animation',
      'Cap of €4M per project (DFFF I) or €10M (DFFF II for budgets over €8M)'
    ],
    bonuses: [
      {
        title: 'DFFF II (High-Budget)',
        bonus: '20% rebate, cap of €10M',
        description: 'For productions with German expenditure of at least €8M, with additional funding available'
      }
    ],
    website: 'https://www.ffa.de/dfff-i-and-dfff-ii.html'
  };

  const gmpfData = {
    title: 'German Motion Picture Fund (GMPF)',
    rate: '25% cash rebate on German spend',
    flag: germanyFlag,
    requirements: [
      'For high-budget international productions with German spend of €5M+',
      'Available for theatrical features and high-end TV series',
      'Must demonstrate significant cultural and economic impact',
      'Subject to available annual fund allocation'
    ],
    website: 'https://www.ffa.de/german-motion-picture-fund.html'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Germany Incentives</h2>
          <p className="text-sm text-gray-500 mt-1">Federal film fund and motion picture fund rebates</p>
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
              onClick={() => setViewMode('dfff')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === 'dfff' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              DFFF
            </button>
            <button
              onClick={() => setViewMode('gmpf')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === 'gmpf' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              GMPF
            </button>
          </div>
        </div>
      </div>

      <div className={`grid ${viewMode === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-6`}>
        {(viewMode === 'both' || viewMode === 'dfff') && (
          <TaxCreditInfoCard {...dfffData} />
        )}
        {(viewMode === 'both' || viewMode === 'gmpf') && (
          <TaxCreditInfoCard {...gmpfData} />
        )}
      </div>
    </div>
  );
}
