import express from "express";
import path from "path";
import enableSession from "./middleware/session";
import connectDB from "./config/dBConn";
import mongoose from "mongoose";
import loginRouter from "./routes/api/login";
import logoutRouter from "./routes/logout";
import usersRouter from "./routes/api/users";
import sessionsRouter from "./routes/api/sessions";
import tripsRouter from "./routes/api/trips";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";
import tripRouter from "./routes/api/trip";
import AIRouter from "./routes/api/ai";
const PORT = 10100;

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
app.get("/api/test", (_, res) => res.json({ test: "test" }));
//middle ware for redirect if unathorised)
//routes private
app.use("/api/trips", tripsRouter);
app.use("/api/trip", tripRouter);
app.use("/api/ai", AIRouter);

app.use(express.static(path.join(__dirname, "/public")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//connect app

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
