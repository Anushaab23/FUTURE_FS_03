import { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Classes', href: '#classes' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const observerRef = useRef(null);

  // Scroll detection for navbar background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: detect which section is in view on scroll
  useEffect(() => {
    const sectionIds = links.map(l => l.href.replace('#', ''));

    const handleScroll = () => {
      const scrollY = window.scrollY + 150; // offset for navbar height

      // Check sections in reverse order so the last visible section wins
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveLink(`#${sectionIds[i]}`);
          break;
        }
      }

      // If at the very top, highlight Home
      if (window.scrollY < 100) {
        setActiveLink('#home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // run once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setActiveLink(href);
    setMenuOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a href="#home" className="navbar__logo" onClick={() => handleNavClick('#home')}>
          <span className="logo-icon">⚡</span>
          <span className="logo-text">IRON<span className="logo-accent">PEAK</span></span>
        </a>

        <nav className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-link ${activeLink === l.href ? 'nav-link--active' : ''}`}
              onClick={() => handleNavClick(l.href)}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary nav-cta" onClick={() => handleNavClick('#contact')}>
            Join Now
          </a>
        </nav>

        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
