const sql = require('../db.js');

// constructor
const User = function (user) {
  this.userFirstName = user.userFirstName;
  this.userLastName = user.userLastName;
  this.userEmail = user.userEmail;
  this.userDateOfBirth = user.userDateOfBirth;
  this.userGender = user.userGender;
  this.userType = user.userType;
  this.darkMode = user.darkMode;
  this.userHearts = user.userHearts;
  this.parentMode = user.parentMode;
};

User.create = (newUser, result) => {
  const {
    userFirstName,
    userLastName,
    userEmail,
    userDateOfBirth,
    userGender,
  } = newUser;
  sql.query(
    'INSERT INTO user (userFirstName, userLastName, userEmail, userDateOfBirth, userGender, userType, darkMode, userHearts, parentMode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      userFirstName,
      userLastName,
      userEmail,
      userDateOfBirth,
      userGender,
      'child',
      0,
      0,
      0,
    ],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      console.log('created user: ', { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    },
  );
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM user WHERE userId = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found user: ', res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: 'not_found' }, null);
  });
};

User.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM user WHERE userEmail = '${email}'`, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found user: ', res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: 'not_found' }, null);
  });
};

User.getAll = (result) => {
  let query = 'SELECT * FROM user';

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('users: ', res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  const {
    userFirstName,
    userLastName,
    userEmail,
    userDateOfBirth,
    userGender,
    userType,
    darkMode,
    parentMode,
  } = user;

  sql.query(
    'UPDATE user SET userFirstName = ?, userLastName = ?, userEmail = ?, userDateOfBirth = ?, userGender = ?, userType = ?, darkMode = ?, parentMode = ? WHERE userId = ?;',
    [
      userFirstName,
      userLastName,
      userEmail,
      userDateOfBirth,
      userGender,
      userType,
      darkMode,
      parentMode,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('updated user: ', { id: id, ...user });
      result(null, { id: id, ...user });
    },
  );
};

User.remove = (id, result) => {
  sql.query('DELETE FROM user WHERE userId = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted user with id: ', id);
    result(null, res);
  });
};

User.removeAll = (result) => {
  sql.query('DELETE FROM user', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;
