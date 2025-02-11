import { fetchMetArtwork } from "../utils/met-api-calls";
import { useQuery } from "@tanstack/react-query";
import { MetArtworkCard } from "./MetArtworkCard";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { MetDepartments } from "./MetDepartments";
import { AddArtModal } from "./AddArtModal";

export const MetArtwork = () => {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [department, setDepartment] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || 1, 10);
  const [errorMessage, setErrorMessage] = useState(""); // Error state

  const [departmentId, setDepartmentId] = useState(() => {
    const rawDepartmentId = searchParams.get("departmentId");
return rawDepartmentId && !isNaN(rawDepartmentId) ? parseInt(rawDepartmentId, 10) : null; 
 });

  const openModal = (artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  // Sync `departmentId` with searchParams when they change
  useEffect(() => {
    const rawDepartmentId = searchParams.get("departmentId");
    setDepartmentId(rawDepartmentId && !isNaN(rawDepartmentId) ? parseInt(rawDepartmentId, 10) : null);  }, [searchParams]); // Dependency array ensures this runs when searchParams change

  const itemsPerPage = 10; // Number of items per page

  const { data, isLoading, error } = useQuery({
    queryKey: ["met-artworks", departmentId],
    queryFn: () => fetchMetArtwork(departmentId),
  });

  // Calculate the start and end indices for slicing
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Extract the subset of objectIDs for the current page
  const currentObjectIDs = data?.objectIDs
    ? data.objectIDs.slice(startIndex, endIndex)
    : [];

  // Calculate the total number of pages
  const totalPages = data?.objectIDs
    ? Math.ceil(data.objectIDs.length / itemsPerPage)
    : 0;

  const handleNext = () => {
    if (currentPage < totalPages) {
      if(departmentId){
      setSearchParams({
        departmentId,
        page: currentPage + 1,
      });} else {
        setSearchParams({
          page: currentPage + 1,
        });
      }
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      if(departmentId){
    setSearchParams({
          departmentId,
          page: currentPage - 1,
        }); 
      } else {
        setSearchParams({
          page: currentPage - 1,
        }); 
      }
    }
  };

  const handleFirst = () => {
    if (currentPage > 1) {
      if(departmentId){
    setSearchParams({
          departmentId,
          page: 1,
        }); 
      } else {
        setSearchParams({
          page: 1,
        }); 
      }
    }
  }

  const handleLast = () => {
    if (currentPage < totalPages) {
      if(departmentId){
    setSearchParams({
          departmentId,
          page: totalPages,
        }); 
      } else {
        setSearchParams({
          page: totalPages,
        }); 
      }
    }
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar open/closed
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <main className="container">
      {isLoading && <p>Loading artworks...</p>}
      {error && <p>Error fetching artworks: {error.message}</p>}
      {data && data.objectIDs && (
        <>
          <Link to="/">Home</Link>
          <h1>Metropolitan Museum of Art</h1>
          {/* Sidebar Toggle Button */}
          <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? "Close Departments" : "Search Departments"}
          </button>
          <section className="content-wrapper">
            {/* Left Sidebar for Departments */}
            <aside
              className={`departments-sidebar ${isSidebarOpen ? "open" : ""}`}
            >
              <MetDepartments
                setDepartment={setDepartment}
                setIsSidebarOpen={setIsSidebarOpen}
              />
            </aside>

            {/* Main Content */}
            <main className="artworks-content">
              {department && <h3>{department}</h3>}
              {/* Loop through the objectIDs and fetch artwork details */}
              {currentObjectIDs.map((id) => (
                <MetArtworkCard key={id} id={id} openModal={openModal} />
              ))}

              {/* Pagination Controls */}
              <section className="pagination-controls">
                <button onClick={handleFirst} disabled={currentPage === 1}>
                    &laquo; First
                </button>
                <button onClick={handlePrev} disabled={currentPage === 1}>
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
                <button onClick={handleLast} disabled={currentPage === totalPages}>
                Last &raquo;
                </button>
              </section>
              {/* Modal */}
              <AddArtModal
                isOpen={isModalOpen}
                onClose={() => {
                  setErrorMessage(""); // Clear error after successful creation
                  setIsModalOpen(false)}}
                artwork={selectedArtwork}
                setErrorMessage={setErrorMessage}
                errorMessage={errorMessage}
              />
            </main>
          </section>
        </>
      )}
    </main>
  );
};
