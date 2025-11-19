import "./App.css";
import { MetArtwork } from "./components/MetArtwork";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { HarvardArtwork } from "./components/HarvardArtwork";
import { MetArtworkDetails } from "./components/MetArtworkDetails";
import { HarvardArtworkDetails } from "./components/HarvardArtworkDetails";
import { ExhibitionPage } from "./components/ExhibitionPage";
import { ToastContainer } from "react-toastify";
import { CuratePage } from "./components/CuratePage";

function App() {
  return (
    <>
      <div>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/met" element={<MetArtwork />} />
          <Route path="/harvard" element={<HarvardArtwork />} />
          <Route
            path="/met-artwork-details/:objectID"
            element={<MetArtworkDetails />}
          />
          <Route
            path="/harvard-artwork-details/:objectID"
            element={<HarvardArtworkDetails />}
          />
          <Route path="/exhibition/:id" element={<ExhibitionPage />} />
          <Route path="/curate/:id" element={<CuratePage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
