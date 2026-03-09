import { useState, useEffect } from 'react';
import './Classes.css';

const categories = ['All', 'Strength', 'Cardio', 'HIIT', 'Yoga', 'Boxing'];
const intensityColor = { Low: '#10b981', Med: '#fbbf24', High: '#f97316', Max: '#ef4444' };
const API_URL = 'http://localhost:5001/api';

export default function Classes() {
    const [active, setActive] = useState('All');
    const [classesData, setClassesData] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    // Form states
    const [bookingForm, setBookingForm] = useState({ name: '', email: '', phone: '' });

    useEffect(() => {
        fetchClasses();
    }, []);

    const fetchClasses = async () => {
        try {
            const res = await fetch(`${API_URL}/classes`);
            const data = await res.json();
            setClassesData(data);
        } catch (err) {
            console.error('Failed to fetch classes:', err);
        } finally {
            setLoading(false);
        }
    };

    const filtered = active === 'All' ? classesData : classesData.filter(c => c.cat === active);

    const handleBook = (cls) => {
        if (cls.slots > 0) {
            setSelectedClass(cls);
        }
    };

    const confirmBooking = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_URL}/book`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    classId: selectedClass.id,
                    user: bookingForm
                })
            });

            const result = await res.json();

            if (result.success) {
                setClassesData(result.updatedClasses);
                setSelectedClass(null);
                setShowSuccess(true);
                setBookingForm({ name: '', email: '', phone: '' });
                // Confetti logic already in UI component
            } else {
                alert(result.error || 'Booking failed');
            }
        } catch (err) {
            console.error('Booking failed:', err);
            alert('Something went wrong. Please try again.');
        }
    };

    if (loading) return null; // Or a loader

    return (
        <section className="classes section" id="classes">
            <div className="container">
                <div className="classes__header">
                    <div className="section-tag">✦ Programs & Classes</div>
                    <h2 className="section-title">Find Your <span className="text-orange">Perfect Workout</span></h2>
                    <p className="section-subtitle">
                        From explosive HIIT to mindful yoga — we have a class for every body, every goal, every level.
                    </p>
                </div>

                {/* Filter tabs */}
                <div className="classes__tabs">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`tab-btn ${active === cat ? 'tab-btn--active' : ''}`}
                            onClick={() => setActive(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Classes grid */}
                <div className="classes__grid">
                    {filtered.map((cls) => (
                        <div className="class-card" key={cls.id} style={{ '--accent': cls.color }}>
                            <div className="class-card__img-wrap">
                                <img src={cls.image} alt={cls.name} className="class-card__img" />
                                <div className="class-card__badge" style={{ background: cls.color }}>{cls.cat}</div>
                            </div>
                            <h3 className="class-card__name">{cls.name}</h3>
                            <div className="class-card__meta">
                                <span className="meta-pill">⏱ {cls.duration}</span>
                                <span
                                    className="meta-pill"
                                    style={{ color: intensityColor[cls.intensity], border: `1px solid ${intensityColor[cls.intensity]}33` }}
                                >
                                    {cls.intensity} Intensity
                                </span>
                            </div>
                            <div className="class-card__trainer">
                                <div className="trainer-avatar">{cls.trainer.charAt(0)}</div>
                                <span>{cls.trainer}</span>
                            </div>
                            <div className="class-card__footer">
                                <span className="slots-text">{cls.slots} spots left</span>
                                <button
                                    className={`btn ${cls.slots > 0 ? 'btn-primary' : 'btn-disabled'} class-book-btn`}
                                    onClick={() => handleBook(cls)}
                                    disabled={cls.slots <= 0}
                                >
                                    {cls.slots > 0 ? 'Book →' : 'Full'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Booking Modal */}
            {selectedClass && (
                <div className="modal-overlay" onClick={() => setSelectedClass(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedClass(null)}>×</button>
                        <div className="modal-header">
                            <div className="modal-img-wrap">
                                <img src={selectedClass.image} alt={selectedClass.name} className="modal-img" />
                            </div>
                            <h3>Confirm Your Spot</h3>
                            <p>You're booking <strong>{selectedClass.name}</strong> with {selectedClass.trainer}.</p>
                        </div>
                        <form className="booking-form" onSubmit={confirmBooking}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    required
                                    value={bookingForm.name}
                                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    value={bookingForm.email}
                                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    required
                                    value={bookingForm.phone}
                                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-full">Confirm Booking</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccess && (
                <div className="success-overlay" onClick={() => setShowSuccess(false)}>
                    <div className="success-card" onClick={e => e.stopPropagation()}>
                        <div className="confetti-container">
                            {[...Array(12)].map((_, i) => <div key={i} className="confetti-piece" style={{ '--delay': `${i * 0.1}s`, '--x': `${(i - 6) * 15}px` }}></div>)}
                        </div>
                        <div className="success-icon-wrap">
                            <div className="success-circle"></div>
                            <span className="success-check">✓</span>
                        </div>
                        <h3 className="success-title">Mission Successful!</h3>
                        <p className="success-text">
                            Your spot is secured. Prepare to crush your fitness goals!
                        </p>
                        <button className="btn btn-primary w-full" onClick={() => setShowSuccess(false)}>
                            Let's Go!
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

