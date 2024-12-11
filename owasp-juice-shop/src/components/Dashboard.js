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
          const response = await axios.get(`http://localhost:5000/api/user/${username}`);
          const achievements = response.data.achievements;

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

  // Function to detect XSS in iframe content
  const handleIframeLoad = () => {
    const iframe = document.getElementById("xssFrame");
    if (iframe) {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDoc.body.innerHTML.includes("<script>")) {
          setShowXSSCongratsMessage(true);
        }
      } catch (error) {
        console.error("Error accessing iframe content:", error);
      }
    }
  };

  const filteredVegetables = vegetables.filter((veg) =>
    veg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <h1>Hello, {username}</h1>
      <p>Welcome to your dashboard!</p>

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
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <iframe
          id="xssFrame"
          title="XSS Test Frame"
          srcDoc={searchTerm}
          style={{ width: "100%", height: "200px", border: "1px solid black" }}
          onLoad={handleIframeLoad}
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
        <Link to="/offers">
             <button>offers</button>
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
