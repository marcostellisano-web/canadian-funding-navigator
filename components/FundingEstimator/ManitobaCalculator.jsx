import React from 'react';

export default function ManitobaCalculator({
  creditType,
  setCreditType,
  provincialLabour,
  setProvincialLabour,
  productionExpenditures,
  setProductionExpenditures,
  frequentFilmingBonus,
  setFrequentFilmingBonus,
  manitobaProducerBonus,
  setManitobaProducerBonus,
  ruralNorthernBonus,
  setRuralNorthernBonus,
  productionCompanyBonus,
  setProductionCompanyBonus,
  result,
  formatNumber,
  handleNumberInput
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
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
            <option value="salaries">Cost of Salaries Tax Credit (45%)</option>
            <option value="production">Cost of Production Tax Credit (30%)</option>
          </select>
        </div>

        {/* Salaries Credit - Manitoba Labour Input */}
        {creditType === 'salaries' && (
          <div>
            <label className="block text-sm font-normal text-gray-900 mb-0.5">
              Manitoba labour expenditures
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 text-sm">$</span>
              <input
                type="text"
                value={formatNumber(provincialLabour)}
                onChange={(e) => handleNumberInput(e.target.value, setProvincialLabour)}
                placeholder="0"
                className="w-full pl-8 pr-4 py-1.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
              />
            </div>
          </div>
        )}

        {/* Production Credit - Production Expenditures Input */}
        {creditType === 'production' && (
          <div>
            <label className="block text-sm font-normal text-gray-900 mb-0.5">
              Qualifying production expenditures in Manitoba
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
        )}

        {/* Requirements Info */}
        <div className="mt-2 p-2.5 bg-blue-50 rounded-lg border border-blue-100">
          <p className="text-xs font-medium text-blue-800 mb-1">Requirements:</p>
          <ul className="text-xs text-blue-700 space-y-0.5 list-disc list-inside">
            <li>Applicants must have a permanent establishment in Manitoba</li>
            <li>A minimum 25% of the corporation's T4 Summary must be paid to eligible Manitoba employees for work performed in Manitoba</li>
          </ul>
        </div>

        {/* Bonuses for Cost of Salaries */}
        {creditType === 'salaries' && (
          <>
            <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-2xl">
              <label className="flex items-start gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={frequentFilmingBonus}
                  onChange={(e) => setFrequentFilmingBonus(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-gray-900 rounded border-gray-300 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <div className="flex-1">
                  <span className="text-xs font-medium text-gray-900 block">Frequent Filming Bonus (+10%)</span>
                  <span className="text-xs text-gray-600 block mt-0.5">Third film shot within a two-year period</span>
                </div>
              </label>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-2xl">
              <label className="flex items-start gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={manitobaProducerBonus}
                  onChange={(e) => setManitobaProducerBonus(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-gray-900 rounded border-gray-300 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <div className="flex-1">
                  <span className="text-xs font-medium text-gray-900 block">Manitoba Producer Bonus (+5%)</span>
                  <span className="text-xs text-gray-600 block mt-0.5">Co-producing with a Manitoba producer</span>
                </div>
              </label>
            </div>

            <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-2xl">
              <label className="flex items-start gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={ruralNorthernBonus}
                  onChange={(e) => setRuralNorthernBonus(e.target.checked)}
                  className="w-4 h-4 mt-0.5 text-gray-900 rounded border-gray-300 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <div className="flex-1">
                  <span className="text-xs font-medium text-gray-900 block">Rural and Northern Bonus (+5%)</span>
                  <span className="text-xs text-gray-600 block mt-0.5">No less than 50% of Manitoba production days at least 35 km from Winnipeg's centre</span>
                </div>
              </label>
            </div>
          </>
        )}

        {/* Bonus for Cost of Production */}
        {creditType === 'production' && (
          <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-2xl">
            <label className="flex items-start gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={productionCompanyBonus}
                onChange={(e) => setProductionCompanyBonus(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-gray-900 rounded border-gray-300 focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <div className="flex-1">
                <span className="text-xs font-medium text-gray-900 block">Manitoba Production Company Bonus (+8%)</span>
                <span className="text-xs text-gray-600 block mt-0.5">Co-producing with an eligible Manitoba production company</span>
              </div>
            </label>
          </div>
        )}

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
