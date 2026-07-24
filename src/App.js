import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Consulting from './pages/Consulting';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="flex min-h-screen flex-col bg-white text-ink-700 dark:bg-ink-black dark:text-ink-300">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/consulting" element={<Consulting />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
