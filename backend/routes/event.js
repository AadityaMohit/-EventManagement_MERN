const express = require("express");
const Event = require("../models/Event");
const router = express.Router();

// Create an event
router.post("/", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: "Error creating event" });
  }
});

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Error fetching events" });
  }
});

// 🔹 Get a single event by ID (Fix for 404 error)
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Error fetching event" });
  }
});

module.exports = router;
