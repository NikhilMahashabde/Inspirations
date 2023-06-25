import express from "express";

export const app = express();

app.get("/api/test", (_, res) => res.json({ greeting: "not hellos" }));
