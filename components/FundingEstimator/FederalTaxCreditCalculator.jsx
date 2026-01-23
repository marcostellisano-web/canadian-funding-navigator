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

export default function FederalTaxCreditCalculator({
  creditType,
  setCreditType,
  canadianLabour,
  setCanadianLabour,
  totalBudget,
  provincialTaxCredit,
  formatNumber,
  handleNumberInput
}) {
  // Calculate federal tax credit
  const calculateFederal = () => {
    const labour = parseFloat(canadianLabour) || 0;
    const budget = parseFloat(totalBudget) || 0;
    const provincialCredit = parseFloat(provincialTaxCredit) || 0;

    let credit = 0;
    let rate = 0;
    let breakdown = '';

    if (creditType === 'cptc') {
      // CPTC (CANCON) Calculation
      // Net Production Cost is capped at 60%
      // Labour is capped at 60% of budget
      // Take the LESSER of the two capped values
      // Then multiply by 25%

      rate = 0.25;
      const netProductionCosts = Math.max(0, budget - provincialCredit);

      // Cap net production costs at 60%
      const cappedNetProductionCosts = netProductionCosts * 0.6;

      // Cap the eligible Canadian labour at 60% of budget
      const labourCap = budget * 0.6;
      const cappedLabour = Math.min(labour, labourCap);

      // Take the lesser of capped net production costs or capped labour
      const lesserAmount = Math.min(cappedNetProductionCosts, cappedLabour);

      // Apply 25% rate to the lesser amount
      credit = lesserAmount * rate;

      breakdown = `Total Budget: $${budget.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n`;
      breakdown += `Provincial Tax Credit: $${provincialCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n`;
      breakdown += `Net Production Costs (budget - provincial): $${netProductionCosts.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n`;
      breakdown += `Capped Net Production Costs (60%): $${cappedNetProductionCosts.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n`;
      breakdown += `\nEligible Canadian Labour: $${labour.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n`;
      breakdown += `Labour Cap (60% of budget): $${labourCap.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n`;
      breakdown += `Capped Labour: $${cappedLabour.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n`;
      breakdown += `\nLesser of Capped Net Production Costs or Capped Labour: $${lesserAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n`;
      breakdown += `Tax Credit Rate: 25%\n`;
      breakdown += `\nFinal CPTC Credit (25% × lesser amount): $${credit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    } else if (creditType === 'pstc') {
      // PSTC Calculation
      // Eligible Canadian labour cannot exceed Total Budget
      rate = 0.16;

      // Cap labour at total budget
      const cappedLabour = Math.min(labour, budget);
      credit = cappedLabour * rate;

      breakdown = `Total Budget: $${budget.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n`;
      breakdown += `Eligible Canadian Labour: $${labour.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n`;
      breakdown += `Capped Labour (cannot exceed budget): $${cappedLabour.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n`;
      breakdown += `Tax Credit Rate: ${(rate * 100).toFixed(0)}%\n`;
      breakdown += `\nTotal Federal Credit (16% × capped labour): $${credit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }

    const budgetPercent = budget > 0 ? (credit / budget) * 100 : 0;

    return { credit, budgetPercent, breakdown, rate };
  };

  const result = calculateFederal();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <div className="space-y-1.5">
        {/* Federal Credit Type */}
        <div>
          <label className="block text-sm font-normal text-gray-900 mb-0.5">
            Federal tax credit type
            <InfoIcon tooltip="CPTC (CANCON) for Canadian content productions, PSTC for service productions" />
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
            <option value="cptc">CAVCO Production Tax Credit - CPTC (CANCON)</option>
            <option value="pstc">CAVCO Service Tax Credit - PSTC</option>
          </select>
        </div>

        {/* Canadian Labour */}
        <div>
          <label className="block text-sm font-normal text-gray-900 mb-0.5">
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
              className="w-full pl-8 pr-4 py-1.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
            />
          </div>
        </div>

        {/* Results */}
        {result.credit > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200 bg-blue-50 rounded-2xl p-2.5">
            <div className="flex justify-between items-baseline mb-1.5">
              <span className="text-sm font-semibold text-gray-900">Federal Tax Credit</span>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">
                  ${result.credit.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
                </div>
                <div className="text-xs text-gray-600">
                  {result.budgetPercent.toFixed(1)}% of budget
                </div>
              </div>
            </div>

            <details className="mt-2">
              <summary className="text-xs text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">
                View calculation details
              </summary>
              <div className="mt-1.5 text-xs text-gray-700 whitespace-pre-line bg-white rounded-lg p-2 border border-blue-100">
                {result.breakdown}
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}
