"use client";

import { useState } from 'react';
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

export default function FlavorPairing() {
  const [selectedKey, setSelectedKey] = useState('chocolate');
  const activeData = PAIRING_DATABASE[selectedKey];

  return (
    <section className={styles.section} id="flavor-pairing">
      <div className="container">
        <div className="section-header">
          <span>Culinary Science</span>
          <h2>Interactive Flavor Pairing</h2>
        </div>
        
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
      </div>
    </section>
  );
}
