import { useEffect, useState } from 'react';
import estimateService from '../services/estimateService';
import clientService from '../services/clientService';
import { useAuth } from '../context/AuthContext';
import { Plus, Check, X, FileText, Calendar, User, Trash2, Search, Download } from 'lucide-react';
import { exportToCSV } from '../utils/exportUtils';

const Estimates = () => {
    const [estimates, setEstimates] = useState([]);
    const [clients, setClients] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        clientId: '',
        estimateDate: new Date().toISOString().split('T')[0],
        items: [{ description: '', quantity: 1, unitPrice: 0 }]
    });
    const { user } = useAuth();

    useEffect(() => {
        loadEstimates();
        clientService.getAllClients().then(res => setClients(res.data));
    }, []);

    const loadEstimates = () => {
        estimateService.getAllEstimates().then(res => setEstimates(res.data));
    };

    const addItem = () => {
        setFormData({ ...formData, items: [...formData.items, { description: '', quantity: 1, unitPrice: 0 }] });
    };

    const removeItem = (index) => {
        if (formData.items.length > 1) {
            setFormData({ ...formData, items: formData.items.filter((_, i) => i !== index) });
        }
    };

    const updateItem = (index, field, value) => {
        const newItems = [...formData.items];
        newItems[index][field] = value;
        setFormData({ ...formData, items: newItems });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            client: { id: formData.clientId },
            estimateDate: formData.estimateDate,
            items: formData.items
        };
        estimateService.createEstimate(payload).then(() => {
            setShowModal(false);
            loadEstimates();
            setFormData({
                clientId: '',
                estimateDate: new Date().toISOString().split('T')[0],
                items: [{ description: '', quantity: 1, unitPrice: 0 }]
            });
        });
    };

    const handleStatusUpdate = (id, status) => {
        estimateService.updateStatus(id, status).then(() => loadEstimates());
    };

    const filteredEstimates = estimates.filter(est =>
        est.estimateNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        est.client?.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExport = () => {
        const data = filteredEstimates.map(est => ({
            'Estimate ID': est.estimateNumber,
            'Client': est.client?.clientName,
            'Date': est.estimateDate,
            'Total': est.totalAmount,
            'GST': est.gstAmount,
            'Grand Total': est.grandTotal,
            'Status': est.status,
            'Created By': est.createdBy?.name || 'System'
        }));
        const headers = ['Estimate ID', 'Client', 'Date', 'Total', 'GST', 'Grand Total', 'Status', 'Created By'];
        exportToCSV(data, 'Estimates', headers);
    };

    return (
        <div className="animate-slide-up">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                <div>
                    <h1 className="h1">Proposals Registry</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Negotiation drafts and architectural project valuation.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={handleExport} className="btn btn-outline">
                        <Download size={18} /> Export Records
                    </button>
                    {user.role === 'SALES' && (
                        <button onClick={() => setShowModal(true)} className="btn btn-primary">
                            <Plus size={20} /> Generate Proposal
                        </button>
                    )}
                </div>
            </header>

            <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
                <Search size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                    type="text"
                    placeholder="Search by proposal ID or client handle..."
                    className="input"
                    style={{ paddingLeft: '3.5rem', background: 'var(--bg-surface)' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                    <button
                        onClick={() => setSearchTerm('')}
                        style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            <div className="card glass" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="modern-table">
                    <thead>
                        <tr>
                            <th style={{ paddingLeft: '2rem' }}>Ref ID</th>
                            <th>Partner Entity</th>
                            <th>Originator</th>
                            <th>Evaluation</th>
                            <th>State</th>
                            <th style={{ textAlign: 'right', paddingRight: '2rem' }}>Control</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEstimates.map((est) => (
                            <tr key={est.id}>
                                <td style={{ paddingLeft: '2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <FileText size={18} style={{ color: 'var(--primary)' }} />
                                        <span style={{ fontFamily: 'monospace', fontWeight: '700', fontSize: '0.9rem' }}>{est.estimateNumber}</span>
                                    </div>
                                </td>
                                <td>
                                    <p style={{ fontSize: '0.9rem', fontWeight: '600' }}>{est.client?.clientName}</p>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '800', color: 'var(--primary)' }}>
                                            {est.createdBy?.name?.charAt(0) || 'S'}
                                        </div>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{est.createdBy?.name || 'System'}</span>
                                    </div>
                                </td>
                                <td>
                                    <p style={{ fontSize: '1rem', fontWeight: '800' }}>₹{est.grandTotal?.toLocaleString('en-IN')}</p>
                                    <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>NET + 18% TAX</p>
                                </td>
                                <td>
                                    <span className={`badge ${est.status === 'APPROVED' ? 'badge-success' :
                                        est.status === 'REJECTED' ? 'badge-danger' :
                                            'badge-warning'
                                        }`}>
                                        {est.status}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'right', paddingRight: '2rem' }}>
                                    {user.role === 'ADMIN' && est.status === 'PENDING' ? (
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            <button onClick={() => handleStatusUpdate(est.id, 'APPROVED')} className="btn btn-primary" style={{ padding: '0.4rem', borderRadius: '0.5rem' }}>
                                                <Check size={16} />
                                            </button>
                                            <button onClick={() => handleStatusUpdate(est.id, 'REJECTED')} className="btn btn-outline" style={{ padding: '0.4rem', borderRadius: '0.5rem', color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                            {est.status === 'APPROVED' ? 'FINALIZED' : est.status === 'REJECTED' ? 'DISCARDED' : 'AUTHORIZED'}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content animate-slide-up" style={{ maxWidth: '800px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                            <h2 className="h2">Draft Proposal</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div className="grid grid-2">
                                <div>
                                    <label className="text-xs" style={{ display: 'block', marginBottom: '0.75rem' }}>Select Target Entity</label>
                                    <select className="input" required value={formData.clientId} onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}>
                                        <option value="">Search internal registry...</option>
                                        {clients.map(c => <option key={c.id} value={c.id}>{c.clientName}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs" style={{ display: 'block', marginBottom: '0.75rem' }}>Issuance Date</label>
                                    <input type="date" className="input" required value={formData.estimateDate} onChange={(e) => setFormData({ ...formData, estimateDate: e.target.value })} />
                                </div>
                            </div>

                            <div style={{ border: '1px solid var(--border)', borderRadius: '1.25rem', padding: '1.5rem', background: 'rgba(255,255,255,0.01)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h4 style={{ fontWeight: '800', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>VALUATION LINE ITEMS</h4>
                                    <button type="button" onClick={addItem} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '800', fontSize: '0.7rem', cursor: 'pointer' }}>+ ADD ROW</button>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {formData.items.map((item, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                            <input type="text" placeholder="Description" className="input" style={{ flex: 3, padding: '0.6rem 1rem' }} value={item.description} onChange={(e) => updateItem(idx, 'description', e.target.value)} required />
                                            <input type="number" placeholder="Qty" className="input" style={{ flex: 1, padding: '0.6rem 1rem' }} value={item.quantity} onChange={(e) => updateItem(idx, 'quantity', parseInt(e.target.value))} required />
                                            <input type="number" placeholder="Unit" className="input" style={{ flex: 2, padding: '0.6rem 1rem' }} value={item.unitPrice} onChange={(e) => updateItem(idx, 'unitPrice', parseFloat(e.target.value))} required />
                                            <button type="button" onClick={() => removeItem(idx)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Discard Draft</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Finalize Proposal</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Estimates;
