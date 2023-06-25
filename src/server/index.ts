import express from "express";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const app = express();

app.get("/api/test", (_, res) => res.json({ greeting: "not hellos" }));

app.use(express.static(path.join(__dirname, "public")));
