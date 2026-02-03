import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    Users,
    FileText,
    Receipt,
    CreditCard,
    LogOut,
    ShieldCheck,
    Box,
    ChevronRight
} from 'lucide-react';

const Sidebar = () => {
    const { user, logout } = useAuth();

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard', roles: ['ADMIN', 'SALES'] },
        { name: 'Clients', icon: <Users size={20} />, path: '/clients', roles: ['ADMIN', 'SALES'] },
        { name: 'Estimates', icon: <FileText size={20} />, path: '/estimates', roles: ['ADMIN', 'SALES'] },
        { name: 'Invoices', icon: <Receipt size={20} />, path: '/invoices', roles: ['ADMIN', 'SALES'] },
        { name: 'Payments', icon: <CreditCard size={20} />, path: '/payments', roles: ['ADMIN'] },
        { name: 'Settings', icon: <ShieldCheck size={20} />, path: '/users', roles: ['ADMIN'] },
    ];

    return (
        <aside className="sidebar">
            <div style={{ padding: '2.5rem 2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <div style={{ padding: '0.5rem', borderRadius: '0.75rem', background: 'var(--primary)', boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.3)' }}>
                        <Box size={20} color="#000" />
                    </div>
                    <span style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>IMS PRO</span>
                </div>
                <div style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: '0.8' }}>
                    {user?.role} ACCESS
                </div>
            </div>

            <nav style={{ flex: 1, padding: '0 1rem' }}>
                {menuItems.filter(item => item.roles.includes(user?.role)).map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '0.9rem 1.25rem',
                            borderRadius: '1rem',
                            marginBottom: '0.5rem',
                            transition: 'all 0.2s',
                            background: isActive ? 'rgba(var(--primary-rgb), 0.1)' : 'transparent',
                            color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                            fontWeight: isActive ? '700' : '500'
                        })}
                    >
                        {item.icon}
                        <span style={{ fontSize: '0.95rem' }}>{item.name}</span>
                        <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                    </NavLink>
                ))}
            </nav>

            <div style={{ padding: '2rem', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: '1rem', border: '1px solid var(--border)' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '0.75rem', background: 'linear-gradient(135deg, #10b981, #3b82f6)', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: '1rem', fontWeight: '800', color: '#fff' }}>
                        {user?.username?.[0].toUpperCase()}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <p style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>{user?.username}</p>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', margin: 0, opacity: 0.6 }}>{user?.email}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="btn btn-outline"
                    style={{ width: '100%', fontSize: '0.875rem' }}
                >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
