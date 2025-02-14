import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect } from "react";


export const ExhibitionCarousel = ({ exhibitions, onDelete, slidesPerView, updateSlidesPerView }) => {
 
  return (
    <main className="carousel-container">
    <Swiper
    key={slidesPerView} // forces re-render when slides-per-view updates
      modules={[Navigation]}
      navigation
      spaceBetween={20}
      slidesPerView={slidesPerView} 
      autoHeight={true}
      loop={false}
      breakpoints={{
        640: { slidesPerView: slidesPerView },
        768: { slidesPerView: slidesPerView },
        1024: { slidesPerView: slidesPerView },
      }}
    >
      {exhibitions.map((exhibition) => (
        <SwiperSlide key={exhibition.id}>
          <article className="carousel-item">
            <Link to={`/exhibition/${exhibition.id}`} className="exhibition-link">
              <h3>{exhibition.name}</h3>
            </Link>
            {/* Delete Button */}
            <button onClick={() => onDelete(exhibition.id)} className="delete-button">
              Delete
            </button>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  </main>
  );
};
