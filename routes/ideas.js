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
module.exports = router;
