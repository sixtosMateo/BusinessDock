import axios from 'axios';

export function fetchIncomings() {

  return axios.get('http://127.0.0.1:8000/api/incomingTransaction/')
    .then((res) => res.data)
}
