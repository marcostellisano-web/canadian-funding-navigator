import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function UKIncentivesView() {
  const ukFlag = '/flag-uk.svg';

  const taxCreditData = {
    title: 'UK Audio Visual Expenditure Credit',
    rate: '25% on UK qualifying expenditure',
    flag: ukFlag,
    requirements: [
      'UK expenditure defined as expenditure on goods/services \u201Cused or consumed\u201D in the UK',
      'The TV minimum expenditure test remains at \u00A31 million of core expenditure per hour of slot length',
      'Above-the-line, including actors and directors, is included, irrespective of nationality',
      'Must pass a cultural test',
      'There must be an intention for theatrical release'
    ],
    website: 'https://britishfilmcommission.org.uk/plan-your-production/accessing-uk-tax-reliefs/'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">United Kingdom Incentives</h2>
          <p className="text-sm text-gray-500 mt-1">Audio visual expenditure credit</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxCreditInfoCard {...taxCreditData} />
      </div>
    </div>
  );
}
