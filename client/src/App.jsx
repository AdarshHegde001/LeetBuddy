import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import LocalPage from "./pages/local";
import CloudPage from "./pages/cloud";
import ResultPage from './pages/result';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/local" element={<LocalPage/>} />
        <Route path="/cloud" element={<CloudPage/>} />
        <Route path="/result" element={<ResultPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}
