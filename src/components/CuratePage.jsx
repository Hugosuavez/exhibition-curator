import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MetArtwork } from "./MetArtwork";
import { HarvardArtwork } from "./HarvardArtwork";
import { CuratePreview } from "./CuratePreview";
import { useSearchParams } from "react-router-dom";

export const CuratePage = () => {
  const { id } = useParams();
  const [exhibition, setExhibition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [museumToggle, setMuseumToggle] = useState(null);
  const [artwork, setArtwork] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams();

  

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
      setSearchParams({exhibitionId: id})
    };
    fetchExhibition();
  }, [id]);


  const handleToggle = (toggle) => {
    setMuseumToggle(toggle);
    setSearchParams({exhibitionId: id});
  }

  if (loading) return <p>Loading...</p>;
  if (!exhibition) return <p>Exhibition not found!</p>;

  return (
    <div>
      <header className="home-header">
        <Link className="home-link" to="/home">
          <h1>
            <span className="header-colour-first">
              ARCHI
            </span>
            <span className="header-colour">
              VIST!
            </span>
          </h1>
        </Link>
        <h2>Your very own exhibition curator</h2>

      </header>
      <main className="curate-container">

        <section className="curate-preview">
          {/* <div className="home-button">Archivist!</div> */}
          <div className="exhibition-title">Preview of {exhibition.name}</div>
          <Link to={`/exhibition/${id}`} className="gallery-link">Gallery View</Link>
          <CuratePreview artwork={artwork} setArtwork={setArtwork} exhibition={exhibition} />
        </section>
        <section className="curate-browse">
          <button className={`met-link ${museumToggle ? "met-toggle" : ""}`} onClick={() => handleToggle(true)}>Metropolitan Museum of Art</button>
          <button className={`harvard-link ${museumToggle ? "" : "harvard-toggle"}`} onClick={() => handleToggle(false)}>Harvard Art Museums</button>
          {museumToggle ? <MetArtwork exhibition={exhibition} setArtwork={setArtwork} artwork={artwork} /> : <HarvardArtwork exhibition={exhibition} setArtwork={setArtwork} artwork={artwork} />}
        </section>
      </main>
    </div>
  );

}