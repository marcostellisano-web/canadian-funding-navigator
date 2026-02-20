import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function IllinoisIncentivesView() {
  const usaFlag = '/flag-usa.svg';

  const taxCreditData = {
    title: 'Illinois Film Production Tax Credit',
    rate: '35% credit on Illinois vendor expenses and resident salaries',
    flag: usaFlag,
    requirements: [
      'Eligible productions include feature films, TV series, pilots, movies for television, commercials, and other qualified productions',
      '35% credit on expenses paid to Illinois vendors for tangible personal property or services used in production',
      '35% credit on Illinois resident salaries up to $500,000 per worker',
      '30% credit on non-resident salaries up to $500,000 per worker, capped at 13 non-resident employees (excluding actors)',
      'Non-resident actor cap varies by Illinois spend: up to 4 actors for productions under $20M, up to 5 for $20M–$40M, and up to 6 for productions exceeding $40M',
      'Maximum of 2 executive producers per production are eligible (line producers are exempt from this limit)',
      'Credits may be carried forward for 5 years from the date originally issued',
      'Program is scheduled for legislative renewal in 2039'
    ],
    bonuses: [
      {
        title: 'Economically Disadvantaged Area Bonus',
        bonus: '+15% on qualifying salaries',
        description: [
          'Applies to salaries of individuals who live in economically disadvantaged areas with an unemployment rate of at least 150% of the state\'s annual average',
          'Individual must earn at least $1,000 in total wages from the production to qualify'
        ]
      },
      {
        title: 'Downstate Filming Bonus',
        bonus: '+5% on Illinois resident salaries',
        description: 'Available for productions filming outside of Cook, DuPage, Kane, Lake, McHenry, and Will Counties'
      },
      {
        title: 'Relocating Television Series Bonus',
        bonus: '+5% additional credit',
        description: 'Available to a television series that relocates its production to Illinois'
      },
      {
        title: 'Certified Green Production Bonus',
        bonus: '+5% additional credit',
        description: 'Available to productions that meet sustainability certification requirements set by the Illinois Film Office (IFO) and DCEO as a certified green production'
      }
    ],
    website: 'https://dceo.illinois.gov/whyillinois/film/filmtaxcredit.html'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">US – Illinois Incentives</h2>
          <p className="text-sm text-gray-500 mt-1">Illinois Film Production Tax Credit</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxCreditInfoCard {...taxCreditData} />
      </div>
    </div>
  );
}
