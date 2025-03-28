const db = require("../config/db");

exports.createUser = (userData, callback) => {
  const sql = "INSERT INTO users (name, email, gender, dob, state) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [userData.name, userData.email, userData.gender, userData.dob, userData.state], callback);
};

exports.getAllUsers = (callback) => {
  const sql = "SELECT * FROM users";
  db.query(sql, callback);
};

exports.updateUser = (id, userData, callback) => {
  const sql = "UPDATE users SET name=?, email=?, gender=?, dob=?, state=? WHERE id=?";
  db.query(sql, [userData.name, userData.email, userData.gender, userData.dob, userData.state, id], callback);
};

exports.deleteUser = (id, callback) => {
  const sql = "DELETE FROM users WHERE id=?";
  db.query(sql, [id], callback);
};
