const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea");

// GET all ideas
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ succes: false, error: "Something went wrong" });
  }
});

// GET a single idea
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ succes: false, error: "Something went wrong" });
  }
});

// ADD an idea
router.post("/", async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const savedIdea = await idea.save();
    res.json({ success: true, data: savedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ succes: false, error: "Something went wrong" });
  }
});

// UPDATE a single idea
router.put("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    // Match the usernames
    if (idea.username === req.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        { new: true }
      );
      return res.json({ success: true, data: updatedIdea });
    }

    // Username does not match
    res.status(403).json({
      succes: false,
      error: "You are not authorized to update this resource",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ succes: false, error: "Something went wrong" });
  }
});

// Delete a single idea
router.delete("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    // Match the usernames
    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);
      return res.json({ success: true, data: {} });
    }

    // Usernames do not match
    res.status(403).json({
      succes: false,
      error: "You are not authorized to delete this resource",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ succes: false, error: "Something went wrong" });
  }
});

module.exports = router;

/*
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

*/
