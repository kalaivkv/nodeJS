const db = require("../config/db");

exports.getProducts = (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(result);
  });
};

exports.getProductById = (req, res) => {
  const sql = "SELECT * FROM products WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.length === 0)
      return res.status(404).json({ error: "Product not found" });
    res.json(result[0]);
  });
};

exports.createProduct = (req, res) => {
  const { name, price } = req.body;
  const sql = "INSERT INTO products (name, price) VALUES (?, ?)";
  db.query(sql, [name, price], (err, result) => {
    if (err) return res.status(500).json({ error: "Insert failed" });
    res.status(201).json({ success: true, id: result.insertId });
  });
};

exports.deleteProduct = (req, res) => {
  const sql = "DELETE FROM products WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: "Delete failed" });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Product not found" });
    res.json({ success: true });
  });
};
