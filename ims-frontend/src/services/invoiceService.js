import api from './api';

const getAllInvoices = () => api.get('/invoices');
const getInvoiceById = (id) => api.get(`/invoices/${id}`);

export default { getAllInvoices, getInvoiceById };
