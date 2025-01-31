
import { Link } from "react-router-dom";


export const ExhibitionCarousel = ({ exhibitions }) => {
    return (
      <div className="carousel">
        {exhibitions.map((exhibition) => (
          <div key={exhibition.id} className="carousel-item">
            <Link to={`/exhibition/${exhibition.id}`} className="exhibition-link">
              <div className="carousel-item-content">
                <h3>{exhibition.name}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  };