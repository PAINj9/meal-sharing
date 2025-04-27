import express from "express";
import knex from "../../database_client.js";

const router = express.Router();

router.get("/:mealId", async (req, res) => {
  const { mealId } = req.params;
  try {
    const reviews = await knex("reviews").where({ meal_id: mealId });
    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: "Could not fetch reviews" });
  }
});

router.post("/", async (req, res) => {
  const { title, description, stars, meal_id } = req.body;
  try {
    const [id] = await knex("reviews").insert({ title, description, stars, meal_id });
    res.status(201).json({ id, title, description, stars });
  } catch (err) {
    console.error("Error submitting review:", err);
    res.status(500).json({ error: "Could not submit review" });
  }
});

export default router;
