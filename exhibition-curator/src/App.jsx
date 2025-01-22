import './App.css'
import { MetArtwork } from './components/MetArtwork'
import { Routes, Route } from "react-router-dom";
import { Home } from './components/Home';
import { HarvardArtwork } from './components/HarvardArtwork';

function App() {
 
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/met" element={<MetArtwork/> }/>
          <Route path="/harvard" element={<HarvardArtwork/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
