import axios from 'axios';

export function fetchItems() {

  return axios.get('http://127.0.0.1:8000/api/items/')
    .then((res) => res.json())
}
