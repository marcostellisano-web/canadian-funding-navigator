import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function GeorgiaIncentivesView() {
  const usaFlag = '/flag-usa.svg';

  const taxCreditData = {
    title: 'Georgia Film Tax Credit',
    rate: '20% base tax credit on qualified Georgia expenditures',
    flag: usaFlag,
    requirements: [
      'Minimum spend of $500,000 in qualified Georgia expenditures per tax year (can be aggregated across multiple productions by the same company)',
      'Eligible productions include feature films, TV series, pilots, movies for television, commercials, music videos, and qualified interactive entertainment projects',
      'Qualified expenditures include costs for pre-production, production, and post-production in Georgia (materials, services, and labour)',
      'Development costs, marketing, story rights, and distribution expenses do not qualify',
      'Salary cap of $500,000 per person, per production for W-2 employees; loan-outs and 1099 contractors must have 5.75% Georgia state tax withheld',
      'As of January 1, 2023, all certified productions must undergo a mandatory audit by a Georgia Department of Revenue–approved CPA firm before credits can be used, transferred, or sold',
      'Production companies do not need to be incorporated or headquartered in Georgia to qualify',
      'Credits can be used against Georgia income tax liability, applied to Georgia withholding, or sold/transferred to Georgia taxpayers; transferable credits commonly sell at 85–90 cents per dollar',
      'Credits may be carried forward for five years; there is no annual cap and no sunset clause'
    ],
    bonuses: [
      {
        title: 'Georgia Entertainment Promotion (GEP) Bonus',
        bonus: '+10% additional credit',
        description: [
          'Available to productions that provide approved promotional value to the State of Georgia',
          'Typically satisfied by embedding the official Georgia Entertainment promotional logo in the end credits of the production',
          'Brings the total potential credit to 30% of qualified Georgia expenditures'
        ]
      }
    ],
    website: 'https://georgia.org/industries/film-entertainment/georgia-film-tv-production/production-incentives'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">US – Georgia Incentives</h2>
          <p className="text-sm text-gray-500 mt-1">Georgia Entertainment Industry Investment Act</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxCreditInfoCard {...taxCreditData} />
      </div>
    </div>
  );
}
