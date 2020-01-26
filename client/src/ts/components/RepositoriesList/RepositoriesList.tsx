import * as React from 'react';
import {AppState} from '../../Store/reducers';
import {connect} from 'react-redux';
import RepositoryModel from '../../helpers/repositoryModel';
import './style.scss';
import ListItem from '../ListItem/ListItem';

type Props = {
    repositories: Array<RepositoryModel>
};

class RepositoriesList extends React.PureComponent<Props> {
    render() {
        const {repositories} = this.props;

        const list = repositories.map((item) => {
            return (
                <li className="repositories-list__item" key={item.id}>
                    <ListItem item={item}/>
                </li>
            );
        });

        return (
            <ul className="repositories-list">
                {list}
            </ul>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    repositories: state.repositories.repositories
});

export default connect(
    mapStateToProps,
)(RepositoriesList);
