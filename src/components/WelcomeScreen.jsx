import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createExhibition } from "../utils/local-storage-calls";

export const WelcomeScreen = () => {
    const [exhibitions, setExhibitions] = useState([]);
    const navigate = useNavigate();

    const [newExhibitionName, setNewExhibitionName] = useState("");

    const handleCreateExhibition = () => {
        if (newExhibitionName.trim() === "") {
            toast.error("Please enter a name for exhibition")
            return;
        }

        const exhibitionFound = exhibitions.find(
            (exh) => exh.name === newExhibitionName
        );

        if (exhibitionFound) {
            toast.error("Exhibition name taken!")
            return;
        }

        const newExhibition = createExhibition(newExhibitionName);

        setExhibitions([...exhibitions, newExhibition]);
        // toast.success("Exhibition added successfully!");

        setNewExhibitionName("");
        navigate(`/curate/${newExhibition.id}`)
    };

    return (
        <form className="create-exhibition-container">
            <p>Welcome to ARCHIVIST! An exhibition curation platform allowing you to browse museums pieces and create your own exhibitions! To begin, enter the name of your first exhibition...</p>
            <input
                className="exhibition-name-input"
                type="text"
                id="create-exhibition"
                placeholder="Exhibition Name"
                value={newExhibitionName}
                onChange={(e) => {
                    setNewExhibitionName(e.target.value);
                }}
                maxLength={20}
            // required
            />
            <button type="submit" onClick={handleCreateExhibition}>Create</button>
        </form>
    )
}