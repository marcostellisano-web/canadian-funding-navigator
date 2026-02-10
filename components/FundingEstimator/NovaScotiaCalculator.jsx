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

export default function NovaScotiaCalculator({
  creditType,
  setCreditType,
  productionExpenditures,
  setProductionExpenditures,
  locationIncentive,
  setLocationIncentive,
  distantLocationPercent,
  setDistantLocationPercent,
  shootingLengthIncentive,
  setShootingLengthIncentive,
  result,
  formatNumber,
  handleNumberInput
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <div className="space-y-1.5">
        {/* Stream Selector */}
        <div>
          <label className="block text-sm font-normal text-gray-900 mb-0.5">
            Incentive stream
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
            <option value="stream1">Stream I - Nova Scotia Ownership (26%)</option>
            <option value="stream2">Stream II - Service Production (25%)</option>
          </select>
        </div>

        {/* Production Expenditures Input */}
        <div>
          <label className="block text-sm font-normal text-gray-900 mb-0.5">
            Qualifying production expenditures in Nova Scotia
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 text-sm">$</span>
            <input
              type="text"
              value={formatNumber(productionExpenditures)}
              onChange={(e) => handleNumberInput(e.target.value, setProductionExpenditures)}
              placeholder="0"
              className="w-full pl-8 pr-4 py-1.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
            />
          </div>
        </div>

        {/* Requirements Info */}
        {creditType === 'stream1' && (
          <div className="mt-2 p-2.5 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-xs font-medium text-blue-800 mb-1">Stream I Requirements:</p>
            <ul className="text-xs text-blue-700 space-y-0.5 list-disc list-inside">
              <li>50-100% Nova Scotia Ownership and Control</li>
              <li>A minimum of 50% Nova Scotians must be employed in Head of Department (HOD) positions or acceptable combination</li>
            </ul>
          </div>
        )}

        {creditType === 'stream2' && (
          <div className="mt-2 p-2.5 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-xs font-medium text-blue-800 mb-1">Stream II Requirements:</p>
            <ul className="text-xs text-blue-700 space-y-0.5 list-disc list-inside">
              <li>Less than 50% Nova Scotia Ownership and Control</li>
              <li>Where 8 or fewer HOD positions are filled, half must be filled by Nova Scotia residents</li>
              <li>Where 9 or more HOD positions are filled, a minimum of 4 must be filled by Nova Scotia residents</li>
            </ul>
          </div>
        )}

        {/* Location Incentive */}
        <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-2xl">
          <label className="flex items-start gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={locationIncentive}
              onChange={(e) => setLocationIncentive(e.target.checked)}
              className="w-4 h-4 mt-0.5 text-gray-900 rounded border-gray-300 focus:ring-0 focus:ring-offset-0 cursor-pointer"
            />
            <div className="flex-1">
              <span className="text-xs font-medium text-gray-900 block">Location Incentive (+2%)</span>
              <span className="text-xs text-gray-600 block mt-0.5">More than 50% of principal photography is in a rural/non-metropolitan area in Nova Scotia</span>
            </div>
          </label>
        </div>

        {/* Distant Location Incentive */}
        <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-2xl">
          <div>
            <label className="block text-xs font-medium text-gray-900 mb-1">
              Distant Location Incentive (up to +10%)
              <InfoIcon tooltip="Additional funding for shoots that film days of principal photography in a Distant Location. Enter the percentage (0-10%)." />
            </label>
            <div className="relative">
              <input
                type="text"
                value={distantLocationPercent}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, '');
                  const num = parseInt(val) || 0;
                  setDistantLocationPercent(Math.min(num, 10).toString() || '');
                }}
                placeholder="0"
                className="w-full pl-4 pr-8 py-1.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">%</span>
            </div>
            <span className="text-xs text-gray-500 mt-0.5 block">Film days of principal photography in a Distant Location</span>
          </div>
        </div>

        {/* Shooting Length Incentive */}
        <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-2xl">
          <label className="flex items-start gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={shootingLengthIncentive}
              onChange={(e) => setShootingLengthIncentive(e.target.checked)}
              className="w-4 h-4 mt-0.5 text-gray-900 rounded border-gray-300 focus:ring-0 focus:ring-offset-0 cursor-pointer"
            />
            <div className="flex-1">
              <span className="text-xs font-medium text-gray-900 block">Shooting Length Incentive (+1%)</span>
              <span className="text-xs text-gray-600 block mt-0.5">More than 30 days of principal photography in Nova Scotia</span>
            </div>
          </label>
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
