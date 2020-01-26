import {combineReducers} from 'redux';

import searchQueryReducer from './search-query.reducer';
import authReducer from './auth.reducer';
import repositoriesReducer from './repositories.reducer';
import notifyReducer from './notify.reducer';

const reducers = combineReducers({
    searchQuery: searchQueryReducer,
    auth: authReducer,
    repositories: repositoriesReducer,
    notify: notifyReducer,
});

export default reducers;

export type AppState = ReturnType<typeof reducers>;
