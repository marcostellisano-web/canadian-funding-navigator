import React, { useState } from 'react';
import { Download } from 'lucide-react';
import TaxCreditInfoCard from './TaxCreditInfoCard';

export default function FederalTaxCreditsView() {
  const [viewMode, setViewMode] = useState('both'); // 'both', 'cptc', 'pstc'

  const canadaFlag = '/flag-canada.svg';

  const cptcData = {
    title: 'Canadian Film or Video Production Tax Credit (CPTC)',
    rate: '25% of qualified labour expenditure',
    flag: canadaFlag,
    requirements: [
      'Qualified labour expenditure is capped at 60% of the production\'s total cost',
      'Must have Canadian copyright ownership',
      'At least 75% of the total of all costs for services related to producing the production must be payable to or by individuals who are Canadian',
      'Must earn at least 6 out of 10 CANCON points (see below)'
    ],
    bonuses: [
      {
        title: 'CANCON Point System (minimum 6 points required)',
        bonus: '10 points available',
        description: [
          'Director — 2 points',
          'Screenwriter — 2 points',
          'Lead performer — 1 point',
          '2nd Lead performer — 1 point',
          'Director of photography — 1 point',
          'Art director — 1 point',
          'Music composer — 1 point',
          'Picture editor — 1 point'
        ]
      }
    ],
    website: 'https://www.canada.ca/en/canadian-heritage/services/funding/cavco-tax-credits/canadian-film-video-production.html'
  };

  const pstcData = {
    title: 'Film or Video Production Services Tax Credit (PSTC)',
    rate: '16% of qualified Canadian labour expenditure',
    flag: canadaFlag,
    requirements: [
      'Available if a project does not qualify for the CPTC',
      'Corporation must be a taxable Canadian corporation or foreign-owned corporation',
      'Must conduct more than 50% of activities through a Canadian permanent establishment in film/video production or related services',
      'Must own the copyright throughout Canadian production, or have a direct contract with the copyright owner to provide production services'
    ],
    episodeMinimums: [
      'Episodes with running time less than 30 minutes: minimum $100,000 per episode',
      'Episodes with running time of 30 minutes or more: minimum $200,000 per episode'
    ],
    website: 'https://www.canada.ca/en/canadian-heritage/services/funding/cavco-tax-credits/film-video-production-services.html'
  };

  const generatePDF = () => {
    const credits = [];
    if (viewMode === 'both' || viewMode === 'cptc') {
      credits.push(cptcData);
    }
    if (viewMode === 'both' || viewMode === 'pstc') {
      credits.push(pstcData);
    }

    const formatBonus = (bonus) => {
      const descriptions = Array.isArray(bonus.description)
        ? bonus.description.map(d => `<p style="margin-left: 20px; margin-bottom: 8px; line-height: 1.6;">&bull; ${d}</p>`).join('')
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
        ${credit.requirements.map(req => `<p style="margin-bottom: 8px; line-height: 1.6;">&bull; ${req}</p>`).join('')}

        ${credit.bonuses && credit.bonuses.length > 0 ? `
          <h3 style="font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 24px; margin-bottom: 12px;">Additional Details</h3>
          ${credit.bonuses.map(bonus => formatBonus(bonus)).join('')}
        ` : ''}

        ${credit.episodeMinimums && credit.episodeMinimums.length > 0 ? `
          <h3 style="font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 24px; margin-bottom: 12px;">Episode Minimums</h3>
          ${credit.episodeMinimums.map(min => `<p style="margin-bottom: 8px; line-height: 1.6;">&bull; ${min}</p>`).join('')}
        ` : ''}

        <h3 style="font-size: 12px; font-weight: 600; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 24px; margin-bottom: 12px;">More Information</h3>
        <p><a href="${credit.website}" style="color: #dc2626; text-decoration: underline;">${credit.website}</a></p>
      </div>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Canada Federal Tax Credits</title>
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
          <h1>Canada Federal Tax Credits</h1>
          <div class="subtitle">Federal Film and Television Production Incentives</div>
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
          <h2 className="text-xl font-semibold text-gray-900">Canada Federal Tax Credits</h2>
          <p className="text-sm text-gray-500 mt-1">Two federal tax credit programs available</p>
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
              onClick={() => setViewMode('cptc')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === 'cptc'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              CPTC
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
        {(viewMode === 'both' || viewMode === 'cptc') && (
          <TaxCreditInfoCard {...cptcData} />
        )}
        {(viewMode === 'both' || viewMode === 'pstc') && (
          <TaxCreditInfoCard {...pstcData} />
        )}
      </div>
    </div>
  );
}
