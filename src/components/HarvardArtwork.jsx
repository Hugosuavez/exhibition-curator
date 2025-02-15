import { useQuery } from "@tanstack/react-query";
import { fetchHarvardArtwork } from "../utils/harvard-api-calls";
import { Link, useSearchParams } from "react-router-dom";
import { HarvardDepartments } from "./HarvardDepartments";
import { useState } from "react";
import { AddArtModal } from "./AddArtModal";
import { HarvardArtworkCard } from "./HarvardArtworkCard";
import { Pagination } from "./Pagination";

export const HarvardArtwork = () => {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [department, setDepartment] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams(); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const classification = searchParams.get("classificationId") || null;
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
        <section className="content-wrapper">
        <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
          {isSidebarOpen ? "Close Departments" : "Search Departments"}
        </button>
          {/* Sidebar for departments */}
            <HarvardDepartments
              setDepartment={setDepartment}
              setIsSidebarOpen={setIsSidebarOpen}
              isSidebarOpen={isSidebarOpen}
            />
          <main className="artworks-content">
            {department && <h3>{department}</h3>}
            {isLoading && <p>Loading artworks...</p>}
            {error && <p>Error fetching artworks</p>}
            {data?.records && (
              <article className="artwork-content">
                {data.records.map((record) => {
                  return (
                    <HarvardArtworkCard
                      setIsModalOpen={setIsModalOpen}
                      setSelectedArtwork={setSelectedArtwork}
                      record={record}
                      key={record.objectid}
                    />
                  );
                })}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  classification={classification}
                />
                <AddArtModal
                  isOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  artwork={selectedArtwork}
                  setErrorMessage={setErrorMessage}
                  errorMessage={errorMessage}
                />
              </article>
            )}
          </main>
        </section>
      </main>
    </>
  );
};
