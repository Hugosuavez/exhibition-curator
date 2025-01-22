import { fetchMetArtwork } from "../utils/met-api-calls";
import { useQuery } from "@tanstack/react-query";
import { ArtworkCard } from "./ArtworkCard";
import { Link } from "react-router-dom";
import { useState } from "react";

export const MetArtwork = () => {

  const [currentPage, setCurrentPage] = useState(1); // Track the current page (starting at 1)
  const itemsPerPage = 10; // Number of items per page

  const { data, isLoading, error } = useQuery({
    queryKey: ["met-artworks"], 
    queryFn: () => fetchMetArtwork(),
  });
  
   // Calculate the start and end indices for slicing
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


  
  // Extract the subset of objectIDs for the current page
  const currentObjectIDs = data?.objectIDs.slice(startIndex, endIndex) || [];

  // Calculate the total number of pages
  const totalPages = data ? Math.ceil(data.objectIDs.length / itemsPerPage) : 0;



  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1); // Move to the next page
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1); // Move to the previous page
    }
  };

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
            {currentObjectIDs.map((id) => (
              <ArtworkCard key={id} id={id} />
            ))}
          </div>
           {/* Pagination controls */}
           <div className="pagination-controls">
            <button onClick={handlePrev} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
};
