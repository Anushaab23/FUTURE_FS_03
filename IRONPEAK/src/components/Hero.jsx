import { useEffect, useRef, useState } from 'react';
import './Hero.css';

function Counter({ end, suffix = '', duration = 2000 }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true;
                const step = end / (duration / 16);
                let current = 0;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= end) { setCount(end); clearInterval(timer); }
                    else setCount(Math.floor(current));
                }, 16);
            }
        });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
    { value: 2500, suffix: '+', label: 'Active Members' },
    { value: 45, suffix: '+', label: 'Expert Trainers' },
    { value: 120, suffix: '+', label: 'Weekly Classes' },
    { value: 98, suffix: '%', label: 'Satisfaction Rate' },
];

export default function Hero() {
    return (
        <>
            <section className="hero" id="home">
                {/* Background layers */}
                <div className="hero__bg-grid" />
                <div className="hero__bg-blob hero__bg-blob--1" />
                <div className="hero__bg-blob hero__bg-blob--2" />

                <div className="container hero__content">
                    <div className="hero__text fade-up">
                        <h1 className="hero__headline">
                            FORGE YOUR<br />
                            <span className="text-orange hero__gradient-text">STRONGEST</span><br />
                            SELF
                        </h1>
                        <p className="hero__desc">
                            IronPeak Fitness is where champions train. State-of-the-art equipment,
                            world-class trainers, and a community that pushes you beyond your limits every single day.
                        </p>
                        <div className="hero__actions">
                            <a href="#pricing" className="btn btn-primary">
                                Start Free Trial <span>→</span>
                            </a>
                            <a href="#classes" className="btn btn-outline">
                                Explore Classes
                            </a>
                        </div>
                    </div>

                    <div className="hero__visual fade-in">
                        <div className="hero__card-float">
                            <div className="hero__ring hero__ring--1" />
                            <div className="hero__ring hero__ring--2" />
                            <div className="hero__ring hero__ring--3" />
                            <div className="hero__avatar">
                                <img src="/hero-object.png" alt="Futuristic Kettlebell" className="hero__avatar-img" />
                            </div>
                            <div className="hero__badge hero__badge--1">
                                <span className="badge-dot" />
                                <span>Live Classes</span>
                            </div>
                            <div className="hero__badge hero__badge--2">
                                <span>🏆</span>
                                <span>Elite Training</span>
                            </div>
                            <div className="hero__badge hero__badge--3">
                                <span>⚡</span>
                                <span>High Intensity</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Kinetic Typography Marquee - This starts the SECOND PAGE flow */}
            <div className="hero__kinetic-marquee">
                <div className="marquee-wrapper">
                    <div className="marquee-line">
                        <div className="marquee-track">
                            {[...Array(10)].map((_, i) => (
                                <span key={i}>PUSH LIMITS • UNLEASH BEAST • NO EXCUSES • EVOLVE • IRONPEAK FITNESS • </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
