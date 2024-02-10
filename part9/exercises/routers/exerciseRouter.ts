import express from 'express';
import exerciseCalculator from '../src/exerciseCalculator';


const router = express.Router();

router.post('/', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { exerciseHours, target} = req.body;
    
    if (!exerciseHours || !target) {
        return res.status(400).json({ error: 'parameters missing' });
    }

    const result = exerciseCalculator(exerciseHours as number[], target as number);


    return res.json({ result });
});

export default router;
