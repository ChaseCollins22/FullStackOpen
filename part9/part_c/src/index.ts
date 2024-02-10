import express from 'express';
import cors from 'cors';
import diariesRouter from './routes/diaries';

const app = express();

app.use(express.json());
app.use(cors());


app.get('/api/ping', (_req, res) => {
  res.json({ message: 'pong' });
});

app.use('/api/diaries', diariesRouter);

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
