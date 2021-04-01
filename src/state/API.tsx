import axios from "axios";
import { REACT_APP_BACKEND_API_URL } from "../config";


export const fetchGroupAPI = async (token: string) => {
  const query: string = window.location.search.substring(1);
  const query_list: string[] = query.split('&');
  const query_data: any = {};

  for (var i = 0; i < query_list.length; i++) {
    const pair: string[] = query_list[i].split('=');
    query_data[pair[0]] = pair[1];
  }


  if (query_data.hasOwnProperty('group')) {
    const URL = `${REACT_APP_BACKEND_API_URL}/joingroup/${query_data.group}`;
    const response = await axios.post(
      URL,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  
  const response = await axios.get(
    `${REACT_APP_BACKEND_API_URL}/getgroup`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const groupData = await response.data; //convert to json

  return groupData
};