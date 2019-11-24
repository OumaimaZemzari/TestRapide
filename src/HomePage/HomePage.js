import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CalculatorApp  from '../CalculatePage/CalculatePage';
import calculatorReducer from '../reducers/Calcul.reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { userActions } from '../actions/index';
let store = createStore(calculatorReducer);

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }
    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1>  <p>
                <Link to="/login">Logout</Link>
            </p>
                <Provider store={store}>
                    <CalculatorApp />
                </Provider>

                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}


            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };