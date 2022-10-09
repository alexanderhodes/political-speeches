export type Speech = {
    author: string;
    topic: string;
    date: string;
    words: number;
}

export type AuthorSpeech = Map<string, number>;
