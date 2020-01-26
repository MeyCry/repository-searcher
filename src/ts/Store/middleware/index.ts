import {applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

var middleware = [ReduxThunk];

export default applyMiddleware(...middleware);
