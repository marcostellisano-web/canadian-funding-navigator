import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function FranceIncentivesView() {
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
    website: 'https://www.filmfrance.net/en/tax-rebate/tax-rebate-for-international-productions/'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">France Incentives</h2>
          <p className="text-sm text-gray-500 mt-1">International production tax rebate</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxCreditInfoCard {...ticData} />
      </div>
    </div>
  );
}
