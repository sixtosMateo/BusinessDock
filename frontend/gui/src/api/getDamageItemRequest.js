import axios from 'axios';

export function fetchDamageItems() {
  console.log("calling DamageItemsApi")
  return axios.get('http://127.0.0.1:8000/api/damageItem/')
    .then((res) => res.data)
}
