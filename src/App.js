import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './publicView/HomePage';
import OurServices from "./publicView/OurServices";
import WhatsNew from "./publicView/WhatsNew";
import AboutUs from "./publicView/AboutUs";
import Login from "./publicView/Login";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/our-services" element={<OurServices />} />
        <Route path="/whats-new" element={<WhatsNew />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        {/* Add other routes here as needed */}
      </Routes>
    </Router>
  );
};

export default App;
