
type Operation = 'multiply' | 'add' | 'divide' | 'subtract'

const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case 'multiply':
      return a * b
    case 'add':
      return a + b
    case 'divide':
      if (b === 0) throw new Error("Can't divide by 0!")
      return a / b
    case 'subtract':
      return a - b
    default:
      throw new Error('Operation not supported')
  }
}


// try {
//   console.log(calculator(num1, num2, operation));
// } catch (error: unknown) {
//   let errorMessage = 'Something went wrong: '
//   if (error instanceof Error) {
//     errorMessage += error.message;
//   }
//   console.log(errorMessage);
// }

export default calculator;