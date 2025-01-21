import axios from "axios";

const metApi = axios.create({
    baseURL: "https://collectionapi.metmuseum.org/public/collection/v1"
});

export const fetchArtwork = () => {
    return metApi
    .get("/objects")
    .then((response) => {
        return response.data;
    })
}

export const fetchArtworkDetails = (id) => {
    return metApi
    .get(`/objects/${id}`)
    .then((response) => {
        return response.data
    })
}