import { fetchMetDepartments } from "../utils/met-api-calls";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useNavigate } from "react-router-dom";

export const MetDepartments = ({ setDepartment, setIsSidebarOpen }) => {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["met-departments"],
    queryFn: () => fetchMetDepartments(),
  });

  const handleAll = () => {
    setDepartment("");
    setIsSidebarOpen((prev) => !prev);
    navigate("/met");
  };

  const handleDepartment = (department) => {
    if (!department) return;
    const departmentId = department.departmentId;
    setSearchParams({ departmentId, page: 1 }); // Reset to page 1 for new classification
    setDepartment(department.displayName);
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <h3>Departments</h3>
      {isLoading && <p>Loading departments...</p>}
      {error && <p>Error fetching departments</p>}
      <section>
        <button key={"all"} onClick={() => handleAll()}>
          All
        </button>
        {data?.departments &&
          data.departments.map((department) => (
            <button
              key={department.departmentId} // Add a unique key for each button
              onClick={() => handleDepartment(department)} // Pass the department name to the handler
            >
              {department.displayName} {/* Display the department name */}
            </button>
          ))}
      </section>
    </>
  );
};
