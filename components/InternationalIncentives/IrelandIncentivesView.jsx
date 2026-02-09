import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function IrelandIncentivesView() {
  const irelandFlag = '/flag-ireland.svg';

  const taxCreditData = {
    title: 'Screen Ireland Film and Television Tax Credit',
    rate: 'Up to 32% of eligible Irish expenditure',
    flag: irelandFlag,
    requirements: [
      "Projects are excluded from the incentive if their 'eligible expenditure' is less than €125,000, or the total cost of production is less than €250,000",
      'Eligible expenditure: all goods and services while filming in Ireland, and all cast and crew regardless of nationality',
      'This application must be made to the Minister at least 21 working days prior to the commencement of Irish production',
      'Must pass a cultural test as part of the registration process'
    ],
    website: 'https://filminireland.com/irish-film-tax-incentive/'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Ireland Incentives</h2>
          <p className="text-sm text-gray-500 mt-1">Screen Ireland film and television tax credit</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxCreditInfoCard {...taxCreditData} />
      </div>
    </div>
  );
}
