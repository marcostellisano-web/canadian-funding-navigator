import React from 'react';

export default function TaxCreditInfoCard({
  title,
  rate,
  requirements,
  regionalBonus,
  bonuses,
  episodeMinimums,
  website,
  regionalBonusLink,
  flag
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-start gap-3 mb-4">
        {flag && (
          <img
            src={flag}
            alt=""
            className="w-8 h-5 object-cover rounded shadow-sm border border-gray-200 flex-shrink-0 mt-0.5"
          />
        )}
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>

      <div className="space-y-6">
        {/* Credit Rate */}
        <div>
          <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Credit Rate</h4>
          <p className="text-2xl font-bold text-green-600">{rate}</p>
        </div>

        {/* Requirements */}
        {requirements && requirements.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Requirements</h4>
            <div className="space-y-2">
              {requirements.map((req, idx) => (
                <p key={idx} className="text-sm text-gray-700 leading-relaxed flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>{req}</span>
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Regional Bonus (single) */}
        {regionalBonus && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 w-fit max-w-full">
            <h4 className="text-xs font-semibold text-blue-700 mb-2 uppercase tracking-wider">Regional Bonus</h4>
            <p className="text-sm text-gray-700 leading-relaxed mb-2">{regionalBonus.description}</p>
            <p className="text-lg font-bold text-blue-700">{regionalBonus.bonus}</p>
            {regionalBonus.detail && (
              <p className="text-xs text-gray-600 mt-1">{regionalBonus.detail}</p>
            )}
            {regionalBonusLink && (
              <a
                href={regionalBonusLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 underline mt-2 inline-block"
              >
                View regional bonus locations →
              </a>
            )}
          </div>
        )}

        {/* Episode Minimums */}
        {episodeMinimums && (
          <div>
            <h4 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Episode Minimums (Series)</h4>
            <div className="space-y-2">
              {episodeMinimums.map((min, idx) => (
                <p key={idx} className="text-sm text-gray-700 leading-relaxed flex items-start gap-2">
                  <span className="text-red-600 mt-0.5">•</span>
                  <span>{min}</span>
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Multiple Bonuses */}
        {bonuses && bonuses.length > 0 && (
          <div className="space-y-3">
            {bonuses.map((bonus, idx) => (
              <div key={idx} className="bg-blue-50 border border-blue-200 rounded-lg p-4 w-fit max-w-full">
                <h4 className="text-xs font-semibold text-blue-700 mb-2 uppercase tracking-wider">{bonus.title}</h4>
                <p className="text-lg font-bold text-blue-700 mb-2">{bonus.bonus}</p>
                {Array.isArray(bonus.description) ? (
                  <div className="space-y-2 mb-2">
                    {bonus.description.map((point, pointIdx) => (
                      <p key={pointIdx} className="text-sm text-gray-700 leading-relaxed flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>{point}</span>
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">{bonus.description}</p>
                )}
                {bonus.detail && (
                  <p className="text-xs text-gray-600 mt-1">{bonus.detail}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Website Link */}
        {website && (
          <div className="pt-4 border-t border-gray-200">
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-red-600 hover:text-red-700 underline font-medium"
            >
              Learn more →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
