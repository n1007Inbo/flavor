"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar({ categories = [] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
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
    if (menuOpen || drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen, drawerOpen]);

  // Load bookmarks dynamically from local storage details
  const loadBookmarks = () => {
    if (typeof window !== 'undefined') {
      const items = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('bookmark-details-')) {
          try {
            const data = JSON.parse(localStorage.getItem(key));
            if (data && data.slug) {
              items.push(data);
            }
          } catch (e) {
            console.error("Failed to parse bookmark:", e);
          }
        }
      }
      setBookmarks(items);
    }
  };

  useEffect(() => {
    loadBookmarks();
    window.addEventListener('bookmarks-updated', loadBookmarks);
    return () => window.removeEventListener('bookmarks-updated', loadBookmarks);
  }, []);

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
    setMobileDropdownOpen(false);
  };

  const closeAllMenus = () => {
    setMenuOpen(false);
    setMobileDropdownOpen(false);
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.navContainer}`}>
          {/* Branded FlavorZing Logo */}
          <Link href="/" className={styles.logo} onClick={closeAllMenus}>
            Flavor<span className={styles.logoSpan}>Zing</span>
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

          {/* Navigation Links Menu */}
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
              <button 
                onClick={() => { closeAllMenus(); setDrawerOpen(true); }}
                className={`${styles.navLink} ${styles.navLinkBtn}`}
              >
                Cookbook
              </button>
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

          {/* Toolbar Actions */}
          <div className={styles.navActions}>
            <button className={styles.actionIcon} aria-label="Cookbook Saves" onClick={() => setDrawerOpen(true)}>
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>bookmark</span>
              {bookmarks.length > 0 && (
                <span className={styles.actionBadge}>{bookmarks.length}</span>
              )}
            </button>
            <Link href="/contact" className={styles.actionIcon} aria-label="Profile Account" onClick={closeAllMenus}>
              <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>account_circle</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Slide-out Saved Cookbook Sidebar Drawer */}
      <div className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ''}`}>
        <div className={styles.drawerHeader}>
          <div className={styles.drawerHeaderTitle}>
            <span className="material-symbols-outlined" style={{ color: 'hsl(var(--color-primary))', fontSize: '28px' }}>bookmark</span>
            <h3>Saved Cookbook</h3>
          </div>
          <button className={styles.drawerClose} onClick={() => setDrawerOpen(false)} aria-label="Close drawer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className={styles.drawerBody}>
          {bookmarks.length > 0 ? (
            <div className={styles.drawerList}>
              {bookmarks.map((bk) => (
                <Link 
                  key={bk.slug} 
                  href={`/posts/${bk.slug}`} 
                  className={styles.drawerItem}
                  onClick={() => setDrawerOpen(false)}
                >
                  <div className={styles.drawerItemImg}>
                    <Image 
                      src={bk.featuredImage || "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=150&q=80"} 
                      alt={bk.title} 
                      fill 
                      style={{ objectFit: 'cover' }} 
                    />
                  </div>
                  <div className={styles.drawerItemInfo}>
                    <span className={styles.drawerItemCategory}>{bk.category}</span>
                    <h4 className={styles.drawerItemTitle}>{bk.title}</h4>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.drawerEmpty}>
              <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#c6bbb0', marginBottom: '1rem' }}>
                book_to_go
              </span>
              <h4>Your cookbook is empty</h4>
              <p>Save recipes while browsing to keep them here for quick access!</p>
              <Link href="/" className="btn-primary" style={{ marginTop: '1.5rem', borderRadius: '30px', padding: '0.75rem 2rem' }} onClick={() => setDrawerOpen(false)}>
                Explore Recipes
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Dimmed drawer backdrop */}
      {drawerOpen && (
        <div className={styles.drawerBackdrop} onClick={() => setDrawerOpen(false)} />
      )}

      {/* Off-canvas mobile overlay dimming background */}
      <div 
        className={`${styles.overlay} ${menuOpen ? styles.overlayVisible : ''}`}
        onClick={closeAllMenus}
      />
    </>
  );
}
