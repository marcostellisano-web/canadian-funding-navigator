import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function HungaryIncentivesView() {
  const hungaryFlag = '/flag-hungary.svg';

  const rebateData = {
    title: 'Hungarian Film Incentive',
    rate: '30% cash rebate on qualifying spend',
    flag: hungaryFlag,
    requirements: [
      'Minimum qualifying Hungarian spend of HUF 100M (~€250,000)',
      'Available for feature films, TV series, animation, documentaries, and post-production',
      'Must be approved by the Hungarian National Film Fund (NFI)',
      'No cap on eligible expenditure',
      'Includes above-the-line and below-the-line costs incurred in Hungary'
    ],
    bonuses: [
      {
        title: 'Additional 25% Corporate Tax Deduction',
        bonus: 'Up to 25% extra for investors',
        description: 'Hungarian corporate taxpayers can receive an additional tax deduction of up to 25% of their contribution to the film fund, making the effective incentive even higher for locally structured deals'
      }
    ],
    website: 'https://nfi.hu/en/film-incentive'
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Hungary Incentives</h2>
        <p className="text-sm text-gray-500 mt-1">One of Europe's most competitive film rebate programs</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxCreditInfoCard {...rebateData} />
      </div>
    </div>
  );
}
