import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MetExhibits } from "./MetExhibits";
import { HarvardExhibits } from "./HarvardExhibits";
import { CuratePreview } from "./CuratePreview";
import { useSearchParams } from "react-router-dom";
import { MdAccountBalance } from "react-icons/md";


export const CuratePage = () => {
  const { id } = useParams();
  const [exhibition, setExhibition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [artwork, setArtwork] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentMuseum = searchParams.get("museum") || "harvard";

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

      setSearchParams(prevParams => {
        prevParams.set("exhibitionId", id);
        return prevParams;
      });

    };
    fetchExhibition();
  }, [id]);


  const handleToggle = (museum) => {
    setSearchParams({ exhibitionId: id, museum });
  }

  if (loading) return <p>Loading...</p>;
  if (!exhibition) return <p>Exhibition not found!</p>;

  return (
    <div>
      <header className="home-header">
        <div className="header-title">
          <h1>
            <span className="header-colour-first">
              ARCHI
            </span>
            <span className="header-colour">
              VIST!
            </span>
          </h1>
          <h2>Your very own exhibition curator</h2>
        </div>
        <Link className="home-link" to="/home">
          <MdAccountBalance size={"1.5rem"} />
        </Link>
      </header>
      <main className="curate-container">
        <section className="curate-preview">
          <div className="exhibition-title">Preview of {exhibition.name}</div>
          <Link to={`/exhibition/${id}`} className="gallery-link">Gallery View</Link>
          <CuratePreview artwork={artwork} setArtwork={setArtwork} exhibition={exhibition} />
        </section>
        <section className="curate-browse">
          <button className={`met-link ${currentMuseum === "met" ? "met-toggle" : ""}`} onClick={() => handleToggle("met")}>Metropolitan Museum of Art</button>
          <button className={`harvard-link ${currentMuseum === "harvard" ? "harvard-toggle" : ""}`} onClick={() => handleToggle("harvard")}>Harvard Art Museums</button>
          {currentMuseum === "met" ? <MetExhibits exhibition={exhibition} setArtwork={setArtwork} artwork={artwork} /> : <HarvardExhibits exhibition={exhibition} setArtwork={setArtwork} artwork={artwork} />}
        </section>
      </main>
    </div>
  );

}