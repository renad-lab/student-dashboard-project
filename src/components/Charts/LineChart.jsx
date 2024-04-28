import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import Data from "../../data/data.json";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Process data to count on-track and off-track students per cohort code
const processData = (data) => {
  const counts = {};

  data.forEach((student) => {
    const cohortCode = student.cohort.cohortCode;
    const startDate = student.cohort.startDate; // Assuming this is the start date

    const isOnTrack =
      student.certifications.resume &&
      student.certifications.linkedin &&
      student.certifications.github &&
      student.certifications.mockInterview &&
      student.codewars.current.total > 600;

    if (!counts[cohortCode]) {
      counts[cohortCode] = {
        onTrack: 0,
        offTrack: 0,
        total: 0,
        startDate: startDate, // Include start date in the counts object
      };
    }

    if (isOnTrack) {
      counts[cohortCode].onTrack++;
    } else {
      counts[cohortCode].offTrack++;
    }
    counts[cohortCode].total++;
  });

  return counts;
};

const LineGraph = () => {
  // Process data to get counts
  const counts = processData(Data);

  // Extract cohort codes and corresponding counts
  const [cohortCodes, setCohortCodes] = useState(Object.keys(counts));
  const [sortBy, setSortBy] = useState({
    column: "startDate",
    ascending: true,
  });

  // Define chart data
  const data = {
    labels: cohortCodes,
    datasets: [
      {
        label: "% On Track",
        data: cohortCodes.map((cohortCode) =>
          Math.floor(
            (counts[cohortCode].onTrack / counts[cohortCode].total) * 100
          )
        ),
        borderColor: "rgb(75, 192, 192)",
      },
      {
        label: "% Off Track",
        data: cohortCodes.map((cohortCode) =>
          Math.floor(
            (counts[cohortCode].offTrack / counts[cohortCode].total) * 100
          )
        ),
        borderColor: "rgb(255, 99, 132)",
      },
    ],
  };

  // Define chart options
  const options = {
    indexAxis: "x",
    elements: {
      point: {
        radius: 0,
      },
    },
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Don't maintain aspect ratio
    scales: {
      x: {
        title: {
          display: true,
          text: "Cohort Code",
        },
      },
      y: {
        title: {
          display: true,
          text: "% of Students",
        },
      },
    },
  };

  // Sort cohort codes by start date
  const sortCohortCodesByDate = () => {
    const sortedCohortCodes = [...cohortCodes].sort((a, b) => {
      const dateA = new Date(counts[a].startDate);
      const dateB = new Date(counts[b].startDate);
      return sortBy.ascending ? dateA - dateB : dateB - dateA;
    });
    setCohortCodes(sortedCohortCodes);
    setSortBy({ column: "startDate", ascending: !sortBy.ascending });
  };

  // Sorting functions for each column
  const sortOnTrack = () => {
    const sortedCohortCodes = [...cohortCodes].sort(
      (a, b) => counts[b].onTrack - counts[a].onTrack
    );
    setCohortCodes(sortedCohortCodes);
    setSortBy({ column: "onTrack", ascending: true });
  };

  const sortOffTrack = () => {
    const sortedCohortCodes = [...cohortCodes].sort(
      (a, b) => counts[b].offTrack - counts[a].offTrack
    );
    setCohortCodes(sortedCohortCodes);
    setSortBy({ column: "offTrack", ascending: true });
  };

  const sortPercentOnTrack = () => {
    const sortedCohortCodes = [...cohortCodes].sort((a, b) =>
      Math.floor(
        (counts[b].onTrack / counts[b].total) * 100 -
          (counts[a].onTrack / counts[a].total) * 100
      )
    );
    setCohortCodes(sortedCohortCodes);
    setSortBy({ column: "percentOnTrack", ascending: true });
  };

  const sortPercentOffTrack = () => {
    const sortedCohortCodes = [...cohortCodes].sort((a, b) =>
      Math.floor(
        (counts[b].offTrack / counts[b].total) * 100 -
          (counts[a].offTrack / counts[a].total) * 100
      )
    );
    setCohortCodes(sortedCohortCodes);
    setSortBy({ column: "percentOffTrack", ascending: true });
  };

  // Arrow direction based on sorting
  const arrowDirection = (column) => {
    if (sortBy.column === column) {
      return sortBy.ascending ? "▲" : "▼";
    }
    return "";
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "inline-block" }}>
        {/* Line Chart */}
        <div>
          <Line options={options} data={data} />
        </div>

        {/* Table of Data */}
        <div style={{ marginTop: "20px" }}>
          <table
            style={{
              borderCollapse: "collapse",
              margin: "0 auto",
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <th onClick={sortCohortCodesByDate} style={tableHeaderStyle}>
                  <span style={{ cursor: "pointer" }}>
                    Cohort Code {arrowDirection("startDate")}
                  </span>
                </th>
                <th onClick={sortOnTrack} style={tableHeaderStyle}>
                  <span style={{ cursor: "pointer" }}>
                    On Track {arrowDirection("onTrack")}
                  </span>
                </th>
                <th onClick={sortOffTrack} style={tableHeaderStyle}>
                  <span style={{ cursor: "pointer" }}>
                    Off Track {arrowDirection("offTrack")}
                  </span>
                </th>
                <th onClick={sortPercentOnTrack} style={tableHeaderStyle}>
                  <span style={{ cursor: "pointer" }}>
                    % On Track {arrowDirection("percentOnTrack")}
                  </span>
                </th>
                <th onClick={sortPercentOffTrack} style={tableHeaderStyle}>
                  <span style={{ cursor: "pointer" }}>
                    % Off Track {arrowDirection("percentOffTrack")}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {cohortCodes.map((code) => (
                <tr key={code} style={tableRowStyle}>
                  <td style={tableCellStyle}>{code}</td>
                  <td style={tableCellStyle}>{counts[code].onTrack}</td>
                  <td style={tableCellStyle}>{counts[code].offTrack}</td>
                  <td style={tableCellStyle}>
                    {Math.floor(
                      (counts[code].onTrack / counts[code].total) * 100
                    )}
                    %
                  </td>
                  <td style={tableCellStyle}>
                    {Math.floor(
                      (counts[code].offTrack / counts[code].total) * 100
                    )}
                    %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Data Analysis */}
        <div
          className="data-analysis-container"
          style={{ marginTop: "20px", textAlign: "left" }}
        >
          <ol className="data-analysis">
            <li>
              <strong>Seasonal Performance Variation:</strong> There's a
              noticeable pattern of fluctuating performance across different
              seasons. For instance, Winter cohorts generally have higher
              percentages of students on track compared to Fall cohorts. This
              could be attributed to factors such as the timing of exams,
              holiday breaks, or differences in course schedules.
            </li>
            <li>
              <strong>Year-over-Year Progress:</strong> Comparing cohorts from
              different years, we can discern trends in academic progress. For
              example, Fall cohorts in 2026 demonstrate a higher percentage of
              students on track compared to those in 2025. This suggests
              potential improvements in teaching methodologies, curriculum
              enhancements, or student support initiatives implemented between
              the two years.
            </li>
            <li>
              <strong>Consistency vs. Variability:</strong> While some cohorts
              exhibit consistent performance over consecutive seasons or years,
              others display considerable variability. Cohorts with consistent
              performance may benefit from identifying and replicating
              successful strategies, while those with fluctuations might require
              targeted interventions to address recurring challenges.
            </li>
            <li>
              <strong>Impact of Seasonal Factors:</strong> Variations in student
              performance across seasons could be influenced by external factors
              such as weather conditions, availability of extracurricular
              activities, or differences in student motivation levels. Analyzing
              these factors alongside academic data may provide insights into
              their impact on student success.
            </li>
            <li>
              <strong>Long-term Trends:</strong> Examining performance trends
              over multiple years allows for the identification of long-term
              patterns and potential areas for improvement. For instance, if
              there's a consistent decline in the percentage of students on
              track over several years, it could indicate systemic issues that
              require comprehensive intervention strategies.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

const tableHeaderStyle = {
  background: "#f2f2f2",
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
  cursor: "pointer", // Add cursor pointer
};

const tableRowStyle = {
  border: "1px solid #ddd",
};

const tableCellStyle = {
  border: "1px solid #ddd",
  padding: "8px",
};

export default LineGraph;
