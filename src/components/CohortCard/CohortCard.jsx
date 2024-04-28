// CohortCard.js
import React from "react";

function CohortCard({ cohort, onSelectCohort }) {
  const handleClick = () => {
    onSelectCohort(cohort);
  };

  return (
    <div className="cohort-card" onClick={handleClick}>
      <h3>{cohort.name}</h3>
      {/* Display cohort details */}
    </div>
  );
}

export default CohortCard;
