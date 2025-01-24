import axios from "axios";


const API_KEY = import.meta.env.VITE_HARVARD_API_KEY


const harvardApi = axios.create({
    baseURL: 'https://api.harvardartmuseums.org'
  });


  export const fetchHarvardArtwork = (classification = null, page = 1) => {
    // Use the provided URL or default to the "/object" endpoint
    const requestUrl = "/object";
    
    return harvardApi
      .get(requestUrl, {
        params: {
              apikey: import.meta.env.VITE_HARVARD_API_KEY, // API key
              size: 10, // Limit the number of results
              hasimage: 1, // Ensure only results with images
              ...(classification && { classification }), // Add classification filter if provided
              page: page
            },
      })
      .then((response) => {
        return response.data; // Return the API response data
      })
      .catch((error) => {
        console.error("Error fetching artworks:", error);
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

  export const fetchHarvardClassifications = () => {
    return harvardApi
      .get(`/classification`, {
        params: {
          apikey: import.meta.env.VITE_HARVARD_API_KEY, // Use your API key
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error("Error fetching Harvard classifications:", error);
        throw error;
      });
  };