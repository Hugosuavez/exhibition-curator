import NoImagePlaceholder from "../assets/No-Image-Placeholder.svg";


export const HarvardArtworkCard = ({record}) => {
        const imageUrl = record?.primaryimageurl || NoImagePlaceholder;
        const regex = /^\[.*\]$/;
        const title = regex.test(record.title) ? record.title.slice(1, -1) : record.title;
        console.log(title, 'formatted')
        console.log(record.title, 'unformatted')          
                  return (<li key={record.objectid} className="artwork-card">
                    <h2>{title || "Untitled"}</h2>
                    <img
          src={imageUrl}
          alt={record.title || "No title available"}
          className="artwork-image"
        />
                    <p>
                      {record.century || "Unknown Artist"} |{" "}
                      {record.department || "Unknown Department"} |{" "}
                      {record.culture || "Unknown Nationality"}
                    </p>
                    <button onClick={() => openModal(record)}>
                      Add to Exhibition
                    </button>
                    <button onClick={() => handleDetailsClick(record)}>
                      View Details
                    </button>
                  </li>
                )
}