import NoImagePlaceholder from "../assets/No-Image-Placeholder.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addArtworkToExhibition,
  getExhibitionById,
} from "../utils/local-storage-calls";


export const HarvardExhibitCard = ({
  record,
  artwork,
  setArtwork,
  exhibition
}) => {

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const exhibitionId = exhibition.id

  const addArtwork = (newArt) => {
    const updatedExhibition = getExhibitionById(exhibitionId);

    const foundMetArt = updatedExhibition.artworks.find(
      (art) => art.objectID !== undefined && art.objectID === newArt.objectID
    );

    const foundHarvardArt = updatedExhibition.artworks.find(
      (art) => art.objectid !== undefined && art.objectid === newArt.objectid
    );

    if (foundMetArt || foundHarvardArt) {
      toast.error("Selected artwork already added to exhibition!");
      return;
    }

    setArtwork([...artwork, newArt]);
    addArtworkToExhibition(exhibition.id, newArt);
  }


  const handleDetailsClick = (artwork) => {
    navigate(
      `/harvard-artwork-details/${artwork.objectid}?${searchParams.toString()}`
    );
  };

  const regex = /^\[.*\]$/;
  const title = regex.test(record.title)
    ? record.title.slice(1, -1)
    : record.title;

  const imageUrl = record?.primaryimageurl || NoImagePlaceholder;
  
  return (
    <li key={record.objectid} className="artwork-card-cb">
      <h2>{title || "Untitled"}</h2>
      <img
        src={imageUrl}
        alt={record.title || "No title available"}
        className="artwork-image-cb"
      />
      <p>
        {record.century || "Unknown Artist"} |{" "}
        {record.department || "Unknown Department"} |{" "}
        {record.culture || "Unknown Nationality"}
      </p>
      <button onClick={() => addArtwork(record)}>Add to Exhibition</button>
      <button onClick={() => handleDetailsClick(record)}>View Details</button>
    </li>
  );
};
