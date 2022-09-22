import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:8080/' });

API.interceptors.request.use((req) => {
  req.headers = {
    "content-type": "application/json"
  };
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${sessionStorage.getItem('token')}`;
  }

  return req;
});

export const get = async (path, parmas = {}) => {
  try {
    console.log(path)
    let response = await API.get(path, parmas);
    return response.data
  } catch (e) {
    throw e
  }
};

export const post = async (path, data) => {
  try {
    let response = await API.post(path, data);
    return response.data
  } catch (e) {
    throw e
  }
};


// export const post = (data) => API.post(paths.AUTH, data);
