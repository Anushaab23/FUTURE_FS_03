import './Trainers.css';

const trainers = [
    {
        name: 'Marcus Reid',
        role: 'Head Strength Coach',
        image: '/images/trainers/marcus.png',
        exp: '12 Yrs',
        specialty: 'Powerlifting & Olympic Lifting',
        certs: ['NSCA-CSCS', 'USA Weightlifting'],
        color: '#f97316',
        bio: 'Former national powerlifting champion. Marcus has trained over 500 athletes to personal records and podium finishes.',
    },
    {
        name: 'Priya Sharma',
        role: 'HIIT & Conditioning',
        image: '/images/trainers/priya.png',
        exp: '8 Yrs',
        specialty: 'HIIT, Metabolic Conditioning',
        certs: ['NASM-CPT', 'CrossFit L2'],
        color: '#ef4444',
        bio: 'Ex-professional sprinter turned elite coach. Priya\'s classes are legendary for burning 800+ calories in 45 minutes.',
    },
    {
        name: 'Meena Rao',
        role: 'Yoga & Mobility Expert',
        image: '/images/trainers/meena.png',
        exp: '15 Yrs',
        specialty: 'Vinyasa, Restorative Yoga',
        certs: ['RYT-500', 'FMS Certified'],
        color: '#10b981',
        bio: 'Trained in Mysore and certified in three yoga lineages. Meena\'s sessions heal the body and sharpen the mind.',
    },
    {
        name: 'Jake Torres',
        role: 'Cardio & Cycling Coach',
        image: '/images/trainers/jake.png',
        exp: '10 Yrs',
        specialty: 'Indoor Cycling, Running',
        certs: ['ACSM-CPT', 'Spinning® Certified'],
        color: '#06b6d4',
        bio: 'Completed 7 marathons and 2 triathlons. Jake turns cardio from a chore into the highlight of your week.',
    },
];

export default function Trainers() {
    return (
        <section className="trainers section" id="trainers">
            <div className="container">
                <div className="trainers__header">
                    <div className="section-tag">✦ Meet The Coaches</div>
                    <h2 className="section-title">Trained By <span className="text-orange">The Best</span></h2>
                    <p className="section-subtitle">
                        Our coaches are more than instructors — they're mentors, motivators, and movement scientists.
                    </p>
                </div>

                <div className="trainers__grid">
                    {trainers.map((t, i) => (
                        <div className="trainer-card" key={i} style={{ '--color': t.color }}>
                            <div className="trainer-card__top">
                                <div className="trainer-photo-wrap" style={{ borderColor: t.color }}>
                                    <img src={t.image} alt={t.name} className="trainer-photo" />
                                </div>
                                <div className="trainer-exp-badge" style={{ color: t.color, borderColor: `${t.color}40` }}>
                                    {t.exp} Exp.
                                </div>
                            </div>
                            <div className="trainer-card__body">
                                <h3 className="trainer-name">{t.name}</h3>
                                <p className="trainer-role" style={{ color: t.color }}>{t.role}</p>
                                <p className="trainer-bio">{t.bio}</p>
                                <div className="trainer-specialty">
                                    <span className="specialty-label">Specialty:</span> {t.specialty}
                                </div>
                                <div className="trainer-certs">
                                    {t.certs.map((c, j) => (
                                        <span className="cert-badge" key={j}>{c}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

