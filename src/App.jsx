import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import './App.scss';

const App = () => (
  <div className="main">
    <BrowserRouter basename="/">
      <Routes />
    </BrowserRouter>
  </div>
);

export default App;
