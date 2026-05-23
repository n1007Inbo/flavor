"use client";

import { useState } from 'react';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    // Simulate API delay for a highly realistic micro-interaction feel
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setEmail('');
    }, 1200);
  };

  return (
    <section className={styles.section} id="newsletter">
      <div className="container">
        <div className={`glass ${styles.card}`}>
          {!submitted ? (
            <>
              <h2 className={styles.title}>Join The Gastronomy Club</h2>
              <p className={styles.text}>
                Get monthly deep dives into flavor science, exclusive culinary pairing guides, and updates from the FlavorZing test kitchen.
              </p>
              
              <form onSubmit={handleSubmit} className={styles.form}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address" 
                  className="input-field"
                  required
                  disabled={loading}
                />
                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ minWidth: '150px' }}
                  disabled={loading}
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </>
          ) : (
            <div className={styles.successWrapper}>
              <div className={styles.successIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block' }}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className={styles.successTitle}>Welcome to the Club!</h3>
              <p className={styles.successText}>
                Your subscription was activated successfully. Prepare your palate for amazing culinary science insights! ✨
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
