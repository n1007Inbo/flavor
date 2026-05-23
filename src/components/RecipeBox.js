"use client";

import { useState } from 'react';
import styles from './RecipeBox.module.css';

// Helper function to format cooking decimal quantities into gorgeous fractions
function formatQuantity(qty) {
  if (!qty || isNaN(qty)) return '';
  const whole = Math.floor(qty);
  const decimal = qty - whole;
  
  let frac = '';
  // Check common cooking fractions with small tolerance margin
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

export default function RecipeBox({ recipe }) {
  if (!recipe) return null;

  const { servings: baseServings, prepTime, cookTime, totalTime, calories, ingredients, instructions } = recipe;

  const [servings, setServings] = useState(baseServings || 8);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [doneSteps, setDoneSteps] = useState({});

  // Multiplier scale for servings adjustments
  const scale = servings / (baseServings || 8);

  const toggleIngredient = (index) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleStep = (index) => {
    setDoneSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const incrementServings = () => {
    setServings(prev => Math.min(prev + 2, 48));
  };

  const decrementServings = () => {
    setServings(prev => Math.max(prev - 2, 2));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`recipe-card-box ${styles.box}`}>
      {/* Recipe Header */}
      <div className={styles.header}>
        <div className={styles.topRow}>
          <h2 className={styles.title}>Recipe Box</h2>
          
          <button onClick={handlePrint} className={styles.printBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            <span>Print Recipe</span>
          </button>
        </div>

        {/* Info Grid */}
        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Prep Time</span>
            <span className={styles.metaVal}>{prepTime || '15 mins'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Cook Time</span>
            <span className={styles.metaVal}>{cookTime || '30 mins'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Total Time</span>
            <span className={styles.metaVal}>{totalTime || '45 mins'}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Calories</span>
            <span className={styles.metaVal}>{calories || '210 kcal'}</span>
          </div>
        </div>
      </div>

      {/* Dynamic Servings Adjuster */}
      <div className={styles.servingsRow}>
        <span className={styles.servingsLabel}>Adjust Servings</span>
        <div className={styles.scalerGroup}>
          <button onClick={decrementServings} className={styles.scaleBtn} aria-label="Decrease Servings">-</button>
          <span className={styles.servingsNum}>{servings}</span>
          <button onClick={incrementServings} className={styles.scaleBtn} aria-label="Increase Servings">+</button>
        </div>
      </div>

      {/* Main Splits Grid */}
      <div className={styles.grid}>
        {/* Ingredients Checklist */}
        <div>
          <h3 className={styles.sectionTitle}>Ingredients</h3>
          <ul className={styles.ingredientsList}>
            {ingredients.map((item, index) => {
              const isChecked = !!checkedIngredients[index];
              const scaledQty = item.qty ? item.qty * scale : null;
              
              return (
                <li 
                  key={index} 
                  className={`${styles.ingredientItem} ${isChecked ? styles.checked : ''}`}
                  onClick={() => toggleIngredient(index)}
                >
                  <div className={styles.checkbox}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className={styles.ingredientText}>
                    {scaledQty && <span className={styles.qty}>{formatQuantity(scaledQty)} </span>}
                    {item.unit && <span>{item.unit} </span>}
                    <span>{item.name}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Instructions list */}
        <div>
          <h3 className={styles.sectionTitle}>Instructions</h3>
          <ul className={styles.instructionsList}>
            {instructions.map((step, index) => {
              const isDone = !!doneSteps[index];
              return (
                <li 
                  key={index} 
                  className={`${styles.stepItem} ${isDone ? styles.stepDone : ''}`}
                  onClick={() => toggleStep(index)}
                >
                  <div className={styles.stepNumber}>
                    {isDone ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <p className={styles.stepText}>{step}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
