import cors from "cors";
import express from "express";
import pkg from "pg";
import { seedChickens } from "./seedChickens.js";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "chikn_tinder",
  password: "postgres",
  port: 5432,
});

const app = express();
app.use(cors());
app.use(express.json());

let chickens = [...seedChickens];

app.get("/all", async (req, res) => {
  const { rows } = await pool.query(
    `SELECT *, (updoots - downdoots) as score FROM chickens ORDER BY score DESC, name`
  );
  res.json(rows).end();
});

app.post("/new", async (req, res) => {
  const chicken = req.body;
  const { rows } = await pool.query(
    `INSERT INTO chickens (name, location, imgUrl, description, updoots, downdoots)
     VALUES ($1, $2, $3, $4, 0, 0)
     RETURNING id`,
    [chicken.name, chicken.location, chicken.imgUrl, chicken.description]
  );
  res.status(201).json({
    message: "New chicken added successfully",
    id: rows[0].id,
  });
});

app.put("/updoot", async (req, res) => {
  const { id } = req.body;
  const { rows } = await pool.query(
    `UPDATE chickens SET updoots = updoots + 1 WHERE id = $1 RETURNING *`,
    [id]
  );
  if (rows.length === 0) {
    res.status(404).json({ message: "Chicken not found" });
    return;
  }
  res.status(200).json({
    message: "Updooted successfully",
    chicken: rows[0],
  });
});

app.put("/downdoot", async (req, res) => {
  const { id } = req.body;
  const { rows } = await pool.query(
    `UPDATE chickens SET downdoots = downdoots + 1 WHERE id = $1 RETURNING *`,
    [id]
  );
  if (rows.length === 0) {
    res.status(404).json({ message: "Chicken not found" });
    return;
  }
  res.status(200).json({
    message: "Downdooted successfully",
    chicken: rows[0],
  });
});

app.listen(5000, () => {
  console.log("Server started...");
});
