import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CSS/Challenges.css";

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [inProgressChallenges, setInProgressChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        // Assuming you're fetching challenges from an API
        const response = await axios.get("http://localhost:5000/api/challenges");
        const data = response.data;
        setChallenges(data);

        // Check completed challenges from achievements or progress
        const completed = data.filter(challenge => challenge.status === "completed");
        setCompletedChallenges(completed);

        const inProgress = data.filter(challenge => challenge.status === "inProgress");
        setInProgressChallenges(inProgress);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };

    fetchChallenges();
  }, []);

  const totalChallenges = challenges.length;
  const completedCount = completedChallenges.length;
  const progressPercentage = totalChallenges === 0 ? 0 : (completedCount / totalChallenges) * 100;

  return (
    <div className="challenges-container">
      <h1>Challenges</h1>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
      </div>

      <p>{completedCount} of {totalChallenges} Challenges Completed</p>

      <div className="challenges-list">
        <div className="completed-challenges">
          <h2>Completed Challenges</h2>
          {completedChallenges.map((challenge) => (
            <div key={challenge.id} className="challenge-card">
              <p>{challenge.name}</p>
              <span>Completed</span>
            </div>
          ))}
        </div>

        <div className="in-progress-challenges">
          <h2>In Progress Challenges</h2>
          {inProgressChallenges.map((challenge) => (
            <div key={challenge.id} className="challenge-card">
              <p>{challenge.name}</p>
              <span>In Progress</span>
            </div>
          ))}
        </div>
      </div>

      <Link to="/dashboard">
        <button>Back to Dashboard</button>
      </Link>
    </div>
  );
};

export default Challenges;
