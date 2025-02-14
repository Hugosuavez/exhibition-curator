import { useState } from "react";
import Modal from "./Modal";
import {
  getExhibitions,
  createExhibition,
  addArtworkToExhibition,
} from "../utils/local-storage-calls";

export const AddArtModal = ({ isOpen, artwork, setErrorMessage, errorMessage, setIsModalOpen }) => {
  const [exhibitions, setExhibitions] = useState(getExhibitions());
  const [newExhibitionName, setNewExhibitionName] = useState("");
  const [selectedExhibition, setSelectedExhibition] = useState("");

  const onClose = () => {
    setErrorMessage("");
    setIsModalOpen(false);
  }

  const handleCreateExhibition = () => {
    if (newExhibitionName.trim() === "") {
      setErrorMessage("Please enter a name for the exhibition."); // Set error
      return;
    }
    const newExhibition = createExhibition(newExhibitionName);
    setExhibitions([...exhibitions, newExhibition]);
    setNewExhibitionName("");
    setErrorMessage(""); // Clear error after successful creation
  };



  const handleAddToExhibition = () => {

    if (!selectedExhibition) return;

    const parsedExhibition = JSON.parse(selectedExhibition);

   
    // console.log(foundMetArt, 'before')
    const foundMetArt = parsedExhibition.artworks.find(
      (art) => art.objectID !== undefined && art.objectID === artwork.objectID
    );
   
    const foundHarvardArt = parsedExhibition.artworks.find(
      (art) => art.objectid !== undefined && art.objectid === artwork.objectid
    );
    
    if (foundMetArt || foundHarvardArt) {
      setErrorMessage("Selected artwork already added to exhibition");
      return;
    }
    
    addArtworkToExhibition(parsedExhibition.id, artwork);
    
    // 🔥 Fetch the updated exhibitions list from local storage
    setExhibitions(getExhibitions());
    
    onClose(); // Close modal after adding
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Add Artwork to Exhibition</h2>
      <h3>Select an Existing Exhibition</h3>
      <select
        onChange={(e) => setSelectedExhibition(e.target.value)}
        value={selectedExhibition}
      >
        <option value="">-- Select Exhibition --</option>
        {exhibitions.map((exhibition) => (
          <option key={exhibition.id} value={JSON.stringify(exhibition)}>
            {exhibition.name}
          </option>
        ))}
      </select>
      <button onClick={handleAddToExhibition} disabled={!selectedExhibition}>
        Add to Exhibition
      </button>
      <p>OR</p>
      <h3>Create New Exhibition</h3>
      <input
        type="text"
        placeholder="Exhibition Name"
        value={newExhibitionName}
        onChange={(e) => {
          setNewExhibitionName(e.target.value);
          setErrorMessage(""); // Clear error when user types
        }}
        required
      />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
      {/* Display error message */}
      <button onClick={handleCreateExhibition}>Create</button>
    </Modal>
  );
};
