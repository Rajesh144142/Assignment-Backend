const sqlite3 = require('sqlite3').verbose();
const dbName = 'suggestionsDatabase.db';

const db = new sqlite3.Database(dbName, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS suggestions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        votes INTEGER DEFAULT 0
      )`, (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Suggestions Table created or exists already');
        }
      });
  }
});

module.exports = db;
