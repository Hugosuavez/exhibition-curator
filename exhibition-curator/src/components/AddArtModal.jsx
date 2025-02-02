import { useState } from "react";
import Modal from "./Modal";
import {
  getExhibitions,
  createExhibition,
  addArtworkToExhibition,
} from "../utils/local-storage-calls";

export const AddArtModal = ({ isOpen, onClose, artwork }) => {
  const [exhibitions, setExhibitions] = useState(getExhibitions());
  const [newExhibitionName, setNewExhibitionName] = useState("");
  const [selectedExhibition, setSelectedExhibition] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error state



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
    addArtworkToExhibition(Number(selectedExhibition), artwork);
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
          <option key={exhibition.id} value={exhibition.id}>
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
          setNewExhibitionName(e.target.value)
          setErrorMessage(""); // Clear error when user types
        }}
        required
      />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Display error message */}
      <button onClick={handleCreateExhibition}>Create</button>
    </Modal>
  );
};
