import express from 'express';
import bmiRouter from '../routers/bmiRouter';
import exerciseRouter from '../routers/exerciseRouter';


const app = express();

app.use(express.json());
app.use('/bmi', bmiRouter);
app.use('/exercises', exerciseRouter);


app.get('/', (_req, res) => {
  res.send('Hello Full Stack!!!');
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

