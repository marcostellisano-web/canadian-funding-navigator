import React from 'react';

export default function FundingSummary({
  provincialCredit,
  provinceName,
  federalCredit,
  cmfFunding,
  totalBudget
}) {
  const provincial = parseFloat(provincialCredit) || 0;
  const federal = parseFloat(federalCredit) || 0;
  const cmf = parseFloat(cmfFunding) || 0;
  const budget = parseFloat(totalBudget) || 0;

  const totalFunding = provincial + federal + cmf;
  const totalPercent = budget > 0 ? (totalFunding / budget) * 100 : 0;
  const provincialPercent = budget > 0 ? (provincial / budget) * 100 : 0;
  const federalPercent = budget > 0 ? (federal / budget) * 100 : 0;
  const cmfPercent = budget > 0 ? (cmf / budget) * 100 : 0;

  // Only show summary if there's at least one funding source
  if (totalFunding === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-sm border border-gray-200 p-4">
      <h3 className="text-base font-semibold text-gray-900 mb-3">Funding Summary</h3>

      <div className="space-y-2">
        {/* Total Budget */}
        {budget > 0 && (
          <div className="flex justify-between items-center text-sm pb-2 border-b border-gray-300">
            <span className="text-gray-700">Total budget</span>
            <span className="font-semibold text-gray-900">
              ${budget.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
            </span>
          </div>
        )}

        {/* Provincial Credit */}
        {provincial > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-700">{provinceName} tax credit</span>
            <div className="text-right">
              <span className="font-semibold text-gray-900">
                ${provincial.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
              </span>
              <span className="text-xs text-gray-600 ml-2">
                ({provincialPercent.toFixed(1)}%)
              </span>
            </div>
          </div>
        )}

        {/* Federal Credit */}
        {federal > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-700">Federal tax credit</span>
            <div className="text-right">
              <span className="font-semibold text-gray-900">
                ${federal.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
              </span>
              <span className="text-xs text-gray-600 ml-2">
                ({federalPercent.toFixed(1)}%)
              </span>
            </div>
          </div>
        )}

        {/* CMF Funding */}
        {cmf > 0 && (
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-700">CMF funding</span>
            <div className="text-right">
              <span className="font-semibold text-gray-900">
                ${cmf.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
              </span>
              <span className="text-xs text-gray-600 ml-2">
                ({cmfPercent.toFixed(1)}%)
              </span>
            </div>
          </div>
        )}

        {/* Total */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-300">
          <span className="text-base font-bold text-gray-900">Total Funding</span>
          <div className="text-right">
            <span className="text-xl font-bold text-gray-900">
              ${totalFunding.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
            </span>
            {budget > 0 && (
              <span className="text-sm text-gray-600 ml-2">
                ({totalPercent.toFixed(1)}% of total budget)
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
