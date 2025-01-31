import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const ExhibitionPage = () => {
    const { id } = useParams();
    const [exhibition, setExhibition] = useState(null);



    useEffect(() => {
      const exhibitions = JSON.parse(localStorage.getItem("userExhibitions")) || [];
      const selectedExhibition = exhibitions.find((exh) => exh.id === id);
      setExhibition(selectedExhibition);
      console.log(exhibitions);
    }, [id]);
    if (!exhibition) return <p>Exhibition not found!</p>;
  
    return (
      <div>
        <h1>{exhibition.name}</h1>
        <h2>Artworks in this Exhibition:</h2>
        <ArtworkCarousel artworks={exhibition.artworks} />
      </div>
    );
  };