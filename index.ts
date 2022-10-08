import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Result } from './src/types/result.type';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  const result: Result = {
    mostSpeeches: null,
    mostSecurity: "Alexander Abel",
    leastWordy: "Caesare Collins"
  };

  res.send(result);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});