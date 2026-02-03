import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Loader2, Shield } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(username, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Verification failed. Invalid credentials provided.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: '2rem',
            background: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop") center/cover no-repeat',
            backgroundColor: '#050505'
        }}>
            {/* Elegant Radial Dark Overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at center, rgba(5, 5, 5, 0.4) 0%, rgba(5, 5, 5, 0.9) 100%)',
                backdropFilter: 'blur(4px)',
                zIndex: 0
            }}></div>

            <div className="card glass animate-slide-up" style={{
                width: '100%',
                maxWidth: '440px',
                position: 'relative',
                zIndex: 1,
                padding: '3.5rem',
                margin: 'auto',
                boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.5), 0 30px 60px -30px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
                borderRadius: '2rem'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ display: 'inline-flex', padding: '1.25rem', borderRadius: '1.25rem', background: 'rgba(var(--primary-rgb), 0.1)', color: 'var(--primary)', marginBottom: '1.5rem', border: '1px solid rgba(var(--primary-rgb), 0.2)' }}>
                        <Shield size={40} />
                    </div>
                    <h1 className="h2" style={{ marginBottom: '0.5rem' }}>Central Access</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Authorized Personnel Identification</p>
                </div>

                {error && (
                    <div className="badge badge-danger" style={{ width: '100%', padding: '1rem', borderRadius: '0.75rem', marginBottom: '2rem', justifyContent: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label className="text-xs" style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>Operator Username</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                className="input"
                                style={{ paddingLeft: '3.5rem' }}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter system ID"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs" style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>Security Token</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="password"
                                className="input"
                                style={{ paddingLeft: '3.5rem' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                        style={{ height: '3.5rem', marginTop: '1rem' }}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Authenticate Access'}
                    </button>
                </form>

                <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                    <p className="text-xs" style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                        PRIVATE SYSTEM WARNING:<br />Access monitored and recorded.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
