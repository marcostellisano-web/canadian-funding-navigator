import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function VirginiaIncentivesView() {
  const usaFlag = '/flag-usa.svg';

  const taxCreditData = {
    title: 'Virginia Motion Picture Tax Credit',
    rate: '15% of all qualifying Virginia expenditures (including wages)',
    flag: usaFlag,
    requirements: [
      'Minimum spend of $250,000 in total production costs in the Commonwealth of Virginia',
      'Eligible productions include feature-length films, documentaries, long-form specials, TV mini-series, episodic television series, commercial advertisements, music videos, digital interactive media, and interactive television (30+ minutes)',
      'Qualifying expenditures include Virginia resident salaries/wages, equipment rentals, site fees, set construction, soundstage rental, film processing, and post-production costs performed in Virginia',
      'At least 50% of principal photography days must occur in Virginia',
      'Applications must be submitted at least 30 days before the start of principal photography'
    ],
    bonuses: [
      {
        title: 'Virginia Resident Payroll Credit',
        bonus: 'Up to +20% on Virginia resident payroll',
        description: [
          '10% of Virginia resident aggregate payroll for productions spending $250,000–$1,000,000',
          '20% of Virginia resident aggregate payroll for productions spending over $1,000,000',
          'Applicable to wages paid to Virginia residents working on the production'
        ]
      },
      {
        title: 'First-Time Industry Employee Credit',
        bonus: '+10% on qualifying payroll',
        description: [
          '10% of aggregate payroll for Virginia residents employed as first-time actors or crew members',
          'Encourages workforce development and growth of Virginia\'s local production talent'
        ]
      },
      {
        title: 'Economically Distressed Area Bonus',
        bonus: '+5% enhanced rate',
        description: [
          'Productions filmed in designated economically distressed areas of Virginia qualify for a 20% base credit rate instead of the standard 15%',
          'Contact the Virginia Film Office to confirm if your shooting location qualifies'
        ]
      }
    ],
    website: 'https://www.film.virginia.org/incentives/tax-credit-guidelines/'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">US – Virginia Incentives</h2>
          <p className="text-sm text-gray-500 mt-1">Virginia Motion Picture Tax Credit Program</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxCreditInfoCard {...taxCreditData} />
      </div>
    </div>
  );
}
