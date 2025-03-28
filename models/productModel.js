const db = require("../config/db");

exports.getAllProducts = (callback) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
    callback(err, result);
  });
}; 

exports.getProductById = (id, callback) => {
  const sql = "SELECT * FROM products WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    callback(err, result);
  });
};

exports.createProduct = (name, price, callback) => {
  const sql = "INSERT INTO products (name, price) VALUES (?, ?)";
  db.query(sql, [name, price], (err, result) => {
    callback(err, result);
  });
};

exports.deleteProductById = (id, callback) => {
  const sql = "DELETE FROM products WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    callback(err, result);
  });
};
