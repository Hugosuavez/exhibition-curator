import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { removeArtworkFromExhibition } from "../utils/local-storage-calls"; // Import the function
import { Link } from "react-router-dom";
import NoImagePlaceholder from "../assets/No-Image-Placeholder.svg";

// Component for displaying the artworks carousel
export const ArtworkCarousel = ({ artworks, updateExhibition }) => {
  const { id: exhibitionId } = useParams(); // Get exhibition ID from URL

  const carouselRef = useRef(null);
  const [scrollAmount, setScrollAmount] = useState(0);
  
  useEffect(() => {
    const updateScrollAmount = () => {
      if (carouselRef.current) {
        const firstItem = carouselRef.current.querySelector(".carousel-item");
        if (firstItem) {
          setScrollAmount(firstItem.clientWidth + 10); // Get width of one item
        }
      }
    };
  
    updateScrollAmount(); // Set on mount
    window.addEventListener("resize", updateScrollAmount); // Update on resize
  
    return () => window.removeEventListener("resize", updateScrollAmount);
  }, []);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleRemove = (artworkId) => {
    removeArtworkFromExhibition(exhibitionId, artworkId);
    updateExhibition(); // Refresh exhibition after removal
  };

  return (
    <div className="carousel-container">
      <button className="carousel-btn left-btn" onClick={scrollLeft}>
        &#8249;
      </button>
      <div className="carousel" ref={carouselRef}>
        {artworks.map((artwork, index) => {
          // Determine image source
          const imageUrl =
            artwork.primaryImage || artwork.primaryImageSmall || artwork.primaryimageurl || NoImagePlaceholder;
          
          // Normalize data fields between Met and Harvard APIs
          const normalizedArtwork = {
            id: artwork.objectID || artwork.objectid, // Unique identifier
            title: artwork.title || "Untitled",
            artist: artwork.artistDisplayName || artwork.provenance || "Unknown",
            department: artwork.department || "Not specified",
            culture: artwork.culture || "Not specified",
            objectDate: artwork.objectDate || artwork.century || "Not specified",
            medium: artwork.medium || "Not specified",
            dimensions: artwork.dimensions || "Not specified",
            creditLine: artwork.creditLine || artwork.creditline || "Not available",
            description: artwork.description || "No description provided",
            moreInfoURL: artwork.objectURL || artwork.url || null, // Link to original source
            source: artwork.objectID ? "The Met" : "Harvard Art Museums", // Identify source
          };
  
          return (
            <div key={index} className="carousel-item">
              <div className="carousel-item-content">
                <div className="artwork-details-container">
                  <h3 className="artwork-title">{normalizedArtwork.title}</h3>
                  <div className="artwork-image-container">
                    <img
                      src={imageUrl}
                      alt={normalizedArtwork.title}
                      className="carousel-artwork-image"
                    />
                  </div>
                  <div className="artwork-info">
                    <p><strong>Artist:</strong> {normalizedArtwork.artist}</p>
                    <p><strong>Department:</strong> {normalizedArtwork.department}</p>
                    <p><strong>Culture:</strong> {normalizedArtwork.culture}</p>
                    <p><strong>Date:</strong> {normalizedArtwork.objectDate}</p>
                    <p><strong>Medium:</strong> {normalizedArtwork.medium}</p>
                    <p><strong>Dimensions:</strong> {normalizedArtwork.dimensions}</p>
                    <p><strong>Credit Line:</strong> {normalizedArtwork.creditLine}</p>
                    <p><strong>Description:</strong> {normalizedArtwork.description}</p>
                    <p><strong>Source:</strong> {normalizedArtwork.source}</p>
                    {normalizedArtwork.moreInfoURL && (
                      <p>
                        <strong>More Info:</strong> 
                        <a href={normalizedArtwork.moreInfoURL} target="_blank" rel="noopener noreferrer">
                          View on {normalizedArtwork.source} Website
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Remove Button */}
              <button onClick={() => handleRemove(normalizedArtwork.id)}>
                Remove from Exhibition
              </button>
            </div>
          );
        })}
      </div>
      <button className="carousel-btn right-btn" onClick={scrollRight}>
        &#8250;
      </button>
    </div>
  );
};
