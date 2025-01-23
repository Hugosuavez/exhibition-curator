
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMetArtworkDetails } from "../utils/met-api-calls";
import NoImagePlaceholder from "../assets/No-Image-Placeholder.svg";

export const MetArtworkDetails = () => {
  // Get the objectID from the route parameters
  const { objectID } = useParams();

  // Fetch details for the artwork with the given objectID
  const { data, isLoading, error } = useQuery({
    queryKey: ["artwork-details", objectID], // Unique query key
    queryFn: () => fetchMetArtworkDetails(objectID), // Fetch function
  });

  if (isLoading) return <p>Loading artwork details...</p>;
  if (error) return <p>Error fetching artwork details: {error.message}</p>;

  // Use the image if available; fallback to the placeholder
  const imageUrl = data.primaryImage || data.primaryImageSmall || NoImagePlaceholder;

  return (
    <div className="artwork-details-container">
      <h1>{data.title}</h1>
      <div className="artwork-image-container">
        <img src={imageUrl} alt={data.title || "No title available"} className="artwork-image" />
      </div>
      <div className="artwork-info">
        <p><strong>Artist:</strong> {data.artistDisplayName || "Unknown"}</p>
        <p><strong>Department:</strong> {data.department || "Not specified"}</p>
        <p><strong>Culture:</strong> {data.culture || "Not specified"}</p>
        <p><strong>Object Date:</strong> {data.objectDate || "Not specified"}</p>
        <p><strong>Medium:</strong> {data.medium || "Not specified"}</p>
        <p><strong>Dimensions:</strong> {data.dimensions || "Not specified"}</p>
        {data.objectURL && (
          <p>
            <strong>More Info:</strong> <a href={data.objectURL} target="_blank" rel="noopener noreferrer">View on The Met Website</a>
          </p>
        )}
      </div>
    </div>
  );
};
