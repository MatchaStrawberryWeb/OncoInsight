import React, { useState } from 'react';

const CancerDiagnosis = () => {
  const [file, setFile] = useState(null);  // Declare the 'file' state here
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Capture the uploaded file
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      // Send file to backend API for cancer diagnosis
      fetch("http://your-backend-url/api/diagnosis", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Diagnosis result:", data);
          setResult(data); // Display the diagnosis results
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div>
      <h3>Cancer Diagnosis</h3>
      <form onSubmit={handleSubmit}>
        <label>Upload Scan (MRI, CT, or PAD):</label>
        <input type="file" accept=".jpg,.png,.jpeg,.dcm" onChange={handleFileChange} />
        <button type="submit">Diagnose</button>
      </form>

      {file && <p>Selected file: {file.name}</p>}
      {result && (
        <div>
          <h4>Diagnosis Result:</h4>
          <p>Cancer Type: {result.cancerType}</p>
          <p>Treatment Guidance: {result.treatment}</p>
          <p>Survival Prediction: {result.survivalPrediction}</p>
        </div>
      )}
    </div>
  );
};

export default CancerDiagnosis;
