import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function TennesseeIncentivesView() {
  const usaFlag = '/flag-usa.svg';

  const taxCreditData = {
    title: 'Tennessee Entertainment Grant',
    rate: '25% cash rebate on qualified Tennessee expenditures',
    flag: usaFlag,
    requirements: [
      'Minimum spend of $500,000 per project or per episode in qualified Tennessee expenditures',
      'Eligible productions include feature films, TV pilots, and scripted TV series',
      'Qualifying expenditures include payments to Tennessee vendors for goods and services, resident wages/salaries/per diem/fringe benefits (capped at first $500,000 per resident), and non-resident labour (first $250,000, pending approvals)',
      'Production must enter into a Grant Contract with the Tennessee Department of Economic and Community Development before production begins',
      'Expenditures incurred before the contractually assigned Effective Date will not qualify',
      'Any expenses exceeding projected amounts must be approved in writing prior to being incurred',
      'A CPA audit of qualified expenditures is required',
      'A screen credit for Tennessee is required',
      'Funding is subject to annual appropriations by the Tennessee State Legislature and available state funds'
    ],
    bonuses: [],
    website: 'https://www.createtn.com/ent/film/incentives/grant'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">US – Tennessee Incentives</h2>
          <p className="text-sm text-gray-500 mt-1">Tennessee Entertainment Grant</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxCreditInfoCard {...taxCreditData} />
      </div>
    </div>
  );
}
