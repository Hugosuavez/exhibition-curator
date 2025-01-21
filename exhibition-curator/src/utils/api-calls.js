import axios from "axios";

const metApi = axios.create({
    baseURL: "https://collectionapi.metmuseum.org"
});

export const fetchArtwork = () => {
    return metApi
    .get("/public/collection/v1/objects")
    .then((response) => {
        return response.data;
    })
}