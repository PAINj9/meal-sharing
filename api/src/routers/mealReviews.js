import express from "express";
import knex from "../../database_client.js";

const router = express.Router();

router.get("/:id/reviews", async (req, res) => {
  const { id } = req.params;

  try {
    const meal = await knex("meals").where({ id }).first();

    if (!meal) {
      return res.status(404).json({ error: "Meal not found." });
    }

    const reviews = await knex("reviews").where({ meal_id: id });
    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    res.status(500).json({ error: "Could not fetch reviews." });
  }
});

router.post("/:id/reviews", async (req, res) => {
  const { id } = req.params;
  const { title, description, stars } = req.body;

  if (!title || !stars) {
    return res.status(400).json({ error: "'title' and 'stars' are required." });
  }

  try {
    const meal = await knex("meals").where({ id }).first();

    if (!meal) {
      return res.status(404).json({ error: "Meal not found." });
    }

    const [reviewId] = await knex("reviews").insert({
      title,
      description,
      stars,
      meal_id: id,
    });

    res.status(201).json({ id: reviewId, title, stars });
  } catch (error) {
    console.error("Error creating review:", error.message);
    res.status(500).json({ error: "Could not create review." });
  }
});

router.put("/reviews/:reviewId", async (req, res) => {
  const { reviewId } = req.params;
  const { title, description, stars } = req.body;

  if (!title || !stars) {
    return res.status(400).json({ error: "'title' and 'stars' are required." });
  }

  try {
    const updated = await knex("reviews").where({ id: reviewId }).update({
      title,
      description,
      stars,
    });

    if (updated === 0) {
      return res.status(404).json({ error: "Review not found." });
    }

    res.json({ id: reviewId, title, stars });
  } catch (error) {
    console.error("Error updating review:", error.message);
    res.status(500).json({ error: "Could not update review." });
  }
});

// DELETE a review by id
router.delete("/reviews/:reviewId", async (req, res) => {
  const { reviewId } = req.params;

  try {
    const deleted = await knex("reviews").where({ id: reviewId }).del();

    if (deleted === 0) {
      return res.status(404).json({ error: "Review not found." });
    }

    res.json({ message: "Review deleted successfully." });
  } catch (error) {
    console.error("Error deleting review:", error.message);
    res.status(500).json({ error: "Could not delete review." });
  }
});

export default router;
