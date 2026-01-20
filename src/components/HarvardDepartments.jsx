import { useQuery } from "@tanstack/react-query";
import { fetchHarvardClassifications } from "../utils/harvard-api-calls";
import { useSearchParams } from "react-router-dom";

export const HarvardDepartments = ({
  setDepartment,
  setIsSidebarOpen,
  isSidebarOpen,
}) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["harvard-classifications"],
    queryFn: fetchHarvardClassifications,
  });

  const handleClassification = (classification) => {
    const classificationId = classification.id;

    if (classification.name == "(not assigned)") {
      setDepartment("");
      setSearchParams({ page: 1 });
    } else {
      setSearchParams({ classificationId, page: 1 }); // Reset to page 1 for new classification
      setDepartment(classification.name);
    }

    setIsSidebarOpen((prev) => !prev);
  };

  data?.records.sort((a, b) => a.name.localeCompare(b.name));



  if (isLoading) return <p>Loading classifications...</p>;
  if (error) return <p>Error fetching classifications: {error.message}</p>;

  return (
    <nav className={`departments-sidebar ${isSidebarOpen ? "open" : ""}`}>
      <h3>Departments</h3>
      <section className={"dpmt-button-container-harv"}>
        {data?.records.map((classification) => {
          return (
            <button
              key={classification.id}
              onClick={() => handleClassification(classification)}
            >
              {classification.name == "(not assigned)"
                ? "All"
                : classification.name}
            </button>
          );
        })}
      </section>
    </nav>
  );
};
