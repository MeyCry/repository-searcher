import {createStore} from 'redux';
import Reducers from './reducers';
import Middleware, {sagaMiddleware} from './middleware';
import {rootSaga} from './sagas';

const store = createStore(
    Reducers,
    Middleware,
);

sagaMiddleware.run(rootSaga);

export default store;
