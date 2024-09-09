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
  "https://typing-frontend-typingmedias-projects.vercel.app/",
  "http://localhost:3000", 
  "https://typing.media", 
  "http://localhost:3001",
];

// CORS setup
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow requests without origin (like Postman or mobile apps)
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true); // Allow request if origin is in allowedOrigins
      } else {
        callback(new Error("Not allowed by CORS")); // Reject otherwise
      }
    },
  })
);

// Middleware for parsing incoming JSON requests
app.use(bodyParser.json());

// Default route
app.get('/', function(req, res) {
  res.send('Hello Typing World');
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
