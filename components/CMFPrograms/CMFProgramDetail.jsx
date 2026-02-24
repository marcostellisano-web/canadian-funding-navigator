import React from 'react';
import { Download, Clock } from 'lucide-react';

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

          <h2>Funding</h2>
          <p style="font-size:22px;font-weight:700;color:#16a34a;">${program.fundingRange}</p>

          <h2>Description</h2>
          <p>${program.description}</p>

          ${program.eligibility ? `
            <h2>Requirements</h2>
            <p>${program.eligibility}</p>
          ` : ''}

          ${program.keyPoints.length > 0 ? `
            <h2>Key Points</h2>
            ${program.keyPoints.map(point => `<p>• ${point}</p>`).join('')}
          ` : ''}

          <h2>Deadlines</h2>
          <p>${program.deadlines}</p>
          ${(program.upcomingDeadlines || []).length > 0 ? `
            <table style="width:100%; border-collapse:collapse; margin-top:8px;">
              ${program.upcomingDeadlines.map(d => {
                const dt = new Date(d.date);
                const today = new Date();
                today.setHours(0,0,0,0);
                const days = Math.ceil((dt - today) / (1000*60*60*24));
                const dateStr = dt.toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                const status = days < 0 ? 'Passed' : days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : days + ' days remaining';
                return '<tr style="border-bottom:1px solid #eee;"><td style="padding:8px 0;">' + d.description + '<br/><span style="color:#999;font-size:12px;">' + dateStr + '</span></td><td style="padding:8px 0;text-align:right;color:' + (days <= 30 && days >= 0 ? '#b91c1c' : days < 0 ? '#999' : '#15803d') + ';font-weight:600;font-size:13px;">' + status + '</td></tr>';
              }).join('')}
            </table>
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
          <h3 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Funding</h3>
          <p className="text-2xl font-bold text-green-600">{program.fundingRange}</p>
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
          <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Deadlines</h3>
          <p className="text-gray-700 leading-relaxed mb-4">{program.deadlines}</p>
          {program.upcomingDeadlines && program.upcomingDeadlines.length > 0 && (
            <div className="space-y-3">
              {program.upcomingDeadlines
                .map(deadline => {
                  const deadlineDate = new Date(deadline.date);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const daysUntil = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
                  return { ...deadline, deadlineDate, daysUntil };
                })
                .sort((a, b) => a.deadlineDate - b.deadlineDate)
                .map((deadline, idx) => {
                  const { deadlineDate, daysUntil } = deadline;
                  const isPast = daysUntil < 0;
                  const isUrgent = daysUntil >= 0 && daysUntil <= 7;
                  const isUpcoming = daysUntil > 7 && daysUntil <= 30;
                  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                        isPast ? 'bg-gray-50 border-gray-100 opacity-50' :
                        isUrgent ? 'bg-red-50 border-red-200' :
                        isUpcoming ? 'bg-amber-50 border-amber-200' :
                        'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-center w-14">
                          <div className={`text-xl font-semibold ${
                            isPast ? 'text-gray-400' :
                            isUrgent ? 'text-red-600' :
                            'text-gray-900'
                          }`}>
                            {deadlineDate.getDate()}
                          </div>
                          <div className="text-xs text-gray-500 uppercase font-medium">
                            {monthNames[deadlineDate.getMonth()]}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium text-sm">{deadline.description}</div>
                          <div className="text-xs text-gray-400 mt-0.5">
                            {deadlineDate.toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                          </div>
                        </div>
                      </div>
                      {!isPast && (
                        <div className="flex items-center gap-2">
                          <Clock size={14} className={daysUntil <= 30 ? 'text-red-500' : 'text-green-600'} />
                          <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                            daysUntil <= 30 ? 'bg-red-100 text-red-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {daysUntil === 0 ? 'Today' :
                              daysUntil === 1 ? 'Tomorrow' :
                              `${daysUntil} days remaining`}
                          </span>
                        </div>
                      )}
                      {isPast && (
                        <span className="text-xs text-gray-400 font-medium">Passed</span>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>

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
