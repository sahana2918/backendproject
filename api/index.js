import mongoose from "mongoose";

/* ===== DB CONNECTION ===== */
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

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

/* ===== HANDLER ===== */
export default async function handler(req, res) {

  // ✅ CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    await connectDB();

    /* ===== CREATE ===== */
    if (req.method === "POST") {
      const newContact = new Contact(req.body);
      await newContact.save();
      return res.json({ success: true, data: newContact });
    }

    /* ===== READ ===== */
    if (req.method === "GET") {
      const data = await Contact.find().sort({ date: -1 });
      return res.json(data);
    }

    /* ===== UPDATE ===== */
    if (req.method === "PUT") {
      const { id } = req.query;
      const updated = await Contact.findByIdAndUpdate(id, req.body, { new: true });
      return res.json(updated);
    }

    /* ===== DELETE ===== */
    if (req.method === "DELETE") {
      const { id } = req.query;
      await Contact.findByIdAndDelete(id);
      return res.json({ message: "Deleted successfully" });
    }

    return res.status(405).json({ message: "Method not allowed" });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
