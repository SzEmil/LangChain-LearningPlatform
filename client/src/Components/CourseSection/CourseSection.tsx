import { Section } from '../../types/courseTypes';

type CourseSectionPropsType = {
  section: Section | undefined;
};

export const CourseSection = ({ section }: CourseSectionPropsType) => {
  return (
    <div>
      <h2>{section?.name}</h2>
      <p>{section?.description}</p>
    </div>
  );
};
