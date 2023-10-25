import axios from "axios";

const baseURL = "https://studies.cs.helsinki.fi/restcountries/api";

const getAllCountries = () => {
  const request = axios.get(`${baseURL}/all`);
  return request.then((response) => response.data);
};

const getCountryByName = (countryName) => {
  const request = axios.get(`${baseURL}/name/${countryName}`);
  return request.then((response) => response.data);
};

export default { getCountryByName, getAllCountries };
