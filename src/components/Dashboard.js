import React, { useState, useEffect } from 'react';
//import './UserDashboard.css';

const UserDashboard = () => {
    const [diagnosis, setDiagnosis] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    // Simulate fetching data for the user
    useEffect(() => {
        const fetchData = async () => {
            try {
                const diagnosisResponse = await fetch('http://127.0.0.1:8000/diagnosis');
                const diagnosisData = await diagnosisResponse.json();
                setDiagnosis(diagnosisData);
    
                const recommendationsResponse = await fetch('http://127.0.0.1:8000/recommendations');
                const recommendationsData = await recommendationsResponse.json();
                setRecommendations(recommendationsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    
    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
    
            try {
                const response = await fetch('http://127.0.0.1:8000/upload', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                console.log('File upload successful:', data);
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };
    

    return (
        <div className="dashboard-container">
            <header>
                <h1>Welcome to Your Dashboard</h1>
                <p>Here's an overview of your recent diagnosis results and personalized recommendations.</p>
            </header>
            
            <section className="recent-diagnosis">
                <h2>Recent Diagnosis Results</h2>
                <ul>
                    {diagnosis.map((entry) => (
                        <li key={entry.id}>
                            <strong>Date:</strong> {entry.date} <br />
                            <strong>Result:</strong> {entry.result}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="recommendations">
                <h2>Personalized Recommendations</h2>
                <ul>
                    {recommendations.map((recommendation, index) => (
                        <li key={index}>{recommendation}</li>
                    ))}
                </ul>
            </section>

            <section className="tools">
                <h2>Quick Access Tools</h2>
                <button onClick={() => alert('Access patient records')}>
                    View Patient Records
                </button>
                <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="file-upload"
                />
            </section>
        </div>
    );
};

export default UserDashboard;
