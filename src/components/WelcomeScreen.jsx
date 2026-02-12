import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createExhibition } from "../utils/local-storage-calls";
import Squares from './Squares';

export const WelcomeScreen = () => {
    const [exhibitions, setExhibitions] = useState([]);
    const navigate = useNavigate();


     useEffect(() => {
        const storedExhibitions =
          JSON.parse(localStorage.getItem("userExhibitions")) || [];
        setExhibitions(storedExhibitions);
      }, []);

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
        <div className="welcome-screen-body">
            <div style={{ width: '100%', minHeight: '100vh', maxHeight: '100vh', position: 'relative' }}>
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                }}>

                    <Squares
                        speed={0.2}
                        squareSize={40}
                        direction='diagonal' // up, down, left, right, diagonal
                        borderColor='#ffffff10'
                        hoverFillColor='#8f1a1a'
                    />
                  
                </div>
                <div className="welcome-screen-container" >
                    
                    <h2> Welcome to
                        <span> ARCHI</span>
                        <span className="header-colour">VIST!</span>
                    </h2>
                    <form className="create-exhibition-form">
                        <p className="welcome-label"> To begin, enter the name of your first exhibition...</p>
                        <div className="create-exhibition-welcome-screen">
                            <input
                                className="exhibition-name-input-welcome-screen"
                                name="create-exhibition"
                                type="text"
                                id="create-exhibition"
                                placeholder="Exhibition Name"
                                value={newExhibitionName}
                                onChange={(e) => {
                                    setNewExhibitionName(e.target.value);
                                }}
                                maxLength={20}
                                required
                            />
                            <button className="create-exhibition-button-welcome-screen" type="submit" onClick={handleCreateExhibition}>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}