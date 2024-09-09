import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";
import cors from "cors";

const app = express();
dotenv.config();

const allowedOrigins = ["http://localhost:3000", "https://typing.media", "http://localhost:3001","https://typing-frontend-typingmedias-projects.vercel.app/"];

app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.use("/api/user", route);

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(() => {
  console.log("Database connected successfully.");
  app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
  });
}).catch((error) => console.log(error));
