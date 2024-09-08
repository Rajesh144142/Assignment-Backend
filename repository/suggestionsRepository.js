const db = require('../config/dbConnection');

const getAllSuggestions = async () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM suggestions ORDER BY votes DESC', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const createSuggestion = async (title, description) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO suggestions (title, description, votes) VALUES (?, ?, ?)', [title, description, 0], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
};

const upvoteSuggestion = async (id) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('UPDATE suggestions SET votes = votes + 1 WHERE id = ?', [id], function (err) {
        if (err) {
          return reject(err);
        }
        db.get('SELECT id,votes FROM suggestions WHERE id = ?', [id], (err, row) => {
          if (err) {
            return reject(err);
          }
          resolve(row);
        });
      });
    });
  });
};


module.exports = {
  getAllSuggestions,
  createSuggestion,
  upvoteSuggestion
};
