"use client";

import { useState } from 'react';
import styles from './page.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    // Simulate real API submission latency for micro-interaction polish
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 1500);
  };

  return (
    <>
      {/* Contact Header */}
      <section className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>
            Get in <em>Touch</em>
          </h1>
          <p className={styles.intro}>
            Have a question about flavor chemistry, want to contribute a guest article, or want to collaborate with the FlavorZing test kitchen? Drop us a line below.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section style={{ paddingBottom: '4rem' }}>
        <div className="container">
          <div className={styles.grid}>
            {/* Info Cards Column */}
            <div className={styles.infoCol}>
              <div className={`glass ${styles.infoCard}`}>
                <h3 className={styles.infoTitle}>Editorial Desk</h3>
                <p className={styles.infoText}>
                  Send recipe submissions, editorial pitches, or general food science questions directly to our editorial team.<br /><br />
                  <strong>editorial@flavorzing.com</strong>
                </p>
              </div>

              <div className={`glass ${styles.infoCard}`}>
                <h3 className={styles.infoTitle}>Collaborations</h3>
                <p className={styles.infoText}>
                  For partnership inquiries, food brand sponsorships, or cooking laboratory collaborations, contact Chef Elena.<br /><br />
                  <strong>elena@flavorzing.com</strong>
                </p>
              </div>
            </div>

            {/* Interactive Form Card */}
            <div className={`glass ${styles.formCard}`}>
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Your Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      className="input-field"
                      placeholder="Chef Escoffier"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      className="input-field"
                      placeholder="escoffier@kitchen.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="subject" className={styles.label}>Inquiry Subject</label>
                    <select 
                      id="subject"
                      name="subject"
                      className="input-field"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={loading}
                      style={{ cursor: 'pointer' }}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Recipe Suggestion">Recipe Suggestion</option>
                      <option value="Scientific Question">Scientific Question</option>
                      <option value="Brand Partnership">Brand Partnership</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.label}>Your Message</label>
                    <textarea 
                      id="message"
                      name="message"
                      className={`input-field ${styles.textArea}`}
                      placeholder="Describe your culinary inquiry in detail..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary" 
                    style={{ width: '100%' }}
                    disabled={loading}
                  >
                    {loading ? 'Sending Message...' : 'Send Message'}
                  </button>
                </form>
              ) : (
                <div className={styles.successPanel}>
                  <div className={styles.successIcon}>
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}>
                      <path d="M22 2L11 13"></path>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </div>
                  <h3 className={styles.successTitle}>Message Sent!</h3>
                  <p className={styles.successText}>
                    Thank you for reaching out. The FlavorZing editorial kitchen team has received your message and will respond within 24 hours. ✨
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="btn-outline" 
                    style={{ marginTop: '2rem' }}
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
