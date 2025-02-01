import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { removeArtworkFromExhibition } from "../utils/local-storage-calls"; // Import the function

// Component for displaying the artworks carousel
export const ArtworkCarousel = ({ artworks, updateExhibition }) => {
  const { id: exhibitionId } = useParams(); // Get exhibition ID from URL

  const handleRemove = (artworkId) => {
    console.log("hello");
    removeArtworkFromExhibition(exhibitionId, artworkId);
    updateExhibition(); // Refresh exhibition after removal
  };

  return (
    <div className="carousel">
      {artworks.map((artwork, index) => {
        if (artwork.objectID) {
          // if/else statement based on whether artwork is met or harvard. - this will allow mixed exhibitions
          return (
            <div key={index} className="carousel-item">
              <div className="carousel-item-content">
                <h3>{artwork.objectID}</h3>{" "}
                {/* Placeholder for artwork details */}
              </div>
              {/* Remove Button */}
              <button onClick={() => handleRemove(artwork.objectID)}>
                Remove from Exhibition
              </button>
            </div>
          );
        } else if (artwork.objectid) {
          return (
            <div key={index} className="carousel-item">
              <div className="carousel-item-content">
                <h3>{artwork.objectid}</h3>{" "}
                {/* Placeholder for artwork details */}
              </div>
              {/* Remove Button */}
              <button onClick={() => handleRemove(artwork.objectid)}>
                Remove from Exhibition
              </button>
            </div>
          );
        }
      })}
    </div>
  );
};
