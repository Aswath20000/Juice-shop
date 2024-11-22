import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Basket from './components/Basket';
import Feedback from './components/Feedback';
import PrivacyPolicy from './components/PrivacyPolicy';
import ConfidentialDocuments from './components/ConfidentialDocuments';
import FileUpload from './components/FileUpload';
import Scoreboard from './components/Scoreboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/confidential-documents" element={<ConfidentialDocuments />} />
        <Route path="/file-upload" element={<FileUpload />} />
        <Route path="/scoreboard" element={<Scoreboard/>}/>
        <Route path="/fileUpload" element={<FileUpload/>}/>
      </Routes>
    </Router>
  );
}

export default App;
