import axios from "axios";

const metApi = axios.create({
    baseURL: "https://collectionapi.metmuseum.org/public/collection/v1"
});

export const fetchMetArtwork = (departmentId) => {
  const params = departmentId ? { departmentIds: departmentId } : {};

    return metApi
      .get("/objects", { params }) // Fetch the list of objectIDs
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

export const fetchMetDepartments = () => {
  return metApi
          .get(`/departments`)
          .then((response) => {
            return response.data
          })
}

