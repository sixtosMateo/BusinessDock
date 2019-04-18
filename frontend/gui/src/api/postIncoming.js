import axios from 'axios';

export function postIncoming(props, state) {
  console.log("posting Incoming")
  const incoming ={
    employeeId: props.employee.employeeId,
    vendorId: state.vendorId,
    tax: state.tax,
    subtotal: state.subTotal,
    total: state.total
  }
  return axios.post('http://127.0.0.1:8000/api/incomingTransaction/', incoming)
}
