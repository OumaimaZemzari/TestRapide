import React from 'react';
import {render} from 'react-dom';
import '../assets/index.css';
import CalculatorApp from './CalculatePage';
import calculatorReducer from '../reducers/Calcul.reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

let store = createStore(calculatorReducer);

render(
    <Provider store={store}>
        <CalculatorApp />
    </Provider>
    , document.getElementById('root'));