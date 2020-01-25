import * as React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import store from './Store';
import Routes from './routes';

export default function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="container">
                    <Routes/>
                </div>
            </Router>
        </Provider>
    );
}
