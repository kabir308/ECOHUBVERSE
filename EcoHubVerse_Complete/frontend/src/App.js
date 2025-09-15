import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import Blog from './modules/Blog';
import Chat from './modules/Chat';
import Crypto from './modules/Crypto';
import Dashboard from './modules/Dashboard';
import Ecommerce from './modules/Ecommerce';
import Elearning from './modules/Elearning';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="bg-gray-800 text-white p-4">
          <ul className="flex space-x-4">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/chat">Chat</Link></li>
            <li><Link to="/crypto">Crypto</Link></li>
            <li><Link to="/ecommerce">E-commerce</Link></li>
            <li><Link to="/elearning">E-learning</Link></li>
          </ul>
        </nav>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/crypto" element={<Crypto />} />
            <Route path="/ecommerce" element={<Ecommerce />} />
            <Route path="/elearning" element={<Elearning />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
