import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import type {
  Recipe,
  Ingredient,
  RecipeIngredient,
  FridgeItem,
  ShoppingItem,
  CookingHistory,
  AppSettings,
} from '@/types';

class DatabaseService {
  private sqliteConnection: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private readonly dbName = 'mymealz.db';
  private readonly dbVersion = 1;
  private isInitialized = false;

  constructor() {
    this.sqliteConnection = new SQLiteConnection(CapacitorSQLite);
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Erstelle oder öffne die Datenbank
      this.db = await this.sqliteConnection.createConnection(
        this.dbName,
        false, // encrypted
        'no-encryption',
        this.dbVersion,
        false // readonly
      );

      await this.db.open();
      await this.createTables();
      await this.insertDefaultData();

      this.isInitialized = true;
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) throw new Error('Database not connected');

    const createTableQueries = [
      // Ingredients table
      `CREATE TABLE IF NOT EXISTS ingredients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        brand TEXT,
        barcode TEXT,
        category TEXT,
        default_unit TEXT DEFAULT 'g',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );`,

      // Recipes table
      `CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        instructions TEXT NOT NULL,
        prep_time INTEGER,
        cook_time INTEGER,
        servings INTEGER,
        difficulty TEXT CHECK(difficulty IN ('easy', 'medium', 'hard')),
        category TEXT,
        tags TEXT, -- JSON Array als String
        image_url TEXT,
        last_cooked DATETIME,
        favorite BOOLEAN DEFAULT 0,
        rating INTEGER CHECK(rating >= 1 AND rating <= 5),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );`,

      // Recipe Ingredients (many-to-many relationship)
      `CREATE TABLE IF NOT EXISTS recipe_ingredients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe_id INTEGER NOT NULL,
        ingredient_id INTEGER NOT NULL,
        amount REAL NOT NULL,
        unit TEXT NOT NULL,
        optional BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (recipe_id) REFERENCES recipes (id) ON DELETE CASCADE,
        FOREIGN KEY (ingredient_id) REFERENCES ingredients (id) ON DELETE CASCADE
      );`,

      // Fridge Items (virtueller Kühlschrank)
      `CREATE TABLE IF NOT EXISTS fridge_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ingredient_id INTEGER NOT NULL,
        amount REAL NOT NULL,
        unit TEXT NOT NULL,
        expiry_date DATETIME,
        purchase_date DATETIME,
        location TEXT DEFAULT 'fridge' CHECK(location IN ('fridge', 'freezer', 'pantry', 'other')),
        opened BOOLEAN DEFAULT 0,
        opened_date DATETIME,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ingredient_id) REFERENCES ingredients (id) ON DELETE CASCADE
      );`,

      // Shopping List
      `CREATE TABLE IF NOT EXISTS shopping_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ingredient_id INTEGER NOT NULL,
        amount REAL NOT NULL,
        unit TEXT NOT NULL,
        priority TEXT DEFAULT 'medium' CHECK(priority IN ('low', 'medium', 'high')),
        purchased BOOLEAN DEFAULT 0,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ingredient_id) REFERENCES ingredients (id) ON DELETE CASCADE
      );`,

      // Cooking History
      `CREATE TABLE IF NOT EXISTS cooking_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe_id INTEGER NOT NULL,
        cooked_at DATETIME NOT NULL,
        rating INTEGER CHECK(rating >= 1 AND rating <= 5),
        notes TEXT,
        served_portions INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (recipe_id) REFERENCES recipes (id) ON DELETE CASCADE
      );`,

      // App Settings
      `CREATE TABLE IF NOT EXISTS app_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT NOT NULL UNIQUE,
        value TEXT NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('string', 'number', 'boolean', 'json')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );`,

      // Indizes für bessere Performance
      `CREATE INDEX IF NOT EXISTS idx_recipes_name ON recipes(name);`,
      `CREATE INDEX IF NOT EXISTS idx_recipes_category ON recipes(category);`,
      `CREATE INDEX IF NOT EXISTS idx_recipes_last_cooked ON recipes(last_cooked);`,
      `CREATE INDEX IF NOT EXISTS idx_ingredients_name ON ingredients(name);`,
      `CREATE INDEX IF NOT EXISTS idx_ingredients_barcode ON ingredients(barcode);`,
      `CREATE INDEX IF NOT EXISTS idx_fridge_expiry ON fridge_items(expiry_date);`,
      `CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_recipe ON recipe_ingredients(recipe_id);`,
      `CREATE INDEX IF NOT EXISTS idx_cooking_history_recipe ON cooking_history(recipe_id, cooked_at);`,
    ];

    for (const query of createTableQueries) {
      await this.db.run(query);
    }
  }

  private async insertDefaultData(): Promise<void> {
    if (!this.db) throw new Error('Database not connected');

    // Prüfe ob bereits Daten vorhanden sind
    const result = await this.db.query('SELECT COUNT(*) as count FROM ingredients');
    if (result.values && result.values.length > 0 && result.values[0].count > 0) {
      return; // Bereits Daten vorhanden
    }

    // Beispiel-Zutaten
    const defaultIngredients = [
      { name: 'Tomaten', category: 'Gemüse', default_unit: 'Stück' },
      { name: 'Zwiebeln', category: 'Gemüse', default_unit: 'Stück' },
      { name: 'Knoblauch', category: 'Gemüse', default_unit: 'Zehe' },
      { name: 'Olivenöl', category: 'Öle & Fette', default_unit: 'ml' },
      { name: 'Salz', category: 'Gewürze', default_unit: 'Prise' },
      { name: 'Pfeffer', category: 'Gewürze', default_unit: 'Prise' },
      { name: 'Nudeln', category: 'Pasta & Getreide', default_unit: 'g' },
      { name: 'Parmesan', category: 'Milchprodukte', default_unit: 'g' },
      { name: 'Eier', category: 'Milchprodukte', default_unit: 'Stück' },
      { name: 'Milch', category: 'Milchprodukte', default_unit: 'ml' },
    ];

    for (const ingredient of defaultIngredients) {
      await this.db.run(
        'INSERT OR IGNORE INTO ingredients (name, category, default_unit) VALUES (?, ?, ?)',
        [ingredient.name, ingredient.category, ingredient.default_unit]
      );
    }

    // Beispiel-Rezept
    await this.db.run(
      `INSERT OR IGNORE INTO recipes (name, description, instructions, prep_time, cook_time, servings, difficulty, category)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        'Pasta Aglio e Olio',
        'Einfache italienische Pasta mit Knoblauch und Olivenöl',
        '1. Nudeln nach Packungsanweisung kochen\n2. Knoblauch in dünne Scheiben schneiden\n3. Olivenöl in der Pfanne erhitzen\n4. Knoblauch anbraten bis goldbraun\n5. Gekochte Nudeln dazugeben\n6. Mit Salz und Pfeffer würzen\n7. Mit Parmesan servieren',
        10,
        15,
        2,
        'easy',
        'Italienisch',
      ]
    );

    // App-Einstellungen
    const defaultSettings = [
      { key: 'language', value: 'de', type: 'string' },
      { key: 'notifications_enabled', value: 'true', type: 'boolean' },
      { key: 'expiry_warning_days', value: '3', type: 'number' },
    ];

    for (const setting of defaultSettings) {
      await this.db.run('INSERT OR IGNORE INTO app_settings (key, value, type) VALUES (?, ?, ?)', [
        setting.key,
        setting.value,
        setting.type,
      ]);
    }

    console.log('Default data inserted');
  }

  // CRUD Operations für Recipes
  async getAllRecipes(): Promise<Recipe[]> {
    if (!this.db) throw new Error('Database not connected');

    const result = await this.db.query('SELECT * FROM recipes ORDER BY name ASC');
    return result.values?.map(this.mapRecipeFromDb) || [];
  }

  async getRecipeById(id: number): Promise<Recipe | null> {
    if (!this.db) throw new Error('Database not connected');

    const result = await this.db.query('SELECT * FROM recipes WHERE id = ?', [id]);
    return result.values?.[0] ? this.mapRecipeFromDb(result.values[0]) : null;
  }

  async addRecipe(recipe: Omit<Recipe, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    if (!this.db) throw new Error('Database not connected');

    const result = await this.db.run(
      `INSERT INTO recipes (name, description, instructions, prep_time, cook_time, servings, difficulty, category, tags, image_url, favorite, rating)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        recipe.name,
        recipe.description || null,
        recipe.instructions,
        recipe.prep_time || null,
        recipe.cook_time || null,
        recipe.servings || null,
        recipe.difficulty || null,
        recipe.category || null,
        recipe.tags ? JSON.stringify(recipe.tags) : null,
        recipe.image_url || null,
        recipe.favorite ? 1 : 0,
        recipe.rating || null,
      ]
    );

    return result.changes?.lastId || 0;
  }

  // CRUD Operations für Ingredients
  async getAllIngredients(): Promise<Ingredient[]> {
    if (!this.db) throw new Error('Database not connected');

    const result = await this.db.query('SELECT * FROM ingredients ORDER BY name ASC');
    return result.values?.map(this.mapIngredientFromDb) || [];
  }

  async addIngredient(
    ingredient: Omit<Ingredient, 'id' | 'created_at' | 'updated_at'>
  ): Promise<number> {
    if (!this.db) throw new Error('Database not connected');

    const result = await this.db.run(
      'INSERT INTO ingredients (name, brand, barcode, category, default_unit) VALUES (?, ?, ?, ?, ?)',
      [
        ingredient.name,
        ingredient.brand || null,
        ingredient.barcode || null,
        ingredient.category || null,
        ingredient.default_unit || 'g',
      ]
    );

    return result.changes?.lastId || 0;
  }

  // CRUD Operations für Fridge Items
  async getFridgeItems(): Promise<(FridgeItem & { ingredient_name: string })[]> {
    if (!this.db) throw new Error('Database not connected');

    const result = await this.db.query(`
      SELECT f.*, i.name as ingredient_name
      FROM fridge_items f
      JOIN ingredients i ON f.ingredient_id = i.id
      ORDER BY f.expiry_date ASC
    `);

    return result.values?.map(this.mapFridgeItemFromDb) || [];
  }

  async addFridgeItem(item: Omit<FridgeItem, 'id' | 'created_at' | 'updated_at'>): Promise<number> {
    if (!this.db) throw new Error('Database not connected');

    const result = await this.db.run(
      `INSERT INTO fridge_items (ingredient_id, amount, unit, expiry_date, purchase_date, location, opened, opened_date, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        item.ingredient_id,
        item.amount,
        item.unit,
        item.expiry_date?.toISOString() || null,
        item.purchase_date?.toISOString() || null,
        item.location || 'fridge',
        item.opened ? 1 : 0,
        item.opened_date?.toISOString() || null,
        item.notes || null,
      ]
    );

    return result.changes?.lastId || 0;
  }

  // Recipe Suggestions Logic
  async getRecipeSuggestions(): Promise<Recipe[]> {
    if (!this.db) throw new Error('Database not connected');

    // Einfache Logik: Rezepte die lange nicht gekocht wurden
    const result = await this.db.query(`
      SELECT r.* FROM recipes r
      LEFT JOIN cooking_history ch ON r.id = ch.recipe_id
      GROUP BY r.id
      ORDER BY MAX(ch.cooked_at) ASC NULLS FIRST, r.rating DESC NULLS LAST, RANDOM()
      LIMIT 10
    `);

    return result.values?.map(this.mapRecipeFromDb) || [];
  }

  // Mapping functions
  private mapRecipeFromDb(row: any): Recipe {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      instructions: row.instructions,
      prep_time: row.prep_time,
      cook_time: row.cook_time,
      servings: row.servings,
      difficulty: row.difficulty,
      category: row.category,
      tags: row.tags ? JSON.parse(row.tags) : undefined,
      image_url: row.image_url,
      last_cooked: row.last_cooked ? new Date(row.last_cooked) : undefined,
      favorite: Boolean(row.favorite),
      rating: row.rating,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    };
  }

  private mapIngredientFromDb(row: any): Ingredient {
    return {
      id: row.id,
      name: row.name,
      brand: row.brand,
      barcode: row.barcode,
      category: row.category,
      default_unit: row.default_unit,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
    };
  }

  private mapFridgeItemFromDb(row: any): FridgeItem & { ingredient_name: string } {
    return {
      id: row.id,
      ingredient_id: row.ingredient_id,
      amount: row.amount,
      unit: row.unit,
      expiry_date: row.expiry_date ? new Date(row.expiry_date) : undefined,
      purchase_date: row.purchase_date ? new Date(row.purchase_date) : undefined,
      location: row.location,
      opened: Boolean(row.opened),
      opened_date: row.opened_date ? new Date(row.opened_date) : undefined,
      notes: row.notes,
      created_at: new Date(row.created_at),
      updated_at: new Date(row.updated_at),
      ingredient_name: row.ingredient_name,
    };
  }

  // Utility function zum Schließen der Datenbank
  async close(): Promise<void> {
    if (this.db) {
      await this.db.close();
      this.db = null;
      this.isInitialized = false;
    }
  }
}

// Singleton instance
export const databaseService = new DatabaseService();
export default databaseService;
