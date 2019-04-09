import axios from 'axios';

export function postVendor(vendor) {
  console.log("posting vendors")
  return axios.post('http://127.0.0.1:8000/api/vendors/', vendor)
}
