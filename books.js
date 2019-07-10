const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Book = require("./Book");

mongoose.connect(
  "mongodb://romanceresnak:romanceresnak1@ds249267.mlab.com:49267/bookssservice",
  { useNewUrlParser: true },
  () => {
    console.log("Successfully connected to database");
  }
);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("Yes,it works");
});

app.post("/book", (req, res) => {
  var book = new Book({
    title: req.body.title,
    author: req.body.author,
    numberPages: req.body.numberPages,
    publisher: req.body.publisher
  });

  book
    .save()
    .then(() => {
      console.log("New book created");
    })
    .catch(err => {
      throw err;
    });
  res.send("Saved");
});

app.get("/books", (req, res) => {
  Book.find()
    .then(books => {
      res.json(books);
    })
    .catch(err => {
      throw err;
    });
});

app.get("/book/:id", (req, res) => {
  _id = req.params.id;

  Book.findById(_id)
    .then(book => {
      if (book) res.send(book);
      else {
        res.sendStatus(404);
      }
    })
    .catch(err => {
      throw err;
    });
});

app.delete("/book/:id", (req, res) => {
  _id = req.params.id;

  Book.findOneAndRemove(_id)
    .then(() => {
      res.send("Book removed successfully");
    })
    .catch(err => {
      throw err;
    });
});

app.listen(4545, () => {
  console.log("Server is up and running - our Books service");
});
