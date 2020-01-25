import * as React from 'react';
import {AppState} from './Store/reducers';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router';
import MainPage from './components/pages/main-page/MainPage';

function Routes() {
    return (
        <Switch>
            <Route path="/" exact>
                <MainPage/>
            </Route>
            <Redirect to='/'/>
        </Switch>
    );
}

const mapStateToProps = (state: AppState) => ({

});

export default connect(
    mapStateToProps,
)(Routes);
