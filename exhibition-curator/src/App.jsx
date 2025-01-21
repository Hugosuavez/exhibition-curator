import { useState } from 'react'
import './App.css'
import { MetArtwork } from './components/MetArtwork'
import { Routes, Route } from "react-router-dom";

function App() {
 
  return (
    <>
      <div>
        <h1>Exhibition Curation Platform</h1>
        <MetArtwork/>
      </div>
    </>
  )
}

export default App
