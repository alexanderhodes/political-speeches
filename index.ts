import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Result } from './src/types/result.type';
import { PORT, TOPIC, YEAR } from './src/config';

dotenv.config();

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  const result: Result = {
    mostSpeeches: null,
    mostSecurity: "Alexander Abel",
    leastWordy: "Caesare Collins"
  };

  res.send(result);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});