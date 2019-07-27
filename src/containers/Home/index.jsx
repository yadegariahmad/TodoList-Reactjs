import React from 'react';
import ChangeLang from '../../components/changeLang';
import MainCard from '../../components/card';
import './home.scss';

const Home = () => (
  <div className="home">
    <div className="lang-container">
      <ChangeLang />
    </div>
    <MainCard />
  </div>
);

export default Home;
