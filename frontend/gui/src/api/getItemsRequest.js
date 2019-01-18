import axios from 'axios';

export function fetchItems() {
  console.log("calling ItemsApi")
  return axios.get('http://127.0.0.1:8000/api/items/')
    .then((res) => res.data)
    
}
