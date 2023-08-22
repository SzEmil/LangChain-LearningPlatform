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

export const CoursePage = () => {
  const { courseId } = useParams();
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
      <div className={css.container}>
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
          <div>
            {courseData?.title}
            <div>
              <ul>
                {courseData?.sections.map(section => (
                  <li key={section.id}>
                    <button onClick={() => setCurrentSection(section)}>
                      {section.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <CourseSection section={currentSection} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
