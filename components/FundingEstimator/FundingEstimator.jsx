import React, { useState } from 'react';
import OntarioCalculator from './OntarioCalculator';
import BCCalculator from './BCCalculator';

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

export default function FundingEstimator() {
  const [selectedProvince, setSelectedProvince] = useState('ON');
  const [compareMode, setCompareMode] = useState(false);
  const [compareProvince, setCompareProvince] = useState('BC');

  // Ontario state
  const [onCreditType, setOnCreditType] = useState('service');
  const [onTotalBudget, setOnTotalBudget] = useState('');
  const [onProvincialLabour, setOnProvincialLabour] = useState('');
  const [onProductionExpenses, setOnProductionExpenses] = useState('');
  const [onRegionalBonus, setOnRegionalBonus] = useState(false);

  // BC state
  const [bcTotalBudget, setBcTotalBudget] = useState('');
  const [bcEligibleLabour, setBcEligibleLabour] = useState('');
  const [bcTotalDays, setBcTotalDays] = useState('');
  const [bcOutsideVancouver, setBcOutsideVancouver] = useState('');
  const [bcDistantLocation, setBcDistantLocation] = useState('');

  // Calculate Ontario tax credit
  const calculateOntario = () => {
    const labour = parseFloat(onProvincialLabour) || 0;
    const totalBudget = parseFloat(onTotalBudget) || 0;
    const productionExpenses = parseFloat(onProductionExpenses) || 0;

    let credit = 0;
    let breakdown = '';

    if (onCreditType === 'service') {
      const rate = 0.215;
      const labourCredit = labour * rate;
      const expensesCredit = productionExpenses * rate;
      credit = labourCredit + expensesCredit;
      breakdown = `Labour Credit: $${labourCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (21.5% of $${labour.toLocaleString()})\nProduction Expenses Credit: $${expensesCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (21.5% of $${productionExpenses.toLocaleString()})`;
    } else {
      const rate = onRegionalBonus ? 0.45 : 0.35;
      credit = labour * rate;
      breakdown = `Labour Credit: $${credit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (${(rate * 100)}% of $${labour.toLocaleString()})`;
    }

    const budgetPercent = totalBudget > 0 ? (credit / totalBudget) * 100 : 0;
    return { credit, budgetPercent, breakdown };
  };

  // Calculate BC tax credit
  const calculateBC = () => {
    const eligibleLabour = parseFloat(bcEligibleLabour) || 0;
    const totalBudget = parseFloat(bcTotalBudget) || 0;
    const totalDays = parseInt(bcTotalDays) || 0;
    const outsideVancouverDays = parseInt(bcOutsideVancouver) || 0;
    const distantDays = parseInt(bcDistantLocation) || 0;

    const outsideVancouverPercent = totalDays ? (outsideVancouverDays / totalDays) : 0;
    const distantPercent = totalDays ? (distantDays / totalDays) : 0;

    const baseCredit = eligibleLabour * 0.35;
    const regionalCredit = eligibleLabour * 0.06 * outsideVancouverPercent;
    const distantCredit = eligibleLabour * 0.06 * distantPercent;
    const totalCredit = baseCredit + regionalCredit + distantCredit;

    const budgetPercent = totalBudget > 0 ? (totalCredit / totalBudget) * 100 : 0;

    const breakdown = `Base Credit (35%): $${baseCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\nRegional Bonus (6% pro-rated to ${(outsideVancouverPercent * 100).toFixed(1)}% of days): $${regionalCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\nDistant Location Bonus (6% pro-rated to ${(distantPercent * 100).toFixed(1)}% of days): $${distantCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\nTotal Tax Credit: $${totalCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\nEffective Rate: ${((totalCredit / eligibleLabour) * 100).toFixed(1)}% of eligible labour`;

    return { credit: totalCredit, budgetPercent, breakdown };
  };

  const result1 = selectedProvince === 'ON' ? calculateOntario() : calculateBC();
  const result2 = compareMode ? (compareProvince === 'ON' ? calculateOntario() : calculateBC()) : null;

  return (
    <div className="space-y-6">
      {/* Compare Toggle */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Tax Credit Estimator</h2>
        <button
          onClick={() => setCompareMode(!compareMode)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          {compareMode ? 'Single View' : 'Compare Provinces'}
        </button>
      </div>

      {/* Calculators */}
      <div className={`grid ${compareMode ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-6`}>
        {/* Calculator 1 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="mb-6">
            <label className="block text-sm font-normal text-gray-900 mb-2">
              Province
              <InfoIcon />
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full px-5 py-4 text-base bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1.25rem center',
                backgroundSize: '1.25rem',
                paddingRight: '3rem'
              }}
            >
              <option value="ON">Ontario</option>
              <option value="BC">British Columbia</option>
            </select>
          </div>

          {selectedProvince === 'ON' && (
            <OntarioCalculator
              creditType={onCreditType}
              setCreditType={setOnCreditType}
              totalBudget={onTotalBudget}
              setTotalBudget={setOnTotalBudget}
              provincialLabour={onProvincialLabour}
              setProvincialLabour={setOnProvincialLabour}
              productionExpenses={onProductionExpenses}
              setProductionExpenses={setOnProductionExpenses}
              regionalBonus={onRegionalBonus}
              setRegionalBonus={setOnRegionalBonus}
              result={result1}
            />
          )}

          {selectedProvince === 'BC' && (
            <BCCalculator
              totalBudget={bcTotalBudget}
              setTotalBudget={setBcTotalBudget}
              eligibleLabour={bcEligibleLabour}
              setEligibleLabour={setBcEligibleLabour}
              totalDays={bcTotalDays}
              setTotalDays={setBcTotalDays}
              outsideVancouver={bcOutsideVancouver}
              setOutsideVancouver={setBcOutsideVancouver}
              distantLocation={bcDistantLocation}
              setDistantLocation={setBcDistantLocation}
              result={result1}
            />
          )}
        </div>

        {/* Calculator 2 (Compare Mode) */}
        {compareMode && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="mb-6">
              <label className="block text-sm font-normal text-gray-900 mb-2">
                Compare with
                <InfoIcon />
              </label>
              <select
                value={compareProvince}
                onChange={(e) => setCompareProvince(e.target.value)}
                className="w-full px-5 py-4 text-base bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1.25rem center',
                  backgroundSize: '1.25rem',
                  paddingRight: '3rem'
                }}
              >
                <option value="BC">British Columbia</option>
                <option value="ON">Ontario</option>
              </select>
            </div>

            {compareProvince === 'ON' && (
              <OntarioCalculator
                creditType={onCreditType}
                setCreditType={setOnCreditType}
                totalBudget={onTotalBudget}
                setTotalBudget={setOnTotalBudget}
                provincialLabour={onProvincialLabour}
                setProvincialLabour={setOnProvincialLabour}
                productionExpenses={onProductionExpenses}
                setProductionExpenses={setOnProductionExpenses}
                regionalBonus={onRegionalBonus}
                setRegionalBonus={setOnRegionalBonus}
                result={result2}
              />
            )}

            {compareProvince === 'BC' && (
              <BCCalculator
                totalBudget={bcTotalBudget}
                setTotalBudget={setBcTotalBudget}
                eligibleLabour={bcEligibleLabour}
                setEligibleLabour={setBcEligibleLabour}
                totalDays={bcTotalDays}
                setTotalDays={setBcTotalDays}
                outsideVancouver={bcOutsideVancouver}
                setOutsideVancouver={setBcOutsideVancouver}
                distantLocation={bcDistantLocation}
                setDistantLocation={setBcDistantLocation}
                result={result2}
              />
            )}
          </div>
        )}
      </div>

      {/* Comparison Summary */}
      {compareMode && result2 && (
        <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Comparison Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">{selectedProvince === 'ON' ? 'Ontario' : 'British Columbia'}:</span>
              <span className="text-lg">${result1.credit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ({result1.budgetPercent.toFixed(1)}% of budget)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">{compareProvince === 'ON' ? 'Ontario' : 'British Columbia'}:</span>
              <span className="text-lg">${result2.credit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} ({result2.budgetPercent.toFixed(1)}% of budget)</span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 bg-blue-50 p-4 rounded-lg">
              <div className="text-center">
                <span className="text-blue-700 font-semibold">Difference: </span>
                <span className="text-xl font-bold text-blue-700">
                  ${Math.abs(result2.credit - result1.credit).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </span>
                <span className="text-blue-700 font-semibold"> in favor of {result2.credit > result1.credit ? (compareProvince === 'ON' ? 'Ontario' : 'British Columbia') : (selectedProvince === 'ON' ? 'Ontario' : 'British Columbia')}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
