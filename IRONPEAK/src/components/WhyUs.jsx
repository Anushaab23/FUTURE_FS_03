import './WhyUs.css';

const features = [
    {
        icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.4 14.4 9.6 9.6" /><path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" /><path d="m21.5 21.5-1.4-1.4" /><path d="M3.9 3.9 2.5 2.5" /><path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" /></svg>,
        title: 'World-Class Equipment',
        desc: 'Over 300 premium machines and free weights — from Olympic barbells to smart cardio. Always maintained, always clean.',
    },
    {
        icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.31" /><path d="M14 9.3V1.99" /><path d="M8.5 2h7" /><path d="M14 9.3a6.5 6.5 0 1 1-4 0" /><path d="M5.52 16h12.96" /></svg>,
        title: 'Science-Backed Programs',
        desc: 'Every program is designed by certified sports scientists and biomechanics experts. Real results, not guesswork.',
    },
    {
        icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg>,
        title: 'Smart Fitness Tracking',
        desc: 'Track every rep, set, and calorie through our IronPeak app. Syncs with Apple Watch, Garmin & all major wearables.',
    },
    {
        icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" /><path d="M10 2c1 .5 2 2 2 5" /></svg>,
        title: 'Nutrition Coaching',
        desc: 'Certified nutritionists create meal plans tailored to your body type, goals, and lifestyle. Food is your fuel.',
    },
    {
        icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>,
        title: 'Full Recovery Zone',
        desc: 'Ice baths, infrared sauna, massage chairs, and a heated pool. Because recovery is training.',
    },
    {
        icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
        title: '24/7 Secure Access',
        desc: 'Train on your schedule. Our keycard system lets members access the gym any time, any day — no excuses.',
    },
];

export default function WhyUs() {
    return (
        <section className="why-us section" id="why-us">
            <div className="container">
                <div className="why-us__header">
                    <div className="section-tag">✦ Why Choose IronPeak</div>
                    <h2 className="section-title">Built For Serious<br /><span className="text-orange">Results</span></h2>
                    <p className="section-subtitle">
                        We don't just provide a gym. We provide a complete ecosystem designed
                        to accelerate your transformation from day one.
                    </p>
                </div>

                <div className="why-us__grid">
                    {features.map((f, i) => (
                        <div className="feature-card" key={i} style={{ '--delay': `${i * 0.1}s` }}>
                            <div className="feature-card__icon">{f.icon}</div>
                            <h3 className="feature-card__title">{f.title}</h3>
                            <p className="feature-card__desc">{f.desc}</p>
                            <div className="feature-card__arrow">→</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
