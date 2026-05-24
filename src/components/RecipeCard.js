"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './RecipeCard.module.css';

export default function RecipeCard({ post }) {
  const { title, slug, featuredImage, category, difficulty, prepTime, cookTime } = post;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imgSrc, setImgSrc] = useState(featuredImage);
  const router = useRouter();

  useEffect(() => {
    setImgSrc(featuredImage);
  }, [featuredImage]);

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
      if (nextState) {
        localStorage.setItem(`bookmark-details-${slug}`, JSON.stringify({
          title,
          slug,
          featuredImage,
          category: category || "Recipes"
        }));
      } else {
        localStorage.removeItem(`bookmark-details-${slug}`);
      }
      // Trigger a custom event to notify the Navbar to refresh its drawer list!
      window.dispatchEvent(new Event('bookmarks-updated'));
    }
  };

  // Determine stunning curated badge based on post keywords
  const getPillBadge = () => {
    const tLower = title.toLowerCase();
    const cLower = category ? category.toLowerCase() : '';
    
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

  // Clean time string
  const displayTime = prepTime || cookTime || "20 Mins";

  const handleCardClick = (e) => {
    if (e.target.closest(`.${styles.bookmarkBtn}`)) {
      return;
    }
    router.push(`/posts/${slug}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
      <div className={styles.imgWrapper}>
        <Image 
          src={imgSrc || "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"} 
          alt={title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          onError={() => {
            setImgSrc("https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80");
          }}
        />
        
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
        <h3 className={styles.title}>{title}</h3>
        
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
