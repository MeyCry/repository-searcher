export const CHANGE_SEARCH_QUERY = 'CHANGE_SEARCH_QUERY';

export function setSearchQuery(query: string) {
    return {
        type: CHANGE_SEARCH_QUERY,
        payload: {
            query
        }
    }
}

export type SetSearchQuery = ReturnType<typeof setSearchQuery>;
