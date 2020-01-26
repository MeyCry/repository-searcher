import NotificationModel from '../../helpers/notificationModel';
import {
    ADD_NOTIFICATION,
    AddNotification,
    DELETE_NOTIFICATION,
    DeleteNotification,
} from '../actions/notify.actions';

type State = {
    notifications: Array<NotificationModel>
}

const defaultState: State = {
    notifications: [],
};

type ActionType = AddNotification | DeleteNotification;

export default (state = defaultState, action: ActionType) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return {
                ...state,
                notifications: state
                    .notifications
                    .concat([
                        new NotificationModel(action.payload.text)
                    ]),
            };
        case DELETE_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications
                    .filter((item) => item.id !== action.payload.id),
            };
        default:
            return state;
    }
}
