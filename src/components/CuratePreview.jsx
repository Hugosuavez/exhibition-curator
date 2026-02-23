import NoImagePlaceholder from "../assets/No-Image-Placeholder.svg";
import { removeArtworkFromExhibition } from "../utils/local-storage-calls";

export const CuratePreview = ({ artwork, setArtwork, exhibition }) => {

  const handleRemove = (artworkId) => {
    removeArtworkFromExhibition(exhibition.id, artworkId);
    setArtwork((prevExhibition) => {
      if (!prevExhibition) return prevExhibition;

      const updatedArtworks = prevExhibition.filter((art) => {
        const currentArtworkId = art.objectID || art.objectid;

        return String(currentArtworkId) !== String(artworkId);
      });

      return updatedArtworks;
    });
  };


  const regex = /^\[.*\]$/;

  return (<div className="exhibition-preview-container">
    {artwork.length > 0 ? artwork.map((artwork, index) => {
      const normalizedId = artwork.objectID || artwork.objectid

      const title = artwork.title
        ? regex.test(artwork.title)
          ? artwork.title.slice(1, -1)
          : artwork.title
        : "Untitled";

      const imageUrl =
        artwork.primaryImage ||
        artwork.primaryImageSmall ||
        artwork.primaryimageurl ||
        NoImagePlaceholder;

      return (
        <div key={index} className="exhibit">
          <button onClick={() => handleRemove(normalizedId)}>x</button>
          <img src={imageUrl} alt={title} />
          <p>{title}</p>
        </div>
      )
    }) : <p className="exhibit-default">Browse art and add it to your exhibition!</p>}

  </div>)
}