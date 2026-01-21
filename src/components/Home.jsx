import { useState, useEffect } from "react";
import { ExhibitionCarousel } from "./ExhibitionCarousel";
import { deleteExhibition } from "../utils/local-storage-calls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createExhibition } from "../utils/local-storage-calls";

export const Home = () => {
  const [exhibitions, setExhibitions] = useState([]);
  // const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const storedExhibitions =
      JSON.parse(localStorage.getItem("userExhibitions")) || [];
    setExhibitions(storedExhibitions);

    // updateSlidesPerView(storedExhibitions.length);
  }, []);

  // useEffect(() => {
  //   const handleResize = () => {
  //     updateSlidesPerView(exhibitions.length);
  //   };

  // window.addEventListener("resize", handleResize);
  // return () => window.removeEventListener("resize", handleResize);
  // }, [exhibitions.length]);

  // const updateSlidesPerView = (count) => {
  //   if (window.innerWidth >= 1024) {
  //     setSlidesPerView(Math.min(3, count));
  //   } else if (window.innerWidth >= 600) {
  //     setSlidesPerView(Math.min(2, count));
  //   } else {
  //     setSlidesPerView(1);
  //   }
  // };

  const handleDeleteExhibition = (exhibitionId) => {
    deleteExhibition(exhibitionId);
    setExhibitions((prevExhibitions) => {
      const updatedExhibitions = prevExhibitions.filter(
        (exh) => exh.id !== exhibitionId
      );
      // updateSlidesPerView(updatedExhibitions.length);
      return updatedExhibitions;
    });
    toast.success("Exhibition deleted!");
  };


  const [newExhibitionName, setNewExhibitionName] = useState("");

  const handleCreateExhibition = () => {

    if (newExhibitionName.trim() === "") {
      toast.error("Please enter a name for exhibition") // Set error
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
    toast.success("Exhibition added successfully!");

    setNewExhibitionName("");
    // setErrorMessage("");
  };

  return (
    <main className="home-container">
      <header className="home-header">
        <h1>
          <span>ARCHI</span>
          <span className="header-colour">VIST!</span>
        </h1>
        <h2>Your very own exhibition curator</h2>
      </header>
      
        <div className="saved-exhibitions-header">
          <h2 className="saved-exhibitions-title">Exhibitions</h2>

          <div className="create-exhibition-container">
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
              required
            />

            {/* Display error message */}
            <button onClick={handleCreateExhibition}>Create</button>
          </div>
          
        </div>

        {exhibitions.length > 0 ? <ExhibitionCarousel
          exhibitions={exhibitions}
          onDelete={handleDeleteExhibition}
        // slidesPerView={slidesPerView}
        /> : <p>Create exhibition to begin!</p>}
    </main>
  );
};
