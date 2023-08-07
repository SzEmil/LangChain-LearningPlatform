import { useInView } from 'react-intersection-observer';
import css from './AboutLangChain.module.css';
export const AboutLangChain = () => {
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
      <div className={css.container}>
        <article ref={sectionInView.ref} id="aboutLangChain">
          <h2
            className={`${css.title} ${
              sectionInView.inView && css.titleVisible
            }`}
          >
            Why LangChain?
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
            Welcome to the course on building applications powered by GPT-4 and
            other language models using a purely graphical interface. In this
            course, you will learn how to create applications that fully harness
            the power of GPT-4 without delving into coding. You don't need to
            possess any prior input knowledge. You don't have to know how to
            program in Python or any other language, and you don't need to be
            familiar with libraries, etc. It's 100% visual, and no coding
            background is required— not a single line of code. This course will
            be your AI 'Hello World.' Flowise enables you to construct
            applications swiftly, graphically, entirely on your own data, and
            on-the-fly.
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
                src={'https://picsum.photos/350'}
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
                src={'https://picsum.photos/350'}
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
                src={'https://picsum.photos/350'}
                alt="random pic"
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
