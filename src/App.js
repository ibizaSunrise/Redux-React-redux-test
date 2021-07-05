import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCustomers } from './asyncActions/customers';
import { addCustomerAction, removeCustomerAction } from './store/customerReducer';
import { addCashAction, getCashAction } from './store/cashReducer';

function App() {
  const dispatch = useDispatch();
  const cash = useSelector(state => state.cash.cash)
  const customers = useSelector(state => state.customers.customers);


  function isNum(n) {
    if (toString(n).replace(/\s/g, '').length === 0 || isNaN(n)) {
      return false
    }
    return true
  }

  const addCash = (sum) => {
    if (!isNum(sum)) {
      alert('Нужно писать число!');
    } else {
      dispatch(addCashAction(sum))
    }

  }

  const getCash = (sum) => {
    if (!isNum(sum)) {
      alert('Нужно писать число!');
    } else {
      dispatch(getCashAction(sum))
    }
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
      <button onClick={() => dispatch(fetchCustomers())}>ADD_ALL_CUSTOMERS</button>

      {customers.length > 0
        ? <div  >
          {customers.map(customer => <p onClick={() => removeCustomer(customer)}>{customer.name}</p>)}
        </div>
        : <div>Customers absence</div>}
    </div>


  );
}

export default App;
