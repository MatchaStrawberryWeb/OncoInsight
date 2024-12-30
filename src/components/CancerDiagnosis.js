import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../css/CancerDiagnosis.css';  // Import the CSS file

const CancerDiagnosis = () => {
  const [patientDetails, setPatientDetails] = useState({
    ic: '',
    fullName: '',
    gender: '',
    age: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle submit form data
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here
    console.log(patientDetails);
  };

  // Extract information from IC number
  const extractICDetails = () => {
    const ic = patientDetails.ic;
    if (ic.length === 12) {
      // The first 2 digits represent the year, with logic to start from 1940
      const yearPrefix = parseInt(ic.substring(0, 2), 10);
      const year = yearPrefix < 40 ? `20${ic.substring(0, 2)}` : `19${ic.substring(0, 2)}`;
      
      // The next 2 digits represent the month of birth
      const month = ic.substring(2, 4);

      // The next 2 digits represent the day of birth
      const day = ic.substring(4, 6);

      // The last digit determines the gender (odd for male, even for female)
      const genderCode = parseInt(ic.charAt(11), 10);
      const gender = genderCode % 2 === 0 ? 'Female' : 'Male';

      return { year, month, day, gender };
    }
    return { year: '', month: '', day: '', gender: '' };
  };

  const { year, month, day, gender } = extractICDetails();

  return (
    <div className="diagnosis-container">
      <Sidebar />
      <div className="form-section">
        <h3 className="page-title">Cancer Diagnosis</h3>
        <form onSubmit={handleSubmit}>
          {/* Patient Details Section */}
          <div className="input-section">
            <label>IC Number:</label>
            <input
              type="text"
              name="ic"
              value={patientDetails.ic}
              onChange={handleInputChange}
              maxLength="12"
              required
            />
            <div>
              {/* Displaying extracted IC information */}
              <p>Year of Birth: {year}</p>
              <p>Month of Birth: {month}</p>
              <p>Day of Birth: {day}</p>
              <p>Gender: {gender}</p>
            </div>
          </div>

          <div className="input-section">
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={patientDetails.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-section">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={patientDetails.age}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Gender Selection */}
          <div className="input-section">
            <label>Gender:</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={patientDetails.gender === 'Male'}
                  onChange={handleInputChange}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={patientDetails.gender === 'Female'}
                  onChange={handleInputChange}
                />
                Female
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CancerDiagnosis;
