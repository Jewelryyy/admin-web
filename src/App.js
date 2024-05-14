import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/appRoutes';
import RouteGuard from './routes/RouteGuard';

function App() {
  return (
    <Router>
      <div className="App">
        <RouteGuard>
          <AppRoutes />
        </RouteGuard>
      </div>
    </Router>
  );
}

export default App;