import "dotenv/config";
import knex from "knex";

console.log("DB_CLIENT:", process.env.DB_CLIENT); 

const connection = knex({
  client: process.env.DB_CLIENT,
  connection: {
    filename: process.env.DB_FILENAME,
  },
  useNullAsDefault: process.env.DB_USE_NULL_AS_DEFAULT === "true",
});

export default connection;
