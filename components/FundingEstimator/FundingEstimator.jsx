import React, { useState } from 'react';
import OntarioCalculator from './OntarioCalculator';
import BCCalculator from './BCCalculator';
import NewfoundlandCalculator from './NewfoundlandCalculator';
import AlbertaCalculator from './AlbertaCalculator';
import SaskatchewanCalculator from './SaskatchewanCalculator';
import QuebecCalculator from './QuebecCalculator';
import ManitobaCalculator from './ManitobaCalculator';
import NovaScotiaCalculator from './NovaScotiaCalculator';
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
  const [scenario1AbCreditType, setScenario1AbCreditType] = useState('base');
  const [scenario1AbProductionExpenditures, setScenario1AbProductionExpenditures] = useState('');
  const [scenario1SkCreditType, setScenario1SkCreditType] = useState('saskatchewan');
  const [scenario1SkProductionExpenditures, setScenario1SkProductionExpenditures] = useState('');
  const [scenario1SkRuralBonus, setScenario1SkRuralBonus] = useState(false);
  const [scenario1SkPostProductionBonus, setScenario1SkPostProductionBonus] = useState(false);
  const [scenario1QcCreditType, setScenario1QcCreditType] = useState('production');
  const [scenario1QcProvincialLabour, setScenario1QcProvincialLabour] = useState('');
  const [scenario1QcProductionExpenditures, setScenario1QcProductionExpenditures] = useState('');
  const [scenario1MbCreditType, setScenario1MbCreditType] = useState('salaries');
  const [scenario1MbProvincialLabour, setScenario1MbProvincialLabour] = useState('');
  const [scenario1MbProductionExpenditures, setScenario1MbProductionExpenditures] = useState('');
  const [scenario1MbFrequentFilmingBonus, setScenario1MbFrequentFilmingBonus] = useState(false);
  const [scenario1MbManitobaProducerBonus, setScenario1MbManitobaProducerBonus] = useState(false);
  const [scenario1MbRuralNorthernBonus, setScenario1MbRuralNorthernBonus] = useState(false);
  const [scenario1MbProductionCompanyBonus, setScenario1MbProductionCompanyBonus] = useState(false);
  const [scenario1NsCreditType, setScenario1NsCreditType] = useState('stream1');
  const [scenario1NsProductionExpenditures, setScenario1NsProductionExpenditures] = useState('');
  const [scenario1NsLocationIncentive, setScenario1NsLocationIncentive] = useState(false);
  const [scenario1NsTotalShootDays, setScenario1NsTotalShootDays] = useState('');
  const [scenario1NsZoneADays, setScenario1NsZoneADays] = useState('');
  const [scenario1NsZoneBDays, setScenario1NsZoneBDays] = useState('');
  const [scenario1NsShootingLengthIncentive, setScenario1NsShootingLengthIncentive] = useState(false);

  // Scenario 1 state - Federal
  const [scenario1FederalCreditType, setScenario1FederalCreditType] = useState('cptc');
  const [scenario1CanadianLabour, setScenario1CanadianLabour] = useState('');

  // Scenario 1 state - CMF
  const [scenario1CmfFunding, setScenario1CmfFunding] = useState('');
  const [scenario1CmfProgram, setScenario1CmfProgram] = useState('none');

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
  const [scenario2AbCreditType, setScenario2AbCreditType] = useState('base');
  const [scenario2AbProductionExpenditures, setScenario2AbProductionExpenditures] = useState('');
  const [scenario2SkCreditType, setScenario2SkCreditType] = useState('saskatchewan');
  const [scenario2SkProductionExpenditures, setScenario2SkProductionExpenditures] = useState('');
  const [scenario2SkRuralBonus, setScenario2SkRuralBonus] = useState(false);
  const [scenario2SkPostProductionBonus, setScenario2SkPostProductionBonus] = useState(false);
  const [scenario2QcCreditType, setScenario2QcCreditType] = useState('production');
  const [scenario2QcProvincialLabour, setScenario2QcProvincialLabour] = useState('');
  const [scenario2QcProductionExpenditures, setScenario2QcProductionExpenditures] = useState('');
  const [scenario2MbCreditType, setScenario2MbCreditType] = useState('salaries');
  const [scenario2MbProvincialLabour, setScenario2MbProvincialLabour] = useState('');
  const [scenario2MbProductionExpenditures, setScenario2MbProductionExpenditures] = useState('');
  const [scenario2MbFrequentFilmingBonus, setScenario2MbFrequentFilmingBonus] = useState(false);
  const [scenario2MbManitobaProducerBonus, setScenario2MbManitobaProducerBonus] = useState(false);
  const [scenario2MbRuralNorthernBonus, setScenario2MbRuralNorthernBonus] = useState(false);
  const [scenario2MbProductionCompanyBonus, setScenario2MbProductionCompanyBonus] = useState(false);
  const [scenario2NsCreditType, setScenario2NsCreditType] = useState('stream1');
  const [scenario2NsProductionExpenditures, setScenario2NsProductionExpenditures] = useState('');
  const [scenario2NsLocationIncentive, setScenario2NsLocationIncentive] = useState(false);
  const [scenario2NsTotalShootDays, setScenario2NsTotalShootDays] = useState('');
  const [scenario2NsZoneADays, setScenario2NsZoneADays] = useState('');
  const [scenario2NsZoneBDays, setScenario2NsZoneBDays] = useState('');
  const [scenario2NsShootingLengthIncentive, setScenario2NsShootingLengthIncentive] = useState(false);

  // Scenario 2 state - Federal
  const [scenario2FederalCreditType, setScenario2FederalCreditType] = useState('cptc');
  const [scenario2CanadianLabour, setScenario2CanadianLabour] = useState('');

  // Scenario 2 state - CMF
  const [scenario2CmfFunding, setScenario2CmfFunding] = useState('');
  const [scenario2CmfProgram, setScenario2CmfProgram] = useState('none');

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

  // Calculate Alberta tax credit
  const calculateAlberta = (creditType, totalBudget, productionExpenditures) => {
    const budget = parseFloat(totalBudget) || 0;
    const expenditures = parseFloat(productionExpenditures) || 0;

    const rate = creditType === 'enhanced' ? 0.30 : 0.22;
    const rateName = creditType === 'enhanced' ? '30%' : '22%';
    const credit = expenditures * rate;

    let breakdown = '';
    if (creditType === 'enhanced') {
      const baseCredit = expenditures * 0.22;
      const enhancementCredit = expenditures * 0.08;
      breakdown = `Base Credit (22%): $${baseCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\nEnhancement (+8%): $${enhancementCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\nTotal Credit (${rateName}): $${credit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    } else {
      breakdown = `Base Credit (${rateName}): $${credit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (${rateName} of $${expenditures.toLocaleString()})`;
    }

    const budgetPercent = budget > 0 ? (credit / budget) * 100 : 0;
    return { credit, budgetPercent, breakdown };
  };

  // Calculate Saskatchewan tax credit
  const calculateSaskatchewan = (creditType, totalBudget, productionExpenditures, ruralBonus, postProductionBonus) => {
    const budget = parseFloat(totalBudget) || 0;
    const expenditures = parseFloat(productionExpenditures) || 0;

    const baseRate = creditType === 'service' ? 0.25 : 0.30;
    const baseRateName = creditType === 'service' ? '25%' : '30%';
    const baseCredit = expenditures * baseRate;
    const ruralCredit = ruralBonus ? expenditures * 0.05 : 0;
    const postProdCredit = postProductionBonus ? expenditures * 0.05 : 0;
    const credit = baseCredit + ruralCredit + postProdCredit;

    let breakdown = `Base Credit (${baseRateName}): $${baseCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (${baseRateName} of $${expenditures.toLocaleString()})`;
    if (ruralBonus) {
      breakdown += `\nRural Bonus (+5%): $${ruralCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }
    if (postProductionBonus) {
      breakdown += `\nPost-Production Bonus (+5%): $${postProdCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }
    const effectiveRate = ((baseRate + (ruralBonus ? 0.05 : 0) + (postProductionBonus ? 0.05 : 0)) * 100).toFixed(0);
    breakdown += `\nTotal Credit (${effectiveRate}%): $${credit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

    const budgetPercent = budget > 0 ? (credit / budget) * 100 : 0;
    return { credit, budgetPercent, breakdown };
  };

  // Calculate Quebec tax credit
  const calculateQuebec = (creditType, totalBudget, provincialLabour, productionExpenditures) => {
    const budget = parseFloat(totalBudget) || 0;
    const labour = parseFloat(provincialLabour) || 0;
    const expenditures = parseFloat(productionExpenditures) || 0;

    let credit = 0;
    let breakdown = '';

    if (creditType === 'production') {
      // SODEC Production Tax Credit: 32% of Quebec labour, capped at 65% of budget
      const labourCap = budget * 0.65;
      const cappedLabour = budget > 0 ? Math.min(labour, labourCap) : labour;
      credit = cappedLabour * 0.32;

      if (budget > 0 && labour > labourCap) {
        breakdown = `Quebec Labour: $${labour.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\nLabour Cap (65% of budget): $${labourCap.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\nCredit (32% of capped labour): $${credit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
      } else {
        breakdown = `Labour Credit: $${credit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (32% of $${cappedLabour.toLocaleString()})`;
        if (budget > 0) {
          breakdown += `\nWithin labour cap of $${labourCap.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (65% of budget)`;
        }
      }
    } else {
      // SODEC Production Services Tax Credit: 25% of qualifying production expenditures
      credit = expenditures * 0.25;
      breakdown = `Production Services Credit: $${credit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (25% of $${expenditures.toLocaleString()})`;
      if (budget > 0 && budget <= 250000) {
        breakdown += `\nNote: Production cost must exceed $250,000 to qualify`;
      }
    }

    const budgetPercent = budget > 0 ? (credit / budget) * 100 : 0;
    return { credit, budgetPercent, breakdown };
  };

  // Calculate Manitoba tax credit
  const calculateManitoba = (creditType, totalBudget, provincialLabour, productionExpenditures, frequentFilmingBonus, manitobaProducerBonus, ruralNorthernBonus, productionCompanyBonus) => {
    const budget = parseFloat(totalBudget) || 0;
    const labour = parseFloat(provincialLabour) || 0;
    const expenditures = parseFloat(productionExpenditures) || 0;

    let credit = 0;
    let breakdown = '';

    if (creditType === 'salaries') {
      // Cost of Salaries: 45% of Manitoba labour + bonuses
      const baseCredit = labour * 0.45;
      const frequentCredit = frequentFilmingBonus ? labour * 0.10 : 0;
      const producerCredit = manitobaProducerBonus ? labour * 0.05 : 0;
      const ruralCredit = ruralNorthernBonus ? labour * 0.05 : 0;
      credit = baseCredit + frequentCredit + producerCredit + ruralCredit;

      breakdown = `Base Credit (45%): $${baseCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (45% of $${labour.toLocaleString()})`;
      if (frequentFilmingBonus) {
        breakdown += `\nFrequent Filming Bonus (+10%): $${frequentCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
      }
      if (manitobaProducerBonus) {
        breakdown += `\nManitoba Producer Bonus (+5%): $${producerCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
      }
      if (ruralNorthernBonus) {
        breakdown += `\nRural and Northern Bonus (+5%): $${ruralCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
      }
      const effectiveRate = (0.45 + (frequentFilmingBonus ? 0.10 : 0) + (manitobaProducerBonus ? 0.05 : 0) + (ruralNorthernBonus ? 0.05 : 0)) * 100;
      breakdown += `\nTotal Credit (${effectiveRate.toFixed(0)}%): $${credit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    } else {
      // Cost of Production: 30% of qualifying production expenditures + bonus
      const baseCredit = expenditures * 0.30;
      const companyCredit = productionCompanyBonus ? expenditures * 0.08 : 0;
      credit = baseCredit + companyCredit;

      breakdown = `Base Credit (30%): $${baseCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (30% of $${expenditures.toLocaleString()})`;
      if (productionCompanyBonus) {
        breakdown += `\nManitoba Production Company Bonus (+8%): $${companyCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
      }
      const effectiveRate = (0.30 + (productionCompanyBonus ? 0.08 : 0)) * 100;
      breakdown += `\nTotal Credit (${effectiveRate.toFixed(0)}%): $${credit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }

    const budgetPercent = budget > 0 ? (credit / budget) * 100 : 0;
    return { credit, budgetPercent, breakdown };
  };

  // Calculate Nova Scotia tax credit
  const calculateNovaScotia = (creditType, totalBudget, productionExpenditures, locationIncentive, totalShootDays, zoneADays, zoneBDays, shootingLengthIncentive) => {
    const budget = parseFloat(totalBudget) || 0;
    const expenditures = parseFloat(productionExpenditures) || 0;
    const totalDays = parseInt(totalShootDays) || 0;
    const aDays = parseInt(zoneADays) || 0;
    const bDays = parseInt(zoneBDays) || 0;

    const baseRate = creditType === 'stream2' ? 0.25 : 0.26;
    const baseRateName = creditType === 'stream2' ? '25%' : '26%';
    const baseCredit = expenditures * baseRate;
    const locationCredit = locationIncentive ? expenditures * 0.02 : 0;

    // Distant location incentive only applies when location incentive is checked
    const zoneAOnlyDays = Math.max(0, aDays - bDays);
    const zoneAProrate = totalDays > 0 ? zoneAOnlyDays / totalDays : 0;
    const zoneBProrate = totalDays > 0 ? bDays / totalDays : 0;
    const zoneACredit = locationIncentive ? expenditures * 0.07 * zoneAProrate : 0;
    const zoneBCredit = locationIncentive ? expenditures * 0.10 * zoneBProrate : 0;
    const distantCredit = zoneACredit + zoneBCredit;

    const shootingCredit = shootingLengthIncentive ? expenditures * 0.01 : 0;
    const credit = baseCredit + locationCredit + distantCredit + shootingCredit;

    let breakdown = `Base Credit (${baseRateName}): $${baseCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} (${baseRateName} of $${expenditures.toLocaleString()})`;
    if (locationIncentive) {
      breakdown += `\nLocation Incentive (+2%): $${locationCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }
    if (zoneAOnlyDays > 0 && totalDays > 0) {
      breakdown += `\nZone A (7% × ${zoneAOnlyDays}/${totalDays} days): $${zoneACredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }
    if (bDays > 0 && totalDays > 0) {
      breakdown += `\nZone B (10% × ${bDays}/${totalDays} days): $${zoneBCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }
    if (shootingLengthIncentive) {
      breakdown += `\nShooting Length Incentive (+1%): $${shootingCredit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    }
    const effectiveRate = budget > 0 ? ((credit / expenditures) * 100).toFixed(1) : ((baseRate + (locationIncentive ? 0.02 : 0) + (shootingLengthIncentive ? 0.01 : 0)) * 100).toFixed(0);
    breakdown += `\nTotal Credit (${effectiveRate}%): $${credit.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

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
      } else if (province === 'AB') {
        return calculateAlberta(scenario1AbCreditType, scenario1TotalBudget, scenario1AbProductionExpenditures);
      } else if (province === 'SK') {
        return calculateSaskatchewan(scenario1SkCreditType, scenario1TotalBudget, scenario1SkProductionExpenditures, scenario1SkRuralBonus, scenario1SkPostProductionBonus);
      } else if (province === 'QC') {
        return calculateQuebec(scenario1QcCreditType, scenario1TotalBudget, scenario1QcProvincialLabour, scenario1QcProductionExpenditures);
      } else if (province === 'MB') {
        return calculateManitoba(scenario1MbCreditType, scenario1TotalBudget, scenario1MbProvincialLabour, scenario1MbProductionExpenditures, scenario1MbFrequentFilmingBonus, scenario1MbManitobaProducerBonus, scenario1MbRuralNorthernBonus, scenario1MbProductionCompanyBonus);
      } else if (province === 'NS') {
        return calculateNovaScotia(scenario1NsCreditType, scenario1TotalBudget, scenario1NsProductionExpenditures, scenario1NsLocationIncentive, scenario1NsTotalShootDays, scenario1NsZoneADays, scenario1NsZoneBDays, scenario1NsShootingLengthIncentive);
      }
    } else {
      if (province === 'ON') {
        return calculateOntario(scenario2OnCreditType, scenario2TotalBudget, scenario2OnProvincialLabour, scenario2OnProductionExpenses, scenario2OnRegionalBonus);
      } else if (province === 'BC') {
        return calculateBC(scenario2BcCreditType, scenario2TotalBudget, scenario2BcEligibleLabour, scenario2BcTotalDays, scenario2BcOutsideVancouver, scenario2BcDistantLocation);
      } else if (province === 'NL') {
        return calculateNewfoundland(scenario2NlCreditType, scenario2TotalBudget, scenario2NlProvincialLabour, scenario2NlProductionExpenditures);
      } else if (province === 'AB') {
        return calculateAlberta(scenario2AbCreditType, scenario2TotalBudget, scenario2AbProductionExpenditures);
      } else if (province === 'SK') {
        return calculateSaskatchewan(scenario2SkCreditType, scenario2TotalBudget, scenario2SkProductionExpenditures, scenario2SkRuralBonus, scenario2SkPostProductionBonus);
      } else if (province === 'QC') {
        return calculateQuebec(scenario2QcCreditType, scenario2TotalBudget, scenario2QcProvincialLabour, scenario2QcProductionExpenditures);
      } else if (province === 'MB') {
        return calculateManitoba(scenario2MbCreditType, scenario2TotalBudget, scenario2MbProvincialLabour, scenario2MbProductionExpenditures, scenario2MbFrequentFilmingBonus, scenario2MbManitobaProducerBonus, scenario2MbRuralNorthernBonus, scenario2MbProductionCompanyBonus);
      } else if (province === 'NS') {
        return calculateNovaScotia(scenario2NsCreditType, scenario2TotalBudget, scenario2NsProductionExpenditures, scenario2NsLocationIncentive, scenario2NsTotalShootDays, scenario2NsZoneADays, scenario2NsZoneBDays, scenario2NsShootingLengthIncentive);
      }
    }
    return { credit: 0, budgetPercent: 0, breakdown: '' };
  };

  const getProvinceName = (code) => {
    const names = { 'ON': 'Ontario', 'BC': 'BC', 'NL': 'Newfoundland & Labrador', 'AB': 'Alberta', 'SK': 'Saskatchewan', 'QC': 'Quebec', 'MB': 'Manitoba', 'NS': 'Nova Scotia' };
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
                <option value="QC">Quebec</option>
                <option value="AB">Alberta</option>
                <option value="SK">Saskatchewan</option>
                <option value="MB">Manitoba</option>
                <option value="NS">Nova Scotia</option>
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
                selectedProgram={scenario1CmfProgram}
                setSelectedProgram={setScenario1CmfProgram}
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

                {scenario1Province === 'AB' && (
                  <AlbertaCalculator
                    creditType={scenario1AbCreditType}
                    setCreditType={setScenario1AbCreditType}
                    productionExpenditures={scenario1AbProductionExpenditures}
                    setProductionExpenditures={setScenario1AbProductionExpenditures}
                    result={result1}
                    formatNumber={formatNumber}
                    handleNumberInput={handleNumberInput}
                  />
                )}

                {scenario1Province === 'SK' && (
                  <SaskatchewanCalculator
                    creditType={scenario1SkCreditType}
                    setCreditType={setScenario1SkCreditType}
                    productionExpenditures={scenario1SkProductionExpenditures}
                    setProductionExpenditures={setScenario1SkProductionExpenditures}
                    ruralBonus={scenario1SkRuralBonus}
                    setRuralBonus={setScenario1SkRuralBonus}
                    postProductionBonus={scenario1SkPostProductionBonus}
                    setPostProductionBonus={setScenario1SkPostProductionBonus}
                    result={result1}
                    formatNumber={formatNumber}
                    handleNumberInput={handleNumberInput}
                  />
                )}

                {scenario1Province === 'QC' && (
                  <QuebecCalculator
                    creditType={scenario1QcCreditType}
                    setCreditType={setScenario1QcCreditType}
                    provincialLabour={scenario1QcProvincialLabour}
                    setProvincialLabour={setScenario1QcProvincialLabour}
                    productionExpenditures={scenario1QcProductionExpenditures}
                    setProductionExpenditures={setScenario1QcProductionExpenditures}
                    totalBudget={scenario1TotalBudget}
                    result={result1}
                    formatNumber={formatNumber}
                    handleNumberInput={handleNumberInput}
                  />
                )}

                {scenario1Province === 'MB' && (
                  <ManitobaCalculator
                    creditType={scenario1MbCreditType}
                    setCreditType={setScenario1MbCreditType}
                    provincialLabour={scenario1MbProvincialLabour}
                    setProvincialLabour={setScenario1MbProvincialLabour}
                    productionExpenditures={scenario1MbProductionExpenditures}
                    setProductionExpenditures={setScenario1MbProductionExpenditures}
                    frequentFilmingBonus={scenario1MbFrequentFilmingBonus}
                    setFrequentFilmingBonus={setScenario1MbFrequentFilmingBonus}
                    manitobaProducerBonus={scenario1MbManitobaProducerBonus}
                    setManitobaProducerBonus={setScenario1MbManitobaProducerBonus}
                    ruralNorthernBonus={scenario1MbRuralNorthernBonus}
                    setRuralNorthernBonus={setScenario1MbRuralNorthernBonus}
                    productionCompanyBonus={scenario1MbProductionCompanyBonus}
                    setProductionCompanyBonus={setScenario1MbProductionCompanyBonus}
                    result={result1}
                    formatNumber={formatNumber}
                    handleNumberInput={handleNumberInput}
                  />
                )}

                {scenario1Province === 'NS' && (
                  <NovaScotiaCalculator
                    creditType={scenario1NsCreditType}
                    setCreditType={setScenario1NsCreditType}
                    productionExpenditures={scenario1NsProductionExpenditures}
                    setProductionExpenditures={setScenario1NsProductionExpenditures}
                    locationIncentive={scenario1NsLocationIncentive}
                    setLocationIncentive={setScenario1NsLocationIncentive}
                    totalShootDays={scenario1NsTotalShootDays}
                    setTotalShootDays={setScenario1NsTotalShootDays}
                    zoneADays={scenario1NsZoneADays}
                    setZoneADays={setScenario1NsZoneADays}
                    zoneBDays={scenario1NsZoneBDays}
                    setZoneBDays={setScenario1NsZoneBDays}
                    shootingLengthIncentive={scenario1NsShootingLengthIncentive}
                    setShootingLengthIncentive={setScenario1NsShootingLengthIncentive}
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
                  <option value="QC">Quebec</option>
                  <option value="AB">Alberta</option>
                  <option value="SK">Saskatchewan</option>
                  <option value="MB">Manitoba</option>
                  <option value="NS">Nova Scotia</option>
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
                  selectedProgram={scenario2CmfProgram}
                  setSelectedProgram={setScenario2CmfProgram}
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

                  {scenario2Province === 'AB' && (
                    <AlbertaCalculator
                      creditType={scenario2AbCreditType}
                      setCreditType={setScenario2AbCreditType}
                      productionExpenditures={scenario2AbProductionExpenditures}
                      setProductionExpenditures={setScenario2AbProductionExpenditures}
                      result={result2}
                      formatNumber={formatNumber}
                      handleNumberInput={handleNumberInput}
                    />
                  )}

                  {scenario2Province === 'SK' && (
                    <SaskatchewanCalculator
                      creditType={scenario2SkCreditType}
                      setCreditType={setScenario2SkCreditType}
                      productionExpenditures={scenario2SkProductionExpenditures}
                      setProductionExpenditures={setScenario2SkProductionExpenditures}
                      ruralBonus={scenario2SkRuralBonus}
                      setRuralBonus={setScenario2SkRuralBonus}
                      postProductionBonus={scenario2SkPostProductionBonus}
                      setPostProductionBonus={setScenario2SkPostProductionBonus}
                      result={result2}
                      formatNumber={formatNumber}
                      handleNumberInput={handleNumberInput}
                    />
                  )}

                  {scenario2Province === 'QC' && (
                    <QuebecCalculator
                      creditType={scenario2QcCreditType}
                      setCreditType={setScenario2QcCreditType}
                      provincialLabour={scenario2QcProvincialLabour}
                      setProvincialLabour={setScenario2QcProvincialLabour}
                      productionExpenditures={scenario2QcProductionExpenditures}
                      setProductionExpenditures={setScenario2QcProductionExpenditures}
                      totalBudget={scenario2TotalBudget}
                      result={result2}
                      formatNumber={formatNumber}
                      handleNumberInput={handleNumberInput}
                    />
                  )}

                  {scenario2Province === 'MB' && (
                    <ManitobaCalculator
                      creditType={scenario2MbCreditType}
                      setCreditType={setScenario2MbCreditType}
                      provincialLabour={scenario2MbProvincialLabour}
                      setProvincialLabour={setScenario2MbProvincialLabour}
                      productionExpenditures={scenario2MbProductionExpenditures}
                      setProductionExpenditures={setScenario2MbProductionExpenditures}
                      frequentFilmingBonus={scenario2MbFrequentFilmingBonus}
                      setFrequentFilmingBonus={setScenario2MbFrequentFilmingBonus}
                      manitobaProducerBonus={scenario2MbManitobaProducerBonus}
                      setManitobaProducerBonus={setScenario2MbManitobaProducerBonus}
                      ruralNorthernBonus={scenario2MbRuralNorthernBonus}
                      setRuralNorthernBonus={setScenario2MbRuralNorthernBonus}
                      productionCompanyBonus={scenario2MbProductionCompanyBonus}
                      setProductionCompanyBonus={setScenario2MbProductionCompanyBonus}
                      result={result2}
                      formatNumber={formatNumber}
                      handleNumberInput={handleNumberInput}
                    />
                  )}

                  {scenario2Province === 'NS' && (
                    <NovaScotiaCalculator
                      creditType={scenario2NsCreditType}
                      setCreditType={setScenario2NsCreditType}
                      productionExpenditures={scenario2NsProductionExpenditures}
                      setProductionExpenditures={setScenario2NsProductionExpenditures}
                      locationIncentive={scenario2NsLocationIncentive}
                      setLocationIncentive={setScenario2NsLocationIncentive}
                      totalShootDays={scenario2NsTotalShootDays}
                      setTotalShootDays={setScenario2NsTotalShootDays}
                      zoneADays={scenario2NsZoneADays}
                      setZoneADays={setScenario2NsZoneADays}
                      zoneBDays={scenario2NsZoneBDays}
                      setZoneBDays={setScenario2NsZoneBDays}
                      shootingLengthIncentive={scenario2NsShootingLengthIncentive}
                      setShootingLengthIncentive={setScenario2NsShootingLengthIncentive}
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
