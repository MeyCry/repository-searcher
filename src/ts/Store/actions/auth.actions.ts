export const SET_AUTH = 'SET_AUTH';

export function setAuthenticated(isAuthenticated: boolean) {
    return {
        type: SET_AUTH,
        payload: {
            isAuthenticated,
        }
    };
}

export type SetAuthenticated = {
    type: 'SET_AUTH',
    payload: {
        isAuthenticated: boolean,
    }
};

