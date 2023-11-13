import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';

const endpoint = isProduction ? '' : 'http://localhost:4000';

export const api = axios.create({
  baseURL: endpoint,
  headers: {
    'Content-Type': 'application/json',
  },
});
