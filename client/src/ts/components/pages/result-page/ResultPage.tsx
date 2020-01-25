import * as React from 'react';
import Search from '../../Search/Search';
import {AppState} from '../../../Store/reducers';
import {connect} from 'react-redux';

type Props = {
    query: string
}

function ResultPage(props: Props) {
    const {query} = props;
    return (
        <>
            <h1>Results: '{query}'</h1>
            <Search smallView/>
        </>
    );
}

const mapStateToProps = (state: AppState) => ({
    query: state.searchQuery
});

export default connect(
    mapStateToProps,
)(ResultPage);
