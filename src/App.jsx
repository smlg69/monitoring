// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApiProvider } from './pages/ApiContext'; // Теперь он действительно в pages/
import Layout from './components/Layout/Layout';
import DashboardPage from './pages/DashboardPage';
import HVACPage from './pages/HVACPage';
import AccessPage from './pages/AccessPage';
import CCTVPage from './pages/CCTVPage';
import AdminPage from './pages/AdminPage';
import ReportsPage from './pages/ReportsPage';
import RequestsPage from './pages/RequestsPage';
import './App.css';

function App() {
  return (
    <ApiProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Layout><DashboardPage /></Layout>} />
            <Route path="/hvac" element={<Layout><HVACPage /></Layout>} />
            <Route path="/access" element={<Layout><AccessPage /></Layout>} />
            <Route path="/cctv" element={<Layout><CCTVPage /></Layout>} />
            <Route path="/admin" element={<Layout><AdminPage /></Layout>} />
            <Route path="/reports" element={<Layout><ReportsPage /></Layout>} />
            <Route path="/requests" element={<Layout><RequestsPage /></Layout>} />
          </Routes>
        </div>
      </Router>
    </ApiProvider>
  );
}

export default App;