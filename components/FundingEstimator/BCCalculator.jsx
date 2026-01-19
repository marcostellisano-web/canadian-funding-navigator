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
  showStackable,
  setShowStackable,
  federalCreditType,
  setFederalCreditType,
  canadianLabour,
  setCanadianLabour,
  cmfFunding,
  setCmfFunding,
  stackableResult
}) {
  const outsideVancouverPercent = totalDays ? ((outsideVancouver / totalDays) * 100).toFixed(1) : 0;
  const distantPercent = totalDays ? ((distantLocation / totalDays) * 100).toFixed(1) : 0;

  // Format number with commas
  const formatNumber = (value) => {
    if (!value) return '';
    // Remove non-digits
    const number = value.toString().replace(/\D/g, '');
    // Add commas
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Handle input change with comma formatting
  const handleNumberInput = (value, setter) => {
    // Remove commas for storage
    const rawValue = value.replace(/,/g, '');
    setter(rawValue);
  };

  return (
    <div className="space-y-3">
      {/* Tax Credit Type Selector */}
      <div>
        <label className="block text-sm font-normal text-gray-900 mb-1.5">
          Tax credit type
        </label>
        <select
          value={creditType}
          onChange={(e) => setCreditType(e.target.value)}
          className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors appearance-none cursor-pointer"
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
        <label className="block text-sm font-normal text-gray-900 mb-1.5">
          Total budget
          <InfoIcon />
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 text-sm">$</span>
          <input
            type="text"
            value={formatNumber(totalBudget)}
            onChange={(e) => handleNumberInput(e.target.value, setTotalBudget)}
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
            type="text"
            value={formatNumber(eligibleLabour)}
            onChange={(e) => handleNumberInput(e.target.value, setEligibleLabour)}
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
          <InfoIcon tooltip="12.5% Regional Bonus applies if more than 50% of B.C. principal photography days are outside Vancouver." />
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
          <InfoIcon tooltip="If over 50% of B.C. shoot days are outside Vancouver, a 6% Distant Location Bonus applies to qualifying distant-location shoot days (prorated)." />
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

      {/* Stackable Funding Section */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => setShowStackable(!showStackable)}
          className="w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          <span>Add stackable funding (Federal + CMF)</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${showStackable ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showStackable && (
          <div className="mt-4 space-y-3">
            {/* Federal Credit Type */}
            <div>
              <label className="block text-sm font-normal text-gray-900 mb-1.5">
                Federal tax credit
                <InfoIcon tooltip="CPTC (25%) for Canadian content, PSTC (16%) for service productions" />
              </label>
              <select
                value={federalCreditType}
                onChange={(e) => setFederalCreditType(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1rem',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="cptc">CPTC - Canadian Content (25%)</option>
                <option value="pstc">PSTC - Service Production (16%)</option>
              </select>
            </div>

            {/* Canadian Labour */}
            <div>
              <label className="block text-sm font-normal text-gray-900 mb-1.5">
                Eligible Canadian labour
                <InfoIcon tooltip="Total Canadian labour expenditures eligible for federal tax credit" />
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 text-sm">$</span>
                <input
                  type="text"
                  value={formatNumber(canadianLabour)}
                  onChange={(e) => handleNumberInput(e.target.value, setCanadianLabour)}
                  placeholder="0"
                  className="w-full pl-8 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
                />
              </div>
            </div>

            {/* CMF Funding */}
            <div>
              <label className="block text-sm font-normal text-gray-900 mb-1.5">
                CMF funding (optional)
                <InfoIcon tooltip="Canada Media Fund financing amount, if applicable" />
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 text-sm">$</span>
                <input
                  type="text"
                  value={formatNumber(cmfFunding)}
                  onChange={(e) => handleNumberInput(e.target.value, setCmfFunding)}
                  placeholder="0"
                  className="w-full pl-8 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
                />
              </div>
            </div>

            {/* Stackable Results */}
            {stackableResult && (
              <div className="mt-4 pt-4 border-t border-gray-200 bg-blue-50 rounded-2xl p-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Total Stackable Funding</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Provincial credit</span>
                    <span className="font-medium text-gray-900">${result.credit.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Federal credit ({(stackableResult.federalRate * 100).toFixed(0)}%)</span>
                    <span className="font-medium text-gray-900">${stackableResult.federalCredit.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
                  </div>
                  {stackableResult.cmfFunding > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">CMF funding</span>
                      <span className="font-medium text-gray-900">${stackableResult.cmfFunding.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-blue-200">
                    <span className="font-semibold text-gray-900">Total funding</span>
                    <span className="text-lg font-bold text-gray-900">${stackableResult.total.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
