import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const ExhibitionCarousel = ({
  exhibitions,
  onDelete,
}) => {
  return (
    <main className="saved-exhibitions">
      {exhibitions.length > 0 ? exhibitions.map((exhibition) => (
        <article className="saved-exhibition-item" key={exhibition.id}>
          <button onClick={() => onDelete(exhibition.id)} className="delete-button">x</button>
          <p>{exhibition.name}</p>
          <Link to={`/exhibition/${exhibition.id}`} className="exhibition-link">
            View
          </Link>
          <Link to={`/curate/${exhibition.id}`} className="exhibition-link">
            Curate
          </Link>
        </article>
      )) : <article className="default-exhibition-item">
          <p>Create exhibition to begin!</p>
        </article>}
    </main>
  );
};
