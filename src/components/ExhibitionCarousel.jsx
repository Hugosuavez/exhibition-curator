import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const ExhibitionCarousel = ({
  exhibitions,
  onDelete,
  slidesPerView,
}) => {
  return (
    <main className="carousel-container">
      <Swiper
        key={slidesPerView} // forces re-render when slides-per-view updates
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={slidesPerView}
        autoHeight={true}
        loop={false}
      >
        {exhibitions.map((exhibition) => (
          <SwiperSlide key={exhibition.id}>
            
            <article className="carousel-item">

              <button onClick={() => onDelete(exhibition.id)} className="delete-button">x</button>

              <Link to={`/exhibition/${exhibition.id}`} className="exhibition-link">
               View <h3>{exhibition.name}</h3>
              </Link>

              <Link to={`/curate/${exhibition.id}`} className="exhibition-link">
               Curate <h3>{exhibition.name}</h3>
              </Link>

            </article>

          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
};
