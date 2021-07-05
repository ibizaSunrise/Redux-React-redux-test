//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux'
import { store } from "./store"


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);


//App.js

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCustomerAction, removeCustomerAction } from './store/customerReducer';

function App() {
    const dispatch = useDispatch();
    const cash = useSelector(state => state.cash.cash)
    const customers = useSelector(state => state.customers.customers);

    const addCash = (sum) => {
        dispatch({
            type: "ADD_CASH",
            payload: sum
        })
    }

    const getCash = (sum) => {
        dispatch({
            type: "GET_CASH",
            payload: sum
        })
    }

    const addCustomer = name => {
        const customer = {
            name,
            id: Date.now()
        }
        dispatch(addCustomerAction(customer))
    }

    const removeCustomer = customer => {
        dispatch(removeCustomerAction(customer.id))
    }

    return (
        <div className="App">
            <h1>{cash}</h1>
            
            <button onClick={() => addCash(Number(prompt()))}>ADD_CASH</button>
            <button onClick={() => getCash(Number(prompt()))}>GET_CASH</button>

            <button onClick={() => addCustomer(prompt())}>ADD_CUSTOMER</button>

            {customers.length > 0
                ? <div  >
                    {customers.map(customer => <p onClick={() => removeCustomer(customer)}>{customer.name}</p>)}
                </div>
                : <div>Customers absence</div>}
        </div>


    );
}

export default App;

//folder store

//cashReducer.js

const defaultState = {
    cash: 6
};

export const cashReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_CASH":
            return { ...state, cash: state.cash + action.payload }
        case "GET_CASH":
            return { ...state, cash: state.cash - action.payload }

        default:
            return state
    }
}

//customerReducer.js
const defaultState = {
    customers: []
}

const ADD_CUSTOMER = "ADD_CUSTOMER";
const REMOVE_CUSTOMER = "REMOVE_CUSTOMER";

export const customerReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_CUSTOMER:
            return { ...state, customers: [...state.customers, action.payload] }
        case REMOVE_CUSTOMER:
            return { ...state, customers: state.customers.filter(customer => customer.id !== action.payload) }

        default:
            return state
    }
}

export const addCustomerAction = payload => ({ type: ADD_CUSTOMER, payload });
export const removeCustomerAction = payload => ({ type: REMOVE_CUSTOMER, payload });

//store/index.js

import { createStore, combineReducers } from 'redux'
import { cashReducer } from './cashReducer'
import { customerReducer } from './customerReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
    cash: cashReducer,
    customers: customerReducer
})

export const store = createStore(rootReducer, composeWithDevTools())
