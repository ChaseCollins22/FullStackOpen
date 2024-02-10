import express from 'express';
import BMICalculator from '../src/BMICalculator';

interface BMICalculatorResult {
  height: number,
  weight: number,
  bmi: string
}

const router = express.Router();

const validateInputs = (height: unknown, weight: unknown): boolean => {
    return (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) ? false : true;
};

router.get('/', (req, res) => {
    const { height, weight } = req.query;
    if (!validateInputs(height, weight)) {
        return res.status(400).json({ error: 'malformatted parameters' });
    }

    const bmiResult = BMICalculator(Number(height), Number(weight));
    const responseObj: BMICalculatorResult = {
        height: Number(height),
        weight: Number(weight),
        bmi: bmiResult
    };

    return res.json(responseObj);

});

export default router;
