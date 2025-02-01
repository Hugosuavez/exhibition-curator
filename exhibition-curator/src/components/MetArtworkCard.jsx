import { fetchMetArtworkDetails } from "../utils/met-api-calls";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export const MetArtworkCard = ({ id, openModal }) => {
  const [searchParams] = useSearchParams(); // Manage query params

  const { data, isLoading, error } = useQuery({
    queryKey: ["artwork-details", id], // Query key
    queryFn: () => fetchMetArtworkDetails(id), // Fetcher function
  });
  // Handle loading state
  if (isLoading) return <p>Loading artwork...</p>;

  // Handle error state
  if (error) return <p>Error fetching artwork: {error.message}</p>;

  return (
    <>
      <article key={data.objectID} className="artwork-card">
        <h2>{data.title || "Untitled"}</h2>
        <p>
          {data.artistDisplayName || "Unknown Artist"} |{" "}
          {data.department || "Unknown Department"} |{" "}
          {data.artistNationality || "Unknown Nationality"}
        </p>
        <button onClick={() => openModal(data)}>Add to Exhibition</button>
        <Link
          to={`/met-artwork-details/${
            data.objectID
          }?${searchParams.toString()}`}
        >
          View Artwork Details
        </Link>
      </article>
    </>
  );
};
