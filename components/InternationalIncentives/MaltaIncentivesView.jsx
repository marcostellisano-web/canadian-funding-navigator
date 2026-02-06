import React from 'react';
import TaxCreditInfoCard from '../TaxCredits/TaxCreditInfoCard';

export default function MaltaIncentivesView() {
  const maltaFlag = '/flag-malta.svg';

  const cashRebateData = {
    title: 'Malta Cash Rebate',
    rate: '30% on all eligible expenditure',
    flag: maltaFlag,
    requirements: [
      'Minimum spend of €100,000 in Malta with an overall budget exceeding €200,000',
      'Applicant must pass a cultural test',
      'Once works have commenced in Malta, the qualifying company can benefit from an advance grant equivalent to 10% of the cash rebate; subject to presentation of a top sheet of accumulated expenses to-date',
      'Application must be presented to the Film Commissioner for provisional approval, at least 30 working days before commencement of the production\'s principal photography'
    ],
    bonuses: [
      {
        title: 'Cultural Elements Bonus',
        bonus: '+10% additional (discretionary)',
        description: [
          'Malta features as Malta or local usage of facilities',
          'Maximisation of local resources'
        ]
      }
    ],
    website: 'https://screenmalta.com/cash-rebates/'
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Malta Incentives</h2>
        <p className="text-sm text-gray-500 mt-1">Cash rebate for film and television production</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TaxCreditInfoCard {...cashRebateData} />
      </div>
    </div>
  );
}
