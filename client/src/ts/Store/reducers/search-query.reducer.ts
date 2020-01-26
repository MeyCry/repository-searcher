import {CHANGE_SEARCH_QUERY, CHANGE_CURRENT_SEARCH_RESULT_QUERY} from '../actions/search-query.actions';
import {AnyAction} from 'redux';

const defaultState = {
    query: '',
    currentQueryResult: '',
};

export default (state = defaultState, action: AnyAction) => {
    switch (action.type) {
        case CHANGE_SEARCH_QUERY:
            return {...state, query: action.payload.query};
        case CHANGE_CURRENT_SEARCH_RESULT_QUERY:
            return {...state, currentQueryResult: action.payload.query};
        default:
            return state;
    }
}
