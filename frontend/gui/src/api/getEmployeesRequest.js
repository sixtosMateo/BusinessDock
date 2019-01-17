import axios from 'axios';

export function fetchEmployees() {

  return axios.get('http://127.0.0.1:8000/api/employees/')
    .then((res) => res.data)
}
