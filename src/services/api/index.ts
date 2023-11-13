import axios from 'axios';

const endpoint = 'http://localhost:4000';

export const api = axios.create({
  baseURL: endpoint,
  headers: {
    'Content-Type': 'application/json',
  },
});
