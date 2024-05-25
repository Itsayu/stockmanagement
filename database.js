const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "data.db"), (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Connected to the SQLite database.");
    db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT,
      artNo TEXT,
      fabric TEXT,
      size TEXT,
      color TEXT,
      description TEXT,
      rate TEXT,
      image BLOB
    )`);
  }
});

module.exports = db;
