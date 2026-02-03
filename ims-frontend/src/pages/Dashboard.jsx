import { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboardService';
import { useAuth } from '../context/AuthContext';
import {
    TrendingUp,
    Users,
    Receipt,
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    TrendingDown,
    Layers,
    ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler
);

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const data = await dashboardService.getDashboardStats();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyCenter: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '40px', height: '40px', border: '3px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem' }}></div>
                    <p style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Synchronizing Financial Data...</p>
                </div>
            </div>
        );
    }

    const chartData = {
        labels: stats?.monthlySales?.map(s => s.month) || [],
        datasets: [
            {
                fill: true,
                label: 'Revenue',
                data: stats?.monthlySales?.map(s => s.total) || [],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.05)',
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 0,
                pointHoverRadius: 6,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#121212',
                titleColor: '#fff',
                bodyColor: '#a3a3a3',
                padding: 12,
                borderColor: 'rgba(255,255,255,0.05)',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(255,255,255,0.02)' },
                ticks: { color: '#525252', font: { size: 11 } }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#525252', font: { size: 11 } }
            }
        }
    };

    return (
        <div className="animate-slide-up">
            <header style={{ marginBottom: '3rem' }}>
                <h1 className="h1">Executive Summary</h1>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Portfolio performance and operational insights for {user?.username}.</p>
            </header>

            <div className="grid grid-4" style={{ marginBottom: '3rem' }}>
                <StatCard
                    title="Gross Revenue"
                    value={`₹${(stats?.totalRevenue || 0).toLocaleString('en-IN')}`}
                    icon={<Wallet size={20} />}
                    trend="+12%"
                    color="var(--primary)"
                />
                <StatCard
                    title="Settled Invoices"
                    value={stats?.paidInvoices || 0}
                    icon={<Receipt size={20} />}
                    trend="+5%"
                    color="var(--info)"
                />
                <StatCard
                    title="Outstanding Debt"
                    value={stats?.unpaidInvoices || 0}
                    icon={<Layers size={20} />}
                    trend="-3%"
                    color="var(--danger)"
                />
                <StatCard
                    title="Partner Network"
                    value={stats?.totalClients || 0}
                    icon={<Users size={20} />}
                    trend="+8%"
                    color="var(--warning)"
                />
            </div>

            <div className="grid grid-3">
                <div className="card glass" style={{ gridColumn: 'span 2', minHeight: '450px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                        <h3 className="h3">Revenue Projection</h3>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)' }}>ACTUALS</span>
                            </div>
                        </div>
                    </div>
                    <div style={{ height: '320px' }}>
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>

                <div className="card" style={{ background: 'var(--bg-surface)' }}>
                    <h3 className="h3" style={{ marginBottom: '2rem' }}>Core Operations</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <QuickLink title="Client Registry" desc="Global partner database" icon={<Users size={18} />} to="/clients" />
                        <QuickLink title="Financial Audit" desc="Invoice & tax tracking" icon={<Receipt size={18} />} to="/invoices" />
                        <QuickLink title="Network Access" desc="Manage personnel" icon={<TrendingUp size={18} />} to="/users" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, trend, color }) => (
    <div className="card glass" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.03)', color: color, border: '1px solid var(--border)' }}>
                {icon}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: '800', color: trend.startsWith('+') ? 'var(--success)' : 'var(--danger)' }}>
                {trend.startsWith('+') ? <ArrowUpRight size={14} /> : <TrendingDown size={14} />}
                {trend}
            </div>
        </div>
        <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>{title}</p>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '800', letterSpacing: '-0.02em' }}>{value}</h2>
    </div>
);

const QuickLink = ({ title, desc, icon, to }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => to && navigate(to)}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.05)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'}
        >
            <div style={{ color: 'var(--primary)' }}>{icon}</div>
            <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.85rem', fontWeight: '700', margin: 0 }}>{title}</p>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0 }}>{desc}</p>
            </div>
            <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
        </div>
    );
};

export default Dashboard;
