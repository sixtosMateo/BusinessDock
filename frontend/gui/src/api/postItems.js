import axios from 'axios';

export function postItem(item) {
  console.log("posting Items")
  return axios.post('http://127.0.0.1:8000/api/items/', item)

}
