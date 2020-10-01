// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("/api/notes", function (req, res) {
  return res.sendFile(path.join(__dirname, "db/db.json"));
  // return res.json(noteData);
});

app.post("/api/notes", function (req, res) {
  const newNote = req.body;
  noteData = fs.readFileSync("./db/db.json", "utf8");
  // console.log(noteData);
  noteData = JSON.parse(noteData);
  newNote.id = noteData.length;
  // console.log(newNote.id);
  // console.log(newNote);
  noteData.push(newNote);
  noteData = JSON.stringify(noteData);
  fs.writeFile("./db/db.json", noteData, "utf8", (err) => {
    if (err) throw err;
  });
  res.json(JSON.parse(noteData));
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on http://localhost:" + PORT);
});
