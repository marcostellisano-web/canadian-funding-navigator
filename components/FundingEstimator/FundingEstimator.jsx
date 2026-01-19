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
  const [compareMode, setCompareMode] = useState(false);

  // Scenario 1 state
  const [scenario1Province, setScenario1Province] = useState('ON');
  const [scenario1OnCreditType, setScenario1OnCreditType] = useState('production');
  const [scenario1OnTotalBudget, setScenario1OnTotalBudget] = useState('');
  const [scenario1OnProvincialLabour, setScenario1OnProvincialLabour] = useState('');
  const [scenario1OnProductionExpenses, setScenario1OnProductionExpenses] = useState('');
  const [scenario1OnRegionalBonus, setScenario1OnRegionalBonus] = useState(false);
  const [scenario1BcCreditType, setScenario1BcCreditType] = useState('fibc');
  const [scenario1BcTotalBudget, setScenario1BcTotalBudget] = useState('');
  const [scenario1BcEligibleLabour, setScenario1BcEligibleLabour] = useState('');
  const [scenario1BcTotalDays, setScenario1BcTotalDays] = useState('');
  const [scenario1BcOutsideVancouver, setScenario1BcOutsideVancouver] = useState('');
  const [scenario1BcDistantLocation, setScenario1BcDistantLocation] = useState('');
  // Scenario 1 stackable funding state
  const [scenario1ShowStackable, setScenario1ShowStackable] = useState(false);
  const [scenario1FederalCreditType, setScenario1FederalCreditType] = useState('cptc');
  const [scenario1CanadianLabour, setScenario1CanadianLabour] = useState('');
  const [scenario1CmfFunding, setScenario1CmfFunding] = useState('');

  // Scenario 2 state
  const [scenario2Province, setScenario2Province] = useState('BC');
  const [scenario2OnCreditType, setScenario2OnCreditType] = useState('production');
  const [scenario2OnTotalBudget, setScenario2OnTotalBudget] = useState('');
  const [scenario2OnProvincialLabour, setScenario2OnProvincialLabour] = useState('');
  const [scenario2OnProductionExpenses, setScenario2OnProductionExpenses] = useState('');
  const [scenario2OnRegionalBonus, setScenario2OnRegionalBonus] = useState(false);
  const [scenario2BcCreditType, setScenario2BcCreditType] = useState('fibc');
  const [scenario2BcTotalBudget, setScenario2BcTotalBudget] = useState('');
  const [scenario2BcEligibleLabour, setScenario2BcEligibleLabour] = useState('');
  const [scenario2BcTotalDays, setScenario2BcTotalDays] = useState('');
  const [scenario2BcOutsideVancouver, setScenario2BcOutsideVancouver] = useState('');
  const [scenario2BcDistantLocation, setScenario2BcDistantLocation] = useState('');
  // Scenario 2 stackable funding state
  const [scenario2ShowStackable, setScenario2ShowStackable] = useState(false);
  const [scenario2FederalCreditType, setScenario2FederalCreditType] = useState('cptc');
  const [scenario2CanadianLabour, setScenario2CanadianLabour] = useState('');
  const [scenario2CmfFunding, setScenario2CmfFunding] = useState('');

  // Calculate Ontario tax credit
  const calculateOntario = (creditType, totalBudget, provincialLabour, productionExpenses, regionalBonus) => {
    const labour = parseFloat(provincialLabour) || 0;
    const budget = parseFloat(totalBudget) || 0;
    const expenses = parseFloat(productionExpenses) || 0;

    let credit = 0;
    let breakdown = '';

    if (creditType === 'service') {
      const rate = 0.215;
      const labourCredit = labour * rate;
      const expensesCredit = expenses * rate;
      credit = labourCredit + expensesCredit;
      breakdown = `Labour Credit: $${labourCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (21.5% of $${labour.toLocaleString()})\nProduction Expenses Credit: $${expensesCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (21.5% of $${expenses.toLocaleString()})`;
    } else {
      const baseLabourCredit = labour * 0.35;
      const regionalBonusCredit = regionalBonus ? labour * 0.10 : 0;
      credit = baseLabourCredit + regionalBonusCredit;

      if (regionalBonus) {
        breakdown = `Base Labour Credit: $${baseLabourCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (35% of $${labour.toLocaleString()})\nRegional Bonus: $${regionalBonusCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (10% of $${labour.toLocaleString()})`;
      } else {
        breakdown = `Base Labour Credit: $${baseLabourCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (35% of $${labour.toLocaleString()})`;
      }
    }

    const budgetPercent = budget > 0 ? (credit / budget) * 100 : 0;
    return { credit, budgetPercent, breakdown };
  };

  // Calculate BC tax credit
  const calculateBC = (creditType, totalBudget, eligibleLabour, totalDays, outsideVancouver, distantLocation) => {
    const labour = parseFloat(eligibleLabour) || 0;
    const budget = parseFloat(totalBudget) || 0;
    const days = parseInt(totalDays) || 0;
    const outsideVancouverDays = parseInt(outsideVancouver) || 0;
    const distantDays = parseInt(distantLocation) || 0;

    const outsideVancouverPercent = days ? (outsideVancouverDays / days) : 0;
    const distantPercent = days ? (distantDays / days) : 0;

    const baseCredit = labour * 0.40;
    // Regional bonus: 12.5% prorated by days outside Vancouver, only if 50% or more days outside
    const regionalCredit = outsideVancouverPercent >= 0.5 ? labour * 0.125 * outsideVancouverPercent : 0;
    // Distant location bonus: 6% only if 50% or more days are outside Vancouver
    const distantCredit = outsideVancouverPercent >= 0.5 ? labour * 0.06 * distantPercent : 0;
    const totalCredit = baseCredit + regionalCredit + distantCredit;

    const budgetPercent = budget > 0 ? (totalCredit / budget) * 100 : 0;

    let breakdown = `Base Credit (40%): $${baseCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

    // Regional bonus requires 50% threshold and is prorated
    if (outsideVancouverPercent >= 0.5) {
      breakdown += `\nRegional Bonus (12.5% pro-rated to ${(outsideVancouverPercent * 100).toFixed(1)}% of days): $${regionalCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    } else {
      breakdown += `\nRegional Bonus: Not applicable (less than 50% of days outside Vancouver)`;
    }

    // Distant location bonus requires 50% threshold
    if (outsideVancouverPercent >= 0.5) {
      breakdown += `\nDistant Location Bonus (6% pro-rated to ${(distantPercent * 100).toFixed(1)}% of days): $${distantCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    } else {
      breakdown += `\nDistant Location Bonus: Not applicable (less than 50% of days outside Vancouver)`;
    }

    breakdown += `\nTotal Tax Credit: $${totalCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\nEffective Rate: ${labour > 0 ? ((totalCredit / labour) * 100).toFixed(1) : 0}% of eligible labour`;

    return { credit: totalCredit, budgetPercent, breakdown };
  };

  // Calculate federal tax credit
  const calculateFederal = (federalCreditType, canadianLabour) => {
    const labour = parseFloat(canadianLabour) || 0;
    let credit = 0;
    let rate = 0;

    if (federalCreditType === 'cptc') {
      rate = 0.25;
      credit = labour * rate;
    } else if (federalCreditType === 'pstc') {
      rate = 0.16;
      credit = labour * rate;
    }

    return { credit, rate };
  };

  // Calculate total stackable funding
  const calculateStackable = (provincialCredit, federalCreditType, canadianLabour, cmfFunding) => {
    const federal = calculateFederal(federalCreditType, canadianLabour);
    const cmf = parseFloat(cmfFunding) || 0;
    const total = provincialCredit + federal.credit + cmf;
    return { federalCredit: federal.credit, federalRate: federal.rate, cmfFunding: cmf, total };
  };

  const result1 = scenario1Province === 'ON'
    ? calculateOntario(scenario1OnCreditType, scenario1OnTotalBudget, scenario1OnProvincialLabour, scenario1OnProductionExpenses, scenario1OnRegionalBonus)
    : calculateBC(scenario1BcCreditType, scenario1BcTotalBudget, scenario1BcEligibleLabour, scenario1BcTotalDays, scenario1BcOutsideVancouver, scenario1BcDistantLocation);

  const result2 = compareMode
    ? (scenario2Province === 'ON'
        ? calculateOntario(scenario2OnCreditType, scenario2OnTotalBudget, scenario2OnProvincialLabour, scenario2OnProductionExpenses, scenario2OnRegionalBonus)
        : calculateBC(scenario2BcCreditType, scenario2BcTotalBudget, scenario2BcEligibleLabour, scenario2BcTotalDays, scenario2BcOutsideVancouver, scenario2BcDistantLocation))
    : null;

  // Calculate stackable funding for both scenarios
  const stackable1 = scenario1ShowStackable
    ? calculateStackable(result1.credit, scenario1FederalCreditType, scenario1CanadianLabour, scenario1CmfFunding)
    : null;

  const stackable2 = compareMode && scenario2ShowStackable
    ? calculateStackable(result2.credit, scenario2FederalCreditType, scenario2CanadianLabour, scenario2CmfFunding)
    : null;

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
          <div className="mb-4">
            <label className="block text-sm font-normal text-gray-900 mb-1.5">
              Province
            </label>
            <select
              value={scenario1Province}
              onChange={(e) => setScenario1Province(e.target.value)}
              className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1rem',
                paddingRight: '2.5rem'
              }}
            >
              <option value="ON">Ontario</option>
              <option value="BC">British Columbia</option>
            </select>
          </div>

          {scenario1Province === 'ON' && (
            <OntarioCalculator
              creditType={scenario1OnCreditType}
              setCreditType={setScenario1OnCreditType}
              totalBudget={scenario1OnTotalBudget}
              setTotalBudget={setScenario1OnTotalBudget}
              provincialLabour={scenario1OnProvincialLabour}
              setProvincialLabour={setScenario1OnProvincialLabour}
              productionExpenses={scenario1OnProductionExpenses}
              setProductionExpenses={setScenario1OnProductionExpenses}
              regionalBonus={scenario1OnRegionalBonus}
              setRegionalBonus={setScenario1OnRegionalBonus}
              result={result1}
              showStackable={scenario1ShowStackable}
              setShowStackable={setScenario1ShowStackable}
              federalCreditType={scenario1FederalCreditType}
              setFederalCreditType={setScenario1FederalCreditType}
              canadianLabour={scenario1CanadianLabour}
              setCanadianLabour={setScenario1CanadianLabour}
              cmfFunding={scenario1CmfFunding}
              setCmfFunding={setScenario1CmfFunding}
              stackableResult={stackable1}
            />
          )}

          {scenario1Province === 'BC' && (
            <BCCalculator
              creditType={scenario1BcCreditType}
              setCreditType={setScenario1BcCreditType}
              totalBudget={scenario1BcTotalBudget}
              setTotalBudget={setScenario1BcTotalBudget}
              eligibleLabour={scenario1BcEligibleLabour}
              setEligibleLabour={setScenario1BcEligibleLabour}
              totalDays={scenario1BcTotalDays}
              setTotalDays={setScenario1BcTotalDays}
              outsideVancouver={scenario1BcOutsideVancouver}
              setOutsideVancouver={setScenario1BcOutsideVancouver}
              distantLocation={scenario1BcDistantLocation}
              setDistantLocation={setScenario1BcDistantLocation}
              result={result1}
              showStackable={scenario1ShowStackable}
              setShowStackable={setScenario1ShowStackable}
              federalCreditType={scenario1FederalCreditType}
              setFederalCreditType={setScenario1FederalCreditType}
              canadianLabour={scenario1CanadianLabour}
              setCanadianLabour={setScenario1CanadianLabour}
              cmfFunding={scenario1CmfFunding}
              setCmfFunding={setScenario1CmfFunding}
              stackableResult={stackable1}
            />
          )}
        </div>

        {/* Calculator 2 (Compare Mode) */}
        {compareMode && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="mb-4">
              <label className="block text-sm font-normal text-gray-900 mb-1.5">
                Compare with
                <InfoIcon />
              </label>
              <select
                value={scenario2Province}
                onChange={(e) => setScenario2Province(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1rem',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="BC">British Columbia</option>
                <option value="ON">Ontario</option>
              </select>
            </div>

            {scenario2Province === 'ON' && (
              <OntarioCalculator
                creditType={scenario2OnCreditType}
                setCreditType={setScenario2OnCreditType}
                totalBudget={scenario2OnTotalBudget}
                setTotalBudget={setScenario2OnTotalBudget}
                provincialLabour={scenario2OnProvincialLabour}
                setProvincialLabour={setScenario2OnProvincialLabour}
                productionExpenses={scenario2OnProductionExpenses}
                setProductionExpenses={setScenario2OnProductionExpenses}
                regionalBonus={scenario2OnRegionalBonus}
                setRegionalBonus={setScenario2OnRegionalBonus}
                result={result2}
                showStackable={scenario2ShowStackable}
                setShowStackable={setScenario2ShowStackable}
                federalCreditType={scenario2FederalCreditType}
                setFederalCreditType={setScenario2FederalCreditType}
                canadianLabour={scenario2CanadianLabour}
                setCanadianLabour={setScenario2CanadianLabour}
                cmfFunding={scenario2CmfFunding}
                setCmfFunding={setScenario2CmfFunding}
                stackableResult={stackable2}
              />
            )}

            {scenario2Province === 'BC' && (
              <BCCalculator
                creditType={scenario2BcCreditType}
                setCreditType={setScenario2BcCreditType}
                totalBudget={scenario2BcTotalBudget}
                setTotalBudget={setScenario2BcTotalBudget}
                eligibleLabour={scenario2BcEligibleLabour}
                setEligibleLabour={setScenario2BcEligibleLabour}
                totalDays={scenario2BcTotalDays}
                setTotalDays={setScenario2BcTotalDays}
                outsideVancouver={scenario2BcOutsideVancouver}
                setOutsideVancouver={setScenario2BcOutsideVancouver}
                distantLocation={scenario2BcDistantLocation}
                setDistantLocation={setScenario2BcDistantLocation}
                result={result2}
                showStackable={scenario2ShowStackable}
                setShowStackable={setScenario2ShowStackable}
                federalCreditType={scenario2FederalCreditType}
                setFederalCreditType={setScenario2FederalCreditType}
                canadianLabour={scenario2CanadianLabour}
                setCanadianLabour={setScenario2CanadianLabour}
                cmfFunding={scenario2CmfFunding}
                setCmfFunding={setScenario2CmfFunding}
                stackableResult={stackable2}
              />
            )}
          </div>
        )}
      </div>

      {/* Comparison Summary */}
      {compareMode && result2 && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Comparison Summary</h3>
          <div className="space-y-2">
            {/* Scenario 1 */}
            <div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-900">
                  {scenario1Province === 'ON' ? 'Ontario' : 'British Columbia'} - {
                    scenario1Province === 'ON'
                      ? (scenario1OnCreditType === 'production' ? 'OFTTC' : 'OPSTC')
                      : (scenario1BcCreditType === 'fibc' ? 'FIBC' : 'PSTC')
                  }
                </span>
                <span className="text-xl font-bold text-gray-900">
                  ${result1.credit.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-gray-600">Percentage of budget</span>
                <span className="text-sm font-medium text-gray-900">{result1.budgetPercent.toFixed(2)}%</span>
              </div>
              {stackable1 && (
                <div className="flex justify-between items-center py-2 bg-blue-50 px-2 rounded">
                  <span className="text-xs text-gray-600 font-medium">With stackable funding</span>
                  <span className="text-sm font-bold text-gray-900">${stackable1.total.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
                </div>
              )}
            </div>

            {/* Scenario 2 */}
            <div className="mt-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-900">
                  {scenario2Province === 'ON' ? 'Ontario' : 'British Columbia'} - {
                    scenario2Province === 'ON'
                      ? (scenario2OnCreditType === 'production' ? 'OFTTC' : 'OPSTC')
                      : (scenario2BcCreditType === 'fibc' ? 'FIBC' : 'PSTC')
                  }
                </span>
                <span className="text-xl font-bold text-gray-900">
                  ${result2.credit.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-gray-600">Percentage of budget</span>
                <span className="text-sm font-medium text-gray-900">{result2.budgetPercent.toFixed(2)}%</span>
              </div>
              {stackable2 && (
                <div className="flex justify-between items-center py-2 bg-blue-50 px-2 rounded">
                  <span className="text-xs text-gray-600 font-medium">With stackable funding</span>
                  <span className="text-sm font-bold text-gray-900">${stackable2.total.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
                </div>
              )}
            </div>

            {/* Difference */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm font-semibold text-gray-900">
                  {stackable1 || stackable2 ? 'Provincial credit difference' : 'Difference'}
                </span>
                <span className="text-xl font-bold text-gray-900">
                  ${Math.abs(result2.credit - result1.credit).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-gray-600">In favor of</span>
                <span className="text-sm font-medium text-gray-900">
                  {result2.credit > result1.credit
                    ? `${scenario2Province === 'ON' ? 'Ontario' : 'BC'} ${scenario2Province === 'ON' ? (scenario2OnCreditType === 'production' ? 'OFTTC' : 'OPSTC') : (scenario2BcCreditType === 'fibc' ? 'FIBC' : 'PSTC')}`
                    : `${scenario1Province === 'ON' ? 'Ontario' : 'BC'} ${scenario1Province === 'ON' ? (scenario1OnCreditType === 'production' ? 'OFTTC' : 'OPSTC') : (scenario1BcCreditType === 'fibc' ? 'FIBC' : 'PSTC')}`
                  }
                </span>
              </div>
              {/* Stackable funding difference */}
              {stackable1 && stackable2 && (
                <>
                  <div className="flex justify-between items-center py-2 mt-3 pt-3 border-t border-gray-200">
                    <span className="text-sm font-semibold text-gray-900">Total stackable difference</span>
                    <span className="text-xl font-bold text-gray-900">
                      ${Math.abs(stackable2.total - stackable1.total).toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-xs text-gray-600">In favor of</span>
                    <span className="text-sm font-medium text-gray-900">
                      {stackable2.total > stackable1.total
                        ? `${scenario2Province === 'ON' ? 'Ontario' : 'BC'} ${scenario2Province === 'ON' ? (scenario2OnCreditType === 'production' ? 'OFTTC' : 'OPSTC') : (scenario2BcCreditType === 'fibc' ? 'FIBC' : 'PSTC')}`
                        : `${scenario1Province === 'ON' ? 'Ontario' : 'BC'} ${scenario1Province === 'ON' ? (scenario1OnCreditType === 'production' ? 'OFTTC' : 'OPSTC') : (scenario1BcCreditType === 'fibc' ? 'FIBC' : 'PSTC')}`
                      }
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
