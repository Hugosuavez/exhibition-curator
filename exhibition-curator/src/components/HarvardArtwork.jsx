import { useQuery } from "@tanstack/react-query";
import { fetchHarvardArtwork } from "../utils/harvard-api-calls";
import { Link, useNavigate,useSearchParams, useLocation } from "react-router-dom";
import { HarvardDepartments } from "./HarvardDepartments";


export const HarvardArtwork = () => {

  const [searchParams, setSearchParams] = useSearchParams(); // Manage query params
  const navigate = useNavigate();
  const location = useLocation();

 
  // Read query parameters for classification and page
  const classification = searchParams.get("classification") || null;
  const currentPage = parseInt(searchParams.get("page") || 1, 10);

  // const currentUrl = searchParams.get("url") || null; // Read the API-provided URL if available
  console.log("carried back to list:", classification, currentPage);
  const { data, isLoading, error } = useQuery({
    queryKey: ["harvard-artworks", classification, currentPage],
    queryFn: () => fetchHarvardArtwork(classification, currentPage),
    keepPreviousData: true,
  });

  const itemsPerPage = 10; // Number of items per page
// Calculate the total number of pages
  const totalPages = data?.info ? Math.ceil(data.info.totalrecords / itemsPerPage) : 0;


 // Update query parameters for next/prev navigation
 const handleNext = () => {
  if (data?.info?.next) {
    console.log(data.info.next)
    setSearchParams({
      classification,
      page: currentPage + 1,
    });
  }
};

const handlePrev = () => {
  if (data?.info?.prev) {
    setSearchParams({
      classification,
      page: currentPage - 1,
    });
  }
};


  const handleDetailsClick = (artwork) => {
    navigate(`/harvard-artwork-details/${artwork.objectid}?${searchParams.toString()}`);
  };


  return (
    <>
      <div className="container">
        <Link to="/">Home</Link>
        <h1>Harvard Artworks</h1>
        <div className="content-wrapper">
        {/* Sidebar for departments */}
        <aside className="departments-sidebar">
          <HarvardDepartments />
        </aside>
        <main className="artworks-content">
        {isLoading && <p>Loading artworks...</p>}
        {error && <p>Error fetching artworks</p>}
        {data?.records && (
          <div>
            <ul>
              {data.records.map((record) => (
                <li key={record.objectid}>
                  <>
                    <article className="artwork-card">
                      <h2>{record.title || "Untitled"}</h2>
                      <p>
                        {record.century || "Unknown Artist"} |{" "}
                        {record.department || "Unknown Department"} |{" "}
                        {record.culture || "Unknown Nationality"}
                      </p>
                      <button onClick={() => handleDetailsClick(record)}>
                      View Details
                      </button>
                    </article>
                  </>
                </li>
              ))}
            </ul>
            <div className="pagination-controls">
              <button onClick={handlePrev} disabled={!data.info.prev}>
                Previous
              </button>
              <span>
                  Page {currentPage} of {totalPages}
                </span>
              <button onClick={handleNext} disabled={!data.info.next}>
                Next
              </button>
            </div>
          </div>
        )}
          </main>
        </div>
      </div>
    </>
  );
};
