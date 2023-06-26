import express from "express";
import path from "path";
import enableSession from "./middleware/session";
import connectDB from "./config/dBConn";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
export const app = express();

//config

//middlwares
app.use(express.urlencoded({ extended: false })); // built in middle ware. encoded data e.g. form data.
app.use(express.json()); // json parser
connectDB();
app.use(enableSession);
//routes public

//routes private

//connect app

app.get("/api/test", (_, res) => res.json({ greeting: "not hellos" }));

app.use(express.static(path.join(__dirname, "public")));
