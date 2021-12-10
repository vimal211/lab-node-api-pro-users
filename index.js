const express = require("express");
const mongoose = require("mongoose");
const userSc = require("./schema");

const app = express();
const dburl =
  "mongodb+srv://<username>:<password>@vimalcluster.afqw9.mongodb.net/ProUsers?retryWrites=true&w=majority";
app.use(express.json());
mongoose.connect(dburl);

app.post("/api/users", async (req, res) => {
  try {
    const data = await userSc.create(req.body);
    res.status(200).json({
      Message: "Data insterted.",
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const data = await userSc.find();
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: "The users information could not be retrieved.",
    });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const data = await userSc.find({ prograd_id: req.params.id });
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      errorMessage: "The user with the specified ID does not exist.",
    });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const data = await userSc.deleteOne({ prograd_id: req.params.id });
    res.status(200).json({
      message: "The user with the specified ID is deleted",
    });
  } catch (error) {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const data = await userSc.updateOne(
      { prograd_id: req.params.id },
      req.body
    );
    res.status(200).json({
      message: "The user with the specified ID is updated",
    });
  } catch (error) {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  }
});

app.listen(3000, () => console.log("server is running"));
