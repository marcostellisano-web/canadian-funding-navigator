import React from 'react';

const InfoIcon = ({ tooltip }) => (
  <span className="relative inline-block group">
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
    {tooltip && (
      <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity absolute z-10 w-48 p-2 mt-1 text-xs text-white bg-gray-900 rounded-lg shadow-lg left-1/2 transform -translate-x-1/2 top-full">
        {tooltip}
      </span>
    )}
  </span>
);

export default function BCCalculator({
  creditType,
  setCreditType,
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
  result,
  formatNumber,
  handleNumberInput
}) {
  const outsideVancouverPercent = totalDays ? ((outsideVancouver / totalDays) * 100).toFixed(1) : 0;
  const distantPercent = totalDays ? ((distantLocation / totalDays) * 100).toFixed(1) : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <h3 className="text-base font-semibold text-gray-900 mb-3">Provincial Tax Credit - BC</h3>

      <div className="space-y-1.5">
        {/* Tax Credit Type Selector */}
        <div>
          <label className="block text-sm font-normal text-gray-900 mb-0.5">
            Tax credit type
          </label>
          <select
            value={creditType}
            onChange={(e) => setCreditType(e.target.value)}
            className="w-full px-4 py-1.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              backgroundSize: '1rem',
              paddingRight: '2.5rem'
            }}
          >
            <option value="fibc">Film Incentive B.C. (FIBC)</option>
            <option value="pstc">Production Services Tax Credit (PSTC)</option>
          </select>
        </div>

        {/* Total Budget Input */}
        <div>
          <label className="block text-sm font-normal text-gray-900 mb-0.5">
            Total budget
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 text-sm">$</span>
            <input
              type="text"
              value={formatNumber(totalBudget)}
              onChange={(e) => handleNumberInput(e.target.value, setTotalBudget)}
              placeholder="0"
              className="w-full pl-8 pr-4 py-1.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
            />
          </div>
        </div>

        {/* Eligible BC Labour Input */}
        <div>
          <label className="block text-sm font-normal text-gray-900 mb-0.5">
            Eligible BC labour expenditures
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 text-sm">$</span>
            <input
              type="text"
              value={formatNumber(eligibleLabour)}
              onChange={(e) => handleNumberInput(e.target.value, setEligibleLabour)}
              placeholder="0"
              className="w-full pl-8 pr-4 py-1.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
            />
          </div>
        </div>

        {/* Shooting Days Section */}
        <div>
          <label className="block text-sm font-normal text-gray-900 mb-0.5">
            Total shooting days
          </label>
          <input
            type="number"
            value={totalDays}
            onChange={(e) => setTotalDays(e.target.value)}
            placeholder="0"
            min="0"
            className="w-full px-4 py-1.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-normal text-gray-900 mb-0.5">
            Days outside Vancouver
            <InfoIcon tooltip="12.5% Regional Bonus applies if more than 50% of B.C. principal photography days are outside Vancouver." />
          </label>
          <input
            type="number"
            value={outsideVancouver}
            onChange={(e) => setOutsideVancouver(e.target.value)}
            placeholder="0"
            min="0"
            className="w-full px-4 py-1.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
          />
          {totalDays > 0 && (
            <div className="text-xs text-gray-500 mt-1 ml-4">{outsideVancouverPercent}% of total days</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-normal text-gray-900 mb-0.5">
            Days in distant location
            <InfoIcon tooltip="If over 50% of B.C. shoot days are outside Vancouver, a 6% Distant Location Bonus applies to qualifying distant-location shoot days (prorated)." />
          </label>
          <input
            type="number"
            value={distantLocation}
            onChange={(e) => setDistantLocation(e.target.value)}
            placeholder="0"
            min="0"
            className="w-full px-4 py-1.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
          />
          {totalDays > 0 && (
            <div className="text-xs text-gray-500 mt-1 ml-4">{distantPercent}% of total days</div>
          )}
        </div>

        {/* Results Section */}
        {result.credit > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200 bg-red-50 rounded-2xl p-2.5">
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-sm font-semibold text-gray-900">Provincial Tax Credit</span>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">
                  ${result.credit.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
                </div>
                <div className="text-xs text-gray-600">
                  {result.budgetPercent.toFixed(1)}% of budget
                </div>
              </div>
            </div>

            {/* Breakdown */}
            {result.breakdown && (
              <details className="mt-2">
                <summary className="text-xs text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">
                  View calculation details
                </summary>
                <div className="mt-1.5 text-xs text-gray-700 whitespace-pre-line bg-white rounded-lg p-2 border border-red-100">
                  {result.breakdown}
                </div>
              </details>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
