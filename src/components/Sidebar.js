import React from 'react';
import '../css/Sidebar.css';  // Ensure this path is correct

const Sidebar = () => {
    return (
        <div className="sidebar">
        <div className="logo-dashboard">OncoInsight AI</div>
            <ul>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/cancer-prediction">Cancer Prediction</a></li>
                <li><a href="/patient-record">Patient Record</a></li>
                <li><a href="/detailed-report">Detailed Report</a></li>
                <li><a href="/profile">Profile</a></li>
            </ul>
        </div>
    );
};

export default Sidebar;
