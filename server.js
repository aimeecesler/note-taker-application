// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// relays the index.html file when on the home page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// relays the notes.html file when on the notes page
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// sends the contents of the db.json file when on the api page
app.get("/api/notes", function (req, res) {
  return res.sendFile(path.join(__dirname, "db/db.json"));
  // return res.json(noteData);
});

// saves the new note to the db.json file
// sends the new contents of the file to the index.js function to be rendered
app.post("/api/notes", function (req, res) {
  const newNote = req.body;
  noteData = fs.readFileSync("./db/db.json", "utf8");
  noteData = JSON.parse(noteData);
  newNote.id = noteData.length;
  noteData.push(newNote);
  noteData = JSON.stringify(noteData);
  fs.writeFile("./db/db.json", noteData, "utf8", (err) => {
    if (err) throw err;
  });
  res.json(JSON.parse(noteData));
});

// removes the note with the corresponding id to the one clicked from the db.json file
// returns the altered contents of the file
app.delete("/api/notes/:id", function (req, res) {
  const deletedNoteId = req.params.id;
  noteData = fs.readFileSync("./db/db.json", "utf8");
  noteData = JSON.parse(noteData);
  noteData = noteData.filter(function (note) {
    return note.id != deletedNoteId;
  });
  noteData = JSON.stringify(noteData);
  fs.writeFile("./db/db.json", noteData, "utf8", (err) => {
    if (err) throw err;
  });
  res.json(JSON.parse(noteData));
});

// Starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening on http://localhost:" + PORT);
});
