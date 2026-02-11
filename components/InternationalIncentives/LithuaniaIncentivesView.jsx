import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function LithuaniaIncentivesView() {
  const lithuaniaFlag = '/flag-lithuania.svg';

  const taxIncentiveData = {
    title: 'Lithuania Film Tax Incentive',
    rate: 'Up to 30% of the film production budget through private investment scheme',
    flag: lithuaniaFlag,
    requirements: [
      'Total eligible spend in Lithuania must be no less than €43,000',
      'At least 80% of eligible production costs must occur in Lithuania',
      'Minimum three days of shooting in Lithuania (except animation)',
      'At least 51% of crew must be Lithuanian or EEA citizens',
      'Must meet cultural content standards addressing European culture, history, or themes',
      'Foreign filmmakers must partner with a local Lithuanian production company'
    ],
    bonuses: [
      {
        title: 'Animation Projects',
        bonus: '20% of production costs in Lithuania',
        description: 'For animated films, at least 20% of production costs must be spent in Lithuania on design, layouts, visual effects, and animation production'
      }
    ],
    website: 'https://www.lkc.lt/en/tax-incentives/how-it-works'
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Lithuania Incentives</h2>
        <p className="text-sm text-gray-500 mt-1">Film tax incentive through private investment scheme</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxCreditInfoCard {...taxIncentiveData} />
      </div>
    </div>
  );
}
