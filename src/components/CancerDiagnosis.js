import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import '../css/CancerDiagnosis.css';


const CancerDiagnosis = () => {
  const [file, setFile] = useState(null); // Declare the 'file' state
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    size: '',
    location: '',
    shape: '',
    margins: '',
    density: '',
    texture: '',
    enhancement: '',
    necrosis: '',
    cavitation: '',
    lymphNodes: '',
    vascularity: '',
    boneInvolvement: '',
    tissueComposition: '',
    radiographicFindings: '',
    organInvolvement: '',
    functionalTerms: '',
    otherMedicalTerms: ''
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Capture the uploaded file
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    if (file) {
      data.append('file', file); // Append file to form data
    }

    // Append all form data
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    // Send file and form data to backend API for cancer diagnosis
    fetch("http://your-backend-url/api/diagnosis", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Diagnosis result:", data);
        setResult(data); // Display the diagnosis results
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: '250px', padding: '20px' }}>
        <h3>Cancer Diagnosis</h3>
        <form onSubmit={handleSubmit}>
          <label>Upload Scan (MRI, CT, or PAD):</label>
          <input type="file" accept=".jpg,.png,.jpeg,.dcm" onChange={handleFileChange} />
          <br />

          <label>Tumor Size (cm):</label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleInputChange}
            placeholder="e.g., 3.5 cm"
          />
          <br />

          <label>Tumor Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g., left lung"
          />
          <br />

          <label>Tumor Shape:</label>
          <input
            type="text"
            name="shape"
            value={formData.shape}
            onChange={handleInputChange}
            placeholder="e.g., irregular"
          />
          <br />

          <label>Margins (Well-defined/Irregular):</label>
          <input
            type="text"
            name="margins"
            value={formData.margins}
            onChange={handleInputChange}
            placeholder="e.g., spiculated"
          />
          <br />

          <label>Density (High/Low):</label>
          <input
            type="text"
            name="density"
            value={formData.density}
            onChange={handleInputChange}
            placeholder="e.g., high density"
          />
          <br />

          <label>Texture:</label>
          <input
            type="text"
            name="texture"
            value={formData.texture}
            onChange={handleInputChange}
            placeholder="e.g., homogeneous"
          />
          <br />

          <label>Enhancement:</label>
          <input
            type="text"
            name="enhancement"
            value={formData.enhancement}
            onChange={handleInputChange}
            placeholder="e.g., rim enhancement"
          />
          <br />

          <label>Necrosis:</label>
          <input
            type="text"
            name="necrosis"
            value={formData.necrosis}
            onChange={handleInputChange}
            placeholder="e.g., central necrosis"
          />
          <br />

          <label>Cavitation:</label>
          <input
            type="text"
            name="cavitation"
            value={formData.cavitation}
            onChange={handleInputChange}
            placeholder="e.g., presence of cavity"
          />
          <br />

          <label>Lymph Node Involvement:</label>
          <input
            type="text"
            name="lymphNodes"
            value={formData.lymphNodes}
            onChange={handleInputChange}
            placeholder="e.g., enlarged axillary nodes"
          />
          <br />

          <label>Vascularity (Blood Flow to Tumor):</label>
          <input
            type="text"
            name="vascularity"
            value={formData.vascularity}
            onChange={handleInputChange}
            placeholder="e.g., increased vascularity"
          />
          <br />

          <label>Bone Involvement:</label>
          <input
            type="text"
            name="boneInvolvement"
            value={formData.boneInvolvement}
            onChange={handleInputChange}
            placeholder="e.g., bone erosion"
          />
          <br />

          <label>Tissue Composition (e.g., Cystic/Solid):</label>
          <input
            type="text"
            name="tissueComposition"
            value={formData.tissueComposition}
            onChange={handleInputChange}
            placeholder="e.g., solid mass"
          />
          <br />

          <label>Radiographic Findings (e.g., Opacity/Lesion):</label>
          <input
            type="text"
            name="radiographicFindings"
            value={formData.radiographicFindings}
            onChange={handleInputChange}
            placeholder="e.g., lung opacity"
          />
          <br />

          <label>Organ Involvement:</label>
          <input
            type="text"
            name="organInvolvement"
            value={formData.organInvolvement}
            onChange={handleInputChange}
            placeholder="e.g., liver metastasis"
          />
          <br />

          <label>Functional Terms (Perfusion, Diffusion):</label>
          <input
            type="text"
            name="functionalTerms"
            value={formData.functionalTerms}
            onChange={handleInputChange}
            placeholder="e.g., restricted diffusion"
          />
          <br />

          <label>Other Medical Terms (e.g., Tumor Markers):</label>
          <input
            type="text"
            name="otherMedicalTerms"
            value={formData.otherMedicalTerms}
            onChange={handleInputChange}
            placeholder="e.g., elevated CA-125"
          />
          <br />

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
    </div>
  );
};

export default CancerDiagnosis;
