import { useState, useEffect } from "react";
import Axios from "axios";

const url = "http://localhost:8080";

export default function GetData(endpoint) {
  const [response, setResponse] = useState({ data: [] });

  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get(`${url}/${endpoint}`);
      setResponse(response);
    }

    fetchData();
  }, [endpoint]);

  return response;
}

export async function SendData(endpoint, data) {
  return await Axios.post(`${url}/${endpoint}`, data);
}
