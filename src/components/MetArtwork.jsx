import { fetchMetArtwork } from "../utils/met-api-calls";
import { useQuery } from "@tanstack/react-query";
import { MetArtworkCard } from "./MetArtworkCard";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { MetDepartments } from "./MetDepartments";
import { Pagination } from "./Pagination";
import { calculateTotalPages, retrievePageFromFullArray } from "../utils/pagination-utils";

export const MetArtwork = ({ artwork,
  setArtwork,
  exhibition }) => {

  const [searchParams] = useSearchParams();
  const [department, setDepartment] = useState(null);


  const departmentId = searchParams.get("departmentId") || null;
  // const department = searchParams.get("department") || null;
  const currentPage = parseInt(searchParams.get("page") || 1, 10);


  const { data, isLoading, error } = useQuery({
    queryKey: ["met-artworks", departmentId],
    queryFn: () => fetchMetArtwork(departmentId),
  });

  // NOTE: Trying without refetch
  // const { data, isLoading, error, refetch } = useQuery({
  //   queryKey: ["met-artworks", departmentId],
  //   queryFn: () => fetchMetArtwork(departmentId),
  // });

  // useEffect(() => {
  //   refetch();
  // }, [searchParams, refetch]);


  const currentObjectIDs = retrievePageFromFullArray(data, currentPage);
  // const itemsPerPage = 10;

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;

  // const sortedObjectIDs = [...(data?.objectIDs || [])].sort((a, b) => a - b);

  // const currentObjectIDs = sortedObjectIDs
  //   ? sortedObjectIDs.slice(startIndex, endIndex)
  //   : [];


  const totalPages = calculateTotalPages(data);
  // const totalPages = data?.objectIDs
  //   ? Math.ceil(data.objectIDs.length / 10)
  //   : 0;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      {isLoading && <p>Loading artwork...</p>}
      {error && <p>Error fetching artworks: {error.message}</p>}
      {data && data.objectIDs && (
        <main className="browse-page">
          {/* <Link to="/" className="link">
            Home
          </Link> */}


          {/* <section className="content-wrapper"> */}
          <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? "Close Departments" : "Search Departments"}
          </button>

          <MetDepartments
            setDepartment={setDepartment}
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
            exhibitionId={exhibition.id}
          />

          <main className="artworks-content">
            {department && <h3 className="department-title">{department}</h3>}
            {/* Loop through the objectIDs and fetch artwork details */}
            {currentObjectIDs.map((id) => (
              <MetArtworkCard key={id} id={id} artwork={artwork}
                setArtwork={setArtwork} exhibition={exhibition} />
            ))}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              departmentId={departmentId}
            />
          </main>
          {/* </section> */}
        </main>
      )}
    </>
  );
};
