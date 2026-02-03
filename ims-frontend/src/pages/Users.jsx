import { useState } from 'react';
import authService from '../services/authService';
import { UserPlus, ShieldPlus, Trash2, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';

const Users = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'SALES', name: '' });
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        try {
            await authService.signup(formData);
            setMessage({ type: 'success', text: 'Identity created and verified successfully.' });
            setFormData({ username: '', email: '', password: '', role: 'SALES', name: '' });
        } catch (err) {
            setMessage({ type: 'error', text: 'Access Denied. Identity conflict or insufficient privileges.' });
        } finally {
            setLoading(false);
            if (message?.type === 'success') setTimeout(() => setMessage(null), 5000);
        }
    };

    return (
        <div className="animate-slide-up">
            <header style={{ marginBottom: '3rem' }}>
                <h1 className="h1">Access Control Terminal</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Delegate operational authority through credential generation.</p>
            </header>

            <div className="grid grid-2 items-start">
                <div className="card glass">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                        <div style={{ padding: '0.75rem', borderRadius: '1rem', background: 'rgba(var(--primary-rgb), 0.1)', color: 'var(--primary)' }}>
                            <UserPlus size={24} />
                        </div>
                        <h3 className="h3">Onboard Personnel</h3>
                    </div>

                    {message && (
                        <div style={{
                            padding: '1rem',
                            borderRadius: '1rem',
                            background: message.type === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                            border: `1px solid ${message.type === 'error' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
                            color: message.type === 'error' ? '#ef4444' : '#10b981',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '2rem',
                            fontSize: '0.9rem',
                            fontWeight: '600'
                        }}>
                            {message.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="grid grid-2">
                            <div>
                                <label className="text-xs" style={{ display: 'block', marginBottom: '0.6rem' }}>Display Name</label>
                                <input type="text" className="input" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Full legal name" />
                            </div>
                            <div>
                                <label className="text-xs" style={{ display: 'block', marginBottom: '0.6rem' }}>System Identifier</label>
                                <input type="text" className="input" required value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} placeholder="unique_handle" />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs" style={{ display: 'block', marginBottom: '0.6rem' }}>Communication Vector (Email)</label>
                            <input type="email" className="input" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="personnel@ims.com" />
                        </div>

                        <div>
                            <label className="text-xs" style={{ display: 'block', marginBottom: '0.6rem' }}>Access Key (Password)</label>
                            <input type="password" className="input" required value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="Minimum 8 characters" />
                        </div>

                        <div>
                            <label className="text-xs" style={{ display: 'block', marginBottom: '0.6rem' }}>Authority Level</label>
                            <select className="input" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                                <option value="SALES">SALES ASSOCIATE (Restricted)</option>
                                <option value="ADMIN">ADMINISTRATIVE OVERSEER (Full)</option>
                            </select>
                        </div>

                        <button type="submit" disabled={loading} className="btn btn-primary" style={{ height: '3.5rem', marginTop: '1rem' }}>
                            {loading ? 'GENERATING CREDENTIALS...' : 'AUTHORIZE ACCOUNT'}
                        </button>
                    </form>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="card" style={{ background: 'var(--bg-surface)' }}>
                        <ShieldPlus size={40} style={{ color: 'var(--primary)', marginBottom: '1.5rem' }} />
                        <h4 style={{ fontWeight: '800', marginBottom: '1rem' }}>Security Protocol Alpha</h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                            Personnel onboarding requires administrative authorization. All credentials generated are logged and cryptographically signed. Assign roles with extreme prejudice as ADMIN access grants absolute control over financial vaults.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
