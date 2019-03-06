import axios from 'axios';

export function fetchCurrentUser() {
  let token =localStorage.getItem('token')
  let headers = {'Authorization': `Token ${token} `}
  return axios.get('http://127.0.0.1:8000/rest-auth/user/', {headers:headers})
    .then((res) =>{
      localStorage.setItem('currentUser', JSON.stringify(res.data))

      return res.data
    })

}
