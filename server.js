const express = require("express");
const mysql2 = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: "https://students-backend-nq8g.onrender.com/student" }));

app.use(express.json());

const port = process.env.PORT || 5000;

const db = mysql2.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "VENKATPAMIDI_@8688",
  database: "students",
});
db.connect((error) => {
  if (error) {
    return console.log(error);
  }
  console.log("MySql Connected");
});
app.listen(port, () => {
  console.log("listening");
});

app.post("/add_user", (req, res) => {
  try {
    const { name, email, age, gender } = req.body;

    const dbQuery = `insert into student_details(name,email,age,gender) values(?,?,?,?)`;
    db.query(dbQuery, [name, email, age, gender], function (err, result) {
      if (err) {
        return res.json({ message: "Something went wrong" + err });
      }
      console.log(result);
      return res.json({
        success: "Student added Succesfully",
        userId: result.insertId,
      });
    });
  } catch (err) {
    console.log(err);
  }
});
app.get("/students", (req, res) => {
  const dbQuery = `select * from student_details`;
  db.query(dbQuery, function (err, data) {
    if (err) {
      res.json({ message: "Server Error" });
    }
    return res.json(data);
  });
});

app.get("/student/:id", (req, res) => {
  const { id } = req.params;
  const dbQuery = "select * from student_details where id=?";
  db.query(dbQuery, [id], function (err, data) {
    if (err) {
      res.json({ message: "Server Error" });
    }
    console.log(data);
    return res.json(data);
  });
});

app.post("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, gender, age } = req.body;
  const dbQuery = `
  update student_details 
  set name=?,email=?,gender=?,age=?
  where id=?
  `;
  db.query(dbQuery, [name, email, gender, age, id], function (err, data) {
    if (err) {
      res.json({ message: "Server Error" });
    }
    console.log(data);
    return res.json(data);
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  const dbQuery = `
  delete from student_details 
  where id=?
  `;
  db.query(dbQuery, [id], function (err, data) {
    if (err) {
      res.json({ message: "Server Error" });
    }
    console.log("deleted");
    return res.json({ success: "student delete successfully" });
  });
});
