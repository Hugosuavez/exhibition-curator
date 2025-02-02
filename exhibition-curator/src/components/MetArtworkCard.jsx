import { fetchMetArtworkDetails } from "../utils/met-api-calls";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const MetArtworkCard = ({ id, openModal }) => {
  const [searchParams] = useSearchParams(); // Manage query params
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["artwork-details", id], // Query key
    queryFn: () => fetchMetArtworkDetails(id), // Fetcher function
  });


  const handleDetailsClick = (artwork) => {
    navigate(
      `/met-artwork-details/${artwork.objectID}?${searchParams.toString()}`
    );
  };


  // Handle loading state
  if (isLoading) return <p>Loading artwork...</p>;

  // Handle error state
  if (error) return <p>Error fetching artwork: {error.message}</p>;

  return (
    
      <li key={data.objectID} className="artwork-card">
        <h2>{data.title || "Untitled"}</h2>
        <p>
          {data.artistDisplayName || "Unknown Artist"} |{" "}
          {data.department || "Unknown Department"} |{" "}
          {data.artistNationality || "Unknown Nationality"}
        </p>
        <button onClick={() => openModal(data)}>Add to Exhibition</button>
        <button onClick={() => handleDetailsClick(data)}>
                            View Details
                          </button>
       
      </li>
    
  );
};
