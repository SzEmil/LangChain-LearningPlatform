import { useSelector } from 'react-redux';
import { selectCurrentCourseData } from '../../redux/courses/coursesSelectors';
import { selectCurrentCourseIsLoading } from '../../redux/courses/coursesSelectors';
import { ColorRing } from 'react-loader-spinner';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getUserCourseById } from '../../redux/courses/coursesOperations';
import css from './CoursePage.module.css';
import { CourseSection } from '../../Components/CourseSection/CourseSection';
import { CourseNavigate } from '../../Components/CourseNavigate/CourseNavigate';

export const CoursePage = () => {
  const { courseId } = useParams();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector(selectCurrentCourseIsLoading);
  const courseData = useSelector(selectCurrentCourseData);

  const [currentSection, setCurrentSection] = useState(courseData?.sections[0]);
  useEffect(() => {
    setCurrentSection(courseData?.sections[0]);
  }, [courseData]);
  useEffect(() => {
    dispatch(getUserCourseById(courseId));
  }, [courseId]);

  return (
    <div className={css.course}>
      <div
        onClick={() => setIsMobileNavOpen(false)}
        className={`${css.backdrop} ${isMobileNavOpen && css.backdropActive}`}
      ></div>
      <div className="container">
        {isLoading ? (
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        ) : (
          <div className={css.courseWrapper}>
            <aside className={css.aside}>
              <h2 className={css.sectionsTitle}>{courseData?.title}</h2>

              <ul className={css.sectionsList}>
                {courseData?.sections.map((section, index) => (
                  <li key={section.id}>
                    <button
                      className={`${css.sectionBtn} ${
                        currentSection?.id === section.id &&
                        css.sectionBtnActive
                      }`}
                      onClick={() => setCurrentSection(section)}
                    >
                      {index + 1}. {section.name}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
            <div className={css.sectionWrapper}>
              <CourseSection
                section={currentSection}
                setIsMobileNavOpen={setIsMobileNavOpen}
              />
            </div>

            <div
              className={`${css.courseNavWrapper} ${
                isMobileNavOpen && css.courseNavActive
              }`}
            >
              <CourseNavigate
                courseData={courseData}
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
                setIsMobileNavOpen={setIsMobileNavOpen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
