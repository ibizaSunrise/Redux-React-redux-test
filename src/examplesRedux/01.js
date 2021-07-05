//Create

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const defaultState = {
  cash: 6
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_CASH":
      return { ...state, cash: state.cash + action.payload }
    case "GET_CASH":
      return { ...state, cash: state.cash - action.payload }

    default:
      return state
  }
}
const store = createStore(reducer)


ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


//Usage

import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

function App() {
 const dispatch = useDispatch();
 const cash = useSelector(state => state.cash)

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
  return (
    <div className="App">
     <h1>{cash}</h1>
     <button onClick = {() => addCash(Number(prompt()))}>ADD_CASH</button>
     <button onClick = {() => getCash(Number(prompt()))}>GET_CASH</button>
    </div>
  );
}

export default App;
