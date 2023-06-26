import express from "express";
import path from "path";
import enableSession from "./middleware/session";
import connectDB from "./config/dBConn";
import mongoose from "mongoose";
import loginRouter from "./routes/login.js";
import logoutRouter from "./routes/logout.js";
import usersRouter from "./routes/api/users.js";
const PORT = process.env.PORT || 8080;

const __dirname = path.dirname(new URL(import.meta.url).pathname);
export const app = express();

//config

//middlwares
app.use(express.urlencoded({ extended: false })); // built in middle ware. encoded data e.g. form data.
app.use(express.json()); // json parser
connectDB();
app.use(enableSession);

//routes public
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/api/users", usersRouter);
// app.use("/logout", require("./routes/logout"));
app.get("/api/test", (_, res) => res.json({ greeting: "not hellos" }));
app.use(express.static(path.join(__dirname, "public")));

//routes private

//connect app

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
