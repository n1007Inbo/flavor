"use client";

import { useState, useEffect } from 'react';
import styles from './FlavorPairing.module.css';

const PAIRING_DATABASE = {
  chocolate: {
    name: "Dark Chocolate",
    profile: "Bitter, Rich, Earthy, Fat-Rich",
    description: "High-cocoa dark chocolate is structurally dense and complex. It contains fat and bitter polyphenols that pair beautifully with items that offer acidic brightness, intense capsaicin heat, or savory salt contrasts.",
    pairings: [
      { name: "Chili Pepper", note: "Capsaicin cuts through the cocoa fat, expanding taste buds and intensifying flavor." },
      { name: "Sea Salt", note: "Sodium suppresses bitterness while highlighting the chocolate's natural sweetness." },
      { name: "Raspberry", note: "Tart organic fruit acidity cuts the density, lifting floral cocoa notes." }
    ]
  },
  basil: {
    name: "Wild Basil",
    profile: "Anise, Sweet, Herbal, Peppery",
    description: "Basil is loaded with estragole and linalool, giving it a signature sweet, licorice-like aroma. It harmonizes with fresh summer fruits, creamy cheeses, and clean seafood.",
    pairings: [
      { name: "Strawberry", note: "Sweet, ester-heavy fruitiness matches the spicy, sweet licorice notes of basil." },
      { name: "Mozzarella", note: "Fatty, creamy lipids wrap around basil's herbal sharpness, softening the bite." },
      { name: "Tomato", note: "Naturally high glutamic acids create an instant savory-sweet pairing harmony." }
    ]
  },
  salmon: {
    name: "Fresh Salmon",
    profile: "Rich, Oily, Umami, Savory",
    description: "Salmon contains high concentrations of healthy Omega-3 fatty acids and clean umami flavor. It demands intense herbal freshness, woodsy smoke, or sharp lactic acids to balance its luxurious oils.",
    pairings: [
      { name: "Dill & Lemon", note: "Bright citric acid and green dill monoterpenes slice clean through rich fish oils." },
      { name: "Maple Syrup", note: "Caramelized sugars glaze the fish, providing a brilliant sweet-savory crust." },
      { name: "Ginger", note: "Sharp gingerol compounds clear the palate, making each rich bite feel light." }
    ]
  },
  coffee: {
    name: "Roasted Coffee",
    profile: "Roasty, Acidic, Bitter, Nutty",
    description: "Coffee undergoes intense thermal Maillard reactions during roasting, creating deep pyrazines. It pairs wonderfully with stone fruits, rich fats, and warm baking spices.",
    pairings: [
      { name: "Cardamom", note: "Exotic, citrusy, and warm notes elevate the roasted woodsy depth of coffee." },
      { name: "Blueberry", note: "High floral acidity echoes the fruity undertones of light-roasted beans." },
      { name: "Mascarpone", note: "Thick, sweet dairy fats neutralize heavy bitterness while unlocking cocoa notes." }
    ]
  },
  chili: {
    name: "Smoked Chili",
    profile: "Pungent, Spicy, Smokey, Warm",
    description: "Chili's heat is felt physically via thermoreceptors. By pairing it with tropical sugars, cooling dairy, or rich citrus, you can control the burn while accentuating its woodsy, smokey depth.",
    pairings: [
      { name: "Mango", note: "Tropical sugars coat the tongue, cushioning the heat while highlighting smoke." },
      { name: "Coriander", note: "Citrusy, herbal linalool in coriander seeds cools and brightens the warm heat." },
      { name: "Lime Juice", note: "Sharp citric acids chemically break down heavy oils, keeping the flavor crisp." }
    ]
  }
};

const CALCULATOR_INGREDIENTS = {
  chocolate: "Dark Chocolate",
  chili: "Smoked Chili",
  salt: "Sea Salt",
  raspberry: "Fresh Raspberry",
  basil: "Wild Basil",
  coffee: "Roasted Coffee",
  salmon: "Fresh Salmon",
  cheese: "Mozzarella Cheese",
  honey: "Wildflower Honey",
  lemon: "Citrus Lemon"
};

const PAIRING_SCORES = {
  "chocolate-chili": { score: 92, profile: "Capsaicin vs Fat Lipids", note: "Capsaicin heat chemically cuts through dense cocoa butter fats, expanding your taste buds and doubling the perceived depth of chocolate aromas." },
  "chocolate-salt": { score: 97, profile: "Sodium vs Bitter Tannins", note: "Sodium ions block bitterness receptors on the tongue, allowing the natural caramel and sweet fruit notes of cocoa to bloom fully." },
  "chocolate-raspberry": { score: 95, profile: "Organic Acid vs Cacao Richness", note: "Sharp citric acids pierce the dense chocolate solids, instantly lifting floral and red-berry esters." },
  "chocolate-coffee": { score: 89, profile: "Roast Pyrazine Harmony", note: "Both undergo heavy thermal Maillard browning, sharing matching woodsy, roasted pyrazines that create a warm, cozy blend." },
  "chocolate-basil": { score: 76, profile: "Herbal Anise vs Earthy Esters", note: "Basil's refreshing peppery licorice top-notes contrast beautifully with chocolate's deep roasty baseline." },
  "chocolate-salmon": { score: 32, profile: "Sulfide Clash", note: "Fish volatile sulfides clash heavily with sweet, roasted cacao esters, creating a highly confusing taste profile." },
  
  "basil-lemon": { score: 92, profile: "Citric Monoterpenes vs Linalool", note: "Bright citrus oils blend naturally with sweet peppery basil, resulting in an exceptionally refreshing, crisp aroma." },
  "basil-cheese": { score: 96, profile: "Lactic Fats vs Peppery Oils", note: "Creamy cheese fats coat the tongue, softening the sharp peppery bite of raw basil and prolonging its herbal sweetness." },
  "basil-chili": { score: 85, profile: "Herbal Freshness vs Thermal Heat", note: "The cooling, peppery herbal oils in fresh basil lift and temper the capsaicin heat, making the dish feel vibrant rather than burning." },
  
  "salmon-salt": { score: 95, profile: "Mineral Sodium vs Savory Fat", note: "Sodium binds to the salmon's amino acids, locking in volatile fats and elevating the clean, natural umami profile." },
  "salmon-chili": { score: 88, profile: "Capsaicin Burn vs Omega-3 Oils", note: "Sharp capsaicin compounds stimulate heat receptors, which cuts cleanly through rich, healthy Omega-3 salmon oils." },
  "salmon-coffee": { score: 45, profile: "Maillard Bitter vs Seafood Volatiles", note: "Heavy, bitter coffee pyrazines overwhelm the delicate clean umami of fresh fish, leading to a muddy, metallic finish." },
  "salmon-lemon": { score: 98, profile: "Acidic Monoterpenes vs Fatty Oils", note: "Citric acids chemically slice through heavy fish fats, making each bite feel light and clean on the palate." },
  
  "coffee-honey": { score: 91, profile: "Acidic Roast vs Natural Glucose", note: "Honey's smooth, floral sugars soften the heavy roasty bitterness of dark coffee beans without masking its complex acidity." },
  "coffee-cheese": { score: 85, profile: "Dairy Fats vs Roast Bitterness", note: "Rich mascarpone or cream fats encapsulate heavy coffee tannins, transforming bitterness into smooth chocolate notes." },
  "chili-honey": { score: 94, profile: "Sweet Glucose vs Spicy Capsaicin", note: "Pure natural sugars physically coat thermal receptors, cushioning chili heat while highlighting its deep, woody smoke." }
};

const getPairingResult = (ing1, ing2) => {
  if (ing1 === ing2) {
    return { 
      score: 100, 
      profile: "Perfect Identity", 
      note: "An ingredient naturally pairs perfectly with itself! Standard culinary identity matching." 
    };
  }
  
  const key1 = `${ing1}-${ing2}`;
  const key2 = `${ing2}-${ing1}`;
  
  if (PAIRING_SCORES[key1]) return PAIRING_SCORES[key1];
  if (PAIRING_SCORES[key2]) return PAIRING_SCORES[key2];
  
  // Dynamic generated score based on standard string hashing fallback
  const combined = [ing1, ing2].sort().join('-');
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = combined.charCodeAt(i) + ((hash << 5) - hash);
  }
  const score = Math.abs(hash % 35) + 55; // between 55 and 90
  
  return {
    score,
    profile: "Aromatics Blend",
    note: "These ingredients share matching volatile compounds and organic elements that create a clean, balanced taste profile."
  };
};

export default function FlavorPairing() {
  const [activeTab, setActiveTab] = useState('explorer'); // 'explorer' or 'calculator'
  const [selectedKey, setSelectedKey] = useState('chocolate');
  
  // Calculator States
  const [ing1, setIng1] = useState('chocolate');
  const [ing2, setIng2] = useState('chili');
  const [calcScore, setCalcScore] = useState(0);
  const [displayScore, setDisplayScore] = useState(0);
  const [calcResult, setCalcResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const activeData = PAIRING_DATABASE[selectedKey];

  const handleCalculate = () => {
    setIsCalculating(true);
    setDisplayScore(0);
    const res = getPairingResult(ing1, ing2);
    setCalcResult(res);

    setTimeout(() => {
      let current = 0;
      const target = res.score;
      const duration = 800; // ms
      const intervalTime = 16; // ~60fps
      const step = target / (duration / intervalTime);

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          setDisplayScore(target);
          clearInterval(timer);
          setIsCalculating(false);
        } else {
          setDisplayScore(Math.floor(current));
        }
      }, intervalTime);
    }, 200);
  };

  useEffect(() => {
    if (activeTab === 'calculator') {
      handleCalculate();
    }
  }, [activeTab, ing1, ing2]);

  return (
    <section className={styles.section} id="flavor-pairing">
      <div className="container">
        <div className="section-header">
          <span>Culinary Science</span>
          <h2>Interactive Flavor Pairing</h2>
        </div>

        {/* Dynamic Dual-Tab Selection Bar */}
        <div className={styles.tabBar}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'explorer' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('explorer')}
          >
            <span className="material-symbols-outlined">explore</span>
            <span>Ingredient Explorer</span>
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'calculator' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('calculator')}
          >
            <span className="material-symbols-outlined">science</span>
            <span>Molecular Harmony Meter</span>
          </button>
        </div>

        {activeTab === 'explorer' ? (
          <>
            <p className={styles.subtitle}>
              Ever wondered why certain ingredients taste magical together? Select a premium culinary base below to unlock professional flavor harmonies, structural profiles, and pairing explanations.
            </p>

            <div className={styles.grid}>
              {/* List Selector */}
              <div className={styles.selectorList}>
                {Object.entries(PAIRING_DATABASE).map(([key, data]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedKey(key)}
                    className={`${styles.selectorBtn} ${selectedKey === key ? styles.activeBtn : ''}`}
                  >
                    <span>{data.name}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.3s ease' }}>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                ))}
              </div>

              {/* Dynamic Display Panel */}
              <div className={`glass ${styles.displayPanel}`}>
                <div className={styles.glow} style={{ top: '20%', right: '10%' }} />
                
                <div className={styles.panelHeader}>
                  <span className={styles.profileLabel}>Profile: {activeData.profile}</span>
                  <h3 className={styles.ingredientTitle}>{activeData.name}</h3>
                </div>

                <p className={styles.description}>
                  {activeData.description}
                </p>

                <div className={styles.pairingsContainer}>
                  {activeData.pairings.map((pair, index) => (
                    <div key={index} className={styles.pairingCard}>
                      <h4 className={styles.pairingName}>{pair.name}</h4>
                      <p className={styles.pairingNote}>{pair.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className={styles.subtitle}>
              Match any two ingredients from your pantry to dynamically measure their molecular affinity score and explore chemical synergy profiles.
            </p>

            <div className={styles.calculatorBox}>
              <div className={styles.calculatorSelectors}>
                {/* Ingredient Select 1 */}
                <div className={styles.selectGroup}>
                  <label>Base Ingredient</label>
                  <select 
                    value={ing1} 
                    onChange={(e) => setIng1(e.target.value)}
                    className={styles.pantrySelect}
                  >
                    {Object.entries(CALCULATOR_INGREDIENTS).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.meterConnector}>
                  <span className="material-symbols-outlined">sync_alt</span>
                </div>

                {/* Ingredient Select 2 */}
                <div className={styles.selectGroup}>
                  <label>Pairing Ingredient</label>
                  <select 
                    value={ing2} 
                    onChange={(e) => setIng2(e.target.value)}
                    className={styles.pantrySelect}
                  >
                    {Object.entries(CALCULATOR_INGREDIENTS).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dynamic Sweeping Gauge Meter */}
              {calcResult && (
                <div className={`glass ${styles.meterPanel}`}>
                  <div className={styles.meterColumn}>
                    {/* SVG Gauge */}
                    <div className={styles.gaugeContainer}>
                      <svg width="200" height="200" viewBox="0 0 200 200" className={styles.gaugeSvg}>
                        <circle 
                          cx="100" 
                          cy="100" 
                          r="80" 
                          fill="none" 
                          stroke="rgba(21, 66, 18, 0.05)" 
                          strokeWidth="12" 
                        />
                        <circle 
                          cx="100" 
                          cy="100" 
                          r="80" 
                          fill="none" 
                          stroke="hsl(var(--color-primary))" 
                          strokeWidth="12" 
                          strokeDasharray="502"
                          strokeDashoffset={502 - (502 * displayScore) / 100}
                          className={styles.gaugeFill}
                        />
                      </svg>
                      <div className={styles.gaugeValue}>
                        <span className={styles.gaugeNumber}>{displayScore}%</span>
                        <span className={styles.gaugeLabel}>HARMONY</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.meterTextColumn}>
                    <span className={styles.chemistryBadge}>MOLECULAR INTERACTION</span>
                    <h3 className={styles.pairingTitle}>
                      {CALCULATOR_INGREDIENTS[ing1]} + {CALCULATOR_INGREDIENTS[ing2]}
                    </h3>
                    <div className={styles.chemProfile}>
                      <strong>Chemical Affinity:</strong> {calcResult.profile}
                    </div>
                    <p className={styles.chemNote}>
                      {calcResult.note}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
