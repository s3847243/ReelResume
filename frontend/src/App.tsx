import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { GetStarted } from './pages/GetStarted';
import NextStep from './components/NextStep';
import Success from './pages/Success';
import ViewPage from './pages/ViewPage';
import Cancel from './pages/Cancel';
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/next-step" element={<NextStep />} />
          <Route path="/success" element={<Success />} />
          <Route path="/view/:slug" element={<ViewPage />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;