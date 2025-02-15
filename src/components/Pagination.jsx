import { useSearchParams } from "react-router-dom";


export const Pagination = ({currentPage, totalPages, departmentId, classification}) => {
    
    const [searchParams, setSearchParams] = useSearchParams();
   
    const updatePage = (newPage) => {
        const params = {};
        if (departmentId) {
          params.departmentId = departmentId;
          params.department = searchParams.get("department") || null;
        }
        if(classification) params.classificationId = classification;
        params.page = newPage;
        setSearchParams(params);
      };

      const handleNext = () => {
        if (currentPage < totalPages) updatePage(currentPage + 1);
      };
      
      const handlePrev = () => {
        if (currentPage > 1) updatePage(currentPage - 1);
      };
      
      const handleFirst = () => {
        if (currentPage > 1) updatePage(1);
      }
    
      const handleLast = () => {
        if (currentPage < totalPages) updatePage(totalPages);
      }

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
      );
}