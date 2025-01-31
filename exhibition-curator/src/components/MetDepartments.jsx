import { fetchMetDepartments } from "../utils/met-api-calls";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const MetDepartments = ({setDepartmentId, setCurrentPage}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  
  const { data, isLoading, error } = useQuery({
    queryKey: ["met-departments"],
    queryFn: () => fetchMetDepartments(),
  });


  const handleDepartment = (departmentId) => {
    setSearchParams({ departmentId, page: 1 }); // Reset to page 1 for new classification

    // setDepartmentId(departmentId)
    // setCurrentPage(1)
  }


  return (
    <>
    <h3>Departments</h3>
      {isLoading && <p>Loading departments...</p>}
      {error && <p>Error fetching departments</p>}
      {data?.departments && (data.departments.map((department) => (
            <button
            key={department.departmentId} // Add a unique key for each button
            onClick={() => handleDepartment(department.departmentId)} // Pass the department name to the handler
          >
            {department.displayName} {/* Display the department name */}
          </button>
        ))
        )}
        

    </>
  );
};
