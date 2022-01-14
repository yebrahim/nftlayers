import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { HomePage } from './pages/HomePage';
import mixpanel from 'mixpanel-browser';
import { EVENTS, sendEvent } from './events';

export const App: React.FC = () => {
  useEffect(() => {
    mixpanel.init('b03ed910ce2c07ef1797f10510878780', { debug: true });
    sendEvent(EVENTS.init);
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
