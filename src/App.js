import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Resume from './pages/Resume';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-brand-cream via-brand-sand to-brand-cream text-brand-ink">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-90 [background-image:radial-gradient(circle_at_top_left,rgba(123,45,58,0.14),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(181,74,90,0.12),transparent_60%),linear-gradient(120deg,rgba(233,196,106,0.1),transparent)]" />
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
