import {defaultAxiosInstance} from "./index";
import {createFormData} from "./apiUtils";

export const getBoard = async () => {
  return await defaultAxiosInstance.get('/notice/get_inquiry.php');
};
export const getBoardDetail = async (seq) => {
  return await defaultAxiosInstance.get(`/notice/get_inquiry.php`, {params: {seq}});
};

export const postInquiry = async (payload) => {
  const requestParams = createFormData({...payload, token: "eyJhbGciOiJzaGEyNTYiLCJ0eXAiOiJKV1QifS57ImV4cCI6MTY3OTk4NDIzMywiaWF0IjoxNjc5ODk3ODMzLCJpZCI6IjUwNSIsImVtYWlsIjoiWW1GbFkyaHBaMmt4UUc1aGRHVXVZMjl0IiwidXNlcl9zZXEiOiIyMjAwMDUwNSJ9LmNhNmJlZDZhMjZkZjUxMjI5NDNiOWZiN2RlY2I1MmEzNzJjYzRjMTM2MjRmODYxMjE2ZTk3NGQyOTJmYWFjMWU=",})
  return await defaultAxiosInstance.post('notice/insert_inquiry.php', requestParams);
};

export const updateInquiry = async (payload) => {
  const requestParams = createFormData({...payload, token: "eyJhbGciOiJzaGEyNTYiLCJ0eXAiOiJKV1QifS57ImV4cCI6MTY3OTk4NDIzMywiaWF0IjoxNjc5ODk3ODMzLCJpZCI6IjUwNSIsImVtYWlsIjoiWW1GbFkyaHBaMmt4UUc1aGRHVXVZMjl0IiwidXNlcl9zZXEiOiIyMjAwMDUwNSJ9LmNhNmJlZDZhMjZkZjUxMjI5NDNiOWZiN2RlY2I1MmEzNzJjYzRjMTM2MjRmODYxMjE2ZTk3NGQyOTJmYWFjMWU=",})
  return await defaultAxiosInstance.post('notice/update_inquiry.php', requestParams);
};

export const deleteInquiry = async (seq) => {
  const requestParams = createFormData({seq})
  return await defaultAxiosInstance.post('notice/delete_inquiry.php', requestParams);
};
