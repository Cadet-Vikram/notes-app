import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Notes from './components/Notes.jsx';
import Login from './components/Login.jsx';

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;