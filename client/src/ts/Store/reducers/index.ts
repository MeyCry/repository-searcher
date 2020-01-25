import {combineReducers} from 'redux';

import searchQueryReducer from './search-query.reducer';
import authReducer from './auth.reducer';
import repositoriesReducer from './repositories.reducer';

const reducers = combineReducers({
    searchQuery: searchQueryReducer,
    auth: authReducer,
    repositories: repositoriesReducer,
});

export default reducers;

export type AppState = ReturnType<typeof reducers>;
