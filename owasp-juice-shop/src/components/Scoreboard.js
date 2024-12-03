import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Scoreboard = () => {
  const username = localStorage.getItem('username'); 
  const [achievements, setAchievements] = useState([]);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchAchievements = async () => {
      if (!username) {
        setError('No user logged in');
        return;
      }

      try {
        
        const response = await axios.get(`http://localhost:5000/api/scoreboard/${username}`);
        console.log('Achievements fetched:', response.data); 
        setAchievements(response.data.achievements || []); 
      } catch (err) {
        console.error('Error fetching achievements:', err);
        setError('Failed to fetch achievements');
      }
    };

    fetchAchievements();
  }, [username]); 

  return (
    <div style={{ textAlign: 'center', margin: '50px' }}>
      <h2>{username}'s Achievements</h2>
      
      
      {error && <p>{error}</p>}

      
      {achievements.length === 0 ? (
        <p>No achievements yet!</p>
      ) : (
        <ul>
          
          {achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Scoreboard;
