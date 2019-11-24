import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './assets/index.css';

import { store } from './helpers/index';
import { App } from './App/index';

// setup fake backend
import { configureFakeBackend } from './helpers/index';
configureFakeBackend();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);