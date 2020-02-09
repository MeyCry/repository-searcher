import {abortableFetch} from './abortableFetch';
import {Repository} from './repositoryModel';

export type SearchResult = {
    incomplete_results: boolean;
    total_count: number;
    items: Array<Repository>
}

type SearchError = {
    message: string;
}

let currentSearchAbort: () => void | null = null;

export async function search(query: string, page: number = 1): Promise<SearchResult> {
    // abort request if it not finish
    if (currentSearchAbort) {
        currentSearchAbort();
    }

    const requestParams = [
        ['page', page],
        ['per_page', 30],
        ['q', `${encodeURI(query)}+in%3Aname`],
        ['sort', 'stars'],
    ]
        .reduce((result, item) => {
            const [key, val] = item;
            result.push(`${key}=${val}`);
            return result;
        }, [])
        .join('&');

    const rawResultPromise = abortableFetch(`https://api.github.com/search/repositories?${requestParams}`);
    currentSearchAbort = rawResultPromise.abort;
    const rawResult = await rawResultPromise;
    currentSearchAbort = null;
    const result: SearchResult | SearchError = await rawResult.json();
    if (rawResult.status >= 400) {
        throw new Error((result as SearchError).message || 'Request error');
    }

    return result as SearchResult;
}
