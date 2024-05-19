import React from 'react';
import { useRoutes } from 'react-router-dom';
import './App.css';
import routes from './routes';
import RouteGuard from './routes/RouteGuard';

function App() {
  return (
    <div className="App">
      <RouteGuard>
        {useRoutes(routes)}
      </RouteGuard>
    </div>
  );
}

export default App;