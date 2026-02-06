import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function IrelandIncentivesView() {
  const irelandFlag = '/flag-ireland.svg';

  const section481Data = {
    title: 'Section 481 Film Tax Credit',
    rate: '32% of eligible Irish expenditure',
    flag: irelandFlag,
    requirements: [
      'Minimum eligible expenditure of €250,000',
      'Must be certified as a qualifying film by Revenue',
      'Available for feature film, TV drama, animation, and creative documentaries',
      'The producer company must be resident in Ireland or an EEA state',
      'Maximum eligible expenditure of €70M per project'
    ],
    bonuses: [
      {
        title: 'Regional Uplift',
        bonus: '+5% additional (total 37%)',
        description: 'Available for productions with at least 50% of principal photography days in designated regional areas outside Dublin and Wicklow'
      },
      {
        title: 'VFX/Animation Uplift',
        bonus: '+5% additional on VFX spend',
        description: 'Available for qualifying VFX and animation expenditure above €2M'
      }
    ],
    website: 'https://www.screenireland.ie/filming/section-481'
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Ireland Incentives</h2>
        <p className="text-sm text-gray-500 mt-1">Section 481 film and television tax credit</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxCreditInfoCard {...section481Data} />
      </div>
    </div>
  );
}
