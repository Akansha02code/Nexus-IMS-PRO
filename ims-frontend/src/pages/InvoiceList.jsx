import { useEffect, useState } from 'react';
import invoiceService from '../services/invoiceService';
import { Search, Filter, Receipt, ArrowUpRight, Download, X } from 'lucide-react';
import { exportToCSV } from '../utils/exportUtils';

const InvoiceList = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        invoiceService.getAllInvoices()
            .then(res => {
                setInvoices(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch invoices", err);
                setLoading(false);
            });
    }, []);

    const filteredInvoices = invoices.filter(inv =>
        inv.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.client?.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.client?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExport = () => {
        const data = filteredInvoices.map(inv => ({
            'Invoice Number': inv.invoiceNumber,
            'Date': inv.invoiceDate,
            'Client': inv.client?.clientName,
            'Email': inv.client?.email,
            'Total Amount': inv.totalAmount,
            'GST': inv.gstAmount,
            'Final Amount': inv.finalAmount,
            'Paid': inv.paidAmount,
            'Balance': inv.balanceAmount,
            'Status': inv.status
        }));

        const headers = ['Invoice Number', 'Date', 'Client', 'Email', 'Total Amount', 'GST', 'Final Amount', 'Paid', 'Balance', 'Status'];
        exportToCSV(data, 'Invoices', headers);
    };

    if (loading) return null;

    return (
        <div className="animate-slide-up">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                <div>
                    <h1 className="h1">Billing Terminal</h1>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Transaction history and tax liability records.</p>
                </div>
                <button onClick={handleExport} className="btn btn-outline">
                    <Download size={18} /> Export Records
                </button>
            </header>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Filter by invoice ID or client identity..."
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
                <button className="btn btn-outline" style={{ padding: '0 1.5rem' }}>
                    <Filter size={18} />
                </button>
            </div>

            <div className="table-container card glass" style={{ padding: 0 }}>
                <table className="modern-table">
                    <thead>
                        <tr>
                            <th style={{ paddingLeft: '2.5rem' }}>Identity</th>
                            <th>Partner Entity</th>
                            <th>Status Vector</th>
                            <th style={{ textAlign: 'right', paddingRight: '2.5rem' }}>Valuation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInvoices.map((inv) => (
                            <tr key={inv.id}>
                                <td style={{ paddingLeft: '2.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '0.75rem', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: 'var(--info)' }}>
                                            <Receipt size={20} />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '0.9rem', fontWeight: '700' }}>{inv.invoiceNumber}</p>
                                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{new Date(inv.invoiceDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p style={{ fontSize: '0.9rem', fontWeight: '600' }}>{inv.client?.clientName}</p>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{inv.client?.email}</p>
                                </td>
                                <td>
                                    <span className={`badge ${inv.status === 'PAID' ? 'badge-success' :
                                        inv.status === 'PARTIALLY_PAID' ? 'badge-warning' :
                                            'badge-danger'
                                        }`}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></div>
                                        {inv.status?.replace('_', ' ')}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'right', paddingRight: '2.5rem' }}>
                                    <p style={{ fontSize: '1.1rem', fontWeight: '800', letterSpacing: '-0.02em' }}>₹{inv.finalAmount?.toLocaleString('en-IN')}</p>
                                    {inv.balanceAmount > 0 && (
                                        <p style={{ fontSize: '0.7rem', color: 'var(--danger)', fontWeight: '700' }}>DUE: ₹{inv.balanceAmount.toLocaleString('en-IN')}</p>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredInvoices.length === 0 && (
                    <div style={{ padding: '6rem', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-muted)' }}>Zero financial transactions match current filter criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InvoiceList;
