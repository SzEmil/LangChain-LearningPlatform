import { useInView } from 'react-intersection-observer';
import css from './AboutLangChain.module.css';
import { useSelector } from 'react-redux';
import { selectPageLanguage } from '../../redux/globals/globalsSelectors';

export const AboutLangChain = () => {
  const language = useSelector(selectPageLanguage);
  const sectionInView = useInView({
    rootMargin: '-150px 0px',
    triggerOnce: false,
  });
  const galleryInView = useInView({
    rootMargin: '-200px 0px',
    triggerOnce: false,
  });
  return (
    <section className={css.about}>
      <div className="container">
        <article ref={sectionInView.ref} id="aboutLangChain">
          <h2
            className={`${css.title} ${
              sectionInView.inView && css.titleVisible
            }`}
          >
            {language === 'PL' ? 'Dlaczego LangChain?' : 'Why LangChain?'}
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
              ? `Witaj w kursie dotyczącym tworzenia aplikacji opartych na GPT-4 oraz innych modelach językowych przy użyciu wyłącznie interfejsu graficznego. W tym kursie nauczysz się tworzyć aplikacje, które w pełni wykorzystują potęgę GPT-4 bez konieczności sięgania do kodowania. Nie potrzebujesz żadnej wcześniejszej wiedzy wejściowej. Nie musisz znać języka Python ani żadnego innego języka programowania, i nie potrzebujesz być zaznajomiony z bibliotekami, itp. To jest w 100% wizualne, i nie wymaga żadnych umiejętności kodowania — ani jednej linii kodu. Ten kurs stanie się Twoim "Witaj, świecie!" w dziedzinie sztucznej inteligencji. Flowise umożliwia tworzenie aplikacji szybko, w sposób graficzny, całkowicie na własnych danych i w czasie rzeczywistym.`
              : `Welcome to the course on building applications powered by GPT-4 and
            other language models using a purely graphical interface. In this
            course, you will learn how to create applications that fully harness
            the power of GPT-4 without delving into coding. You don't need to
            possess any prior input knowledge. You don't have to know how to
            program in Python or any other language, and you don't need to be
            familiar with libraries, etc. It's 100% visual, and no coding
            background is required— not a single line of code. This course will
            be your AI 'Hello World.' Flowise enables you to construct
            applications swiftly, graphically, entirely on your own data, and
            on-the-fly.`}
          </p>
          <p
            className={`${css.text} ${
              sectionInView.inView && css.titleVisible
            }`}
          >
            - Karol Sapiołko
          </p>
        </article>
        <div className={css.gallery} ref={galleryInView.ref}>
          <ul className={css.galleryList}>
            <li
              className={`${css.galleryItem} ${
                galleryInView.inView && css.galleryItemVisible
              }`}
            >
              <img
                className={css.galleryImage}
                src={'https://picsum.photos/450'}
                alt="random pic"
              />
            </li>
            <li
              className={`${css.galleryItem} ${
                galleryInView.inView && css.galleryItemVisible
              }`}
            >
              <img
                className={css.galleryImage}
                src={'https://picsum.photos/450'}
                alt="random pic"
              />
            </li>
            <li
              className={`${css.galleryItem} ${
                galleryInView.inView && css.galleryItemVisible
              }`}
            >
              <img
                className={css.galleryImage}
                src={'https://picsum.photos/450'}
                alt="random pic"
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
