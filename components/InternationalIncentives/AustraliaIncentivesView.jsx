import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function AustraliaIncentivesView() {
  const australiaFlag = '/flag-australia.svg';

  const taxCreditData = {
    title: 'Producer Offset',
    rate: '30% rebate for non-theatrical feature projects, TV series and other formats',
    flag: australiaFlag,
    requirements: [
      'AU$1 million and AU$500,000 per hour for series/seasons. AU$500,000 and AU$250,000 per hour for documentary series/season.',
      'Payment is usually made in four weeks from lodgement with the Australian Taxation Office.',
      'A Significant Australian Content (SAC) Test is applied.'
    ],
    website: 'https://www.ausfilm.com.au/incentives/the-producer-offset-and-co-production-treaties/'
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Australia Incentives</h2>
          <p className="text-sm text-gray-500 mt-1">Producer offset for non-theatrical feature projects, TV series and other formats</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxCreditInfoCard {...taxCreditData} />
      </div>
    </div>
  );
}
