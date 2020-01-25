export const SET_AUTH = 'SET_AUTH';

export function setAuthenticated(isAuthenticated: boolean) {
    return {
        type: SET_AUTH,
        payload: {
            isAuthenticated,
        }
    }
}

export type SetAuthenticated = ReturnType<typeof setAuthenticated>;

