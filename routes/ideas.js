const express = require("express");
const router = express.Router();

const ideas = [
  {
    id: 1,
    text: "Something",
    tag: "Technology",
    username: "TonyStark",
    date: "2022-01-02",
  },
  {
    id: 2,
    text: "Something more awesome",
    tag: "Inventions",
    username: "SteveRogers",
    date: "2022-01-04",
  },
  {
    id: 3,
    text: "Something over the rainbow",
    tag: "Software",
    username: "BruceBanner",
    date: "2022-01-03",
  },
];

// get  all ideas
router.get("/", (req, res) => {
  res.json({ success: true, data: ideas });
});

// get a single idea
router.get("/:id", (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id);

  if (!idea) {
    return res
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }

  res.json({ success: true, data: idea });
});

// Add an idea
router.post("/", (req, res) => {
  const idea = {
    id: ideas.length + 1,
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
    date: new Date().toISOString().slice(0, 10),
  };

  ideas.push(idea);
  res.json({ success: true, data: idea });
});

// Delete ideas
router.delete("/", (req, res) => {
  ideas.length = 0;
  res.json({ success: true, data: ideas });
});

// Delete a single idea
router.delete("/:id", (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id);

  if (!idea) {
    return res
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }

  const index = ideas.indexOf(idea);
  ideas.splice(index, 1);

  res.json({ success: true, data: {} });
});

// Update a single idea
router.put("/:id", (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id);

  if (!idea) {
    return res
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }

  idea.text = req.body.text || idea.text;
  idea.tag = req.body.tag || idea.tag;

  res.json({ success: true, data: idea });
});

module.exports = router;
