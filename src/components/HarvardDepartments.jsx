import { useQuery } from "@tanstack/react-query";
import { fetchHarvardClassifications } from "../utils/harvard-api-calls";
import { useSearchParams } from "react-router-dom";

export const HarvardDepartments = ({ setDepartment, setIsSidebarOpen }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch classifications
  const { data, isLoading, error } = useQuery({
    queryKey: ["harvard-classifications"],
    queryFn: fetchHarvardClassifications,
  });
 
  const handleClassification = (classification) => {
    const classificationId = classification.id;
    setSearchParams({ classificationId, page: 1 }); // Reset to page 1 for new classification
    classification.name == "(not assigned)"
      ? setDepartment("")
      : setDepartment(classification.name);
    setIsSidebarOpen((prev) => !prev);
  };

  if (isLoading) return <p>Loading classifications...</p>;
  if (error) return <p>Error fetching classifications: {error.message}</p>;

  return (
    <section>
      {data?.records.map((classification) => {
        return (<button
          key={classification.id} // Ensure unique keys
          onClick={() => handleClassification(classification)} // Pass classification name to parent
        >
          {classification.name == "(not assigned)"
            ? "All"
            : classification.name}
        </button>
      )})}
    </section>
  );
};
