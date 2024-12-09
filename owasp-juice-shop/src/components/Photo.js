import React from "react";
import "./CSS/photo.css"

const Photo = () => {
  const photos = [
    { id: 1, name: "John", src: "/images/tomato.jpg" },
    { id: 2, name: "Carrot", src: "/images/carrot.jpg" },
    { id: 3, name: "Potato", src: "/images/potato.jpg" },
    { id: 4, name: "Orange", src: "/images/orange.jpg" },
    { id: 5, name: "Spinach", src: "/images/spinach.jpg" },
    { id: 6, name: "Cucumber", src: "/images/cucumber.jpg" },
    
  ];

  return (
    <div className="photo-container">
      <h1>Photo Gallery</h1>
      <div className="photo-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img src={photo.src} alt={photo.name} />
            <h3>{photo.name}</h3>
            <a href={photo.src} download={`${photo.name.toLowerCase()}.jpg`}>
              <button className="download-button">Download</button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Photo;
