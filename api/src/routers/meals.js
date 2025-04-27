import express from "express";
import knex from "../../database_client.js";

const router = express.Router();

// GET all meals
router.get("/", async (req, res) => {
  try {
    const meals = await knex("meals").select("*");
    res.json(meals);
  } catch (error) {
    console.error("Error fetching meals:", error.message);
    res.status(500).json({ error: "Could not fetch meals." });
  }
});

// POST a new meal
router.post("/", async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: "'name' and 'price' are required." });
  }

  try {
    const [id] = await knex("meals").insert({ name, price });
    res.status(201).json({ id, name, price });
  } catch (error) {
    console.error("Error creating meal:", error.message);
    res.status(500).json({ error: "Could not create meal." });
  }
});

// GET a meal by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const meal = await knex("meals").where({ id }).first();
    if (!meal) {
      return res.status(404).json({ error: "Meal not found." });
    }
    res.json(meal);
  } catch (error) {
    console.error("Error fetching meal:", error.message);
    res.status(500).json({ error: "Could not fetch meal." });
  }
});

// PUT update a meal by id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "'name' and 'price' are required." });
  }

  try {
    const updated = await knex("meals").where({ id }).update({ name, price });

    if (updated === 0) {
      return res.status(404).json({ error: "Meal not found." });
    }

    res.json({ id, name, price });
  } catch (error) {
    console.error("Error updating meal:", error.message);
    res.status(500).json({ error: "Could not update meal." });
  }
});

// DELETE a meal by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await knex("meals").where({ id }).del();

    if (deleted === 0) {
      return res.status(404).json({ error: "Meal not found." });
    }

    res.json({ message: "Meal deleted successfully." });
  } catch (error) {
    console.error("Error deleting meal:", error.message);
    res.status(500).json({ error: "Could not delete meal." });
  }
});

export default router;
