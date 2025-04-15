const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kalaivkv24@",
  database: "user_db",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL Database");
});

io.on("connection", (socket) => {
  console.log("WebSocket Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("WebSocket Disconnected:", socket.id);
  });
});

app.post("/api/register", (req, res) => {
  const { name, email, gender, dob, state } = req.body;

  if (!name || !email || !gender || !dob || !state) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO users (name, email, gender, dob, state) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, email, gender, dob, state], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    console.log("User registered:", { name, email });

    io.emit("userRegistered", { name, email });

    res.status(201).json({ message: "User registered successfully" });
  });
});

app.get("/api/users", (req, res) => {
  const sql = "SELECT id, name, email, gender, DATE_FORMAT(dob, '%Y-%m-%d') AS dob, state FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database fetch error:", err);
      return res.status(500).json({ error: "Failed to fetch users" });
    }
    res.json(results);
  });
});


const PORT = 5000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
