import * as React from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import history from './history'
import store from './Store';
import Routes from './routes';
import Header from './components/Header/Header';
import Content from './components/Content/Content';
import Notifications from './components/Notifications/Notifications';

export default function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Notifications/>
                <div className="container">
                    <Header/>
                    <Content>
                        <Routes/>
                    </Content>
                </div>
            </Router>
        </Provider>
    );
}
