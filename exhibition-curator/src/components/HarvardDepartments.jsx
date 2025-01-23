import { useQuery } from "@tanstack/react-query";
import { fetchHarvardClassifications } from "../utils/harvard-api-calls";

export const HarvardDepartments = ({ onClassificationSelect }) => {
  // Fetch classifications
  const { data, isLoading, error } = useQuery({
    queryKey: ["harvard-classifications"],
    queryFn: fetchHarvardClassifications,
  });

  if (isLoading) return <p>Loading classifications...</p>;
  if (error) return <p>Error fetching classifications: {error.message}</p>;

  return (
    <div className="departments-sidebar">
      {data?.records.map((classification) => (
        <button
          key={classification.id} // Ensure unique keys
          onClick={() => onClassificationSelect(classification.name)} // Pass classification name to parent
        >
          {classification.name}
        </button>
      ))}
    </div>
  );
};
