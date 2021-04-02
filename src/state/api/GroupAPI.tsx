import axios from "axios";
import { REACT_APP_BACKEND_API_URL } from "../../config";


export const fetchGroupAPI = async (token: string) => {
  const query: string = window.location.search.substring(1);
  const query_list: string[] = query.split('&');
  const query_data: any = {};

  for (var i = 0; i < query_list.length; i++) {
    const pair: string[] = query_list[i].split('=');
    query_data[pair[0]] = pair[1];
  }


  var response;
  if (query_data.hasOwnProperty('group')) {
    response = await axios.post(
      `${REACT_APP_BACKEND_API_URL}/joingroup/${query_data.group}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } else {
    response = await axios.get(
      `${REACT_APP_BACKEND_API_URL}/getgroup`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  
  const groupData = await response.data; //convert to json
  return groupData
};

export const createGroupAPI = async (token: string) => {
  const response = await axios.post(
    `${REACT_APP_BACKEND_API_URL}/leavegroup`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const groupData = await response.data; //convert to json
  return groupData
}

export const leaveGroupAPI = async (token: string) => {
  const response = await axios.post(
    `${REACT_APP_BACKEND_API_URL}/leavegroup`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  
  const groupData = await response.data; //convert to json
  return groupData
}