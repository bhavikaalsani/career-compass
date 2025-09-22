// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();          // Load .env variables
connectDB();              // Connect to MongoDB (make sure your DB URI is correct)

const app = express();

// ===== Middleware =====
app.use(cors());          // Allow requests from the React frontend
app.use(express.json());  // Parse JSON bodies

// ===== Routes =====
app.get("/", (req, res) => {
  res.send("API is running…");
});

app.get("/api/test", (req, res) => {
  res.send("Backend is working!");
});

// Auth routes
app.use("/api/auth", require("./routes/auth"));

// Career Advisor routes
app.use("/api/advisor", require("./routes/advisor"));

// Simple health check for advisor
app.get("/api/advisor/test", (req, res) => {
  res.send("Advisor route exists");
});

// ===== Error handling (optional but helpful) =====
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
