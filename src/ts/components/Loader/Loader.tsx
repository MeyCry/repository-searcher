import * as React from 'react';
import {AppState} from '../../Store/reducers';
import {connect} from 'react-redux';
import './style.scss';

type Props = {
    children?: React.ReactElement;
    isLoading?: boolean;
    overAll?: boolean;
}

function Loader(props: Props) {
    if (!props.isLoading) {
        return props.children || null;
    }
    const className = ['loader'];
    if (props.overAll) {
        className.push('loader--over-all')
    }

    return (
        <div className={className.join(' ')}>
            <div className="loader__spinner"/>
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    isLoading: state.searchQuery.loading,
});

export default connect(
    mapStateToProps,
)(Loader);
