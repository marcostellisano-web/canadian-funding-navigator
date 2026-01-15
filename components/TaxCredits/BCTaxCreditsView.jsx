import React, { useState } from 'react';
import TaxCreditInfoCard from './TaxCreditInfoCard';

export default function BCTaxCreditsView() {
  const [viewMode, setViewMode] = useState('both'); // 'both', 'fibc', 'pstc'

  const fibcData = {
    title: 'Film Incentive B.C. (FIBC)',
    rate: '40% of B.C. labour expenditures',
    requirements: [
      'At least 75% of principal photography days must be done in British Columbia',
      'Minimum 75% of goods and services must be spent on B.C. expenditures',
      'Post-production work (excluding stock footage) must be carried out in British Columbia'
    ],
    bonuses: [
      {
        title: 'Regional Bonus',
        bonus: '+12.5%',
        description: [
          'Applied to B.C. labour expenditures pro-rated based on days filmed outside the designated Vancouver area',
          'Over 50% of the B.C. principal photography days must be outside the designated Vancouver area'
        ]
      },
      {
        title: 'Distant Location Bonus',
        bonus: '+6%',
        description: [
          'Applied to B.C. labour expenditures pro-rated based on days filmed in a distant location',
          'Production must qualify for the Regional bonus',
          'Must have at least 1 principal photography day in a distant location'
        ]
      }
    ],
    website: 'https://creativebc.com/motion-picture-tax-credits/film-incentive-bc/'
  };

  const pstcData = {
    title: 'B.C. Production Services Tax Credit (PSTC)',
    rate: '36% of B.C. labour expenditures',
    requirements: [
      'Available if a project does not qualify for the FIBC'
    ],
    episodeMinimums: [
      'Episodes with running time less than 30 minutes: minimum $100,000 per episode',
      'Episodes with running time of 30 minutes or more: minimum $200,000 per episode'
    ],
    bonuses: [
      {
        title: 'Regional Bonus',
        bonus: '+6%',
        description: [
          'Applied to B.C. labour expenditures pro-rated based on days filmed outside the designated Vancouver area',
          'Over 50% of the B.C. principal photography days must be outside the designated Vancouver area'
        ]
      },
      {
        title: 'Distant Location Bonus',
        bonus: '+6%',
        description: [
          'Applied to B.C. labour expenditures pro-rated based on days filmed in a distant location',
          'Production must qualify for the Regional bonus',
          'Must have at least 1 principal photography day in a distant location'
        ]
      }
    ],
    website: 'https://creativebc.com/motion-picture-tax-credits/production-services-tax-credit/'
  };

  return (
    <div className="space-y-6">
      {/* Header with View Toggle */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">British Columbia Tax Credits</h2>
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
            onClick={() => setViewMode('fibc')}
            className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
              viewMode === 'fibc'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            FIBC
          </button>
          <button
            onClick={() => setViewMode('pstc')}
            className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
              viewMode === 'pstc'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            PSTC
          </button>
        </div>
      </div>

      {/* Tax Credits Display */}
      <div className={`grid ${viewMode === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-6`}>
        {(viewMode === 'both' || viewMode === 'fibc') && (
          <TaxCreditInfoCard {...fibcData} />
        )}
        {(viewMode === 'both' || viewMode === 'pstc') && (
          <TaxCreditInfoCard {...pstcData} />
        )}
      </div>
    </div>
  );
}
