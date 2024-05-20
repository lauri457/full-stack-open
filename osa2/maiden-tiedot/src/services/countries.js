import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
  return axios.get(`${baseUrl}/all`).then((request) => request.data);
};

const getOne = (name) => {
  return axios.get(`${baseUrl}/name/${name}`).then((request) => request.data);
};

export default { getAll, getOne };
