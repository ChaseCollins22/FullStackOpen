/* eslint-disable react/prop-types */
import Part from "./Part";

const Content = ({ parts }) => {
  const partComponents = parts.map((part) => {
    return <Part key={part.id} partName={part.name} numExercises={part.exercises} />
  });

  return (
    <div>
      {partComponents}
    </div>
  )
}

export default Content