/* eslint-disable react/prop-types */
const Total = ({ parts }) => {
  const totalExercises = parts.reduce((totalExercises, part) => totalExercises + part.exercises, 0);
  return (
    <p>
      <b>
        Number of exercises: {totalExercises}
      </b>
    </p>
  )
}

export default Total