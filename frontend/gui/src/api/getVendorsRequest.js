import axios from 'axios';

export function fetchVendors() {
  console.log("calling VendorsApi")
  return axios.get('http://127.0.0.1:8000/api/vendors/')
    .then((res) => res.data)
}
