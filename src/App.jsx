import "./App.css";
import { MetExhibits } from "./components/MetExhibits";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { HarvardExhibits } from "./components/HarvardExhibits";
import { MetExhibitDetails } from "./components/MetExhibitDetails";
import { HarvardExhibitDetails } from "./components/HarvardExhibitDetails";
import { ExhibitionPage } from "./components/ExhibitionPage";
import { ToastContainer } from "react-toastify";
import { CuratePage } from "./components/CuratePage";
import { WelcomeScreen } from "./components/WelcomeScreen";

function App() {
  return (
    <>
        <ToastContainer position="bottom-left" autoClose={3000} />
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/home" element={<Home/>} />
          {/* <Route path="/met" element={<MetArtwork />} />
          <Route path="/harvard" element={<HarvardArtwork />} /> */}
          <Route
            path="/met-artwork-details/:objectID"
            element={<MetExhibitDetails />}
          />
          <Route
            path="/harvard-artwork-details/:objectID"
            element={<HarvardExhibitDetails />}
          />
          <Route path="/exhibition/:id" element={<ExhibitionPage />} />
          <Route path="/curate/:id" element={<CuratePage />} />
        </Routes>
    </>
  );
}

export default App;
