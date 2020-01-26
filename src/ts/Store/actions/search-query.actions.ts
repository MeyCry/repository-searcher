import history from '../../history';
import {ThunkDispatch} from 'redux-thunk';
import {AppState} from '../reducers';
import {abortableFetch} from '../../helpers/abortableFetch';
import RepositoryModel, {Repository} from '../../helpers/repositoryModel';
import {AnyAction} from 'redux';
import {AddNotification, addNotification} from './notify.actions';

export const CHANGE_SEARCH_QUERY = 'CHANGE_SEARCH_QUERY';
export const CHANGE_CURRENT_SEARCH_RESULT_QUERY = 'CHANGE_CURRENT_SEARCH_RESULT_QUERY';
export const SET_REPOSITORIES_RESULT = 'SET_REPOSITORIES_RESULT';
export const SET_LOADING = 'SET_LOADING';

export type SetSearchQuery = {
    type: typeof CHANGE_SEARCH_QUERY,
    payload: {
        query: string
    }
};
export type SetRepositories = {
    type: typeof SET_REPOSITORIES_RESULT,
    payload: {
        totalCount: number,
        items: Array<RepositoryModel>,
        currentPage: number,
    }
};
export type SetCurrentSearchResultQuery = {
    type: typeof CHANGE_CURRENT_SEARCH_RESULT_QUERY,
    payload: {
        query: string
    }
};
export type SetLoading = {
    type: typeof SET_LOADING,
    payload: {
        loading: boolean
    }
};

export function setSearchQuery(query: string): SetSearchQuery {
    return {
        type: CHANGE_SEARCH_QUERY,
        payload: {
            query
        }
    };
}

export function setCurrentSearchResultQuery(query: string): SetCurrentSearchResultQuery {
    return {
        type: CHANGE_CURRENT_SEARCH_RESULT_QUERY,
        payload: {
            query
        }
    };
}

export function setLoading(isLoading: boolean): SetLoading {
    return {
        type: SET_LOADING,
        payload: {
            loading: isLoading
        }
    }
}

type SearchResult = {
    incomplete_results: boolean;
    total_count: number;
    items: Array<Repository>
}

type SearchError = {
    message: string;
}

export function setRepositories(result: SearchResult, page: number): SetRepositories {
    if (!result && !Array.isArray(result)) {
        return;
    }
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

type SearchActions = SetRepositories
    | SetCurrentSearchResultQuery
    | AddNotification
    | SetLoading;

let currentSearchAbort: () => void | null = null;

export function search(query: string, page: number = 1) {
    return async (dispath: ThunkDispatch<AppState, void, SearchActions>) => {
        dispath(setLoading(true));

        // abort request if it not finish
        if (currentSearchAbort) {
            currentSearchAbort();
        }

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
            const result: SearchResult | SearchError = await rawResult.json();

            if (rawResult.status >= 400) {
                throw new Error((result as SearchError).message || 'Request error')
            }

            dispath(setRepositories(result as SearchResult, page));
            dispath(setCurrentSearchResultQuery(query));
            dispath(setLoading(false));
        } catch (e) {
            dispath(addNotification(e.message));
            dispath(setLoading(false));
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
