import React, { useState } from 'react';
import CMFProgramsList from './CMFProgramsList';
import CMFProgramDetail from './CMFProgramDetail';

export default function CMFProgramsView({ programs }) {
  const [selectedFunding, setSelectedFunding] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleFundingSelect = (source) => {
    setSelectedFunding(source);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {!selectedFunding ? (
        <CMFProgramsList
          programs={programs}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onProgramSelect={handleFundingSelect}
        />
      ) : (
        <CMFProgramDetail
          program={selectedFunding}
          onBack={() => setSelectedFunding(null)}
        />
      )}
    </div>
  );
}
