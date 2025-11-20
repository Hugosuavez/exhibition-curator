import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArtworkCarousel } from "./ArtworkCarousel";
import { Link } from "react-router-dom";
import { removeArtworkFromExhibition } from "../utils/local-storage-calls";
import { toast } from "react-toastify";
import { MetArtwork } from "./MetArtwork";
import { HarvardArtwork } from "./HarvardArtwork";

export const CuratePage = () => {
   const { id } = useParams();
  const [exhibition, setExhibition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [museumToggle, setMuseumToggle] = useState(null);


  useEffect(() => {
    const fetchExhibition = () => {
      const exhibitions =
        JSON.parse(localStorage.getItem("userExhibitions")) || [];
      const selectedExhibition = exhibitions.find(
        (exh) => String(exh.id) === id
      );
      setExhibition(selectedExhibition);
      setLoading(false);
    };
    fetchExhibition();
  }, [id]);

  const handleRemove = (artworkId) => {
    removeArtworkFromExhibition(id, artworkId);

    setExhibition((prevExhibition) => {
      if (!prevExhibition) return prevExhibition;

      const updatedArtworks = prevExhibition.artworks.filter((art) => {
        const currentArtworkId = art.objectID || art.objectid;

        return String(currentArtworkId) !== String(artworkId);
      });

      const updatedExhibition = {
        ...prevExhibition,
        artworks: updatedArtworks,
      };
      return updatedExhibition;
    });
    toast.success("Art successfully removed!");
  };

  const handleToggle = (toggle) => {
    setMuseumToggle(toggle);
  }

  if (loading) return <p>Loading...</p>;
  if (!exhibition) return <p>Exhibition not found!</p>;

  return (<>
        <Link to="/">Home</Link>
        <main className="curate-container">
            <section className="curate-preview">
                <div className="one">{exhibition.name}</div>
                <div className="two">two</div>
                <div className="three">
                </div>
            </section>
            <section className="curate-browse">
                <button className="page-link" onClick={() => handleToggle(true)}>Metropolitan Museum of Art</button>
              
                <button className="page-link2" onClick={() => handleToggle(false)}>Harvard Art Museums</button>
                <div className="browse-container">
                {museumToggle ? <MetArtwork/> : <HarvardArtwork/>}
                </div>
            </section>
    </main>
        </>
  );

}