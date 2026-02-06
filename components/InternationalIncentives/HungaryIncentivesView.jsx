import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function HungaryIncentivesView() {
  const hungaryFlag = '/flag-hungary.svg';

  const rebateData = {
    title: 'Hungarian Tax Rebate',
    rate: '30% of the eligible Hungarian spend',
    flag: hungaryFlag,
    requirements: [
      'No minimum spend and no cap per project',
      'No annual fiscal budget cap',
      'Foreign companies and/or producers should conclude co-production or service agreements with a Hungarian registered company',
      'All films shall meet the cultural test criteria (cultural test) which follows the usual format for European cultural tests',
      'VAT is fully recoverable on all goods and services of the production'
    ],
    bonuses: [
      {
        title: 'Non-Hungarian Spend Eligibility',
        bonus: 'Up to 25% of eligible spend',
        description: 'Up to 25% of the eligible spend can be non-Hungarian spend which also qualifies for the 30% tax rebate'
      }
    ],
    website: 'https://hungariantaxcredit.com/'
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Hungary Incentives</h2>
        <p className="text-sm text-gray-500 mt-1">Tax rebate is 30% of the eligible Hungarian spend</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxCreditInfoCard {...rebateData} />
      </div>
    </div>
  );
}
