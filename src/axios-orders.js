import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-ver1.firebaseio.com/'
});

export default instance;
