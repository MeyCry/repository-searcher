import {createStore} from 'redux';
import Reducers from './reducers';
import Middleware from './middleware';

const store = createStore(
    Reducers,
    Middleware,
);

export default store;
