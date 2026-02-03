import { useEffect, useState } from 'react';
import paymentService from '../services/paymentService';
import invoiceService from '../services/invoiceService';
import { useAuth } from '../context/AuthContext';
import { Plus, CreditCard, Receipt, Search, Filter, X, Check, Download } from 'lucide-react';
import { exportToCSV } from '../utils/exportUtils';

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({ invoiceId: '', amount: '', paymentMethod: 'Bank Transfer', transactionId: '' });

    useEffect(() => {
        loadPayments();
        loadInvoices();
    }, []);

    const loadInvoices = () => {
        invoiceService.getAllInvoices().then(res => setInvoices(res.data.filter(inv => inv.status !== 'PAID')));
    };

    const loadPayments = () => {
        paymentService.getAllPayments().then(res => setPayments(res.data));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            invoice: { id: formData.invoiceId },
            amount: parseFloat(formData.amount),
            paymentMethod: formData.paymentMethod,
            transactionId: formData.transactionId
        };
        paymentService.recordPayment(payload).then(() => {
            setShowModal(false);
            loadPayments();
            loadInvoices();
            setFormData({ invoiceId: '', amount: '', paymentMethod: 'Bank Transfer', transactionId: '' });
        });
    };

    const filteredInvoices = invoices.filter(inv =>
        inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.client?.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredPayments = payments.filter(p =>
        p.invoice?.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExport = () => {
        const data = filteredPayments.map(p => ({
            'Transaction ID': p.id,
            'Date': p.paymentDate,
            'Invoice #': p.invoice?.invoiceNumber,
            'Client': p.invoice?.client?.clientName,
            'Method': p.paymentMethod,
            'Ref ID': p.transactionId,
            'Amount': p.amount,
            'Status': p.status
        }));
        const headers = ['Transaction ID', 'Date', 'Invoice #', 'Client', 'Method', 'Ref ID', 'Amount', 'Status'];
        exportToCSV(data, 'Payments', headers);
    };

    const handleStatusUpdate = (id, status) => {
        paymentService.updateStatus(id, status).then(() => loadPayments());
    };

    const { user } = useAuth();

    return (
        <div className="animate-slide-up">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                <div>
                    <h1 className="h1">Payment Ledger</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Full verification of incoming funds and liability settlements.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={handleExport} className="btn btn-outline">
                        <Download size={18} /> Export Records
                    </button>
                    {user.role === 'SALES' && (
                        <button onClick={() => setShowModal(true)} className="btn btn-primary">
                            <Plus size={20} /> Record Settlement
                        </button>
                    )}
                </div>
            </header>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search by transaction hash or invoice ID..."
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
            </div>

            {filteredInvoices.length > 0 && (
                <div style={{ marginBottom: '3.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <Receipt size={18} style={{ color: 'var(--primary)' }} />
                        <h3 className="h3" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>Outstanding Liabilities</h3>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        {filteredInvoices.map(inv => {
                            const pendingPayment = payments.find(p => p.invoice?.id === inv.id && p.status === 'PENDING');
                            return (
                                <div key={inv.id} className="card glass" style={{ padding: '1.5rem', borderLeft: `3px solid ${pendingPayment ? 'var(--warning)' : 'var(--danger)'}`, transition: 'all 0.3s', opacity: pendingPayment ? 0.8 : 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                <p className="badge" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', fontSize: '0.65rem' }}>{inv.invoiceNumber}</p>
                                                {pendingPayment && <span className="badge badge-warning" style={{ fontSize: '0.6rem' }}>Verification Pending</span>}
                                            </div>
                                            <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.25rem' }}>{inv.client?.clientName}</h4>
                                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Due: {new Date(inv.dueDate).toLocaleDateString()}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '700' }}>BALANCE DUE</p>
                                            <p style={{ fontSize: '1.25rem', fontWeight: '900', color: pendingPayment ? 'var(--warning)' : 'var(--danger)', letterSpacing: '-0.02em' }}>₹{inv.balanceAmount?.toLocaleString('en-IN')}</p>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '1.5rem' }}>
                                        <button
                                            disabled={!!pendingPayment}
                                            onClick={() => {
                                                setFormData({ ...formData, invoiceId: inv.id, amount: inv.balanceAmount });
                                                setShowModal(true);
                                            }}
                                            className={`btn ${pendingPayment ? 'btn-outline' : 'btn-primary'}`}
                                            style={{ width: '100%', padding: '0.6rem', fontSize: '0.85rem' }}
                                        >
                                            {pendingPayment ? 'Verification in Progress' : 'Record Payment Settlement'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <CreditCard size={18} style={{ color: 'var(--primary)' }} />
                <h3 className="h3" style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>Payment Ledger</h3>
            </div>

            <div className="card glass" style={{ padding: 0 }}>
                <table className="modern-table">
                    <thead>
                        <tr>
                            <th style={{ paddingLeft: '2.5rem' }}>Transaction Detail</th>
                            <th>Parent Invoice</th>
                            <th>Gateway Meta</th>
                            <th>Status</th>
                            <th>Settlement Value</th>
                            <th style={{ textAlign: 'right', paddingRight: '2.5rem' }}>Control</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPayments.map((p) => (
                            <tr key={p.id}>
                                <td style={{ paddingLeft: '2.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                            <CreditCard size={20} />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '0.85rem', fontWeight: '800' }}>#{p.id}</p>
                                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600' }}>{new Date(p.paymentDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p style={{ fontSize: '0.9rem', fontWeight: '700' }}>{p.invoice?.invoiceNumber}</p>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{p.invoice?.client?.clientName}</p>
                                </td>
                                <td>
                                    <div className="badge" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', color: 'var(--text-secondary)', padding: '0.2rem 0.5rem' }}>
                                        {p.paymentMethod}
                                    </div>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Ref: {p.transactionId}</p>
                                </td>
                                <td>
                                    <span className={`badge ${p.status === 'COMPLETED' ? 'badge-success' : p.status === 'FAILED' ? 'badge-danger' : 'badge-warning'}`}>
                                        {p.status}
                                    </span>
                                </td>
                                <td>
                                    <p style={{ fontSize: '1.25rem', fontWeight: '800', color: p.status === 'COMPLETED' ? 'var(--success)' : 'var(--text-main)', letterSpacing: '-0.03em' }}>₹{p.amount?.toLocaleString('en-IN')}</p>
                                </td>
                                <td style={{ textAlign: 'right', paddingRight: '2.5rem' }}>
                                    {user.role === 'ADMIN' && p.status === 'PENDING' ? (
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            <button onClick={() => handleStatusUpdate(p.id, 'COMPLETED')} className="btn btn-primary" style={{ padding: '0.4rem', borderRadius: '0.5rem' }}>
                                                <Check size={16} />
                                            </button>
                                            <button onClick={() => handleStatusUpdate(p.id, 'FAILED')} className="btn btn-outline" style={{ padding: '0.4rem', borderRadius: '0.5rem', color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ) : (
                                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                            {p.status === 'COMPLETED' ? 'VERIFIED' : p.status === 'FAILED' ? 'REJECTED' : 'AUTHORIZED'}
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredPayments.length === 0 && (
                    <div style={{ padding: '6rem', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-muted)' }}>The ledger is currently empty for the selected criteria.</p>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content animate-slide-up" style={{ maxWidth: '480px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                            <h2 className="h2">Record Settlement</h2>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label className="text-xs" style={{ display: 'block', marginBottom: '0.75rem' }}>Target Invoice ID</label>
                                <select
                                    className="input"
                                    required
                                    value={formData.invoiceId}
                                    onChange={(e) => {
                                        const inv = invoices.find(i => i.id == e.target.value);
                                        setFormData({ ...formData, invoiceId: e.target.value, amount: inv ? inv.balanceAmount : '' });
                                    }}
                                >
                                    <option value="">Select outstanding liability...</option>
                                    {invoices.map(inv => (
                                        <option key={inv.id} value={inv.id}>
                                            {inv.invoiceNumber} — {inv.client?.clientName} (₹{inv.balanceAmount})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs" style={{ display: 'block', marginBottom: '0.75rem' }}>Received Capital (₹)</label>
                                <input
                                    type="number"
                                    required
                                    className="input"
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs" style={{ display: 'block', marginBottom: '0.75rem' }}>Channel of Transfer</label>
                                <select
                                    className="input"
                                    value={formData.paymentMethod}
                                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                >
                                    <option>Bank Transfer</option>
                                    <option>Cash Settlement</option>
                                    <option>UPI / Instant</option>
                                    <option>Cheque / Draft</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs" style={{ display: 'block', marginBottom: '0.75rem' }}>Verification Identifier (UTR)</label>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="Transaction reference ID"
                                    value={formData.transactionId}
                                    onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                                <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Abort</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                                    <Check size={18} /> Confirm Deposit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payments;
