import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar'; // Sidebar with menu options
import CancerPrediction from './CancerPrediction'; // Cancer Prediction page
import PatientRecord from './PatientRecord'; // Patient Record page
import DetailedReport from './DetailedReport'; // Detailed Report page
import Profile from './Profile'; // Profile page

const Dashboard = () => {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div style={{ marginLeft: '250px', padding: '20px', flex: 1 }}>
        <Routes>
          <Route path="cancer-prediction" element={<CancerPrediction />} />
          <Route path="patient-record" element={<PatientRecord />} />
          <Route path="detailed-report" element={<DetailedReport />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
