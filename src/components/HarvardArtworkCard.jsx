import NoImagePlaceholder from "../assets/No-Image-Placeholder.svg";
import { useNavigate, useSearchParams } from "react-router-dom";

export const HarvardArtworkCard = ({
  record,
  setSelectedArtwork,
  setIsModalOpen,
}) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const openModal = (artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
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
      <button onClick={() => openModal(record)}>Add to Exhibition</button>
      <button onClick={() => handleDetailsClick(record)}>View Details</button>
    </li>
  );
};
