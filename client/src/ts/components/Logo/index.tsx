import * as React from 'react';
import {Link} from 'react-router-dom';
import './style.scss'

function Logo() {
    return (
        <Link to='/' className="logo">
            <img className="logo__image" src="/images/logo.svg" alt="better me logo"/>
        </Link>
    );
}

export default Logo;
