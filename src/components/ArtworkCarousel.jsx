import React from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { removeArtworkFromExhibition } from "../utils/local-storage-calls"; 
import NoImagePlaceholder from "../assets/No-Image-Placeholder.svg";

export const ArtworkCarousel = ({ artworks, updateExhibition }) => {
  const { id: exhibitionId } = useParams();

  const handleRemove = (artworkId) => {
    removeArtworkFromExhibition(exhibitionId, artworkId);
    updateExhibition();
  };

  return (
    <main className="carousel-container">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="carousel"
      >
        {artworks.map((artwork, index) => {
          const imageUrl =
            artwork.primaryImage ||
            artwork.primaryImageSmall ||
            artwork.primaryimageurl ||
            NoImagePlaceholder;

          const normalizedArtwork = {
            id: artwork.objectID || artwork.objectid,
            title: artwork.title || "Untitled",
            artist:
              artwork.artistDisplayName || artwork.provenance || "Unknown",
            department: artwork.department || "Not specified",
            culture: artwork.culture || "Not specified",
            objectDate:
              artwork.objectDate || artwork.century || "Not specified",
            medium: artwork.medium || "Not specified",
            dimensions: artwork.dimensions || "Not specified",
            creditLine:
              artwork.creditLine || artwork.creditline || "Not available",
            description: artwork.description || "No description provided",
            moreInfoURL: artwork.objectURL || artwork.url || null,
            source: artwork.objectID ? "The Met" : "Harvard Art Museums",
          };

          return (
            <SwiperSlide key={index}>
              <article className="carousel-item">
                <section className="artwork-details-container">
                  <h3 className="artwork-title">{normalizedArtwork.title}</h3>
                  <section className="artwork-image-container">
                    <img
                      src={imageUrl}
                      alt={normalizedArtwork.title}
                      className="carousel-artwork-image"
                    />
                  </section>
                  <section className="artwork-info">
                    <p>
                      <strong>Artist:</strong> {normalizedArtwork.artist}
                    </p>
                    <p>
                      <strong>Department:</strong> {normalizedArtwork.department}
                    </p>
                    <p>
                      <strong>Culture:</strong> {normalizedArtwork.culture}
                    </p>
                    <p>
                      <strong>Date:</strong> {normalizedArtwork.objectDate}
                    </p>
                    <p>
                      <strong>Medium:</strong> {normalizedArtwork.medium}
                    </p>
                    <p>
                      <strong>Dimensions:</strong> {normalizedArtwork.dimensions}
                    </p>
                    <p>
                      <strong>Credit Line:</strong> {normalizedArtwork.creditLine}
                    </p>
                    <p>
                      <strong>Description:</strong> {normalizedArtwork.description}
                    </p>
                    <p>
                      <strong>Source:</strong> {normalizedArtwork.source}
                    </p>
                    {normalizedArtwork.moreInfoURL && (
                      <p>
                        <strong>More Info:</strong>
                        <a
                          href={normalizedArtwork.moreInfoURL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on {normalizedArtwork.source} Website
                        </a>
                      </p>
                    )}
                  </section>
                </section>
                <button onClick={() => handleRemove(normalizedArtwork.id)}>
                  Remove from Exhibition
                </button>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </main>
  );
};
