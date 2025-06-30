import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Projects from './pages/Projects';
import Team from './pages/Team';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import { TaskProvider } from './context/TaskContext';
import { CompanyProvider } from './context/CompanyContext';
import './App.css';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [hiddenFeatures, setHiddenFeatures] = useState({
    analytics: false,
    team: false,
    projects: false,
    notifications: false
  });

  return (
    <CompanyProvider>
      <TaskProvider>
        <Router>
          <div className="flex h-screen bg-gray-50 overflow-hidden">
            <Sidebar 
              collapsed={sidebarCollapsed} 
              hiddenFeatures={hiddenFeatures}
            />
            
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header 
                onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
                hiddenFeatures={hiddenFeatures}
                setHiddenFeatures={setHiddenFeatures}
              />
              
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Dashboard hiddenFeatures={hiddenFeatures} />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </AnimatePresence>
              </main>
            </div>
          </div>
        </Router>
      </TaskProvider>
    </CompanyProvider>
  );
}

export default App;