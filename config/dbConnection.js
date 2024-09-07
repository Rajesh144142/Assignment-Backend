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

          const insert = 'INSERT INTO suggestions (title, description, votes) VALUES (?, ?, ?)';
          const suggestions = [
            ['Improve the search functionality', 'Users find it hard to locate specific items in the search.', 25],
            ['Add dark mode', 'A dark mode option would be easier on the eyes during night-time usage.', 32],
            ['Enable email notifications', 'Notify users about important updates and changes via email.', 18],
            ['Improve mobile responsiveness', 'The website layout does not adapt well on smaller screens.', 22],
            ['Implement user profiles', 'Allow users to create and manage their own profiles and preferences.', 40]
          ];

          suggestions.forEach(([title, description, votes]) => {
            db.run(insert, [title, description, votes], (err) => {
              if (err) {
                console.error(err.message);
              } else {
                console.log(`Inserted suggestion: ${title}`);
              }
            });
          });
        }
      });
  }
});

module.exports = db;
