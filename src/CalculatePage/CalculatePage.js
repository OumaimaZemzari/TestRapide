import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCalculation, clearCalculation } from '../actions/calcul.action';
import CalcButton from '../components/CalcButton';

class CalculatorComponent extends Component {

    componentDidMount() {
        // Force scroll on the display
        // I do this on mount in case reducer is already populated
        this._forceScrollOnDisplay();
    }

    componentDidUpdate() {
        // Force scroll on the display
        // this function gets called on component update
        this._forceScrollOnDisplay();
    }
    calcul(){
        document.getElementById("resultDisplay").innerHTML = this.props.result
    }
    netoyer(){
        document.getElementById("resultDisplay").innerHTML = '';
        this.props.clearCalculation();

    }

    // Replace the operator chars add a span for styling
    // and replace division and multiplication symbols
    _replaceChars(value) {
        value = value.join("");
        value = value.replace(/\//g, '<span class="operatorStyle">/</span>');
        value = value.replace(/\*/g, '<span class="operatorStyle">×</span>');
        value = value.replace(/\+/g, '<span class="operatorStyle">+</span>');
        value = value.replace(/-/g, '<span class="operatorStyle">-</span>');
        return value;
    }

    _forceScrollOnDisplay() {
        // Force scroll on div, put a value in here
        // instead of calculating the offset
        // This keeps the latest numbers in display
        this.refs.calculationDisplay.scrollLeft = 10000;
        this.refs.resultDisplay.scrollLeft = 10000;
    }

    render() {
        return (
            <div className='calculator'>
                <div className='calculator-results'>
                    <div  ref='calculationDisplay' className='calculationDisplay'

                          dangerouslySetInnerHTML={{ __html:this.props.calculation.length
                                  ? this._replaceChars(this.props.calculation) : 0 }} />
                    <div id="resultDisplay" ref='resultDisplay' className='resultDisplay'></div>
                </div>
                <div className='calculator-inputs-row'>
                    <CalcButton value={7} />
                    <CalcButton value={8} />
                    <CalcButton value={9} />
                    <button className='ce'  onClick={() =>this.netoyer()}>CE</button>
                    <button className='c'  onClick={() => this.netoyer()}>C</button>

                </div>

                <div className='calculator-inputs-row'>
                    <CalcButton value={4} />
                    <CalcButton value={5} />
                    <CalcButton value={6} />
                    <CalcButton value="/" htmlCode="8260" additionalClass="operator" />
                    <CalcButton value='*' htmlCode="215" additionalClass="operator" />
                </div>
                <div className='calculator-inputs-row'>
                    <CalcButton value={1} />
                    <CalcButton value={2} />
                    <CalcButton value={3} />
                    <CalcButton value='-' htmlCode="8722" additionalClass="operator" />
                    <CalcButton value='+' htmlCode="43" additionalClass="operator" />
                </div>
                <div className='calculator-inputs-row'>
                    <CalcButton value={0} additionalClass="zero" />
                    <CalcButton value='.' htmlCode="46" additionalClass="operator" />
                    <button className='result'onClick={() => this.calcul()}>=</button>

                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateCalculation: (inputValue, currentState, currentResult) => dispatch(updateCalculation(inputValue, currentState, currentResult)),
    clearCalculation: () => dispatch(clearCalculation())
});

const mapStateToProps = (state) => ({
    calculation: state.calculation,
    result: state.result
});

export default connect(mapStateToProps, mapDispatchToProps)(CalculatorComponent);
