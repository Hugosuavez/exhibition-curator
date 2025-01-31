import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Component for displaying the artworks carousel
export const ArtworkCarousel = ({ artworks }) => {
  return (
    <div className="carousel">
      {artworks.map((artwork, index) => (
        <div key={index} className="carousel-item">
          <div className="carousel-item-content">
            <h3>{artwork}</h3> {/* Placeholder for artwork details */}
          </div>
        </div>
      ))}
    </div>
  );
};


