import { useQuery } from "@tanstack/react-query";
import { fetchHarvardArtwork } from "../utils/harvard-api-calls";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { HarvardDepartments } from "./HarvardDepartments";
import { useState, useEffect } from "react";
import { AddArtModal } from "./AddArtModal";

export const HarvardArtwork = () => {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [department, setDepartment] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams(); // Manage query params
  const navigate = useNavigate();

  const [classification, setClassification] = useState(() => {
    const rawClassification = searchParams.get("classificationId");
    return rawClassification ? parseInt(rawClassification, 10) : null;
  });

  const openModal = (artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  // Sync `departmentId` with searchParams when they change
  useEffect(() => {
    const rawClassification = searchParams.get("classificationId");
    setClassification(
      rawClassification ? parseInt(rawClassification, 10) : null
    );
  }, [searchParams]); // Dependency array ensures this runs when searchParams change

  const currentPage = parseInt(searchParams.get("page") || 1, 10);

  const { data, isLoading, error } = useQuery({
    queryKey: ["harvard-artworks", classification, currentPage],
    queryFn: () => fetchHarvardArtwork(classification, currentPage),
    keepPreviousData: true,
  });

  const itemsPerPage = 10;

  // Calculate the total number of pages
  const totalPages = data?.info
    ? Math.ceil(data.info.totalrecords / itemsPerPage)
    : 0;

    const handleNext = () => {
      if (currentPage < totalPages) {
        if(classification){
        setSearchParams({
          classification,
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
        if(classification){
      setSearchParams({
        classification,
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
        if(classification){
      setSearchParams({
        classification,
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
        if(classification){
      setSearchParams({
        classification,
            page: totalPages,
          }); 
        } else {
          setSearchParams({
            page: totalPages,
          }); 
        }
      }
    }
  

  const handleDetailsClick = (artwork) => {
    navigate(
      `/harvard-artwork-details/${artwork.objectid}?${searchParams.toString()}`
    );
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar open/closed
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <>
      <main className="container">
        <Link to="/">Home</Link>
        <h1>Harvard Artworks</h1>
        {/* Sidebar Toggle Button */}
        <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
          {isSidebarOpen ? "Close Departments" : "Search Departments"}
        </button>
        <section className="content-wrapper">
          {/* Sidebar for departments */}
          <aside
            className={`departments-sidebar ${isSidebarOpen ? "open" : ""}`}
          >
            <HarvardDepartments
              setDepartment={setDepartment}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </aside>
          <main className="artworks-content">
            {department && <h3>{department}</h3>}
            {isLoading && <p>Loading artworks...</p>}
            {error && <p>Error fetching artworks</p>}
            {data?.records && (
              <article className="artwork-content">
                {data.records.map((record) => (
                  <li key={record.objectid} className="artwork-card">
                    <h2>{record.title || "Untitled"}</h2>
                    <p>
                      {record.century || "Unknown Artist"} |{" "}
                      {record.department || "Unknown Department"} |{" "}
                      {record.culture || "Unknown Nationality"}
                    </p>
                    <button onClick={() => openModal(record)}>
                      Add to Exhibition
                    </button>
                    <button onClick={() => handleDetailsClick(record)}>
                      View Details
                    </button>
                  </li>
                ))}
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
                  onClose={() => setIsModalOpen(false)}
                  artwork={selectedArtwork}
                />
              </article>
            )}
          </main>
        </section>
      </main>
    </>
  );
};
