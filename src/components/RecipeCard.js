"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './RecipeCard.module.css';

export default function RecipeCard({ post }) {
  const { title, slug, featuredImage, category, difficulty, prepTime, cookTime } = post;
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`bookmark-${slug}`);
      if (saved === 'true') {
        setIsBookmarked(true);
      }
    }
  }, [slug]);

  const toggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nextState = !isBookmarked;
    setIsBookmarked(nextState);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`bookmark-${slug}`, String(nextState));
    }
  };

  // Determine stunning curated badge based on post keywords
  const getPillBadge = () => {
    const tLower = title.toLowerCase();
    const cLower = category.toLowerCase();
    
    if (tLower.includes('vegan') || tLower.includes('quinoa') || tLower.includes('basil') || tLower.includes('pistachio') || tLower.includes('greens') || tLower.includes('salad')) {
      return 'VEGAN';
    }
    if (tLower.includes('carb') || tLower.includes('caprese') || tLower.includes('avocado') || tLower.includes('ricotta') || tLower.includes('tart') || tLower.includes('heirloom')) {
      return 'LOW CARB';
    }
    if (tLower.includes('salmon') || tLower.includes('shrimp') || tLower.includes('seafood') || tLower.includes('fish') || tLower.includes('tagine')) {
      return 'PESCATARIAN';
    }
    if (tLower.includes('pasta') || tLower.includes('risotto') || tLower.includes('gnocchi') || tLower.includes('soup') || tLower.includes('pudding') || tLower.includes('bread') || tLower.includes('chicken fried')) {
      return 'COMFORT';
    }
    if (cLower.includes('dessert') || tLower.includes('cake') || tLower.includes('tiramisu') || tLower.includes('cheesecake') || tLower.includes('sweet') || tLower.includes('chocolate')) {
      return 'SWEET TREAT';
    }
    return 'QUICK MEAL';
  };

  const badge = getPillBadge();

  // Clean time string (e.g. "25 mins" -> "25 mins")
  const displayTime = prepTime || cookTime || "20 mins";

  return (
    <div className={styles.card}>
      <div className={styles.imgWrapper}>
        <Link href={`/posts/${slug}`}>
          <Image 
            src={featuredImage} 
            alt={title}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </Link>
        
        {/* Floating circular bookmark button in the top-right corner */}
        <button 
          onClick={toggleBookmark}
          className={`${styles.bookmarkBtn} ${isBookmarked ? styles.bookmarked : ''}`}
          aria-label="Save to Cookbook"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: isBookmarked ? '"FILL" 1' : '"FILL" 0' }}>
            bookmark
          </span>
        </button>

        {/* Dynamic pill badge bottom-left corner inside the image */}
        <span className={`${styles.pillBadge} ${styles['badge' + badge.replace(/\s+/g, '')]}`}>
          {badge}
        </span>
      </div>

      <div className={styles.content}>
        <Link href={`/posts/${slug}`}>
          <h3 className={styles.title}>{title}</h3>
        </Link>
        
        {/* Subtle, beautiful metadata line (Time and Difficulty) */}
        <div className={styles.metaRow}>
          <div className={styles.metaItem}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>schedule</span>
            <span>{displayTime}</span>
          </div>
          <div className={styles.metaItem}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-accent)' }}>bolt</span>
            <span>{difficulty}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
