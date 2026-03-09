import './Footer.css';

const links = {
    'Quick Links': ['Home', 'Classes', 'Trainers', 'Pricing', 'Contact'],
    'Programs': ['Strength', 'HIIT', 'Yoga', 'Boxing', 'Cardio', 'Nutrition'],
    'Company': ['About Us', 'Careers', 'Blog', 'Press', 'Partners'],
};

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__top">
                <div className="container footer__grid">
                    <div className="footer__brand">
                        <div className="footer-logo">
                            <span className="logo-icon">⚡</span>
                            <span className="logo-text">IRON<span className="logo-accent">PEAK</span></span>
                        </div>
                        <p className="footer-tagline">
                            Forging champions since 2012. Your strongest self starts here.
                        </p>
                        <div className="footer-rating">
                            <span className="stars">★★★★★</span>
                            <span>4.9 / 5 on Google · 2,400+ reviews</span>
                        </div>
                    </div>

                    {Object.entries(links).map(([title, items]) => (
                        <div className="footer__col" key={title}>
                            <h4 className="footer-col-title">{title}</h4>
                            <ul>
                                {items.map(item => (
                                    <li key={item}>
                                        <a href="#home" className="footer-link">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="footer__bottom">
                <div className="container footer__bottom-inner">
                    <p>© 2026 IronPeak Fitness. All rights reserved.</p>
                    <div className="footer-legal">
                        <a href="#home">Privacy Policy</a>
                        <a href="#home">Terms of Use</a>
                        <a href="#home">Cookie Policy</a>
                    </div>
                </div>
            </div>


        </footer>
    );
}
