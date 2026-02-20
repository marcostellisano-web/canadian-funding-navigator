import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function NewYorkIncentivesView() {
  const usaFlag = '/flag-usa.svg';

  const taxCreditData = {
    title: 'New York State Film Tax Credit Program',
    rate: '30% credit on qualified New York production expenses',
    flag: usaFlag,
    requirements: [
      'Eligible productions include feature-length films, television series, relocated series, pilots, and television films',
      'Documentaries, news programs, reality shows, commercials, music videos, variety shows, sports programs, game shows, award ceremonies, daytime soap operas, and webisode compilations are not eligible',
      'Above-the-line wages are eligible but capped at 40% of all other qualified production costs',
      'Below-the-line wages, set construction, crew, equipment, props, and post-production costs (editing, sound design, visual effects) are fully eligible',
      'Minimum production budget of $1 million for productions shooting in New York City, Westchester County, or Long Island; $250,000 for all other New York counties',
      'Large productions (majority publicly-traded ownership or budget of $15M+) must shoot a minimum of 10% of principal photography days at a qualified production facility',
      'Smaller productions must shoot a minimum of 1 day at a qualified production facility (pilots are also subject to the 1-day minimum with no 10% requirement)',
      'Applications are strongly recommended to be submitted at least 10 business days before the start of principal photography',
      'Effective January 1, 2023, all applicants must submit a diversity plan outlining workforce hiring goals and strategies',
      'Program is funded at $700 million per year through 2036'
    ],
    bonuses: [
      {
        title: 'Upstate Filming Bonus',
        bonus: '+10% additional credit',
        description: [
          'Available to productions with a minimum budget of $500,000 that shoot 50% or more of principal photography days in eligible upstate counties',
          'Eligible counties: Albany, Allegany, Broome, Cattaraugus, Cayuga, Chautauqua, Chemung, Chenango, Clinton, Columbia, Cortland, Delaware, Dutchess, Erie, Essex, Franklin, Fulton, Genesee, Greene, Hamilton, Herkimer, Jefferson, Lewis, Livingston, Madison, Monroe, Montgomery, Niagara, Oneida, Onondaga, Ontario, Orange, Orleans, Oswego, Otsego, Putnam, Rensselaer, Saratoga, Schenectady, Schoharie, Schuyler, Seneca, St. Lawrence, Steuben, Sullivan, Tioga, Tompkins, Ulster, Warren, Washington, Wayne, Wyoming, and Yates'
        ]
      },
      {
        title: 'Music Scoring Bonus',
        bonus: '+10% additional credit',
        description: 'Available to productions that hire a minimum of 5 musicians to score original music for the production in New York'
      },
      {
        title: 'Production Plus (Multiple Productions)',
        bonus: '+5–10% additional credit',
        description: 'Additional credit available to companies with multiple qualifying productions in New York State'
      },
      {
        title: 'Series Relocation Incentive',
        bonus: 'Up to $6M in qualified relocation costs',
        description: 'Qualifying television series relocating their production to New York State may apply for a credit covering up to $6 million in qualified relocation costs'
      }
    ],
    website: 'https://esd.ny.gov/new-york-state-film-tax-credit-program-production'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">US – New York Incentives</h2>
          <p className="text-sm text-gray-500 mt-1">New York State Film Tax Credit Program</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxCreditInfoCard {...taxCreditData} />
      </div>
    </div>
  );
}
