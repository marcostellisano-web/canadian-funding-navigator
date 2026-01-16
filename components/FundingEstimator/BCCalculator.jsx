import React from 'react';

const InfoIcon = () => (
  <svg
    className="inline-block w-4 h-4 ml-1 text-gray-400 cursor-help"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
      clipRule="evenodd"
    />
  </svg>
);

export default function BCCalculator({
  totalBudget,
  setTotalBudget,
  eligibleLabour,
  setEligibleLabour,
  totalDays,
  setTotalDays,
  outsideVancouver,
  setOutsideVancouver,
  distantLocation,
  setDistantLocation,
  result
}) {
  const outsideVancouverPercent = totalDays ? ((outsideVancouver / totalDays) * 100).toFixed(1) : 0;
  const distantPercent = totalDays ? ((distantLocation / totalDays) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-3">
      {/* Total Budget Input */}
      <div>
        <label className="block text-sm font-normal text-gray-900 mb-1.5">
          Total budget
          <InfoIcon />
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 text-sm">$</span>
          <input
            type="number"
            value={totalBudget}
            onChange={(e) => setTotalBudget(e.target.value)}
            placeholder="0"
            className="w-full pl-8 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
          />
        </div>
      </div>

      {/* Eligible BC Labour Input */}
      <div>
        <label className="block text-sm font-normal text-gray-900 mb-1.5">
          Eligible BC labour expenditures
          <InfoIcon />
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 text-sm">$</span>
          <input
            type="number"
            value={eligibleLabour}
            onChange={(e) => setEligibleLabour(e.target.value)}
            placeholder="0"
            className="w-full pl-8 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
          />
        </div>
      </div>

      {/* Shooting Days Section */}
      <div>
        <label className="block text-sm font-normal text-gray-900 mb-1.5">
          Total shooting days
          <InfoIcon />
        </label>
        <input
          type="number"
          value={totalDays}
          onChange={(e) => setTotalDays(e.target.value)}
          placeholder="0"
          min="0"
          className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-normal text-gray-900 mb-1.5">
          Days outside Vancouver
          <InfoIcon />
        </label>
        <input
          type="number"
          value={outsideVancouver}
          onChange={(e) => setOutsideVancouver(e.target.value)}
          placeholder="0"
          min="0"
          className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
        />
        {totalDays > 0 && (
          <div className="text-xs text-gray-500 mt-1 ml-4">{outsideVancouverPercent}% of total days</div>
        )}
      </div>

      <div>
        <label className="block text-sm font-normal text-gray-900 mb-1.5">
          Days in distant location
          <InfoIcon />
        </label>
        <input
          type="number"
          value={distantLocation}
          onChange={(e) => setDistantLocation(e.target.value)}
          placeholder="0"
          min="0"
          className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
        />
        {totalDays > 0 && (
          <div className="text-xs text-gray-500 mt-1 ml-4">{distantPercent}% of total days</div>
        )}
      </div>

      {/* Results Section */}
      <div className="mt-5 pt-5 border-t border-gray-200 bg-white rounded-2xl p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Results</h3>

        <div className="space-y-2">
          {/* Total Credit */}
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm font-semibold text-gray-900">Total tax credit</span>
            <span className="text-xl font-bold text-gray-900">
              ${result.credit.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
            </span>
          </div>

          {/* Percentage of Budget */}
          <div className="flex justify-between items-center py-2">
            <span className="text-xs text-gray-600">
              Percentage of budget
              <InfoIcon />
            </span>
            <span className="text-sm font-medium text-gray-900">
              {result.budgetPercent.toFixed(2)}%
            </span>
          </div>

          {/* Breakdown */}
          {result.breakdown && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <details className="group">
                <summary className="text-xs font-medium text-gray-700 cursor-pointer hover:text-gray-900 list-none flex items-center justify-between">
                  <span>Credit breakdown</span>
                  <svg
                    className="w-4 h-4 transform transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-3 text-xs text-gray-600 whitespace-pre-line leading-relaxed">
                  {result.breakdown}
                </div>
              </details>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
