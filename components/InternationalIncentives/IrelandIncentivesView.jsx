import React from 'react';

export default function IrelandIncentivesView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Ireland Incentives</h2>
        <p className="text-sm text-gray-500 mt-1">Screen Ireland film and television tax credit</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-900 underline">
          Screen Ireland Film and Television Tax Credit
        </h3>

        <p className="text-gray-800">
          The rate of tax credit is worth <strong>up to 32% of eligible Irish expenditure.</strong>
        </p>

        <ul className="list-disc pl-6 space-y-3 text-gray-800">
          <li>
            Projects are excluded from the incentive if their &lsquo;eligible expenditure&rsquo; is less than
            &euro;125,000, or the total cost of production is less than &euro;250,000.
          </li>
          <li>
            Eligible expenditure: all goods and services while filming in Ireland, and all cast
            and crew regardless of nationality.
          </li>
          <li>
            This application must be made to the Minister at least 21 working days prior to
            the commencement of Irish production.
          </li>
          <li>
            Must pass a cultural test as part of the registration process.
          </li>
        </ul>

        <div className="pt-2">
          <a
            href="https://filminireland.com/irish-film-tax-incentive/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Learn more at Film in Ireland →
          </a>
        </div>
      </div>
    </div>
  );
}
