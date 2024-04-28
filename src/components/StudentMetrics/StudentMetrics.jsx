import React from "react";

export default function StudentMetrics({ students, selectedCohort }) {
  // Filter students by selected cohort code
  const filteredStudents = selectedCohort
    ? students.filter((student) => student.cohort.cohortCode === selectedCohort)
    : students;

  // Calculate the total number of students
  const totalStudents = filteredStudents.length;

  return (
    <div className="metric-container">
      <h2 className="title">All Students</h2>
      <p className="total-students">Total Students: {totalStudents}</p>
    </div>
  );
}
