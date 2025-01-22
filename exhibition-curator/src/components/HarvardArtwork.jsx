import { useQuery } from "@tanstack/react-query"
import { fetchHarvardArtwork } from "../utils/harvard-api-calls";
import { Link } from "react-router-dom";
import { useState } from "react";


export const HarvardArtwork = () => {

    const [currentUrl, setCurrentUrl] = useState(null); // Track the current URL (default: null)



    const { data, isLoading, error } = useQuery({
        queryKey: ['harvard-artworks', currentUrl], 
        queryFn: () => fetchHarvardArtwork(currentUrl), 
        keepPreviousData: true,
      });


      const handleNext = () => {
        if (data?.info?.next) {
          setCurrentUrl(data.info.next); // Set the next page URL
        }
      };
    
      const handlePrev = () => {
        if (data?.info?.prev) {
          setCurrentUrl(data.info.prev); // Set the previous page URL
        }
      };


    return (
    <>
    {isLoading && <p>Loading artworks...</p>}
    {error && <p>Error fetching artworks</p>}
    {data?.records && (
        <div>
          <Link to="/">Home</Link>
          <h1>Harvard Artworks</h1>
          <ul>
            {data.records.map((record) => (
              <li key={record.objectid}>
                <p>{record.objectid}</p>
                <p>{record.title || "Untitled"}</p>
              </li>
            ))}
          </ul>
          <div className="pagination-controls">
            <button onClick={handlePrev} disabled={!data.info.prev}>
              Previous
            </button>
            <button onClick={handleNext} disabled={!data.info.next}>
              Next
            </button>
          </div>
        </div>
      )}
    </>    
)
}