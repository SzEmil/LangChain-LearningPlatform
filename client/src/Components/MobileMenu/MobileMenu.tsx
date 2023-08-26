import { Link } from 'react-scroll';
import css from './MobileMenu.module.css';
import { useSelector } from 'react-redux';
import { selectPageLanguage } from '../../redux/globals/globalsSelectors';
import { AiFillHome } from 'react-icons/ai';
import { MdContactMail } from 'react-icons/md';
import { BsFillPersonBadgeFill } from 'react-icons/bs';
import { MdLocalOffer } from 'react-icons/md';
import { RiComputerFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import { AiFillPhone } from 'react-icons/ai';

export const MobileMenu = ({ setIsMobileMenuOpen }: any) => {
  const language = useSelector(selectPageLanguage);
  return (
    <div className={css.modalWindow}>
      <button
        className={css.closeBtn}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        X
      </button>
      <nav>
        <ul className={css.navList}>
          <li>
            <Link
              activeClass={css.acitveLink}
              to="home"
              spy={true}
              smooth={true}
              offset={-150}
              duration={500}
            >
              <div className={css.linkWrapper}>
                <AiFillHome size={24} />
                <p
                  className={css.navItemLink}
                  onClick={() => {
                    setTimeout(() => setIsMobileMenuOpen(false), 400);
                  }}
                >
                  {language === 'ENG' && <span>Home</span>}
                  {language === 'PL' && <span>Strona główna</span>}
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              activeClass={css.acitveLink}
              to="aboutLangChain"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              <div className={css.linkWrapper}>
                <RiComputerFill size={24} />
                <p
                  className={css.navItemLink}
                  onClick={() => {
                    setTimeout(() => setIsMobileMenuOpen(false), 400);
                  }}
                >
                  LangChain
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              activeClass={css.acitveLink}
              to="offer"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              <div className={css.linkWrapper}>
                <MdLocalOffer size={24} />
                <p
                  className={css.navItemLink}
                  onClick={() => {
                    setTimeout(() => setIsMobileMenuOpen(false), 400);
                  }}
                >
                  {language === 'PL' ? 'Oferta' : 'Offer'}
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              activeClass={css.acitveLink}
              to="aboutMe"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              <div className={css.linkWrapper}>
                <BsFillPersonBadgeFill size={24} />
                <p
                  className={css.navItemLink}
                  onClick={() => {
                    setTimeout(() => setIsMobileMenuOpen(false), 400);
                  }}
                >
                  {language === 'PL' ? 'O mnie' : 'About Me'}
                </p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              activeClass={css.acitveLink}
              to="contact"
              spy={true}
              smooth={true}
              offset={100}
              duration={500}
            >
              <div className={css.linkWrapper}>
                <MdContactMail size={24} />
                <p
                  className={css.navItemLink}
                  onClick={() => {
                    setTimeout(() => setIsMobileMenuOpen(false), 400);
                  }}
                >
                  {language === 'PL' ? 'Kontakt' : 'Contact'}
                </p>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
      <ul className={css.contactList}>
        <li>
          <div className={css.linkWrapper}>
            <MdEmail size={24} />
            <p className={css.navItemLink}>karol@sapiolko.com</p>
          </div>
        </li>
        <li>
          <div className={css.linkWrapper}>
            <AiFillPhone size={24} />
            <p className={css.navItemLink}>+48 729-979-849</p>
          </div>
        </li>
      </ul>
    </div>
  );
};
