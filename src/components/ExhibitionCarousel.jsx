import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


export const ExhibitionCarousel = ({ exhibitions, onDelete }) => {
 
  return (
    <main className="carousel-container">
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={20}
      slidesPerView={1} 
      autoHeight={true}
      loop={false}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: Math.min(2, exhibitions.length) },
        1024: { slidesPerView: Math.min(3, exhibitions.length) },
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
