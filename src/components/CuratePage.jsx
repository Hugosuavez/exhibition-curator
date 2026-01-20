import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MetArtwork } from "./MetArtwork";
import { HarvardArtwork } from "./HarvardArtwork";
import { CuratePreview } from "./CuratePreview";

export const CuratePage = () => {
   const { id } = useParams();
  const [exhibition, setExhibition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [museumToggle, setMuseumToggle] = useState(null);
  const [artwork, setArtwork] = useState(null)


  useEffect(() => {
    const fetchExhibition = () => {
      const exhibitions =
        JSON.parse(localStorage.getItem("userExhibitions")) || [];
      const selectedExhibition = exhibitions.find(
        (exh) => String(exh.id) === id
      );
      setExhibition(selectedExhibition);
      setArtwork(selectedExhibition.artworks)
      setLoading(false);
    };
    fetchExhibition();
  }, [id]);


  const handleToggle = (toggle) => {
    setMuseumToggle(toggle);
  }

  if (loading) return <p>Loading...</p>;
  if (!exhibition) return <p>Exhibition not found!</p>;

  return (<>
        <main className="curate-container">
            <section className="curate-preview">
                <Link to="/" className="home-button">Archivist!</Link>
                {/* <div className="home-button">Archivist!</div> */}
                <div className="exhibition-title">{exhibition.name}</div>
                <CuratePreview artwork={artwork} setArtwork={setArtwork} exhibition={exhibition}/>
            </section>
            <section className="curate-browse">
                <button className={`met-link ${museumToggle ? "met-toggle" : ""}`} onClick={() => handleToggle(true)}>Metropolitan Museum of Art</button>
                <button className={`harvard-link ${museumToggle ? "" : "harvard-toggle"}`} onClick={() => handleToggle(false)}>Harvard Art Museums</button>
                {museumToggle ? <MetArtwork exhibition={exhibition} setArtwork={setArtwork} artwork={artwork}/> : <HarvardArtwork exhibition={exhibition} setArtwork={setArtwork} artwork={artwork}/>}
            </section>
    </main>
        </>
  );

}