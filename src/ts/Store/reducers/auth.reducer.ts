import {SET_AUTH} from '../actions/auth.actions';
import {AnyAction} from 'redux';

const defaultState = {
    isAuthenticated: true
};

export default (state = defaultState, action: AnyAction) => {
    switch (action.type) {
        case SET_AUTH:
            return {...state, isAuthenticated: action.payload.isAuthenticated};
        default:
            return state;
    }
}
