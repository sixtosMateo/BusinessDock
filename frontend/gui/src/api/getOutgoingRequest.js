import axios from 'axios';

export function fetchOutgoings() {

  return axios.get('http://127.0.0.1:8000/api/outgoingTransaction/')
    .then((res) => res.json())
}
