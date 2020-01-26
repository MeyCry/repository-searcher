import * as React from 'react';
import Logo from '../Logo';
import './style.scss'

function Header() {
    return (
        <header className="head">
            <div className="head__inner">
                <Logo/>
                <p className="head__message">
                    GitHub Repository Searcher
                </p>
                <div className="head__links">
                    <a className="head__link head__link--github" href="https://github.com/MeyCry/repository-searcher">
                        GitHub
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;
