import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArtworkCarousel } from "./ArtworkCarousel";

export const ExhibitionPage = () => {
    const { id } = useParams();
    const [exhibition, setExhibition] = useState(null);


  const fetchExhibition = () => {
    const exhibitions = JSON.parse(localStorage.getItem("userExhibitions")) || [];
    const selectedExhibition = exhibitions.find((exh) => String(exh.id) === id);
    setExhibition(selectedExhibition);
  };

    useEffect(() => {
      fetchExhibition();
    }, [id]);

    if (!exhibition) return <p>Exhibition not found!</p>;
  
    return (
      <div>
        <h1>{exhibition.name}</h1>
        <h2>Artworks in this Exhibition:</h2>
        <ArtworkCarousel artworks={exhibition.artworks} updateExhibition={fetchExhibition}/>
      </div>
    );
  };