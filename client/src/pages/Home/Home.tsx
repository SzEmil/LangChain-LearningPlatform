// import css from './Home.module.css';

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
