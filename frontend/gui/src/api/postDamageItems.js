import axios from 'axios';

export function postDamageItem(damageItem) {
  console.log("posting damage item")
  return axios.post('http://127.0.0.1:8000/api/damageItem/', damageItem)
}
