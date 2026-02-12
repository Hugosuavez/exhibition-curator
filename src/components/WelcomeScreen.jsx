import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createExhibition } from "../utils/local-storage-calls";
import ShinyText from './ShinyText';
import BlurText from "./BlurText";
import Squares from './Squares';
import LightRays from './LightRays';

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

    //     const handleAnimationComplete = () => {
    //   console.log('Animation completed!');
    // };


    return (
        <div className="welcome-screen-body">

            {/* <BlurText
                text="Isn't this so cool?!"
                delay={200}
                animateBy="letters"
                direction="top"
                //   onAnimationComplete={handleAnimationComplete}
                className="text-2xl mb-8"
            /> */}
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
                    {/* <LightRays
                        raysOrigin="top-center"
                        raysColor="#ffffff"
                        raysSpeed={1}
                        lightSpread={0.5}
                        rayLength={6}
                        followMouse={true}
                        mouseInfluence={0.1}
                        noiseAmount={1}
                        distortion={1}
                        className="custom-rays"
                        pulsating={true}
                        fadeDistance={1}
                        saturation={1}
                    /> */}
                </div>
                <div className="welcome-screen-container" >
                    {/* <header className="home-header"> */}
                    <h2> Welcome to
                        <span> ARCHI</span>
                        <span className="header-colour">VIST!</span>
                    </h2>
                    {/* <h2>Your very own exhibition curator</h2> */}
                    {/* </header> */}
                    {/* <img src="src\assets\fossil.jpg" alt="Fossil buried in the ground" className="welcome-screen-image" /> */}

                    {/* 
                    <ShinyText
                        text="Welcome to ARCHIVIST!"
                        speed={2}
                        delay={0}
                        color="#b5b5b5"
                        shineColor="#ffffff"
                        spread={120}
                        direction="left"
                        yoyo={false}
                        pauseOnHover={false}
                        disabled={false}
                    /> */}

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
                            // required
                            />
                            <button className="create-exhibition-button-welcome-screen" type="submit" onClick={handleCreateExhibition}>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}