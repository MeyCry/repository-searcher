import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

function renderReactDOM() {
    const wrapper = document.getElementById('app');

    ReactDOM.render(
        <App/>,
        wrapper,
    );
}

document.addEventListener('DOMContentLoaded', renderReactDOM);
