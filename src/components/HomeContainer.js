"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import RecipeCard from '@/components/RecipeCard';
import FlavorPairing from '@/components/FlavorPairing';
import Newsletter from '@/components/Newsletter';
import styles from '@/app/page.module.css';

export default function HomeContainer({ initialPosts = [], categories = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(12); // Modern client-side pagination limit

  // Sidebar Filter States (Screenshot 1 specs)
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedMealType, setSelectedMealType] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const filterParam = searchParams.get('filter');

  // Read URL query parameter for categories and bookmarks dynamically
  useEffect(() => {
    if (filterParam === 'bookmarks') {
      setActiveCategory('Bookmarks');
    } else if (categoryParam) {
      const matchedCat = categories.find(
        cat => cat.toLowerCase().trim() === categoryParam.toLowerCase().trim()
      );
      if (matchedCat) {
        setActiveCategory(matchedCat);
      } else if (categoryParam.toLowerCase().trim() === 'all') {
        setActiveCategory('All');
      }
    } else {
      setActiveCategory('All');
    }
  }, [categoryParam, filterParam, categories]);

  // Reset page limit whenever category or search query changes
  useEffect(() => {
    setVisibleCount(12);
  }, [activeCategory, searchQuery, selectedCuisines, selectedMealType, selectedDifficulty]);

  // Dynamic filter logic combining categories, search bar, and Left Sidebar controls!
  const filteredPosts = initialPosts.filter((post) => {
    // 1. Category Filter (horizontal circle filter or dropdown filter)
    let matchesCategory = false;
    if (activeCategory === 'All') {
      matchesCategory = true;
    } else if (activeCategory === 'Bookmarks') {
      if (typeof window !== 'undefined') {
        matchesCategory = localStorage.getItem(`bookmark-${post.slug}`) === 'true';
      } else {
        matchesCategory = false;
      }
    } else {
      matchesCategory = post.category.toLowerCase().trim() === activeCategory.toLowerCase().trim();
    }
    
    // 2. Search Box Filter
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags && Array.isArray(post.tags) && post.tags.some(tag => 
        typeof tag === 'string' && tag.toLowerCase().includes(searchQuery.toLowerCase())
      ));

    // 3. Cuisine Sidebar Filters (Italian, Mexican, Indian, Japanese)
    const matchesCuisine = selectedCuisines.length === 0 || selectedCuisines.includes(post.cuisine);

    // 4. Meal Type Sidebar Filters (Breakfast, Lunch, Dinner)
    const matchesMealType = selectedMealType === 'All' || post.mealType === selectedMealType;

    // 5. Difficulty Sidebar Filters (Easy, Intermediate, Advanced)
    const matchesDifficulty = selectedDifficulty === 'All' || 
      post.difficulty === selectedDifficulty;

    return matchesCategory && matchesSearch && matchesCuisine && matchesMealType && matchesDifficulty;
  });

  // Spotlight post is always the latest post (first element)
  const spotlightPost = initialPosts[0];
  
  // Since there is no duplicate spotlight post layout, keep all posts in the grid
  const gridPosts = filteredPosts;

  // Modern pagination slicing for client side rendering speed
  const slicedGridPosts = gridPosts.slice(0, visibleCount);

  // Smooth scroll category circle selector helper
  const handleCategoryCircleClick = (category) => {
    setActiveCategory(category);
    const journalSection = document.getElementById('journal');
    if (journalSection) {
      journalSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Toggle cuisine checkbox state helper
  const handleCuisineToggle = (cuisine) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisine) ? prev.filter(c => c !== cuisine) : [...prev, cuisine]
    );
  };

  return (
    <>
      {/* Premium Hero Section with Overlapping Search Card (Screenshot 2) */}
      <section className={styles.hero}>
        <div className={styles.heroCard}>
          <h1 className={styles.heroTitle}>The Art of Home Cooking</h1>
          <p className={styles.heroSubtitle}>
            Discover curated recipes that blend professional precision with the soul of home-cooked meals.
          </p>
          <div className={styles.heroSearchBox}>
            <input 
              type="text" 
              placeholder="Find your next favorite recipe..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className={`material-symbols-outlined ${styles.heroSearchIcon}`}>search</span>
          </div>
        </div>
      </section>

      {/* Breathtaking Circular Categories Section (Screenshot 2) */}
      <section className={styles.categoriesSection}>
        <div className="container">
          <div className={styles.categoriesRow}>
            {/* Breakfast Capsule */}
            <div className={styles.categoryCapsule} onClick={() => handleCategoryCircleClick('Breakfast')}>
              <div className={styles.circleImageWrapper}>
                <Image 
                  src="https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=300&q=80" 
                  alt="Breakfast" 
                  fill
                  className={styles.categoryImage}
                />
              </div>
              <span className={`${styles.categoryLabel} ${activeCategory === 'Breakfast' ? styles.activeCategoryLabel : ''}`}>Breakfast</span>
            </div>

            {/* Salad/Vegan Capsule */}
            <div className={styles.categoryCapsule} onClick={() => handleCategoryCircleClick('Salad')}>
              <div className={styles.circleImageWrapper}>
                <Image 
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80" 
                  alt="Vegan / Salad" 
                  fill
                  className={styles.categoryImage}
                />
              </div>
              <span className={`${styles.categoryLabel} ${activeCategory === 'Salad' ? styles.activeCategoryLabel : ''}`}>Vegan & Salad</span>
            </div>

            {/* Quick Beef Meals Capsule */}
            <div className={styles.categoryCapsule} onClick={() => handleCategoryCircleClick('Beef')}>
              <div className={styles.circleImageWrapper}>
                <Image 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80" 
                  alt="Beef / Quick Meals" 
                  fill
                  className={styles.categoryImage}
                />
              </div>
              <span className={`${styles.categoryLabel} ${activeCategory === 'Beef' ? styles.activeCategoryLabel : ''}`}>Beef / Steaks</span>
            </div>

            {/* Dessert Capsule */}
            <div className={styles.categoryCapsule} onClick={() => handleCategoryCircleClick('Dessert')}>
              <div className={styles.circleImageWrapper}>
                <Image 
                  src="https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&w=300&q=80" 
                  alt="Dessert" 
                  fill
                  className={styles.categoryImage}
                />
              </div>
              <span className={`${styles.categoryLabel} ${activeCategory === 'Dessert' ? styles.activeCategoryLabel : ''}`}>Desserts & Sweets</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Flavor Pairing Tool */}
      <FlavorPairing />

      {/* Dynamic Blog/Journal Split Grid & Sidebar Layout (Screenshot 1) */}
      <section className={styles.journalSection} id="journal">
        <div className="container">
          <div className={styles.sectionHeader}>
            <span>Our Recipes</span>
            <h2>{activeCategory === 'Bookmarks' ? 'My Saved Cookbook' : 'Baking & Sweets Collection'}</h2>
          </div>

          <div className={styles.mainLayout}>
            {/* Left Sidebar Filters (Screenshot 1 Specs!) */}
            <aside className={styles.sidebar}>
              {/* Cuisine Group */}
              <div className={styles.sidebarGroup}>
                <h3 className={styles.sidebarTitle}>Cuisine</h3>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    className={styles.checkboxInput}
                    checked={selectedCuisines.includes('Italian')}
                    onChange={() => handleCuisineToggle('Italian')}
                  />
                  <span>Italian</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    className={styles.checkboxInput}
                    checked={selectedCuisines.includes('Mexican')}
                    onChange={() => handleCuisineToggle('Mexican')}
                  />
                  <span>Mexican</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    className={styles.checkboxInput}
                    checked={selectedCuisines.includes('Indian')}
                    onChange={() => handleCuisineToggle('Indian')}
                  />
                  <span>Indian</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    className={styles.checkboxInput}
                    checked={selectedCuisines.includes('Japanese')}
                    onChange={() => handleCuisineToggle('Japanese')}
                  />
                  <span>Japanese</span>
                </label>
              </div>

              <div className={styles.sidebarDivider} />

              {/* Meal Type Group */}
              <div className={styles.sidebarGroup}>
                <h3 className={styles.sidebarTitle}>Meal Type</h3>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="radio" 
                    name="mealType"
                    className={styles.radioInput}
                    checked={selectedMealType === 'All'}
                    onChange={() => setSelectedMealType('All')}
                  />
                  <span>All</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="radio" 
                    name="mealType"
                    className={styles.radioInput}
                    checked={selectedMealType === 'Breakfast'}
                    onChange={() => setSelectedMealType('Breakfast')}
                  />
                  <span>Breakfast</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="radio" 
                    name="mealType"
                    className={styles.radioInput}
                    checked={selectedMealType === 'Lunch'}
                    onChange={() => setSelectedMealType('Lunch')}
                  />
                  <span>Lunch</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input 
                    type="radio" 
                    name="mealType"
                    className={styles.radioInput}
                    checked={selectedMealType === 'Dinner'}
                    onChange={() => setSelectedMealType('Dinner')}
                  />
                  <span>Dinner</span>
                </label>
              </div>

              <div className={styles.sidebarDivider} />

              {/* Difficulty Group */}
              <div className={styles.sidebarGroup}>
                <h3 className={styles.sidebarTitle}>Difficulty</h3>
                <div className={styles.difficultyRow}>
                  <button 
                    className={`${styles.diffPill} ${selectedDifficulty === 'All' ? styles.activeDiffPill : ''}`}
                    onClick={() => setSelectedDifficulty('All')}
                  >
                    All
                  </button>
                  <button 
                    className={`${styles.diffPill} ${selectedDifficulty === 'Easy' ? styles.activeDiffPill : ''}`}
                    onClick={() => setSelectedDifficulty('Easy')}
                  >
                    Easy
                  </button>
                  <button 
                    className={`${styles.diffPill} ${selectedDifficulty === 'Intermediate' ? styles.activeDiffPill : ''}`}
                    onClick={() => setSelectedDifficulty('Intermediate')}
                  >
                    Medium
                  </button>
                  <button 
                    className={`${styles.diffPill} ${selectedDifficulty === 'Advanced' ? styles.activeDiffPill : ''}`}
                    onClick={() => setSelectedDifficulty('Advanced')}
                  >
                    Hard
                  </button>
                </div>
              </div>
            </aside>

            {/* Right Recipe Grid */}
            <div className={styles.gridContainer}>
              <div className={styles.grid}>
                {slicedGridPosts.length > 0 ? (
                  slicedGridPosts.map((post) => (
                    <RecipeCard key={post.id} post={post} />
                  ))
                ) : (
                  <div className={styles.noResults}>
                    <h3>No recipes found</h3>
                    <p>We couldn't find any recipes matching your sidebar criteria or search query.</p>
                  </div>
                )}
              </div>

              {/* Premium Cozy Load More Button */}
              {gridPosts.length > visibleCount && (
                <div className={styles.loadMoreContainer}>
                  <button 
                    onClick={() => setVisibleCount((prev) => prev + 12)}
                    className="btn-primary"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      borderRadius: '30px',
                      padding: '0.9rem 2.5rem'
                    }}
                  >
                    <span>Load More Recipes</span>
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </>
  );
}
