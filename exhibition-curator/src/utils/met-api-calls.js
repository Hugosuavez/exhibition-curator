import axios from "axios";

const metApi = axios.create({
    baseURL: "https://collectionapi.metmuseum.org/public/collection/v1"
});

export const fetchMetArtwork = () => {
    return metApi
      .get("/objects") // Fetch the full list of objectIDs
      .then((response) => response.data) // Return the data
      .catch((error) => {
        console.error("Error fetching MET artworks:", error);
        throw error;
      });
  };

export const fetchMetArtworkDetails = (id) => {
    return metApi
    .get(`/objects/${id}`)
    .then((response) => {
        return response.data
    })
}

