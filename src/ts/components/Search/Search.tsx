import * as React from 'react';
import {AppState} from '../../Store/reducers';
import {Dispatch} from 'redux';
import {searchAction, SetSearchQuery, setSearchQuery} from '../../Store/actions/search-query.actions';
import {connect} from 'react-redux';
import './style.scss';

type Props = {
    query: string,
    setSearchQuery: (query: string) => void;
    smallView?: boolean;
    search: (query: string) => void;
};

class Search extends React.Component<Props> {
    handleSearchChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        this.props.setSearchQuery(ev.target.value);
    };

    handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        this.props.search(this.props.query);
    };

    render() {
        const {query, smallView} = this.props;
        const searchClassName = ['search'];
        if (smallView) {
            searchClassName.push('search--small-view');
        }
        return (
            <form
                className={searchClassName.join(' ')}
                onSubmit={this.handleSubmit}>
                <label className="search__field">
                    <input
                        onChange={this.handleSearchChange}
                        value={query}
                        type="text"
                        placeholder="Search repository by name..."
                        className="search__input"/>
                </label>
                <button className="search__button">Search</button>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setSearchQuery: (query: string) => {
        dispatch(setSearchQuery(query));
    },
    search: (query: string) => {
        dispatch(searchAction(query));
    }
});

const mapStateToProps = (state: AppState) => ({
    query: state.searchQuery.query
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Search);
