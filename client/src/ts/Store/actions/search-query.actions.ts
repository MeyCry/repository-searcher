import history from '../../history';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../reducers';
import {abortableFetch} from '../../helpers/abortableFetch';
import RepositoryModel, {Repository} from '../../helpers/repositoryModel';
import {AnyAction} from 'redux';

export const CHANGE_SEARCH_QUERY = Symbol('CHANGE_SEARCH_QUERY');
export const CHANGE_CURRENT_SEARCH_RESULT_QUERY = Symbol('CHANGE_CURRENT_SEARCH_RESULT_QUERY');
export const SET_REPOSITORIES_RESULT = Symbol('SET_REPOSITORIES_RESULT');

export type SetSearchQuery = ReturnType<typeof setSearchQuery>;
export type SetRepositories = ReturnType<typeof setRepositories>;
export type SetCurrentSearchResultQuery = ReturnType<typeof setCurrentSearchResultQuery>;

export function setSearchQuery(query: string) {
    return {
        type: CHANGE_SEARCH_QUERY,
        payload: {
            query
        }
    };
}

export function setCurrentSearchResultQuery(query: string) {
    return {
        type: CHANGE_CURRENT_SEARCH_RESULT_QUERY,
        payload: {
            query
        }
    };
}

type SearchResult = {
    incomplete_results: boolean;
    total_count: number;
    items: Array<Repository>
}

export function setRepositories(result: SearchResult, page: number) {
    const items = result.items.map(res => new RepositoryModel(res));

    history.push(`/results/${page}`);

    return {
        type: SET_REPOSITORIES_RESULT,
        payload: {
            totalCount: result.total_count,
            items,
            currentPage: page,
        }
    };
}

let currentSearchAbort: () => void | null = null;

export function search(query: string, page: number = 1) {
    return async (dispath: ThunkDispatch<AppState, void, SetRepositories | SetCurrentSearchResultQuery>) => {
        // abort request if it not finish
        if (currentSearchAbort) {
            currentSearchAbort();
        }
        dispath(setCurrentSearchResultQuery(query));

        const requestParams = [
            ['page', page],
            ['per_page', 30],
            ['q', `${encodeURI(query)}+in%3Aname`],
            ['sort', 'stars']
        ]
            .reduce((result, item) => {
                const [key, val] = item;
                result.push(`${key}=${val}`);
                return result;
            }, [])
            .join('&');

        try {
            const rawResultPromise = abortableFetch(`https://api.github.com/search/repositories?${requestParams}`);
            currentSearchAbort = rawResultPromise.abort;
            const rawResult = await rawResultPromise;
            currentSearchAbort = null;
            const result: SearchResult = await rawResult.json();

            dispath(setRepositories(result, page));
        } catch (e) {
            console.error(e);
        }
    };
}

export function changePage(page: number) {
    return (dispatch: ThunkDispatch<AppState, void, AnyAction>, getState: () => AppState) => {
        const state = getState();
        if (page > state.repositories.pages || page < 1) {
            return;
        }

        dispatch(search(state.searchQuery.currentQueryResult, page));
    }
}
