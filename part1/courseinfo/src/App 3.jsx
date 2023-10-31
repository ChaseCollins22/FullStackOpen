const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Part = ({ partName, numExercises }) => {
  return (
    <p>{partName} {numExercises}</p>
  )
}

const Content = ({ parts }) => {
  const partComponents = parts.map((part, idx) => {
    return <Part key={idx} partName={part.name} numExercises={part.exercises} />
  });

  return (
    <div>
      {partComponents}
    </div>
  )
}

const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises {parts.reduce((totalExercises, part) => totalExercises + part.exercises, 0)}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };
  
  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App