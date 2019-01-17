import axios from 'axios';

export function fetchDamageItems() {

  return axios.get('http://127.0.0.1:8000/api/damageItem/')
    .then((res) => res.data)
}
