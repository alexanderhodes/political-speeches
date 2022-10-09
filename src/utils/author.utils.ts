import { AuthorResult, AuthorSpeech, Speech } from "../types/speech.type";

/**
 * Groups author speeches by passed type. If passed type is equals to `count`, it will count speeches. 
 * And if type is `words`, the grouped words will be summed up.
 * 
 * @param speeches Speeches for author
 * @param type Type needs to be grouped `count` or `words`
 * @returns 
 */
export const countAuthorSpeeches = (speeches: Speech[], type: "count" | "words"): AuthorSpeech => {
    // groups speeches into map
    const authorSpeeches = speeches.reduce((authorSpeech: AuthorSpeech, current: Speech) => {
        const currentAuthorSpeeches =  authorSpeech.get(current.author) ?? 0;
        const count = type === "count" ? 1 : current.words;

        authorSpeech.set(current.author, currentAuthorSpeeches + count);

        return authorSpeech;
    }, new Map());

    return authorSpeeches;
};

/**
 * sorts author speeches passed by count of each author speech descending
 * 
 * @param authorSpeeches speeches for author
 * @returns sorted author speeches
 */
export const sortAuthorSpeeches = (authorSpeeches: AuthorSpeech, sort: "ASC" | "DESC"): AuthorResult[] => {
    const entries: AuthorResult[] = Array
        .from(authorSpeeches.entries())
        .map(entry => ({ author: entry[0], count: entry[1] }));

    if (sort === "ASC") {
        return entries.sort((a, b) => (a.count - b.count));
    }

    return entries.sort((a, b) => (b.count - a.count));
}

/**
 * returns author result
 * 
 * @param authorSpeeches speeches of authors 
 * @returns author result
 */
export const getAuthorResult = (authorSpeeches: AuthorSpeech, sort: "ASC" | "DESC"): string | null => {
    if (authorSpeeches.size === 0) {
        return null;
    } 

    const sortedResults = sortAuthorSpeeches(authorSpeeches, sort);

    return sortedResults[0].author;
}
