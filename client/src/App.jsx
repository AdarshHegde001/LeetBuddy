import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import LocalPage from "./pages/local";
import CloudPage from "./pages/cloud"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/local" element={<LocalPage/>} />
        <Route path="/cloud" element={<CloudPage/>} />
      </Routes>
    </BrowserRouter>
  );
}
