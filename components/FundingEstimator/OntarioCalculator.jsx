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
          <InfoIcon />
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
          <option value="production">Production Tax Credit - (OFTTC)</option>
          <option value="service">Service Tax Credit - (OPSTC)</option>
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

      {/* Provincial Labour Input */}
      <div>
        <label className="block text-sm font-normal text-gray-900 mb-1.5">
          Provincial labour
          <InfoIcon />
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 text-sm">$</span>
          <input
            type="text"
            value={formatNumber(provincialLabour)}
            onChange={(e) => handleNumberInput(e.target.value, setProvincialLabour)}
            placeholder="0"
            className="w-full pl-8 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
          />
        </div>
      </div>

      {/* Non-labour Ontario services (Service Type Only) */}
      {creditType === 'service' && (
        <div>
          <label className="block text-sm font-normal text-gray-900 mb-1.5">
            Non-labour Ontario services
            <InfoIcon tooltip="Contracted Ontario services such as equipment rentals, post, VFX, or catering." />
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 text-sm">$</span>
            <input
              type="text"
              value={formatNumber(productionExpenses)}
              onChange={(e) => handleNumberInput(e.target.value, setProductionExpenses)}
              placeholder="0"
              className="w-full pl-8 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
            />
          </div>
        </div>
      )}

      {/* Regional Bonus (Production Type Only) */}
      {creditType === 'production' && (
        <div className="bg-gray-50 border border-gray-200 p-3 rounded-2xl">
          <label className="flex items-start gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={regionalBonus}
              onChange={(e) => setRegionalBonus(e.target.checked)}
              className="w-4 h-4 mt-0.5 text-gray-900 rounded border-gray-300 focus:ring-0 focus:ring-offset-0 cursor-pointer"
            />
            <div className="flex-1">
              <span className="text-xs font-medium text-gray-900 block">Regional Bonus</span>
              <span className="text-xs text-gray-600 block mt-0.5">Projects with at least 85% of Ontario location days outside the GTA can qualify for this 10% bonus</span>
            </div>
          </label>
        </div>
      )}

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
