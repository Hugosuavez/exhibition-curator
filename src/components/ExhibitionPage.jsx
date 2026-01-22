import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArtworkCarousel } from "./ArtworkCarousel";
import { Link } from "react-router-dom";
import { removeArtworkFromExhibition } from "../utils/local-storage-calls";
import { toast } from "react-toastify";

export const ExhibitionPage = () => {
  const { id } = useParams();
  const [exhibition, setExhibition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExhibition = () => {
      const exhibitions =
        JSON.parse(localStorage.getItem("userExhibitions")) || [];
      const selectedExhibition = exhibitions.find(
        (exh) => String(exh.id) === id
      );
      setExhibition(selectedExhibition);
      setLoading(false);
    };
    fetchExhibition();
  }, [id]);

  const handleRemove = (artworkId) => {
    removeArtworkFromExhibition(id, artworkId);

    setExhibition((prevExhibition) => {
      if (!prevExhibition) return prevExhibition;

      const updatedArtworks = prevExhibition.artworks.filter((art) => {
        const currentArtworkId = art.objectID || art.objectid;

        return String(currentArtworkId) !== String(artworkId);
      });

      const updatedExhibition = {
        ...prevExhibition,
        artworks: updatedArtworks,
      };
      return updatedExhibition;
    });
    toast.success("Art successfully removed!");
  };

  if (loading) return <p>Loading...</p>;
  if (!exhibition) return <p>Exhibition not found!</p>;

  return (
    <main className="exhibition-container">
       <header className="home-header">
        <Link to="/" className="home-button">
          <h1>
            <span className="header-colour-first">
              ARCHI
            </span>
            <span className="header-colour">
              VIST!
            </span>
          </h1>
        </Link>
      <h2>{exhibition.name}</h2>
        

      </header>
      <ArtworkCarousel
        artworks={exhibition.artworks || []}
        handleRemove={handleRemove}
      />
    </main>
  );
};
