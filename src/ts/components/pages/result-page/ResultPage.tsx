import * as React from 'react';
import {connect} from 'react-redux';
import Search from '../../Search/Search';
import {AppState} from '../../../Store/reducers';
import RepositoriesList from '../../RepositoriesList/RepositoriesList';
import Paginator from '../../Paginator/Paginator';
import Loader from '../../Loader/Loader';

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
            <Paginator marginPagesDisplayed={2}/>
            <Loader overAll></Loader>
            <RepositoriesList/>

            <Paginator marginPagesDisplayed={2}/>
        </>
    );
}

const mapStateToProps = (state: AppState) => ({
    query: state.searchQuery.currentQueryResult,
    totalCount: state.repositories.totalCount,
});

export default connect(
    mapStateToProps,
)(ResultPage);
