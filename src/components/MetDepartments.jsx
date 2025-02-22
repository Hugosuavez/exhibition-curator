import { fetchMetDepartments } from "../utils/met-api-calls";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useNavigate } from "react-router-dom";

export const MetDepartments = ({ setIsSidebarOpen, isSidebarOpen }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["met-departments"],
    queryFn: () => fetchMetDepartments(),
  });

  const handleAll = () => {
    setSearchParams({ page: 1 });
    setIsSidebarOpen((prev) => !prev);
    navigate("/met");
  };

  const handleDepartment = (department) => {
    if (!department) return;
    const departmentId = department.departmentId;
    setSearchParams({
      departmentId,
      page: 1,
      department: department.displayName,
    }); // Reset to page 1 for new classification
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <aside className={`departments-sidebar ${isSidebarOpen ? "open" : ""}`}>
      <h3>Departments</h3>
      {isLoading && <p>Loading departments...</p>}
      {error && <p>Error fetching departments</p>}
      <section className={"dpmt-button-container"}>
        <button key={"all"} onClick={() => handleAll()}>
          All
        </button>
        {data?.departments &&
          data.departments.map((department) => (
            <button
              key={department.departmentId}
              onClick={() => handleDepartment(department)}
            >
              {department.displayName}
            </button>
          ))}
      </section>
    </aside>
  );
};
