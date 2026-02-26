import React, { useState } from 'react';
import UKIncentivesView from './UKIncentivesView';
import FranceIncentivesView from './FranceIncentivesView';
import ItalyIncentivesView from './ItalyIncentivesView';
import SpainIncentivesView from './SpainIncentivesView';
import IrelandIncentivesView from './IrelandIncentivesView';
import HungaryIncentivesView from './HungaryIncentivesView';
import PortugalIncentivesView from './PortugalIncentivesView';
import BelgiumIncentivesView from './BelgiumIncentivesView';
import MaltaIncentivesView from './MaltaIncentivesView';
import BulgariaIncentivesView from './BulgariaIncentivesView';
import CzechRepublicIncentivesView from './CzechRepublicIncentivesView';
import AustraliaIncentivesView from './AustraliaIncentivesView';
import NewZealandIncentivesView from './NewZealandIncentivesView';
import LithuaniaIncentivesView from './LithuaniaIncentivesView';
import GeorgiaIncentivesView from './GeorgiaIncentivesView';
import IllinoisIncentivesView from './IllinoisIncentivesView';
import KentuckyIncentivesView from './KentuckyIncentivesView';
import NewYorkIncentivesView from './NewYorkIncentivesView';
import VirginiaIncentivesView from './VirginiaIncentivesView';

export default function InternationalIncentivesView() {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const europeanCountries = [
    { id: 'belgium', name: 'Belgium', available: true, flag: '/flag-belgium.svg' },
    { id: 'bulgaria', name: 'Bulgaria', available: true, flag: '/flag-bulgaria.svg' },
    { id: 'czech-republic', name: 'Czech Republic', available: true, flag: '/flag-czech-republic.svg' },
    { id: 'france', name: 'France', available: true, flag: '/flag-france.svg' },
    { id: 'hungary', name: 'Hungary', available: true, flag: '/flag-hungary.svg' },
    { id: 'ireland', name: 'Ireland', available: true, flag: '/flag-ireland.svg' },
    { id: 'italy', name: 'Italy', available: true, flag: '/flag-italy.svg' },
    { id: 'lithuania', name: 'Lithuania', available: true, flag: '/flag-lithuania.svg' },
    { id: 'malta', name: 'Malta', available: true, flag: '/flag-malta.svg' },
    { id: 'portugal', name: 'Portugal', available: true, flag: '/flag-portugal.svg' },
    { id: 'spain', name: 'Spain', available: true, flag: '/flag-spain.svg' },
    { id: 'uk', name: 'United Kingdom', available: true, flag: '/flag-uk.svg' },
  ];

  const usCountries = [
    { id: 'georgia', name: 'US – Georgia', available: true, flag: '/flag-usa.svg' },
    { id: 'illinois', name: 'US – Illinois', available: true, flag: '/flag-usa.svg' },
    { id: 'kentucky', name: 'US – Kentucky', available: true, flag: '/flag-usa.svg' },
    { id: 'new-york', name: 'US – New York', available: true, flag: '/flag-usa.svg' },
    { id: 'virginia', name: 'US – Virginia', available: true, flag: '/flag-usa.svg' },
  ];

  const otherCountries = [
    { id: 'australia', name: 'Australia', available: true, flag: '/flag-australia.svg' },
    { id: 'new-zealand', name: 'New Zealand', available: true, flag: '/flag-new-zealand.svg' },
  ];

  if (selectedCountry) {
    return (
      <div>
        <button
          onClick={() => setSelectedCountry(null)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          ← Back to all incentives
        </button>
        {selectedCountry === 'uk' && <UKIncentivesView />}
        {selectedCountry === 'france' && <FranceIncentivesView />}
        {selectedCountry === 'italy' && <ItalyIncentivesView />}
        {selectedCountry === 'spain' && <SpainIncentivesView />}
        {selectedCountry === 'ireland' && <IrelandIncentivesView />}
        {selectedCountry === 'hungary' && <HungaryIncentivesView />}
        {selectedCountry === 'portugal' && <PortugalIncentivesView />}
        {selectedCountry === 'belgium' && <BelgiumIncentivesView />}
        {selectedCountry === 'malta' && <MaltaIncentivesView />}
        {selectedCountry === 'bulgaria' && <BulgariaIncentivesView />}
        {selectedCountry === 'czech-republic' && <CzechRepublicIncentivesView />}
        {selectedCountry === 'lithuania' && <LithuaniaIncentivesView />}
        {selectedCountry === 'australia' && <AustraliaIncentivesView />}
        {selectedCountry === 'new-zealand' && <NewZealandIncentivesView />}
        {selectedCountry === 'georgia' && <GeorgiaIncentivesView />}
        {selectedCountry === 'illinois' && <IllinoisIncentivesView />}
        {selectedCountry === 'kentucky' && <KentuckyIncentivesView />}
        {selectedCountry === 'new-york' && <NewYorkIncentivesView />}
        {selectedCountry === 'virginia' && <VirginiaIncentivesView />}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* European Incentives */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">European Incentives</h2>
        <p className="text-sm text-gray-500">Film and television production incentives across Europe</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {europeanCountries.map((country) => (
          <button
            key={country.id}
            onClick={() => country.available && setSelectedCountry(country.id)}
            disabled={!country.available}
            className={`p-6 border-2 rounded-lg text-left transition-all ${
              country.available
                ? 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-md cursor-pointer group'
                : 'bg-white border-gray-100 opacity-50 cursor-not-allowed'
            }`}
          >
            {country.flag && (
              <img
                src={country.flag}
                alt=""
                className="w-12 h-8 object-cover rounded shadow-sm border border-gray-200 mb-3"
              />
            )}
            <h3 className={`text-lg font-semibold mb-2 ${
              country.available ? 'text-gray-900 group-hover:text-blue-600' : 'text-gray-400'
            }`}>
              {country.name}
            </h3>
            <p className="text-sm text-gray-500">
              {country.available ? 'View incentives →' : 'Coming soon'}
            </p>
          </button>
        ))}
      </div>

      {/* US State Incentives */}
      <div className="pt-2">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">US State Incentives</h2>
        <p className="text-sm text-gray-500">Film and television production incentives across US states</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {usCountries.map((country) => (
          <button
            key={country.id}
            onClick={() => country.available && setSelectedCountry(country.id)}
            disabled={!country.available}
            className={`p-6 border-2 rounded-lg text-left transition-all ${
              country.available
                ? 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-md cursor-pointer group'
                : 'bg-white border-gray-100 opacity-50 cursor-not-allowed'
            }`}
          >
            {country.flag && (
              <img
                src={country.flag}
                alt=""
                className="w-12 h-8 object-cover rounded shadow-sm border border-gray-200 mb-3"
              />
            )}
            <h3 className={`text-lg font-semibold mb-2 ${
              country.available ? 'text-gray-900 group-hover:text-blue-600' : 'text-gray-400'
            }`}>
              {country.name}
            </h3>
            <p className="text-sm text-gray-500">
              {country.available ? 'View incentives →' : 'Coming soon'}
            </p>
          </button>
        ))}
      </div>

      {/* Other International Incentives */}
      <div className="pt-2">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Asia-Pacific Incentives</h2>
        <p className="text-sm text-gray-500">Production incentives in the Asia-Pacific region</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {otherCountries.map((country) => (
          <button
            key={country.id}
            onClick={() => country.available && setSelectedCountry(country.id)}
            disabled={!country.available}
            className={`p-6 border-2 rounded-lg text-left transition-all ${
              country.available
                ? 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-md cursor-pointer group'
                : 'bg-white border-gray-100 opacity-50 cursor-not-allowed'
            }`}
          >
            {country.flag && (
              <img
                src={country.flag}
                alt=""
                className="w-12 h-8 object-cover rounded shadow-sm border border-gray-200 mb-3"
              />
            )}
            <h3 className={`text-lg font-semibold mb-2 ${
              country.available ? 'text-gray-900 group-hover:text-blue-600' : 'text-gray-400'
            }`}>
              {country.name}
            </h3>
            <p className="text-sm text-gray-500">
              {country.available ? 'View incentives →' : 'Coming soon'}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
