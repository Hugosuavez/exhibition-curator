import { fetchMetDepartments } from "../utils/met-api-calls";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const MetDepartments = ({ setDepartment, setIsSidebarOpen, isSidebarOpen, exhibitionId }) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["met-departments"],
    queryFn: () => fetchMetDepartments(),
  });


  const handleDepartment = (department) => {
    if (!department) return;


    if (department === "all") {
      setDepartment("")
      setSearchParams(prevParams => {
        prevParams.set("page", 1);
        return prevParams;
      });
      // setSearchParams({ page: 1, exhibitionId })
    } else {
      const departmentId = department.departmentId;
      setSearchParams(prevParams => {
        prevParams.set("page", 1);
        prevParams.set("departmentId", departmentId);
        return prevParams;
      });
      // setSearchParams({
      //   departmentId,
      //   page: 1,
      //   exhibitionId
      // });
    }
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <aside className={`departments-sidebar ${isSidebarOpen ? "open" : ""}`}>
      <h3>Departments</h3>
      {isLoading && <p>Loading departments...</p>}
      {error && <p>Error fetching departments</p>}
      <section className={"dpmt-button-container-met"}>
        <button key={"all"} onClick={() => handleDepartment("all")}>
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
