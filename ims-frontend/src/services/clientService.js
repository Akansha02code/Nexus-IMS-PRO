import api from './api';

const getAllClients = () => api.get('/clients');
const createClient = (data) => api.post('/clients', data);
const getClientById = (id) => api.get(`/clients/${id}`);

export default { getAllClients, createClient, getClientById };
