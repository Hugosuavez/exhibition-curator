import NoImagePlaceholder from "../assets/No-Image-Placeholder.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addArtworkToExhibition,
  getExhibitionById,
} from "../utils/local-storage-calls";


export const HarvardArtworkCard = ({
  record,
  setSelectedArtwork,
  setIsModalOpen,
  artwork,
  setArtwork,
  exhibition
}) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const openModal = (artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };
  
  const exhibitionId = exhibition.id
  //new function for direct add to art preview in curate page
  const addArtwork = (newArt) => {
    const updatedExhibition = getExhibitionById(exhibitionId);


        //ERROR HANDLING
    const foundMetArt = updatedExhibition.artworks.find(
      (art) => art.objectID !== undefined && art.objectID === newArt.objectID
    );

    const foundHarvardArt = exhibition.artworks.find(
      (art) => art.objectid !== undefined && art.objectid === newArt.objectid
    );
    
    if (foundMetArt || foundHarvardArt) {
      // setErrorMessage("Selected artwork already added to exhibition");
    toast.error("Selected artwork already added to exhibition!");

      return;
    }


    setArtwork([...artwork, newArt]);
    addArtworkToExhibition(exhibition.id, newArt);
    toast.success("Artwork successfully added!");
  }


//function to add art to local storage(split off into utils?)
 const handleAddToExhibition = (newArt) => {
    // if (!selectedExhibition) return;

    // const parsedExhibition = JSON.parse(selectedExhibition);

    //ERROR HANDLING
    // const foundMetArt = exhibition.artworks.find(
    //   (art) => art.objectID !== undefined && art.objectID === artwork.objectID
    // );

    // const foundHarvardArt = exhibition.artworks.find(
    //   (art) => art.objectid !== undefined && art.objectid === artwork.objectid
    // );

    // if (foundMetArt || foundHarvardArt) {
    //   setErrorMessage("Selected artwork already added to exhibition");
    //   return;
    // }

    addArtworkToExhibition(exhibition.id, newArt);

    // setExhibitions(getExhibitions());
    // toast.success("Artwork added successfully!");
   
  };


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
    <li key={record.objectid} className="artwork-card">
      <h2>{title || "Untitled"}</h2>
      <img
        src={imageUrl}
        alt={record.title || "No title available"}
        className="artwork-image"
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
