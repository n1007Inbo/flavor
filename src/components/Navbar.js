"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar({ categories = [] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when off-canvas drawer is active
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
    setMobileDropdownOpen(false); // Reset accordion
  };

  const closeAllMenus = () => {
    setMenuOpen(false);
    setMobileDropdownOpen(false);
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.navContainer}`}>
          {/* Branded Culinary Elegance Logo */}
          <Link href="/" className={styles.logo} onClick={closeAllMenus}>
            Culinary <span className={styles.logoSpan}>Elegance</span>
          </Link>

          <button 
            className={styles.mobileToggle} 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>

          {/* Navigation Links Menu - Match mockups Discover, Categories, Cookbook, About */}
          <ul className={`${styles.navMenu} ${menuOpen ? styles.menuOpen : ''}`}>
            <li>
              <Link 
                href="/" 
                className={`${styles.navLink} ${pathname === '/' ? styles.activeLink : ''}`}
                onClick={closeAllMenus}
              >
                Discover
              </Link>
            </li>

            {/* Dynamic Categories Dropdown Menu */}
            {categories.length > 0 && (
              <li className={`${styles.dropdown} ${styles.navLink}`} style={{ cursor: 'pointer' }}>
                <span 
                  className={styles.dropdownToggle}
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '100%', justifyContent: 'space-between' }}
                >
                  <span>Categories</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s ease', transform: mobileDropdownOpen ? 'rotate(180deg)' : 'none' }}>
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>

                <ul className={`${styles.dropdownContent} ${mobileDropdownOpen ? styles.mobileDropdownOpen : ''}`}>
                  {categories.map((cat) => (
                    <li key={cat} className={styles.dropdownItem}>
                      <Link 
                        href={`/?category=${encodeURIComponent(cat)}#journal`} 
                        onClick={closeAllMenus}
                      >
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}

            <li>
              <Link 
                href="/#journal" 
                className={`${styles.navLink}`}
                onClick={closeAllMenus}
              >
                Cookbook
              </Link>
            </li>
            
            <li>
              <Link 
                href="/about" 
                className={`${styles.navLink} ${pathname === '/about' ? styles.activeLink : ''}`}
                onClick={closeAllMenus}
              >
                About
              </Link>
            </li>
          </ul>

          {/* Toolbar Actions (Bookmark & Profile Icon) matching Culinary Elegance mockups exactly */}
          <div className={styles.navActions}>
            <button className={styles.actionIcon} aria-label="Cookbook Saves">
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>bookmark</span>
            </button>
            <button className={styles.actionIcon} aria-label="Profile Account">
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>account_circle</span>
            </button>
          </div>
        </div>
      </header>

      {/* Off-canvas mobile overlay dimming background */}
      <div 
        className={`${styles.overlay} ${menuOpen ? styles.overlayVisible : ''}`}
        onClick={closeAllMenus}
      />
    </>
  );
}
