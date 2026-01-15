import React from 'react';

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
    <div className="space-y-4">
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
        <label className="block text-sm font-medium text-gray-700 mb-2">Eligible BC Labour Expenditures</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            value={eligibleLabour}
            onChange={(e) => setEligibleLabour(e.target.value)}
            placeholder="Enter eligible BC labour"
            className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
          />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Shooting Days</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Total Shooting Days</label>
            <input
              type="number"
              value={totalDays}
              onChange={(e) => setTotalDays(e.target.value)}
              placeholder="Total days"
              min="0"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Days Outside Vancouver</label>
            <input
              type="number"
              value={outsideVancouver}
              onChange={(e) => setOutsideVancouver(e.target.value)}
              placeholder="Outside Vancouver"
              min="0"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
            />
            <div className="text-xs text-gray-500 mt-1">{outsideVancouverPercent}% of total days</div>
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-600 mb-1">Days in Distant Location</label>
            <input
              type="number"
              value={distantLocation}
              onChange={(e) => setDistantLocation(e.target.value)}
              placeholder="Distant location"
              min="0"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-red-300 focus:ring-2 focus:ring-red-100"
            />
            <div className="text-xs text-gray-500 mt-1">{distantPercent}% of total days</div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-sm font-medium text-gray-700 mb-2">Estimated BC Tax Credit:</div>
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
