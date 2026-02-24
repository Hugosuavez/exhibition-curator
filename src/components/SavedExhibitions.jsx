import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const SavedExhibitions = ({
  exhibitions,
  onDelete,
}) => {
  return (
    <main className="saved-exhibitions">
      {exhibitions.length > 0 ? exhibitions.map((exhibition) => (
        <article className="saved-exhibition-item" key={exhibition.id}>
          <button onClick={() => onDelete(exhibition.id)} className="delete-button">x</button>
          <p className="saved-exhibition-title">{exhibition.name}</p>
          <div className="exhibition-links-container">
          
          <Link to={`/exhibition/${exhibition.id}`} className="exhibition-link">
            View
          </Link>
          <Link to={`/curate/${exhibition.id}`} className="exhibition-link">
            Curate
          </Link>
          </div>
        </article>
      )) : <article className="default-exhibition-item">
          <p>Create exhibition and click curate to begin!</p>
        </article>}
    </main>
  );
};
