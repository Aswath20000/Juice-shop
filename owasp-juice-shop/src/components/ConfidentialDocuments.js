import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConfidentialDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState('');
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/confidential-documents');
        setDocuments(response.data || []);

        // Set the flag in localStorage to indicate that the user has accessed confidential documents
        localStorage.setItem('accessedConfidentialDocs', 'true');

        // Add achievement to the backend
        if (username) {
          await axios.post(`http://localhost:5000/api/scoreboard/${username}`, {
            achievement: 'Accessed Confidential Documents',
          });
        }
      } catch (err) {
        console.error('Error fetching documents:', err);
        setError('Failed to fetch confidential documents or you do not have access.');
      }
    };

    fetchDocuments();
  }, [username]);

  return (
    <div style={{ textAlign: 'center', margin: '50px' }}>
      <h2>Confidential Documents</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {documents.length > 0 ? (
            documents.map((doc, index) => (
              <li key={index}>{doc.title}</li>
            ))
          ) : (
            <p>No confidential documents available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default ConfidentialDocuments;
