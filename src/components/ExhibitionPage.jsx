import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArtworkCarousel } from "./ArtworkCarousel";
import { Link } from "react-router-dom";
export const ExhibitionPage = () => {
  const { id } = useParams();
  const [exhibition, setExhibition] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchExhibition = () => {
    const exhibitions =
      JSON.parse(localStorage.getItem("userExhibitions")) || [];
    const selectedExhibition = exhibitions.find((exh) => String(exh.id) === id);
    setLoading(false);
    setExhibition(selectedExhibition);
  };

  useEffect(() => {
    fetchExhibition();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!exhibition) return <p>Exhibition not found!</p>;

  return (
    <main className="exhibition-container">
      <Link to="/">Home</Link>
      <h2>{exhibition.name}</h2>
      <ArtworkCarousel
        artworks={exhibition.artworks}
        updateExhibition={fetchExhibition}
      />
    </main>
  );
};
