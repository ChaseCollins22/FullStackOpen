const caculateBmi = (height: number, weight: number): string => {
    const bmi = weight / Math.pow(height / 100, 2);
    switch (true) {
    case bmi < 18.5:
        return 'Underweight';
    case bmi < 24.9:
        return 'Normal weight';
    case bmi < 29.9:
        return 'Overweight';
    default:
        return 'Obese';
    }
};

export default caculateBmi;
