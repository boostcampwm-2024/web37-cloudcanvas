import express from "express";
import path from "path";
import { test } from "./apis";

console.log(test);

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from the API!" });
});

app.post("/api/some-action", (req, res) => {
  res.json({ success: true });
});

app.use(express.static(path.join(__dirname, "../client")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
