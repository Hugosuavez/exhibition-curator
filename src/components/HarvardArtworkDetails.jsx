import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchHarvardArtworkDetails } from "../utils/harvard-api-calls";
import NoImagePlaceholder from "../assets/No-Image-Placeholder.svg";
import { Link, useSearchParams } from "react-router-dom";

export const HarvardArtworkDetails = () => {
  const [searchParams] = useSearchParams();
  const { objectID } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["harvard-artwork-details", objectID],
    queryFn: () => fetchHarvardArtworkDetails(objectID),
  });

  if (isLoading) return <p>Loading artwork details...</p>;
  if (error) return <p>Error fetching artwork details: {error.message}</p>;

  const imageUrl = data?.primaryimageurl || NoImagePlaceholder;

  //Formatting titles for display by removing surrounding brackets []
  const regex = /^\[.*\]$/;
  const title = data.title
    ? regex.test(data.title)
      ? data.title.slice(1, -1)
      : data.title
    : "Untitled";

  return (
    <main className="artwork-details-container">
      <Link to={`/harvard?${searchParams.toString()}`}>Back to Collection</Link>
      <h1>{title}</h1>
      <section className="artwork-image-container">
        <img
          src={imageUrl}
          alt={data.title || "No title available"}
          className="artwork-image"
        />
      </section>
      <section className="artwork-info">
        <p>
          <strong>Accession Method:</strong> {data.accessionmethod || "Unknown"}
        </p>
        <p>
          <strong>Century:</strong> {data.century || "Unknown"}
        </p>
        <p>
          <strong>Classification:</strong>{" "}
          {data.classification || "Not classified"}
        </p>
        <p>
          <strong>Culture:</strong> {data.culture || "Unknown"}
        </p>
        <p>
          <strong>Period:</strong> {data.period || "Unknown"}
        </p>
        <p>
          <strong>Technique:</strong> {data.technique || "Unknown"}
        </p>
        <p>
          <strong>Medium:</strong> {data.medium || "Unknown"}
        </p>
        <p>
          <strong>Dimensions:</strong> {data.dimensions || "Not specified"}
        </p>
        <p>
          <strong>Department:</strong> {data.department || "Unknown Department"}
        </p>
        <p>
          <strong>Credit Line:</strong> {data.creditline || "Not available"}
        </p>
        <p>
          <strong>Description:</strong>{" "}
          {data.description || "No description provided"}
        </p>
        <p>
          <strong>Provenance:</strong> {data.provenance || "Not available"}
        </p>
        {data.url && (
          <p>
            <strong>More Info:</strong>{" "}
            <a href={data.url} target="_blank" rel="noopener noreferrer">
              View on Harvard Art Museums
            </a>
          </p>
        )}
      </section>
    </main>
  );
};
