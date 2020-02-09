import {call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import {
    CHANGE_PAGE,
    ChangePage,
    SEARCH_ACTION_TYPE,
    searchAction,
    SearchAction,
    setCurrentSearchResultQuery,
    setLoading,
    setRepositories,
} from './actions/search-query.actions';
import {search, SearchResult} from '../helpers/search';
import {addNotification} from './actions/notify.actions';
import {AppState} from './reducers';

export function* workerSearchAction(action: SearchAction) {
    const {query, page} = action.payload;
    yield put(setLoading(true));
    try {
        const result: SearchResult = yield call(search, query, page);
        yield put(setRepositories(result, page));
        yield put(setCurrentSearchResultQuery(query));
    } catch (e) {
        yield put(addNotification(e.message));
    }
    yield put(setLoading(false));
}

export function* workerChangePage(action: ChangePage) {
    const {page} = action.payload;
    const countOfPages: number = yield select((state: AppState) => state.repositories.pages);
    const currentQueryResult: string = yield select((state: AppState) => state.searchQuery.currentQueryResult);
    if (page > countOfPages || page < 1) {
        return;
    }

    yield put(searchAction(currentQueryResult, page));
}

export function* rootSaga() {
    yield takeEvery(SEARCH_ACTION_TYPE, workerSearchAction);
    yield takeLatest(CHANGE_PAGE, workerChangePage);
}
