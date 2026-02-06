import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function BelgiumIncentivesView() {
  const belgiumFlag = '/flag-belgium.svg';

  const taxShelterData = {
    title: 'Belgium Tax Shelter',
    rate: '38% to 42% of eligible Belgian expenditure',
    flag: belgiumFlag,
    requirements: [
      'Pair with an investor who finances an optimal amount of the EU spend in order to receive a "tax shelter certificate"',
      'The basis for calculating the Tax Shelter benefit and the investment are the eligible direct and indirect audiovisual expenses that the audiovisual work will spend in the European Economic Area (EEA) and in Belgium'
    ],
    bonuses: [
      {
        title: 'Example Calculation',
        bonus: 'Producer takehome ~42% after fees',
        description: [
          'European costs: Costs of €2,000,000',
          'Max Tax Certificate for investor: 70% of EEA spend = €1,400,000',
          'Optimal investment for investor: 48.218% of tax certificate = €675,052',
          'Producer takehome (after fees): ~42% = €588,000'
        ]
      }
    ],
    website: 'https://www.screenflanders.be/en/financing/other-funds-incentives/tax-shelter'
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Belgium Incentives</h2>
        <p className="text-sm text-gray-500 mt-1">Tax Shelter mechanism for audiovisual productions</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxCreditInfoCard {...taxShelterData} />
      </div>
    </div>
  );
}
