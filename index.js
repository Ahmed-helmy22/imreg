import Express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import connection from "./database/connection.js";
import authRoute from "./src/auth/authRoute.js";
import userRoute from "./src/user/userRoutes.js";
import callRoute from "./src/calls/callRouter.js";
import emergencyRoute from "./src/emergency/emergencyRoutes.js";
import { errorController } from "./src/error/errorController.js";
import cloudinary from "cloudinary";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = Express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // You can specify the allowed origins for better security
    methods: ["GET", "POST"]
  }
});

app.use(Express.urlencoded({ extended: false }));
app.use(Express.static("public"));
connection();

app.use(cors());
app.options('*', cors());

app.use(Express.json());
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use("/users", authRoute);
app.use("/admin", userRoute);
app.use('/call' , callRoute)
app.use("/emergency", emergencyRoute);

app.all("*", (req, res) => {
  res.status(404).json({ message: "page not found, check your URL" });
});

app.use(errorController);

const port = 3000;
server.listen(port, () => {
  console.log(`App is running at port ${port}`);
});

export { io };
