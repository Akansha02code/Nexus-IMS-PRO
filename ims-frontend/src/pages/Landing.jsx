import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, BarChart3, Globe, Layers } from 'lucide-react';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <div style={{ background: '#050505', color: '#fff', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {/* Hero Section */}
            <div style={{
                height: '100vh',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '0 2rem',
                overflow: 'hidden',
                background: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop") center/cover no-repeat',
            }}>
                {/* Overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at center, rgba(5, 5, 5, 0.7) 0%, rgba(5, 5, 5, 0.98) 100%)',
                    zIndex: 1
                }}></div>

                {/* Animated Background Elements */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    background: 'var(--primary)',
                    filter: 'blur(150px)',
                    opacity: 0.1,
                    zIndex: 0
                }}></div>

                <div className="animate-slide-up" style={{ position: 'relative', zIndex: 2, maxWidth: '900px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.5rem 1.25rem',
                        borderRadius: '999px',
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.2)',
                        marginBottom: '2.5rem',
                        color: 'var(--primary)',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        letterSpacing: '0.1em'
                    }}>
                        <ShieldCheck size={16} /> ENTERPRISE GRADE ASSET MANAGEMENT
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(3rem, 8vw, 5rem)',
                        fontWeight: '800',
                        lineHeight: '1.1',
                        letterSpacing: '-0.04em',
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(to bottom, #fff 0%, #a3a3a3 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        NEXUS IMS PRO
                    </h1>

                    <p style={{
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        color: 'var(--text-secondary)',
                        maxWidth: '650px',
                        margin: '0 auto 3.5rem',
                        lineHeight: '1.8'
                    }}>
                        Automate your financial ecosystem. From architectural estimates to real-time payment settlements, Nexus provides the precision required for modern commerce.
                    </p>

                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <button
                            onClick={() => navigate('/login')}
                            className="btn btn-primary"
                            style={{ padding: '1.2rem 2.5rem', fontSize: '1rem', borderRadius: '1rem' }}
                        >
                            Access Terminal <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, color: 'var(--text-muted)' }}>
                    <div style={{ width: '2px', height: '40px', background: 'linear-gradient(to bottom, var(--primary), transparent)', margin: '0 auto' }}></div>
                    <p style={{ fontSize: '0.6rem', fontWeight: '800', marginTop: '1rem', letterSpacing: '0.2em' }}>OVERVIEW</p>
                </div>
            </div>

            {/* Features Section with Background */}
            <div style={{
                position: 'relative',
                padding: '10rem 2rem',
                background: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop") center/cover no-repeat fixed',
                overflow: 'hidden'
            }}>
                {/* Section Overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, #050505 0%, rgba(5, 5, 5, 0.8) 50%, #050505 100%)',
                    zIndex: 1
                }}></div>

                <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                        <FeatureCard
                            icon={<Zap />}
                            title="Intelligent Billing"
                            desc="Seamlessly convert project estimates into verified legal invoices with a single click."
                        />
                        <FeatureCard
                            icon={<BarChart3 />}
                            title="Executive Insights"
                            desc="Visualize your growth trajectory with high-precision revenue projections and debt analysis."
                        />
                        <FeatureCard
                            icon={<Layers />}
                            title="Role-Based Security"
                            desc="Granular permission systems ensuring sensitive financial data is only accessible to authorized personnel."
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer style={{ padding: '6rem 2rem', borderTop: '1px solid var(--border)', textAlign: 'center', background: '#050505' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '1rem' }}>
                    Developed with precision by <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Ak❤️</span>
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', letterSpacing: '0.05em' }}>&copy; 2026 NEXUS FINANCIAL TECHNOLOGIES. ALL RIGHTS RESERVED.</p>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="card glass" style={{ padding: '2.5rem', transition: 'transform 0.3s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
        <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '1rem',
            background: 'rgba(16, 185, 129, 0.1)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
            {icon}
        </div>
        <h3 className="h3" style={{ marginBottom: '1rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.9rem' }}>{desc}</p>
    </div>
);

export default Landing;
