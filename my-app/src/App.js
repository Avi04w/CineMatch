import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Recs from './pages/Recs';

function App() {
  return (
    <>
       <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/recs" element={<Recs />} />
       </Routes>
    </>
  );
}

export default App;