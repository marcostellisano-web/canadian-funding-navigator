import React, { useState } from 'react';
import { Download } from 'lucide-react';
import TaxCreditInfoCard from './TaxCreditInfoCard';

export default function BCTaxCreditsView() {
  const [viewMode, setViewMode] = useState('both'); // 'both', 'fibc', 'pstc'

  const fibcData = {
    title: 'Film Incentive B.C. (FIBC)',
    rate: '40% of B.C. labour expenditures',
    requirements: [
      'At least 75% of principal photography days must be done in British Columbia',
      'Minimum 75% of goods and services must be spent on B.C. expenditures',
      'Post-production work (excluding stock footage) must be carried out in British Columbia'
    ],
    bonuses: [
      {
        title: 'Regional Bonus',
        bonus: '+12.5%',
        description: [
          'Applied to B.C. labour expenditures pro-rated based on days filmed outside the designated Vancouver area',
          'Over 50% of the B.C. principal photography days must be outside the designated Vancouver area'
        ]
      },
      {
        title: 'Distant Location Bonus',
        bonus: '+6%',
        description: [
          'Applied to B.C. labour expenditures pro-rated based on days filmed in a distant location',
          'Production must qualify for the Regional bonus',
          'Must have at least 1 principal photography day in a distant location'
        ]
      }
    ],
    website: 'https://creativebc.com/motion-picture-tax-credits/film-incentive-bc/'
  };

  const pstcData = {
    title: 'B.C. Production Services Tax Credit (PSTC)',
    rate: '36% of B.C. labour expenditures',
    requirements: [
      'Available if a project does not qualify for the FIBC'
    ],
    episodeMinimums: [
      'Episodes with running time less than 30 minutes: minimum $100,000 per episode',
      'Episodes with running time of 30 minutes or more: minimum $200,000 per episode'
    ],
    bonuses: [
      {
        title: 'Regional Bonus',
        bonus: '+6%',
        description: [
          'Applied to B.C. labour expenditures pro-rated based on days filmed outside the designated Vancouver area',
          'Over 50% of the B.C. principal photography days must be outside the designated Vancouver area'
        ]
      },
      {
        title: 'Distant Location Bonus',
        bonus: '+6%',
        description: [
          'Applied to B.C. labour expenditures pro-rated based on days filmed in a distant location',
          'Production must qualify for the Regional bonus',
          'Must have at least 1 principal photography day in a distant location'
        ]
      }
    ],
    website: 'https://creativebc.com/motion-picture-tax-credits/production-services-tax-credit/'
  };

  const generatePDF = () => {
    const credits = [];
    if (viewMode === 'both' || viewMode === 'fibc') {
      credits.push(fibcData);
    }
    if (viewMode === 'both' || viewMode === 'pstc') {
      credits.push(pstcData);
    }

    const formatBonus = (bonus) => {
      const descriptions = Array.isArray(bonus.description)
        ? bonus.description.map(d => `<p style="margin-left: 20px; margin-bottom: 8px; line-height: 1.6;">• ${d}</p>`).join('')
        : `<p style="margin-left: 20px; margin-bottom: 8px; line-height: 1.6;">${bonus.description}</p>`;

      return `
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
          <div style="font-weight: 600; color: #1e40af; margin-bottom: 4px;">${bonus.title}: ${bonus.bonus}</div>
          ${descriptions}
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
          <h3 style="font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 24px; margin-bottom: 12px;">Additional Credits</h3>
          ${credit.bonuses.map(bonus => formatBonus(bonus)).join('')}
        ` : ''}

        ${credit.episodeMinimums && credit.episodeMinimums.length > 0 ? `
          <h3 style="font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 24px; margin-bottom: 12px;">Episode Minimums</h3>
          ${credit.episodeMinimums.map(min => `<p style="margin-bottom: 8px; line-height: 1.6;">• ${min}</p>`).join('')}
        ` : ''}

        <h3 style="font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 24px; margin-bottom: 12px;">More Information</h3>
        <p><a href="${credit.website}" style="color: #dc2626; text-decoration: underline;">${credit.website}</a></p>
      </div>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>British Columbia Tax Credits</title>
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
          <h1>British Columbia Tax Credits</h1>
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
          <h2 className="text-xl font-semibold text-gray-900">British Columbia Tax Credits</h2>
          <p className="text-sm text-gray-500 mt-1">Two distinct tax credit programs available</p>
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
              onClick={() => setViewMode('fibc')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === 'fibc'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              FIBC
            </button>
            <button
              onClick={() => setViewMode('pstc')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === 'pstc'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              PSTC
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
        {(viewMode === 'both' || viewMode === 'fibc') && (
          <TaxCreditInfoCard {...fibcData} />
        )}
        {(viewMode === 'both' || viewMode === 'pstc') && (
          <TaxCreditInfoCard {...pstcData} />
        )}
      </div>
    </div>
  );
}
