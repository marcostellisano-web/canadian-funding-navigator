import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function NewZealandIncentivesView() {
  const nzFlag = '/flag-new-zealand.svg';

  const taxCreditData = {
    title: 'New Zealand Screen Production Rebate',
    rate: '40% cash rebate on Qualifying New Zealand Production Expenditure',
    flag: nzFlag,
    requirements: [
      'Minimum Spend Thresholds: Feature Film - $2.5 million total (NZD); Series (scripted) - $1 million total & no less than $500,000 per hour; Series (unscripted) - No less than $250,000 per hour',
      'Applicants must be a New Zealand resident company or a New Zealand resident partnership',
      'Feature films must have a binding agreement for theatrical distribution in New Zealand and demonstrate audience reach commensurate with the value of the NZSPR. Other formats must have a similar distribution agreement on an appropriate and accessible platforms',
      'Productions must have significant New Zealand content as determined by a points test'
    ],
    website: 'https://www.nzfilm.co.nz/incentives/rebate-nz-nzspr'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">New Zealand Incentives</h2>
          <p className="text-sm text-gray-500 mt-1">Screen production rebate</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxCreditInfoCard {...taxCreditData} />
      </div>
    </div>
  );
}
