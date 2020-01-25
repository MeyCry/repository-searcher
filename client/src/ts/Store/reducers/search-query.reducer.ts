import {CHANGE_SEARCH_QUERY} from '../actions/search-query.action';
import {AnyAction} from 'redux';

const defaultState = '';

export default (state = defaultState, action: AnyAction) => {
    switch (action.type) {
        case CHANGE_SEARCH_QUERY:
            return action.payload.query;
        default:
            return state;
    }
}
