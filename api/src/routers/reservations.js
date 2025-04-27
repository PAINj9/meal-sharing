import express from "express";
import knex from "../../database_client.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const reservations = await knex("reservations").select("*");
    res.json(reservations);
  } catch (error) {
    console.error("Error al obtener las reservas:", error.message);
    res.status(500).json({ error: "No se pudieron obtener las reservas." });
  }
});

router.post("/", async (req, res) => {
    const { contact_name, contact_email, contact_phone, number_of_guests, meal_id } = req.body;
  
    if (!contact_name || !contact_email || !contact_phone || !number_of_guests || !meal_id) {
      return res.status(400).json({ error: "Missing required fields." });
    }
  
    try {
      const [id] = await knex("reservations").insert({
        contact_name,
        contact_email,
        contact_phone,
        number_of_guests,
        meal_id,
      });
  
      res.status(201).json({ id, contact_name, number_of_guests });
    } catch (error) {
      console.error("Error creating reservation:", error.message);
      res.status(500).json({ error: "Could not create reservation." });
    }
  });
  

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { contact_name, contact_email, contact_phone, number_of_guests, meal_id } = req.body;
  
    if (!contact_name || !contact_email || !contact_phone || !number_of_guests || !meal_id) {
      return res.status(400).json({ error: "Missing required fields." });
    }
  
    try {
      const updated = await knex("reservations").where({ id }).update({
        contact_name,
        contact_email,
        contact_phone,
        number_of_guests,
        meal_id,
      });
  
      if (updated === 0) {
        return res.status(404).json({ error: "Reservation not found." });
      }
  
      res.json({ id, contact_name, number_of_guests });
    } catch (error) {
      console.error("Error updating reservation:", error.message);
      res.status(500).json({ error: "Could not update reservation." });
    }
  });

  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleted = await knex("reservations").where({ id }).del();
  
      if (deleted === 0) {
        return res.status(404).json({ error: "Reservation not found." });
      }
  
      res.json({ message: "Reservation deleted successfully." });
    } catch (error) {
      console.error("Error deleting reservation:", error.message);
      res.status(500).json({ error: "Could not delete reservation." });
    }
  });
  

export default router;
