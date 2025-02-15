import { fetchMetArtwork } from "../utils/met-api-calls";
import { useQuery } from "@tanstack/react-query";
import { MetArtworkCard } from "./MetArtworkCard";
import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { MetDepartments } from "./MetDepartments";
import { AddArtModal } from "./AddArtModal";
import { Pagination } from "./Pagination";

export const MetArtwork = () => {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const [errorMessage, setErrorMessage] = useState("");

  const departmentId = searchParams.get("departmentId") || null;
  const department = searchParams.get("department") || null;
  const currentPage = parseInt(searchParams.get("page") || 1, 10);

  const openModal = (artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["met-artworks", departmentId],
    queryFn: () => fetchMetArtwork(departmentId),
  });
  
  const itemsPerPage = 10; // Number of items per page

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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar open/closed
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (<>
      {isLoading && <p>Loading artworks...</p>}
      {error && <p>Error fetching artworks: {error.message}</p>}
      {data && data.objectIDs && (
        <main className="container">
          <Link to="/">Home</Link>
          <h1>Metropolitan Museum of Art</h1>
          {/* Sidebar Toggle Button */}
          <section className="content-wrapper">
          <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? "Close Departments" : "Search Departments"}
          </button>
            {/* Left Sidebar for Departments */}
            {/* <aside
              // className={`departments-sidebar ${isSidebarOpen ? "open" : ""}`}
            > */}
              <MetDepartments
                // setDepartment={setDepartment}
                setIsSidebarOpen={setIsSidebarOpen}
                isSidebarOpen={isSidebarOpen}
              />
            {/* </aside> */}

            {/* Main Content */}
            <main className="artworks-content">
              {department && <h3>{department}</h3>}
              {/* Loop through the objectIDs and fetch artwork details */}
              {currentObjectIDs.map((id) => (
                <MetArtworkCard key={id} id={id} openModal={openModal} />
              ))}

              {/* Pagination Controls */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                departmentId={departmentId}
              />

              {/* Modal */}
              <AddArtModal
                isOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                artwork={selectedArtwork}
                setErrorMessage={setErrorMessage}
                errorMessage={errorMessage}
              />
            </main>
          </section>
        
          </main>
      )}
  </>
  );
};
