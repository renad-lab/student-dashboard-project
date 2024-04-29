import React, { useState, useEffect } from "react";
import StudentCard from "../StudentCard/StudentCard";
import Data from "../../data/data.json";
import "./StudentList.css";

function StudentList({ students }) {
  // State variables for dropdown selections
  const [selectedSeason, setSelectedSeason] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // State variables for filtered students, totals, and percentages
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalOnTrack, setTotalOnTrack] = useState(0);
  const [totalOffTrack, setTotalOffTrack] = useState(0);
  const [percentageOnTrack, setPercentageOnTrack] = useState(0);
  const [percentageOffTrack, setPercentageOffTrack] = useState(0);
  const [offTrackReasons, setOffTrackReasons] = useState({});

  // Function to filter students based on selected season, year, and status
  const filterStudents = () => {
    let filteredStudents = students;

    // Filter based on season
    if (selectedSeason !== "All") {
      filteredStudents = filteredStudents.filter((student) =>
        student.cohort.cohortCode.includes(selectedSeason)
      );
    }

    // Filter based on year
    if (selectedYear !== "All") {
      filteredStudents = filteredStudents.filter((student) =>
        student.cohort.cohortCode.includes(selectedYear)
      );
    }

    // Filter based on status
    let onTrackStudents = [];
    let offTrackStudents = [];

    if (selectedStatus === "On Track") {
      onTrackStudents = filteredStudents.filter((student) =>
        isOnTrack(student)
      );
      filteredStudents = onTrackStudents; // Update filteredStudents with onTrackStudents
    } else if (selectedStatus === "Off Track") {
      offTrackStudents = filteredStudents.filter(
        (student) => !isOnTrack(student)
      );
      filteredStudents = offTrackStudents; // Update filteredStudents with offTrackStudents
    } else {
      onTrackStudents = filteredStudents.filter((student) =>
        isOnTrack(student)
      );
      offTrackStudents = filteredStudents.filter(
        (student) => !isOnTrack(student)
      );
    }

    // Calculate totals and percentages
    const totalStudents = students.length;
    const totalOnTrack = onTrackStudents.length;
    const totalOffTrack = offTrackStudents.length;

    const percentageOnTrack =
      totalStudents > 0 ? ((totalOnTrack / totalStudents) * 100).toFixed(2) : 0;
    const percentageOffTrack =
      totalStudents > 0
        ? ((totalOffTrack / totalStudents) * 100).toFixed(2)
        : 0;

    // Calculate off-track reasons
    const offTrackReasons = {};
    offTrackStudents.forEach((student) => {
      const reasons = getOffTrackReasons(student);
      reasons.forEach((reason) => {
        offTrackReasons[reason] = offTrackReasons[reason]
          ? offTrackReasons[reason] + 1
          : 1;
      });
    });

    // Set state variables
    setFilteredStudents(filteredStudents);
    setTotalStudents(totalStudents);
    setTotalOnTrack(totalOnTrack);
    setTotalOffTrack(totalOffTrack);
    setPercentageOnTrack(percentageOnTrack);
    setPercentageOffTrack(percentageOffTrack);
    setOffTrackReasons(offTrackReasons);

    return filteredStudents;
  };

  // Function to check if a student is on track
  const isOnTrack = (student) => {
    const certifications = student.certifications;
    const codewarsScore = student.codewars.current.total;

    return (
      certifications.resume &&
      certifications.linkedin &&
      certifications.github &&
      certifications.mockInterview &&
      codewarsScore > 600
    );
  };

  // Function to get off-track reasons for a student
  const getOffTrackReasons = (student) => {
    const reasons = [];
    const certifications = student.certifications;
    const codewarsScore = student.codewars.current.total;

    if (!certifications.resume) {
      reasons.push("Resume Missing");
    }
    if (!certifications.linkedin) {
      reasons.push("LinkedIn Missing");
    }
    if (!certifications.github) {
      reasons.push("GitHub Missing");
    }
    if (!certifications.mockInterview) {
      reasons.push("Mock Interview Missing");
    }
    if (codewarsScore < 600) {
      reasons.push("Low Codewars Score");
    }

    return reasons;
  };

  // Function to handle season dropdown change
  const handleSeasonChange = (e) => {
    setSelectedSeason(e.target.value);
  };

  // Function to handle year dropdown change
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // Function to handle status dropdown change
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  // Run filterStudents whenever dropdown values change
  useEffect(() => {
    filterStudents();
  }, [selectedSeason, selectedYear, selectedStatus, students]);

  return (
    <div className="student-list">
      {/* Dropdowns container */}
      <div className="dropdowns-container">
        {/* Dropdown for selecting year */}
        <select value={selectedYear} onChange={handleYearChange}>
          <option value="All">All Years</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>

        {/* Dropdown for selecting season */}
        <select value={selectedSeason} onChange={handleSeasonChange}>
          <option value="All">All Seasons</option>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
          <option value="Fall">Fall</option>
        </select>

        {/* Dropdown for selecting on-track/off-track status */}
        <select value={selectedStatus} onChange={handleStatusChange}>
          <option value="All">All Statuses</option>
          <option value="On Track">On Track</option>
          <option value="Off Track">Off Track</option>
        </select>
      </div>

      {/* Render totals */}
      <div className="totals-container">
        <p>Total Students: {totalStudents}</p>
        <p>Total On Track: {totalOnTrack}</p>
        <p>Total Off Track: {totalOffTrack}</p>
        <p>Percentage On Track: {percentageOnTrack}%</p>
        <p>Percentage Off Track: {percentageOffTrack}%</p>
      </div>

      {/* Render off-track reasons */}
      {selectedStatus === "Off Track" && (
        <div className="off-track-reasons-container">
          <h2>Off Track Reasons:</h2>
          <table>
            <thead>
              <tr>
                <th>Reason</th>
                <th>Total</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(offTrackReasons).map(([reason, count]) => (
                <tr key={reason}>
                  <td>{reason}</td>
                  <td>{count}</td>
                  <td>{((count / totalOffTrack) * 100).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Render students */}
      {filteredStudents.map((student, index) => (
        <StudentCard key={index} record={student} />
      ))}
    </div>
  );
}

export default StudentList;
