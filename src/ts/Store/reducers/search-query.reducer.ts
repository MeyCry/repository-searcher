import {
    CHANGE_SEARCH_QUERY,
    CHANGE_CURRENT_SEARCH_RESULT_QUERY,
    SET_LOADING,
} from '../actions/search-query.actions';
import {AnyAction} from 'redux';

const defaultState = {
    query: '',
    currentQueryResult: '',
    loading: false,
};

export default (state = defaultState, action: AnyAction) => {
    switch (action.type) {
        case CHANGE_SEARCH_QUERY:
            return {...state, query: action.payload.query};
        case CHANGE_CURRENT_SEARCH_RESULT_QUERY:
            return {...state, currentQueryResult: action.payload.query};
        case SET_LOADING:
            return {...state, loading: action.payload.loading};
        default:
            return state;
    }
}
