import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const username = localStorage.getItem('username');
  const vegetables = [
    { id: 1, name: 'Tomato', description: 'Fresh and juicy tomatoes.', image: 'tomato.jpg' },
    { id: 2, name: 'Carrot', description: 'Crunchy and sweet carrots.', image: 'carrot.jpg' },
    { id: 3, name: 'Potato', description: 'Perfect for fries and baking.', image: 'potato.jpg' },
  ];

  const [message, setMessage] = useState('');
  const [showCongratsMessage, setShowCongratsMessage] = useState(false);
  const [fileUploadMessage, setFileUploadMessage] = useState('');

  useEffect(() => {
    const accessedConfidentialDocs = localStorage.getItem('accessedConfidentialDocs');
    if (accessedConfidentialDocs === 'true') {
      setShowCongratsMessage(true);
    }

    // Check if the flag for file upload challenge exists
    const fileUploadFlag = localStorage.getItem('fileUploadFlag');
    if (fileUploadFlag === 'non-pdf') {
      setFileUploadMessage('File upload challenge completed.');
    }
  }, []);

  const addToBasket = async (veg) => {
    if (!username) {
      setMessage('Please log in to add items to your basket.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/basket/${username}`, {
        name: veg.name,
        description: veg.description,
        image: veg.image,
      });
      setMessage(response.data.message || `${veg.name} added to your basket.`);
    } catch (error) {
      console.error('Error adding to basket:', error);
      setMessage('Failed to add item to basket.');
    }
  };

  const handleCloseCongratsMessage = () => {
    setShowCongratsMessage(false);
    localStorage.removeItem('accessedConfidentialDocs'); // Remove the flag from localStorage
  };

  return (
    <div style={{ textAlign: 'center', margin: '50px' }}>
      <h1>Hello, {username || 'Guest'}</h1>
      <p>Welcome to your dashboard! Choose an option or explore our vegetables:</p>

      {/* Display Congratulatory Message */}
      {showCongratsMessage && (
        <div style={{ backgroundColor: 'lightgreen', padding: '10px', marginBottom: '20px' }}>
          <p>Congratulations! You have accessed the Confidential Documents.</p>
          <button onClick={handleCloseCongratsMessage} style={{ marginLeft: '10px' }}>
            Close
          </button>
        </div>
      )}

      {/* Display File Upload Challenge Message */}
      {fileUploadMessage && (
        <div style={{ backgroundColor: 'lightblue', padding: '10px', marginBottom: '20px' }}>
          <p>{fileUploadMessage}</p>
        </div>
      )}

      {/* Navigation Buttons */}
      <div style={{ marginBottom: '20px' }}>
        <Link to="/basket">
          <button style={{ margin: '10px' }}>Basket</button>
        </Link>
        <Link to="/feedback">
          <button style={{ margin: '10px' }}>Feedback</button>
        </Link>
        <Link to="/privacy-policy">
          <button style={{ margin: '10px' }}>Privacy Policy</button>
        </Link>
        <Link to="/file-upload">
          <button style={{ margin: '10px' }}>File Upload</button>
        </Link>
      </div>

      {/* Vegetable Tiles */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
        {vegetables.map((veg) => (
          <div
            key={veg.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '5px',
              width: '200px',
              padding: '10px',
              textAlign: 'center',
            }}
          >
            <img
              src={`/${veg.image}`}
              alt={veg.name}
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <h3>{veg.name}</h3>
            <p>{veg.description}</p>
            <button onClick={() => addToBasket(veg)}>Add to Basket</button>
          </div>
        ))}
      </div>

      {/* Message Feedback */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Dashboard;
