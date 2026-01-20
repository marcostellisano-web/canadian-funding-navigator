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

export default function CMFCalculator({
  cmfFunding,
  setCmfFunding,
  totalBudget,
  formatNumber,
  handleNumberInput
}) {
  const funding = parseFloat(cmfFunding) || 0;
  const budget = parseFloat(totalBudget) || 0;
  const budgetPercent = budget > 0 ? (funding / budget) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <h3 className="text-base font-semibold text-gray-900 mb-3">CMF Funding</h3>

      <div className="space-y-1.5">
        {/* CMF Funding */}
        <div>
          <label className="block text-sm font-normal text-gray-900 mb-0.5">
            CMF funding amount
            <InfoIcon tooltip="Canada Media Fund financing amount, if applicable" />
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 text-sm">$</span>
            <input
              type="text"
              value={formatNumber(cmfFunding)}
              onChange={(e) => handleNumberInput(e.target.value, setCmfFunding)}
              placeholder="0"
              className="w-full pl-8 pr-4 py-1.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
            />
          </div>
        </div>

        {/* Results */}
        {funding > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200 bg-green-50 rounded-2xl p-2.5">
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-semibold text-gray-900">CMF Funding</span>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">
                  ${funding.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
                </div>
                <div className="text-xs text-gray-600">
                  {budgetPercent.toFixed(1)}% of budget
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
