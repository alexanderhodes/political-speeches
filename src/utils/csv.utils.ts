import axios from "axios";
import { Speech } from "../types/speech.type";

/**
 * requests csv files from passed urls and returns data
 * 
 * @param urls url for csv files
 * @returns csv data
 */
export const requestCsvFiles = async (urls: string[]): Promise<string[]> => {
    const data: string[] = await Promise.all(
        urls.map(async (url) => {
            const response = await axios(url);

            return response.data;
        })
    );

    return data;
}

/**
 * maps data from csv files to speeches
 * 
 * @param data csv input as text
 * @returns speeches parsed from csv input
 */
export const mapCsvDataToSpeeches = (data: string[]): Speech[] => {
    const speeches: Speech[] = [];

    data.forEach(d => {
        const rows = d.split(`\n`);

        rows.forEach(row => {
            // check if row has header
            if (!row.startsWith('Speaker')) {
                const columns = row.split(', ');

                if (columns.length === 4) {
                    speeches.push({
                        author: columns[0],
                        topic: columns[1],
                        date: columns[2],
                        words: Number(columns[3])
                    });
                }
            }
        });
    });

    return speeches;
}