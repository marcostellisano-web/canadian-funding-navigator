import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function SpainIncentivesView() {
  const spainFlag = '/flag-spain.svg';

  const taxCreditData = {
    title: 'Spain Tax Incentive',
    rate: 'Tax rebate up to 30% for the producer of a foreign film or audiovisual production',
    flag: spainFlag,
    requirements: [
      'The minimum expenditure in Spanish territory must be €1M and €200,000 in the case of animation',
      'Qualifying expenses are costs for creative staff, technical industries and other providers',
      'The amount of this tax rebate cannot exceed 10 million per production'
    ],
    bonuses: [
      {
        title: 'Canary Islands',
        bonus: 'Up to 50% deduction',
        description: [
          'Available for audiovisual productions spending a minimum of one million Euros in the Canary Islands',
          'The maximum amount of the tax relief is 18 million euros'
        ]
      }
    ],
    website: 'https://www.cultura.gob.es/en/cultura/areas/cine/industria-cine/coproducir-espa/incentivos-fiscales.html'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Spain Incentives</h2>
          <p className="text-sm text-gray-500 mt-1">Tax incentive for foreign film and audiovisual productions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxCreditInfoCard {...taxCreditData} />
      </div>
    </div>
  );
}
