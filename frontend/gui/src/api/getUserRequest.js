import axios from 'axios';

export function fetchUsers() {
  console.log("calling UsersApi")
  return axios.get('http://127.0.0.1:8000/api/users/')
    .then((res) => res.data)

}
