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

  if (!newPost.title || !newPost.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
  db.insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the post to the database"
      });
    });
});

// GET specific post
router.get("/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (!post.length) {
        res.status(404).json({ error: "Post not found." });
      }
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

// PUT specific post
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const newPost = req.body;

  db.update(id, newPost)
    .then(count => {
      if (!count) {
        res.status(404).json({ error: "Post not found." });
      }
      res
        .status(200)
        .json({ message: `${count} record successfully updated.` });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The post information could not be modified." });
    });
});

// DELETE specific post
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (!post.length) {
        res.status(404).json({ error: "Post not found." });
      }
      db.remove(id).then(count => {
        res.status(200).json(post);
      });
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

module.exports = router;
