import React from 'react';
import { Download } from 'lucide-react';

const stripCMFPrefix = (name) => name.replace(/^CMF\s+/, '');

export default function CMFProgramDetail({ program, onBack }) {
  const generatePDF = () => {
    if (!program) return;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${stripCMFPrefix(program.name)}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 60px; line-height: 1.8; max-width: 800px; margin: 0 auto; }
            h1 { font-size: 24px; margin-bottom: 4px; font-weight: 600; }
            .org { color: #666; font-size: 14px; margin-bottom: 40px; }
            h2 { font-size: 14px; margin-top: 40px; margin-bottom: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #999; }
            p { margin-bottom: 16px; line-height: 1.6; }
          </style>
        </head>
        <body>
          <h1>${stripCMFPrefix(program.name)}</h1>
          <div class="org">${program.organization}</div>

          <h2>Description</h2>
          <p>${program.description}</p>

          ${program.eligibility ? `
            <h2>Requirements</h2>
            <p>${program.eligibility}</p>
          ` : ''}

          <h2>Funding</h2>
          <p>${program.fundingRange}</p>

          <h2>Deadlines</h2>
          <p>${program.deadlines}</p>

          ${program.keyPoints.length > 0 ? `
            <h2>Key Points</h2>
            ${program.keyPoints.map(point => `<p>• ${point}</p>`).join('')}
          ` : ''}

          <h2>Website</h2>
          <p><a href="${program.website}">${stripCMFPrefix(program.name)}</a></p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        ← Back to all programs
      </button>

      <div className="space-y-8">
        <div className="flex justify-between items-start pb-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              {stripCMFPrefix(program.name)}
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              {program.organization}
            </p>
            <div className="flex flex-wrap gap-2">
              {program.tags.map((tag, idx) => (
                <span key={idx} className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={generatePDF}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            <Download size={16} />
            PDF
          </button>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Description</h3>
          <p className="text-gray-700 leading-relaxed">{program.description}</p>
        </div>

        {program.eligibility && (
          <div>
            <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Requirements</h3>
            <p className="text-gray-700 leading-relaxed">{program.eligibility}</p>
          </div>
        )}

        <div>
          <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Funding</h3>
          <p className="text-gray-700 leading-relaxed">{program.fundingRange}</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Deadlines</h3>
          <p className="text-gray-700 leading-relaxed">{program.deadlines}</p>
        </div>

        {program.keyPoints.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Key Points</h3>
            <div className="space-y-3">
              {program.keyPoints.map((point, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed">
                  • {point}
                </p>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Website</h3>
          <a
            href={program.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:text-red-700 underline"
          >
            {stripCMFPrefix(program.name)} →
          </a>
        </div>
      </div>
    </div>
  );
}
