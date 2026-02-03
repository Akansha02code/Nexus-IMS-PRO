import api from './api';

const getAllEstimates = () => api.get('/estimates');
const createEstimate = (data) => api.post('/estimates', data);
const updateStatus = (id, status) => api.patch(`/estimates/${id}/status?status=${status}`);
const getEstimateById = (id) => api.get(`/estimates/${id}`);

export default { getAllEstimates, createEstimate, updateStatus, getEstimateById };
