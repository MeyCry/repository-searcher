import * as React from 'react';
import {ReactElement} from 'react';
import './style.scss'
export default function (props: { children: ReactElement }) {
    const {children} = props;
    return (
        <main className="content">
            <div className="content__inner">
                {children}
            </div>
        </main>
    );
}
