import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMetArtworkDetails } from "../utils/met-api-calls";
import NoImagePlaceholder from "../assets/No-Image-Placeholder.svg";
import { Link, useSearchParams, useLocation } from "react-router-dom";

export const MetArtworkDetails = () => {
  const { objectID } = useParams();
  const [searchParams] = useSearchParams();
  const exhibitionId = searchParams.get("exhibitionId") || null;
  const { search } = useLocation();


  const { data, isLoading, error } = useQuery({
    queryKey: ["artwork-details", objectID],
    queryFn: () => fetchMetArtworkDetails(objectID),
  });

  if (isLoading) return <p>Loading artwork details...</p>;
  if (error) return <p>Error fetching artwork details: {error.message}</p>;

  const imageUrl =
    data.primaryImage || data.primaryImageSmall || NoImagePlaceholder;

  return (
    <article className="artwork-details-container">
      <Link to={{pathname:`/curate/${exhibitionId}`,
        search: `${search}`}}>Back to collection</Link>
      <h1 className="artwork-title">{data.title}</h1>
      <section className="artwork-image-container">
        <img
          src={imageUrl}
          alt={data.title || "No title available"}
          className="artwork-image"
        />
      </section>
      <section className="artwork-info">
        <p>
          <strong>Artist:</strong> {data.artistDisplayName || "Unknown"}
        </p>
        <p>
          <strong>Department:</strong> {data.department || "Not specified"}
        </p>
        <p>
          <strong>Culture:</strong> {data.culture || "Not specified"}
        </p>
        <p>
          <strong>Object Date:</strong> {data.objectDate || "Not specified"}
        </p>
        <p>
          <strong>Medium:</strong> {data.medium || "Not specified"}
        </p>
        <p>
          <strong>Dimensions:</strong> {data.dimensions || "Not specified"}
        </p>
        {data.objectURL && (
          <p>
            <strong>More Info:</strong>{" "}
            <a href={data.objectURL} target="_blank" rel="noopener noreferrer">
              View on The Met Website
            </a>
          </p>
        )}
      </section>
    </article>
  );
};
