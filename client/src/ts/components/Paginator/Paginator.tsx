import * as React from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../Store/reducers';
import './style.scss';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {changePage} from '../../Store/actions/search-query.actions';

type CellProps = {
    number: number;
    currentPage: number;
    handleClick: (page: number) => void
};
function Cell(props: CellProps) {
    const {
        number,
        currentPage,
        handleClick,
    } = props;

    const className = ['paginator__button'];
    if (number === currentPage) {
        className.push('paginator__button--active');
    }

    return (
        <button onClick={() => handleClick(number)} className={className.join(' ')}>
            {number}
        </button>
    );
}

function Separator() {
    return <span className="paginator__separator">...</span>;
}

type Props = {
    totalCount: number;
    pages: number;
    currentPage: number;
    marginPagesDisplayed: number;

    changePage: (page: number) => void;
}

class Paginator extends React.Component<Props> {
    createButton(index: number, current: number) {
        // for this task it ok use index as a key because we don't change items, we only rerender new list
        return <Cell
            handleClick={this.setPage}
            key={index}
            number={index + 1}
            currentPage={current}/>;
    };

    prev = () => {
        this.setPage(this.props.currentPage - 1);
    };
    next = () => {
        this.setPage(this.props.currentPage + 1);
    };
    setPage = (page: number) => {
        this.props.changePage(page);
    };

    render() {
        const {pages, currentPage, marginPagesDisplayed} = this.props;
        const pageRangeDisplayed = 5;
        if (pages <= 1) {
            return false;
        }

        const buttonsList = [];

        if (pages <= pageRangeDisplayed) {
            for (let i = 0; i < pages; i++) {
                buttonsList.push(this.createButton(i, currentPage));
            }
        } else {
            const halfOfRange = pageRangeDisplayed / 2;

            let leftSide = Math.round(halfOfRange);
            let rightSide = pageRangeDisplayed - leftSide;

            if (currentPage > pages - halfOfRange) {
                rightSide = pages - currentPage;
                leftSide = pageRangeDisplayed - rightSide;
            } else if (currentPage < halfOfRange) {
                leftSide = currentPage;
                rightSide = pageRangeDisplayed - leftSide;
            }

            let breakView;
            for (let index = 0; index < pages; index++) {
                let page = index + 1;

                // If the page index is lower than the margin defined,
                // the page has to be displayed on the left side of
                // the pagination.
                if (page <= marginPagesDisplayed) {
                    buttonsList.push(this.createButton(index, currentPage));
                    continue;
                }

                // If the page index is greater than the page count
                // minus the margin defined, the page has to be
                // displayed on the right side of the pagination.
                if (page > pages - marginPagesDisplayed) {
                    buttonsList.push(this.createButton(index, currentPage));
                    continue;
                }

                // If the page index is near the selected page index
                // and inside the defined range (pageRangeDisplayed)
                // we have to display it (it will create the center
                // part of the pagination).
                if (index >= currentPage - leftSide && index <= currentPage + rightSide) {
                    buttonsList.push(this.createButton(index, currentPage));
                    continue;
                }

                if (buttonsList[buttonsList.length - 1] !== breakView) {
                    breakView = <Separator key={index}/>;
                    buttonsList.push(breakView);
                }
            }
        }

        return (
            <div className="paginator">
                <div className="paginator__inner">
                    <button className="paginator__button" onClick={this.prev}>
                        &#x2190; Previous
                    </button>
                    {buttonsList}
                    <button className="paginator__button" onClick={this.next}>
                        Next &#x2192;
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    repositories: state.repositories.repositories,
    totalCount: state.repositories.totalCount,
    pages: state.repositories.pages,
    currentPage: state.repositories.currentPage,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, AnyAction>) => ({
    changePage: (page: number) => {
        dispatch(changePage(page));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Paginator);
