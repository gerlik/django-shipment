import axios from 'axios';

const API_URL = 'http://localhost:8000/api/shipments/';
const TOKEN_URL = 'http://localhost:8000/api/token/';

const getShipments = (token) => axios.get(API_URL, {headers: {Authorization: `Bearer ${token}`}});
const createShipment = (data, token) => axios.post(API_URL, data, {headers: {Authorization: `Bearer ${token}`}});
const updateShipment = (id, data, token) => axios.put(`${API_URL}${id}/`, data, {headers: {Authorization: `Bearer ${token}`}});
const deleteShipment = (id, token) => axios.delete(`${API_URL}${id}/`, {headers: {Authorization: `Bearer ${token}`}});
const obtainToken = (data) => axios.post(TOKEN_URL, data);

export {getShipments, createShipment, updateShipment, deleteShipment, obtainToken};
