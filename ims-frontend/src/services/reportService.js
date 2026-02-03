import api from './api';

const getMisReport = () => api.get('/reports/mis');

export default { getMisReport };
