import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";
import cors from "cors";

const app = express();
dotenv.config(); // Load environment variables

// Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:3000", 
  "https://typing.media", 
  "http://localhost:3001",
  "https://typing-frontend-typingmedias-projects.vercel.app/"
];

// CORS setup with explicit headers
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin); // Set the origin to match the request origin
  }
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allowed methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allowed headers
  next();
});

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Default route
app.get('/', function(req, res) {
  res.send('Hello Typing World!');
});

// User API routes
app.use("/api/user", route);

// Server and database configuration
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

// Connect to MongoDB and start server
mongoose.connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error("Error connecting to the database:", error));
