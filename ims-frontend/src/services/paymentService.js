import api from './api';

const getAllPayments = () => api.get('/payments');
const recordPayment = (data) => api.post('/payments', data);
const updateStatus = (id, status) => api.patch(`/payments/${id}/status?status=${status}`);

export default { getAllPayments, recordPayment, updateStatus };
