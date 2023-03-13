const express = require("express");
const port = 5000;

const app = express();

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

app.get("/", (req, res) => {
  // res.send() is elofagdható, de a res.json() az specifikusabb
  res.json({ message: "Welcome to the RandomIdeas API" });
});

// get  all ideas
app.get("/api/ideas", (req, res) => {
  res.json({ success: true, data: ideas });
});

// get a single idea
app.get("/api/ideas/:id", (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id);

  if (!idea) {
    return res
      .status(404)
      .json({ success: false, error: "Resource not found" });
  }

  res.json({ success: true, data: idea });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
