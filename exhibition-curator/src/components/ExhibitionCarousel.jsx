
import { Link } from "react-router-dom";
import { useState } from "react";
import { deleteExhibition } from "../utils/local-storage-calls";
export const ExhibitionCarousel = ({ exhibitions, onDelete }) => {

    return (
      <div className="carousel">
        {exhibitions.map((exhibition) => (
          <div key={exhibition.id} className="carousel-item">
            <Link to={`/exhibition/${exhibition.id}`} className="exhibition-link">
              <div className="carousel-item-content">
                <h3>{exhibition.name}</h3>
              </div>
            </Link>
             {/* Delete Button */}
          <button onClick={() => onDelete(exhibition.id)} className="delete-button">
            Delete
          </button>
          </div>
        ))}
      </div>
    );
  };