import { fetchMetArtworkDetails } from "../utils/met-api-calls";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  addArtworkToExhibition,
} from "../utils/local-storage-calls";
import { useQuery } from "@tanstack/react-query";
import NoImagePlaceholder from "../assets/No-Image-Placeholder.svg";

export const MetArtworkCard = ({ id, openModal, artwork,
  setArtwork,
  exhibition }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  

  const { data, isLoading, error } = useQuery({
    queryKey: ["artwork-details", id],
    queryFn: () => fetchMetArtworkDetails(id),
  });



   //new function for direct add to art preview in curate page
    const addArtwork = (newArt) => {
      console.log(newArt)
      console.log(exhibition.artworks)
          //ERROR HANDLING
      const foundMetArt = exhibition.artworks.find(
        (art) => art.objectID !== undefined && art.objectID === newArt.objectID
      );
  
      const foundHarvardArt = exhibition.artworks.find(
        (art) => art.objectid !== undefined && art.objectid === newArt.objectid
      );
      console.log(foundMetArt)
      if (foundMetArt || foundHarvardArt) {
        // setErrorMessage("Selected artwork already added to exhibition");
      toast.error("Selected artwork already added to exhibition!");
  
        return;
      }    

      setArtwork([...artwork, newArt])
          
      addArtworkToExhibition(exhibition.id, newArt);
          
      toast.success("Artwork successfully added!");
      }


  const handleDetailsClick = (artwork) => {
    navigate(
      `/met-artwork-details/${artwork.objectID}?${searchParams.toString()}`
    );
  };

  if (isLoading) return <p>Loading artwork...</p>;

  if (error) return <p>Error fetching artwork: {error.message}</p>;

  const imageUrl =
    data.primaryImage || data.primaryImageSmall || NoImagePlaceholder;

  return (
    <li key={data.objectID} className="artwork-card">
      <h2>{data.title || "Untitled"}</h2>
      <img
        src={imageUrl}
        alt={data.title || "No title available"}
        className="artwork-image"
      />
      <p>
        {data.artistDisplayName || "Unknown Artist"} |{" "}
        {data.department || "Unknown Department"} |{" "}
        {data.artistNationality || "Unknown Nationality"}
      </p>
      <button onClick={() => addArtwork(data)}>Add to Exhibition</button>
      <button onClick={() => handleDetailsClick(data)}>View Details</button>
    </li>
  );
};
