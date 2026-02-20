import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function KentuckyIncentivesView() {
  const usaFlag = '/flag-usa.svg';

  const taxCreditData = {
    title: 'Kentucky Entertainment Incentive (KEI)',
    rate: '30–35% refundable credit on qualified Kentucky expenditures',
    flag: usaFlag,
    requirements: [
      'Eligible productions include feature-length films, television programs, documentaries, Broadway shows, and industrial film projects',
      '35% credit on Kentucky resident (in-state) labor costs',
      '30% credit on approved production expenditures and out-of-state labor costs',
      'Minimum in-state spend for feature films, TV programs, and industrial films: $125,000 for Kentucky-based companies; $250,000 for out-of-state companies',
      'Minimum in-state spend for documentaries: $10,000 for Kentucky-based companies; $20,000 for out-of-state companies',
      'Minimum in-state spend for national touring Broadway shows: $20,000 for both Kentucky-based and out-of-state companies',
      'Maximum credit per single project is $10 million; total annual program cap is $75 million',
      'Credits are refundable and nontransferable; unused credits may not be carried forward',
      'Application must be filed at least 30 days before incurring any qualified expenditures',
      'Production must begin filming within 6 months of filing the application and complete within 2 years of the start date',
      'Applicant must certify that the production would not occur in Kentucky without the incentive',
      'Ineligible expenses include vendor payments outside Kentucky, airfare, legal and accounting fees, insurance, and online purchases',
      'Applications are ranked and prioritized based on number of Kentucky jobs created, Kentucky resident employment, and percentage of spend going to Kentucky-based vendors'
    ],
    bonuses: [
      {
        title: 'Enhanced Incentive Counties Bonus',
        bonus: '+5% (up to 35% total)',
        description: 'Productions filming in designated Enhanced Incentive Counties may qualify for the 35% credit rate on all approved expenditures, not just in-state labor'
      }
    ],
    website: 'https://newkentuckyhome.ky.gov/Locating_Expanding/KEI'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">US – Kentucky Incentives</h2>
          <p className="text-sm text-gray-500 mt-1">Kentucky Entertainment Incentive (KEI) Program</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxCreditInfoCard {...taxCreditData} />
      </div>
    </div>
  );
}
