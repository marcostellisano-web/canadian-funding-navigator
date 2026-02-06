import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function PortugalIncentivesView() {
  const portugalFlag = '/flag-portugal.svg';

  const cashRebateData = {
    title: 'Portugal Film Commission Cash Rebate',
    rate: '25-30% cash rebate on Portuguese spend',
    flag: portugalFlag,
    requirements: [
      'Minimum eligible expenditure of €500,000 in Portugal',
      'Available for international feature films, TV series, documentaries, and animation',
      'Must hire Portuguese crew and use Portuguese facilities/services',
      'Application through the Portugal Film Commission (ICA)'
    ],
    bonuses: [
      {
        title: 'Enhanced Rate',
        bonus: '30% for productions over €1M',
        description: 'Productions with Portuguese expenditure exceeding €1M qualify for the enhanced 30% rebate rate'
      },
      {
        title: 'Regional Filming Bonus',
        bonus: 'Additional regional support',
        description: 'Productions filming in Azores or Madeira may access additional regional incentives and support'
      }
    ],
    website: 'https://www.ica-ip.pt/en/incentives/cash-rebate/'
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Portugal Incentives</h2>
        <p className="text-sm text-gray-500 mt-1">Cash rebate program for international productions</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxCreditInfoCard {...cashRebateData} />
      </div>
    </div>
  );
}
