import React from 'react';

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
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tax Credit Type</label>
        <select
          value={creditType}
          onChange={(e) => setCreditType(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
        >
          <option value="service">Service Tax Credit</option>
          <option value="production">Production Tax Credit</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Total Budget</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            value={totalBudget}
            onChange={(e) => setTotalBudget(e.target.value)}
            placeholder="Enter total budget"
            className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Provincial Labour</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            value={provincialLabour}
            onChange={(e) => setProvincialLabour(e.target.value)}
            placeholder="Enter provincial labour cost"
            className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
          />
        </div>
      </div>

      {creditType === 'service' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Provincial Production Expenditures</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={productionExpenses}
              onChange={(e) => setProductionExpenses(e.target.value)}
              placeholder="Enter production expenditures"
              className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
            />
          </div>
        </div>
      )}

      {creditType === 'production' && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={regionalBonus}
              onChange={(e) => setRegionalBonus(e.target.checked)}
              className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
            />
            <span className="text-sm text-gray-700">• Regional Bonus (Increases credit from 35% to 45%)</span>
          </label>
        </div>
      )}

      {/* Results */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-sm font-medium text-gray-700 mb-2">Estimated Ontario Tax Credit:</div>
        <div className="text-2xl font-bold text-green-600 mb-1">
          ${result.credit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
        </div>
        <div className="text-sm text-gray-500 mb-4">
          ({result.budgetPercent.toFixed(1)}% of total budget)
        </div>
        <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded whitespace-pre-line">
          {result.breakdown}
        </div>
      </div>
    </div>
  );
}
