```javascript
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Calculator from '../components/Calculator';
import History from '../components/History';
import NotFound from '../components/NotFound';

// Main routing configuration for the calculator app
const AppRoutes = () => {
  return (
    <Routes>
      {/* Main calculator view */}
      <Route path="/" element={<Calculator />} />

      {/* Calculator operation history */}
      <Route path="/history" element={<History />} />

      {/* 404 Not Found page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
```