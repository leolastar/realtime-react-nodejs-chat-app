import axios from "axios";
const API = process.env.REACT_APP_API_URL || "http://localhost:4000";

// user api
export const getallusers = (token: string) => {
  return axios.get(`${API}/users/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// auth api
export const signup = (data: any) => axios.post(`${API}/auth/signup`, data);
export const login = (data: any) => axios.post(`${API}/auth/login`, data);

// conversation api
export const getUserConversations = (id: string, token: string) => {
  console.log("getUserConversations token", token);
  return axios.get(`${API}/conversations/conversations/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const createConversation = (data: any, token: string) => {
  return axios.post(`${API}/conversations/conversation`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// message api
export const getMessages = (id: string, token: string) => {
  return axios.post(
    `${API}/messages/getMessages`,
    {
      conversationId: id,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
export const createMessage = (data: any, token: string) => {
  return axios.post(`${API}/messages/create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
