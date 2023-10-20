/* eslint-disable react/prop-types */
import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = ( { course }) => {
  return (
    <>
      <Header course={course}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </>
  )
}


export default Course