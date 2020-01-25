import {SET_REPOSITORIES_RESULT} from '../actions/search-query.action';
import {AnyAction} from 'redux';
import RepositoryModel from '../../helpers/repositoryModel';

type State = {
    totalCount: number;
    repositories: Array<RepositoryModel>;
}
const defaultState: State = {
    repositories: [],
    totalCount: 0
};

export default (state: State = defaultState, action: AnyAction) => {
    switch (action.type) {
        case SET_REPOSITORIES_RESULT:
            return {
                totalCount: action.payload.totalCount,
                repositories: action.payload.items
            };
        default:
            return state;
    }
}
