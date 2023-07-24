import cors from "cors";
import express from "express";
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "chikn_tinder",
  password: process.env.DB_PASS || "postgres",
  port: process.env.DB_PORT || 5432,
});

const app = express();
app.use(cors());
app.use(express.json());

app.get("/all", async (_, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT *, (updoots - downdoots) as score FROM chickens ORDER BY score DESC, name`
    );
    res.json(rows).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/new", async (req, res) => {
  const chicken = req.body;

  // Validate data
  if (
    !chicken.name ||
    !chicken.location ||
    !chicken.imgUrl ||
    !chicken.description
  ) {
    res.status(400).json({ message: "Invalid data" });
    return;
  }

  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Function for updoot and downdoot since the functionality is similar
async function vote(req, res, type) {
  const { id } = req.body;

  // Validate data
  if (!id) {
    res.status(400).json({ message: "Invalid data" });
    return;
  }

  try {
    const { rows } = await pool.query(
      `UPDATE chickens SET ${type} = ${type} + 1 WHERE id = $1 RETURNING *`,
      [id]
    );
    if (rows.length === 0) {
      res.status(404).json({ message: "Chicken not found" });
      return;
    }
    res.status(200).json({
      message: `${type === "updoots" ? "Updooted" : "Downdooted"} successfully`,
      chicken: rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

app.put("/updoot", (req, res) => vote(req, res, "updoots"));
app.put("/downdoot", (req, res) => vote(req, res, "downdoots"));

app.delete("/delete", async (req, res) => {
  const { id } = req.body;

  // Validate data
  if (!id) {
    res.status(400).json({ message: "Invalid data" });
    return;
  }

  try {
    const { rowCount } = await pool.query(
      `DELETE FROM chickens WHERE id = $1`,
      [id]
    );
    if (rowCount === 0) {
      res.status(404).json({ message: "Chicken not found" });
      return;
    }
    res.status(200).json({
      message: "Chicken deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
