import React, { useState } from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function AustraliaIncentivesView() {
  const [viewMode, setViewMode] = useState('both');

  const australiaFlag = '/flag-australia.svg';

  const locationOffsetData = {
    title: 'Location Offset',
    rate: '16.5% of qualifying Australian expenditure',
    flag: australiaFlag,
    requirements: [
      'Minimum qualifying Australian production expenditure (QAPE) of AUD $15M',
      'Available for large-budget foreign productions filming in Australia',
      'Must complete an approved significant Australian content test',
      'Administered by Screen Australia and the Australian Tax Office'
    ],
    website: 'https://www.screenaustralia.gov.au/funding-and-support/producer-offset/location-offset'
  };

  const producerOffsetData = {
    title: 'Producer Offset',
    rate: '30% (features) / 20% (other formats)',
    flag: australiaFlag,
    requirements: [
      'Must have significant Australian content (SAC test)',
      'Producer must be an Australian resident company',
      '30% for theatrical features, 20% for TV and other formats',
      'No minimum or maximum expenditure threshold',
      'Available for feature film, TV, documentary, and animation'
    ],
    bonuses: [
      {
        title: 'PDV Offset (Post/VFX)',
        bonus: '30% on post, digital, and VFX work',
        description: 'Available for post-production, digital, and visual effects work done in Australia with minimum QAPE of AUD $500,000'
      }
    ],
    website: 'https://www.screenaustralia.gov.au/funding-and-support/producer-offset'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Australia Incentives</h2>
          <p className="text-sm text-gray-500 mt-1">Location offset and producer offset programs</p>
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
              onClick={() => setViewMode('location')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === 'location' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Location
            </button>
            <button
              onClick={() => setViewMode('producer')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === 'producer' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Producer
            </button>
          </div>
        </div>
      </div>

      <div className={`grid ${viewMode === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-6`}>
        {(viewMode === 'both' || viewMode === 'location') && (
          <TaxCreditInfoCard {...locationOffsetData} />
        )}
        {(viewMode === 'both' || viewMode === 'producer') && (
          <TaxCreditInfoCard {...producerOffsetData} />
        )}
      </div>
    </div>
  );
}
