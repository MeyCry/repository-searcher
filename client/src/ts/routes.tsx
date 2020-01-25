import * as React from 'react';
import {AppState} from './Store/reducers';
import {connect} from 'react-redux';
import {Switch, Route, Redirect} from 'react-router';
import MainPage from './components/pages/main-page/MainPage';
import ResultPage from './components/pages/result-page/ResultPage';


type Props = {
    isAuthenticated: boolean
}
function Routes(props: Props) {
    return (
        <Switch>
            <Route path="/" component={MainPage} exact/>
            <Route path='/results/:pageId' component={ResultPage}/>
            <Redirect to='/'/>
        </Switch>
    );
}

const mapStateToProps = (state: AppState) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
)(Routes);
