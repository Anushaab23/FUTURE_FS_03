import { useState } from 'react';
import './Contact.css';

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', plan: '', message: '' });
    const [sent, setSent] = useState(false);

    const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5001/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const result = await res.json();
            if (result.success) {
                setSent(true);
                setForm({ name: '', email: '', phone: '', plan: '', message: '' });
                setTimeout(() => setSent(false), 4000);
            }
        } catch (err) {
            console.error('Failed to send message:', err);
            alert('Could not send message. Please check the backend.');
        }
    };

    return (
        <section className="contact section" id="contact">
            <div className="container">
                <div className="contact__grid">
                    {/* Info */}
                    <div className="contact__info">
                        <div className="section-tag">✦ Get In Touch</div>
                        <h2 className="section-title">Start Your <span className="text-orange">Journey</span> Today</h2>
                        <p className="section-subtitle" style={{ marginBottom: '36px' }}>
                            Drop us a message, and our team will contact you within 24 hours to set up your free trial session.
                        </p>

                        {/* Google Maps Embed */}
                        <div className="contact-map">
                            <iframe
                                title="IronPeak Fitness Location"
                                src="https://maps.google.com/maps?q=Iron+Peak+Sports+%26+Events,+137+Mountain+View+Rd,+Hillsborough,+NJ+08844&z=15&output=embed"
                                width="100%"
                                height="280"
                                style={{ border: 0, display: 'block' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>


                        <div className="contact-socials">
                            {/* Instagram */}
                            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="social-btn social-btn--instagram" title="Instagram">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
                                </svg>
                            </a>
                            {/* YouTube */}
                            <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="social-btn social-btn--youtube" title="YouTube">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z" />
                                </svg>
                            </a>
                            {/* Facebook */}
                            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" className="social-btn social-btn--facebook" title="Facebook">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99C18.34 21.12 22 16.99 22 12Z" />
                                </svg>
                            </a>
                            {/* WhatsApp */}
                            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="social-btn social-btn--whatsapp" title="WhatsApp">
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.1 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.08 1.76-.72 2.01-1.41.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.34ZM12.05 21.5h-.03a9.42 9.42 0 0 1-4.8-1.31l-.34-.2-3.57.94.96-3.49-.23-.36A9.41 9.41 0 0 1 2.58 12c0-5.2 4.24-9.43 9.45-9.43a9.43 9.43 0 0 1 9.44 9.45c-.01 5.2-4.24 9.43-9.43 9.43V21.5ZM20.52 3.46A11.38 11.38 0 0 0 12.05.5C5.72.5.6 5.62.6 11.95c0 2.01.53 3.98 1.53 5.72L.5 23.5l5.97-1.56a11.44 11.44 0 0 0 5.57 1.42h.01c6.33 0 11.45-5.12 11.45-11.45a11.38 11.38 0 0 0-3.4-8.1l.02.05Z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="contact__form-wrap">
                        {sent ? (
                            <div className="form-success">
                                <div className="success-icon">✅</div>
                                <h3>Message Sent!</h3>
                                <p>We'll reach out within 24 hours. Get ready to start your transformation!</p>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={submit}>
                                <h3 className="form-title">Book a Free Trial</h3>
                                <p className="form-subtitle">Fill in your details and meet us at the gym!</p>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <input name="name" type="text" placeholder="John Smith" value={form.name} onChange={handle} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input name="email" type="email" placeholder="john@email.com" value={form.email} onChange={handle} required />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input name="phone" type="tel" placeholder="+91 98xxx xxxxx" value={form.phone} onChange={handle} />
                                    </div>
                                    <div className="form-group">
                                        <label>Interested Plan</label>
                                        <select name="plan" value={form.plan} onChange={handle} required>
                                            <option value="">Select a plan</option>
                                            <option>Starter – $29/mo</option>
                                            <option>Pro – $59/mo</option>
                                            <option>Elite – $109/mo</option>
                                            <option>Just exploring</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Message (optional)</label>
                                    <textarea name="message" placeholder="Tell us your fitness goals…" rows={4} value={form.message} onChange={handle} />
                                </div>

                                <button type="submit" className="btn btn-primary form-submit">
                                    Book My Free Trial →
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
