// FlavorZing WordPress API Client & Unified Data Adapter (Sweet & Baking Edition)

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || '';

// Server-side global full posts cache for 0ms instant detail page rendering
let globalFullPostsCache = [];

// High-quality mockup baking data showcasing the sweet "FlavorZing" brand with 5 posts (as fallback)
const MOCK_POSTS = [
  {
    id: 1,
    title: "Classic Red Velvet Cupcakes with Cream Cheese Frosting",
    slug: "classic-red-velvet-cupcakes",
    excerpt: "Learn the secrets to baking incredibly moist, velvety red velvet cupcakes, topped with a velvety, tang-rich cream cheese swirl frosting.",
    content: `
      <p>Red velvet is more than just vanilla cake colored red. It has a distinctive, complex chemical flavor profile—a delicate balance between sweet vanilla, cocoa depth, and the signature tang of buttermilk and vinegar. In this baking journal entry, we will break down the precise chemical actions that make these cupcakes incredibly moist and perfectly structured.</p>
      
      <blockquote>"Baking is a delicious science. The reaction between acidic buttermilk, vinegar, and alkaline baking soda is what gives red velvet its legendary tender crumb."</blockquote>
      
      <h3>Ingredients</h3>
      <ul>
        <li>2.5 cups Cake Flour</li>
        <li>1.5 cups Granulated Sugar</li>
        <li>1 tsp Baking Soda</li>
        <li>1 tsp Natural Cocoa Powder</li>
        <li>1 cup Buttermilk</li>
        <li>2 large Eggs</li>
        <li>1 cup Canola Oil</li>
        <li>1 tsp White Vinegar</li>
        <li>8 oz Cream Cheese</li>
        <li>0.5 cup Unsalted Butter</li>
        <li>4 cups Powdered Sugar</li>
      </ul>

      <h3>Instructions</h3>
      <ol>
        <li>Preheat your oven to 350°F (175°C) and line a 12-cup cupcake pan with premium paper liners.</li>
        <li>Sift together cake flour, sugar, baking soda, cocoa powder, and a pinch of salt into a spacious mixing bowl.</li>
        <li>In a separate bowl, whisk buttermilk, eggs, oil, vinegar, and red food coloring until fully emulsion-bonded.</li>
        <li>Gently pour wet ingredients into the dry ingredients. Whisk slowly until no dry flour patches remain.</li>
        <li>Divide batter evenly between cupcake liners, filling each 3/4 full. Bake for 20-22 minutes until a toothpick inserted in the center comes out clean.</li>
        <li>While cupcakes cool, beat cream cheese and butter until smooth, then sift in powdered sugar in small batches until thick and spreadable. Pipe beautiful tall swirls onto the cooled cupcakes.</li>
      </ol>
    `,
    featuredImage: "https://images.unsplash.com/photo-1614707267537-b85acf00c4b8?auto=format&fit=crop&w=800&q=80",
    date: "May 22, 2026",
    author: "Alina",
    category: "Desserts",
    readTime: "8 min read",
    tags: ["Cupcakes", "Baking", "Cream Cheese"],
    cuisine: "Italian",
    mealType: "Dinner",
    difficulty: "Easy"
  },
  {
    id: 2,
    title: "French Strawberry Macarons with White Chocolate Ganache",
    slug: "french-strawberry-macarons",
    excerpt: "Step-by-step masterclass to baking perfect French macarons with neat ruffles, accompanied by a rich strawberry-infused ganache.",
    content: `
      <p>French macarons are widely feared by bakers. However, achieving those sought-after shiny shells and delicate ruffly 'feet' is not a matter of luck—it is a matter of strict physical dynamics. Today, we will unpack the exact macaronage techniques that ensure baking success every single time.</p>
      
      <blockquote>"Macarons require precision. Weighing your ingredients down to the gram and mastering the 'ribbon fold' is the absolute path to perfection."</blockquote>

      <h3>Ingredients</h3>
      <ul>
        <li>1.75 cups Powdered Sugar</li>
        <li>1 cup Super-Fine Almond Flour</li>
        <li>3 large Egg Whites</li>
        <li>0.25 cup Superfine Granulated Sugar</li>
        <li>6 oz White Chocolate</li>
        <li>0.25 cup Heavy Cream</li>
        <li>2 tbsp Strawberry Freeze-Dried Powder</li>
      </ul>

      <h3>Instructions</h3>
      <ol>
        <li>Sift almond flour and powdered sugar together twice. Discard any large almond chunks that won't pass through the sieve.</li>
        <li>In a clean glass bowl, whip egg whites until soft peaks form. Slowly add granulated sugar, whipping continuously on medium-high speed until stiff, glossy peaks form.</li>
        <li>Fold the dry almond mixture into the whipped meringue. Perform the 'macaronage' folding until batter flows like thick lava.</li>
        <li>Transfer batter to a piping bag fitted with a medium round tip. Pipe 1.5-inch circles onto a silicone baking mat.</li>
        <li>CRITICAL: Tap the tray firmly on the counter 5 times to release air bubbles. Let the shells sit at room temperature for 40 minutes until a skin forms on top.</li>
        <li>Bake at 300°F (150°C) for 15 minutes. Let cool completely before peeling from the mat.</li>
        <li>Heat heavy cream and pour over chopped white chocolate and strawberry powder. Stir until melted and smooth, chill until firm, then pipe between macaron shells.</li>
      </ol>
    `,
    featuredImage: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=800&q=80",
    date: "May 20, 2026",
    author: "Alina",
    category: "Desserts",
    readTime: "12 min read",
    tags: ["Macarons", "French", "Ganache"],
    cuisine: "Italian",
    mealType: "Dinner",
    difficulty: "Advanced"
  },
  {
    id: 3,
    title: "Fluffy Lemon Blueberry Loaf Cake",
    slug: "lemon-blueberry-loaf-cake",
    excerpt: "A super moist, buttery lemon loaf cake packed with juicy wild blueberries and finished with a sweet lemon juice glaze.",
    content: `
      <p>This lemon blueberry loaf is the ultimate weekend bake. It is bright, citrusy, and has a crumb so tender that it melts in your mouth. We achieve this high-level moisture by combining unsalted butter with rich sour cream, introducing both fats and lactic acids to soften the gluten matrix.</p>
      
      <blockquote>"Citrus and berries are a match made in heaven. The lemon juice glaze seals the cake, keeping it moist for days."</blockquote>

      <h3>Ingredients</h3>
      <ul>
        <li>1.5 cups All-purpose Flour</li>
        <li>1 cup Granulated Sugar</li>
        <li>1.5 tsp Baking Powder</li>
        <li>0.5 cup Unsalted Butter</li>
        <li>0.5 cup Sour Cream</li>
        <li>2 large Eggs</li>
        <li>2 tbsp Lemon Zest</li>
        <li>1 cup Fresh Blueberries</li>
        <li>1 cup Powdered Sugar</li>
        <li>2 tbsp Fresh Lemon Juice</li>
      </ul>

      <h3>Instructions</h3>
      <ol>
        <li>Preheat your oven to 350°F (175°C). Grease a standard 9x5 inch loaf pan and line with parchment paper.</li>
        <li>Cream softened butter and granulated sugar together in a stand mixer for 4 minutes until light and fluffy.</li>
        <li>Add eggs one at a time, followed by sour cream and lemon zest. Beat until combined.</li>
        <li>Whisk flour and baking powder, then fold into wet ingredients slowly. Do not overmix.</li>
        <li>Toss blueberries in 1 tablespoon of flour, then fold gently into the batter.</li>
        <li>Spread batter in the pan and bake for 55 minutes until golden. Let cool, then pour a glaze of powdered sugar and lemon juice over the top.</li>
      </ol>
    `,
    featuredImage: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=800&q=80",
    date: "May 15, 2026",
    author: "Alina",
    category: "Baking",
    readTime: "7 min read",
    tags: ["Loaf Cake", "Blueberry", "Lemon"],
    cuisine: "Italian",
    mealType: "Dinner",
    difficulty: "Intermediate"
  },
  {
    id: 4,
    title: "Organic Pink Lemonade with Sweet Raspberry Puree",
    slug: "sweet-pink-lemonade",
    excerpt: "Ditch the artificial powders. Make refreshing, home-pressed pink lemonade sweetened naturally with ripe raspberry syrup and honey.",
    content: `
      <p>Traditional store-bought pink lemonade relies on synthetic dye for its pink tint. We believe in fresh, natural, sweet alternatives. By simmering organic red raspberries into a rich honey syrup, we create a beautiful, sparkling pink nectar that tastes incredibly pure and refreshing.</p>
      
      <blockquote>"Real pink lemonade should taste like real summer. Fresh organic lemon juice paired with pure raspberry syrup creates a refreshing Zing!"</blockquote>
      
      <h3>Ingredients</h3>
      <ul>
        <li>1 cup Fresh Lemon Juice</li>
        <li>0.75 cup Organic Honey</li>
        <li>1 cup Fresh Red Raspberries</li>
        <li>4 cups Cold Filtered Water</li>
        <li>1 cup Ice Cubes</li>
      </ul>

      <h3>Instructions</h3>
      <ol>
        <li>In a small saucepan, simmer raspberries with 1/4 cup of water and honey for 5 minutes until soft and liquid.</li>
        <li>Press the raspberry mixture through a fine mesh strainer to discard the seeds, leaving behind a smooth pink syrup.</li>
        <li>In a large serving pitcher, combine fresh lemon juice, raspberry syrup, and 4 cups of cold water. Stir vigorously.</li>
        <li>Serve in tall glasses packed with ice and garnished with fresh lemon wheels and fresh mint leaves.</li>
      </ol>
    `,
    featuredImage: "https://images.unsplash.com/photo-1534260322277-996341492762?auto=format&fit=crop&w=800&q=80",
    date: "May 10, 2026",
    author: "Alina",
    category: "Beverages",
    readTime: "5 min read",
    tags: ["Lemonade", "Raspberry", "Summer"],
    cuisine: "Italian",
    mealType: "Dinner",
    difficulty: "Easy"
  },
  {
    id: 5,
    title: "Decadent Triple Chocolate Molten Lava Cakes",
    slug: "triple-chocolate-lava-cakes",
    excerpt: "The ultimate chocolate indulgence. Bake individual lava cakes with solid crusts and hot, molten chocolate centers oozing with vanilla extract.",
    content: `
      <p>A perfect chocolate lava cake is the crown jewel of any dessert menu. It represents a beautiful thermodynamic tightrope: baking the outer layer just enough to form a sturdy, cake-like structure, while leaving the direct center completely liquid and molten. Today, we will master the simple mechanics of chocolate melting and precise oven timing.</p>
      
      <blockquote>"Lava cakes are about timing. A single extra minute will turn your molten treasure into an ordinary, dry chocolate muffin."</blockquote>

      <h3>Ingredients</h3>
      <ul>
        <li>0.5 cup Unsalted Butter</li>
        <li>4 oz High-Quality Bittersweet Chocolate</li>
        <li>2 large Whole Eggs</li>
        <li>2 large Egg Yolks</li>
        <li>0.25 cup Granulated Sugar</li>
        <li>2 tbsp All-purpose Flour</li>
        <li>1 tsp Vanilla Extract</li>
      </ul>

      <h3>Instructions</h3>
      <ol>
        <li>Preheat your oven to 425°F (218°C). Generously grease four 6-ounce ramekins with butter and dust lightly with cocoa powder.</li>
        <li>Combine chopped chocolate and butter in a microwave-safe bowl. Microwave in 30-second increments, stirring in between, until melted and completely smooth.</li>
        <li>In a separate bowl, whisk whole eggs, egg yolks, sugar, vanilla extract, and a tiny pinch of salt together vigorously until pale yellow and slightly thickened.</li>
        <li>Pour the melted chocolate mixture and flour into the whipped eggs. Gently fold with a rubber spatula until just combined. Do not overmix.</li>
        <li>Divide batter evenly among prepared ramekins. Place on a baking sheet and bake for 12-14 minutes until the edges are firm but the centers jiggle slightly.</li>
        <li>Let cool in ramekins for exactly 1 minute. Place a small dessert plate on top of each ramekin and carefully invert. Dust with powdered sugar and serve immediately with vanilla bean ice cream.</li>
      </ol>
    `,
    featuredImage: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    date: "May 08, 2026",
    author: "Alina",
    category: "Desserts",
    readTime: "6 min read",
    tags: ["Chocolate", "Lava Cake", "Desserts"],
    cuisine: "Italian",
    mealType: "Dinner",
    difficulty: "Intermediate"
  }
];

// In-memory cache for category ID to category Name mappings
let categoryMapCache = null;

// HTML entities decoder to ensure clean typography across page components
function decodeHtmlEntities(str) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#8230;/g, '…');
}

// Unified parser to extract WPRM recipe data which is stored in grouped arrays
function parseRecipeData(rawRecipe) {
  if (!rawRecipe) return null;

  const parsedIngredients = [];
  if (Array.isArray(rawRecipe.ingredients)) {
    rawRecipe.ingredients.forEach(group => {
      if (group && Array.isArray(group.ingredients)) {
        group.ingredients.forEach(ing => {
          parsedIngredients.push({
            qty: ing.amount ? parseFloat(ing.amount) || null : null,
            unit: (ing.unit || '').replace(/[\*#]/g, ''),
            name: (ing.name || '').replace(/[\*#]/g, '')
          });
        });
      } else if (group) {
        parsedIngredients.push({
          qty: group.amount ? parseFloat(group.amount) || null : null,
          unit: (group.unit || '').replace(/[\*#]/g, ''),
          name: (group.name || '').replace(/[\*#]/g, '')
        });
      }
    });
  }

  const parsedInstructions = [];
  if (Array.isArray(rawRecipe.instructions)) {
    rawRecipe.instructions.forEach(group => {
      if (group && Array.isArray(group.instructions)) {
        group.instructions.forEach(step => {
          if (step && step.text) {
            parsedInstructions.push(step.text.replace(/[\*#]/g, ''));
          }
        });
      } else if (group && group.text) {
        parsedInstructions.push(group.text.replace(/[\*#]/g, ''));
      }
    });
  }

  return {
    servings: parseInt(rawRecipe.servings) || 4,
    prepTime: rawRecipe.prep_time ? `${rawRecipe.prep_time} mins` : '10 mins',
    cookTime: rawRecipe.cook_time ? `${rawRecipe.cook_time} mins` : '10 mins',
    totalTime: rawRecipe.total_time ? `${rawRecipe.total_time} mins` : '20 mins',
    calories: rawRecipe.nutrition?.calories || '320 kcal',
    ingredients: parsedIngredients,
    instructions: parsedInstructions
  };
}

// Exclude retail / affiliate categories list to organize editorial layouts cleanly
const recipeCategoryNames = [
  'recipes', 'beef', 'chicken', 'dessert', 'dinner', 'breakfast', 'soup', 'salad', 
  'seafood', 'bread', 'pasta', 'asian', 'casserole', 'comfort food', 'copycat recipes', 
  'potato recipes', 'sausage recipes', 'slow cooker recipes', 'soup recipes', 
  'snacks & appetizers', 'brunch ideas', 'cajun cuisine', 'mexican'
];

// Server-side helper to inject secure basic authentication headers for WordPress REST API
function getAuthHeaders() {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (typeof window === 'undefined') {
    const username = process.env.WORDPRESS_USERNAME;
    const appPassword = process.env.WORDPRESS_APPLICATION_PASSWORD;
    if (username && appPassword) {
      const token = Buffer.from(`${username}:${appPassword}`).toString('base64');
      headers['Authorization'] = `Basic ${token}`;
    }
  }
  
  return headers;
}

// Fetch and build the category ID mapping map
async function getCategoryMap() {
  if (categoryMapCache) return categoryMapCache;
  if (!WP_API_URL) return {};

  try {
    const url = `${WP_API_URL}/wp-json/wp/v2/categories?per_page=100`;
    const res = await fetch(url, { 
      headers: getAuthHeaders(),
      next: { revalidate: 86400 } // Cache for 24 hours
    });
    
    if (res.ok) {
      const categories = await res.json();
      const map = {};
      categories.forEach(cat => {
        map[cat.id] = cat.name;
      });
      categoryMapCache = map;
      return map;
    }
  } catch (e) {
    console.error("Failed to build dynamic category ID map:", e);
  }
  return {};
}

// Highly advanced HTML parsing engine to dynamically extract recipes from AI-generated raw post HTML
function extractRecipeFromContent(htmlContent, title) {
  if (!htmlContent) return null;
  
  const ingredients = [];
  const instructions = [];
  
  try {
    const ingredientsMatch = htmlContent.match(/<h3>(?:Ingredients|Ingredients Required|اجزاء|Ingredients Box)<\/h3>([\s\S]*?)(?:<h3>(?:Instructions|Directions|Method|تیاری|Preparation)<\/h3>|<div|$)/i) ||
                             htmlContent.match(/<h2[^>]*>(?:Ingredients|Ingredients Required|اجزاء)<\/h2>([\s\S]*?)(?:<h2[^>]*>(?:Instructions|Directions|Method|تیاری)<\/h2>|<div|$)/i);
    
    if (ingredientsMatch && ingredientsMatch[1]) {
      const liMatches = ingredientsMatch[1].matchAll(/<li>([\s\S]*?)<\/li>/g);
      for (const match of liMatches) {
        const text = match[1].replace(/<[^>]*>/g, '').trim();
        if (text) {
          const qtyMatch = text.match(/^(\d+(?:\s+\d+\/\d+|\.\d+|\/\d+)?)\s*(cups|cup|tsp|tbsp|g|oz|ounces|large|ml|grams)?\s+(.*)$/i);
          if (qtyMatch) {
            let qty = 1;
            const qtyStr = qtyMatch[1];
            if (qtyStr.includes('/')) {
              const parts = qtyStr.split(/\s+/);
              if (parts.length === 2) {
                const frac = parts[1].split('/');
                qty = parseFloat(parts[0]) + parseFloat(frac[0]) / parseFloat(frac[1]);
              } else {
                const frac = parts[0].split('/');
                qty = parseFloat(frac[0]) / parseFloat(frac[1]);
              }
            } else {
              qty = parseFloat(qtyStr);
            }
            ingredients.push({
              qty: qty,
              unit: qtyMatch[2] || '',
              name: qtyMatch[3]
            });
          } else {
            ingredients.push({
              qty: null,
              unit: '',
              name: text
            });
          }
        }
      }
    }

    const instructionsMatch = htmlContent.match(/<h3>(?:Instructions|Directions|Method|تیاری|Preparation)<\/h3>([\s\S]*?)(?:<div|$)/i) ||
                               htmlContent.match(/<h2[^>]*>(?:Instructions|Directions|Method|تیاری)<\/h2>([\s\S]*?)(?:<div|$)/i);
    
    if (instructionsMatch && instructionsMatch[1]) {
      const liMatches = instructionsMatch[1].matchAll(/<li>([\s\S]*?)<\/li>/g);
      for (const match of liMatches) {
        const text = match[1].replace(/<[^>]*>/g, '').trim();
        if (text) {
          instructions.push(text);
        }
      }
    }
  } catch (e) {
    console.error("HTML parsing error on dynamic recipe extractor:", e);
  }

  if (ingredients.length > 0 && instructions.length > 0) {
    return {
      servings: 8,
      prepTime: "15 mins",
      cookTime: "25 mins",
      totalTime: "40 mins",
      calories: "220 kcal",
      ingredients,
      instructions
    };
  }
  
  return null;
}

// Highly detailed, professional template recipes mapping for organic post title matches
const CULINARY_DB = {
  steak: {
    servings: 2,
    prepTime: "10 mins",
    cookTime: "15 mins",
    totalTime: "25 mins",
    calories: "540 kcal",
    ingredients: [
      { qty: 2, unit: "large", name: "Ribeye or New York Strip Steaks (room temp)" },
      { qty: 2, unit: "tbsp", name: "Unsalted Butter" },
      { qty: 3, unit: "cloves", name: "Garlic, smashed" },
      { qty: 3, unit: "sprigs", name: "Fresh Rosemary & Thyme" },
      { qty: 1.5, unit: "tsp", name: "Coarse Sea Salt" },
      { qty: 1, unit: "tsp", name: "Freshly Cracked Black Pepper" },
      { qty: 1, unit: "tbsp", name: "High-heat Olive Oil" }
    ],
    instructions: [
      "Pat steaks completely dry with paper towels and season generously with sea salt and cracked black pepper on all sides.",
      "Heat olive oil in a heavy cast-iron skillet over high heat until smoking.",
      "Gently place steaks in the hot skillet and sear for 2-3 minutes per side until a deep, golden crust forms.",
      "Reduce heat to medium-low, add butter, smashed garlic, rosemary, and thyme to the skillet.",
      "Tilt the pan and continuously spoon the melted hot herb butter over the steaks for another 2-3 minutes.",
      "Remove steaks from skillet and let them rest on a warm cutting board for 5-10 minutes to lock in the juices before carving."
    ]
  },
  chicken: {
    servings: 4,
    prepTime: "15 mins",
    cookTime: "30 mins",
    totalTime: "45 mins",
    calories: "420 kcal",
    ingredients: [
      { qty: 4, unit: "medium", name: "Chicken Breasts or Thighs" },
      { qty: 2, unit: "tbsp", name: "Extra Virgin Olive Oil" },
      { qty: 1, unit: "tsp", name: "Garlic Powder" },
      { qty: 1, unit: "tsp", name: "Smoked Paprika" },
      { qty: 0.5, unit: "tsp", name: "Dried Oregano" },
      { qty: 1, unit: "tsp", name: "Sea Salt & Black Pepper" },
      { qty: 1, unit: "whole", name: "Lemon, sliced" }
    ],
    instructions: [
      "Preheat your oven to 400°F (200°C) and lightly grease a baking dish.",
      "In a small bowl, whisk olive oil, garlic powder, smoked paprika, oregano, salt, and pepper together.",
      "Rub the herb oil mixture evenly over all sides of the chicken.",
      "Arrange chicken in the baking dish and lay fresh lemon slices on top of each breast.",
      "Bake for 25-30 minutes, or until the internal temperature reaches 165°F (74°C) and juices run clear.",
      "Let the chicken rest for 5 minutes before serving with roasted vegetables or fresh salad."
    ]
  },
  dessert: {
    servings: 6,
    prepTime: "20 mins",
    cookTime: "25 mins",
    totalTime: "45 mins",
    calories: "380 kcal",
    ingredients: [
      { qty: 1.5, unit: "cups", name: "All-purpose Flour" },
      { qty: 1, unit: "cup", name: "Granulated Sugar" },
      { qty: 0.5, unit: "cup", name: "Unsalted Butter, softened" },
      { qty: 2, unit: "large", name: "Eggs" },
      { qty: 2, unit: "tsp", name: "Pure Vanilla Extract" },
      { qty: 1.5, unit: "tsp", name: "Baking Powder" },
      { qty: 0.5, unit: "cup", name: "Whole Milk" }
    ],
    instructions: [
      "Preheat your oven to 350°F (175°C) and line your baking pan with parchment paper.",
      "Cream the softened butter and granulated sugar together in a bowl until light and fluffy.",
      "Add eggs one at a time, beating well after each, then stir in the vanilla extract.",
      "In a separate bowl, whisk flour and baking powder together, then add to the wet ingredients alternating with milk.",
      "Pour batter evenly into the prepared baking pan and bake for 22-25 minutes.",
      "Allow to cool completely in the pan before frosting or serving with fresh berries."
    ]
  },
  baking: {
    servings: 8,
    prepTime: "15 mins",
    cookTime: "20 mins",
    totalTime: "35 mins",
    calories: "290 kcal",
    ingredients: [
      { qty: 2, unit: "cups", name: "All-purpose Flour" },
      { qty: 0.5, unit: "cup", name: "Sugar" },
      { qty: 2, unit: "tsp", name: "Baking Powder" },
      { qty: 0.5, unit: "tsp", name: "Salt" },
      { qty: 0.5, unit: "cup", name: "Unsalted Butter, cold and cubed" },
      { qty: 0.75, unit: "cup", name: "Heavy Cream or Buttermilk" },
      { qty: 1, unit: "cup", name: "Fresh Berries or Chocolate Chips" }
    ],
    instructions: [
      "Preheat oven to 400°F (200°C) and line a baking sheet with parchment paper.",
      "Whisk flour, sugar, baking powder, and salt together in a large mixing bowl.",
      "Cut the cold cubed butter into the flour mixture using a pastry cutter until it resembles coarse crumbs.",
      "Stir in your fresh berries or chocolate chips gently.",
      "Pour heavy cream into the mixture and stir slowly until a soft dough forms.",
      "Turn dough out onto a lightly floured surface, pat into an 8-inch disc, cut into 8 wedges, and bake for 18-20 minutes."
    ]
  },
  pasta: {
    servings: 4,
    prepTime: "10 mins",
    cookTime: "15 mins",
    totalTime: "25 mins",
    calories: "450 kcal",
    ingredients: [
      { qty: 12, unit: "oz", name: "Penne, Spaghetti, or Fettuccine" },
      { qty: 2, unit: "tbsp", name: "Olive Oil" },
      { qty: 4, unit: "cloves", name: "Garlic, minced" },
      { qty: 1, unit: "can", name: "Crushed Tomatoes (28 oz)" },
      { qty: 0.5, unit: "cup", name: "Fresh Basil Leaves" },
      { qty: 0.5, unit: "tsp", name: "Red Pepper Flakes" },
      { qty: 0.5, unit: "cup", name: "Freshly Grated Parmesan Cheese" }
    ],
    instructions: [
      "Bring a large pot of salted water to a rolling boil and cook pasta according to package directions until al dente.",
      "While pasta cooks, heat olive oil in a large skillet over medium heat. Add garlic and red pepper flakes, cooking for 1 minute.",
      "Pour in crushed tomatoes and simmer gently on medium-low heat for 10-12 minutes.",
      "Drain pasta, reserving 1/4 cup of pasta water.",
      "Toss the hot pasta directly into the tomato sauce, adding reserved pasta water and fresh basil leaves.",
      "Toss on medium-high heat for 1 minute until sauce coats the pasta, then serve hot with grated Parmesan."
    ]
  },
  salad: {
    servings: 4,
    prepTime: "15 mins",
    cookTime: "0 mins",
    totalTime: "15 mins",
    calories: "180 kcal",
    ingredients: [
      { qty: 6, unit: "cups", name: "Mixed salad greens or Romaine lettuce" },
      { qty: 1, unit: "cup", name: "Cherry tomatoes, halved" },
      { qty: 1, unit: "whole", name: "Cucumber, sliced" },
      { qty: 0.5, unit: "cup", name: "Crumbled Feta cheese" },
      { qty: 0.25, unit: "cup", name: "Extra Virgin Olive Oil" },
      { qty: 2, unit: "tbsp", name: "Fresh Lemon Juice or Red Wine Vinegar" },
      { qty: 1, unit: "tsp", name: "Dried Oregano & sea salt" }
    ],
    instructions: [
      "Wash and dry your salad greens thoroughly, then chop into bite-sized pieces.",
      "In a large salad bowl, combine the chopped greens, halved cherry tomatoes, and sliced cucumber.",
      "In a small jar, shake olive oil, lemon juice, oregano, and salt together to emulsify.",
      "Drizzle dressing over the salad and toss gently to coat all ingredients.",
      "Top with crumbled Feta cheese and serve immediately."
    ]
  },
  soup: {
    servings: 6,
    prepTime: "15 mins",
    cookTime: "30 mins",
    totalTime: "45 mins",
    calories: "260 kcal",
    ingredients: [
      { qty: 2, unit: "tbsp", name: "Olive Oil" },
      { qty: 1, unit: "whole", name: "Onion, chopped" },
      { qty: 2, unit: "whole", name: "Carrots, diced" },
      { qty: 2, unit: "stalks", name: "Celery, diced" },
      { qty: 4, unit: "cups", name: "Vegetable or Chicken Broth" },
      { qty: 1, unit: "can", name: "Diced Tomatoes (14 oz)" },
      { qty: 1.5, unit: "cups", name: "Cooked Cannellini Beans or Lentils" }
    ],
    instructions: [
      "Heat olive oil in a large stockpot over medium heat.",
      "Add chopped onion, carrots, and celery, cooking for 6-8 minutes until vegetables soften.",
      "Pour in the diced tomatoes, broth, and beans, bringing the mixture to a boil.",
      "Reduce heat to low, cover, and simmer gently for 20 minutes until carrots are completely tender.",
      "Season with salt, black pepper, and a pinch of fresh herbs before ladling into warm bowls."
    ]
  }
};

// Unified post parser with absolute try-catch safety on all dynamic endpoints
function parsePost(post, categoryMap = {}) {
  if (!post) return null;

  try {
    const titleStr = (post.title?.rendered || post.title || "").toLowerCase();
    
    // Map custom featured image url or fallback
    let featuredImage = post.featured_media_url || 
                        post.yoast_head_json?.og_image?.[0]?.url ||
                        post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

    // WP Recipe Maker custom post types often store image url in recipe.image_url directly
    if (post.recipe && post.recipe.image_url) {
      featuredImage = post.recipe.image_url;
    }
    
    if (!featuredImage) {
      featuredImage = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80";
    }

    const author = post._embedded?.['author']?.[0]?.name || post.recipe?.author_name || "Alina";
    
    // Safety category parser: checks direct category IDs map, then falls back to embedded wp:term
    let category = "Desserts";
    
    if (post.categories && post.categories.length > 0) {
      const primaryCatId = post.categories[0];
      if (categoryMap && categoryMap[primaryCatId]) {
        category = decodeHtmlEntities(categoryMap[primaryCatId]);
      }
    } else {
      try {
        const terms = post._embedded?.['wp:term'];
        if (terms && Array.isArray(terms)) {
          for (const group of terms) {
            if (Array.isArray(group)) {
              const found = group.find(term => term.taxonomy === 'category' || term.taxonomy === 'wprm_course' || term.taxonomy === 'wprm_cuisine');
              if (found && found.name) {
                category = decodeHtmlEntities(found.name);
                break;
              }
            }
          }
        }
      } catch (e) {}
    }

    const wordCount = post.content?.rendered?.split(/\s+/).length || 100;
    const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = post.date ? new Date(post.date).toLocaleDateString('en-US', dateOptions) : 'Recently';

    // Calculate dynamic post difficulty based on complexity / word count to match Culinary Elegance screenshots
    let difficulty = "Easy";
    if (wordCount > 2400 || titleStr.includes("risotto") || titleStr.includes("macarons") || titleStr.includes("tagine")) {
      difficulty = "Advanced";
    } else if (wordCount > 1200 || titleStr.includes("steak") || titleStr.includes("salmon") || titleStr.includes("cake")) {
      difficulty = "Intermediate";
    }

    // Parse and structure WP Recipe Maker data natively from the API payload!
    let recipe = null;
    const contentHtml = post.content?.rendered || post.content || '';
    if (post.recipe) {
      recipe = parseRecipeData(post.recipe);
    } else {
      // Fallback: extract via HTML parsing
      recipe = extractRecipeFromContent(contentHtml, post.title?.rendered || '');
    }

    // dynamic recipe card fallback mapping based on title keywords and category tags
    const isCulinaryCategory = recipeCategoryNames.some(rc => category.toLowerCase().includes(rc));
    
    const isCommercialReview = titleStr.includes("decanter") || 
                               titleStr.includes("mattress") || 
                               titleStr.includes("console table") || 
                               titleStr.includes("table lamp") || 
                               titleStr.includes("chair") || 
                               titleStr.includes("sofa") || 
                               titleStr.includes("rug") || 
                               titleStr.includes("pillow") || 
                               titleStr.includes("vase");

    if (!recipe && isCulinaryCategory && !isCommercialReview) {
      if (titleStr.includes("steak") || titleStr.includes("beef") || titleStr.includes("meat")) {
        recipe = CULINARY_DB.steak;
      } else if (titleStr.includes("chicken") || titleStr.includes("poultry") || titleStr.includes("wings")) {
        recipe = CULINARY_DB.chicken;
      } else if (titleStr.includes("dessert") || titleStr.includes("cake") || titleStr.includes("cupcake") || titleStr.includes("macaron") || titleStr.includes("sweet") || titleStr.includes("lava") || titleStr.includes("chocolate") || titleStr.includes("cookie")) {
        recipe = CULINARY_DB.dessert;
      } else if (titleStr.includes("bread") || titleStr.includes("loaf") || titleStr.includes("bake") || titleStr.includes("dough")) {
        recipe = CULINARY_DB.baking;
      } else if (titleStr.includes("pasta") || titleStr.includes("spaghetti") || titleStr.includes("lasagna")) {
        recipe = CULINARY_DB.pasta;
      } else if (titleStr.includes("salad") || titleStr.includes("greens")) {
        recipe = CULINARY_DB.salad;
      } else if (titleStr.includes("soup") || titleStr.includes("stew") || titleStr.includes("broth")) {
        recipe = CULINARY_DB.soup;
      } else {
        // Ultimate baking fallback so every cooking post has a gorgeous recipe block
        recipe = CULINARY_DB.baking;
      }
    }

    // Determine Cuisine matching Sidebar filters: Italian, Mexican, Indian, Japanese
    let cuisine = "Italian"; // Elegant default
    if (titleStr.includes("mexican") || titleStr.includes("chili") || titleStr.includes("taco") || titleStr.includes("quesadilla") || titleStr.includes("fajita")) {
      cuisine = "Mexican";
    } else if (titleStr.includes("indian") || titleStr.includes("curry") || titleStr.includes("masala") || titleStr.includes("naan") || titleStr.includes("tagine") || titleStr.includes("moroccan") || titleStr.includes("quinoa") || titleStr.includes("beet")) {
      cuisine = "Indian";
    } else if (titleStr.includes("japanese") || titleStr.includes("sushi") || titleStr.includes("ramen") || titleStr.includes("teriyaki") || category.toLowerCase().includes("asian") || titleStr.includes("asian")) {
      cuisine = "Japanese";
    } else if (titleStr.includes("italian") || titleStr.includes("pasta") || titleStr.includes("pesto") || titleStr.includes("tiramisu") || titleStr.includes("risotto") || titleStr.includes("gnocchi") || titleStr.includes("bruschetta") || titleStr.includes("caprese")) {
      cuisine = "Italian";
    }

    // Determine Meal Type matching Sidebar filters: Breakfast, Lunch, Dinner
    let mealType = "Dinner"; // Elegant default
    if (category.toLowerCase().includes("breakfast") || titleStr.includes("breakfast") || titleStr.includes("egg") || titleStr.includes("toast") || titleStr.includes("waffle") || titleStr.includes("pancake") || titleStr.includes("fig & ricotta")) {
      mealType = "Breakfast";
    } else if (category.toLowerCase().includes("salad") || titleStr.includes("salad") || titleStr.includes("lunch") || titleStr.includes("quinoa") || titleStr.includes("sandwich") || titleStr.includes("greens") || titleStr.includes("bowl") || titleStr.includes("caprese")) {
      mealType = "Lunch";
    }

    const hasRecipe = !!recipe || contentHtml.includes('data-recipe-id=') || contentHtml.includes('wprm-recipe');

    return {
      id: post.id,
      title: decodeHtmlEntities(post.title?.rendered || post.title || "Untitled Post").replace(/[\*#]/g, ''),
      slug: post.slug,
      excerpt: decodeHtmlEntities(post.excerpt?.rendered?.replace(/<[^>]*>/g, '') || post.excerpt || "").replace(/[\*#]/g, ''),
      content: contentHtml,
      featuredImage: featuredImage,
      date: formattedDate,
      author: author,
      category: category,
      readTime: readTime,
      tags: post.tags || [],
      recipe: recipe,
      hasRecipe: !!hasRecipe,
      difficulty: difficulty,
      prepTime: recipe?.prepTime || "15 mins",
      cookTime: recipe?.cookTime || "20 mins",
      totalTime: recipe?.totalTime || "35 mins",
      calories: recipe?.calories || "320 kcal",
      cuisine: cuisine,
      mealType: mealType
    };
  } catch (error) {
    console.error("Critical error inside unified parsePost engine, falling back to mock mapping:", error);
    return MOCK_POSTS[0];
  }
}

export async function getPosts(category = null, fetchAll = true) {
  if (!WP_API_URL) {
    console.log("Using Premium Sweet Mock Data for FlavorZing (No WordPress API URL configured).");
    if (category) {
      return MOCK_POSTS.filter(post => post.category.toLowerCase() === category.toLowerCase());
    }
    return MOCK_POSTS;
  }

  // 1. If we already have the global full posts cache populated in memory, serve instantly!
  if (globalFullPostsCache.length > 0) {
    console.log(`[Cache Hit] Serving ${globalFullPostsCache.length} lightweight posts from server-side memory cache.`);
    let filtered = globalFullPostsCache;
    if (category) {
      filtered = globalFullPostsCache.filter(
        post => post.category.toLowerCase().trim() === category.toLowerCase().trim()
      );
    }
    // Return lightweight copy (without content/recipe) to save client network size
    return filtered.map(post => {
      const copy = { ...post };
      delete copy.content;
      delete copy.recipe;
      return copy;
    });
  }

  // Define failure-resistant variables
  let allPosts = [];
  let categoryMap = {};

  // Fetch Category map safely without blocking
  try {
    categoryMap = await getCategoryMap();
  } catch (e) {
    console.error("Non-blocking failure: categories mapping failed.", e);
  }

  let categoryId = null;
  if (category) {
    // Find category ID by name in category index
    const foundId = Object.keys(categoryMap).find(
      id => categoryMap[id].toLowerCase().trim() === category.toLowerCase().trim()
    );
    if (foundId) {
      categoryId = foundId;
    }
  }

  // Fetch page 1 first to get total page counts and initial posts
  try {
    let postsUrl = `${WP_API_URL}/wp-json/wp/v2/posts?_embed&per_page=100&page=1`;
    if (categoryId) {
      postsUrl = `${WP_API_URL}/wp-json/wp/v2/posts?_embed&categories=${categoryId}&per_page=100&page=1`;
    }
    
    const res = await fetch(postsUrl, { 
      headers: getAuthHeaders(),
      next: { revalidate: 60 } // Near-instant dynamic caching revalidation (60 seconds)
    });

    if (res.ok) {
      const posts = await res.json();
      if (posts && Array.isArray(posts) && posts.length > 0) {
        const parsed = posts.map(post => parsePost(post, categoryMap)).filter(p => p !== null);
        allPosts = [...allPosts, ...parsed];
        
        // Dynamic parallel fetching for the remaining pages
        const totalPagesHeader = res.headers.get('x-wp-totalpages');
        const totalPages = totalPagesHeader ? parseInt(totalPagesHeader, 10) : 1;
        
        if (fetchAll && totalPages > 1) {
          const maxPages = 15; // Sanity limit
          const remainingPages = [];
          for (let p = 2; p <= Math.min(totalPages, maxPages); p++) {
            remainingPages.push(p);
          }
          
          console.log(`[WordPress Parallel Fetch] Fetching remaining pages in parallel: ${remainingPages.join(', ')}`);
          
          const promises = remainingPages.map(async (pageIndex) => {
            try {
              let pageUrl = `${WP_API_URL}/wp-json/wp/v2/posts?_embed&per_page=100&page=${pageIndex}`;
              if (categoryId) {
                pageUrl = `${WP_API_URL}/wp-json/wp/v2/posts?_embed&categories=${categoryId}&per_page=100&page=${pageIndex}`;
              }
              const pageRes = await fetch(pageUrl, {
                headers: getAuthHeaders(),
                next: { revalidate: 60 }
              });
              if (pageRes.ok) {
                const pagePosts = await pageRes.json();
                if (pagePosts && Array.isArray(pagePosts)) {
                  return pagePosts.map(post => parsePost(post, categoryMap)).filter(p => p !== null);
                }
              }
            } catch (err) {
              console.error(`[WordPress Parallel Fetch] Non-blocking failure on page ${pageIndex}:`, err);
            }
            return [];
          });
          
          const parallelResults = await Promise.all(promises);
          parallelResults.forEach(parsedPage => {
            allPosts = [...allPosts, ...parsedPage];
          });
        }
      }
    }
  } catch (e) {
    console.error(`Non-blocking failure: Standard posts fetching failed.`, e);
  }

  // If dynamic pools returned empty, fall back to high-quality local mock data so the site is never blank!
  if (allPosts.length === 0) {
    console.log("Dynamic WordPress posts returned empty, rendering high-quality Baking fallback database.");
    if (category) {
      return MOCK_POSTS.filter(post => post.category.toLowerCase() === category.toLowerCase());
    }
    return MOCK_POSTS;
  }
    
  // Sort all merged posts: 
  // 1. First priority: Posts that actually contain a recipe card (hasRecipe === true)
  // 2. Second priority: Standard recipe categories (Beef, Dessert, etc.) first, affiliate categories last
  // 3. Third priority: Chronological order (newest first) within groups
  const sorted = allPosts.sort((a, b) => {
    if (a.hasRecipe && !b.hasRecipe) return -1;
    if (!a.hasRecipe && b.hasRecipe) return 1;

    const aLower = a.category ? a.category.toLowerCase().trim() : '';
    const bLower = b.category ? b.category.toLowerCase().trim() : '';
    
    const aIsRecipe = recipeCategoryNames.some(rc => aLower.includes(rc));
    const bIsRecipe = recipeCategoryNames.some(rc => bLower.includes(rc));

    if (aIsRecipe && !bIsRecipe) return -1;
    if (!aIsRecipe && bIsRecipe) return 1;
    
    // Sort chronologically within groups (newest first)
    return new Date(b.date) - new Date(a.date);
  });

  // Populate global full posts cache with the complete parsed posts (retaining content and recipe)
  globalFullPostsCache = sorted;

  // Return lightweight copies (without content/recipe) to keep network payload light
  let filtered = sorted;
  if (category && category.toLowerCase() !== 'all') {
    filtered = sorted.filter(
      post => post.category.toLowerCase().trim() === category.toLowerCase().trim()
    );
  }
  return filtered.map(post => {
    const copy = { ...post };
    delete copy.content;
    delete copy.recipe;
    return copy;
  });
}

export async function getPostBySlug(slug) {
  // 1. Serve immediately from hot memory cache (0ms instant page loads!)
  if (globalFullPostsCache.length > 0) {
    const cachedPost = globalFullPostsCache.find(p => p.slug === slug);
    if (cachedPost) {
      console.log(`[Cache Hit] Instantly returning cached full post details for slug: ${slug}`);
      return cachedPost;
    }
  }

  if (!WP_API_URL) {
    const post = MOCK_POSTS.find(p => p.slug === slug);
    return post || null;
  }

  let categoryMap = {};
  try {
    categoryMap = await getCategoryMap();
  } catch (e) {}

  // Fetch standard post CPT by slug (safe fallback)
  try {
    const postsUrl = `${WP_API_URL}/wp-json/wp/v2/posts?_embed&slug=${slug}`;
    const res = await fetch(postsUrl, { 
      headers: getAuthHeaders(),
      next: { revalidate: 3600 } 
    });
    if (res.ok) {
      const posts = await res.json();
      if (posts && posts.length > 0) {
        const post = parsePost(posts[0], categoryMap);
        
        // Scan the standard post content for an embedded WPRM recipe ID
        const contentHtml = post.content || '';
        const recipeIdMatch = contentHtml.match(/data-recipe-id=["'](\d+)["']/);
        
        if (recipeIdMatch && recipeIdMatch[1]) {
          const recipeId = recipeIdMatch[1];
          try {
            // Fetch structured recipe data from wprm_recipe CPT by ID directly!
            const recipeRes = await fetch(`${WP_API_URL}/wp-json/wp/v2/wprm_recipe/${recipeId}`, {
              headers: getAuthHeaders(),
              next: { revalidate: 3600 }
            });
            if (recipeRes.ok) {
              const recipeData = await recipeRes.json();
              if (recipeData && recipeData.recipe) {
                post.recipe = parseRecipeData(recipeData.recipe);
              }
            }
          } catch (e) {
            console.error(`Failed to fetch linked wprm_recipe ${recipeId} for post ${post.id}:`, e);
          }
        }
        
        return post;
      }
    }
  } catch (e) {
    console.error("Failed to fetch standard post by slug:", e);
  }

  // Fallback: check if the slug is for a custom recipe CPT directly
  try {
    const recipesUrl = `${WP_API_URL}/wp-json/wp/v2/wprm_recipe?_embed&slug=${slug}`;
    const res = await fetch(recipesUrl, {
      headers: getAuthHeaders(),
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      const recipes = await res.json();
      if (recipes && recipes.length > 0) {
        return parsePost(recipes[0], categoryMap);
      }
    }
  } catch (e) {}

  // Ultimate fallback to Mock posts if not found on live database
  return MOCK_POSTS.find(p => p.slug === slug) || null;
}

export async function getCategories() {
  if (!WP_API_URL) {
    const categories = MOCK_POSTS.map(p => p.category);
    return [...new Set(categories)];
  }

  try {
    const url = `${WP_API_URL}/wp-json/wp/v2/categories?hide_empty=true&per_page=100`;
    const res = await fetch(url, { 
      headers: getAuthHeaders(),
      next: { revalidate: 86400 } 
    });
    if (!res.ok) throw new Error("Failed to fetch categories");
    const categories = await res.json();
    
    const decoded = categories
      .map(cat => decodeHtmlEntities(cat.name))
      .filter(name => name.toLowerCase().trim() !== 'uncategorized' && name.length > 0);
      
    // Curated whitelist of premium culinary category names
    const allowedCategories = [
      'Asian', 'Beef', 'Bread', 'Breakfast', 'Casserole', 
      'Chicken', 'Comfort Food', 'Copycat Recipes', 'Dessert', 
      'Dinner', 'Mexican', 'Pasta', 'Potato Recipes', 
      'Salad', 'Seafood', 'Soup'
    ];
    
    // Reorder categories: alphabetical order for organic alignment
    return decoded.sort((a, b) => a.localeCompare(b));
  } catch (error) {
    console.error("Failed to fetch WordPress categories, using Mock Categories:", error);
    const categories = MOCK_POSTS.map(p => p.category);
    return [...new Set(categories)];
  }
}

