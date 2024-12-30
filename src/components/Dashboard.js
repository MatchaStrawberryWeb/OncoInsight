import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar'; // Sidebar with menu options
import CancerDiagnosis from './CancerDiagnosis'; // Cancer Prediction page
import PatientRecord from './PatientRecord'; // Patient Record page
import DetailedReport from './DetailedReport'; // Detailed Report page
import Profile from './Profile'; // Profile page
import '../css/Dashboard.css';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div style={{ marginLeft: '250px', padding: '20px', flex: 1 }}>
        <h1>Welcome back, [User Name] 👋</h1>
        <p>Here's the latest update from the last 7 days. Check now.</p>

        {/* Statistics Cards */}
        <div className="stats-container">
          <div className="stat-card">
            <h2>10,525</h2>
            <p>Overall Visitors</p>
            <span>↑ 15.6%</span>
          </div>
          <div className="stat-card">
            <h2>5,715</h2>
            <p>Total Patients</p>
            <span>↑ 4.6%</span>
          </div>
          <div className="stat-card">
            <h2>523</h2>
            <p>Surgeries</p>
            <span>↑ 10%</span>
          </div>
        </div>

        {/* Charts */}
        <div className="chart-container">
          <div className="chart">
            <h3>Patient Statistics</h3>
            {/* Embed chart using a library like Chart.js or Recharts */}
          </div>
          <div className="calendar">
            <h3>Calendar</h3>
            {/* Embed calendar using a library like React-Calendar */}
          </div>
        </div>

        <Routes>
          <Route path="cancer-diagnosis" element={<CancerDiagnosis />} />
          <Route path="patient-record" element={<PatientRecord />} />
          <Route path="detailed-report" element={<DetailedReport />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
