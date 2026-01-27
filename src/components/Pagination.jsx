import { useSearchParams } from "react-router-dom";

export const Pagination = ({
  currentPage,
  totalPages,
  departmentId,
  classification,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const exhibitionId = searchParams.get("exhibitionId") || null;

  const updatePage = (newPage) => {
    const params = {exhibitionId};
    if (departmentId) {
      params.departmentId = departmentId;
      params.department = searchParams.get("department") || null;
    }
    if (classification) params.classificationId = classification;
    params.page = newPage;
    setSearchParams(params);
  };

  const handleNext = () => {
    if (currentPage < totalPages) updatePage(currentPage + 1);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handlePrev = () => {
    if (currentPage > 1) updatePage(currentPage - 1);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleFirst = () => {
    if (currentPage > 1) updatePage(1);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleLast = () => {
    if (currentPage < totalPages) updatePage(totalPages);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
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
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
      <button onClick={handleLast} disabled={currentPage === totalPages}>
        Last &raquo;
      </button>
    </section>
  );
};
