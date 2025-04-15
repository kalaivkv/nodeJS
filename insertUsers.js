const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kalaivkv24@",
  database: "schooldb",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");

  const adminPassword = bcrypt.hashSync("admin123", 10);
  const studentPassword = bcrypt.hashSync("student123", 10);

  connection.query(
    "SELECT * FROM users WHERE email = 'admin@gmail.com'",
    (err, results) => {
      if (err) throw err;
      if (results.length === 0) {
        connection.query(
          "INSERT INTO users SET ?",
          {
            role: "management",
            name: "Admin User",
            email: "admin@gmail.com",
            password: adminPassword,
            standard: null,
            student_id: null,
          },
          (err) => {
            if (err) console.log("Admin insert error", err);
            else console.log("Admin inserted");
          }
        );
      } else {
        console.log("Admin already exists");
      }
    }
  );

  connection.query(
    "SELECT * FROM users WHERE student_id = 'STU001'",
    (err, results) => {
      if (err) throw err;
      if (results.length === 0) {
        connection.query(
          "INSERT INTO users SET ?",
          {
            role: "student",
            name: "Student One",
            student_id: "STU001",
            password: studentPassword,
            standard: "10",
            email: null,
          },
          (err) => {
            if (err) console.log("Student insert error", err);
            else console.log("Student inserted");
          }
        );
      } else {
        console.log("Student already exists");
      }
    }
  );
});
