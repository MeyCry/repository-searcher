export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION';

export type AddNotification = {
    type: typeof ADD_NOTIFICATION,
    payload: {
        text: string,
    },
};

export type DeleteNotification = {
    type: typeof DELETE_NOTIFICATION,
    payload: {
        id: string,
    },
};

export function addNotification(text: string): AddNotification {
    return {
        type: ADD_NOTIFICATION,
        payload: {
            text,
        },
    };
}

export function deleteNotification(id: string): DeleteNotification {
    return {
        type: DELETE_NOTIFICATION,
        payload: {
            id,
        },
    };
}
