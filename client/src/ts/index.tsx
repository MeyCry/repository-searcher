import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

function renderReactDOM() {
    const wrapper = document.getElementById('app');

    ReactDOM.render(
        <App/>,
        wrapper,
    );

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/js/sw.js');
    }
}

document.addEventListener('DOMContentLoaded', renderReactDOM);
