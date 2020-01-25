import {combineReducers} from 'redux';

import searchQueryReducer from './search-query.reducer';
import authReducer from './auth.reducer';

const reducers = combineReducers({
    searchQuery: searchQueryReducer,
    auth: authReducer
});

export default reducers;

export type AppState = ReturnType<typeof reducers>
