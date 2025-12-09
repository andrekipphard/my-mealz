// backend/server.js
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const dbPath = path.join(__dirname, 'mymealz.db');
const db = new sqlite3.Database(dbPath);

app.use(cors());
app.use(express.json());

// DB Schema (Rezepte + Zutaten als JSON)
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    instructions TEXT,
    ingredients TEXT, -- JSON Array
    prep_time INTEGER,
    cook_time INTEGER,
    servings INTEGER,
    difficulty TEXT,
    category TEXT,
    tags TEXT, -- JSON Array
    image_url TEXT,
    last_cooked TEXT,
    favorite INTEGER,
    rating INTEGER,
    created_at TEXT,
    updated_at TEXT
  )`);
});

// Helper: parse DB row to Recipe object
function mapRecipe(row) {
  return {
    ...row,
    ingredients: row.ingredients ? JSON.parse(row.ingredients) : [],
    tags: row.tags ? JSON.parse(row.tags) : [],
    favorite: !!row.favorite,
    created_at: row.created_at ? new Date(row.created_at) : undefined,
    updated_at: row.updated_at ? new Date(row.updated_at) : undefined,
  };
}

// GET all recipes
app.get('/api/recipes', (req, res) => {
  db.all('SELECT * FROM recipes ORDER BY name ASC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.map(mapRecipe));
  });
});

// GET recipe by id
app.get('/api/recipes/:id', (req, res) => {
  db.get('SELECT * FROM recipes WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Recipe not found' });
    res.json(mapRecipe(row));
  });
});

// POST add recipe
app.post('/api/recipes', (req, res) => {
  const r = req.body;
  db.run(
    `INSERT INTO recipes (name, description, instructions, ingredients, prep_time, cook_time, servings, difficulty, category, tags, image_url, last_cooked, favorite, rating, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      r.name,
      r.description || null,
      r.instructions || null,
      JSON.stringify(r.ingredients || []),
      r.prep_time || null,
      r.cook_time || null,
      r.servings || null,
      r.difficulty || null,
      r.category || null,
      JSON.stringify(r.tags || []),
      r.image_url || null,
      r.last_cooked || null,
      r.favorite ? 1 : 0,
      r.rating || null,
      new Date().toISOString(),
      new Date().toISOString(),
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      db.get('SELECT * FROM recipes WHERE id = ?', [this.lastID], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(mapRecipe(row));
      });
    }
  );
});

// PUT update recipe
app.put('/api/recipes/:id', (req, res) => {
  const r = req.body;
  db.run(
    `UPDATE recipes SET name=?, description=?, instructions=?, ingredients=?, prep_time=?, cook_time=?, servings=?, difficulty=?, category=?, tags=?, image_url=?, last_cooked=?, favorite=?, rating=?, updated_at=? WHERE id=?`,
    [
      r.name,
      r.description || null,
      r.instructions || null,
      JSON.stringify(r.ingredients || []),
      r.prep_time || null,
      r.cook_time || null,
      r.servings || null,
      r.difficulty || null,
      r.category || null,
      JSON.stringify(r.tags || []),
      r.image_url || null,
      r.last_cooked || null,
      r.favorite ? 1 : 0,
      r.rating || null,
      new Date().toISOString(),
      req.params.id,
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      db.get('SELECT * FROM recipes WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(mapRecipe(row));
      });
    }
  );
});

// DELETE recipe
app.delete('/api/recipes/:id', (req, res) => {
  db.run('DELETE FROM recipes WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`MyMealz backend listening on port ${PORT}`);
});
