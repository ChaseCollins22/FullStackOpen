import axios from "axios";

const baseURL = "http://localhost:3001/api/persons";

const getAllContacts = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const createContact = (newContact) => {
  const request = axios.post(baseURL, newContact);
  return request.then((newContact) => newContact.data);
};

const deleteContact = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then((response) => response.data);
};

const updateContact = (id, newContact) => {
  const request = axios.put(`${baseURL}/${id}`, newContact);
  return request.then((response) => response.data);
};

export default { getAllContacts, createContact, deleteContact, updateContact };
