import * as React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../Store/reducers';
import {AnyAction, Dispatch} from 'redux';
import NotificationModel from '../../helpers/notificationModel';
import {deleteNotification} from '../../Store/actions/notify.actions';
import './style.scss'

type Props = {
    notifications: Array<NotificationModel>;
    close: (id: string) => void;
}

class Notifications extends React.Component<Props> {
    render() {
        const {notifications} = this.props;

        const list = notifications.map((notification) => {
            const {id, message} = notification;
            return (
                <div className="notifications__item" key={id}>
                    <button
                        className="notifications__close"
                        onClick={() => this.props.close(id)}
                        aria-label="close">
                        &times;
                    </button>
                    <img width={20} height={20} src="/images/iconfinder-error.svg" alt="error" className="notifications__icon"/>
                    <p className="notifications__text">{message}</p>
                </div>
            );
        });

        return (
            <div className="notifications">
                {list}
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    notifications: state.notify.notifications,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    close: (id: string) => {
        dispatch(deleteNotification(id));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Notifications);
