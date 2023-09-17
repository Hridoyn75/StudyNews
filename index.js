import express from "express";
import { CallJugantorCampus } from "./jugantor/campus.js";
import db from "./db.js";
import { CallJugantorSports } from "./jugantor/sports.js";

const app = express();

app.get("/", (req, res) => {
  res.json("Server is live!");
});

app.get("/posts", (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number
  const type = req.query.type;
  const itemsPerPage = 12; // Number of items per page
  const offset = (page - 1) * itemsPerPage;


  let q = "SELECT * FROM posts ORDER BY timestamp DESC LIMIT ? OFFSET ?";
  let values = [itemsPerPage, offset];
  if(type){
    q = "SELECT * FROM posts WHERE type = ? ORDER BY timestamp DESC LIMIT ? OFFSET ?";
    values = [type, itemsPerPage, offset];
  }

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json("Sorry, there was an error");
    res.json(data);
  });
});

app.get("/post/:id", (req, res) => {
  const postId = req.params.id;

  const q = `SELECT * FROM posts WHERE id LIKE '%${postId}%'`;

  db.query(q, (err, data) => {
    if (err) return console.log(err);
    res.json(data[0]);
  });
});

app.get("/script", (req, res) => {
  CallJugantorCampus();
  CallJugantorSports();
  res.send("Script activated!");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
