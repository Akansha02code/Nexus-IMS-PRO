import { useEffect, useState } from 'react';
import clientService from '../services/clientService';
import { useAuth } from '../context/AuthContext';
import { Plus, Search, Mail, Phone, MapPin, Building2, X, Check, ArrowRight, Download } from 'lucide-react';
import { exportToCSV } from '../utils/exportUtils';

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({ clientName: '', email: '', phone: '', address: '', gstNumber: '' });
    const { user } = useAuth();

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = () => {
        setClients([]);
        clientService.getAllClients().then(res => setClients(res.data));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        clientService.createClient(formData).then(() => {
            setShowModal(false);
            loadClients();
            setFormData({ clientName: '', email: '', phone: '', address: '', gstNumber: '' });
        });
    };

    const filteredClients = clients.filter(c =>
        c.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExport = () => {
        const data = filteredClients.map(c => ({
            'Company Name': c.clientName,
            'Email': c.email,
            'Phone': c.phone,
            'GST Number': c.gstNumber || 'GST EXEMPT',
            'Address': c.address,
            'Joined': c.createdAt
        }));
        const headers = ['Company Name', 'Email', 'Phone', 'GST Number', 'Address', 'Joined'];
        exportToCSV(data, 'Clients', headers);
    };

    return (
        <div className="animate-slide-up">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                <div>
                    <h1 className="h1">Client Partners</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Central registry for corporate relationships and communication.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={handleExport} className="btn btn-outline">
                        <Download size={18} /> Export Records
                    </button>
                    {user.role === 'SALES' && (
                        <button onClick={() => setShowModal(true)} className="btn btn-primary">
                            <Plus size={20} /> Register New Entity
                        </button>
                    )}
                </div>
            </header>

            <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
                <Search size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                    type="text"
                    placeholder="Search by company handle or identity..."
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
                            <th style={{ paddingLeft: '2.5rem' }}>Client Identity</th>
                            <th>Contact Details</th>
                            <th>GST Status</th>
                            <th>Location Registry</th>
                            <th style={{ textAlign: 'right', paddingRight: '2.5rem' }}>Relationship</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClients.map((client) => (
                            <tr key={client.id}>
                                <td style={{ paddingLeft: '2.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '0.75rem', background: 'rgba(var(--primary-rgb), 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', border: '1px solid rgba(var(--primary-rgb), 0.2)' }}>
                                            <Building2 size={20} />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '0.9rem', fontWeight: '800' }}>{client.clientName}</p>
                                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600' }}>ID: #{client.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                                        <Mail size={12} style={{ color: 'var(--primary)' }} />
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{client.email}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Phone size={12} style={{ color: 'var(--primary)' }} />
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{client.phone || '--'}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className={`badge ${client.gstNumber ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '0.65rem' }}>
                                        {client.gstNumber || 'GST EXEMPT'}
                                    </div>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', maxWidth: '300px' }}>
                                        <MapPin size={14} style={{ color: 'var(--text-muted)', marginTop: '0.2rem' }} />
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {client.address || 'Address generic'}
                                        </span>
                                    </div>
                                </td>
                                <td style={{ textAlign: 'right', paddingRight: '2.5rem' }}>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Since</p>
                                    <p style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--text-primary)' }}>{new Date(client.createdAt).getFullYear()}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredClients.length === 0 && (
                    <div style={{ padding: '6rem', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No organizational records found matching the query.</p>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content animate-slide-up">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                            <h2 className="h2">Corporate Registration</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label className="text-xs" style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-secondary)' }}>Registered Company Name</label>
                                <input
                                    type="text"
                                    required
                                    className="input"
                                    value={formData.clientName}
                                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                    placeholder="e.g. Acme Corporation"
                                />
                            </div>
                            <div className="grid grid-2">
                                <div>
                                    <label className="text-xs" style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-secondary)' }}>Email Communication</label>
                                    <input
                                        type="email"
                                        required
                                        className="input"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="billing@company.com"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs" style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-secondary)' }}>Contact Protocol</label>
                                    <input
                                        type="text"
                                        className="input"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs" style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-secondary)' }}>GST Verification Identity</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={formData.gstNumber}
                                    onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                                    placeholder="GST Identification Number"
                                />
                            </div>
                            <div>
                                <label className="text-xs" style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-secondary)' }}>Headquarters Address</label>
                                <textarea
                                    className="input"
                                    style={{ height: '100px', resize: 'none' }}
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                ></textarea>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Abort</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                                    <Check size={18} /> Complete Registry
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Clients;
