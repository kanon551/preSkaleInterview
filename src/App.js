import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React from 'react'
import BirdGrid from './Pages/BirdGrid';
import BirdGallery from './Pages/BirdGallery';

const App = () => {
  return (
    <div>
      <Router>
                <Routes>
                  <Route path='/' element={<BirdGrid/>}/>
                  <Route path='/birdGrid' element={<BirdGrid/>}/>
                  <Route path='/birdGallery' element={<BirdGallery/>}/>
                </Routes>
        </Router>
    </div>
  )
}

export default App

