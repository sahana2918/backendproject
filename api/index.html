
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

/* ===== MIDDLEWARE ===== */
app.use(cors());
app.use(express.json());

/* ===== ROOT ===== */
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

/* ===== DB CONNECTION ===== */
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  if (!process.env.MONGO_URI) {
    throw new Error("❌ MONGO_URI not found");
  }

  const db = await mongoose.connect(process.env.MONGO_URI);
  isConnected = db.connections[0].readyState;
};

/* ===== SCHEMA ===== */
const Contact =
  mongoose.models.Contact ||
  mongoose.model("Contact", {
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
  });

/* ================= CRUD ================= */

// ✅ CREATE
app.post("/api/contacts", async (req, res) => {
  try {
    await connectDB();
    const newContact = new Contact(req.body);
    await newContact.save();
    res.json({ success: true, data: newContact });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ READ
app.get("/api/contacts", async (req, res) => {
  try {
    await connectDB();
    const data = await Contact.find().sort({ date: -1 });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE
app.put("/api/contacts/:id", async (req, res) => {
  try {
    await connectDB();
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE
app.delete("/api/contacts/:id", async (req, res) => {
  try {
    await connectDB();
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/* ===== EXPORT ===== */
export default app;
