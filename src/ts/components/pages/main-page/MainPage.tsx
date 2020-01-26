import * as React from 'react';
import './style.scss';
import Search from '../../Search/Search';
import Loader from '../../Loader/Loader';

export default function () {
    return (
        <Loader>
            <Search/>
        </Loader>
    );
}
