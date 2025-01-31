import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { ExhibitionCarousel } from "./ExhibitionCarousel";

export const Home = () => {

    const [exhibitions, setExhibitions] = useState([]);

     // Fetch exhibitions from localStorage
  useEffect(() => {
    const storedExhibitions = JSON.parse(localStorage.getItem("userExhibitions")) || [];
    setExhibitions(storedExhibitions);
  }, []);


    return (
    <>
    <h1>Exhibition Curation Platform</h1>
    <h2>Your Exhibitions</h2>
    <ExhibitionCarousel exhibitions={exhibitions} />
    <br />
    <h2>Browse Art</h2>
    <Link to="/met">Metropolitan Museum of Art</Link>
    <br/>
    <Link to="/harvard">Harvard Art Museums</Link>
    </>
)
}