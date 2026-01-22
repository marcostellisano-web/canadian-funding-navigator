import React from 'react';
import { Calendar } from 'lucide-react';

export default function IntakeDatesView({ programs }) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const allDeadlines = programs.flatMap(source =>
    (source.upcomingDeadlines || []).map(deadline => ({
      ...deadline,
      program: source.name,
      organization: source.organization,
      id: source.id
    }))
  ).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div>
      <div className="space-y-3">
        {allDeadlines.map((deadline, idx) => {
          const deadlineDate = new Date(deadline.date);
          const today = new Date();
          const daysUntil = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
          const isPast = daysUntil < 0;
          const isUrgent = daysUntil >= 0 && daysUntil <= 7;
          const isUpcoming = daysUntil > 7 && daysUntil <= 30;

          return (
            <div
              key={idx}
              className={`flex items-center justify-between p-5 rounded-lg border transition-all ${isPast ? 'bg-gray-50 border-gray-100 opacity-50' :
                  isUrgent ? 'bg-red-50 border-red-200' :
                    isUpcoming ? 'bg-amber-50 border-amber-200' :
                      'bg-white border-gray-100 hover:border-gray-200'
                }`}
            >
              <div className="flex items-center gap-6">
                <div className="text-center w-16">
                  <div className={`text-2xl font-semibold ${isPast ? 'text-gray-400' :
                      isUrgent ? 'text-red-600' :
                        'text-gray-900'
                    }`}>
                    {deadlineDate.getDate()}
                  </div>
                  <div className="text-xs text-gray-500 uppercase font-medium">
                    {monthNames[deadlineDate.getMonth()].substring(0, 3)}
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-1">{deadline.program}</div>
                  <div className="text-sm text-gray-500">{deadline.description}</div>
                </div>
              </div>
              {!isPast && (
                <div className={`text-sm font-medium px-3 py-1 rounded-full ${
                    daysUntil <= 30 ? 'bg-red-100 text-red-700' :
                      'bg-green-100 text-green-700'
                  }`}>
                  {daysUntil === 0 ? 'Today' :
                    daysUntil === 1 ? 'Tomorrow' :
                      `${daysUntil} days remaining`}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {allDeadlines.length === 0 && (
        <div className="text-center py-20 text-gray-300">
          <Calendar size={48} className="mx-auto mb-4 opacity-30" />
          <p>No upcoming deadlines</p>
        </div>
      )}
    </div>
  );
}
