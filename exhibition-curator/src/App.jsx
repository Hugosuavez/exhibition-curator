import './App.css'
import { MetArtwork } from './components/MetArtwork'
import { Routes, Route } from "react-router-dom";
import { Home } from './components/Home';
import { HarvardArtwork } from './components/HarvardArtwork';
import { ArtworkDetails } from './components/ArtworkDetails';

function App() {
 
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/met" element={<MetArtwork/> }/>
          <Route path="/harvard" element={<HarvardArtwork/>}/>
          <Route path="/artwork-details/:objectID" element={<ArtworkDetails/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
