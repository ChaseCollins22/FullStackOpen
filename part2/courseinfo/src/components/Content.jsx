/* eslint-disable react/prop-types */
import Part from "./Part";

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

export default Content