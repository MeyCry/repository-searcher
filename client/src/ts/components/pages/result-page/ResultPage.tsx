import * as React from 'react';
import Search from '../../Search/Search';
import {AppState} from '../../../Store/reducers';
import {connect} from 'react-redux';
import RepositoriesList from '../../RepositoriesList/RepositoriesList';

type Props = {
    query: string;
    totalCount: number;
}

function ResultPage(props: Props) {
    const {query, totalCount} = props;
    return (
        <>
            <h1>Results: {totalCount} by name '{query}'</h1>
            <Search smallView/>
            <RepositoriesList/>
        </>
    );
}

const mapStateToProps = (state: AppState) => ({
    query: state.searchQuery.currentQueryResult,
    totalCount: state.repositories.totalCount
});

export default connect(
    mapStateToProps,
)(ResultPage);
