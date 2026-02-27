import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function ItalyIncentivesView() {
  const italyFlag = '/flag-italy.svg';

  const foreignData = {
    title: 'Tax Credit for Foreign Productions',
    rate: '40% of qualifying Italian expenditure',
    flag: italyFlag,
    requirements: [
      'Minimum spend of €200,000 in Italy (features) or €100,000 (TV)',
      'Must use Italian crew, facilities, or locations',
      'Application through the Italian Ministry of Culture (MiC)',
      'Cap of €20M per project'
    ],
    bonuses: [
      {
        title: 'Southern Italy Bonus',
        bonus: 'Additional incentives available',
        description: 'Productions filming in Southern Italy (Mezzogiorno) regions may access additional regional funds'
      }
    ],
    website: 'https://mestierecinema.it/tax-credit-and-funds'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Italy Incentives</h2>
          <p className="text-sm text-gray-500 mt-1">Tax credits for foreign productions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxCreditInfoCard {...foreignData} />
      </div>
    </div>
  );
}
