import "dotenv/config";
import express from "express";
import cors from "cors";
import knex from "./database_client.js";

import nestedRouter from './routers/nested.js';
import mealsRouter from "./routers/meals.js";
import reservationsRouter from "./routers/reservations.js";
import mealReviewsRouter from "./routers/mealReviews.js";
import reviewsRouter from "./routers/reviews.js"; 

const app = express();

app.use(cors());
app.use(express.json());  




app.get("/", (req, res) => {
  res.send("🚀 Welcome to Meal Sharing API!");
});

app.get("/test", async (req, res) => {
  const SHOW_TABLES_QUERY =
    process.env.DB_CLIENT === "pg"
      ? "SELECT * FROM pg_catalog.pg_tables;"
      : "SHOW TABLES;";
  try {
    const tables = await knex.raw(SHOW_TABLES_QUERY);
    res.json({ tables });
  } catch (err) {
    res.status(500).json({ error: "Error fetching tables." });
  }
});

app.use("/api/reviews", reviewsRouter);  
app.use("/api/meals", mealsRouter);  
app.use("/api/reservations", reservationsRouter);  
app.use("/api/nested", nestedRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
