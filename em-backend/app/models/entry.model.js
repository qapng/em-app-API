const sql = require('../db.js');

// constructor
const Entry = function (entry) {
  this.userId = entry.userId;
  this.emotion = entry.emotion;
  this.description = entry.description;
  this.timestamp = entry.timestamp;
};

Entry.create = (newEntry, result) => {
  const { emotion, description, userId } = newEntry;
  const timestamp = '2023-08-22';
  sql.query(
    'INSERT INTO entries (emotion, description, timestamp, userId) VALUES (?, ?, ?, ?)',
    [emotion, description, timestamp, userId],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      console.log('created user: ', { id: res.insertId, ...newEntry });
      result(null, { id: res.insertId, ...newEntry });
    },
  );
};

Entry.findById = (id, result) => {
  sql.query(`SELECT * FROM entries WHERE entriesId = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found entry: ', res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: 'not_found' }, null);
  });
};

Entry.findAll = (result) => {
  let query = 'SELECT * FROM entries';

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('entries: ', res);
    result(null, res);
  });
};

Entry.findAllByUserId = (userId, result) => {
  let query = `SELECT * FROM entries WHERE userId = ${userId}`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('entries: ', res);
    result(null, res);
  });
};

Entry.updateById = (id, updatedEntry, result) => {
  const { emotion, description } = updatedEntry;
  sql.query(
    'UPDATE entries SET emotion = ?, description = ? WHERE entriesId = ?',
    [emotion, description, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('updated entry: ', { id: id, ...updatedEntry });
      result(null, { id: id, ...updatedEntry });
    },
  );
};

Entry.remove = (id, result) => {
  sql.query('DELETE FROM entries WHERE entriesId  = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted entry with id: ', id);
    result(null, res);
  });
};

Entry.removeAll = (result) => {
  sql.query('DELETE FROM entries', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} entries`);
    result(null, res);
  });
};

module.exports = Entry;
