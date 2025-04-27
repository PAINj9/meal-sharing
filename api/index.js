import "dotenv/config";
import express from "express";
import cors from "cors";
import knex from "./database_client.js";

import nestedRouter from "./src/routers/nested.js";
import mealsRouter from "./src/routers/meals.js";
import reservationsRouter from "./src/routers/reservations.js";
import mealReviewsRouter from "./src/routers/mealReviews.js";
import reviewsRouter from "./src/routers/reviews.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Meal Sharing API</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f8f9fa;
          padding: 20px;
        }
        h1 {
          color: #007bff;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        li {
          margin-bottom: 10px;
        }
        a {
          text-decoration: none;
          color: #28a745;
          font-size: 18px;
        }
        a:hover {
          text-decoration: underline;
        }
        p {
          margin-top: 20px;
          font-size: 14px;
          color: #6c757d;
        }
      </style>
    </head>
    <body>
      <h1>Welcome to Meal Sharing API</h1>
      <ul>
        <li><a href="/api/meals">GET /api/meals</a></li>
        <li><a href="/api/meals/1">GET /api/meals/:id</a></li>
        <li><a href="/api/reservations">GET /api/reservations</a></li>
        <li><a href="/api/reviews">GET /api/reviews</a></li>
        <li><a href="/test">GET /test</a></li>
      </ul>
    </body>
    </html>
  `);
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
  res.status(500).send({ error: "Something went wrong!" });
});

app.listen(process.env.PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});