import React, { useState } from 'react';
import { Download } from 'lucide-react';
import TaxCreditInfoCard from './TaxCreditInfoCard';

export default function QuebecTaxCreditsView() {
  const [viewMode, setViewMode] = useState('both'); // 'both', 'sptc', 'spstc'

  const sptcData = {
    title: 'SODEC Production Tax Credit',
    rate: '32% of Quebec labour expenditures',
    requirements: [
      'A minimum of 75% of goods and services must be spent on Quebec expenditures',
      'All labour performed in Quebec regardless of residency is considered eligible',
      'Eligible labour maximum is 65% of the budget'
    ],
    website: 'https://sodec.gouv.qc.ca/domaines-dintervention/cinema-et-television/credits-dimpot/production-cinema-et-tele/'
  };

  const spstcData = {
    title: 'SODEC Production Services Tax Credit',
    rate: '25% of all qualifying production expenditures incurred in Quebec',
    requirements: [
      'Available if a project does not qualify for the production tax credit',
      'The cost of the production must exceed $250,000'
    ],
    website: 'https://sodec.gouv.qc.ca/domaines-dintervention/cinema-et-television/credits-dimpot/services-de-production/'
  };

  const generatePDF = () => {
    const credits = [];
    if (viewMode === 'both' || viewMode === 'sptc') {
      credits.push(sptcData);
    }
    if (viewMode === 'both' || viewMode === 'spstc') {
      credits.push(spstcData);
    }

    const formatCredit = (credit) => `
      <div style="margin-bottom: 40px; page-break-inside: avoid;">
        <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 12px; color: #111827;">${credit.title}</h2>

        <div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 16px; margin-bottom: 20px;">
          <div style="font-size: 18px; font-weight: 600; color: #16a34a;">${credit.rate}</div>
        </div>

        <h3 style="font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 24px; margin-bottom: 12px;">Requirements</h3>
        ${credit.requirements.map(req => `<p style="margin-bottom: 8px; line-height: 1.6;">• ${req}</p>`).join('')}

        <h3 style="font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 24px; margin-bottom: 12px;">More Information</h3>
        <p><a href="${credit.website}" style="color: #dc2626; text-decoration: underline;">${credit.website}</a></p>
      </div>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Quebec Tax Credits</title>
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
          <h1>Quebec Tax Credits</h1>
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
          <h2 className="text-xl font-semibold text-gray-900">Quebec Tax Credits</h2>
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
              onClick={() => setViewMode('sptc')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === 'sptc'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Production
            </button>
            <button
              onClick={() => setViewMode('spstc')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === 'spstc'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Services
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
        {(viewMode === 'both' || viewMode === 'sptc') && (
          <TaxCreditInfoCard {...sptcData} />
        )}
        {(viewMode === 'both' || viewMode === 'spstc') && (
          <TaxCreditInfoCard {...spstcData} />
        )}
      </div>
    </div>
  );
}
