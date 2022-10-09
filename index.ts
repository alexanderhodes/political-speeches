import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import { Result } from './src/types/result.type';
import { speeches } from './src/assets/test-data';
import { countAuthorSpeeches, sortAuthorSpeeches } from './src/utils/author.utils';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT ?? 3000;
const YEAR = process.env.YEAR ?? "2013";
const TOPIC = process.env.TOPIC ?? "Internal Security";

app.get('/', (req: Request, res: Response) => {
  const speechesForYear = speeches.filter(speech => speech.date.startsWith(YEAR));
  const speechesForTopic = speeches.filter(speech => speech.topic === TOPIC);

  // reduce these items and order them by number
  const authorSpeechesForYear = countAuthorSpeeches(speechesForYear, "count");
  const authorSpeechesForTopic = countAuthorSpeeches(speechesForTopic, "count");
  const authorSpeechesTotal = countAuthorSpeeches(speeches, "words");

  const sortedAuthorSpeechesForYear = sortAuthorSpeeches(authorSpeechesForYear);
  const sortedAuthorSpeechesForTopic = sortAuthorSpeeches(authorSpeechesForTopic);
  const sortedAuthorSpeechesTotal = sortAuthorSpeeches(authorSpeechesTotal);

  const result: Result = {
    mostSpeeches: sortedAuthorSpeechesForYear.length ? sortedAuthorSpeechesForYear[0].author : null,
    mostSecurity: sortedAuthorSpeechesForTopic.length ? sortedAuthorSpeechesForTopic[0].author : null,
    leastWordy: sortedAuthorSpeechesTotal.length ? sortedAuthorSpeechesTotal[0].author : null
  };

  res.send(result);
});

app.get('/example-1.csv', (req: Request, res: Response) => {
  const buffer = fs.readFileSync('./assets/example-1.csv');

  res.send(buffer);
});

app.get('/example-2.csv', (req: Request, res: Response) => {
  const buffer = fs.readFileSync('./assets/example-2.csv');

  res.send(buffer);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});