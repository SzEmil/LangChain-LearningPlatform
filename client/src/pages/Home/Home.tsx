import css from './Home.module.css';
import { BanerHero } from '../../Components/BanerHero/BanerHero';
import { Offer } from '../../Components/Offer/Offer';
import { AboutLangChain } from '../../Components/AboutLangChain/AboutLangChain';
import { AboutMe } from '../../Components/AboutMe/AboutMe';
import { Contact } from '../../Components/Contact/Contact';



export const Home = () => {
  
  return (
    <div className={css.home}>
      <BanerHero />
      <AboutLangChain />
      <Offer />
      <AboutMe />
      <Contact />
    </div>
  );
};
