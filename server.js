var express = require("express");
var path = require("path");
var connection = require("./db/connection");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "search.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/all", function(req, res) {
  res.sendFile(path.join(__dirname, "all.html"));
});

app.get("/api/characters", function(req, res) {
  connection.query("SELECT * FROM characters", function(err, dbCharacters) {
    res.json(dbCharacters);
  });
});

app.get("/api/characters/:character", function(req, res) {

  connection.query("SELECT * FROM characters WHERE name = ? LIMIT 1", [req.params.character], function(err, dbCharacter) {
    if (err) throw err;

    if (dbCharacter[0]) {
      res.json(dbCharacter[0]);
    } else {
      res.json(null);
    }
  });
});

app.post("/api/characters", function(req, res) {
  console.log("req.body:", req.body);

  connection.query("INSERT INTO characters SET ?", req.body, function(err, result) {
    if (err) throw err;

    res.json(result);
  });
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

