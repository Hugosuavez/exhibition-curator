import axios from "axios";


const API_KEY = import.meta.env.VITE_HARVARD_API_KEY


const harvardApi = axios.create({
    baseURL: 'https://api.harvardartmuseums.org'
  });


  export const fetchHarvardArtwork = (url = null) => {

    const requestUrl = url || "/object";

    return harvardApi
      .get(requestUrl, {
        params: url ? undefined : {
          apikey: import.meta.env.VITE_HARVARD_API_KEY, // API key in query params
          size: 10, // Limit the number of results
        },
      })
      .then((response) => {
        return response.data; // Return the API response data
      })
      .catch((error) => {
        console.error('Error fetching artworks:', error);
        throw error; // Rethrow the error so it can be handled by the caller
      });
  };

  export const fetchHarvardArtworkDetails = (id) => {
    return harvardApi
      .get(`/object/${id}`, {
        params: {
          apikey: import.meta.env.VITE_HARVARD_API_KEY, // Use your API key
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching Harvard artwork details:", error);
        throw error;
      });
  };
