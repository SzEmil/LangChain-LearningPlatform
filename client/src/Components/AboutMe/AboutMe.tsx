import css from './AboutMe.module.css';
import { useInView } from 'react-intersection-observer';
import photo from '../../images/KarolSapiolkoPhoto1.jpg';
import { useSelector } from 'react-redux';
import { selectPageLanguage } from '../../redux/globals/globalsSelectors';

export const AboutMe = () => {
  const language = useSelector(selectPageLanguage);
  const sectionInView = useInView({
    rootMargin: '-150px 0px',
    triggerOnce: false,
  });

  return (
    <section className={css.aboutMe} id="aboutMe" ref={sectionInView.ref}>
      <div className={css.container}>
        <article className={css.article}>
          <div>
            <h2
              className={`${css.title} ${
                sectionInView.inView && css.titleVisible
              }`}
            >
              {language === 'PL' ? 'O Mnie' : 'About Me'}
            </h2>
            <div
              className={`${css.spanLine} ${
                sectionInView.inView && css.lineVisible
              }`}
            ></div>
            <p
              className={`${css.text} ${
                sectionInView.inView && css.titleVisible
              }`}
            >
              {language === 'PL'
                ? `Jestem doświadczonym freelancerem z wieloletnim doświadczeniem w dziedzinie optymalizacji stron internetowych. Moja pasja do technologii oraz nieustanne dążenie do innowacyjnych rozwiązań zaprowadziły mnie do fascynującego świata sztucznej inteligencji, a zwłaszcza ChatGPT. Moją misją jest przekazywanie wiedzy w sposób łatwy i przystępny, umożliwiający każdemu zrozumienie i wykorzystanie potęgi tych niezwykłych narzędzi. Jestem pewny, że zrozumienie sztucznej inteligencji oraz technologii ChatGPT może przynieść ogromne korzyści zarówno na poziomie osobistym, jak i zawodowym. Dołącz do mnie w tej oświeceniowej podróży, a razem odkryjemy nieograniczony potencjał innowacji napędzanych przez sztuczną inteligencję.`
                : `I am a seasoned freelancer with years of expertise in the field of
              website optimization. My fervor for technology and continuous
              pursuit of innovative solutions have led me to the captivating
              realm of artificial intelligence, particularly ChatGPT. My mission
              is to convey my knowledge in an effortless and approachable
              manner, enabling everyone to grasp and harness the power of these
              remarkable tools. I am confident that understanding artificial
              intelligence and ChatGPT technology can yield tremendous
              advantages, both on a personal and professional level. Join me on
              this enlightening journey, and together, we'll unlock the
              boundless potential of AI-driven innovation.`}
            </p>
          </div>
          <aside className={css.aside}>
            <img
              className={`${css.image} ${
                sectionInView.inView && css.imageVisible
              }`}
              src={photo}
              alt="photo of Karol Sapiolko, owner of course"
            />
          </aside>
        </article>
      </div>
    </section>
  );
};
