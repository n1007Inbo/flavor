"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RecipeCard from '@/components/RecipeCard';
import PostContent from '@/components/PostContent';
import styles from './RecipeDetailContainer.module.css';

// Helper function to format quantities into beautiful fractions
function formatQuantity(qty) {
  if (!qty || isNaN(qty)) return '';
  const whole = Math.floor(qty);
  const decimal = qty - whole;
  
  let frac = '';
  if (Math.abs(decimal - 0.25) < 0.05) frac = '1/4';
  else if (Math.abs(decimal - 0.5) < 0.05) frac = '1/2';
  else if (Math.abs(decimal - 0.75) < 0.05) frac = '3/4';
  else if (Math.abs(decimal - 0.33) < 0.05) frac = '1/3';
  else if (Math.abs(decimal - 0.66) < 0.05) frac = '2/3';
  else if (Math.abs(decimal - 0.125) < 0.03) frac = '1/8';
  
  if (whole === 0) {
    return frac || qty.toFixed(1).replace('.0', '');
  }
  
  if (frac) {
    return `${whole} ${frac}`;
  }
  
  return qty.toFixed(1).replace('.0', '');
}

export default function RecipeDetailContainer({ post, relatedPosts = [] }) {
  const { title, slug, excerpt, featuredImage, category, difficulty, prepTime, cookTime, calories, recipe, content } = post;

  const baseServings = recipe?.servings || 4;
  const [servings, setServings] = useState(baseServings);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [doneSteps, setDoneSteps] = useState({});
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [images, setImages] = useState([featuredImage]);
  const [activeImage, setActiveImage] = useState(featuredImage);

  useEffect(() => {
    setActiveImage(featuredImage);
  }, [featuredImage]);

  useEffect(() => {
    if (typeof window !== 'undefined' && content) {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const imgElements = doc.querySelectorAll('img');
        const urls = [featuredImage];
        imgElements.forEach(img => {
          const src = img.getAttribute('src');
          if (src && !urls.includes(src)) {
            urls.push(src);
          }
        });
        setImages(urls);
      } catch (error) {
        console.error("Failed to parse images from content:", error);
      }
    }
  }, [content, featuredImage]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`bookmark-${slug}`);
      if (saved === 'true') {
        setIsBookmarked(true);
      }
    }
  }, [slug]);

  const toggleBookmark = () => {
    const nextState = !isBookmarked;
    setIsBookmarked(nextState);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`bookmark-${slug}`, String(nextState));
    }
  };

  const scale = servings / baseServings;

  const toggleIngredient = (e, index) => {
    e.stopPropagation();
    setCheckedIngredients(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleStep = (e, index) => {
    e.stopPropagation();
    setDoneSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const incrementServings = () => {
    setServings(prev => Math.min(prev + 1, 24));
  };

  const decrementServings = () => {
    setServings(prev => Math.max(prev - 1, 1));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleJumpToRecipe = () => {
    const cardEl = document.querySelector(`.${styles.recipeCardBox}`);
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Generate dynamic, meaningful title headers for instruction steps based on actual content keywords
  const getStepHeader = (step, index) => {
    let text = "";
    if (typeof step === 'string') {
      text = step;
    } else if (step && typeof step === 'object') {
      text = step.text || step.name || "";
    }
    
    if (!text) return `STEP ${index + 1}`;
    
    const sLower = text.toLowerCase();

    // Try to extract an existing header pattern like "SAUTE THE MUSHROOMS:" from the step text
    const headerMatch = text.match(/^([A-Z][A-Z\s&']{3,30})[:\-\.]/);
    if (headerMatch) {
      return headerMatch[1].trim();
    }

    // Keyword-based dynamic header generation from instruction content
    const keywordMap = [
      { keywords: ['preheat', 'oven'], header: 'PREHEAT & PREPARE' },
      { keywords: ['sauté', 'saute', 'sear'], header: 'SAUTÉ & SEAR' },
      { keywords: ['boil', 'water', 'blanch'], header: 'BOIL & BLANCH' },
      { keywords: ['mix', 'combine', 'whisk', 'stir together'], header: 'MIX & COMBINE' },
      { keywords: ['bake', 'oven'], header: 'BAKE TO PERFECTION' },
      { keywords: ['toast', 'brown'], header: 'TOAST THE BASE' },
      { keywords: ['simmer', 'deglaze', 'reduce'], header: 'SIMMER & REDUCE' },
      { keywords: ['fold', 'gently'], header: 'FOLD & FINISH' },
      { keywords: ['serve', 'plate', 'garnish'], header: 'SERVE & GARNISH' },
      { keywords: ['cool', 'rest', 'chill'], header: 'REST & COOL' },
      { keywords: ['chop', 'dice', 'mince', 'slice', 'cut'], header: 'PREP & CHOP' },
      { keywords: ['marinate', 'season', 'rub', 'coat'], header: 'SEASON & MARINATE' },
      { keywords: ['fry', 'deep fry', 'pan fry'], header: 'FRY TO GOLDEN' },
      { keywords: ['grill', 'char', 'barbecue'], header: 'GRILL & CHAR' },
      { keywords: ['cream', 'butter', 'frosting', 'frost'], header: 'CREAM & FROST' },
      { keywords: ['pour', 'drizzle', 'glaze'], header: 'GLAZE & DRIZZLE' },
      { keywords: ['knead', 'dough', 'rise'], header: 'KNEAD & RISE' },
      { keywords: ['layer', 'assemble', 'stack'], header: 'LAYER & ASSEMBLE' },
    ];

    for (const entry of keywordMap) {
      if (entry.keywords.some(kw => sLower.includes(kw))) {
        return entry.header;
      }
    }
    
    // Fallback: extract first 3 meaningful words in uppercase
    const words = text.split(' ').slice(0, 3).join(' ').toUpperCase().replace(/[^A-Z\s]/g, '');
    return words || `STEP ${index + 1}`;
  };

  const ingredientList = recipe?.ingredients || [
    { qty: 2, unit: "cups", name: "Arborio Rice" },
    { qty: 500, unit: "g", name: "Mixed wild mushrooms (Porcini, Cremini)" },
    { qty: 6, unit: "cups", name: "Warm vegetable broth" },
    { qty: 0.5, unit: "cup", name: "Dry white wine" },
    { qty: 2, unit: "tbsp", name: "High-quality truffle oil" },
    { qty: 2, unit: "cloves", name: "Garlic, finely minced" }
  ];

  const instructionSteps = recipe?.instructions || [
    "SAUTE THE MUSHROOMS: In a large wide-bottomed pan, heat 1 tablespoon of olive oil over medium-high heat. Add the sliced mushrooms and sauté until they release their moisture and turn golden brown. Remove half of the mushrooms and set aside for topping.",
    "TOAST THE RICE: Add the Arborio rice to the pan. Stir constantly for 2-3 minutes, ensuring every grain is coated in the oils and the edges of the rice become slightly translucent. This 'toasting' step is crucial for the final texture.",
    "DEGLAZE AND SIMMER: Pour in the white wine and stir until the liquid has been fully absorbed by the rice. Begin adding the warm vegetable broth, one ladle at a time. Wait until each ladle is almost completely absorbed before adding the next.",
    "THE FINISHING TOUCH: Continue adding broth until the rice is tender but still has a slight 'al dente' bite (usually about 20-25 minutes). Remove from heat. Stir in the Parmesan cheese, butter, and truffle oil. Cover and let sit for 2 minutes to rest.",
    "SERVE AND GARNISH: Divide into warm bowls. Top with the reserved golden mushrooms, freshly shaved black truffle, and a sprinkle of parsley. Serve immediately while the texture is peak creaminess."
  ];

  return (
    <div className={styles.container}>
      {/* Top Split Layout */}
      <div className={styles.topSplit}>
        {/* Left Column: Big Image & Dynamic Gallery */}
        <div className={styles.imageCol}>
          <div className={styles.badgeOverlay}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>star</span>
            <span>Chef's Choice</span>
          </div>
          
          <div className={styles.mainImageWrapper}>
            <Image 
              src={activeImage} 
              alt={title}
              fill
              className={styles.mainImage}
              priority
            />
          </div>

          {/* Premium parsed thumbnail gallery row - only displays when extra images exist */}
          {images.length > 1 && (
            <div className={styles.galleryRow}>
              {images.slice(0, 4).map((imgUrl, idx) => {
                const isMore = idx === 3 && images.length > 4;
                const remainingCount = images.length - 4;

                return (
                  <div 
                    key={idx} 
                    className={`${styles.galleryItem} ${activeImage === imgUrl ? styles.galleryActive : ''}`}
                    onClick={() => setActiveImage(imgUrl)}
                  >
                    <Image src={imgUrl} alt={`Process ${idx + 1}`} fill />
                    {isMore && (
                      <div className={styles.galleryMoreOverlay}>
                        <span>+{remainingCount} more</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Editorial Title & Details */}
        <div className={styles.infoCol}>
          <div className={styles.editorialCategory}>{category}</div>
          <h1 className={styles.editorialTitle}>{title}</h1>
          <p className={styles.editorialExcerpt}>{excerpt || "A carefully crafted, flavor-harmonic masterpiece perfect for home cooking enthusiasts seeking elegant dining experiences."}</p>

          {/* Dynamic Highlight Metadata Grid */}
          <div className={styles.metadataGrid}>
            <div className={styles.metaBox}>
              <span className="material-symbols-outlined">schedule</span>
              <div className={styles.metaBoxContent}>
                <span className={styles.metaLabel}>PREP TIME</span>
                <span className={styles.metaValue}>{prepTime || "15 Mins"}</span>
              </div>
            </div>
            <div className={styles.metaBox}>
              <span className="material-symbols-outlined">schedule</span>
              <div className={styles.metaBoxContent}>
                <span className={styles.metaLabel}>COOK TIME</span>
                <span className={styles.metaValue}>{cookTime || "35 Mins"}</span>
              </div>
            </div>
            <div className={styles.metaBox}>
              <span className="material-symbols-outlined">restaurant</span>
              <div className={styles.metaBoxContent}>
                <span className={styles.metaLabel}>SERVINGS</span>
                <span className={styles.metaValue}>{servings} People</span>
              </div>
            </div>
            <div className={styles.metaBox}>
              <span className="material-symbols-outlined">bolt</span>
              <div className={styles.metaBoxContent}>
                <span className={styles.metaLabel}>CALORIES</span>
                <span className={styles.metaValue}>{calories || "420 kcal"}</span>
              </div>
            </div>
          </div>

          {/* Servings Adjustment Buttons */}
          <div className={styles.servingsScaler}>
            <span className={styles.scaleLabel}>Adjust Recipe Yield:</span>
            <div className={styles.scaleControls}>
              <button onClick={decrementServings} className={styles.scaleBtn} disabled={servings <= 1}>-</button>
              <span className={styles.servingsCount}>{servings}</span>
              <button onClick={incrementServings} className={styles.scaleBtn}>+</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button 
              onClick={toggleBookmark}
              className={`${styles.saveButton} ${isBookmarked ? styles.saved : ''}`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isBookmarked ? '"FILL" 1' : '"FILL" 0' }}>
                bookmark
              </span>
              <span>{isBookmarked ? 'Saved to Cookbook' : 'Save to Cookbook'}</span>
            </button>
            
            <button onClick={handleJumpToRecipe} className={styles.jumpButton}>
              <span className="material-symbols-outlined">arrow_downward</span>
              <span>Jump to Recipe</span>
            </button>

            <button onClick={handlePrint} className={styles.printButton}>
              <span className="material-symbols-outlined">print</span>
              <span>Print Recipe</span>
            </button>
          </div>

          {/* Organic Diet Pills */}
          <div className={styles.dietTags}>
            <span className={styles.dietPill}>Vegetarian</span>
            <span className={styles.dietPill}>Gluten-Free</span>
            <span className={styles.dietPill}>Organic Premium</span>
          </div>
        </div>
      </div>

      {/* Dynamic Editorial Content HTML from WordPress (Paragraphs & Images) */}
      {content && (
        <div className={styles.blogContentRow}>
          <PostContent content={content} />
        </div>
      )}

      {/* Unified premium boxed "Recipe Box" layout (Screenshot 4) */}
      <div className={styles.recipeCardBox}>
        {/* Box Card Header */}
        <div className={styles.recipeBoxHeader}>
          <div className={styles.recipeBoxTitleCol}>
            <span className={styles.recipeBoxCategory}>Recipe Box</span>
            <h2 className={styles.recipeBoxTitle}>{title}</h2>
          </div>
          
          <button onClick={handlePrint} className={styles.recipeBoxPrintBtn}>
            <span className="material-symbols-outlined">print</span>
            <span>Print Recipe</span>
          </button>
        </div>

        {/* Recipe Box Metadata Bar */}
        <div className={styles.recipeBoxMetaRow}>
          <div className={styles.recipeBoxMetaItem}>
            <span className="material-symbols-outlined">schedule</span>
            <div>
              <span className={styles.recipeBoxMetaLabel}>Prep Time</span>
              <span className={styles.recipeBoxMetaVal}>{prepTime || "15 Mins"}</span>
            </div>
          </div>
          <div className={styles.recipeBoxMetaItem}>
            <span className="material-symbols-outlined">schedule</span>
            <div>
              <span className={styles.recipeBoxMetaLabel}>Cook Time</span>
              <span className={styles.recipeBoxMetaVal}>{cookTime || "35 Mins"}</span>
            </div>
          </div>
          <div className={styles.recipeBoxMetaItem}>
            <span className="material-symbols-outlined">restaurant</span>
            <div>
              <span className={styles.recipeBoxMetaLabel}>Servings</span>
              <span className={styles.recipeBoxMetaVal}>{servings} Servings</span>
            </div>
          </div>
          <div className={styles.recipeBoxMetaItem}>
            <span className="material-symbols-outlined">bolt</span>
            <div>
              <span className={styles.recipeBoxMetaLabel}>Calories</span>
              <span className={styles.recipeBoxMetaVal}>{calories || "420 kcal"}</span>
            </div>
          </div>
        </div>

        {/* Servings Scaler Inside Card */}
        <div className={styles.recipeBoxScaler}>
          <span className={styles.recipeBoxScalerLabel}>Adjust Servings:</span>
          <div className={styles.recipeBoxScalerControls}>
            <button onClick={decrementServings} className={styles.recipeBoxScalerBtn} disabled={servings <= 1}>-</button>
            <span className={styles.recipeBoxScalerCount}>{servings}</span>
            <button onClick={incrementServings} className={styles.recipeBoxScalerBtn}>+</button>
          </div>
        </div>

        {/* Bottom Split Layout inside the card */}
        <div className={styles.bottomSplit}>
          {/* Left Column (40% width): Ingredients Checklist */}
          <div className={styles.ingredientsCol}>
            <h3 className={styles.sectionTitle}>Ingredients</h3>
            <ul className={styles.ingredientsList}>
              {ingredientList.map((item, index) => {
                if (!item) return null;
                const isChecked = !!checkedIngredients[index];
                
                let qty = null;
                let unit = "";
                let name = "";
                
                if (typeof item === 'string') {
                  name = item;
                } else if (item && typeof item === 'object') {
                  qty = item.qty || null;
                  unit = item.unit || "";
                  name = item.name || "";
                }
                
                const scaledQty = qty ? qty * scale : null;
                
                return (
                  <li 
                    key={index} 
                    className={`${styles.ingredientItem} ${isChecked ? styles.checked : ''}`}
                    onClick={(e) => toggleIngredient(e, index)}
                  >
                    <div className={styles.checkbox}>
                      {isChecked && (
                        <span className="material-symbols-outlined" style={{ fontSize: '14px', fontWeight: 'bold' }}>
                          check
                        </span>
                      )}
                    </div>
                    <span className={styles.ingredientText}>
                      {scaledQty && <span className={styles.qty}>{formatQuantity(scaledQty)} </span>}
                      {unit && <span className={styles.unit}>{unit} </span>}
                      <span>{name}</span>
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* Pro Tip Callout Card */}
            <div className={styles.proTipCard}>
              <div className={styles.proTipTitle}>PRO TIP</div>
              <p className={styles.proTipText}>
                "Make sure to read through the entire set of steps before starting. Preparation is key to beautiful texture and perfect flavor balance!"
              </p>
            </div>
          </div>

          {/* Right Column (60% width): Circle Instructions */}
          <div className={styles.instructionsCol}>
            <h3 className={styles.sectionTitle}>Instructions</h3>
            <ol className={styles.instructionsList}>
              {instructionSteps.map((step, index) => {
                const isDone = !!doneSteps[index];
                const stepTitle = getStepHeader(step, index);
                
                let stepText = "";
                if (typeof step === 'string') {
                  stepText = step;
                } else if (step && typeof step === 'object') {
                  stepText = step.text || step.name || "";
                }
                
                // Strip out existing headers from description if present
                const cleanStepText = typeof stepText === 'string' ? stepText.replace(/^([A-Z\s]{4,30})[:\-\.]/i, '').trim() : '';

                return (
                  <li 
                    key={index} 
                    className={`${styles.instructionItem} ${isDone ? styles.stepDone : ''}`}
                    onClick={(e) => toggleStep(e, index)}
                  >
                    <div className={styles.stepCircle}>
                      {isDone ? (
                        <span className="material-symbols-outlined" style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>
                          check
                        </span>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className={styles.stepContent}>
                      <h4 className={styles.stepTitle}>{stepTitle}</h4>
                      <p className={styles.stepDescription}>{cleanStepText}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      {/* You May Also Like Section */}
      {relatedPosts.length > 0 && (
        <div className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>You May Also Like</h2>
          <div className={styles.relatedGrid}>
            {relatedPosts.map((rPost) => (
              <RecipeCard key={rPost.id} post={rPost} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
