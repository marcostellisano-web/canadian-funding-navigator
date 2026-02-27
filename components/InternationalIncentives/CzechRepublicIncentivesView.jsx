import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function CzechRepublicIncentivesView() {
  const czechRepublicFlag = '/flag-czech-republic.svg';

  const taxCreditData = {
    title: 'Czech Production Incentive',
    rate: 'Refund of 25% of eligible costs spent on audiovisual production',
    flag: czechRepublicFlag,
    requirements: [
      'Please note all the forms are in the Czech language - you need a Czech service production company to enter the program',
      'Cap of CZK 450 million per project',
      'International costs paid to foreign cast and crew who pay withholding tax in the Czech Republic are applicable',
      'The first criteria is passing a cultural test as part of the registration process'
    ],
    website: 'https://www.filmcommission.cz/en/production-incentives/'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Czech Republic Incentives</h2>
          <p className="text-sm text-gray-500 mt-1">Czech production incentive for audiovisual production</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxCreditInfoCard {...taxCreditData} />
      </div>
    </div>
  );
}
