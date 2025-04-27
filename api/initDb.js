import "dotenv/config";
import knex from "./database_client.js";

const seedDb = async () => {
  try {
     const hasMeals = await knex.schema.hasTable("meals");

    if (!hasMeals) {
      await knex.schema.createTable("meals", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.integer("price").notNullable();
      });

      await knex("meals").insert([
        { name: "Milanesa con papas", price: 10 },
        { name: "Empanadas de carne", price: 8 },
        { name: "Asado", price: 15 },
      ]);

      console.log("✅ 'meals' table created with mock data.");
    } else {
      console.log("⚠️ 'meals' table already exists.");
    }

    const hasReservations = await knex.schema.hasTable("reservations");

    if (!hasReservations) {
      await knex.schema.createTable("reservations", (table) => {
        table.increments("id").primary();
        table.string("contact_name").notNullable();
        table.string("contact_email").notNullable();
        table.string("contact_phone").notNullable();
        table.integer("number_of_guests").notNullable();
        table.integer("meal_id").unsigned().references("id").inTable("meals");
        table.timestamp("created_date").defaultTo(knex.fn.now());
      });

      await knex("reservations").insert([
        {
          contact_name: "Juan Pérez",
          contact_email: "juan@example.com",
          contact_phone: "123456789",
          number_of_guests: 2,
          meal_id: 1,
        },
        {
          contact_name: "Sofía García",
          contact_email: "sofia@example.com",
          contact_phone: "987654321",
          number_of_guests: 4,
          meal_id: 2,
        },
      ]);

      console.log("✅ 'reservations' table created with mock data.");
    } else {
      console.log("⚠️ 'reservations' table already exists.");
    }

    const hasReviews = await knex.schema.hasTable("reviews");

    if (!hasReviews) {
      await knex.schema.createTable("reviews", (table) => {
        table.increments("id").primary();
        table.string("title").notNullable();
        table.string("description");
        table.integer("meal_id").unsigned().references("id").inTable("meals");
        table.integer("stars").notNullable();
        table.timestamp("created_date").defaultTo(knex.fn.now());
      });

      await knex("reviews").insert([
        {
          title: "Delicious!",
          description: "The best milanesa ever.",
          meal_id: 1,
          stars: 5,
        },
        {
          title: "Pretty good",
          description: "I liked the empanadas a lot.",
          meal_id: 2,
          stars: 4,
        }
      ]);

      console.log("✅ 'reviews' table created with mock data.");
    } else {
      console.log("⚠️ 'reviews' table already exists.");
    }

  } catch (error) {
    console.error("❌ Error setting up the database:", error.message);
  } finally {
    process.exit();
  }
};

seedDb();