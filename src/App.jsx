// App.js

import React from "react";
import Header from "./components/Header/Header";
import Data from "./data/data.json";
import StudentList from "./components/StudentList/StudentList";
import LineGraph from "./components/Charts/LineChart";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Header className="header" />
      <div className="content">
        <div className="line-graph">
          <LineGraph />
        </div>
        <div className="student-list">
          <StudentList students={Data} />
        </div>
      </div>
    </div>
  );
}

export default App;
