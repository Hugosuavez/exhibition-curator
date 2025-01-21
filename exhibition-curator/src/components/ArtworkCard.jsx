import { fetchArtworkDetails } from "../utils/api-calls";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import NoImagePlaceholder from "../assets/No-Image-Placeholder.svg"


export const ArtworkCard = ({ id }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["artwork-details", id], // Query key
    queryFn: () => fetchArtworkDetails(id), // Fetcher function
  });

  // Handle loading state
  if (isLoading) return <p>Loading artwork...</p>;

  // Handle error state
  if (error) return <p>Error fetching artwork: {error.message}</p>;

  return (
    <>
      <article key={data.objectID}>
        <img
          src={data.primaryImageSmall || NoImagePlaceholder}
          alt={data.title || "No title available"}
        />
        <h2>{data.title || "Untitled"}</h2>
        <p>
          {data.artistDisplayName || "Unknown Artist"} |{" "}
          {data.department || "Unknown Department"} |{" "}
          {data.artistNationality || "Unknown Nationality"}
        </p>

        <Link to={`/artwork-details/${data.objectID}`}>
          View Artwork Details
        </Link>
      </article>
    </>
  );
};
