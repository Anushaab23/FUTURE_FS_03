import { useState } from 'react';
import './Pricing.css';

const plans = [
    {
        name: 'Starter',
        emoji: '🌱',
        price: { monthly: 29, annual: 22 },
        desc: 'Perfect for beginners building their first habits.',
        features: [
            { text: 'Gym access (6am – 10pm)', included: true },
            { text: '2 group classes/week', included: true },
            { text: 'Locker room & showers', included: true },
            { text: 'Fitness assessment', included: true },
            { text: 'Personal training', included: false },
            { text: 'Nutrition coaching', included: false },
            { text: '24/7 access', included: false },
            { text: 'Recovery zone', included: false },
        ],
        popular: false,
        color: '#64748b',
    },
    {
        name: 'Pro',
        emoji: '⚡',
        price: { monthly: 59, annual: 45 },
        desc: 'For committed athletes who want to level up fast.',
        features: [
            { text: '24/7 gym access', included: true },
            { text: 'Unlimited group classes', included: true },
            { text: 'Locker room & showers', included: true },
            { text: 'Monthly fitness assessment', included: true },
            { text: '2 PT sessions/month', included: true },
            { text: 'Basic nutrition guide', included: true },
            { text: 'Recovery zone access', included: false },
            { text: 'Personalised meal plan', included: false },
        ],
        popular: true,
        color: '#f97316',
    },
    {
        name: 'Elite',
        emoji: '🏆',
        price: { monthly: 109, annual: 85 },
        desc: 'The complete package for peak performance.',
        features: [
            { text: '24/7 gym access', included: true },
            { text: 'Unlimited group classes', included: true },
            { text: 'Locker room & showers', included: true },
            { text: 'Weekly fitness assessment', included: true },
            { text: 'Unlimited PT sessions', included: true },
            { text: 'Full nutrition coaching', included: true },
            { text: 'Recovery zone (pool, sauna)', included: true },
            { text: 'Personalised meal plan', included: true },
        ],
        popular: false,
        color: '#8b5cf6',
    },
];

export default function Pricing() {
    const [annual, setAnnual] = useState(false);

    return (
        <section className="pricing section" id="pricing">
            <div className="container">
                <div className="pricing__header">
                    <div className="section-tag">✦ Membership Plans</div>
                    <h2 className="section-title">Simple, <span className="text-orange">Transparent</span> Pricing</h2>
                    <p className="section-subtitle">No hidden fees. No contracts. Cancel anytime.</p>

                    <div className="billing-toggle">
                        <span className={!annual ? 'toggle-label--active' : ''}>Monthly</span>
                        <button
                            className={`toggle-switch ${annual ? 'toggle-switch--on' : ''}`}
                            onClick={() => setAnnual(!annual)}
                        />
                        <span className={annual ? 'toggle-label--active' : ''}>Annual <span className="save-badge">Save 25%</span></span>
                    </div>
                </div>

                <div className="pricing__grid">
                    {plans.map((plan, i) => (
                        <div
                            className={`pricing-card ${plan.popular ? 'pricing-card--popular' : ''}`}
                            key={i}
                            style={{ '--color': plan.color }}
                        >
                            {plan.popular && <div className="popular-badge">Most Popular</div>}
                            <div className="plan-top">
                                <span className="plan-emoji">{plan.emoji}</span>
                                <h3 className="plan-name" style={{ color: plan.color }}>{plan.name}</h3>
                                <p className="plan-desc">{plan.desc}</p>
                            </div>
                            <div className="plan-price">
                                <span className="price-currency">$</span>
                                <span className="price-number">{annual ? plan.price.annual : plan.price.monthly}</span>
                                <span className="price-period">/mo</span>
                            </div>
                            <ul className="plan-features">
                                {plan.features.map((f, j) => (
                                    <li key={j} className={`feature-item ${f.included ? 'feature-item--on' : 'feature-item--off'}`}>
                                        <span className="feature-check">{f.included ? '✓' : '✗'}</span>
                                        {f.text}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href="#contact"
                                className={`btn plan-cta ${plan.popular ? 'btn-primary' : 'btn-outline'}`}
                                style={plan.popular ? {} : { borderColor: plan.color, color: plan.color }}
                            >
                                Get Started →
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
