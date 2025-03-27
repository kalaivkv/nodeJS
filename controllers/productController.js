const ProductModel = require("../models/productModel");

exports.getProducts = (req, res) => {
  ProductModel.getAllProducts((err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(result);
  });
};

exports.getProductById = (req, res) => {
  ProductModel.getProductById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (result.length === 0)
      return res.status(404).json({ error: "Product not found" });
    res.json(result[0]);
  });
};

exports.createProduct = (req, res) => {
  const { name, price } = req.body;
  ProductModel.createProduct(name, price, (err, result) => {
    if (err) return res.status(500).json({ error: "Insert failed" });
    res.status(201).json({ success: true, id: result.insertId });
  });
};

exports.deleteProduct = (req, res) => {
  ProductModel.deleteProductById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: "Delete failed" });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Product not found" });
    res.json({ success: true });
  });
};
