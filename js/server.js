import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import cors from "cors";

const app = express();
const port = 3010;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173", // replace with your client's origin
  }),
);

app.get("/", (req, res) => {
  res.send("Budget Tracker");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "budget_tracker",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
});

app.get("/budget_items", (req, res) => {
  db.query("SELECT * FROM budget_items", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
app.get("/records", (req, res) => {
  db.query("SELECT * FROM budget_items", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/budget_items", (req, res) => {
  const { type, category, note, amount, date } = req.body;
  db.query(
    "INSERT INTO budget_items SET ?",
    { type, category, note, amount, date },
    (err, results) => {
      if (err) throw err;
      res.json({ message: "Budget item added successfully" });
    },
  );
});
