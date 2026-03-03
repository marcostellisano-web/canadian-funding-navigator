import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function UKIncentivesView() {
  const ukFlag = '/flag-uk.svg';

  const taxCreditData = {
    title: 'UK Audio Visual Expenditure Credit',
    rate: '25.5% on UK qualifying expenditure',
    flag: ukFlag,
    requirements: [
      'Applies to live action film & HETV (25.5%), animation & children\u2019s TV (29.25%), and VFX costs (29.25%)',
      'Must pass a cultural test, scoring at least 18 out of 35 points across cultural content, contribution, hubs, and practitioners',
      'UK qualifying expenditure is defined as costs \u201Cused or consumed\u201D in the UK; above-the-line talent (including actors and directors) qualifies regardless of nationality',
      'Minimum 10% of total core expenditure must be UK spend; credit applies to up to 80% of total core expenditure (no cap on VFX costs)',
      'Film: must demonstrate intention for theatrical release; TV: must be intended for broadcast, including via the internet',
      'HETV: minimum \u00A31 million core expenditure per hour of slot length; each episode must have a slot length greater than 20 minutes',
      'The producing company must be within the UK corporation tax net and responsible for all production phases from pre-production through delivery'
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
