const STORAGE_KEY = "userExhibitions";

// Get all exhibitions from local storage
export const getExhibitions = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const getExhibitionById = (exhibitionId) => {
  const exhibitions = JSON.parse(localStorage.getItem("exhibitions")) || [];
  return exhibitions.find((exh) => exh.id === exhibitionId) || null;
};

// Save exhibitions to local storage
export const saveExhibitions = (exhibitions) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(exhibitions));
};

// Create a new exhibition
export const createExhibition = (name) => {
  const exhibitions = getExhibitions();
  const newExhibition = { id: Date.now(), name, artworkIds: [] };
  saveExhibitions([...exhibitions, newExhibition]);
  return newExhibition;
};

// Add artwork to an exhibition
export const addArtworkToExhibition = (exhibitionId, artworkId) => {
  const exhibitions = getExhibitions();
  const updatedExhibitions = exhibitions.map((exhibition) =>
    exhibition.id === exhibitionId
      ? { ...exhibition, artworkIds: [...exhibition.artworkIds, artworkId] }
      : exhibition
  );
  saveExhibitions(updatedExhibitions);
};

// Remove artwork from an exhibition
export const removeArtworkFromExhibition = (exhibitionId, artworkId) => {
  const exhibitions = getExhibitions();
  const updatedExhibitions = exhibitions.map((exhibition) =>
    exhibition.id === exhibitionId
      ? {
          ...exhibition,
          artworkIds: exhibition.artworkIds.filter((id) => id !== artworkId),
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
