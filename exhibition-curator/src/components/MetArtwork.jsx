import { fetchArtwork } from "../utils/api-calls"
import { useQuery } from "@tanstack/react-query"
import {ArtworkCard} from "./ArtworkCard"

export const MetArtwork = () => {

    const { data, isLoading, error } = useQuery({
        queryKey: ['artworks'], // Query key
        queryFn: () => fetchArtwork() // Fetcher function
      });

    return (
        <>
        {isLoading && <p>Loading artworks...</p>}
        {error && <p>Error fetching artworks</p>}
        {data && data.objectIDs && (
        <>
        <h1>Metropolitan Museum of Art</h1>
        <div className="artwork-list">
          {/* Loop through the objectIDs and fetch artwork details */}
          {data.objectIDs.slice(0,50).map((id) => (
              <ArtworkCard key={id} id={id} />
            ))}
        </div>
        </>
      )}
        </>
    );
} 