import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function BulgariaIncentivesView() {
  const bulgariaFlag = '/flag-bulgaria.svg';

  const taxCreditData = {
    title: 'Bulgarian Cash Rebate',
    rate: '25% cash rebate for international film and TV productions',
    flag: bulgariaFlag,
    requirements: [
      '20% VAT refund is also available within 30 days of your application',
      'Applications are reviewed on a first-come-first-serve basis - annual budget of 4M EUR',
      'The cap of the rebate is set at 1 Million Euros per project'
    ],
    website: 'https://bulgarianfilmconsulting.com/'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Bulgaria Incentives</h2>
          <p className="text-sm text-gray-500 mt-1">Cash rebate for international film and TV productions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxCreditInfoCard {...taxCreditData} />
      </div>
    </div>
  );
}
