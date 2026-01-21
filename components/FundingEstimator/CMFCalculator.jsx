import React, { useState, useEffect } from 'react';

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
      <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity absolute z-10 w-64 p-2 mt-1 text-xs text-white bg-gray-900 rounded-lg shadow-lg left-1/2 transform -translate-x-1/2 top-full whitespace-normal">
        {tooltip}
      </span>
    )}
  </span>
);

const CMF_PROGRAMS = [
  {
    id: 'none',
    name: 'Select a CMF Program',
    percentage: 0,
    maxAmount: 0,
    description: ''
  },
  {
    id: 'anglophone-minority',
    name: 'Anglophone Minority Incentive',
    percentage: 25,
    maxAmount: 900000,
    description: 'Only applies to Quebec-based projects',
    note: 'Province selection not yet integrated'
  },
  {
    id: 'distributor-fund',
    name: 'Distributor Fund',
    percentage: 49,
    maxAmount: 500000,
    description: '49% of the budget to a maximum of $500,000'
  },
  {
    id: 'pov-fund',
    name: 'POV Fund',
    percentage: 49,
    maxAmount: 400000,
    description: '49% of the budget to a maximum of $400,000',
    note: 'Eligible Projects in this Program must be one-off Auteur Point of View Documentaries'
  },
  {
    id: 'broadcaster-envelope',
    name: 'Broadcaster Envelope Program',
    percentage: 20,
    maxAmount: null,
    description: '20% of the budget',
    note: 'Canadian Broadcasters may decide what proportion of their Broadcaster Envelope Allocation to allot to an Eligible Project'
  },
  {
    id: 'regional-bonus',
    name: 'Regional Bonus Program',
    percentage: 15,
    maxAmount: 1000000,
    description: '15% of the budget to a maximum of $1,000,000',
    note: 'Designed to support projects produced primarily outside Canada\'s major production centres'
  }
];

export default function CMFCalculator({
  cmfFunding,
  setCmfFunding,
  totalBudget,
  formatNumber,
  handleNumberInput
}) {
  const [selectedProgram, setSelectedProgram] = useState('none');
  const budget = parseFloat(totalBudget) || 0;

  // Calculate funding based on selected program
  useEffect(() => {
    if (selectedProgram === 'none' || budget === 0) {
      setCmfFunding('0');
      return;
    }

    const program = CMF_PROGRAMS.find(p => p.id === selectedProgram);
    if (!program) return;

    const calculatedAmount = (budget * program.percentage) / 100;
    const finalAmount = program.maxAmount
      ? Math.min(calculatedAmount, program.maxAmount)
      : calculatedAmount;

    setCmfFunding(finalAmount.toFixed(0));
  }, [selectedProgram, budget, setCmfFunding]);

  const funding = parseFloat(cmfFunding) || 0;
  const budgetPercent = budget > 0 ? (funding / budget) * 100 : 0;
  const currentProgram = CMF_PROGRAMS.find(p => p.id === selectedProgram);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <h3 className="text-base font-semibold text-gray-900 mb-3">CMF Funding</h3>

      <div className="space-y-3">
        {/* Program Selection Dropdown */}
        <div>
          <label className="block text-sm font-normal text-gray-900 mb-0.5">
            CMF Program
            <InfoIcon tooltip="Select a Canada Media Fund program to calculate eligible funding" />
          </label>
          <select
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="w-full px-4 py-1.5 text-sm bg-white border border-gray-200 rounded-full focus:outline-none focus:border-gray-300 focus:ring-0 hover:border-gray-300 transition-colors appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
              backgroundPosition: 'right 0.5rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              paddingRight: '2.5rem'
            }}
          >
            {CMF_PROGRAMS.map(program => (
              <option key={program.id} value={program.id}>
                {program.name}
              </option>
            ))}
          </select>
        </div>

        {/* Program Description and Notes */}
        {currentProgram && currentProgram.id !== 'none' && (
          <div className="text-xs text-gray-600 bg-green-50 rounded-lg p-2.5">
            <p className="font-medium mb-1">{currentProgram.description}</p>
            {currentProgram.note && (
              <p className="italic text-green-700">Note: {currentProgram.note}</p>
            )}
          </div>
        )}

        {/* Results */}
        {funding > 0 && selectedProgram !== 'none' && (
          <div className="mt-3 pt-3 border-t border-gray-200 bg-green-50 rounded-2xl p-2.5">
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-semibold text-gray-900">CMF Funding</span>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">
                  ${funding.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}
                </div>
                <div className="text-xs text-gray-600">
                  {budgetPercent.toFixed(1)}% of budget
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
