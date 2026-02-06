import React, { useState } from 'react';
import { Download } from 'lucide-react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function UKIncentivesView() {
  const [viewMode, setViewMode] = useState('both');

  const ukFlag = '/flag-uk.svg';

  const filmTaxReliefData = {
    title: 'Audio Visual Expenditure Credit (AVEC)',
    rate: '34% of qualifying UK expenditure',
    flag: ukFlag,
    requirements: [
      'Must pass the BFI cultural test or qualify as an official co-production',
      'Minimum 10% of core expenditure must be UK expenditure',
      'Must be intended for theatrical release or broadcast',
      'Available for film, high-end TV, animation, and children\'s TV'
    ],
    bonuses: [
      {
        title: 'Independent Film Tax Credit (IFTC)',
        bonus: '39% for qualifying independent films',
        description: 'Available for films with a core expenditure of £15M or less that are not studio-backed'
      }
    ],
    website: 'https://www.bfi.org.uk/apply-british-certification-tax-relief'
  };

  const vfxReliefData = {
    title: 'Visual Effects Expenditure Credit (VFX)',
    rate: '39% on qualifying VFX expenditure',
    flag: ukFlag,
    requirements: [
      'Applies to UK VFX costs on qualifying film and HETV productions',
      'No minimum UK spend requirement for the VFX credit',
      'Available as an additional relief on top of AVEC',
      'Must be on a production already claiming AVEC or IFTC'
    ],
    website: 'https://www.bfi.org.uk/apply-british-certification-tax-relief'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">United Kingdom Incentives</h2>
          <p className="text-sm text-gray-500 mt-1">Audio visual and VFX expenditure credits</p>
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
              onClick={() => setViewMode('avec')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === 'avec' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              AVEC
            </button>
            <button
              onClick={() => setViewMode('vfx')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === 'vfx' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              VFX
            </button>
          </div>
        </div>
      </div>

      <div className={`grid ${viewMode === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-6`}>
        {(viewMode === 'both' || viewMode === 'avec') && (
          <TaxCreditInfoCard {...filmTaxReliefData} />
        )}
        {(viewMode === 'both' || viewMode === 'vfx') && (
          <TaxCreditInfoCard {...vfxReliefData} />
        )}
      </div>
    </div>
  );
}
