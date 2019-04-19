import { useState, useEffect } from 'react';
import Axios from 'axios';

const url = 'http://localhost:8080';

export default function Get(endpoint) {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get(`${url}/${endpoint}`);
      setResponse(response);
    }

    fetchData();
  }, [endpoint]);

  return response;
}

export async function Post(endpoint, data) {
  return await Axios.post(`${url}/${endpoint}`, data);
}

export function GetValue(obj) {
  return obj ? obj.data : [];
}
