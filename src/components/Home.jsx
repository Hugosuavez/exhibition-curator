import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ExhibitionCarousel } from "./ExhibitionCarousel";
import { deleteExhibition } from "../utils/local-storage-calls";
export const Home = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(1); // Default to 1

  // Fetch exhibitions from localStorage
  useEffect(() => {
    const storedExhibitions =
      JSON.parse(localStorage.getItem("userExhibitions")) || [];
    setExhibitions(storedExhibitions);

    updateSlidesPerView(storedExhibitions.length);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      updateSlidesPerView(exhibitions.length);
    };
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [exhibitions.length]);
  

  const updateSlidesPerView = (count) => {
    if (window.innerWidth >= 1024) {
      setSlidesPerView(Math.min(3, count));
    } else if (window.innerWidth >= 768) {
      setSlidesPerView(Math.min(2, count));
    } else {
      setSlidesPerView(1);
    }
  };



  // Handle deleting an exhibition
  const handleDeleteExhibition = (exhibitionId) => {
    deleteExhibition(exhibitionId); // Remove from localStorage
    setExhibitions((prevExhibitions) => {

      const updatedExhibitions = prevExhibitions.filter(
        (exh) => exh.id !== exhibitionId)
        updateSlidesPerView(updatedExhibitions.length);
        return updatedExhibitions;
    }
    ); //update state
  };

  return (
    <main className="container">
      <h1>Exhibition Curation Platform</h1>
      <h2>Your Exhibitions</h2>
      {exhibitions.length > 0 ? (
        <ExhibitionCarousel
          exhibitions={exhibitions}
          onDelete={handleDeleteExhibition}
          slidesPerView={slidesPerView}
          updateSlidesPerView={updateSlidesPerView}
        />
      ) : (
        <p>Start browsing to create exhibition</p>
      )}

      <br />
      <h2>Browse Art</h2>
      <Link to="/met">Metropolitan Museum of Art</Link>
      <br />
      <Link to="/harvard">Harvard Art Museums</Link>
    </main>
  );
};
