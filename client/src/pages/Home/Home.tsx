import React from 'react';
import css from './Home.module.css';
import baner from '../../images/baner.jpg';
import { About } from '../../Components/About/About';
import { BanerHero } from '../../Components/BanerHero/BanerHero';

export const Home = () => {
  return (
    <div>
      <BanerHero />
      <About />
    </div>
  );
};
