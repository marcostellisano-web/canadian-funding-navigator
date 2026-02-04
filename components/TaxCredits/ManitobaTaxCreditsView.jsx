import React, { useState } from 'react';
import { Download } from 'lucide-react';
import TaxCreditInfoCard from './TaxCreditInfoCard';

export default function ManitobaTaxCreditsView() {
  const [viewMode, setViewMode] = useState('both'); // 'both', 'salaries', 'production'

  const costOfSalariesData = {
    title: 'Manitoba Cost of Salaries Tax Credit',
    rate: '45% of Manitoba labour expenditures',
    flag: '/flag-manitoba.svg',
    requirements: [
      'Applicants must have a permanent establishment in Manitoba',
      'A minimum 25% of the corporation\'s T4 Summary must be paid to eligible Manitoba employees for work performed in Manitoba'
    ],
    bonuses: [
      {
        title: 'Frequent Filming Bonus',
        bonus: '+10%',
        description: 'Increase your tax credit by 10% on the third film shot within a two-year period'
      },
      {
        title: 'Manitoba Producer Bonus',
        bonus: '+5%',
        description: 'Increase your tax credit by 5% by co-producing with a Manitoba producer'
      },
      {
        title: 'Rural and Northern Bonus',
        bonus: '+5%',
        description: 'Increase your tax credit by 5% by shooting no less than 50% of your Manitoba production days at least 35 km from Winnipeg\'s centre'
      }
    ],
    website: 'https://www.mbfilmmusic.ca/film-tv/film-tv-tax-credits/manitoba-cost-of-salaries-tax-credit'
  };

  const costOfProductionData = {
    title: 'Manitoba Cost of Production Tax Credit',
    rate: '30% of all qualifying production expenditures incurred in Manitoba',
    flag: '/flag-manitoba.svg',
    requirements: [
      'Applicants must have a permanent establishment in Manitoba',
      'A minimum 25% of the corporation\'s T4 Summary must be paid to eligible Manitoba employees for work performed in Manitoba'
    ],
    bonuses: [
      {
        title: 'Manitoba Production Company Bonus',
        bonus: '+8%',
        description: 'Increase your tax credit by 8% by co-producing with an eligible Manitoba production company'
      }
    ],
    website: 'https://www.mbfilmmusic.ca/film-tv/film-tv-tax-credits/manitoba-cost-of-production-tax-credit'
  };

  const generatePDF = () => {
    const credits = [];
    if (viewMode === 'both' || viewMode === 'salaries') {
      credits.push(costOfSalariesData);
    }
    if (viewMode === 'both' || viewMode === 'production') {
      credits.push(costOfProductionData);
    }

    const formatBonus = (bonus) => {
      return `
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
          <div style="font-weight: 600; color: #1e40af; margin-bottom: 4px;">${bonus.title}: ${bonus.bonus}</div>
          <p style="margin-left: 20px; margin-bottom: 8px; line-height: 1.6;">${bonus.description}</p>
        </div>
      `;
    };

    const formatCredit = (credit) => `
      <div style="margin-bottom: 40px; page-break-inside: avoid;">
        <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 12px; color: #111827;">${credit.title}</h2>

        <div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 16px; margin-bottom: 20px;">
          <div style="font-size: 18px; font-weight: 600; color: #16a34a;">${credit.rate}</div>
        </div>

        <h3 style="font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 24px; margin-bottom: 12px;">Requirements</h3>
        ${credit.requirements.map(req => `<p style="margin-bottom: 8px; line-height: 1.6;">• ${req}</p>`).join('')}

        ${credit.bonuses && credit.bonuses.length > 0 ? `
          <h3 style="font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 24px; margin-bottom: 12px;">Available Bonuses</h3>
          ${credit.bonuses.map(bonus => formatBonus(bonus)).join('')}
        ` : ''}

        <h3 style="font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 24px; margin-bottom: 12px;">More Information</h3>
        <p><a href="${credit.website}" style="color: #dc2626; text-decoration: underline;">${credit.website}</a></p>
      </div>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Manitoba Tax Credits</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              padding: 60px;
              line-height: 1.6;
              max-width: 900px;
              margin: 0 auto;
              color: #374151;
            }
            h1 {
              font-size: 28px;
              margin-bottom: 8px;
              font-weight: 600;
              color: #111827;
            }
            .subtitle {
              color: #6b7280;
              font-size: 14px;
              margin-bottom: 40px;
            }
            @media print {
              body { padding: 40px; }
            }
          </style>
        </head>
        <body>
          <h1>Manitoba Film & TV Tax Credits</h1>
          <div class="subtitle">Film and Television Production Incentives</div>
          ${credits.map(credit => formatCredit(credit)).join('<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 40px 0;">')}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-6">
      {/* Header with View Toggle */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Manitoba Film & TV Tax Credits</h2>
          <p className="text-sm text-gray-500 mt-1">Two tax credit options based on eligible expenditure type</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('both')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === 'both'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Both
            </button>
            <button
              onClick={() => setViewMode('salaries')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === 'salaries'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              45% Salaries
            </button>
            <button
              onClick={() => setViewMode('production')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === 'production'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              30% Production
            </button>
          </div>
          <button
            onClick={generatePDF}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            <Download size={16} />
            PDF
          </button>
        </div>
      </div>

      {/* Tax Credits Display */}
      <div className={`grid ${viewMode === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-6`}>
        {(viewMode === 'both' || viewMode === 'salaries') && (
          <TaxCreditInfoCard {...costOfSalariesData} />
        )}
        {(viewMode === 'both' || viewMode === 'production') && (
          <TaxCreditInfoCard {...costOfProductionData} />
        )}
      </div>
    </div>
  );
}
