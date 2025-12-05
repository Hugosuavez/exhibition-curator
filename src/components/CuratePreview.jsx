import NoImagePlaceholder from "../assets/No-Image-Placeholder.svg";
import { removeArtworkFromExhibition } from "../utils/local-storage-calls";


export const CuratePreview = ({artwork, exhibition}) => {
    
    const regex = /^\[.*\]$/;
    

    return (<div className="exhibition-preview-container">

    {artwork.map((artwork, index) => {
            const normalizedId = artwork.objectID || artwork.objectid
            console.log(normalizedId)
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

            return (<>
           
            <img src={imageUrl} alt={title} key={index} className="exhibit"/>
            </>
          )
    })}
    
    </div>)
}