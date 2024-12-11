import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CSS/Dashboard.css";

const Dashboard = () => {
  const username = localStorage.getItem("username") || "Guest";
  const [message, setMessage] = useState("");
  const [showFileCongratsMessage, setShowFileCongratsMessage] = useState(false);
  const [showConfidentialCongratsMessage, setShowConfidentialCongratsMessage] = useState(false);
  const [showXSSCongratsMessage, setShowXSSCongratsMessage] = useState(false);
  const [showJohnCongratsMessage, setShowJohnCongratsMessage] = useState(false);
  const [showScoreboardCongratsMessage, setShowScoreboardCongratsMessage] = useState(false); // State for scoreboard congrats
  const [searchTerm, setSearchTerm] = useState("");
  const [vegetables] = useState([
    { id: 1, name: "Tomato", description: "Fresh and juicy tomatoes.", image: "images/tomato.jpg" },
    { id: 2, name: "Carrot", description: "Crunchy and sweet carrots.", image: "images/carrot.jpg" },
    { id: 3, name: "Potato", description: "Perfect for fries and baking.", image: "images/potato.jpg" },
    { id: 4, name: "Orange", description: "Sweet and tangy oranges.", image: "images/orange.jpg" },
    { id: 5, name: "Spinach", description: "Fresh and nutritious spinach leaves.", image: "images/spinach.jpg" },
    { id: 6, name: "Cucumber", description: "Refreshing and crisp cucumbers.", image: "images/cucumber.jpg" },
    { id: 7, name: "Bell Pepper", description: "Sweet and colorful bell peppers.", image: "images/bellpepper.jpg" },
    { id: 8, name: "Lettuce", description: "Crisp and fresh lettuce leaves.", image: "images/lettuce.jpg" },
    { id: 9, name: "Broccoli", description: "Rich in vitamins and minerals.", image: "images/broccoli.jpg" },
  ]);

  useEffect(() => {
    const fetchUserAchievements = async () => {
      if (username !== "Guest") {
        try {
          // Fetch the user's achievements and display congrats messages
          const response = await axios.get(`http://localhost:5000/api/scoreboard/${username}`);
          const achievements = response.data.achievements;

          // If the user has the 'scoreboard' achievement, show the congrats message
          if (achievements.includes("scoreboard")) {
            setShowScoreboardCongratsMessage(true);
          }

          // Check other achievements and display congrats messages as needed
          if (username.toLowerCase() === "john") {
            setShowJohnCongratsMessage(true);
          }
          if (achievements.includes("fileupload")) {
            setShowFileCongratsMessage(true);
          }
          if (localStorage.getItem("accessedConfidentialDocs") === "true") {
            setShowConfidentialCongratsMessage(true);
          }
        } catch (error) {
          console.error("Error fetching achievements:", error);
        }
      }
    };

    fetchUserAchievements();
  }, [username]);

  const addToBasket = async (veg) => {
    if (username === "Guest") {
      setMessage("Please log in to add items to your basket.");
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
      console.error("Error adding to basket:", error);
      setMessage("Failed to add item to basket.");
    }
  };

  const handleCloseFileCongratsMessage = () => {
    setShowFileCongratsMessage(false);
  };

  const handleCloseConfidentialCongratsMessage = () => {
    setShowConfidentialCongratsMessage(false);
    localStorage.removeItem("accessedConfidentialDocs");
  };

  const handleCloseJohnCongratsMessage = () => {
    setShowJohnCongratsMessage(false);
  };

  const handleCloseScoreboardCongratsMessage = () => {
    setShowScoreboardCongratsMessage(false);
  };

  const handleSearchChange = (e) => {
    const input = e.target.value;
    setSearchTerm(input);

    // Check for the presence of a full <script>...</script> tag (XSS vulnerability)
    const scriptPattern = /<script\b[^>]*>[\s\S]*?<\/script>/i;

    if (scriptPattern.test(input)) {
      setTimeout(() => {
        alert("XSS Detected!");
        setShowXSSCongratsMessage(true);
        addXSSAchievement(); // Add the achievement to the database
      }, 100); // Simulate alert closing
    }
  };

  const addXSSAchievement = async () => {
    if (username === "Guest") return;

    try {
      await axios.post(`http://localhost:5000/api/scoreboard/${username}`, {
        achievement: "xss",
      });
    } catch (error) {
      console.error("Error updating XSS achievement:", error);
    }
  };

  const filteredVegetables = vegetables.filter((veg) =>
    veg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <h1>Hello, {username}</h1>
      <p>Welcome to your dashboard!</p>

      {showScoreboardCongratsMessage && (
        <div className="congrats-message">
          <p>Congratulations! You have accessed the Scoreboard.</p>
          <button onClick={handleCloseScoreboardCongratsMessage}>Close</button>
        </div>
      )}

      {showFileCongratsMessage && (
        <div className="congrats-message">
          <p>Congratulations! You have completed the File Upload Challenge.</p>
          <button onClick={handleCloseFileCongratsMessage}>Close</button>
        </div>
      )}

      {showConfidentialCongratsMessage && (
        <div className="congrats-message">
          <p>Congratulations! You have accessed the Confidential Documents.</p>
          <button onClick={handleCloseConfidentialCongratsMessage}>Close</button>
        </div>
      )}

      {showJohnCongratsMessage && (
        <div className="congrats-message">
          <p>Congratulations! You have accessed John's user account.</p>
          <button onClick={handleCloseJohnCongratsMessage}>Close</button>
        </div>
      )}

      {showXSSCongratsMessage && (
        <div className="congrats-message">
          <p>Congratulations! You have successfully exploited an XSS vulnerability!</p>
        </div>
      )}

      {message && <p className="feedback-message">{message}</p>}

      <div>
        <input
          type="text"
          placeholder="Search for vegetables..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <iframe
          id="xssFrame"
          title="XSS Test Frame"
          srcDoc={searchTerm}
          style={{ width: "100%", height: "200px", border: "1px solid black" }}
        ></iframe>
      </div>

      <div className="nav-buttons">
        <Link to="/basket">
          <button>Basket</button>
        </Link>
        <Link to="/feedback">
          <button>Feedback</button>
        </Link>
        <Link to="/privacy-policy">
          <button>Privacy Policy</button>
        </Link>
        <Link to="/file-upload">
          <button>File Upload</button>
        </Link>
        <Link to="/photo">
          <button>Photo</button>
        </Link>
      </div>

      <div className="vegetable-container">
        {filteredVegetables.map((veg) => (
          <div key={veg.id} className="vegetable-card">
            <img src={`/${veg.image}`} alt={veg.name} />
            <h3>{veg.name}</h3>
            <p>{veg.description}</p>
            <button onClick={() => addToBasket(veg)}>Add to Basket</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
