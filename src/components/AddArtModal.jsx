import { useState } from "react";
import Modal from "./Modal";
import {
  getExhibitions,
  createExhibition,
  addArtworkToExhibition,
} from "../utils/local-storage-calls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


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

    const exhibitionFound = exhibitions.find((exh) => exh.name === newExhibitionName)
    if(exhibitionFound){
      setErrorMessage("Exhibition name taken!")
      return;
    }
    const newExhibition = createExhibition(newExhibitionName);
    
    setExhibitions([...exhibitions, newExhibition]);
    toast.success("Exhibition added successfully!");

    setNewExhibitionName("");
    setErrorMessage(""); // Clear error after successful creation
  };



  const handleAddToExhibition = () => {

    if (!selectedExhibition) return;

    const parsedExhibition = JSON.parse(selectedExhibition);

   
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
    toast.success("Artwork added successfully!");
    onClose(); // Close modal after adding
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Add Artwork to Exhibition</h2>
      <h3>Select an Existing Exhibition</h3>
      <div className="modal-select-container">
      <select
        onChange={(e) => setSelectedExhibition(e.target.value)}
        value={selectedExhibition}
        className="modal-select"
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
      </div>
      
        <p>OR</p>
      <h3>Create New Exhibition</h3>
      
     
      <div className="modal-select-container">
      <input
        className="modal-select"
        type="text"
        placeholder="Exhibition Name"
        value={newExhibitionName}
        onChange={(e) => {
          setNewExhibitionName(e.target.value);
          setErrorMessage(""); // Clear error when user types
        }}
        maxLength={20}
        required
      />

      {/* Display error message */}
      <button onClick={handleCreateExhibition}>Create</button>
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
    </Modal>
  );
};
