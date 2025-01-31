import { fetchMetArtwork } from "../utils/met-api-calls";
import { useQuery } from "@tanstack/react-query";
import { MetArtworkCard } from "./MetArtworkCard";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { MetDepartments } from "./MetDepartments";

export const MetArtwork = () => {

  const [searchParams, setSearchParams] = useSearchParams(); // Manage query params
 // Read query parameters for classification and page
//  const departmentId = searchParams.get("departmentId") || null;
 const currentPage = parseInt(searchParams.get("page") || 1, 10);

 const [departmentId, setDepartmentId] = useState(() => {
  const rawDepartmentId = searchParams.get("departmentId");
  return rawDepartmentId ? parseInt(rawDepartmentId, 10) : null;
});

 // Sync `departmentId` with searchParams when they change
 useEffect(() => {
  const rawDepartmentId = searchParams.get("departmentId");
  setDepartmentId(rawDepartmentId ? parseInt(rawDepartmentId, 10) : null);
}, [searchParams]); // Dependency array ensures this runs when searchParams change


  // const [departmentId, setDepartmentId] = useState(null); // Track the current page (starting at 1)

  // const [currentPage, setCurrentPage] = useState(1); // Track the current page (starting at 1)
  const itemsPerPage = 10; // Number of items per page

  const { data, isLoading, error } = useQuery({
    queryKey: ["met-artworks", departmentId], 
    queryFn: () => fetchMetArtwork(departmentId),
  });
  
   // Calculate the start and end indices for slicing
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;


  
  // Extract the subset of objectIDs for the current page
  const currentObjectIDs = data?.objectIDs ? data.objectIDs.slice(startIndex, endIndex) : [];

  // Calculate the total number of pages
  const totalPages = data?.objectIDs ? Math.ceil(data.objectIDs.length / itemsPerPage) : 0;



  const handleNext = () => {
    if (currentPage < totalPages) {
      setSearchParams({
        departmentId,
        page: currentPage + 1,
      }); // Move to the next page
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setSearchParams({
        departmentId,
        page: currentPage - 1,
      }); // Move to the previous page
    }
  };

  return (
    <div className="container">
      {isLoading && <p>Loading artworks...</p>}
      {error && <p>Error fetching artworks: {error.message}</p>}
      {data && data.objectIDs && (
        <>
          <Link to="/">Home</Link>
          <h1>Metropolitan Museum of Art</h1>
          <div className="content-wrapper">
            {/* Left Sidebar for Departments */}
            <aside className="departments-sidebar">
              <MetDepartments />
            </aside>
  
            {/* Main Content */}
            <main className="artworks-content">
              <div className="artwork-list">
                {/* Loop through the objectIDs and fetch artwork details */}
                {currentObjectIDs.map((id) => (
                  <MetArtworkCard key={id} id={id} />
                ))}
              </div>
  
              {/* Pagination Controls */}
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
            </main>
          </div>
        </>
      )}
    </div>
  );
};
