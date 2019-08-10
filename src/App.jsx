import React from 'react';
import { HashRouter } from 'react-router-dom';
import Routes from './routes';
import './App.scss';

const App = () => (
  <div className="main">
    <HashRouter basename="/">
      <Routes />
    </HashRouter>
  </div>
);

export default App;
