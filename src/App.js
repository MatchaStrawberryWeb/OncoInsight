import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Importing pages/components
import HomePage from './publicView/HomePage';
import OurServices from './publicView/OurServices';
import WhatsNew from './publicView/WhatsNew';
import AboutUs from './publicView/AboutUs';
import Login from './publicView/Login';
import Dashboard from './components/Dashboard'; // Dashboard component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/our-services" element={<OurServices />} />
        <Route path="/whats-new" element={<WhatsNew />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Route for Dashboard */}
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
