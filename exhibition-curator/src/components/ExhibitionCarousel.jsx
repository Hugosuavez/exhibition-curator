import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

export const ExhibitionCarousel = ({ exhibitions, onDelete }) => {

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
  return (
    <div className="carousel-container">
      <button className="carousel-btn left-btn" onClick={scrollLeft}>
        &#8249;
      </button>
    <div className="carousel" ref={carouselRef}>
      {exhibitions.map((exhibition) => (
        <div key={exhibition.id} className="carousel-item">
          <Link to={`/exhibition/${exhibition.id}`} className="exhibition-link">
            <div className="carousel-item-content">
              <h3>{exhibition.name}</h3>
            </div>
          </Link>
          {/* Delete Button */}
          <button
            onClick={() => onDelete(exhibition.id)}
            className="delete-button"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
      <button className="carousel-btn right-btn" onClick={scrollRight}>
        &#8250;
      </button>
    </div>
  );
};
