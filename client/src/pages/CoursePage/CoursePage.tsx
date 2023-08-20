import { useSelector } from 'react-redux';
import { selectCurrentCourseData } from '../../redux/courses/coursesSelectors';
import { selectCurrentCourseIsLoading } from '../../redux/courses/coursesSelectors';
import { ColorRing } from 'react-loader-spinner';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { getUserCourseById } from '../../redux/courses/coursesOperations';
import css from './CoursePage.module.css';

export const CoursePage = () => {
  const { courseId } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector(selectCurrentCourseIsLoading);
  const courseData = useSelector(selectCurrentCourseData);

  //   useEffect(() => {
  //     dispatch(getUserCourseById(courseId));
  //   }, [courseId]);
  return (
    <div>
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
        <div className={css.course}>
          <div className={css.container}>
            {courseData?.title}
            {/* <video controls width="100%" height="auto">
              <source
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video> */}

            {/* <iframe
              width="1280"
              height="720"
              src="https://www.youtube.com/embed/b8hz95jBJ9Q"
              title="TO JEST HIT XD Przesymulowałem CAŁY SEZON 2023/24 PREMIER LEAGUE...."
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe> */}
            
          </div>
        </div>
      )}
    </div>
  );
};
