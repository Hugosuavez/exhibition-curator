import { fetchMetDepartments } from "../utils/met-api-calls";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const MetDepartments = ({setDepartmentId, setCurrentPage}) => {

  const handleDepartment = (departmentId) => {
    setDepartmentId(departmentId)
    setCurrentPage(1)
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["met-departments"],
    queryFn: () => fetchMetDepartments(),
  });
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
