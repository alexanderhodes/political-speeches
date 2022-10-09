import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import { Result } from './src/types/result.type';
import { countAuthorSpeeches, getAuthorResult, sortAuthorSpeeches } from './src/utils/author.utils';
import { mapCsvDataToSpeeches, requestCsvFiles } from './src/utils/csv.utils';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT ?? 3000;
const YEAR = process.env.YEAR ?? "2013";
const TOPIC = process.env.TOPIC ?? "Internal Security";

app.get('/evaluation', async (req: Request, res: Response) => {
  const queryParam = req.query.url;

  const urls: string[] = Array.isArray(queryParam) ? (queryParam) as string[] : [(queryParam) as string];

  if (urls.length === 0) {
    const result: Result = { leastWordy: null, mostSecurity: null, mostSpeeches: null };

    res.send(result);
  } else {
    const data = await requestCsvFiles(urls);
    // speeches mapped from csv files
    const speeches = mapCsvDataToSpeeches(data);
    const speechesForYear = speeches.filter(speech => speech.date.startsWith(YEAR));
    const speechesForTopic = speeches.filter(speech => speech.topic === TOPIC);

    const authorSpeechesForYear = countAuthorSpeeches(speechesForYear, "count");
    const authorSpeechesForTopic = countAuthorSpeeches(speechesForTopic, "count");
    const authorSpeechesWords = countAuthorSpeeches(speeches, "words");

    const result: Result = {
      mostSpeeches: getAuthorResult(authorSpeechesForYear, "DESC"),
      mostSecurity: getAuthorResult(authorSpeechesForTopic, "DESC"),
      leastWordy: getAuthorResult(authorSpeechesWords, "ASC")
    };

    res.send(result);
  }
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
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});