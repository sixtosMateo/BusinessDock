import axios from 'axios';

export function fetchEmployees() {
  console.log("calling EmployeesApi")
  return axios.get('http://127.0.0.1:8000/api/employees/')
    .then((res) => res.data)
    
}
