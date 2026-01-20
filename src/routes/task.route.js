import { Router } from 'express';
const router = Router();
import { pool } from '../db.js';

router.post("/", async (req, res) => {
  const { title } = req.body;
  const result = await pool.query(
    "INSERT INTO tasks(title) VALUES($1) RETURNING *",
    [title]
  );
  res.status(201).json(result.rows[0]);
});

router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks");
  res.json(result.rows);
});

router.put("/:id", async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const result = await pool.query(
    "UPDATE tasks SET title=$1 WHERE id=$2 RETURNING *",
    [title, id]
  );

  res.json(result.rows[0]);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM tasks WHERE id=$1", [id]);
  res.json({ message: "Deleted successfully" });
});

export default router;
