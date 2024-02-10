export interface ExerciseStats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exerciseHours: number[], target: number): ExerciseStats => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(numHours => numHours > 0).length;
  const average = exerciseHours.reduce((sum, hours) => sum + hours, 0) / periodLength;
  const success = average >= target;
  const rating = calculateRating(average, target);
  const ratingDescription = getRatingDescription(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const calculateRating = (average: number, target: number): number => {
  if (average >= target) return 3;
  if (average >= target / 2) return 2;
  return 1;
};

const getRatingDescription = (rating: number): string => {
  switch (rating) {
    case 3:
      return 'Great job! You met your exercise goal!';
    case 2:
      return 'Not bad! You were close to your exercise goal!';
    default:
      return 'Step up your game fool, do you want to be good or great?!';
  }
};

try {
  const isValidNumber = (arg: unknown): boolean => !isNaN(Number(arg));

  const target = Number(process.argv[2]);
  const args = process.argv.slice(3);

  if (!args.every(isValidNumber)) throw new Error('All arguments must be numbers');

  const exerciseHours = args.map(hours => Number(hours));
  console.log(calculateExercises(exerciseHours, target));
} catch (e: unknown) {
  if (e instanceof Error) console.log('Error:', e.message);
}

export default calculateExercises;
