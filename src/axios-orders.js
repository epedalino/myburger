import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-86833.firebaseio.com/'
});

export default instance;
