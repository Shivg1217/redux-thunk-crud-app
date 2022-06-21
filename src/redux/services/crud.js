import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL;

const fetchList = async (data) => {
  let res = await axios.get(`${baseURL}${data}`).then((response) => {
    return response;
  });
  return res;
};

const delPost = async (data) => {
  let res = await axios.delete(`${baseURL}${data}`).then((response) => {
    alert("Post deleted!");
    return response;
  });
  return res;
};

const createPost = async (data) => {
  let res = await axios
    .post(`${baseURL}posts`, { ...data })
    .then((response) => {
      return response;
    });
  return res;
};

const updatePost = async (data) => {
  let id = data.id;
  delete data.id;
  let res = await axios
    .put(`${baseURL}posts/${id}`, { ...data })
    .then((response) => {
      return response;
    });
  return { response: res, data: data, id: id };
};

export const crud = {
  fetchList,
  delPost,
  createPost,
  updatePost,
};
