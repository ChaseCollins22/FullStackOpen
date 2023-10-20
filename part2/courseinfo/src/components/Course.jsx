import Content from "./Content";
import Header from "./Header";

const Course = ( { course }) => {
  return (
    <>
      <Header course={course}></Header>
      <Content parts={course.parts}></Content>
    </>
  )
}

export default Course