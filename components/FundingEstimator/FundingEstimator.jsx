import React, { useState } from 'react';
import OntarioCalculator from './OntarioCalculator';
import BCCalculator from './BCCalculator';
import NewfoundlandCalculator from './NewfoundlandCalculator';
import FederalTaxCreditCalculator from './FederalTaxCreditCalculator';
import CMFCalculator from './CMFCalculator';
import FundingSummary from './FundingSummary';

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

const ChevronIcon = ({ isOpen }) => (
  <svg
    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

export default function FundingEstimator() {
  const [compareMode, setCompareMode] = useState(false);

  // Collapsible section state for Scenario 1
  const [scenario1CmfOpen, setScenario1CmfOpen] = useState(false);
  const [scenario1ProvincialOpen, setScenario1ProvincialOpen] = useState(false);
  const [scenario1FederalOpen, setScenario1FederalOpen] = useState(false);

  // Collapsible section state for Scenario 2
  const [scenario2CmfOpen, setScenario2CmfOpen] = useState(false);
  const [scenario2ProvincialOpen, setScenario2ProvincialOpen] = useState(false);
  const [scenario2FederalOpen, setScenario2FederalOpen] = useState(false);

  // Scenario 1 state - Provincial
  const [scenario1Province, setScenario1Province] = useState('ON');
  const [scenario1TotalBudget, setScenario1TotalBudget] = useState('');
  const [scenario1OnCreditType, setScenario1OnCreditType] = useState('production');
  const [scenario1OnProvincialLabour, setScenario1OnProvincialLabour] = useState('');
  const [scenario1OnProductionExpenses, setScenario1OnProductionExpenses] = useState('');
  const [scenario1OnRegionalBonus, setScenario1OnRegionalBonus] = useState(false);
  const [scenario1BcCreditType, setScenario1BcCreditType] = useState('fibc');
  const [scenario1BcEligibleLabour, setScenario1BcEligibleLabour] = useState('');
  const [scenario1BcTotalDays, setScenario1BcTotalDays] = useState('');
  const [scenario1BcOutsideVancouver, setScenario1BcOutsideVancouver] = useState('');
  const [scenario1BcDistantLocation, setScenario1BcDistantLocation] = useState('');
  const [scenario1NlCreditType, setScenario1NlCreditType] = useState('labour');
  const [scenario1NlProvincialLabour, setScenario1NlProvincialLabour] = useState('');
  const [scenario1NlProductionExpenditures, setScenario1NlProductionExpenditures] = useState('');

  // Scenario 1 state - Federal
  const [scenario1FederalCreditType, setScenario1FederalCreditType] = useState('cptc');
  const [scenario1CanadianLabour, setScenario1CanadianLabour] = useState('');

  // Scenario 1 state - CMF
  const [scenario1CmfFunding, setScenario1CmfFunding] = useState('');

  // Scenario 2 state - Provincial
  const [scenario2Province, setScenario2Province] = useState('BC');
  const [scenario2TotalBudget, setScenario2TotalBudget] = useState('');
  const [scenario2OnCreditType, setScenario2OnCreditType] = useState('production');
  const [scenario2OnProvincialLabour, setScenario2OnProvincialLabour] = useState('');
  const [scenario2OnProductionExpenses, setScenario2OnProductionExpenses] = useState('');
  const [scenario2OnRegionalBonus, setScenario2OnRegionalBonus] = useState(false);
  const [scenario2BcCreditType, setScenario2BcCreditType] = useState('fibc');
  const [scenario2BcEligibleLabour, setScenario2BcEligibleLabour] = useState('');
  const [scenario2BcTotalDays, setScenario2BcTotalDays] = useState('');
  const [scenario2BcOutsideVancouver, setScenario2BcOutsideVancouver] = useState('');
  const [scenario2BcDistantLocation, setScenario2BcDistantLocation] = useState('');
  const [scenario2NlCreditType, setScenario2NlCreditType] = useState('labour');
  const [scenario2NlProvincialLabour, setScenario2NlProvincialLabour] = useState('');
  const [scenario2NlProductionExpenditures, setScenario2NlProductionExpenditures] = useState('');

  // Scenario 2 state - Federal
  const [scenario2FederalCreditType, setScenario2FederalCreditType] = useState('cptc');
  const [scenario2CanadianLabour, setScenario2CanadianLabour] = useState('');

  // Scenario 2 state - CMF
  const [scenario2CmfFunding, setScenario2CmfFunding] = useState('');

  // Utility functions
  const formatNumber = (value) => {
    if (!value) return '';
    const numStr = value.toString().replace(/,/g, '');
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleNumberInput = (value, setter) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    setter(numericValue);
  };

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

  // Calculate Newfoundland tax credit
  const calculateNewfoundland = (creditType, totalBudget, provincialLabour, productionExpenditures) => {
    const budget = parseFloat(totalBudget) || 0;
    const labour = parseFloat(provincialLabour) || 0;
    const expenditures = parseFloat(productionExpenditures) || 0;

    let credit = 0;
    let breakdown = '';

    if (creditType === 'labour') {
      // Labour-based: 40% of labour, capped at 25% of total production budget
      const labourCredit = labour * 0.40;
      const budgetCap = budget * 0.25;
      credit = Math.min(labourCredit, budgetCap);

      if (labourCredit > budgetCap && budget > 0) {
        breakdown = `Calculated Credit: $${labourCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (40% of $${labour.toLocaleString()})\nBudget Cap: $${budgetCap.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (25% of $${budget.toLocaleString()})\nFinal Credit (capped): $${credit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
      } else {
        breakdown = `Labour Credit: $${credit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (40% of $${labour.toLocaleString()})`;
        if (budget > 0) {
          breakdown += `\nWithin budget cap of $${budgetCap.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (25% of budget)`;
        }
      }
    } else {
      // All Spend: 40% of all qualifying production expenditures
      credit = expenditures * 0.40;
      breakdown = `All Spend Credit: $${credit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (40% of $${expenditures.toLocaleString()})`;
    }

    const budgetPercent = budget > 0 ? (credit / budget) * 100 : 0;
    return { credit, budgetPercent, breakdown };
  };

  // Calculate federal tax credit
  const calculateFederal = (federalCreditType, canadianLabour, totalBudget, provincialTaxCredit) => {
    const labour = parseFloat(canadianLabour) || 0;
    const budget = parseFloat(totalBudget) || 0;
    const provincialCredit = parseFloat(provincialTaxCredit) || 0;
    let credit = 0;

    if (federalCreditType === 'cptc') {
      // CPTC (CANCON) Calculation
      // Net Production Cost is capped at 60%
      // Labour is capped at 60% of budget
      // Take the LESSER of the two capped values
      // Then multiply by 25%
      const netProductionCosts = Math.max(0, budget - provincialCredit);

      // Cap net production costs at 60%
      const cappedNetProductionCosts = netProductionCosts * 0.6;

      // Cap the eligible Canadian labour at 60% of budget
      const labourCap = budget * 0.6;
      const cappedLabour = Math.min(labour, labourCap);

      // Take the lesser of capped net production costs or capped labour
      const lesserAmount = Math.min(cappedNetProductionCosts, cappedLabour);

      // Apply 25% rate to the lesser amount
      credit = lesserAmount * 0.25;
    } else if (federalCreditType === 'pstc') {
      // PSTC Calculation
      // Eligible Canadian labour cannot exceed Total Budget
      // Cap labour at total budget
      const cappedLabour = Math.min(labour, budget);
      credit = cappedLabour * 0.16;
    }

    return credit;
  };

  const getProvincialResult = (province, scenario) => {
    if (scenario === 1) {
      if (province === 'ON') {
        return calculateOntario(scenario1OnCreditType, scenario1TotalBudget, scenario1OnProvincialLabour, scenario1OnProductionExpenses, scenario1OnRegionalBonus);
      } else if (province === 'BC') {
        return calculateBC(scenario1BcCreditType, scenario1TotalBudget, scenario1BcEligibleLabour, scenario1BcTotalDays, scenario1BcOutsideVancouver, scenario1BcDistantLocation);
      } else if (province === 'NL') {
        return calculateNewfoundland(scenario1NlCreditType, scenario1TotalBudget, scenario1NlProvincialLabour, scenario1NlProductionExpenditures);
      }
    } else {
      if (province === 'ON') {
        return calculateOntario(scenario2OnCreditType, scenario2TotalBudget, scenario2OnProvincialLabour, scenario2OnProductionExpenses, scenario2OnRegionalBonus);
      } else if (province === 'BC') {
        return calculateBC(scenario2BcCreditType, scenario2TotalBudget, scenario2BcEligibleLabour, scenario2BcTotalDays, scenario2BcOutsideVancouver, scenario2BcDistantLocation);
      } else if (province === 'NL') {
        return calculateNewfoundland(scenario2NlCreditType, scenario2TotalBudget, scenario2NlProvincialLabour, scenario2NlProductionExpenditures);
      }
    }
    return { credit: 0, budgetPercent: 0, breakdown: '' };
  };

  const getProvinceName = (code) => {
    const names = { 'ON': 'Ontario', 'BC': 'BC', 'NL': 'Newfoundland & Labrador' };
    return names[code] || code;
  };

  const result1 = getProvincialResult(scenario1Province, 1);
  const result2 = compareMode ? getProvincialResult(scenario2Province, 2) : null;

  // Calculate federal credits
  const federal1 = calculateFederal(scenario1FederalCreditType, scenario1CanadianLabour, scenario1TotalBudget, result1.credit);
  const federal2 = compareMode ? calculateFederal(scenario2FederalCreditType, scenario2CanadianLabour, scenario2TotalBudget, result2.credit) : 0;

  return (
    <div className="space-y-6">
      {/* Compare Toggle */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Funding Estimator</h2>
        <button
          onClick={() => setCompareMode(!compareMode)}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          {compareMode ? 'Single View' : 'Compare Provinces'}
        </button>
      </div>

      {/* Calculators */}
      <div className={`grid ${compareMode ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-6`}>
        {/* Scenario 1 */}
        <div className="space-y-4">
          {/* Province and Total Budget */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
            <div>
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
                <option value="NL">Newfoundland & Labrador</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-normal text-gray-900 mb-1.5">
                Total budget
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 text-sm">$</span>
                <input
                  type="text"
                  value={formatNumber(scenario1TotalBudget)}
                  onChange={(e) => handleNumberInput(e.target.value, setScenario1TotalBudget)}
                  placeholder="0"
                  className="w-full pl-8 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* CMF Calculator */}
          <div>
            <button
              onClick={() => setScenario1CmfOpen(!scenario1CmfOpen)}
              className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 mb-2 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-semibold text-gray-900">CMF Funding</span>
              <ChevronIcon isOpen={scenario1CmfOpen} />
            </button>
            {scenario1CmfOpen && (
              <CMFCalculator
                cmfFunding={scenario1CmfFunding}
                setCmfFunding={setScenario1CmfFunding}
                totalBudget={scenario1TotalBudget}
                province={scenario1Province}
                formatNumber={formatNumber}
                handleNumberInput={handleNumberInput}
              />
            )}
          </div>

          {/* Provincial Calculator */}
          <div>
            <button
              onClick={() => setScenario1ProvincialOpen(!scenario1ProvincialOpen)}
              className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 mb-2 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-semibold text-gray-900">Provincial Tax Credits</span>
              <ChevronIcon isOpen={scenario1ProvincialOpen} />
            </button>
            {scenario1ProvincialOpen && (
              <>
                {scenario1Province === 'ON' && (
                  <OntarioCalculator
                    creditType={scenario1OnCreditType}
                    setCreditType={setScenario1OnCreditType}
                    provincialLabour={scenario1OnProvincialLabour}
                    setProvincialLabour={setScenario1OnProvincialLabour}
                    productionExpenses={scenario1OnProductionExpenses}
                    setProductionExpenses={setScenario1OnProductionExpenses}
                    regionalBonus={scenario1OnRegionalBonus}
                    setRegionalBonus={setScenario1OnRegionalBonus}
                    result={result1}
                    formatNumber={formatNumber}
                    handleNumberInput={handleNumberInput}
                  />
                )}

                {scenario1Province === 'BC' && (
                  <BCCalculator
                    creditType={scenario1BcCreditType}
                    setCreditType={setScenario1BcCreditType}
                    eligibleLabour={scenario1BcEligibleLabour}
                    setEligibleLabour={setScenario1BcEligibleLabour}
                    totalDays={scenario1BcTotalDays}
                    setTotalDays={setScenario1BcTotalDays}
                    outsideVancouver={scenario1BcOutsideVancouver}
                    setOutsideVancouver={setScenario1BcOutsideVancouver}
                    distantLocation={scenario1BcDistantLocation}
                    setDistantLocation={setScenario1BcDistantLocation}
                    result={result1}
                    formatNumber={formatNumber}
                    handleNumberInput={handleNumberInput}
                  />
                )}

                {scenario1Province === 'NL' && (
                  <NewfoundlandCalculator
                    creditType={scenario1NlCreditType}
                    setCreditType={setScenario1NlCreditType}
                    provincialLabour={scenario1NlProvincialLabour}
                    setProvincialLabour={setScenario1NlProvincialLabour}
                    productionExpenditures={scenario1NlProductionExpenditures}
                    setProductionExpenditures={setScenario1NlProductionExpenditures}
                    totalBudget={scenario1TotalBudget}
                    result={result1}
                    formatNumber={formatNumber}
                    handleNumberInput={handleNumberInput}
                  />
                )}
              </>
            )}
          </div>

          {/* Federal Calculator */}
          <div>
            <button
              onClick={() => setScenario1FederalOpen(!scenario1FederalOpen)}
              className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 mb-2 hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-semibold text-gray-900">Federal Tax Credit</span>
              <ChevronIcon isOpen={scenario1FederalOpen} />
            </button>
            {scenario1FederalOpen && (
              <FederalTaxCreditCalculator
                creditType={scenario1FederalCreditType}
                setCreditType={setScenario1FederalCreditType}
                canadianLabour={scenario1CanadianLabour}
                setCanadianLabour={setScenario1CanadianLabour}
                totalBudget={scenario1TotalBudget}
                provincialTaxCredit={result1.credit}
                formatNumber={formatNumber}
                handleNumberInput={handleNumberInput}
              />
            )}
          </div>

          {/* Summary */}
          <FundingSummary
            provincialCredit={result1.credit}
            provinceName={getProvinceName(scenario1Province)}
            federalCredit={federal1}
            cmfFunding={scenario1CmfFunding}
            totalBudget={scenario1TotalBudget}
          />
        </div>

        {/* Scenario 2 (Compare Mode) */}
        {compareMode && (
          <div className="space-y-4">
            {/* Province and Total Budget */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
              <div>
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
                  <option value="NL">Newfoundland & Labrador</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-normal text-gray-900 mb-1.5">
                  Total budget
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 text-sm">$</span>
                  <input
                    type="text"
                    value={formatNumber(scenario2TotalBudget)}
                    onChange={(e) => handleNumberInput(e.target.value, setScenario2TotalBudget)}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* CMF Calculator */}
            <div>
              <button
                onClick={() => setScenario2CmfOpen(!scenario2CmfOpen)}
                className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 mb-2 hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-semibold text-gray-900">CMF Funding</span>
                <ChevronIcon isOpen={scenario2CmfOpen} />
              </button>
              {scenario2CmfOpen && (
                <CMFCalculator
                  cmfFunding={scenario2CmfFunding}
                  setCmfFunding={setScenario2CmfFunding}
                  totalBudget={scenario2TotalBudget}
                  province={scenario2Province}
                  formatNumber={formatNumber}
                  handleNumberInput={handleNumberInput}
                />
              )}
            </div>

            {/* Provincial Calculator */}
            <div>
              <button
                onClick={() => setScenario2ProvincialOpen(!scenario2ProvincialOpen)}
                className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 mb-2 hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-semibold text-gray-900">Provincial Tax Credits</span>
                <ChevronIcon isOpen={scenario2ProvincialOpen} />
              </button>
              {scenario2ProvincialOpen && (
                <>
                  {scenario2Province === 'ON' && (
                    <OntarioCalculator
                      creditType={scenario2OnCreditType}
                      setCreditType={setScenario2OnCreditType}
                      provincialLabour={scenario2OnProvincialLabour}
                      setProvincialLabour={setScenario2OnProvincialLabour}
                      productionExpenses={scenario2OnProductionExpenses}
                      setProductionExpenses={setScenario2OnProductionExpenses}
                      regionalBonus={scenario2OnRegionalBonus}
                      setRegionalBonus={setScenario2OnRegionalBonus}
                      result={result2}
                      formatNumber={formatNumber}
                      handleNumberInput={handleNumberInput}
                    />
                  )}

                  {scenario2Province === 'BC' && (
                    <BCCalculator
                      creditType={scenario2BcCreditType}
                      setCreditType={setScenario2BcCreditType}
                      eligibleLabour={scenario2BcEligibleLabour}
                      setEligibleLabour={setScenario2BcEligibleLabour}
                      totalDays={scenario2BcTotalDays}
                      setTotalDays={setScenario2BcTotalDays}
                      outsideVancouver={scenario2BcOutsideVancouver}
                      setOutsideVancouver={setScenario2BcOutsideVancouver}
                      distantLocation={scenario2BcDistantLocation}
                      setDistantLocation={setScenario2BcDistantLocation}
                      result={result2}
                      formatNumber={formatNumber}
                      handleNumberInput={handleNumberInput}
                    />
                  )}

                  {scenario2Province === 'NL' && (
                    <NewfoundlandCalculator
                      creditType={scenario2NlCreditType}
                      setCreditType={setScenario2NlCreditType}
                      provincialLabour={scenario2NlProvincialLabour}
                      setProvincialLabour={setScenario2NlProvincialLabour}
                      productionExpenditures={scenario2NlProductionExpenditures}
                      setProductionExpenditures={setScenario2NlProductionExpenditures}
                      totalBudget={scenario2TotalBudget}
                      result={result2}
                      formatNumber={formatNumber}
                      handleNumberInput={handleNumberInput}
                    />
                  )}
                </>
              )}
            </div>

            {/* Federal Calculator */}
            <div>
              <button
                onClick={() => setScenario2FederalOpen(!scenario2FederalOpen)}
                className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3 mb-2 hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-semibold text-gray-900">Federal Tax Credit</span>
                <ChevronIcon isOpen={scenario2FederalOpen} />
              </button>
              {scenario2FederalOpen && (
                <FederalTaxCreditCalculator
                  creditType={scenario2FederalCreditType}
                  setCreditType={setScenario2FederalCreditType}
                  canadianLabour={scenario2CanadianLabour}
                  setCanadianLabour={setScenario2CanadianLabour}
                  totalBudget={scenario2TotalBudget}
                  provincialTaxCredit={result2.credit}
                  formatNumber={formatNumber}
                  handleNumberInput={handleNumberInput}
                />
              )}
            </div>

            {/* Summary */}
            <FundingSummary
              provincialCredit={result2.credit}
              provinceName={getProvinceName(scenario2Province)}
              federalCredit={federal2}
              cmfFunding={scenario2CmfFunding}
              totalBudget={scenario2TotalBudget}
            />
          </div>
        )}
      </div>
    </div>
  );
}
