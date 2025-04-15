const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;
const SECRET_KEY = "school_secret_key";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kalaivkv24@",
  database: "schooldb",
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

app.post("/api/login", (req, res) => {
  const { email, student_id, password } = req.body;
  const identifier = email || student_id;

  db.query(
    "SELECT * FROM users WHERE email = ? OR student_id = ?",
    [identifier, identifier],
    async (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0)
        return res.status(404).json({ message: "User not found" });

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ message: "Invalid password" });

      const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY);
      res.json({ token, user });
    }
  );
});

app.get("/api/students", verifyToken, (req, res) => {
  if (req.user.role !== "management")
    return res.status(403).json({ message: "Access denied" });

  db.query(
    "SELECT name, student_id, standard FROM users WHERE role = 'student'",
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    }
  );
});

app.get("/api/students/:id", verifyToken, (req, res) => {
  const id = req.params.id;
  if (req.user.role !== "student" || req.user.id != id)
    return res.status(403).json({ message: "Access denied" });

  db.query(
    "SELECT name, student_id, standard FROM users WHERE id = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results[0]);
    }
  );
});

app.get("/students", (req, res) => {
  const { role, student_id } = req.query;

  let sql =
    "SELECT id, name, student_id, standard FROM users WHERE role = 'student'";
  let params = [];

  if (role === "student") {
    sql += " AND student_id = ?";
    params.push(student_id);
  }

  db.query(sql, params, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

app.put("/students/:id", (req, res) => {
  const { name, standard } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE users SET name = ?, standard = ? WHERE id = ?",
    [name, standard, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

app.post("/students", (req, res) => {
  const { name, student_id, standard, password } = req.body;

  if (!name || !student_id || !standard || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO users (name, student_id, standard, password, role) VALUES (?, ?, ?, ?, 'student')",
    [name, student_id, standard, hashedPassword],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(201)
        .json({ message: "Student added successfully", id: result.insertId });
    }
  );
});

app.put("/students/:id", (req, res) => {
  const { name, standard } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE users SET name = ?, standard = ? WHERE id = ?",
    [name, standard, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
}

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
module.exports = app;
