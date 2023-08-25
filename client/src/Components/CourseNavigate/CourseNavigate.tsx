import { CourseType } from '../../types/courseTypes';
import css from './CourseNavigate.module.css';
import { Section } from '../../types/courseTypes';

type CourseNavPropsType = {
  courseData: CourseType | null;
  currentSection: Section | undefined;
  setCurrentSection: any;
  setIsMobileNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const CourseNavigate = ({
  courseData,
  currentSection,
  setCurrentSection,
  setIsMobileNavOpen,
}: CourseNavPropsType) => {
  return (
    <aside className={css.aside}>
      <div className={css.courseNavBtn}>
        <h2 className={css.sectionsTitle}>{courseData?.title}</h2>
        <button
          className={css.closeBtn}
          onClick={() => setIsMobileNavOpen(false)}
        >
          X
        </button>
      </div>
      <ul className={css.sectionsList}>
        {courseData?.sections.map((section, index) => (
          <li key={section.id}>
            <button
              className={`${css.sectionBtn} ${
                currentSection?.id === section.id && css.sectionBtnActive
              }`}
              onClick={() => {
                setCurrentSection(section);
                setTimeout(() => {
                  setIsMobileNavOpen(false);
                }, 200);
              }}
            >
              {index + 1}. {section.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
