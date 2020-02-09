import history from '../../history';
import RepositoryModel, {Repository} from '../../helpers/repositoryModel';
import {AddNotification, addNotification} from './notify.actions';
import {SearchResult} from '../../helpers/search';

export const CHANGE_SEARCH_QUERY = 'CHANGE_SEARCH_QUERY';
export const CHANGE_CURRENT_SEARCH_RESULT_QUERY = 'CHANGE_CURRENT_SEARCH_RESULT_QUERY';
export const SET_REPOSITORIES_RESULT = 'SET_REPOSITORIES_RESULT';
export const SET_LOADING = 'SET_LOADING';
export const SEARCH_ACTION_TYPE = 'SEARCH_ACTION_TYPE';
export const CHANGE_PAGE = 'CHANGE_PAGE';

export type SetSearchQuery = {
    type: typeof CHANGE_SEARCH_QUERY,
    payload: { query: string }
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
    payload: { query: string }
};
export type SetLoading = {
    type: typeof SET_LOADING,
    payload: { loading: boolean }
};

export type SearchAction = {
    type: typeof SEARCH_ACTION_TYPE,
    payload: {
        query: string,
        page: number
    }
}

export type ChangePage = {
    type: typeof CHANGE_PAGE,
    payload: { page: number }
}

export function setSearchQuery(query: string): SetSearchQuery {
    return {
        type: CHANGE_SEARCH_QUERY,
        payload: {
            query,
        },
    };
}

export function setCurrentSearchResultQuery(query: string): SetCurrentSearchResultQuery {
    return {
        type: CHANGE_CURRENT_SEARCH_RESULT_QUERY,
        payload: {
            query,
        },
    };
}

export function setLoading(isLoading: boolean): SetLoading {
    return {
        type: SET_LOADING,
        payload: {
            loading: isLoading,
        },
    };
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
        },
    };
}

export function searchAction(query: string, page: number = 1): SearchAction {
    return {
        type: SEARCH_ACTION_TYPE,
        payload: {
            query,
            page,
        },
    };
}

export function changePage(page: number): ChangePage {
    return {
        type: CHANGE_PAGE,
        payload: {
            page,
        }
    };
}
