import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { ExhibitionCarousel } from "./ExhibitionCarousel";
import { deleteExhibition } from "../utils/local-storage-calls";
export const Home = () => {

    const [exhibitions, setExhibitions] = useState([]);

     // Fetch exhibitions from localStorage
  useEffect(() => {
    const storedExhibitions = JSON.parse(localStorage.getItem("userExhibitions")) || [];
    setExhibitions(storedExhibitions);
  }, []);

   // Handle deleting an exhibition
   const handleDeleteExhibition = (exhibitionId) => {
    deleteExhibition(exhibitionId); // Remove from localStorage
    setExhibitions((prevExhibitions) => prevExhibitions.filter((exh) => exh.id !== exhibitionId)); // Update state
  };

    return (
    <>
    <h1>Exhibition Curation Platform</h1>
    <h2>Your Exhibitions</h2>
    {exhibitions.length > 0 ? 
    <ExhibitionCarousel exhibitions={exhibitions} onDelete={handleDeleteExhibition} /> : 
    <p>Start browsing to create exhibition</p>
    
  }

    <br />
    <h2>Browse Art</h2>
    <Link to="/met">Metropolitan Museum of Art</Link>
    <br/>
    <Link to="/harvard">Harvard Art Museums</Link>
    </>
)
}