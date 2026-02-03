import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import Clients from './pages/Clients';
import Estimates from './pages/Estimates';
import InvoiceList from './pages/InvoiceList';
import Payments from './pages/Payments';
import Users from './pages/Users';

const ProtectedRoute = ({ children, roles }) => {
    const { user, loading } = useAuth();

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-deep">
            <div style={{ width: '40px', height: '40px', border: '3px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        </div>
    );

    if (!user) return <Navigate to="/login" />;
    if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" />;

    return (
        <div className="layout-wrapper">
            <Sidebar />
            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    <Route path="/clients" element={<ProtectedRoute roles={['SALES', 'ADMIN']}><Clients /></ProtectedRoute>} />
                    <Route path="/estimates" element={<ProtectedRoute roles={['SALES', 'ADMIN']}><Estimates /></ProtectedRoute>} />
                    <Route path="/invoices" element={<ProtectedRoute roles={['SALES', 'ADMIN']}><InvoiceList /></ProtectedRoute>} />
                    <Route path="/payments" element={<ProtectedRoute roles={['ADMIN', 'SALES']}><Payments /></ProtectedRoute>} />
                    <Route path="/users" element={<ProtectedRoute roles={['ADMIN']}><Users /></ProtectedRoute>} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
