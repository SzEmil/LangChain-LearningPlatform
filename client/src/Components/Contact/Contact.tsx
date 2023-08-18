import css from './Contact.module.css';
import { useInView } from 'react-intersection-observer';
import photo from '../../images/KarolSapilkoPhoto2.jpg';
import { useSelector } from 'react-redux';
import { selectPageLanguage } from '../../redux/globals/globalsSelectors';

export const Contact = () => {
  const language = useSelector(selectPageLanguage);
  const sectionInView = useInView({
    rootMargin: '-150px 0px',
    triggerOnce: false,
  });

  const InfoInView = useInView({
    rootMargin: '-150px 0px',
    triggerOnce: false,
  });

  return (
    <section className={css.contact} id="contact" ref={sectionInView.ref}>
      <div className={css.container}>
        <h2
          className={`${css.title} ${sectionInView.inView && css.titleVisible}`}
        >
          {language === 'PL' ? 'Skontakuj się ze mną' : 'Contact Me'}
        </h2>
        <div
          className={`${css.spanLine} ${
            sectionInView.inView && css.lineVisible
          }`}
        ></div>
        <div className={css.contactWrapper} ref={InfoInView.ref}>
          <img
            className={`${css.image} ${InfoInView.inView && css.imageInView}`}
            src={photo}
            alt="Karol Sapiolko pic2"
          />
          <div>
            <p
              className={`${css.text} ${
                sectionInView.inView && css.titleVisible
              }`}
            >
              {language === 'PL'
                ? `Dążę do zapewnienia Ci najlepszej obsługi, dlatego jeśli masz jakiekolwiek problemy lub pytania, śmiało skontaktuj się ze mną.`
                : `I strive to provide you with the best service, so if you have any
              issues or questions, please feel free to get in touch with me.`}
            </p>

            <div
              className={`${css.contactData} ${
                sectionInView.inView && css.contactDataVisible
              }`}
            >
              <ul className={css.contactDataList}>
                <li>
                  <a className={css.contactDataLink} href="tel:+48729979849">
                    {language === 'PL' ? `Zadzwoń: +48 729-979-849` : `Call: +48 729-979-849`}
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:karol@sapiolko.com"
                    className={css.contactDataLink}
                  >
                    Email: karol@sapiolko.com
                  </a>
                </li>
              </ul>
            </div>

            <div
              className={`${css.formWrapper} ${
                InfoInView.inView && css.imageInView
              }`}
            >
              <form className={css.form}>
                <label className={css.label} htmlFor="email">
                  Email:
                </label>
                <input
                  className={css.input}
                  type="email"
                  id="email"
                  name="email"
                />

                <label className={css.label} htmlFor="message">
                  {language === 'PL' ? 'Wiadomość:' : ' Message:'}
                </label>
                <textarea
                  className={css.textarea}
                  id="message"
                  name="message"
                ></textarea>

                <button className={css.button} type="submit">
                {language === 'PL' ? 'Wyślij Wiadomość' : ' Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
