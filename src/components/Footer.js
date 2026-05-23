import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <div className={styles.logo}>
              Flavor<span className={styles.logoSpan}>Zing</span>
            </div>
            <p className={styles.tagline}>
              Exploring the science, culture, and sensory artistry of gastronomy. Connecting flavors, unlocking hidden sensory profiles, and crafting modern culinary journeys.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialIcon} aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Pinterest">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 22c-.5-1.5-.2-2.8.2-4.1C8.7 16.6 9 14.5 9 14.5s-.6-1.2-.6-3c0-2.8 1.6-4.9 3.6-4.9 1.7 0 2.5 1.3 2.5 2.8 0 1.7-1.1 4.3-1.6 6.7-.5 2 1 3.6 3 3.6 3.6 0 6.4-3.8 6.4-9.3 0-4.8-3.5-8.2-8.4-8.2-5.7 0-9.1 4.3-9.1 8.8 0 1.7.7 3.6 1.5 4.6.2.2.2.4.1.7-.1.6-.4 1.7-.5 1.9-.1.3-.3.4-.6.3-2.1-1-3.4-4-3.4-6.5C1 6 5 1 12.5 1 18.5 1 23 5.3 23 11c0 6-3.8 10.8-9 10.8-1.8 0-3.4-.9-4-2.1 0 0-.9 3.4-1.1 4.2-.4 1.5-1.5 3.4-2.2 4.6z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={styles.title}>Menu</h3>
            <ul className={styles.links}>
              <li className={styles.linkItem}>
                <Link href="/">Home</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/about">About Us</Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className={styles.title}>Gastronomy HQ</h3>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>Vercel Clouds & Hostinger Domains</span>
              </div>
              <div className={styles.contactItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>hello@flavorzing.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottomRow}>
          <div className={styles.copyright}>
            &copy; {currentYear} FlavorZing. All rights reserved. Powered by Next.js & Headless WordPress.
          </div>
          <div className={styles.crafted}>
            Crafted for Culinary Adventurers
          </div>
        </div>
      </div>
    </footer>
  );
}
