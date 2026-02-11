import { useQuery } from "@tanstack/react-query";
import { fetchHarvardArtwork } from "../utils/harvard-api-calls";
import { useSearchParams } from "react-router-dom";
import { HarvardDepartments } from "./HarvardDepartments";
import { useState } from "react";

import { HarvardArtworkCard } from "./HarvardArtworkCard";
import { Pagination } from "./Pagination";

export const HarvardArtwork = ({setArtwork, artwork, exhibition}) => {

  
  const [department, setDepartment] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const classification = searchParams.get("classificationId") || null;
  const currentPage = parseInt(searchParams.get("page") || 1, 10);

  const { data, isLoading, error } = useQuery({
    queryKey: ["harvard-artworks", classification, currentPage],
    queryFn: () => fetchHarvardArtwork(classification, currentPage),
    keepPreviousData: true,
  });
 
  const itemsPerPage = 10;

  const totalPages = data?.info
    ? Math.ceil(data.info.totalrecords / itemsPerPage)
    : 0;

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <main className="browse-page">
       
          <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? "Close Departments" : "Search by Department"}
          </button>

          <HarvardDepartments
            setDepartment={setDepartment}
            setIsSidebarOpen={setIsSidebarOpen}
            isSidebarOpen={isSidebarOpen}
            exhibitionId={exhibition.id}
          />
          {isLoading && <p>Loading artwork...</p>}
          {error && <p>Error fetching artwork</p>}
          {data?.records && (
            <main className="artworks-content">
              {department && <h3 className="department-title">{department}</h3>}
              {data.records.map((record) => (
                <HarvardArtworkCard
                exhibition={exhibition}
                  setArtwork={setArtwork}
                  artwork={artwork}
                  record={record}
                  key={record.objectid}
                />
              ))}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                classification={classification}
              />
            </main>
          )}
        {/* </section> */}
      </main>
    </>
  );
};
