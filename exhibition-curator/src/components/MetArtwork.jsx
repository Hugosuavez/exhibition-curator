import { fetchMetArtwork } from "../utils/met-api-calls";
import { useQuery } from "@tanstack/react-query";
import { ArtworkCard } from "./ArtworkCard";
import { Link } from "react-router-dom";

export const MetArtwork = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["met-artworks"], // Query key
    queryFn: () => fetchMetArtwork(), // Fetcher function
  });

  return (
    <>
      {isLoading && <p>Loading artworks...</p>}
      {error && <p>Error fetching artworks</p>}
      {data && data.objectIDs && (
        <>
          <Link to="/">Home</Link>
          <h1>Metropolitan Museum of Art</h1>
          <div className="artwork-list">
            {/* Loop through the objectIDs and fetch artwork details */}
            {data.objectIDs.slice(0, 50).map((id) => (
              <ArtworkCard key={id} id={id} />
            ))}
          </div>
        </>
      )}
    </>
  );
};
