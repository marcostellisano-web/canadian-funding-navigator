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
      // The tax credit = 25% of Eligible Canadian labour OR 25% of (Total Budget - Provincial Tax Credit), whichever is lower
      // Maximum cap = (Total Budget - Provincial Tax Credit) × 60% × 25%

      rate = 0.25;
      const optionA = labour * rate;
      const budgetLessProvincial = Math.max(0, budget - provincialCredit);
      const optionB = budgetLessProvincial * rate;
      const maximumCap = budgetLessProvincial * 0.60 * 0.25;

      // Take the lower of Option A or Option B
      const lowerOption = Math.min(optionA, optionB);

      // Apply the maximum cap
      credit = Math.min(lowerOption, maximumCap);

      breakdown = `Eligible Canadian Labour: $${labour.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n`;
      breakdown += `Option A (25% of labour): $${optionA.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n`;
      breakdown += `\nTotal Budget: $${budget.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n`;
      breakdown += `Provincial Tax Credit: $${provincialCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n`;
      breakdown += `Budget less Provincial: $${budgetLessProvincial.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n`;
      breakdown += `Option B (25% of budget less provincial): $${optionB.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n`;
      breakdown += `\nMaximum Cap (60% × 25% of budget less provincial): $${maximumCap.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n`;
      breakdown += `\nFinal Credit (lower of A or B, capped at maximum): $${credit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    } else if (creditType === 'pstc') {
      rate = 0.16;
      credit = labour * rate;
      breakdown = `Federal Labour: $${labour.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\nTax Credit Rate: ${(rate * 100).toFixed(0)}%\nTotal Federal Credit: $${credit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }

    const budgetPercent = budget > 0 ? (credit / budget) * 100 : 0;

    return { credit, budgetPercent, breakdown, rate };
  };

  const result = calculateFederal();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <h3 className="text-base font-semibold text-gray-900 mb-3">Federal Tax Credit</h3>

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
