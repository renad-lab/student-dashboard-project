// AdditionalDetails.js
import React from "react";

function AdditionalDetails({ student }) {
  return (
    <div className="additional-details">
      <p>Additional details for {student.name}</p>
      {/* Display additional student details */}
    </div>
  );
}

export default AdditionalDetails;
