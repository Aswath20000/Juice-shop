import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Scoreboard = () => {
  const username = localStorage.getItem('username'); // Retrieve username from localStorage
  const [achievements, setAchievements] = useState([]);
  const [error, setError] = useState('');

  // Fetch achievements when the component mounts
  useEffect(() => {
    const fetchAchievements = async () => {
      if (!username) {
        setError('No user logged in');
        return;
      }

      try {
        // Make an API call to get achievements for the current user
        const response = await axios.get(`http://localhost:5000/api/scoreboard/${username}`);
        console.log('Achievements fetched:', response.data); // Debugging log
        setAchievements(response.data.achievements || []); // Set state with fetched achievements
      } catch (err) {
        console.error('Error fetching achievements:', err);
        setError('Failed to fetch achievements');
      }
    };

    fetchAchievements();
  }, [username]); // Dependency array ensures this runs when the component mounts

  return (
    <div style={{ textAlign: 'center', margin: '50px' }}>
      <h2>{username}'s Achievements</h2>
      
      {/* If there is an error, display it */}
      {error && <p>{error}</p>}

      {/* If no achievements are found, show this message */}
      {achievements.length === 0 ? (
        <p>No achievements yet!</p>
      ) : (
        <ul>
          {/* Render each achievement */}
          {achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Scoreboard;
