const express = require("express");

const db = require("../../data/db");

const router = express.Router();

// GET all posts
router.get("/", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

// POST new post
router.post("/", (req, res) => {
  newPost = req.body;

  db.insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

module.exports = router;
