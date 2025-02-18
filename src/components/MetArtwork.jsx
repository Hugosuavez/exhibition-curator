import { fetchMetArtwork } from "../utils/met-api-calls";
import { useQuery } from "@tanstack/react-query";
import { MetArtworkCard } from "./MetArtworkCard";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
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

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["met-artworks", departmentId, currentPage],
    queryFn: () => fetchMetArtwork(departmentId),
  });

  useEffect(() => {
    refetch();
  }, [searchParams, refetch]);

  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentObjectIDs = data?.objectIDs
    ? data.objectIDs.slice(startIndex, endIndex)
    : [];

  const totalPages = data?.objectIDs
    ? Math.ceil(data.objectIDs.length / itemsPerPage)
    : 0;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      {isLoading && <p>Loading artworks...</p>}
      {error && <p>Error fetching artworks: {error.message}</p>}
      {data && data.objectIDs && (
        <main className="container">
          <Link to="/" className="link">
            Home
          </Link>
          <h1>Metropolitan Museum of Art</h1>

          <section className="content-wrapper">
            <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
              {isSidebarOpen ? "Close Departments" : "Search Departments"}
            </button>

            <MetDepartments
              setIsSidebarOpen={setIsSidebarOpen}
              isSidebarOpen={isSidebarOpen}
            />

            <main className="artworks-content">
              {department && <h3>{department}</h3>}
              {/* Loop through the objectIDs and fetch artwork details */}
              {currentObjectIDs.map((id) => (
                <MetArtworkCard key={id} id={id} openModal={openModal} />
              ))}

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                departmentId={departmentId}
              />

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
