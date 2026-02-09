import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function AustraliaIncentivesView() {
  const australiaFlag = '/flag-australia.svg';

  const taxCreditData = {
    title: 'Australia Location Offset',
    rate: '30% tax rebate for large-budget film and television projects shot in Australia',
    flag: australiaFlag,
    requirements: [
      "The Offset is a cash rebate paid to the applicant, less any tax liabilities as part of the company\u2019s tax lodgement for the relevant income year",
      'Productions must spend at least A$20 million in QAPE. Series must also spend at least average QAPE per hour of A$1.5 million',
      'One or more Australian providers must deliver post, digital and visual effects for the production',
      'Payment is usually made in 4 weeks from lodgement with the Australian Taxation Office (ATO)',
      'No cultural or content tests are administered'
    ],
    website: 'https://www.ausfilm.com.au/incentives/location/'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Australia Incentives</h2>
          <p className="text-sm text-gray-500 mt-1">Location offset for large-budget productions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxCreditInfoCard {...taxCreditData} />
      </div>
    </div>
  );
}
