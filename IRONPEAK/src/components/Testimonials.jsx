import { useState } from 'react';
import './Testimonials.css';

const reviews = [
    {
        name: 'Arjun Mehta',
        role: 'Software Engineer',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 5,
        text: 'I lost 18kg in 6 months at IronPeak. The trainers are genuinely invested in your success — Marcus pushed me past every mental barrier I thought I had. This place is life-changing.',
        stat: '18kg Lost',
    },
    {
        name: 'Sneha Patel',
        role: 'Marketing Manager',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 5,
        text: "The HIIT classes with Priya are insane — in the best way. I hit a new personal best every week. The community here cheers you on even when you want to quit. Worth every rupee.",
        stat: 'PB Every Week',
    },
    {
        name: 'Rohan Sinha',
        role: 'Entrepreneur',
        avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
        rating: 5,
        text: 'I\'ve been to 5 gyms across the city. IronPeak is on another level. The equipment is always clean, the trainers are certified professionals, and the recovery zone is a game-changer.',
        stat: '1 Year Member',
    },
    {
        name: 'Kavya Nair',
        role: 'Doctor',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        rating: 5,
        text: "As a doctor I recommend IronPeak to my patients. The nutrition coaching combined with Meena's yoga classes has transformed my posture, sleep, and stress levels. Scientifically sound.",
        stat: 'Health Transformed',
    },
    {
        name: 'Dev Kapoor',
        role: 'College Athlete',
        avatar: 'https://randomuser.me/api/portraits/men/57.jpg',
        rating: 5,
        text: 'Joined for the olympic lifting program. Marcus knows exactly how to build strength while preventing injury. I went from 80kg to a 120kg clean & jerk in 8 months. Incredible coaching.',
        stat: '+40kg Lift PR',
    },
];

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const triggerAnimation = (callback) => {
        setIsAnimating(true);
        setTimeout(() => {
            callback();
            setIsAnimating(false);
        }, 300);
    };

    const prev = () => triggerAnimation(() => setCurrent((c) => (c - 1 + reviews.length) % reviews.length));
    const next = () => triggerAnimation(() => setCurrent((c) => (c + 1) % reviews.length));
    const goTo = (i) => triggerAnimation(() => setCurrent(i));

    const r = reviews[current];

    return (
        <section className="testimonials section" id="testimonials">
            <div className="testimonials__glow" />
            <div className="container">
                <div className="testimonials__header">
                    <div className="section-tag">✦ Member Stories</div>
                    <h2 className="section-title">Real People, <span style={{ color: 'var(--primary)', filter: 'drop-shadow(0 0 10px rgba(168,85,247,0.5))' }}>Real Results</span></h2>
                    <p className="section-subtitle">Don't take our word for it — hear it from our members.</p>
                </div>

                <div className="testimonials__featured-wrapper">
                    <button className="nav-btn nav-btn--prev" onClick={prev}>‹</button>

                    <div className={`featured-review ${isAnimating ? 'featured-review--animating' : ''}`}>
                        <div className="featured-quote-icon">"</div>
                        <div className="featured-stars">{'★'.repeat(r.rating)}</div>
                        <p className="featured-text">"{r.text}"</p>

                        <div className="featured-footer">
                            <div className="featured-avatar">
                                <img src={r.avatar} alt={r.name} className="featured-avatar-img" />
                            </div>
                            <div className="featured-info">
                                <div className="featured-name">{r.name}</div>
                                <div className="featured-role">{r.role}</div>
                            </div>
                            <div className="featured-stat">{r.stat}</div>
                        </div>
                    </div>

                    <button className="nav-btn nav-btn--next" onClick={next}>›</button>
                </div>

                <div className="featured-dots">
                    {reviews.map((_, i) => (
                        <button
                            key={i}
                            className={`f-dot ${i === current ? 'f-dot--active' : ''}`}
                            onClick={() => goTo(i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
