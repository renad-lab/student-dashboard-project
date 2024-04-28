// CohortListComponent.js
import React from "react";
import CohortCard from "../CohortCard/CohortCard";

function CohortListComponent({ onSelectCohort }) {
  const cohorts = []; // Implement logic to get cohorts

  return (
    <div className="cohort-list">
      {cohorts.map((cohort) => (
        <CohortCard
          key={cohort.id}
          cohort={cohort}
          onSelectCohort={onSelectCohort}
        />
      ))}
    </div>
  );
}

export default CohortListComponent;
