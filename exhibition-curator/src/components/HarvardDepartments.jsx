import { useQuery } from "@tanstack/react-query";
import { fetchHarvardClassifications } from "../utils/harvard-api-calls";
import { useSearchParams } from "react-router-dom";


export const HarvardDepartments = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch classifications
  const { data, isLoading, error } = useQuery({
    queryKey: ["harvard-classifications"],
    queryFn: fetchHarvardClassifications,
  });

  const handleClassification = (classification) => {
    setSearchParams({ classification, page: 1 }); // Reset to page 1 for new classification

  }

  if (isLoading) return <p>Loading classifications...</p>;
  if (error) return <p>Error fetching classifications: {error.message}</p>;

  return (
    <div className="departments-sidebar">
      {data?.records.map((classification) => (
        <button
          key={classification.id} // Ensure unique keys
          onClick={() => handleClassification(classification.name)} // Pass classification name to parent
        >
          {classification.name}
        </button>
      ))}
    </div>
  );
};
