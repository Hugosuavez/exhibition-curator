const STORAGE_KEY = "userExhibitions";

// Get all exhibitions from local storage
export const getExhibitions = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getExhibitionById = (exhibitionId) => {
  const exhibitions = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return exhibitions.find((exh) => exh.id === exhibitionId) || null;
};

// Save exhibitions to local storage
export const saveExhibitions = (exhibitions) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(exhibitions));
};

// Create a new exhibition
export const createExhibition = (name) => {
  const exhibitions = getExhibitions();
  const newExhibition = { id: Date.now(), name, artworks: [] };
  saveExhibitions([...exhibitions, newExhibition]);
  return newExhibition;
};

// Add artwork to an exhibition
export const addArtworkToExhibition = (exhibitionId, artwork) => {
  const exhibitions = getExhibitions();
  const updatedExhibitions = exhibitions.map((exhibition) =>
    exhibition.id === exhibitionId
      ? { ...exhibition, artworks: [...exhibition.artworks, artwork] }
      : exhibition
  );
  saveExhibitions(updatedExhibitions);
};

export const removeArtworkFromExhibition = (exhibitionId, artworkId) => {
  const exhibitions = getExhibitions();

  const updatedExhibitions = exhibitions.map((exhibition) =>
    String(exhibition.id) === String(exhibitionId)
      ? {
          ...exhibition,
          artworks: exhibition.artworks.filter((artwork) => {
            const currentArtworkId = artwork.objectID || artwork.objectid;
            return String(currentArtworkId) !== String(artworkId); // Convert both to strings for comparison
          }),
        }
      : exhibition
  );

  saveExhibitions(updatedExhibitions);
};

// Delete an exhibition
export const deleteExhibition = (exhibitionId) => {
  const exhibitions = getExhibitions().filter((exhibition) => exhibition.id !== exhibitionId);
  saveExhibitions(exhibitions);
};
