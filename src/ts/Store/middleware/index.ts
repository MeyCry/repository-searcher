import {applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();
var middleware = [sagaMiddleware];

export default applyMiddleware(...middleware);
