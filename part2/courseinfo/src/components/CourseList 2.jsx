/* eslint-disable react/prop-types */
import Course from "./Course";

const CourseList = ({ courses }) => {
  const allCourses = courses.map(course => <Course key={course.id} course={course}/>);

  return (
    <>
      {allCourses}
    </>
  )
    

}

export default CourseList