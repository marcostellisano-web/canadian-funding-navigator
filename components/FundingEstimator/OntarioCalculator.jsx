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

export default function OntarioCalculator({
  creditType,
  setCreditType,
  totalBudget,
  setTotalBudget,
  provincialLabour,
  setProvincialLabour,
  productionExpenses,
  setProductionExpenses,
  regionalBonus,
  setRegionalBonus,
  result
}) {
  return (
    <div className="space-y-6">
      {/* Tax Credit Type Selector */}
      <div>
        <label className="block text-sm font-normal text-gray-900 mb-2">
          Tax credit type
          <InfoIcon />
        </label>
        <select
          value={creditType}
          onChange={(e) => setCreditType(e.target.value)}
          className="w-full px-5 py-4 text-base bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors appearance-none cursor-pointer"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1.25rem center',
            backgroundSize: '1.25rem',
            paddingRight: '3rem'
          }}
        >
          <option value="service">Service Tax Credit</option>
          <option value="production">Production Tax Credit</option>
        </select>
      </div>

      {/* Total Budget Input */}
      <div>
        <label className="block text-sm font-normal text-gray-900 mb-2">
          Total budget
          <InfoIcon />
        </label>
        <div className="relative">
          <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-900 text-base">$</span>
          <input
            type="number"
            value={totalBudget}
            onChange={(e) => setTotalBudget(e.target.value)}
            placeholder="0"
            className="w-full pl-9 pr-5 py-4 text-base bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
          />
        </div>
      </div>

      {/* Provincial Labour Input */}
      <div>
        <label className="block text-sm font-normal text-gray-900 mb-2">
          Provincial labour
          <InfoIcon />
        </label>
        <div className="relative">
          <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-900 text-base">$</span>
          <input
            type="number"
            value={provincialLabour}
            onChange={(e) => setProvincialLabour(e.target.value)}
            placeholder="0"
            className="w-full pl-9 pr-5 py-4 text-base bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
          />
        </div>
      </div>

      {/* Provincial Production Expenditures (Service Type Only) */}
      {creditType === 'service' && (
        <div>
          <label className="block text-sm font-normal text-gray-900 mb-2">
            Provincial production expenditures
            <InfoIcon />
          </label>
          <div className="relative">
            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-900 text-base">$</span>
            <input
              type="number"
              value={productionExpenses}
              onChange={(e) => setProductionExpenses(e.target.value)}
              placeholder="0"
              className="w-full pl-9 pr-5 py-4 text-base bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
            />
          </div>
        </div>
      )}

      {/* Regional Bonus (Production Type Only) */}
      {creditType === 'production' && (
        <div className="bg-gray-50 border border-gray-200 p-5 rounded-2xl">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={regionalBonus}
              onChange={(e) => setRegionalBonus(e.target.checked)}
              className="w-5 h-5 mt-0.5 text-gray-900 rounded border-gray-300 focus:ring-0 focus:ring-offset-0 cursor-pointer"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-900 block">Regional bonus</span>
              <span className="text-xs text-gray-600 block mt-1">Increases credit from 35% to 45%</span>
            </div>
          </label>
        </div>
      )}

      {/* Results Section */}
      <div className="mt-8 pt-8 border-t border-gray-200 bg-white rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Results</h3>

        <div className="space-y-4">
          {/* Total Credit */}
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-base font-semibold text-gray-900">Total tax credit</span>
            <span className="text-2xl font-bold text-gray-900">
              ${result.credit.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
            </span>
          </div>

          {/* Percentage of Budget */}
          <div className="flex justify-between items-center py-3">
            <span className="text-sm text-gray-600">
              Percentage of budget
              <InfoIcon />
            </span>
            <span className="text-base font-medium text-gray-900">
              {result.budgetPercent.toFixed(2)}%
            </span>
          </div>

          {/* Breakdown */}
          {result.breakdown && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <details className="group">
                <summary className="text-sm font-medium text-gray-700 cursor-pointer hover:text-gray-900 list-none flex items-center justify-between">
                  <span>Credit breakdown</span>
                  <svg
                    className="w-5 h-5 transform transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 text-sm text-gray-600 whitespace-pre-line leading-relaxed">
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
