import express from "express";
import path from "path";
import enableSession from "./middleware/session";
import connectDB from "./config/dBConn";
import mongoose from "mongoose";
import loginRouter from "./routes/api/login.ts";
import logoutRouter from "./routes/logout.ts";
import usersRouter from "./routes/api/users.ts";
import sessionsRouter from "./routes/api/sessions.ts";
import tripsRouter from "./routes/api/trips.ts";
import authRouter from "./routes/auth.ts";
import cookieParser from "cookie-parser";
import tripRouter from "./routes/api/trip.ts";
import AIRouter from "./routes/api/ai.ts";
const PORT = 8080;

const __dirname = path.dirname(new URL(import.meta.url).pathname);
export const app = express();

//config

//middlwares
app.use(express.urlencoded({ extended: false })); // built in middle ware. encoded data e.g. form data.
app.use(express.json()); // json parser
connectDB();
app.use(enableSession);
app.use(cookieParser());

//routes public
app.use("/auth", authRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/users", usersRouter);
app.use("/api/sessions", sessionsRouter);
// app.use("/logout", require("./routes/logout"));
app.get("/api/test", (_, res) => res.json({ greeting: "not hellos" }));
app.use(express.static(path.join(__dirname, "public")));

//middle ware for redirect if unathorised)
//routes private
app.use("/api/trips", tripsRouter);
app.use("/api/trip", tripRouter);
app.use("/api/ai", AIRouter);

//connect app

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
