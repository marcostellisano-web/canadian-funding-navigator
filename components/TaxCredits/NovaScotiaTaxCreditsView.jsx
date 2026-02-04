import React, { useState } from 'react';
import { Download } from 'lucide-react';
import TaxCreditInfoCard from './TaxCreditInfoCard';

export default function NovaScotiaTaxCreditsView() {
  const [viewMode, setViewMode] = useState('both'); // 'both', 'streamI', 'streamII'

  const streamIData = {
    title: 'Nova Scotia Film & TV Production Incentive Fund - Stream I',
    rate: '26% of qualifying production expenditures incurred in Nova Scotia',
    flag: '/flag-nova-scotia.svg',
    requirements: [
      '50-100% Nova Scotia Ownership and Control',
      'A minimum of 50% Nova Scotians must be employed in Head of Department (HOD) positions or acceptable combination'
    ],
    bonuses: [
      {
        title: 'Location Incentive',
        bonus: '+2%',
        description: 'Additional funding for shoots where more than 50% of the principal photography is in a rural/non-metropolitan area in Nova Scotia'
      },
      {
        title: 'Distant Location Incentive',
        bonus: 'Up to +10%',
        description: 'Additional funding for shoots that film days of principal photography in a Distant Location'
      },
      {
        title: 'Shooting Length Incentive',
        bonus: '+1%',
        description: 'Additional funding for shoots (principal photography) of more than 30 days in Nova Scotia'
      }
    ],
    website: 'https://cch.novascotia.ca/film-and-television-production-incentive-fund'
  };

  const streamIIData = {
    title: 'Nova Scotia Film & TV Production Incentive Fund - Stream II',
    rate: '25% of qualifying production expenditures incurred in Nova Scotia',
    flag: '/flag-nova-scotia.svg',
    requirements: [
      'Less than 50% Nova Scotia Ownership and Control',
      'Where 8 or fewer Head of Department positions are filled, half the positions must be filled by Nova Scotia residents',
      'Where 9 or more Head of Department positions are filled, a minimum of 4 must be filled by Nova Scotia residents'
    ],
    bonuses: [
      {
        title: 'Location Incentive',
        bonus: '+2%',
        description: 'Additional funding for shoots where more than 50% of the principal photography is in a rural/non-metropolitan area in Nova Scotia'
      },
      {
        title: 'Distant Location Incentive',
        bonus: 'Up to +10%',
        description: 'Additional funding for shoots that film days of principal photography in a Distant Location'
      },
      {
        title: 'Shooting Length Incentive',
        bonus: '+1%',
        description: 'Additional funding for shoots (principal photography) of more than 30 days in Nova Scotia'
      }
    ],
    website: 'https://cch.novascotia.ca/film-and-television-production-incentive-fund'
  };

  const generatePDF = () => {
    const credits = [];
    if (viewMode === 'both' || viewMode === 'streamI') {
      credits.push(streamIData);
    }
    if (viewMode === 'both' || viewMode === 'streamII') {
      credits.push(streamIIData);
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
          <title>Nova Scotia Tax Credits</title>
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
          <h1>Nova Scotia Film & TV Production Incentive Fund</h1>
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
          <h2 className="text-xl font-semibold text-gray-900">Nova Scotia Film & TV Production Incentive Fund</h2>
          <p className="text-sm text-gray-500 mt-1">Two streams based on Nova Scotia ownership and control</p>
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
              onClick={() => setViewMode('streamI')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === 'streamI'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              26% Stream I
            </button>
            <button
              onClick={() => setViewMode('streamII')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                viewMode === 'streamII'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              25% Stream II
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
        {(viewMode === 'both' || viewMode === 'streamI') && (
          <TaxCreditInfoCard {...streamIData} />
        )}
        {(viewMode === 'both' || viewMode === 'streamII') && (
          <TaxCreditInfoCard {...streamIIData} />
        )}
      </div>
    </div>
  );
}
