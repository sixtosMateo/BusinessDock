import axios from 'axios';

export function postOutgoing(props, state) {
  console.log("posting Outgoing")
  const outgoing ={
    employeeId: props.employee.employeeId,
    storeId: props.employee.storeId,
    tax: state.cartTax,
    subtotal: state.cartSubtotal,
    total: state.cartTotal
  }
  return axios.post('http://127.0.0.1:8000/api/outgoingTransaction/', outgoing)
}
