import history from '../../history'

export const CHANGE_SEARCH_QUERY = 'CHANGE_SEARCH_QUERY';

export function setSearchQuery(query: string) {
    return {
        type: CHANGE_SEARCH_QUERY,
        payload: {
            query
        }
    }
}

export function search(query: string) {
    console.log("AAA", query);
    history.push('results/1');
}

export type SetSearchQuery = ReturnType<typeof setSearchQuery>;
