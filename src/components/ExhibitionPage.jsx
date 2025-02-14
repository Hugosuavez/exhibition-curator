import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArtworkCarousel } from "./ArtworkCarousel";
import { Link } from "react-router-dom";
import { removeArtworkFromExhibition } from "../utils/local-storage-calls"; 

export const ExhibitionPage = () => {
  const { id } = useParams();
  const [exhibition, setExhibition] = useState(null); // Initially set to null
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchExhibition = () => {
      const exhibitions =
        JSON.parse(localStorage.getItem("userExhibitions")) || [];
      const selectedExhibition = exhibitions.find((exh) => String(exh.id) === id);
      setExhibition(selectedExhibition);
      setLoading(false);
    };

    fetchExhibition();
  }, [id]);

  
  const handleRemove = (artworkId) => {
    removeArtworkFromExhibition(id, artworkId);

    setExhibition((prevExhibition) => {
      if (!prevExhibition) return prevExhibition;

      const updatedArtworks = prevExhibition.artworks.filter(
        (art) => art.id !== artworkId
      );

      const updatedExhibition = { ...prevExhibition, artworks: updatedArtworks };
      return updatedExhibition;
    });
  };

  if (loading) return <p>Loading...</p>;
  if (!exhibition) return <p>Exhibition not found!</p>;

  return (
    <main className="exhibition-container">
      <Link to="/">Home</Link>
      <h2>{exhibition.name}</h2>
      <ArtworkCarousel
        artworks={exhibition.artworks || []}
        handleRemove={handleRemove}
      />
    </main>
  );
};
