import { normaliseArtwork } from "../utils/normalisation-utils";

export const ArtworkCarousel = ({ artworks }) => {
  return (
    <main className="carousel-container">
    
        {artworks.map((artwork, index) => {

          const normalisedArtwork = normaliseArtwork(artwork);

          return (
              <article className="carousel-item-artwork" key={index}>
                <h3 className="artwork-title-ep">{normalisedArtwork.title}</h3>
                <img
                  src={normalisedArtwork.imageUrl}
                  alt={normalisedArtwork.title}
                  className="carousel-artwork-image"
                />
                <section className="artwork-info-container">
                  <p className="artwork-info-ellipsis">Info...</p>
                  <div className="artwork-info-contents">
                    <div className="more-info">
                      <p>
                        <strong>Artist:</strong> {normalisedArtwork.artist}
                      </p>
                      <p>
                        <strong>Department:</strong>{" "}
                        {normalisedArtwork.department}
                      </p>
                      <p>
                        <strong>Culture:</strong> {normalisedArtwork.culture}
                      </p>
                      <p>
                        <strong>Date:</strong> {normalisedArtwork.objectDate}
                      </p>
                      <p>
                        <strong>Medium:</strong> {normalisedArtwork.medium}
                      </p>
                      <p>
                        <strong>Dimensions:</strong>{" "}
                        {normalisedArtwork.dimensions}
                      </p>
                      <p>
                        <strong>Credit Line:</strong>{" "}
                        {normalisedArtwork.creditLine}
                      </p>
                      <p>
                        <strong>Description:</strong>{" "}
                        {normalisedArtwork.description}
                      </p>
                      <p>
                        <strong>Source:</strong> {normalisedArtwork.source}
                      </p>
                      {normalisedArtwork.moreInfoURL && (
                        <p>
                          <strong>More Info:</strong>
                          <a
                            href={normalisedArtwork.moreInfoURL}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View on {normalisedArtwork.source} Website
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </section>
              </article>
          );
        })}
    </main>
  );
};
