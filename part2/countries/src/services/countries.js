import axios from "axios";

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api";

const getAllCountries = () => {
  const request = axios.get(`${baseURL}/all`);
  return request.then((response) => response.data);
};

const getCountryByName = (countryName) => {
  axios.get(`${baseURL}/${countryName}`).then((response) => console.log(response.data));
};

export default { getCountryByName, getAllCountries };
