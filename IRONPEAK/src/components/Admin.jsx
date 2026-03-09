import { useState, useEffect } from 'react';
import './Admin.css';

const API_URL = 'http://localhost:5001/api';

export default function Admin() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({ username: '', password: '' });
    const [data, setData] = useState({ bookings: [], leads: [], classes: [] });
    const [view, setView] = useState('bookings'); // 'bookings', 'leads', 'classes'
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            });
            const result = await res.json();
            if (result.success) {
                setIsLoggedIn(true);
                fetchStats();
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('Login failed');
        }
    };

    const fetchStats = async () => {
        try {
            const res = await fetch(`${API_URL}/admin/data`);
            const result = await res.json();
            setData(result);
        } catch (err) {
            console.error('Failed to fetch admin stats');
        }
    };

    const resetSlots = async (classId) => {
        try {
            const res = await fetch(`${API_URL}/admin/reset-slots`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ classId })
            });
            const result = await res.json();
            if (result.success) {
                setData(prev => ({ ...prev, classes: result.updatedClasses }));
            }
        } catch (err) {
            console.error('Failed to reset slots');
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="admin-login-page">
                <div className="admin-login-card">
                    <h2 className="admin-title">IronPeak <span className="text-orange">Admin</span></h2>
                    <form className="admin-form" onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                required
                            />
                        </div>
                        {error && <p className="admin-error">{error}</p>}
                        <button type="submit" className="btn btn-primary w-full">Access Dashboard</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <div className="container admin-header__inner">
                    <h2 className="admin-title">IronPeak <span className="text-orange">Dashboard</span></h2>
                    <button className="btn btn-outline" onClick={() => setIsLoggedIn(false)}>Logout</button>
                </div>
            </header>

            <div className="container admin-container">
                <div className="admin-nav">
                    <button className={`nav-link ${view === 'bookings' ? 'active' : ''}`} onClick={() => setView('bookings')}>Bookings ({data.bookings.length})</button>
                    <button className={`nav-link ${view === 'leads' ? 'active' : ''}`} onClick={() => setView('leads')}>Contact Leads ({data.leads.length})</button>
                    <button className={`nav-link ${view === 'classes' ? 'active' : ''}`} onClick={() => setView('classes')}>Manage Classes</button>
                </div>

                <div className="admin-content">
                    {view === 'bookings' && (
                        <div className="admin-table-wrap">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Name</th>
                                        <th>Class</th>
                                        <th>Trainer</th>
                                        <th>Contact</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...data.bookings].reverse().map(b => (
                                        <tr key={b.id}>
                                            <td>{new Date(b.timestamp).toLocaleDateString()}</td>
                                            <td>{b.user.name}</td>
                                            <td>{b.className}</td>
                                            <td>{b.trainer}</td>
                                            <td>{b.user.email} / {b.user.phone}</td>
                                        </tr>
                                    ))}
                                    {data.bookings.length === 0 && <tr><td colSpan="5" className="text-center">No bookings found</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {view === 'leads' && (
                        <div className="admin-table-wrap">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Plan</th>
                                        <th>Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...data.leads].reverse().map(l => (
                                        <tr key={l.id}>
                                            <td>{new Date(l.timestamp).toLocaleDateString()}</td>
                                            <td>{l.name}</td>
                                            <td>{l.email}</td>
                                            <td>{l.plan}</td>
                                            <td className="message-cell">{l.message}</td>
                                        </tr>
                                    ))}
                                    {data.leads.length === 0 && <tr><td colSpan="5" className="text-center">No leads found</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {view === 'classes' && (
                        <div className="admin-classes-grid">
                            {data.classes.map(c => (
                                <div className="admin-class-card" key={c.id}>
                                    <div className="admin-class-img-wrap">
                                        <img src={c.image} alt={c.name} className="admin-class-img" />
                                    </div>
                                    <div className="admin-class-info">
                                        <h4>{c.name}</h4>
                                        <p>{c.slots} / {c.totalSlots} spots remaining</p>
                                    </div>
                                    <button className="btn btn-outline w-full" onClick={() => resetSlots(c.id)}>Reset Spots</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
