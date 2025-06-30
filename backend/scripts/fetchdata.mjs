import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

// Enable __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchAndSaveIngredients() {
  try {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const data = await res.json();

    const mappedData = data.meals.map(item => ({
      name: item.strIngredient || 'Unknown',
      category: item.strType?.toLowerCase() || 'common',
      description:
        item.strDescription ||
        'It is full of nutrients and very healthy for every age person. It contains a large amount of carbohydrates.',
      image: `https://www.themealdb.com/images/ingredients/${item.strIngredient}-small.png`,
    }));

    const filePath = path.join(__dirname, 'ingredients.json');
    fs.writeFileSync(filePath, JSON.stringify(mappedData, null, 2));
    console.log('✅ ingredients.json created successfully in the same folder!');
  } catch (err) {
    console.error('❌ Failed to fetch or write ingredients file:', err);
  }
}

fetchAndSaveIngredients();
