import NoImagePlaceholder from "../assets/No-Image-Placeholder.svg";
import { removeArtworkFromExhibition } from "../utils/local-storage-calls";
import { toast } from "react-toastify";

export const CuratePreview = ({artwork, setArtwork, exhibition}) => {

    const handleRemove = (artworkId) => {
      removeArtworkFromExhibition(exhibition.id, artworkId);
      setArtwork((prevExhibition) => {
        if (!prevExhibition) return prevExhibition;
  
        const updatedArtworks = prevExhibition.filter((art) => {
          const currentArtworkId = art.objectID || art.objectid;
  
          return String(currentArtworkId) !== String(artworkId);
        });
  
        // const updatedExhibition = {
        //   ...prevExhibition,
        //   artworks: updatedArtworks,
        // };
        return updatedArtworks;
      });
      toast.success("Art successfully removed!");
    };


    const regex = /^\[.*\]$/;
    

    return (<div className="exhibition-preview-container">

    {artwork.map((artwork, index) => {
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
              <img src={imageUrl} alt={title} />
              <div>
              <p>{title}</p>
              <button className="delete-button-cp" onClick={() => handleRemove(normalizedId)}>x</button>
              </div>
            </div>
          )
    })}
    
    </div>)
}